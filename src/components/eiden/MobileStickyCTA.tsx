import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

export function MobileStickyCTA({ onCommission }: { onCommission: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;
      // show after user scrolls past hero, hide when contact form visible
      setShow(heroBottom < 0 && contactTop > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pt-2"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
        >
          <div className="flex items-stretch gap-2 rounded-full shadow-2xl shadow-forest/30">
            <button
              onClick={onCommission}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-head text-sm font-medium text-forest"
              style={{ background: "#CFC292" }}
            >
              Réserver mon appel gratuit
              <span>→</span>
            </button>
            <a
              href="tel:+212777777428"
              aria-label="Appeler"
              className="grid place-items-center h-12 w-12 rounded-full bg-forest text-canvas shrink-0"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
