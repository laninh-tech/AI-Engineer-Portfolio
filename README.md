# AI Engineer Portfolio

A modern personal portfolio for AI Engineer / Data Scientist positioning, featuring bilingual content, categorized project browsing, and a CV-grounded assistant.

## Live Demo

- Local: http://localhost:3001
- Production: update this section with your deployed URL (Vercel/Render/Netlify)

## Screenshot

![Portfolio Overview](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (Framer Motion runtime)
- Lucide React
- Express (API server)
- Google Gemini API (`@google/genai`)
- `pdf-parse` for CV ingestion

## Key Features

- 4/6 hero balance layout with centered alignment for portrait and introduction
- Categorized horizontal project scroll with hidden scrollbar and arrow navigation
- Bilingual experience (Vietnamese/English) with language-aware project modal content
- Contact section with validated external links (GitHub/LinkedIn open in new tab)
- CV-grounded chatbot using mini-RAG retrieval and local fallback mode
- Responsive design tuned for desktop and mobile

## Installation

### 1. Clone repository

```bash
git clone <your-repo-url>
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create or update `.env.local`:

```env
GEMINI_API_KEY=your_real_gemini_key
```

### 4. Run development server

```bash
npm run dev
```

### 5. Production build

```bash
npm run build
npm start
```

## Folder Structure

```text
public/
  CV_LaQuangNinh.pdf
  assets/images/portrait.jpg
src/
  components/        # UI modules (chat, contact, layout, projects, ui)
  data/              # Project/contact data modules
  locales/           # i18n translations (vi/en)
  styles/            # Shared spacing/layout styles
  App.tsx            # Page composition
  index.css          # Global theme and utility styles
server.ts            # Express API (/api/chat, /api/contact, /api/health)
cvKnowledge.ts       # CV parsing + mini-RAG retrieval
cvProfileData.ts     # Fallback profile facts for sparse/scanned CV files
```

## GitHub Update (CLI Steps)

Use force push only when you intentionally want to overwrite old history.

### Clean local workspace

```bash
# remove stale generated files if needed
rm -rf dist

# verify working files before commit
git status
```

### Commit and push

```bash
git add .
git commit -m "feat: complete UI/UX refactor with horizontal scroll & clean code"
git push origin main --force
```

If you want safer history, use normal push first:

```bash
git push origin main
```

## Notes

- Keep secrets only in `.env.local` and never commit real API keys.
- If your CV file is scanned and has little extractable text, chatbot uses fallback profile facts.
