import ScrollReveal from "../ScrollReveal";
import { Building2, GraduationCap, Heart, Train, Home, ShoppingBag } from "lucide-react";

const cases = [
  { icon: Building2, title: "Offices & Factories", pain: "Employees leave premises for snacks and essentials, wasting time.", machine: "Snack vending + smart lockers", outcome: "On-site convenience, improved productivity, cashless transactions tracked." },
  { icon: GraduationCap, title: "University Campuses", pain: "Students need quick access to food, drinks, and power banks between classes.", machine: "Vending machines + power bank stations", outcome: "24/7 availability, student-friendly payments, usage analytics for administration." },
  { icon: Heart, title: "Hospitals", pain: "Visitors and staff need refreshments during long hours without leaving the building.", machine: "Chiller vending machines", outcome: "Hygienic, contactless access to essentials with real-time stock monitoring." },
  { icon: Train, title: "Transport Hubs", pain: "Commuters need fast purchases and phone charging at stations and terminals.", machine: "Vending + power bank rental", outcome: "High-traffic revenue generation with automated operations and remote monitoring." },
  { icon: Home, title: "Residential Complexes", pain: "Residents want convenience store access without leaving the compound.", machine: "Smart cabinet vending", outcome: "Building-level micro-retail with zero staffing costs." },
  { icon: ShoppingBag, title: "Retail Chains", pain: "Supplementary revenue points with minimal overhead.", machine: "Claw machines + vending", outcome: "Entertainment-driven foot traffic with integrated cashless payments." },
];

const UseCasesSection = () => (
  <section id="use-cases" className="section-padding section-alt">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="section-badge">Use Cases</span>
          <h2 className="heading-section">Proven in Bangladesh contexts</h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <ScrollReveal key={c.title} delay={i * 0.06}>
            <div className="card-clean h-full group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <c.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-4">{c.title}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-accent font-semibold shrink-0 mt-0.5">Pain</span>
                  <p className="text-muted-foreground">{c.pain}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-semibold shrink-0 mt-0.5">Fix</span>
                  <p className="text-muted-foreground">{c.machine}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-semibold shrink-0 mt-0.5">Win</span>
                  <p className="text-muted-foreground">{c.outcome}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
