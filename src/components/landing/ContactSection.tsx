import { useState, FormEvent } from "react";
import ScrollReveal from "../ScrollReveal";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setForm({ name: "", phone: "", message: "" });
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow";

  return (
    <section id="contact" className="section-padding" style={{ background: "var(--gradient-cool)" }}>
      <div className="section-container max-w-xl mx-auto text-center">
        <ScrollReveal>
          <span className="section-badge">Get Started</span>
          <h2 className="heading-section mb-4">Ready to deploy?</h2>
          <p className="body-base mb-10">Tell us what you need and we'll take it from there.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-2xl border border-border p-8 shadow-lg text-left">
            <input
              type="text" required placeholder="Your name"
              className={inputClass}
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="tel" required placeholder="Phone number"
              className={inputClass}
              value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Tell us about your needs (optional)"
              rows={3}
              className={`${inputClass} resize-none`}
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button type="submit" className="btn-primary w-full py-4 group">
              Get Started
              <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
