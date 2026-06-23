import { motion } from "framer-motion";
import logoAllAccor from "@/assets/All Accor.png";
import logoBoPassage from "@/assets/bopassage.png";
import logoChillOut from "@/assets/chill-out.png";
import logoDmc from "@/assets/dmc.png";
import logoEducazenKids from "@/assets/educazenkids.png";
import logoLunjaVillage from "@/assets/lunja-village.png";
import logoMedicalBay from "@/assets/medical-bay.png";

const BRAND_LOGOS = [
  { name: "All Accor", src: logoAllAccor },
  { name: "Bô Passage Café & More", src: logoBoPassage },
  { name: "Chill Out Bar & Lounge", src: logoChillOut },
  { name: "DMC Hospitality Morocco", src: logoDmc },
  { name: "EducazenKids", src: logoEducazenKids },
  { name: "Lunja Village Resort", src: logoLunjaVillage },
  { name: "Medical Bay", src: logoMedicalBay },
];

export function BandBrands() {
  return (
    <section id="testimonials" className="relative bg-forest text-cream py-12 md:py-16 overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mb-10 md:mb-12 pb-6 md:pb-8 border-b-2 border-forest">
          <div className="md:col-span-3 font-mono text-[10px] text-gold">
            <div>SECTION 04</div>
            <div className="mt-1">TÉMOIGNAGES</div>
          </div>
          <h2 className="md:col-span-9 font-display font-light text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            Les fondateurs qui ont reconstruit leur structure avec{" "}
            <span className="font-display-wonk italic text-teal">EIDEN</span>
            <span className="text-mondrian-red">.</span>
          </h2>
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-4 md:pt-8"
        >
          <div className="-mx-5 md:-mx-10">
            <div className="overflow-hidden">
              <div className="marquee-track flex items-center gap-6 md:gap-8 px-5 md:px-10 will-change-transform">
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-20 pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center border-t-2 border-forest"
        >
          <p className="md:col-span-7 font-display text-lg sm:text-xl md:text-2xl leading-tight text-canvas">
            En 30 minutes, nous vous dirons exactement où votre activité perd de l'argent.{" "}
            <span className="font-display-wonk italic text-gold">Gratuitement.</span>
          </p>
          <div className="md:col-span-5 md:text-right">
            <button
              onClick={() => onCommission()}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-canvas px-6 py-3.5 md:px-7 md:py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red hover:border-mondrian-red transition focus-ring"
            >
              Réserver mon appel découverte
              <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 transition group-hover:bg-canvas/25 shrink-0">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
