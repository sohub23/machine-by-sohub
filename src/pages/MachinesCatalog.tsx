import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, ArrowRight, ExternalLink } from "lucide-react";
import vendingImg from "@/assets/machine-vending.jpg";
import smartFridgeImg from "@/assets/machine-smart-fridge.jpg";
import lockerImg from "@/assets/machine-locker.jpg";
import powerbankImg from "@/assets/machine-powerbank.jpg";
import clawImg from "@/assets/machine-claw.jpg";

interface CatalogMachine {
  img: string;
  title: string;
  forDesc: string;
  solves: string;
  integration: string[];
  linkType: "internal" | "external";
  href: string;
  label: string;
}

const machines: CatalogMachine[] = [
  {
    img: vendingImg,
    title: "Snack Vending Machines",
    forDesc: "Offices, factories, hospitals, campuses, transport terminals",
    solves: "Provides 24/7 access to snacks, beverages, and essentials without staffing. Reduces employee downtime and visitor inconvenience.",
    integration: ["Local build and imported units with chiller", "Stock-level monitoring and refill alerts", "Cashless + cash payment support", "Daily sales and reconciliation reports", "Temperature monitoring for chilled units"],
    linkType: "internal", href: "/machines/snack-vending", label: "Configure & Purchase",
  },
  {
    img: smartFridgeImg,
    title: "Smart Fridge Vending Machine",
    forDesc: "Offices, co-working spaces, gyms, hospitals, retail lobbies",
    solves: "Chilled vending for beverages, dairy, drinks, and cold snacks with temperature monitoring and smart inventory tracking.",
    integration: ["Glass-door display with LED lighting", "Real-time temperature monitoring", "Cashless payment integration", "Stock-level alerts and analytics", "Remote diagnostics and control"],
    linkType: "external", href: "https://omama.sohub.com.bd/", label: "Visit Product Site",
  },
  {
    img: lockerImg,
    title: "Smart Locker / Cabinet Vending",
    forDesc: "Corporate offices, co-working spaces, residential complexes, retail stores",
    solves: "Secure, self-service dispensing of higher-value items, parcels, or workplace supplies. Each compartment individually controlled.",
    integration: ["Per-cell monitoring and access control", "QR or code-based unlock", "Inventory tracking per compartment", "Role-based operator access", "Usage analytics and audit trails"],
    linkType: "internal", href: "/machines/smart-locker", label: "View Details",
  },
  {
    img: powerbankImg,
    title: "Power Bank Rental Machines",
    forDesc: "Transport hubs, campuses, shopping centers, event venues, restaurants",
    solves: "On-the-go phone charging without cables or outlets. High-frequency, low-friction transactions in high-traffic areas.",
    integration: ["Deposit-free rental with mobile payment", "Multi-station return network support", "Battery health and charge-level tracking", "Usage analytics per station", "Anti-theft and non-return detection"],
    linkType: "internal", href: "/machines/power-bank", label: "View Details",
  },
  {
    img: clawImg,
    title: "Claw Machines",
    forDesc: "Malls, arcades, retail entertainment zones, family restaurants",
    solves: "Creates an engagement-based revenue stream with minimal staffing. Attracts foot traffic and increases dwell time.",
    integration: ["Cashless payment (bKash, Nagad, card)", "Real-time revenue tracking per machine", "Remote prize inventory management", "Play count analytics and win-rate configuration", "Remote restart and diagnostics"],
    linkType: "external", href: "https://sohub.com.bd/clowee", label: "Visit Product Site",
  },
];

const comparisonFeatures = [
  "Backend Dashboard", "Cashless Payments", "Remote Monitoring", "Alert System",
  "Inventory Tracking", "Reconciliation Reports", "Role-Based Access", "Audit Trails",
  "Remote Controls", "SLA Support",
];

const deploymentModels = [
  { title: "Machine Purchase", desc: "Buy machines outright. We handle integration, deployment, and ongoing ecosystem support. You own the hardware, we power the platform." },
  { title: "Revenue Share", desc: "We deploy machines at your location at no upfront cost. Revenue is split based on agreed terms. Ideal for testing demand." },
  { title: "Custom Integration", desc: "Already have machines? We integrate your existing hardware with the SOHUB backend for monitoring, payments, and control." },
  { title: "Enterprise", desc: "Large-scale, multi-location deployments with custom SLAs, dedicated support, and tailored platform configurations." },
];

