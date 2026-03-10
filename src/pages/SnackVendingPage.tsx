import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, ArrowRight, Plus, Minus, ShoppingBag, ChevronDown, ChevronUp, Play } from "lucide-react";
import vendingImg from "@/assets/machine-vending.jpg";
import dashboardImg from "@/assets/dashboard-ecosystem.jpg";
import importedMachineImg from "@/assets/imported_sv_1.png";
import localMachineImg from "@/assets/sohub-snacks-local.png";
import importedSv1 from "@/assets/imported_sv_1.png";
import importedSv2 from "@/assets/imported_sv_2.png";
import importedSv3 from "@/assets/imported_sv_3.png";
import importedSv4 from "@/assets/imported_sv_4.png";
import importedSv5 from "@/assets/imported_sv_5.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface VideoSlot {
  title: string;
  youtubeId: string;
}

const videos: VideoSlot[] = [
  { title: "Snack Vending Machines at Huawei", youtubeId: "4835onrVx34" },
  { title: "Local Build Snack Vending Machines", youtubeId: "chWoJsI6XgY" },
  { title: "Veinding Machine Assembly ", youtubeId: "RlywkUl-TCg" },
  { title: "POS Payment", youtubeId: "fZHZeiDbxpU" },
];

const addOns = [
  { id: "chiller", name: "Built-in Chiller Unit", price: 35000, desc: "Refrigeration module for cold beverages and dairy products." },
  { id: "cashless", name: "POS Payment Module", price: 5000, desc: "Card payment integration hardware." },
  { id: "screen", name: "Touchscreen Display Upgrade", price: 10000, desc: "Starts with 10-inch interactive touchscreen display for product selection and promotions." },
  { id: "telemetry", name: "Advanced Telemetry Kit", price: 5000, desc: "Enhanced sensors for temperature, humidity, and stock-level precision." },
  { id: "branding", name: "Custom Branding Wrap", price: 12000, desc: "Full machine vinyl wrap with your company branding and colors." },
];

const backendPlan = { name: "SOHUB Backend Platform", price: 5000, period: "/month", features: ["Real-time sales dashboard", "Inventory & refill alerts", "Health monitoring & error logs", "Remote controls (restart/lock/disable)", "Daily reconciliation reports", "Role-based operator access"] };

const importedSpecs = [
  { label: "Dimensions", value: "183cm × 75cm × 78cm" },
  { label: "Display", value: "10-inch Touchscreen, Android 11" },
  { label: "Capacity", value: "300 SKU 6 Layers" },
  { label: "Spring", value: "Single & Double" },
  { label: "Product", value: "Snacks and Drinks" },
  { label: "Chiller Temp.", value: "4-25°C" },
  { label: "Gas", value: "R290" },
  { label: "Connectivity", value: "4G SIM + WiFi" },
  { label: "Payment", value: "Cashless Payment" },
  { label: "Material", value: "Metal, Glass & PVC" },
  { label: "Power", value: "220V / 460W (Chiller)" },
  { label: "Gross Weight", value: "250 kg" },
];

const localSpecs = [
  { label: "Capacity", value: "200-300 SKU" },
  { label: "Product", value: "Snacks and Drinks" },
  { label: "Connectivity", value: "WiFi" },
  { label: "Material", value: "Metal + Glass" },
  { label: "Dimensions", value: "183cm × 75cm × 78cm" },
  { label: "Payment", value: "Cashless Payment Only" },
];

