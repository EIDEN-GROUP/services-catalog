import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import iconLogo from "@/assets/icon.png";

export function Hero({ onCommission }: { onCommission: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      id="hero"
      ref={ref}
      /* mobile → full screen / desktop → compact, content-driven */
      className="relative bg-canvas text-forest overflow-hidden min-h-svh md:min-h-0"
    >
      {/* paper grid */}
      <div className="absolute inset-0 paper-grid opacity-70" />

      {/* ── Mondrian composition ───────────────────────────────────── */}

      {/* gold block — top right (fixed px on desktop so it doesn't overflow short section) */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ originY: 0, background: "#CFC292" }}
        className="absolute top-0 right-0 h-[32vh] w-[14vw] md:h-[200px]"
      />

      {/* thin vertical teal rail */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        style={{ originY: 0, background: "#0E7A73" }}
        className="absolute top-0 right-[14vw] hidden md:block h-[120px] w-[3px]"
      />

      {/* forest anchor block — bottom left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 h-14 w-1/2 bg-forest md:h-[140px] md:w-[42vw]"
      />

      {/* small red signature square */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        className="absolute bottom-0 left-[42vw] hidden md:block h-6 w-6 bg-mondrian-red"
      />

      {/* teal slab — bottom right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        style={{ originX: 1, background: "#0E7A73" }}
        className="absolute bottom-0 right-0 hidden md:block md:h-16 md:w-[18vw]"
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <motion.div
        style={{ y }}
        className={[
          "relative z-10 mx-auto max-w-[1400px] px-5 md:px-10",
          /* mobile: spread content across full screen with padding */
          "pt-8 pb-20 flex flex-col justify-around",
          /* mobile full-screen spread / desktop compact with fixed padding */
          "min-h-svh md:min-h-0 md:pt-16 md:pb-20 md:gap-10 md:flex md:flex-col md:justify-start",
        ].join(" ")}
      >
        {/* headline */}
        <h1 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] tracking-[-0.03em]">
          <span className="block">
            {"Pas un problème de stratégie.".split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
          </span>

          <span className="block">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="font-display-wonk italic text-teal"
            >
              Un problème de structure
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-mondrian-red"
            >
              .
            </motion.span>
          </span>
        </h1>

        {/* sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="font-display text-sm md:text-lg leading-[1.35] text-gold-dk md:max-w-[52ch] mt-0 md:mt-6"
        >
          Réservez 30 min avec EIDEN, premier cabinet d'Architecture d'Entreprise au Maroc,
          pour optimiser l'organisation de votre structure.
        </motion.p>

        {/* CTA row */}
        <div className="flex justify-end">
          <div className="grid gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.8 }}
              className="md:col-span-4 md:col-start-1 flex flex-col gap-3"
            >
              <button
                onClick={onCommission}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-forest px-7 py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red transition focus-ring"
              >
                <span>Réserver mon appel gratuit</span>
                <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition">
                  →
                </span>
              </button>

              <div className="font-mono text-[10px] text-black/60 leading-relaxed">
                Gratuit · 30 minutes · Sans engagement
              </div>

              <a
                href="#services"
                className="inline-flex items-center justify-between font-label text-[10px] text-teal-lt hover:text-forest transition border-b border-teal-lt pb-2"
              >
                <span>Voir ce qui fuit dans votre activité</span>
                <span>↓</span>
              </a>
            </motion.div>

            {/* icon — far right, desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="md:col-span-2 md:col-start-11 hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-forest/60"
            >
              <img
                src={iconLogo}
                alt=""
                className="h-12 w-12 opacity-50 drift"
                style={{ filter: "brightness(0.3) sepia(0.6)" }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}