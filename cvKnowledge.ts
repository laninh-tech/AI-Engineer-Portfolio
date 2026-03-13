import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { cvProfileFacts, cvProfileFactsVi } from "./cvProfileData";

type CvChunk = {
  id: string;
  text: string;
  tokens: string[];
  tokenFreq: Map<string, number>;
};

type CachedCv = {
  fileMtimeMs: number;
  context: string;
  chunks: CvChunk[];
  docFreq: Map<string, number>;
};

const CV_FILE_NAME = "CV_LaQuangNinh.pdf";
const CV_PATH = path.resolve(process.cwd(), "public", CV_FILE_NAME);
const MAX_CONTEXT_CHARS = 12000;
const CHUNK_TARGET_SIZE = 560;
const CHUNK_MIN_SIZE = 140;
const MIN_PDF_TEXT_CHARS = 220;

let cachedCv: CachedCv | null = null;

const normalizeText = (input: string): string => {
  return input
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const truncate = (input: string, maxChars: number): string => {
  if (input.length <= maxChars) return input;
  return `${input.slice(0, maxChars)}\n\n[Truncated for context size]`;
};

const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 2);
};

const buildTokenFreq = (tokens: string[]): Map<string, number> => {
  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1);
  }
  return freq;
};

const buildChunks = (text: string): CvChunk[] => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: CvChunk[] = [];
  let buffer = "";
  let chunkIndex = 1;

  const pushChunk = (content: string) => {
    const clean = content.trim();
    if (clean.length < CHUNK_MIN_SIZE && chunks.length > 0) {
      const prev = chunks[chunks.length - 1];
      prev.text = `${prev.text}\n${clean}`.trim();
      const mergedTokens = tokenize(prev.text);
      prev.tokens = mergedTokens;
      prev.tokenFreq = buildTokenFreq(mergedTokens);
      return;
    }

    const tokens = tokenize(clean);
    chunks.push({
      id: `chunk-${chunkIndex++}`,
      text: clean,
      tokens,
      tokenFreq: buildTokenFreq(tokens),
    });
  };

  for (const paragraph of paragraphs) {
    const candidate = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
    if (candidate.length > CHUNK_TARGET_SIZE && buffer) {
      pushChunk(buffer);
      buffer = paragraph;
    } else {
      buffer = candidate;
    }
  }

  if (buffer.trim()) {
    pushChunk(buffer);
  }

  return chunks;
};

const buildDocFreq = (chunks: CvChunk[]): Map<string, number> => {
  const docFreq = new Map<string, number>();

  for (const chunk of chunks) {
    const uniqueTokens = new Set(chunk.tokens);
    for (const token of uniqueTokens) {
      docFreq.set(token, (docFreq.get(token) ?? 0) + 1);
    }
  }

  return docFreq;
};

const parsePdfText = async (buffer: Buffer): Promise<string> => {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });

  try {
    const parsed = await parser.getText();
    return parsed.text ?? "";
  } finally {
    await parser.destroy();
  }
};

const buildFallbackContext = () => {
  const enBlock = cvProfileFacts.map((fact) => `- ${fact}`).join("\n\n");
  const viBlock = cvProfileFactsVi.map((fact) => `- ${fact}`).join("\n\n");

  return [
    "=== PROFILE FACTS (EN) ===",
    enBlock,
    "",
    "=== PROFILE FACTS (VI) ===",
    viBlock,
  ].join("\n");
};

export const getCvContext = async (): Promise<string> => {
  const stat = await fs.stat(CV_PATH);

  if (cachedCv && cachedCv.fileMtimeMs === stat.mtimeMs) {
    return cachedCv.context;
  }

  const fileBuffer = await fs.readFile(CV_PATH);
  const rawText = await parsePdfText(fileBuffer);
  const normalized = normalizeText(rawText);
  const enriched = normalized.length >= MIN_PDF_TEXT_CHARS
    ? `${normalized}\n\n${buildFallbackContext()}`
    : buildFallbackContext();
  const context = truncate(enriched, MAX_CONTEXT_CHARS);
  const chunks = buildChunks(context);
  const docFreq = buildDocFreq(chunks);

  cachedCv = {
    fileMtimeMs: Number(stat.mtimeMs),
    context,
    chunks,
    docFreq,
  };

  return context;
};

export const retrieveCvSnippets = async (params: {
  query: string;
  topK?: number;
}): Promise<Array<{ id: string; text: string; score: number }>> => {
  await getCvContext();
  if (!cachedCv) return [];

  const topK = Math.max(1, params.topK ?? 4);
  const queryTokens = tokenize(params.query);
  if (queryTokens.length === 0) return [];

  const totalDocs = cachedCv.chunks.length || 1;
  const lowerQuery = params.query.toLowerCase().trim();

  const scored = cachedCv.chunks
    .map((chunk) => {
      let score = 0;

      for (const token of queryTokens) {
        const tf = chunk.tokenFreq.get(token) ?? 0;
        if (!tf) continue;
        const df = cachedCv!.docFreq.get(token) ?? 1;
        const idf = Math.log((totalDocs + 1) / (df + 1)) + 1;
        score += tf * idf;
      }

      if (lowerQuery.length > 4 && chunk.text.toLowerCase().includes(lowerQuery)) {
        score += 2.5;
      }

      return { id: chunk.id, text: chunk.text, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
};

export const buildCvGroundedPrompt = (params: {
  basePrompt: string;
  userMessage: string;
  lang?: string;
  cvSnippets: Array<{ id: string; text: string; score: number }>;
}): string => {
  const { basePrompt, userMessage, lang, cvSnippets } = params;
  const responseRules =
    lang === "vi"
      ? [
          "Bạn phải ưu tiên thông tin đúng theo CV bên dưới.",
          "Nếu CV không có dữ liệu để trả lời chắc chắn, nói rõ là chưa có thông tin trong CV.",
          "Trả lời ngắn gọn, rõ ràng, chuyên nghiệp.",
        ].join(" ")
      : [
          "Prioritize facts grounded in the CV context below.",
          "If the CV does not contain enough evidence, explicitly say the information is not available in the CV.",
          "Keep responses concise, clear, and professional.",
        ].join(" ");

  const snippetContext = cvSnippets.length
    ? cvSnippets
        .map((snippet, idx) => `[${idx + 1}] ${snippet.text}`)
        .join("\n\n")
    : (lang === "vi" ? "Khong tim thay doan CV phu hop." : "No relevant CV snippets found.");

  return [
    basePrompt?.trim() || "",
    "",
    "=== RETRIEVED CV SNIPPETS START ===",
    snippetContext,
    "=== RETRIEVED CV SNIPPETS END ===",
    "",
    responseRules,
    "",
    lang === "vi" ? `Cau hoi nguoi dung: ${userMessage}` : `User question: ${userMessage}`,
  ].join("\n");
};
