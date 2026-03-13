import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type ContactFormProps = {
  t: any;
};

export const ContactForm = ({ t }: ContactFormProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{t.contact.form.name}</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
            placeholder={t.contact.form.placeholderName}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{t.contact.form.email}</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div className="space-y-2 flex-1 min-h-[260px] flex flex-col">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{t.contact.form.message}</label>
        <textarea
          required
          rows={7}
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="w-full h-full min-h-[220px] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all resize-none"
          placeholder={t.contact.form.placeholderMsg}
        />
      </div>
      <button
        disabled={status === "loading"}
        className="ui-hover mt-auto w-full md:w-fit px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === "loading"
          ? t.contact.form.sending
          : status === "success"
            ? t.contact.form.success
            : t.contact.form.send}
        {status === "success" ? <CheckCircle2 size={18} /> : <Send size={18} />}
      </button>
    </form>
  );
};
