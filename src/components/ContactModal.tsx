import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", location: "", message: "" });
  const [open, setOpen] = useState(false);
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
          email: form.email,
          company: form.company,
          location: form.location,
          useCase: form.message || 'Physical visit request',
          machineType: 'Physical Visit Request'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Thank you! We'll get back to you soon.");
        setForm({ name: "", phone: "", email: "", company: "", location: "", message: "" });
        setOpen(false);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Visit request error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-center">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Get Started</span>
            <h2 className="text-xl font-bold mb-3 mt-3">Ready to deploy?</h2>
            <p className="text-sm text-muted-foreground mb-4">Tell us what you need and we'll take it from there.</p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Your name"
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              required
              placeholder="Email address"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          
          {/* Row 2: Phone and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="tel"
              required
              placeholder="Phone number"
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="text"
              required
              placeholder="Location (city/area)"
              className={inputClass}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          
          {/* Row 3: Company Name (full width) */}
          <input
            type="text"
            placeholder="Company name (optional)"
            className={inputClass}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          
          {/* Row 4: Requirements (full width) */}
          <textarea
            placeholder="Tell us about your requirements (optional)"
            rows={3}
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 group">
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
                Request Visit
                <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