const MachinesCatalog = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-badge">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              Product Catalog
            </span>
          </motion.div>
          <motion.h1 className="heading-display max-w-3xl mx-auto mt-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Choose the Machine.{" "}<span className="gradient-text">We Handle the Ecosystem.</span>
          </motion.h1>
          <motion.p className="body-large max-w-xl mx-auto mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            All machines are integrated with the SOHUB backend platform.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8">
            <a href="#catalog" className="btn-primary group">
              Explore by Category
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="catalog" className="section-padding">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-badge">Categories</span>
              <h2 className="heading-section">Machine Categories</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {machines.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="card-interactive h-full group">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img src={m.img} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6 md:p-8 space-y-4">
                    <h3 className="heading-card">{m.title}</h3>
                    <div className="text-sm space-y-3">
                      <div><p className="font-semibold text-foreground mb-1">For:</p><p className="text-muted-foreground">{m.forDesc}</p></div>
                      <div><p className="font-semibold text-foreground mb-1">What it solves:</p><p className="text-muted-foreground">{m.solves}</p></div>
                      <div>
                        <p className="font-semibold text-foreground mb-2">SOHUB Integration Includes:</p>
                        <ul className="space-y-1.5">
                          {m.integration.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-muted-foreground">
                              <Check size={14} className="shrink-0 mt-0.5 text-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {m.linkType === "external" ? (
                      <a href={m.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-accent mt-2 group-hover:gap-2 transition-all">
                        {m.label} <ExternalLink size={14} />
                      </a>
                    ) : (
                      <Link to={m.href} className="inline-flex items-center gap-1 text-sm font-semibold text-accent mt-2 group-hover:gap-2 transition-all">
                        {m.label} <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding section-alt">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-badge">Consistency</span>
              <h2 className="heading-section">Platform Consistency</h2>
              <p className="body-large mt-4 max-w-2xl mx-auto">Every machine type connects to the same ecosystem. Features are standardized.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="overflow-x-auto rounded-2xl border border-border shadow-lg bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left font-semibold p-4 border-b border-border">Feature</th>
                    {machines.map((m) => (
                      <th key={m.title} className="text-center font-semibold p-4 border-b border-border whitespace-nowrap">{m.title.split(" ")[0]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feat, i) => (
                    <tr key={feat} className={i % 2 === 0 ? "" : "bg-secondary/30"}>
                      <td className="p-4 border-b border-border/50 font-medium">{feat}</td>
                      {machines.map((m) => (
                        <td key={m.title} className="text-center p-4 border-b border-border/50">
                          <Check size={16} className="mx-auto text-accent" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="scale">
            <div className="mt-12 p-8 rounded-2xl border border-border bg-card text-center">
              <p className="text-xl md:text-2xl font-bold">"Standardized ecosystem. Machine type changes. Platform doesn't."</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Scale */}
      <section className="section-padding">
        <div className="section-container text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="section-badge">Scalability</span>
            <h2 className="heading-section mb-6">Start small. Scale confidently.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="body-large">Begin with a single machine at one location. The SOHUB platform is built to grow with you—from 1 machine to 100, from one site to a national network. No platform migration, no re-integration.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Deployment Models */}
      <section className="section-padding section-alt">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-badge">Flexibility</span>
              <h2 className="heading-section">Deployment models</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {deploymentModels.map((model, i) => (
              <ScrollReveal key={model.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="card-clean h-full group">
                  <h3 className="text-lg font-semibold mb-2">{model.title}</h3>
                  <p className="body-base text-sm">{model.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact-catalog" className="section-padding" style={{ background: "var(--gradient-cool)" }}>
        <div className="section-container text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="section-badge">Next Step</span>
            <h2 className="heading-section mb-6">Let's select the right machine for your use case.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="body-large mb-10">Tell us about your location, scale, and goals. We'll recommend the right setup and deployment model.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/#contact" className="btn-primary group">
                Book Consultation
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-secondary">Download Technical Brochure</button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default MachinesCatalog;
