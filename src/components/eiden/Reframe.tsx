import { motion } from "framer-motion";

const STATS = [
  { k: "+35%", v: "de charge gérée à équipe constante" },
  { k: "−38%", v: "de coût d'acquisition en un trimestre" },
  { k: "24h", v: "de réponse personnelle d'un associé" },
  { k: "30min", v: "d'appel découverte, sans pitch" },
];

export function Reframe({ onCommission }: { onCommission: () => void }) {
  return (
    <section id="reframe" className="relative bg-canvas py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-forest" />
      <div className="absolute top-0 left-1/3 h-1.5 w-1/3" style={{ background: "#0E7A73" }} />
      <div className="absolute top-0 right-0 h-1.5 w-[12%]" style={{ background: "#CFC292" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
          <div className="md:col-span-2 font-mono text-[10px] text-forest/70">
            <div>SECTION 02</div>
            <div className="mt-1">REFRAME</div>
          </div>
          <h2 className="md:col-span-10 font-display font-light text-[clamp(2.25rem,5.5vw,5.5rem)] leading-[0.92] tracking-[-0.035em] text-balance">
            Ce n'est pas un problème de <span className="line-through decoration-mondrian-red decoration-2 text-forest/40">stratégie</span>.<br />
            C'est un problème de <span className="font-display-wonk italic text-teal">structure</span>
            <span className="text-mondrian-red">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          <p className="md:col-span-7 font-display text-lg md:text-2xl leading-snug text-forest/80 text-pretty">
            La plupart des entreprises n'ont pas besoin d'une nouvelle stratégie. Elles ont besoin d'une architecture qui tient    un cadre où la stratégie peut enfin produire. EIDEN conçoit ce cadre.
          </p>

          <ul className="md:col-span-5 grid grid-cols-2 gap-3">
            {STATS.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl border border-forest/15 p-4 bg-cream"
              >
                <div className="font-display text-3xl md:text-4xl tracking-tight text-teal">{s.k}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-forest/60 leading-snug">{s.v}</div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex justify-center">
          <button onClick={onCommission} className="inline-flex items-center gap-3 rounded-full border border-forest/30 px-6 py-3.5 font-head text-sm text-forest hover:bg-forest hover:text-canvas transition focus-ring">
            Réserver mon appel gratuit
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
