import { useRef, useEffect } from "react";
import ScrollReveal from "../ScrollReveal";
import ContactModal from "../ContactModal";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

interface VideoSlot {
  title: string;
  youtubeId: string;
}

const videos: VideoSlot[] = [
  { title: "Snack Vending Machines at Huawei", youtubeId: "4835onrVx34" },
  { title: "O Mama Launching at SAVOR", youtubeId: "MOJZuKggX2c" },
  { title: "O Mama Food Platform Overview", youtubeId: "o8ahmgEQtZU" },
  { title: "How to use O Mama", youtubeId: "h5ylw8PR3_s" },
  { title: "Local Build Snack Vending Machines", youtubeId: "chWoJsI6XgY" },
  { title: "Power Bank Rental Station", youtubeId: "Y08VPoImhoA" },
  { title: "Smart Locker Vending", youtubeId: "jZk6Zv-q-zw" },
  { title: "O Mama Supply Chain", youtubeId: "BKgpm7SqQ9I" },
  { title: "How to Use O Mama", youtubeId: "oarN_-iWc_Y" },
  { title: "Clowee at Chilox", youtubeId: "IOxUbO_gcYE" },
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
                        <iframe
                          src={`https://www.youtube.com/embed/${v.youtubeId}`}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          loading="lazy"
                        />
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
