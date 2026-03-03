import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, ArrowRight, Plus, Minus, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import vendingImg from "@/assets/machine-vending.jpg";
import dashboardImg from "@/assets/dashboard-ecosystem.jpg";

const addOns = [
  { id: "chiller", name: "Built-in Chiller Unit", price: 35000, desc: "Refrigeration module for cold beverages and dairy products." },
  { id: "cashless", name: "Cashless Payment Module", price: 25000, desc: "bKash, Nagad, and card payment integration hardware." },
  { id: "screen", name: "Touchscreen Display Upgrade", price: 20000, desc: "7-inch interactive touchscreen for product selection and promotions." },
  { id: "telemetry", name: "Advanced Telemetry Kit", price: 15000, desc: "Enhanced sensors for temperature, humidity, and stock-level precision." },
  { id: "branding", name: "Custom Branding Wrap", price: 12000, desc: "Full machine vinyl wrap with your company branding and colors." },
];

const backendPlan = { name: "SOHUB Backend Platform", price: 5000, period: "/month", features: ["Real-time sales dashboard", "Inventory & refill alerts", "Health monitoring & error logs", "Remote controls (restart/lock/disable)", "Daily reconciliation reports", "Role-based operator access"] };

const specs = [
  { label: "Capacity", value: "60–120 items (configurable)" },
  { label: "Power", value: "220V / 50Hz" },
  { label: "Dimensions", value: "183cm × 100cm × 85cm" },
  { label: "Weight", value: "~180 kg" },
  { label: "Payment", value: "Cash + optional cashless" },
  { label: "Connectivity", value: "4G SIM + WiFi" },
];

