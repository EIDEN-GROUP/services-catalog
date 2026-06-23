import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Link } from "lucide-react";
import logo from "@/assets/logo-1.png";

const CONTACTS = [
  { I: Mail, label: "EMAIL", v: "contact@eiden-group.com", href: "mailto:contact@eiden-group.com" },
  { I: Link, label: "SITE WEB", v: "www.eiden-group.com", href: "https://www.eiden-group.com" },
];

/* ─── Shared inner layout (used by both static + sticky instances) ─── */
function NavInner() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-3.5 flex items-center justify-between gap-4 bg-transparent">
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-2.5 min-w-0 shrink-0">
        <img src={logo} alt="Eiden Group" className="h-7 md:h-8 w-auto shrink-0" />
      </a>

      {/* Contact items — desktop only (lg+) */}
      <div className="hidden lg:flex items-center gap-6">
        {CONTACTS.map(({ I, label, v, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-2.5 text-forest/70 hover:text-teal transition-colors duration-300"
          >
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-forest/[0.06]
              group-hover:bg-teal/10 border border-forest/5 group-hover:border-teal/20
              transition-all duration-300">
              <I className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest text-forest/40 group-hover:text-teal/60
                transition-colors duration-300 leading-none">{label}</span>
              <span className="font-mono text-[11px] tracking-wide mt-0.5">{v}</span>
            </div>
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="tel:+212777777428"
        className="group inline-flex items-center gap-2.5 rounded-full bg-forest text-canvas
          px-4 md:px-5 py-2.5 font-mono text-[11px] md:text-xs hover:bg-teal transition
          focus-ring shrink-0"
        aria-label="Appeler +212 7 77 77 74 28"
      >
        <Phone className="h-3.5 w-3.5" />
        <span className="hidden sm:inline tracking-wider">+212 7 77 77 74 28</span>
        <span className="sm:hidden">Appeler</span>
      </a>
    </div>
  );
}

/* ─── Nav ─── */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Static nav — sits in normal document flow at the top of the page */}
      <header className="relative w-full z-40 border-b border-forest/[0.07]">
        <NavInner />
      </header>

      {/* Sticky nav — slides down from top once user scrolls past 80px */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            key="sticky-nav"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl
              bg-[rgba(254,253,251,0.92)] border-b border-forest/10
              shadow-[0_1px_24px_rgba(18,38,32,0.07)]"
          >
            <NavInner />
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}