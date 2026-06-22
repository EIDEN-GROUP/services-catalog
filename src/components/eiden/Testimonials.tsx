import { motion } from "framer-motion";
import { useState } from "react";
import logoAllAccor from "@/assets/All Accor.png";
import logoBoPassage from "@/assets/bopassage.png";
import logoChillOut from "@/assets/chill-out.png";
import logoDmc from "@/assets/dmc.png";
import logoEducazenKids from "@/assets/educazenkids.png";
import logoLunjaVillage from "@/assets/lunja-village.png";
import logoMedicalBay from "@/assets/medical-bay.png";

const TESTIMONIALS = [
  {
    q: "EIDEN n'a pas livré une stratégie ; ils ont reconstruit le système qui fait tourner nos opérations. Six mois plus tard, nous gérons 35 % de charge en plus avec la même équipe. Ce n'est pas du conseil. C'est de l'architecture.",
    n: "Amine El Idrissi",
    r: "Directeur Général",
    c: "bg-forest text-canvas",
  },
  {
    q: "Personne n'a regardé notre activité avec cette rigueur. Le diagnostic seul a payé l'engagement entier.",
    n: "Sophia M.",
    r: "Directrice générale · DMC",
    c: "bg-mondrian-yellow text-forest",
  },
  {
    q: "Marque, marketing et opérations alignés sur une seule logique. Coût d'acquisition −38 % en un trimestre.",
    n: "Karim L.",
    r: "Fondateur · E-commerce",
    c: "bg-canvas text-forest border border-forest/15",
  },
];

const BRAND_LOGOS = [
  { name: "All Accor", src: logoAllAccor },
  { name: "Bô Passage Café & More", src: logoBoPassage },
  { name: "Chill Out Bar & Lounge", src: logoChillOut },
  { name: "DMC Hospitality Morocco", src: logoDmc },
  { name: "EducazenKids", src: logoEducazenKids },
  { name: "Lunja Village Resort", src: logoLunjaVillage },
  { name: "Medical Bay", src: logoMedicalBay },
];

export function Testimonials({ onCommission }: { onCommission: () => void }) {
  const [tIndex, setTIndex] = useState(0);

  return (
    <section id="testimonials" className="relative bg-forest text-cream py-16 overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Title + Slider side‑by‑side */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left column – Title */}
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-gold mb-4">SECTION 03 · TÉMOIGNAGES</div>
            <h2 className="font-display font-light text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
              Les fondateurs qui ont reconstruit leur structure avec{" "}
              <span className="font-display-wonk italic text-gold">EIDEN</span>
              <span className="text-mondrian-red">.</span>
            </h2>
          </div>

          {/* Right column – Controls + Slider */}
          <div className="md:col-span-7">
            {/* Navigation buttons – aligned right */}
            <div className="flex justify-end gap-2 mb-6">
              <button
                aria-label="Témoignage précédent"
                onClick={() =>
                  setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                }
                className="h-10 w-10 grid place-items-center rounded-full border border-cream/30 text-cream transition hover:border-cream hover:bg-cream/10 focus-ring"
              >
                ←
              </button>
              <button
                aria-label="Témoignage suivant"
                onClick={() => setTIndex((i) => (i + 1) % TESTIMONIALS.length)}
                className="h-10 w-10 grid place-items-center rounded-full border border-cream/30 text-cream transition hover:border-cream hover:bg-cream/10 focus-ring"
              >
                →
              </button>
            </div>

            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ transform: `translateX(-${tIndex * 100}%)` }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-full grid grid-cols-[auto,1fr] md:grid-cols-12 gap-2 md:gap-10"
                  >
                    {/* Quote mark – auto width on mobile, column span on desktop */}
                    <div className="md:col-span-2 font-display text-2xl sm:text-3xl md:text-9xl leading-none text-gold/30">
                      "
                    </div>
                    {/* Quote text – takes remaining space */}
                    <div className="md:col-span-10 min-w-0">
                      <blockquote className="font-display text-base sm:text-lg md:text-2xl lg:text-[32px] leading-[1.28] tracking-[-0.01em] break-words">
                        {t.q}
                      </blockquote>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full grid place-items-center bg-gold text-forest font-mono text-xs shrink-0">
                          {t.n[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="font-head text-sm font-medium truncate">{t.n}</div>
                          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/70 truncate">
                            {t.r}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-10 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => setTIndex(i)}
                  className={`h-0.5 rounded-full transition-all ${
                    i === tIndex ? "w-12 bg-gold" : "w-[18px] bg-cream/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 text-center"
        >
          <button
            onClick={onCommission}
            className="group inline-flex items-center gap-3 rounded-full bg-gold text-forest px-7 py-4 font-head text-sm font-medium transition hover:bg-mondrian-red hover:text-canvas focus-ring"
          >
            Réserver mon appel gratuit
            <span className="grid place-items-center h-7 w-7 rounded-full bg-forest/15 transition group-hover:bg-canvas/25">
              →
            </span>
          </button>
        </motion.div>

        {/* Brand strip marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-8"
        >
          <div className="-mx-5 md:-mx-10">
            <div className="overflow-hidden">
              <div className="marquee-track flex items-center md:gap-8 px-5 md:px-10 will-change-transform">
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-28 h-28 md:w-35 md:h-35 flex items-center justify-center"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}