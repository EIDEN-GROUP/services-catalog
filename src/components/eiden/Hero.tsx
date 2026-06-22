import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import iconLogo from "@/assets/icon.png";
import logo from "@/assets/logo-1.png";

export function Hero({ onCommission }: { onCommission: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section id="hero" ref={ref} className="relative md:min-h-[88svh] bg-canvas text-forest overflow-hidden" >
      {/* Mondrian composition */}
      <div className="absolute inset-0 paper-grid opacity-70" />

      {/* color blocks */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1], delay: 0.2 }}
        style={{ originY: 0, background: "#CFC292" }}
        className="absolute top-0 right-0 h-[28vh] w-[18vw] md:h-[36vh]"
      />
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1], delay: 0.5 }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 h-10 w-1/3 bg-forest md:h-28 md:w-[22vw]"
      />
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.8 }}
        style={{ originX: 1, background: "#0E7A73" }}
        className="absolute bottom-0 right-0 hidden md:block md:h-20 md:w-[14vw]"
      />

      {/* rules (Mondrian black lines) */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.1 }}
        style={{ originX: 0 }}
        className="absolute top-[28vh] inset-x-0 h-[1px] mondrian-rule md:top-[24vh]"
      />
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, delay: 0.15 }}
        style={{ originY: 0 }}
        className="absolute top-0 bottom-0 right-[18vw] w-[2px] mondrian-rule"
      />
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, delay: 0.35 }}
        style={{ originY: 0 }}
        className="absolute bottom-0 top-[28vh] left-[34vw] w-[2px] mondrian-rule md:top-[24vh]"
      />

      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-16 pb-16 md:pb-20 md:min-h-[88svh] flex flex-col">
        
        {/* top meta row   Swiss */}
        {/* <div className="flex items-start justify-between gap-6 mb-12 md:mb-20">
          <div className="font-mono text-[10px] md:text-xs text-forest/70 leading-relaxed">
            <img src={logo} alt="Eiden Group" className="h-7 md:h-8 w-auto" />
          </div>
          <div className="font-mono text-[10px] md:text-xs text-forest/70 text-right">
            <div>EIDEN   ARCHITECTURE D'ENTREPRISE</div>
            <div className="mt-1 flex items-center justify-end gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mondrian-red opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mondrian-red" />
              </span>
              APPELS OUVERTS
            </div>
          </div>
        </div> */}

        {/* headline */}
        <h1 className="font-display font-light text-[clamp(2.25rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.03em] text-balance max-w-[14ch]">
          {"Pas un problème de".split(" ").map((w, i) => (
            <motion.span key={i} initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.4 + i*0.08, duration: 0.9, ease:[0.22,1,0.36,1] }} className="inline-block mr-[0.25em]">{w}</motion.span>
          ))}
          <br />
          <motion.span initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.85, duration: 0.9 }} className="inline-block mr-[0.25em]">stratégie.</motion.span>
          <br />
          <motion.span initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} transition={{ delay: 1.0, duration: 1 }} className="font-display-wonk italic text-teal">
            Un problème de structure
          </motion.span>
          <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.4 }} className="text-mondrian-red">.</motion.span>
        </h1>

        {/* deck row */}
        <div className="mt-12 md:mt-auto md:pt-10 grid md:grid-cols-12 gap-8 items-end">
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 1.4, duration:0.8 }} className="md:col-span-5 font-display text-xl md:text-2xl leading-[1.35] text-gold">
            Réservez un appel gratuit de 30 minutes avec EIDEN   le premier cabinet d'Architecture d'Entreprise au Maroc   et voyez exactement où la vôtre se fissure.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 1.55, duration:0.8 }} className="md:col-span-4 md:col-start-7 flex flex-col gap-3">
            <button onClick={onCommission} className="group inline-flex items-center justify-between gap-3 rounded-full bg-forest px-7 py-4 font-head text-sm font-medium text-canvas hover:bg-teal transition focus-ring">
              <span>Réserver mon appel gratuit</span>
              <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition">→</span>
            </button>
            <div className="font-mono text-[10px] text-forest/60 leading-relaxed">
              Gratuit · 30 minutes · Sans deck commercial · Sans engagement
            </div>
            <a href="#services" className="inline-flex items-center justify-between font-label text-[10px] text-teal-lt hover:text-forest transition border-b border-teal-lt pb-2">
              <span>Voir ce qui fuit dans votre activité</span>
              <span>↓</span>
            </a>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.8, duration:1 }} className="md:col-span-2 md:col-start-11 hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-forest/60">
            <img src={iconLogo} alt="" className="h-12 w-12 opacity-50 drift" style={{ filter: "brightness(0.3) sepia(0.6)" }} />
            <div className="text-right leading-relaxed">
              fig.01<br />composition<br />liminaire
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}