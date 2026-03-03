import ScrollReveal from "../ScrollReveal";

const NormalizeSection = () => (
  <section id="ecosystem" className="section-padding">
    <div className="section-container text-center max-w-3xl mx-auto">
      <ScrollReveal>
        <span className="section-badge">Our Mission</span>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <h2 className="heading-section">
          We normalize smart machines as infrastructure.
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="body-large mt-6">
          Machines aren't magic. They're infrastructure—like electricity or internet. But infrastructure only works when the full stack is in place: monitoring, payments, maintenance, and user trust. That's what we build around every machine we deploy.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.15} direction="scale">
        <div className="mt-10 p-8 rounded-2xl border border-border bg-secondary/50">
          <p className="text-xl md:text-2xl font-bold text-foreground">
            "Hardware is easy. Ecosystem is hard. That's our job."
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default NormalizeSection;
