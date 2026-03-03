import { useLocation } from "react-router-dom";

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

const Footer = () => {
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
  <footer className="border-t border-border bg-foreground">
    <div className="section-container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <img 
            src="/logo/machine-by-sohub.png" 
            alt="Machine by SOHUB" 
            className="h-10 w-auto mb-3 invert"
          />
          <p className="text-sm text-primary-foreground/60 max-w-sm leading-relaxed">
            Building reliable machine infrastructure for Bangladesh with integrated backend, payments, and technical support.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/40 hover:text-primary-foreground transition-colors p-2 rounded-full hover:bg-primary-foreground/10"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-primary-foreground/40 mt-4">
            A product of SOHUB — Solution Hub Technologies
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary-foreground">Platform</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/50">
            <li><button onClick={() => handleNavClick("#machines")} className="hover:text-primary-foreground transition-colors text-left">Machines</button></li>
            <li><button onClick={() => handleNavClick("#ecosystem")} className="hover:text-primary-foreground transition-colors text-left">Ecosystem</button></li>
            <li><button onClick={() => handleNavClick("#payments")} className="hover:text-primary-foreground transition-colors text-left">Payments</button></li>
            <li><button onClick={() => handleNavClick("#video-showcase")} className="hover:text-primary-foreground transition-colors text-left">Video Showcase</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary-foreground">Company</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/50">
            <li><button onClick={() => handleNavClick("#use-cases")} className="hover:text-primary-foreground transition-colors text-left">Use Cases</button></li>
            <li><button onClick={() => handleNavClick("#pricing")} className="hover:text-primary-foreground transition-colors text-left">Pricing</button></li>
            <li><button onClick={() => handleNavClick("#faq")} className="hover:text-primary-foreground transition-colors text-left">FAQ</button></li>
            <li><a href="https://wa.me/8801922036882" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} SOHUB — Solution Hub Technologies. All rights reserved.
      </div>
    </div>
  </footer>
);
};

export default Footer;
