import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ITEMS = [
  { q: "C'est vraiment gratuit ?", a: "Oui. 30 minutes avec un associé EIDEN, sans aucun engagement. Nous croyons qu'un diagnostic clair vaut mieux qu'un pitch commercial." },
  { q: "Vais-je avoir affaire à un commercial ?", a: "Non. Chaque appel est mené par un associé du cabinet. Pas de SDR, pas de relance pression, pas de séquence commerciale." },
  { q: "Pour quelle taille d'entreprise ?", a: "Nous travaillons avec des structures de 5 à 250 collaborateurs    TPE en croissance, PME et ETI marocaines ou basées au Maghreb." },
  { q: "Quand aurai-je une réponse ?", a: "Sous 24 heures ouvrées. Chaque brief est lu personnellement par un associé qui vous propose un créneau adapté." },
  { q: "Travaillez-vous avec mon secteur ?", a: "Nous intervenons en transversal : hôtellerie, restauration, retail, services, e-commerce, santé, éducation, B2B. Le cadre EIDEN s'adapte à votre contexte." },
];

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const upd = () => setD(m.matches);
    upd();
    m.addEventListener("change", upd);
    return () => m.removeEventListener("change", upd);
  }, []);
  return d;
}

export function FAQ({ onCommission }: { onCommission: () => void }) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState<number[]>([]);

  useEffect(() => {
    setOpen(isDesktop ? [0] : []);
  }, [isDesktop]);

  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <section id="faq" className="relative bg-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-forest" />
      <div className="absolute top-0 left-1/3 h-1.5 w-1/3" style={{ background: "#0E7A73" }} />
      <div className="absolute top-0 right-0 h-1.5 w-[12%]" style={{ background: "#CFC292" }} />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 pb-8 border-b-2 border-forest">
          <h2 className="md:col-span-9 font-display font-light text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            Les questions qu'on nous pose <span className="font-display-wonk italic text-teal">avant l'appel</span>
            <span className="text-mondrian-red">.</span>
          </h2>
        </div>

        <div className="grid justify-center">
          <div className="md:col-span-9 md:col-start-4">
            <ul className="divide-y divide-forest/15 border-y border-forest/15">
              {ITEMS.map((it, i) => {
                const isOpen = open.includes(i);
                return (
                  <li key={i}>
                    <button onClick={() => toggle(i)} aria-expanded={isOpen} className="w-full flex items-start justify-between gap-6 py-5 md:py-6 text-left group focus-ring" >
                      <div className="flex items-start gap-4 md:gap-6 min-w-0">
                        <span className="font-mono text-[10px] text-forest/40 mt-2 shrink-0">0{i + 1}</span>
                        <span className="font-display text-lg md:text-2xl leading-snug text-pretty">{it.q}</span>
                      </div>
                      <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full border border-forest/25 text-forest group-hover:bg-forest group-hover:text-canvas transition">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 md:pl-16 text-forest/75 text-sm md:text-base leading-relaxed max-w-3xl">
                            {it.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="font-display text-lg md:text-xl text-forest/80 text-pretty">
            Une autre question ? Posez-la <span className="font-display-wonk italic text-teal">pendant l'appel</span>.
          </p>
          <button onClick={() => onCommission()} className="group inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red transition focus-ring">
            Réserver mon appel découverte
            <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 transition group-hover:bg-canvas/25">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}