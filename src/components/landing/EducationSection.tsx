import ScrollReveal from "../ScrollReveal";
import { Languages, Image, MonitorPlay, QrCode } from "lucide-react";

const items = [
  { icon: Languages, title: "On-machine Bangla guidance", desc: "Every interface includes Bangla instructions, ensuring first-time users can operate machines confidently." },
  { icon: Image, title: "Location-specific posters", desc: "Printed and digital signage explaining how machines work, placed visibly at deployment sites." },
  { icon: MonitorPlay, title: "Demo mode", desc: "Machines can run interactive demos so users can learn the flow before their first purchase." },
  { icon: QrCode, title: "QR-based help", desc: "Scan a QR code on any machine to access a step-by-step guide, FAQs, and support contact instantly." },
];

const EducationSection = () => (
  <section className="section-padding">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="section-badge">Adoption</span>
          <h2 className="heading-section">Education & adoption</h2>
          <p className="body-large mt-4 max-w-2xl mx-auto">
            Machines don't adopt themselves. We design the adoption journey alongside every deployment.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
            <div className="card-clean h-full flex gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <item.icon size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="body-base text-sm">{item.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3} direction="scale">
        <div className="mt-12 p-8 rounded-2xl border border-border bg-secondary/50 text-center max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl font-bold text-foreground">
            "Adoption is engineered. Not assumed."
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default EducationSection;
