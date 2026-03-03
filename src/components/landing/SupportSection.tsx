import ScrollReveal from "../ScrollReveal";
import { Wrench, Bell, BookOpen, Box, FileCheck } from "lucide-react";

const cards = [
  { icon: Wrench, title: "Preventive maintenance", desc: "Scheduled servicing based on usage data and manufacturer intervals—not guesswork." },
  { icon: Bell, title: "Remote alerts", desc: "Instant notifications for errors, low stock, offline status, and payment failures." },
  { icon: BookOpen, title: "Technician playbooks", desc: "Step-by-step repair guides for every machine type, accessible on mobile." },
  { icon: Box, title: "Spare parts plan", desc: "Pre-stocked critical parts with tracked inventory and reorder triggers." },
  { icon: FileCheck, title: "SLA options", desc: "Structured service-level agreements with defined response and resolution times." },
];

const SupportSection = () => (
  <section id="support" className="section-padding">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="section-badge">Support</span>
          <h2 className="heading-section">Support is part of the product</h2>
          <p className="body-large mt-4 max-w-2xl mx-auto">
            A machine without support is a liability. We treat technical support as a core product feature, not an afterthought.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div className="card-clean h-full group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <card.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="body-base text-sm">{card.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SupportSection;
