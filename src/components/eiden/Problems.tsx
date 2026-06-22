import { motion } from "framer-motion";
import { TrendingDown, Users, Workflow, Compass } from "lucide-react";

const ITEMS = [
  { I: TrendingDown, t: "Vos ventes plafonnent", d: "Vous poussez plus fort sur le marketing    le chiffre, lui, ne suit plus." },
  { I: Users, t: "Votre équipe s'épuise", d: "Tout passe par vous. Chaque décision, chaque urgence, chaque arbitrage." },
  { I: Workflow, t: "Vos process fuient", d: "Les leads se perdent, les relances s'oublient, les opérations improvisent." },
  { I: Compass, t: "Vous pilotez à l'aveugle", d: "Pas de tableau de bord. Pas de cap. Les décisions reposent sur l'intuition." },
];

export function Problems({ onCommission }: { onCommission: () => void }) {
  return (
    <section id="problems" className="relative bg-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 paper-grid opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-12 pb-8 border-b-2 border-forest">
          <div className="md:col-span-3 font-mono text-[10px] text-forest/70">
            <div>SECTION 01</div>
            <div className="mt-1">SYMPTÔMES    04</div>
          </div>
          <h2 className="md:col-span-9 font-display font-light text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            Reconnaissez-vous l'un de ces <span className="font-display-wonk italic text-teal">signaux</span>
            <span className="text-mondrian-red">?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ITEMS.map(({ I, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-canvas border border-forest/15 p-6 md:p-7 hover:border-forest transition"
            >
              <div className="font-mono text-[10px] text-forest/40">0{i + 1}</div>
              <I className="mt-5 h-6 w-6 text-teal group-hover:text-mondrian-red transition" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl leading-tight text-balance">{t}</h3>
              <p className="mt-3 text-sm text-forest/70 leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={onCommission} className="inline-flex items-center gap-3 rounded-full bg-forest text-canvas px-7 py-4 font-head text-sm font-medium hover:bg-teal transition focus-ring">
            Diagnostiquer mon activité    gratuit
            <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
