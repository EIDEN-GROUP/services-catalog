import { motion, useScroll, useTransform } from "framer-motion";
import icon from "@/assets/logo-1.png";

export function NavBottom({ onCommission }: { onCommission: () => void }) {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(254,253,251,0)", "rgba(254,253,251,0.85)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(18,38,32,0)", "rgba(18,38,32,0.08)"]);

  return (
    <>
      {/* En‑tête supérieur : logo + CTA */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: bg, borderColor: border }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center h-9 w-9 rounded-md bg-forest">
              <img
                src={icon}
                alt=""
                className="h-6 w-6"
                style={{ filter: "brightness(0) invert(0.93) sepia(0.3) saturate(2)" }}
              />
            </span>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-lg text-forest tracking-tight">
                EIDEN<span className="text-mondrian-red">.</span>
              </span>
              <span className="font-mono text-[9px] text-forest/60 mt-0.5">
                SERVICES   2026
              </span>
            </div>
          </a>

          <button
            onClick={onCommission}
            className="group inline-flex items-center gap-2.5 rounded-full bg-forest text-canvas px-5 py-2.5 font-head text-xs font-medium hover:bg-mondrian-red transition focus-ring"
          >
            <span className="hidden sm:inline">Commander</span>
            <span>→</span>
          </button>
        </div>
      </motion.header>

      {/* Barre de navigation inférieure : liens centrés */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed bottom-0 inset-x-0 z-40 bg-canvas/80 backdrop-blur-md border-t border-beige-dk/30 py-2.5 px-4"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-4 md:gap-8 flex-wrap font-label text-[10px] text-forest/70">
          <a href="#about" className="hover:text-forest transition whitespace-nowrap">
            À propos
          </a>
          <a href="#services" className="hover:text-forest transition whitespace-nowrap">
            Services
          </a>
          <a href="#testimonials" className="hover:text-forest transition whitespace-nowrap">
            Témoignages
          </a>
          <a href="#contact" className="hover:text-forest transition whitespace-nowrap">
            Contact
          </a>
        </div>
      </motion.nav>
    </>
  );
}