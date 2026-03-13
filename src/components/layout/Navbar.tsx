import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Language } from "../../locales/translations";

type NavbarProps = {
  theme: string;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
};

export const Navbar = ({ theme, toggleTheme, lang, setLang, t }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.education, href: "#education" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-[var(--border-color)]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[var(--text-primary)] tracking-tighter font-display"
        >
          LN<span className="text-cyan-400">.</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-cyan-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-[var(--border-color)] pl-6 ml-2">
            <button
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
              className="px-3 py-1.5 rounded-xl font-bold bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-cyan-500/10 hover:text-cyan-400 transition-all text-sm border border-[var(--border-color)]"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--bg-secondary)] text-cyan-400 hover:bg-cyan-500/10 transition-all border border-[var(--border-color)]"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "vi" : "en")}
            className="px-2 py-1 rounded-lg font-bold bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs border border-[var(--border-color)]"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--bg-secondary)] text-cyan-400 border border-[var(--border-color)]"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] ml-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-[var(--border-color)] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-[var(--text-secondary)] hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
