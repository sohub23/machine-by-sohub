import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Initiative {
  id: string;
  name: string;
  description: string;
  href: string | null;
  logo: string;
  order: number;
  isActive: boolean;
}

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Machines", href: "#machines" },
  { label: "Payments", href: "#payments" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@solutionhubtechnologysohub", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
  { label: "Facebook", href: "https://www.facebook.com/solutionhubtechnologies", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { label: "LinkedIn", href: "https://www.linkedin.com/company/solution-hub-technologie-sohub", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch('https://sohub.netlify.app/api/initiatives.json', {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setInitiatives(Array.isArray(data) ? data : data.initiatives || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") return;
      
      const sections = navLinks.map(link => link.href.slice(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(current ? `#${current}` : "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className={`bg-secondary/50 border-b border-border/50 transition-all duration-300 overflow-hidden ${
        scrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
      }`}>
        <div className="section-container py-2">
          <div className="flex items-center justify-between">
            <a href="https://sohub.com.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <img src="/logo/solution-hub-technologies.png" alt="Solution Hub" className="h-8" />
              <p className="text-xs md:text-sm text-muted-foreground">
                <span className="hidden sm:inline">Solution Hub Technologies(SOHUB) Owned & Operated</span>
                <span className="sm:hidden">SOHUB Owned & Operated</span>
              </p>
            </a>
            <DropdownMenu modal={false} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-[12px] sm:text-sm text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-1 mr-[-1rem] sm:mr-0">
                  Our Initiatives
                  {dropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[320px] p-3" sideOffset={5}>
                <div className="grid grid-cols-3 gap-3">
                  {initiatives.map((initiative) => {
                    const isCurrentSite = initiative.id === 'machine' || initiative.name.toLowerCase().includes('machine');
                    return initiative.href ? (
                      <a
                        key={initiative.id}
                        href={initiative.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center p-4 rounded-lg border ${
                          isCurrentSite 
                            ? 'border-accent bg-accent/10 ring-2 ring-accent/30' 
                            : 'border-border'
                        }`}
                      >
                        <img src={`https://sohub.netlify.app${initiative.logo}`} alt={initiative.name} className="w-full h-full object-contain" />
                      </a>
                    ) : (
                      <div
                        key={initiative.id}
                        className="flex items-center justify-center p-4 rounded-lg border border-border opacity-50 cursor-not-allowed"
                      >
                        <img src={`https://sohub.netlify.app${initiative.logo}`} alt={initiative.name} className="w-full h-full object-contain" />
                      </div>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-background/80 backdrop-blur-md border-b border-border/50"
      >
      <div className="section-container flex items-center justify-between h-14 md:h-14">
        <Link to="/" className="flex items-center" onClick={handleLogoClick}>
          <img 
            src="/logo/machine-by-sohub.png" 
            alt="Machine by SOHUB" 
            className="h-7 md:h-10 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm transition-colors px-3 py-2 rounded-full ${
                  isActive 
                    ? "text-accent bg-accent/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <button
          className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <nav className="section-container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left text-base transition-colors py-2 px-3 rounded-lg ${
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <div className="flex items-center gap-3 mt-4 px-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default Header;
