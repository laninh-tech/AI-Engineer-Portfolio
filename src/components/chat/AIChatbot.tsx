import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { Language } from "../../locales/translations";

type ChatMessage = { role: "user" | "bot"; text: string };

type AIChatbotProps = {
  t: any;
  lang: Language;
};

export const AIChatbot = ({ t, lang }: AIChatbotProps) => {
  const welcomeMessage =
    lang === "vi"
      ? "Chào bạn! Tôi là trợ lý ảo của Ninh. Bạn muốn biết thêm gì về kinh nghiệm hay dự án của Ninh không?"
      : "Hello! I am Ninh's virtual assistant. Would you like to know more about Ninh's experience or projects?";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "bot", text: welcomeMessage }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 0) return [{ role: "bot", text: welcomeMessage }];
      const [first, ...rest] = prev;
      if (first.role !== "bot") return prev;
      if (first.text === welcomeMessage) return prev;
      return [{ ...first, text: welcomeMessage }, ...rest];
    });
  }, [welcomeMessage]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: t.bot.prompt,
          message: userMessage,
          lang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Chat request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.text || (lang === "vi" ? "Xin lỗi, tôi gặp chút trục trặc." : "Sorry, I ran into an issue."),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            error instanceof Error && error.message
              ? error.message
              : lang === "vi"
                ? "Tôi đang bận một chút, hãy thử lại sau nhé!"
                : "I'm a bit busy, please try again later!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] glass border border-[var(--border-color)] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-4 bg-cyan-500 flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-950">
                <Bot size={24} />
                <span className="font-bold">{t.bot.title}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-950/70 hover:text-slate-950">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={`${msg.role}-${index}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                      ? "bg-cyan-500 text-slate-950 rounded-tr-none"
                      : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-none"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-secondary)] p-3 rounded-2xl rounded-tl-none flex gap-1 border border-[var(--border-color)]">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t.bot.placeholder}
                  className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};
