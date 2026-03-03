import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import vendingImg from "@/assets/machine-vending.jpg";
import smartFridgeImg from "@/assets/machine-smart-fridge.jpg";
import lockerImg from "@/assets/machine-locker.jpg";
import powerbankImg from "@/assets/machine-powerbank.jpg";
import clawImg from "@/assets/machine-claw.jpg";

interface MachineItem {
  img: string;
  title: string;
  desc: string;
  linkType: "internal" | "external";
  href: string;
  badge?: string;
}

const machines: MachineItem[] = [
  { img: vendingImg, title: "Snack Vending Machines", desc: "Local builds and imported units with chiller options. Stocked with local snacks, beverages, and essentials—tracked and refilled via the platform.", linkType: "internal", href: "/machines/snack-vending", badge: "Purchase Available" },
  { img: smartFridgeImg, title: "Smart Fridge Vending Machine", desc: "Chilled vending for beverages, dairy, drinks, and cold snacks with temperature monitoring. Glass-door display with smart inventory tracking.", linkType: "external", href: "https://omama.sohub.com.bd/", badge: "Deployed" },
  { img: lockerImg, title: "Smart Locker / Cabinet Vending", desc: "Secure compartment-based vending for higher-value items, parcels, or workplace supplies. Each locker cell individually monitored.", linkType: "internal", href: "/machines/smart-locker", badge: "Lab-Ready" },
  { img: powerbankImg, title: "Power Bank Rental", desc: "Grab-and-go power bank stations for transport hubs, campuses, and public spaces. Usage tracked, returns verified, payments automated.", linkType: "internal", href: "/machines/power-bank", badge: "Ready to Deploy" },
  { img: clawImg, title: "Claw Machines", desc: "Prize-based entertainment machines for malls, arcades, and retail spaces. Integrated with cashless payments and remote prize inventory management.", linkType: "external", href: "https://sohub.com.bd/clowee", badge: "Deployed" },
];

const MachinesSection = () => (
  <section id="machines" className="section-padding section-alt">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="section-badge">Products</span>
          <h2 className="heading-section">Machines under one ecosystem</h2>
          <p className="body-large mt-4">Different machines. Same platform. Same reliability.</p>
        </div>
      </ScrollReveal>

      {/* Featured: first machine large */}
      <ScrollReveal>
        <div className="card-interactive group mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-secondary">
              <img src={machines[0].img} alt={machines[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{machines[0].badge}</span>
              <h3 className="heading-card text-2xl mb-3">{machines[0].title}</h3>
              <p className="body-base text-sm mb-6">{machines[0].desc}</p>
              <Link to={machines[0].href} className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all w-fit">
                Configure & Order <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid: remaining 4 machines in 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {machines.slice(1).map((m, i) => (
          <ScrollReveal key={m.title} delay={i * 0.08}>
            <div className="card-interactive h-full group">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={m.img} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-2 block">{m.badge}</span>
                <h3 className="font-semibold text-sm mb-2">{m.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{m.desc}</p>
                {m.linkType === "external" ? (
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                    Learn more <ExternalLink size={12} />
                  </a>
                ) : (
                  <Link to={m.href} className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Platform Consistency */}
      <ScrollReveal delay={0.2}>
        <div className="mt-16 p-8 md:p-10 rounded-2xl border border-border bg-card text-center" style={{ background: "var(--gradient-card)" }}>
          <span className="section-badge">Consistency</span>
          <h3 className="heading-card text-2xl mb-3">One Platform. Every Machine.</h3>
          <p className="body-base text-sm max-w-2xl mx-auto mb-6">Backend dashboard, cashless payments, remote monitoring, alerts, inventory tracking, reconciliation reports, role-based access, audit trails, remote controls, and SLA support — standardized across all five machine types.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Backend Dashboard", "Cashless Payments", "Remote Monitoring", "Inventory Tracking", "Reconciliation", "Remote Controls"].map(f => (
              <span key={f} className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent/10 text-accent rounded-full px-3 py-1.5">
                <Check size={12} /> {f}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default MachinesSection;
