import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import iconLogo from "@/assets/icon.png";
// import logo from "@/assets/logo-1.png"; // kept for parity, unused in this composition

export function Hero({ onCommission }: { onCommission: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative md:min-h-[88svh] bg-canvas text-forest overflow-hidden"
    >
      {/* paper grid */}
      <div className="absolute inset-0 paper-grid opacity-70" />

      {/* ── Mondrian composition ───────────────────────────────────── */}

      {/* gold block — top right, slimmer, more editorial */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ originY: 0, background: "#CFC292" }}
        className="absolute top-0 right-0 h-[32vh] w-[14vw] md:h-[42vh]"
      />

      {/* thin vertical teal rail — connective tissue */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        style={{ originY: 0, background: "#0E7A73" }}
        className="absolute top-0 right-[14vw] hidden md:block h-[24vh] w-[3px]"
      />

      {/* FOREST anchor block — bottom left, sized to the paragraph above
          (paragraph sits in md:col-span-5 of a max-w-[1400px] container,
          ≈ 40vw wide; height covers the deck row band) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 h-14 w-1/2 bg-forest md:h-[34vh] md:w-[42vw]"
      />

      {/* small red signature square — Mondrian punctuation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        className="absolute bottom-0 left-[42vw] hidden md:block h-6 w-6 bg-mondrian-red"
      />

      {/* teal slab — bottom right counter-weight */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        style={{ originX: 1, background: "#0E7A73" }}
        className="absolute bottom-0 right-0 hidden md:block md:h-24 md:w-[18vw]"
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-20 pb-16 md:pb-24 md:min-h-[88svh] flex flex-col justify-between h-screen"
      >

        {/* headline */}
        <h1 className="font-display font-light text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] tracking-[-0.03em] md:pt-16">
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

        {/* deck row — paragraph sits ABOVE the forest block, CTA floats over canvas */}
        <div className="md:pt-10 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="md:col-span-5 font-display text-xl md:text-2xl leading-[1.35] text-gold-dk"
          >
            Réservez 30 minutes avec EIDEN, premier cabinet d'Architecture
            d'Entreprise au Maroc. On vous dit exactement où votre structure se
            fracture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.8 }}
            className="md:col-span-4 md:col-start-7 flex flex-col gap-3"
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
              Gratuit · 30 minutes · Sans deck commercial · Sans engagement
            </div>
            <a
              href="#services"
              className="inline-flex items-center justify-between font-label text-[10px] text-teal-lt hover:text-forest transition border-b border-teal-lt pb-2"
            >
              <span>Voir ce qui fuit dans votre activité</span>
              <span>↓</span>
            </a>
          </motion.div>

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
            <div className="text-right leading-relaxed">
              fig.01<br />composition<br />liminaire
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
