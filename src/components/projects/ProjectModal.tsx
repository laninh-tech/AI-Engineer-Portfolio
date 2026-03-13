import { motion } from "motion/react";
import { ArrowRight, Cpu, ExternalLink, Github, X } from "lucide-react";
import { Language } from "../../locales/translations";
import { GITHUB_PROFILE_URL } from "../../data/constants";
import { getLocalizedProjectContent, Project } from "../../data/projects";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
  t: any;
  lang: Language;
};

export const ProjectModal = ({ project, onClose, t, lang }: ProjectModalProps) => {
  const localizedContent = getLocalizedProjectContent(project, lang);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-3xl glass border border-[var(--border-color)] rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-64 bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
          <h2 className="text-4xl font-bold text-[var(--text-primary)] font-display absolute bottom-8 left-8 z-10">{project.name}</h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors z-20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <ArrowRight size={18} className="text-cyan-400" />
                {t.projects.overview}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{localizedContent.solution}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <Cpu size={18} className="text-cyan-400" />
                {t.projects.tech}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{localizedContent.tech}</p>
            </section>

            <section className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">{t.projects.result}</h3>
              <p className="text-cyan-400/80">{localizedContent.result}</p>
            </section>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href={project.github || GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <Github size={18} /> {t.projects.repo}
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 glass text-[var(--text-primary)] font-bold rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 border border-[var(--border-color)]"
              >
                <ExternalLink size={18} /> {t.projects.demo}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
