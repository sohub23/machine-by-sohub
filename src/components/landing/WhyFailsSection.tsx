import ScrollReveal from "../ScrollReveal";
import { AlertTriangle, CreditCard, Users } from "lucide-react";

const cards = [
  {
    icon: AlertTriangle,
    title: "Technical capacity is missing",
    description: "Machines get imported, installed, and forgotten. No diagnostics, no monitoring, no one to fix things when they break. Without technical infrastructure, every deployment is a gamble.",
    num: "01",
  },
  {
    icon: CreditCard,
    title: "Bangladeshi money isn't machine-readable",
    description: "Mobile wallets, bKash—none of these natively talk to machines. Integration, confirmation, reconciliation, and dispute handling must be purpose-built for local payment rails.",
    num: "02",
  },
  {
    icon: Users,
    title: "People don't know these machines",
    description: "A vending machine in Dhaka isn't the same as one in Tokyo. Users need education, Bangla guidance, clear pricing, and trust-building before adoption happens at scale.",
    num: "03",
  },
];

const WhyFailsSection = () => (
  <section className="section-padding section-alt">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="section-badge">The Problem</span>
          <h2 className="heading-section">
            Why this sector fails in Bangladesh
          </h2>
        </div>
      </ScrollReveal>
      <div className="grid-features">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.12} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
            <div className="card-clean h-full group">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm font-bold text-accent">{card.num}</span>
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <card.icon size={16} className="text-accent" />
                </div>
              </div>
              <h3 className="heading-card mb-3">{card.title}</h3>
              <p className="body-base">{card.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyFailsSection;
