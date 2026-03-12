import { useState, FormEvent } from "react";
import ScrollReveal from "../ScrollReveal";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-contact-email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: '',
          company: '',
          location: '',
          useCase: form.message || 'General inquiry from contact form',
          machineType: 'Contact Form'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Thank you! We'll get back to you soon.");
        setForm({ name: "", phone: "", message: "" });
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <button type="submit" disabled={loading} className="btn-primary w-full py-4 group">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Get Started
                  <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
