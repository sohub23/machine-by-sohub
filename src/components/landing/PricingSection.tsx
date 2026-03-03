import ScrollReveal from "../ScrollReveal";
import { ShoppingCart, Handshake, Wrench, Building2, ArrowRight } from "lucide-react";

const models = [
  {
    icon: ShoppingCart,
    title: "Machine Purchase",
    desc: "Buy machines outright with full SOHUB ecosystem integration included. You own the hardware, we provide the platform.",
    ideal: "Businesses wanting full ownership",
  },
  {
    icon: Handshake,
    title: "Revenue Share",
    desc: "We deploy and maintain the machines at your location. Revenue is split—zero upfront cost for you.",
    ideal: "Location owners with high foot traffic",
  },
  {
    icon: Wrench,
    title: "Custom Integration",
    desc: "Already have machines? We retrofit them with our backend, payment, and monitoring stack.",
    ideal: "Existing machine operators",
  },
  {
    icon: Building2,
    title: "Enterprise",
    desc: "Multi-location deployments with dedicated support, custom SLAs, and white-label dashboard options.",
    ideal: "Chains, campuses, large-scale operators",
  },
];

const WHATSAPP_URL = `https://wa.me/8801922036882?text=${encodeURIComponent("Hi, I'd like to discuss pricing and deployment options.")}`;

const PricingSection = () => (
  <section id="pricing" className="section-padding">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="section-badge">Business Models</span>
          <h2 className="heading-section">Flexible ways to get started</h2>
          <p className="body-large mt-4 max-w-2xl mx-auto">
            Whether you want to buy, share revenue, or integrate existing machines—we have a model that fits.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((m, i) => (
          <ScrollReveal key={m.title} delay={i * 0.08}>
            <div className="card-clean h-full group flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <m.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
              <p className="body-base text-sm flex-1">{m.desc}</p>
              <p className="text-xs font-medium text-accent mt-4">Ideal for: {m.ideal}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="text-center mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group"
          >
            Discuss Pricing on WhatsApp
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default PricingSection;
