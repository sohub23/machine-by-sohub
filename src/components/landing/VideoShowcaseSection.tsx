import { useRef, useEffect } from "react";
import ScrollReveal from "../ScrollReveal";
import ContactModal from "../ContactModal";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

interface VideoSlot {
  title: string;
  youtubeId: string;
}

const videos: VideoSlot[] = [
  { title: "Power Bank Rental Station", youtubeId: "Y08VPoImhoA" },
  { title: "Smart Locker Vending", youtubeId: "jZk6Zv-q-zw" },
  { title: "Snack Vending Demo", youtubeId: "4835onrVx34" },
  { title: "Snack Machine Assembly", youtubeId: "chWoJsI6XgY" },
  { title: "Vending Operations", youtubeId: "RlywkUl-TCg" },
  { title: "Smart Fridge Overview", youtubeId: "" },
  { title: "Claw Machine Gameplay", youtubeId: "" },
  { title: "Dashboard Walkthrough", youtubeId: "" },
  { title: "Payment Integration", youtubeId: "" },
  { title: "Field Deployment", youtubeId: "" },
];

const VideoShowcaseSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 340, behavior: "smooth" });
        }
      }, 4000);
    };

    startAutoScroll();

    const stopAutoScroll = () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
    const resumeAutoScroll = () => {
      stopAutoScroll();
      startAutoScroll();
    };

    el.addEventListener("mouseenter", stopAutoScroll);
    el.addEventListener("mouseleave", resumeAutoScroll);
    el.addEventListener("touchstart", stopAutoScroll);
    el.addEventListener("touchend", resumeAutoScroll);

    return () => {
      stopAutoScroll();
      el.removeEventListener("mouseenter", stopAutoScroll);
      el.removeEventListener("mouseleave", resumeAutoScroll);
      el.removeEventListener("touchstart", stopAutoScroll);
      el.removeEventListener("touchend", resumeAutoScroll);
    };
  }, []);

  return (
    <section id="video-showcase" className="section-padding section-alt">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge">See It In Action</span>
            <h2 className="heading-section">Real Machines. Real Deployments.</h2>
            <p className="body-large mt-4">Not renders. Not concepts. Watch our machines operating in the field.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative">
            {/* Scroll buttons */}
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-secondary transition-colors hidden md:flex">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-secondary transition-colors hidden md:flex">
              <ChevronRight size={18} />
            </button>

            {/* Scrollable container */}
            <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {videos.map((v, i) => (
                <div key={i} className="flex-shrink-0 w-[300px] md:w-[320px] snap-start">
                  <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                    {v.youtubeId ? (
                      <div className="aspect-video relative">
                        <img
                          src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                          alt={v.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <a
                            href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300"
                          >
                            <Play size={22} className="text-accent-foreground ml-0.5" fill="currentColor" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-secondary/80 flex flex-col items-center justify-center text-muted-foreground">
                        <Play size={28} className="mb-2 opacity-40" />
                        <span className="text-xs opacity-60">Video coming soon</span>
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-sm font-semibold truncate">{v.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA buttons */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <ContactModal>
              <button className="btn-primary group">
                Request a Physical Visit
              </button>
            </ContactModal>
            <a
              href="https://www.youtube.com/playlist?list=PL5gB5kNB2iq31_cOhI2j6I1uXXSnRLmUE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
            >
              All Videos
              <ExternalLink size={14} className="ml-2" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
