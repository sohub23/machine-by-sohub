import ScrollReveal from "../ScrollReveal";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Assess", desc: "We study your location, foot traffic, target users, and infrastructure readiness to determine what machines fit." },
  { num: "02", title: "Select", desc: "Together we choose the right machine types, configurations, and payment methods for your context." },
  { num: "03", title: "Integrate", desc: "Machines are connected to the SOHUB backend, payments are configured, and the monitoring stack goes live." },
  { num: "04", title: "Operate", desc: "We handle ongoing monitoring, maintenance, refills coordination, and support—so machines keep running." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="section-padding">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-20">
          <span className="section-badge">Process</span>
          <h2 className="heading-section">How it works</h2>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`${i % 2 === 1 ? "lg:col-start-2 lg:text-left" : ""}`} style={{ direction: "ltr" }}>
                  <span className="step-number">{step.num}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-3">{step.title}</h3>
                  <p className="body-large">{step.desc}</p>
                </div>
                <div className={`hidden lg:flex justify-center ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <motion.div
                    className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                  >
                    <span className="text-xl font-bold text-accent">{step.num}</span>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
