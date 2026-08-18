import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, FileText, Send, Menu, X, ArrowRight } from "lucide-react";
import { portfolioData } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link tracker
      const sections = ["hero", "about", "experience", "skills", "projects", "sandbox", "awards", "education"];
      const current = sections.find((sect) => {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "sandbox", label: "Simulator" },
    { id: "awards", label: "Awards & Activities" },
    { id: "education", label: "Education" },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-indigo-50/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
            <span className="font-display text-white font-bold text-lg">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-brand-deep tracking-tight mb-[-2px] group-hover:text-brand-primary transition-colors">
              SEONGJUN.P
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              Trust Builder
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                activeSection === item.id
                  ? "text-brand-primary font-semibold"
                  : "text-slate-600 hover:text-brand-deep"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-brand-primary hover:bg-indigo-50/50 transition-all"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="flex items-center gap-2 bg-brand-deep hover:bg-brand-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:translate-y-[-1px] active:translate-y-0"
          >
            <span>Get in Touch</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-brand-light hover:text-brand-primary transition-colors"
          >
            <Send size={18} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl px-4 py-6 flex flex-col gap-3"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                activeSection === item.id
                  ? "bg-brand-light text-brand-primary font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-deep"
              }`}
            >
              {item.label}
            </button>
          ))}
          <hr className="border-slate-100 my-2" />
          <div className="flex items-center justify-between px-4">
            <span className="text-xs text-slate-400 font-mono">SOCIAL CHANNELS</span>
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                className="p-2 bg-slate-50 rounded-lg text-slate-600"
              >
                <Github size={18} />
              </a>
              <a
                href={portfolioData.personal.blog}
                target="_blank"
                className="text-xs text-brand-primary font-semibold underline"
              >
                Velog
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
