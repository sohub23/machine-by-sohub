import ScrollReveal from "../ScrollReveal";
import { LayoutDashboard, BarChart3, Package, Activity, Settings2, ShieldCheck } from "lucide-react";
import dashboardImg from "@/assets/dashboard-ecosystem.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  { icon: LayoutDashboard, title: "Unified Dashboard", desc: "One view across every deployed machine, regardless of type or location." },
  { icon: BarChart3, title: "Live Analytics", desc: "Real-time sales, transaction logs, filtering, and anomaly detection." },
  { icon: Package, title: "Inventory & Refill", desc: "Stock tracking, refill alerts, and operator route assignments." },
  { icon: Activity, title: "Health Monitoring", desc: "Heartbeat, sensor data, error codes, and uptime tracking." },
  { icon: Settings2, title: "Remote Controls", desc: "Restart, lock, update pricing, and push configs remotely." },
  { icon: ShieldCheck, title: "Access & Audit", desc: "Role-based permissions with full activity logging." },
];

const screenshots = [
  { id: "dashboard", label: "Dashboard", image: dashboardImg, caption: "Unified machine management dashboard with real-time status overview" },
  { id: "analytics", label: "Analytics", image: dashboardImg, caption: "Sales analytics and transaction reporting across all machines" },
  { id: "inventory", label: "Inventory", image: dashboardImg, caption: "Inventory tracking with automated refill workflow management" },
  { id: "monitoring", label: "Monitoring", image: dashboardImg, caption: "Live health monitoring and diagnostic error logging" },
];

const BackendSection = () => (
  <section className="section-padding section-cool" id="platform">
    <div className="section-container">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge">Backend Platform</span>
          <h2 className="heading-section mb-6 whitespace-nowrap">
            One ecosystem powering every machine
          </h2>
          <p className="body-large">
            Every machine connects to the same platform — consistent data, consistent controls, consistent reliability. Monitor, manage, and scale from a single interface.
          </p>
        </div>
      </ScrollReveal>

      {/* Screenshot Tabs */}
      <ScrollReveal delay={0.1}>
        <div className="mb-20">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 bg-muted/60 backdrop-blur-sm rounded-xl p-1 mb-8">
              {screenshots.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="rounded-lg text-xs sm:text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-accent data-[state=active]:shadow-md transition-all"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {screenshots.map((s) => (
              <TabsContent key={s.id} value={s.id}>
                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/40" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">sohub.app/{s.id}</span>
                  </div>
                  <img
                    src={s.image}
                    alt={`SOHUB ${s.label} — ${s.caption}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-center body-base text-sm mt-4">{s.caption}</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </ScrollReveal>

      {/* Feature Grid */}
      <div className="grid-features">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.08}>
            <div className="card-clean h-full group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <f.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="body-base text-sm">{f.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Closing */}
      <ScrollReveal delay={0.3}>
        <p className="body-base text-center mt-14 max-w-2xl mx-auto italic border-l-2 border-accent pl-6 text-left">
          Whether we import chassis and integrate our brain, or build locally — every machine is powered by the SOHUB ecosystem.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default BackendSection;
