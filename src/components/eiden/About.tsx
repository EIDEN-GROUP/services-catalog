import { motion } from "framer-motion";

const STATS = [
  { k: "08", l: "Disciplines" },
  { k: "24h", l: "Réponse" },
  { k: "03", l: "Continents" },
  { k: "100%", l: "Sur-mesure" },
];

export function About({ onCommission }: { onCommission: () => void }) {
  return (
    <section id="about" className="relative bg-cream py-24 md:py-36 overflow-hidden">
      {/* Mondrian accents */}
      <div className="absolute top-0 right-0 h-2 w-1/3 bg-mondrian-red" />
      <div className="absolute top-0 right-0 h-1/3 w-2 bg-forest" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3 font-mono text-[10px] text-forest/70">
            <div>SECTION 01</div>
            <div className="mt-1">À PROPOS   EIDEN</div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
            className="md:col-span-9"
          >
            <h2 className="font-display font-light text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
              Quand la structure est juste, la <span className="font-display-wonk italic text-teal">croissance</span> devient une <span className="font-display-wonk italic">conséquence</span><span className="text-mondrian-red">.</span>
            </h2>

            <div className="mt-12 grid md:grid-cols-12 gap-10">
              <p className="md:col-span-7 font-display text-lg md:text-xl text-forest/80 leading-snug text-pretty">
                Nous avons fondé EIDEN sur une conviction : les entreprises qui durent ne sont pas les plus bruyantes   ce sont les plus cohérentes. Avant de produire un livrable, nous concevons le système qui le porte. Marque, marché, modèle, opérations : tout se connecte.
              </p>
              <div className="md:col-span-5 space-y-4 border-l border-forest/15 pl-6">
                <p className="text-forest/70 leading-relaxed text-sm">
                  Ce qui en résulte n'est pas de l'activité, mais une cohérence qui compose dans le temps.
                </p>
                <p className="font-mono text-[10px] text-forest/60">
                  Casablanca · Agadir · Montréal
                </p>
              </div>
            </div>

            {/* stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-forest/15 border border-forest/15">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-cream p-6"
                >
                  <div className="font-display font-light text-5xl text-forest">{s.k}</div>
                  <div className="mt-2 font-label text-[9px] text-forest/60">{s.l}</div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={onCommission}
              className="group mt-12 inline-flex items-center gap-3 font-head text-sm font-semibold text-forest border-b border-forest pb-2 hover:gap-5 transition-all"
            >
              Parlons de votre architecture
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
