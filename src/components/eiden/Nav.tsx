import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import logo from "@/assets/logo-1.png";

const PHONE = "+212 7 77 77 74 28";
const PHONE_HREF = "tel:+212777777428";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(254,253,251,0)", "rgba(254,253,251,0.9)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(18,38,32,0)", "rgba(18,38,32,0.1)"]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-3.5 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-2.5 min-w-0">
          <img src={logo} alt="Eiden Group" className="h-7 md:h-8 w-auto shrink-0" />
        </a>

        <a
          href={PHONE_HREF}
          className="group inline-flex items-center gap-2.5 rounded-full bg-forest text-canvas px-4 md:px-5 py-2.5 font-mono text-[11px] md:text-xs hover:bg-teal transition focus-ring"
          aria-label={`Appeler ${PHONE}`}
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden sm:inline tracking-wider">{PHONE}</span>
          <span className="sm:hidden">Appeler</span>
        </a>
      </div>
    </motion.header>
  );
}
