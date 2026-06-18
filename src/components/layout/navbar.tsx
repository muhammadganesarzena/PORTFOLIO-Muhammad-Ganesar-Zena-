import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Terminal, Download, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "@/context/sound-context";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Project & Experience", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Organizations", href: "#organizations" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { muted, toggleMute } = useSoundContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 120) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Floating pill navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`pointer-events-auto mt-4 mx-4 w-full max-w-4xl rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-black/60 shadow-lg shadow-black/30"
            : "bg-black/30"
        }`}
      >
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => scrollTo(e as any, "#hero")}
            className="flex items-center gap-2 text-base font-serif font-bold text-white group shrink-0"
          >
            <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
              <Terminal size={15} />
            </div>
            <span>
              Ganesar<span className="text-white/50">Zena</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/10 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              title={muted ? "Unmute sounds" : "Mute sounds"}
              className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <Button
              size="sm"
              className="rounded-xl bg-white text-black hover:bg-white/90 font-medium text-xs h-8 px-3"
              asChild
            >
              <a href="/CV_Muhammad_Ganesar_Zena.pdf" download="CV_Muhammad_Ganesar_Zena.pdf">
                <Download className="mr-1.5 h-3.5 w-3.5" /> Download CV
              </a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              title={muted ? "Unmute sounds" : "Mute sounds"}
              className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10 h-8 w-8 rounded-lg"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10"
            >
              <nav className="px-4 py-4 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => scrollTo(e, item.href)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
                <Button
                  size="sm"
                  className="mt-2 w-full rounded-xl bg-white text-black hover:bg-white/90 font-medium"
                  asChild
                >
                  <a href="/CV_Muhammad_Ganesar_Zena.pdf" download="CV_Muhammad_Ganesar_Zena.pdf">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </a>
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