const SnackVendingPage = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [step, setStep] = useState<"configure" | "checkout">("configure");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [machineType, setMachineType] = useState<"imported" | "local">("imported");
  const [loading, setLoading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const importedImages = [importedSv1, importedSv2, importedSv3, importedSv4, importedSv5];
  const localImages = [localMachineImg];
  const currentImages = machineType === "imported" ? importedImages : localImages;

  const basePrice = machineType === "imported" ? 340000 : 250000;
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find(a => a.id === id);
    if (!addon) return sum;
    if (machineType === "local" && id === "chiller") return sum;
    return sum + addon.price;
  }, 0);
  const unitPrice = basePrice + addOnTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const formatPrice = (n: number) => `৳${n.toLocaleString("en-BD")}`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const openImageModal = () => {
    setCurrentImageIndex(0);
    setShowImageModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const apiUrl = 'http://202.59.208.112/websites/machine-by-sohub/dist/api/send-order-email.php';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          location: form.location,
          notes: form.notes,
          machineType,
          quantity,
          addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.name || id),
          totalPrice,
          unitPrice
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        // Reset form and go back to configure after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setStep('configure');
          setForm({ name: '', company: '', phone: '', email: '', location: '', notes: '' });
          setSelectedAddOns([]);
          setQuantity(1);
        }, 3000);
      } else {
        alert('Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-44 md:pb-24" style={{ background: "var(--gradient-hero)" }}>
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="section-badge">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
                  Deployed & Available
                </span>
                <h1 className="heading-display mt-4">
                  Snack Vending{" "}
                  <span className="gradient-text">Machine</span>
                </h1>
                <p className="body-large mt-6 max-w-lg">
                  Local builds and imported chassis, integrated with the SOHUB ecosystem. Already deployed across multiple locations in Bangladesh.
                </p>
                <p className="text-sm text-muted-foreground mt-3 italic">
                  Sometimes we import chassis and integrate our brain. Sometimes we build locally. Either way: powered by SOHUB.
                </p>
                <button 
                  onClick={() => document.getElementById('purchase')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary mt-6 group"
                >
                  Continue to Order
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  {!isVideoPlaying ? (
                    <div className="group cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={`https://img.youtube.com/vi/4835onrVx34/maxresdefault.jpg`}
                          alt="Snack Vending Machine"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center group-hover:bg-foreground/50 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                          </div>
                        </div>

                        {/* Title Badge */}
                        <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-accent to-accent/80 backdrop-blur-sm rounded px-3 py-2 shadow-lg">
                          <p className="font-semibold text-white text-sm">
                            Snack Vending Machine
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src="https://www.youtube.com/embed/4835onrVx34?autoplay=1"
                      title="Snack Vending Machine"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Videos */}
        <section className="section-padding section-alt">
          <div className="section-container max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="section-badge">Watch More</span>
                <h2 className="heading-section">See It In Action</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {videos.map((video, index) => (
                    <CarouselItem key={video.youtubeId} className="basis-full sm:basis-1/2 md:basis-1/2">
                      <div className="p-1">
                        <div className="group">
                          <a
                            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative rounded-2xl overflow-hidden shadow-lg block hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                          >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-muted">
                              <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center group-hover:bg-foreground/50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Play className="w-6 h-6 text-white fill-current ml-1" />
                                </div>
                              </div>

                              {/* Title Badge */}
                              <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-accent to-accent/80 backdrop-blur-sm rounded px-2 py-1 shadow-lg">
                                <p className="font-semibold text-white text-xs truncate">
                                  {video.title}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </ScrollReveal>
          </div>
        </section>

        {/* Specs */}
        <section className="section-padding">
          <div className="section-container max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="section-badge">Specifications</span>
                <h2 className="heading-section">Built for Bangladesh Conditions</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {importedSpecs.map(s => (
                  <div key={s.label} className="p-5 rounded-xl bg-secondary/50 border border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Backend */}
        <section className="section-padding section-alt">
          <div className="section-container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <ScrollReveal direction="left">
                <img src={dashboardImg} alt="SOHUB Dashboard" className="rounded-2xl shadow-lg w-full" />
              </ScrollReveal>
              <ScrollReveal direction="right">
                <span className="section-badge">Backend</span>
                <h2 className="heading-section mt-2 mb-4">SOHUB Ecosystem Included</h2>
                <p className="body-base text-sm mb-5">Every machine connects to the SOHUB backend for real-time monitoring, payments, and control.</p>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <div className="flex items-baseline justify-between mb-4">
                    <h4 className="font-semibold">{backendPlan.name}</h4>
                    <span className="text-accent font-bold">{formatPrice(backendPlan.price)}<span className="text-xs text-muted-foreground font-normal">{backendPlan.period}</span></span>
                  </div>
                  <ul className="space-y-2">
                    {backendPlan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Configurator */}
        <section id="purchase" className="section-padding">
          <div className="section-container max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="section-badge">Purchase</span>
                <h2 className="heading-section">Configure Your Machine</h2>
                <p className="body-large mt-3">Select your configuration and submit an order request.</p>
              </div>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              {!submitted && step === "configure" && (
                <motion.div key="configure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: Options */}
                    <div className="lg:col-span-3 space-y-6">
                      {/* Machine Type Selection */}
                      <div className="p-6 rounded-2xl border border-border bg-card">
                        <h3 className="font-semibold text-lg mb-4">Machine Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => setMachineType("imported")}
                            className={`p-4 rounded-xl border transition-all text-left ${machineType === "imported" ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-border bg-card hover:border-accent/30"}`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${machineType === "imported" ? "bg-accent border-accent" : "border-border"}`}>
                                {machineType === "imported" && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className="font-medium">Imported Chassis - (With Chiller)</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Premium imported Chassis with SOHUB integration & chiller suported.</p>
                           <span className="text-lg font-bold text-right block">৳340,000</span>
                          </button>
                          <button
                            onClick={() => setMachineType("local")}
                            className={`p-4 rounded-xl border transition-all text-left ${machineType === "local" ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-border bg-card hover:border-accent/30"}`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${machineType === "local" ? "bg-accent border-accent" : "border-border"}`}>
                                {machineType === "local" && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className="font-medium">Local Build - (Without Chiller)</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Locally manufactured with SOHUB integration.</p>
                            <span className="text-lg font-bold text-right block">{formatPrice(250000)}</span>
                          </button>
                        </div>
                      </div>

                      {/* Base */}
                      <div className="p-6 rounded-2xl border border-border bg-card">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          <div className="md:col-span-9">
                            <h3 className="font-semibold text-lg mb-3">Snack Vending Machine ({machineType === "imported" ? "Imported Chassis" : "Locally Built"})</h3>
                            <button onClick={() => setShowSpecs(!showSpecs)} className="flex items-center gap-1 text-xs text-accent mb-3 hover:underline">
                              {showSpecs ? "Hide" : "View"} specifications {showSpecs ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                            <AnimatePresence>
                              {showSpecs && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-border/50">
                                    {(machineType === "imported" ? importedSpecs : localSpecs).map(s => (
                                      <div key={s.label} className="text-xs"><span className="text-muted-foreground">{s.label}:</span> <span className="font-medium">{s.value}</span></div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="md:col-span-3 flex justify-center">
                            <img 
                              src={machineType === "imported" ? importedMachineImg : localMachineImg} 
                              alt="Machine" 
                              className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" 
                              onClick={openImageModal}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Add-ons */}
                      <div>
                        <h3 className="font-semibold mb-3">Customize with Add-Ons</h3>
                        <div className="space-y-3">
                          {addOns.filter(a => !(machineType === "local" && a.id === "chiller")).map(a => (
                            <motion.button
                              key={a.id}
                              onClick={() => toggleAddOn(a.id)}
                              className={`w-full text-left p-4 rounded-xl border transition-all ${selectedAddOns.includes(a.id) ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-border bg-card hover:border-accent/30"}`}
                              whileTap={{ scale: 0.995 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedAddOns.includes(a.id) ? "bg-accent border-accent" : "border-border"}`}>
                                    {selectedAddOns.includes(a.id) && <Check size={12} className="text-white" />}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{a.name}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                                  </div>
                                </div>
                                <span className="text-sm font-semibold whitespace-nowrap ml-4">+{formatPrice(a.price)}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                        <span className="font-medium">Quantity</span>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Minus size={16} /></button>
                          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Plus size={16} /></button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-2">
                      <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card space-y-4">
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">{machineType === "imported" ? "Imported chassis" : "Local build"}</span><span>{formatPrice(basePrice)}</span></div>
                          {selectedAddOns.filter(id => !(machineType === "local" && id === "chiller")).map(id => {
                            const a = addOns.find(x => x.id === id)!;
                            return <div key={id} className="flex justify-between"><span className="text-muted-foreground">{a.name}</span><span>{formatPrice(a.price)}</span></div>;
                          })}
                          <div className="border-t border-border/50 pt-2 flex justify-between"><span className="text-muted-foreground">Unit price</span><span className="font-medium">{formatPrice(unitPrice)}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span>×{quantity}</span></div>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-baseline">
                            <span className="font-semibold">Total</span>
                            <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">+ {formatPrice(backendPlan.price)}/month backend per machine</p>
                        </div>
                        <button onClick={() => setStep("checkout")} className="btn-primary w-full group">
                          Continue to Order
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                        <p className="text-xs text-muted-foreground text-center">This is an order inquiry. Payment details will be confirmed separately.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {!submitted && step === "checkout" && (
                <motion.div key="checkout" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                  <button onClick={() => setStep("configure")} className="text-sm text-accent mb-6 hover:underline flex items-center gap-1">
                    ← Back to Configuration
                  </button>
                  <div className="card-clean mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2"><ShoppingBag size={18} /> Order Summary</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{quantity}× Snack Vending Machine — {formatPrice(basePrice)} each</p>
                      {selectedAddOns.map(id => {
                        const a = addOns.find(x => x.id === id)!;
                        return <p key={id}>+ {a.name} — {formatPrice(a.price)}</p>;
                      })}
                      <p className="font-semibold text-foreground pt-2 border-t border-border/50 mt-2">Total: {formatPrice(totalPrice)} + {formatPrice(backendPlan.price * quantity)}/month backend</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="card-clean space-y-5">
                    <h3 className="font-semibold text-lg">Your Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Company</label>
                        <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                        <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Deployment Location *</label>
                      <input type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="City, area, specific location" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Additional Notes</label>
                      <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any specific requirements or questions" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Order Request'
                      )}
                    </button>
                    <p className="text-xs text-muted-foreground text-center">Our team will contact you within 1 business day to confirm details and payment.</p>
                  </form>
                </motion.div>
              )}

              {submitted && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto" style={{ display: 'none' }}>
                  <div className="card-clean text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Check size={36} className="text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Order Request Submitted</h3>
                    <p className="text-muted-foreground mb-2">Thank you for your interest in the Snack Vending Machine.</p>
                    <p className="text-sm text-muted-foreground">Our team will review your configuration and contact you within 1 business day to confirm details and arrange payment.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-4xl max-h-[100vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentImages[currentImageIndex]} 
              alt={`Machine ${currentImageIndex + 1}`} 
              className="w-full h-full object-contain rounded-lg"
            />
            
            {/* Navigation buttons */}
            {currentImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ‹
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ›
                </button>
              </>
            )}
            
            {/* Image counter */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {currentImages.length}
              </div>
            )}
            
            {/* Close button */}
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {submitted && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-accent text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check size={20} />
            <span className="font-medium">Successfully submitted!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnackVendingPage;
