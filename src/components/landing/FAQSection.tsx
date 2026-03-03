import ScrollReveal from "../ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Are you a trading company?", a: "No. We are a machine infrastructure company. We don't just import and sell machines—we build the entire ecosystem around them, including backend software, payment integration, monitoring, and support. Trading companies sell hardware. We deploy operational infrastructure." },
  { q: "What happens if a machine fails?", a: "Our monitoring system detects failures in real time and triggers alerts. Depending on the issue, we can resolve it remotely (restart, configuration change) or dispatch a technician with the right parts and playbook. We maintain spare parts inventory and offer SLA-backed response times." },
  { q: "Can I monitor all machines from one dashboard?", a: "Yes. Every machine—regardless of type—connects to the SOHUB platform. You get a unified view of sales, inventory, health status, error logs, and controls from a single dashboard with role-based access." },
  { q: "What payment methods do you support?", a: "We support EBL bank physical POS terminals for debit and credit cards, SSL Commerz for online payments, and bKash for mobile financial services. All payment methods are confirmed at the machine level before dispensing, with full reconciliation and anti-fraud guardrails built in." },
  { q: "Can I start small and scale later?", a: "Absolutely. Most deployments start with 1–5 machines at a single location. The platform is designed to scale from one machine to hundreds across multiple sites without changing your setup or workflow." },
  { q: "Can you integrate existing machines we already have?", a: "In many cases, yes. Our M2M integration service connects existing hardware to the SOHUB backend. We assess your current machines, determine integration feasibility, and retrofit them with our monitoring, payment, and control modules where possible." },
  { q: "Are your machines ready to deploy?", a: "Yes. Our Snack Vending Machines and Smart Lockers are ready to deploy today. Power Bank Stations and Smart Fridges are ready for pilot programs. Every machine ships with the SOHUB backend, payment integration, and monitoring pre-configured." },
  { q: "Do you provide training for our staff?", a: "Yes. We provide on-site training for operators, managers, and maintenance staff. We also supply Bangla-language guides, demo modes on machines, and QR-accessible help documentation for end users." },
];

const FAQSection = () => (
  <section id="faq" className="section-padding section-alt">
    <div className="section-container max-w-3xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="section-badge">FAQ</span>
          <h2 className="heading-section">Frequently asked questions</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  </section>
);

export default FAQSection;
