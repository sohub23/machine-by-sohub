import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Monitor, CreditCard, Wifi, Headphones, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-sohub-machine.png";

const machineTypes = [
  "Snack Vending Machines",
  "Smart Locker Systems",
  "PowerBank Rental Stations",
  "Smart Fridge Solutions",
  "Claw Gaming Machines",
];

const ROTATE_INTERVAL = 4500;

const trustItems = [
  { icon: Monitor, label: "One backend" },
  { icon: CreditCard, label: "Bangladesh payment-ready" },
  { icon: Wifi, label: "Remote monitoring" },
  { icon: Headphones, label: "Local support" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % machineTypes.length);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
  <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
    <div className="section-container pt-24 pb-8 md:pt-32 md:pb-12 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-badge mt-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          Machine Infrastructure Platform
        </span>
      </motion.div>

      <motion.h1
        className="max-w-4xl mx-auto mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block min-h-[1.65em] sm:min-h-[1.35em] px-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={machineTypes[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="text-accent inline-block"
            >
              {machineTypes[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="block mt-1 sm:mt-2">
          that actually work <span className="gradient-text">in Bangladesh.</span>
        </span>
      </motion.h1>

      <motion.p
        className="body-base max-w-xl mx-auto mt-4 text-sm sm:text-base"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        We build a local ecosystem—backend, payments, monitoring, and support—so machines run reliably at scale.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#machines" className="btn-primary group w-full sm:w-auto touch-manipulation" onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector("#machines");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}>
          Explore Machines
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </a>
        <a href="#video-showcase" className="btn-secondary w-full sm:w-auto touch-manipulation" onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector("#video-showcase");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}>
          Get a Demo
        </a>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="trust-strip mt-8 md:mt-10"
      >
        {trustItems.map((t) => (
          <motion.div key={t.label} variants={item} className="trust-strip-item">
            <t.icon size={14} className="text-accent" />
            <span>{t.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Hero Image */}
    <motion.div
      className="section-container pb-12 md:pb-20"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 max-w-5xl mx-auto">
        <img
          src={heroImage}
          alt="Smart vending machines and automated kiosks integrated with the SOHUB ecosystem"
          className="w-full h-auto object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
      </div>
    </motion.div>
  </section>
  );
};

export default HeroSection;