const SnackVendingPage = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [step, setStep] = useState<"configure" | "checkout">("configure");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const basePrice = 450000;
  const addOnTotal = selectedAddOns.reduce((sum, id) => sum + (addOns.find(a => a.id === id)?.price || 0), 0);
  const unitPrice = basePrice + addOnTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const formatPrice = (n: number) => `৳${n.toLocaleString("en-BD")}`;

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
                  Deployed & Available
                </span>
                <h1 className="heading-display mt-4">
                  Snack Vending{" "}
                  <span className="gradient-text">Machine</span>
                </h1>
                <p className="body-large mt-6 max-w-lg">
                  Local builds and imported chassis, integrated with the SOHUB ecosystem. Already deployed across multiple locations in Bangladesh.
                </p>
                <p className="text-sm text-muted-foreground mt-3 italic">
                  Sometimes we import chassis and integrate our brain. Sometimes we build locally. Either way: powered by SOHUB.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/4835onrVx34"
                    title="Snack Vending Machine"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Videos */}
        <section className="section-padding section-alt">
          <div className="section-container max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="section-badge">Watch More</span>
                <h2 className="heading-section">See It In Action</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "chWoJsI6XgY", title: "Machine Assembly & Build" },
                  { id: "RlywkUl-TCg", title: "Vending Operations Demo" },
                ].map(v => (
                  <div key={v.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-md">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold">{v.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Specs */}
        <section className="section-padding">
          <div className="section-container max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="section-badge">Specifications</span>
                <h2 className="heading-section">Built for Bangladesh Conditions</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map(s => (
                  <div key={s.label} className="p-5 rounded-xl bg-secondary/50 border border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Backend */}
        <section className="section-padding section-alt">
          <div className="section-container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <ScrollReveal direction="left">
                <img src={dashboardImg} alt="SOHUB Dashboard" className="rounded-2xl shadow-lg w-full" />
              </ScrollReveal>
              <ScrollReveal direction="right">
                <span className="section-badge">Backend</span>
                <h2 className="heading-section mt-2 mb-4">SOHUB Ecosystem Included</h2>
                <p className="body-base text-sm mb-5">Every machine connects to the SOHUB backend for real-time monitoring, payments, and control.</p>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <div className="flex items-baseline justify-between mb-4">
                    <h4 className="font-semibold">{backendPlan.name}</h4>
                    <span className="text-accent font-bold">{formatPrice(backendPlan.price)}<span className="text-xs text-muted-foreground font-normal">{backendPlan.period}</span></span>
                  </div>
                  <ul className="space-y-2">
                    {backendPlan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Configurator */}
        <section id="purchase" className="section-padding">
          <div className="section-container max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="section-badge">Purchase</span>
                <h2 className="heading-section">Configure Your Machine</h2>
                <p className="body-large mt-3">Select your configuration and submit an order request.</p>
              </div>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              {!submitted && step === "configure" && (
                <motion.div key="configure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: Options */}
                    <div className="lg:col-span-3 space-y-6">
                      {/* Base */}
                      <div className="p-6 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">Snack Vending Machine</h3>
                            <p className="text-sm text-muted-foreground mt-1">Standard unit with cash payment support</p>
                          </div>
                          <span className="text-xl font-bold">{formatPrice(basePrice)}</span>
                        </div>
                        <button onClick={() => setShowSpecs(!showSpecs)} className="flex items-center gap-1 text-xs text-accent mt-3 hover:underline">
                          {showSpecs ? "Hide" : "View"} specifications {showSpecs ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                        <AnimatePresence>
                          {showSpecs && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/50">
                                {specs.map(s => (
                                  <div key={s.label} className="text-xs"><span className="text-muted-foreground">{s.label}:</span> <span className="font-medium">{s.value}</span></div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Add-ons */}
                      <div>
                        <h3 className="font-semibold mb-3">Customize with Add-Ons</h3>
                        <div className="space-y-3">
                          {addOns.map(a => (
                            <motion.button
                              key={a.id}
                              onClick={() => toggleAddOn(a.id)}
                              className={`w-full text-left p-4 rounded-xl border transition-all ${selectedAddOns.includes(a.id) ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-border bg-card hover:border-accent/30"}`}
                              whileTap={{ scale: 0.995 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedAddOns.includes(a.id) ? "bg-accent border-accent" : "border-border"}`}>
                                    {selectedAddOns.includes(a.id) && <Check size={12} className="text-white" />}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{a.name}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                                  </div>
                                </div>
                                <span className="text-sm font-semibold whitespace-nowrap ml-4">+{formatPrice(a.price)}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                        <span className="font-medium">Quantity</span>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Minus size={16} /></button>
                          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Plus size={16} /></button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-2">
                      <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card space-y-4">
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Base machine</span><span>{formatPrice(basePrice)}</span></div>
                          {selectedAddOns.map(id => {
                            const a = addOns.find(x => x.id === id)!;
                            return <div key={id} className="flex justify-between"><span className="text-muted-foreground">{a.name}</span><span>{formatPrice(a.price)}</span></div>;
                          })}
                          <div className="border-t border-border/50 pt-2 flex justify-between"><span className="text-muted-foreground">Unit price</span><span className="font-medium">{formatPrice(unitPrice)}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span>×{quantity}</span></div>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-baseline">
                            <span className="font-semibold">Total</span>
                            <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">+ {formatPrice(backendPlan.price)}/month backend per machine</p>
                        </div>
                        <button onClick={() => setStep("checkout")} className="btn-primary w-full group">
                          Continue to Order
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                        <p className="text-xs text-muted-foreground text-center">This is an order inquiry. Payment details will be confirmed separately.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {!submitted && step === "checkout" && (
                <motion.div key="checkout" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                  <button onClick={() => setStep("configure")} className="text-sm text-accent mb-6 hover:underline flex items-center gap-1">
                    ← Back to Configuration
                  </button>
                  <div className="card-clean mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2"><ShoppingBag size={18} /> Order Summary</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{quantity}× Snack Vending Machine — {formatPrice(basePrice)} each</p>
                      {selectedAddOns.map(id => {
                        const a = addOns.find(x => x.id === id)!;
                        return <p key={id}>+ {a.name} — {formatPrice(a.price)}</p>;
                      })}
                      <p className="font-semibold text-foreground pt-2 border-t border-border/50 mt-2">Total: {formatPrice(totalPrice)} + {formatPrice(backendPlan.price * quantity)}/month backend</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="card-clean space-y-5">
                    <h3 className="font-semibold text-lg">Your Details</h3>
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
                      <label className="text-sm font-medium mb-1.5 block">Deployment Location *</label>
                      <input type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="City, area, specific location" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Additional Notes</label>
                      <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any specific requirements or questions" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
                    </div>
                    <button type="submit" className="btn-primary w-full">Submit Order Request</button>
                    <p className="text-xs text-muted-foreground text-center">Our team will contact you within 1 business day to confirm details and payment.</p>
                  </form>
                </motion.div>
              )}

              {submitted && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto">
                  <div className="card-clean text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Check size={36} className="text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Order Request Submitted</h3>
                    <p className="text-muted-foreground mb-2">Thank you for your interest in the Snack Vending Machine.</p>
                    <p className="text-sm text-muted-foreground">Our team will review your configuration and contact you within 1 business day to confirm details and arrange payment.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SnackVendingPage;
