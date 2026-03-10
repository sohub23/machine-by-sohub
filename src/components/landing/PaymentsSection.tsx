import { useState } from "react";
import ScrollReveal from "../ScrollReveal";
import { CreditCard, Smartphone, Shield, RotateCcw, FileText, CheckCircle2, Zap, Play } from "lucide-react";

const paymentMethods = [
  { name: "EBL POS", label: "Debit & Credit Cards", highlight: true },
  { name: "SSL Commerz", label: "Online Payments", highlight: false },
  { name: "bKash", label: "Mobile Banking", highlight: false },
];

const features = [
  { icon: CreditCard, title: "Physical POS integration", desc: "EBL bank POS terminals embedded directly into machines—accept Visa, Mastercard, and local debit cards on-site." },
  { icon: Smartphone, title: "Mobile financial services", desc: "bKash, and QR-based flows integrated at the machine level for instant digital payments." },
  { icon: CheckCircle2, title: "Real-time confirmation", desc: "Payment verified at the machine before dispensing. Zero guesswork, zero failed transactions." },
  { icon: RotateCcw, title: "Refund & dispute", desc: "Refund logic for failed dispenses with configurable dispute workflows." },
  { icon: FileText, title: "Daily reconciliation", desc: "End-of-day settlement reports matched against gateway and machine transaction logs." },
  { icon: Shield, title: "Anti-fraud guardrails", desc: "Transaction limits, velocity checks, and anomaly detection built into every payment flow." },
];

const PaymentsSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
  <section id="payments" className="section-padding section-alt">
    <div className="section-container">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
        <ScrollReveal direction="left">
          <span className="section-badge">
            <Zap size={14} /> Payments
          </span>
          <h2 className="heading-section mb-6">
            Bangladesh payment infrastructure—
            <span className="text-accent">solved</span>
          </h2>
          <p className="body-large mb-8">
            We've successfully integrated EBL bank physical POS terminals into our machines. 
            Combined with SSL, bKash—every payment method your customers use is now supported at the machine level.
          </p>

          {/* Payment method badges */}
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((pm) => (
              <div
                key={pm.name}
                className={`flex flex-col items-center rounded-xl px-5 py-3 border transition-all ${
                  pm.highlight
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                    : "border-border bg-card"
                }`}
              >
                <span className={`text-sm font-bold ${pm.highlight ? "text-accent" : "text-foreground"}`}>
                  {pm.name}
                </span>
                <span className="text-xs text-muted-foreground">{pm.label}</span>
                {pm.highlight && (
                  <span className="mt-1 text-[10px] font-semibold text-accent uppercase tracking-wider">New</span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal direction="right">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            <div className="aspect-video relative">
              {!isVideoPlaying ? (
                <div className="group cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={`https://img.youtube.com/vi/fZHZeiDbxpU/maxresdefault.jpg`}
                      alt="SOHUB Payment Integration"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center group-hover:bg-foreground/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      </div>
                    </div>

                    {/* Title Badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-accent to-accent/80 backdrop-blur-sm rounded px-3 py-2 shadow-lg">
                      <p className="font-semibold text-white text-sm">
                        SOHUB Payment Integration Demo
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/fZHZeiDbxpU?autoplay=1"
                  title="SOHUB Payment Integration Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
              LIVE DEMO
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.06}>
            <div className="card-clean h-full group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="body-base text-sm">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom quote */}
      <ScrollReveal delay={0.3} direction="scale">
        <div className="mt-12 p-8 rounded-2xl border border-border bg-card text-center">
          <p className="text-xl md:text-2xl font-bold text-foreground">
            "Payment isn't a feature. It's the backbone."
          </p>
          <p className="text-sm text-muted-foreground mt-2">— Every successful deployment starts with trusted payments</p>
        </div>
      </ScrollReveal>
    </div>
  </section>
  );
};

export default PaymentsSection;
