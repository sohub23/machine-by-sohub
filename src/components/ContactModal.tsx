import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setForm({ name: "", phone: "", message: "" });
    setOpen(false);
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="text-center">
            <span className="section-badge">Get Started</span>
            <h2 className="heading-section mb-4">Ready to deploy?</h2>
            <p className="body-base mb-6">Tell us what you need and we'll take it from there.</p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="tel"
            required
            placeholder="Phone number"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <textarea
            placeholder="Tell us about your location and requirements"
            rows={3}
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button type="submit" className="btn-primary w-full py-4 group">
            Request Visit
            <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;