import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, ArrowRight, Shield, Smartphone, Box, Lock } from "lucide-react";
import lockerImg from "@/assets/machine-locker.jpg";

const features = [
  { icon: Lock, title: "Per-Cell Access Control", desc: "Each compartment individually locked and monitored. QR or code-based unlock for secure self-service." },
  { icon: Smartphone, title: "Remote Management", desc: "Monitor all cells from one dashboard. Track usage, inventory, and access history in real-time." },
  { icon: Shield, title: "Role-Based Security", desc: "Operator access controls with audit trails. Every open, close, and restock event logged." },
  { icon: Box, title: "Flexible Configuration", desc: "Different compartment sizes in one unit. Configure for parcels, supplies, electronics, or retail items." },
];

const useCases = [
  "Corporate offices — secure IT equipment dispensing",
  "Co-working spaces — locker rentals for members",
  "Residential complexes — parcel delivery lockers",
  "Retail stores — click-and-collect pickup",
  "Hospitals — controlled medicine or supply access",
  "Factories — PPE and tool dispensing",
];

const SmartLockerShowcase = () => {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", useCase: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-44 md:pb-24" style={{ background: "var(--gradient-hero)" }}>
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="section-badge">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
                  Lab-Built • Ready for Pilot
                </span>
                <h1 className="heading-display mt-4">
                  Smart Locker{" "}
                  <span className="gradient-text">Vending System</span>
                </h1>
                <p className="body-large mt-6 max-w-lg">
                  Secure, compartment-based vending for high-value items, parcels, and workplace supplies. Built in our lab, ready for deployment.
                </p>
                <a href="#request" className="btn-primary group mt-8 inline-flex">
                  Express Interest
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/jZk6Zv-q-zw"
                    title="Smart Locker Vending Machine Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="section-padding">
          <div className="section-container">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="section-badge">How It Works</span>
                <h2 className="heading-section">Simple. Secure. Self-Service.</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {["User scans QR or enters code", "Selected compartment unlocks", "Item dispensed, event logged"].map((step, i) => (
                <ScrollReveal key={step} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-xl font-bold mx-auto mb-4">{i + 1}</div>
                    <p className="font-medium">{step}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding section-alt">
          <div className="section-container">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="section-badge">Features</span>
                <h2 className="heading-section">Built for Real Operations</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.1}>
                  <div className="card-clean h-full">
                    <f.icon size={24} className="text-accent mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="body-base text-sm">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding">
          <div className="section-container max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="section-badge">Use Cases</span>
                <h2 className="heading-section">Where It Fits</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {useCases.map((uc) => (
                  <div key={uc} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{uc}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Request Form */}
        <section id="request" className="section-padding section-alt">
          <div className="section-container max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="section-badge">Get Started</span>
                <h2 className="heading-section">Interested? Let's Talk.</h2>
                <p className="body-large mt-4">This machine is built in our lab and ready for pilot deployment. Tell us about your use case.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              {submitted ? (
                <div className="card-clean text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Request Received</h3>
                  <p className="text-muted-foreground">We'll review your submission and get back to you within 2 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-clean space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Company</label>
                      <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Location</label>
                    <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="City, area" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Intended Use Case *</label>
                    <textarea required rows={3} value={form.useCase} onChange={e => setForm({...form, useCase: e.target.value})} placeholder="What would you use the Smart Locker for?" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full">Submit Interest Request</button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SmartLockerShowcase;
