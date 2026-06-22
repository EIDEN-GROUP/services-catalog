import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingDown, Users, Workflow, Compass, DollarSign, Eye } from "lucide-react";
import { useRef } from "react";

const ITEMS = [
  { I: TrendingDown, t: "Vos ventes plafonnent", d: "Vous poussez plus fort sur le marketing, le chiffre, lui, ne suit plus." },
  { I: Users, t: "Vos ventes s'essoufflent", d: "Vous payez de la pub sur Instagram, mais vos marges fondent car votre marque ne retient personne." },
  { I: Workflow, t: "Vos process fuient", d: "Les leads se perdent, les relances s'oublient, les opérations improvisent." },
  { I: Compass, t: "Vous pilotez à l'aveugle", d: "Pas de tableau de bord. Pas de cap. Les décisions reposent sur l'intuition." },
  { I: DollarSign, t: "La guerre des prix vous asphyxie", d: "Les concurrents vous imitent et cassent les tarifs. Sans identité unique, vous survivez au rabais." },
  { I: Eye, t: "Vous êtes invisible ou mal compris", d: "Vos produits sont excellents, mais votre vitrine digitale fait fuir les clients chez les plus séduisants." },
];

function ProblemCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { I: Icon, t, d } = item;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative perspective-1000"
    >
      <div className="relative bg-canvas border border-forest/10 rounded-2xl p-7 md:p-8 
        hover:border-teal/30 transition-all duration-500 ease-out
        hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]
        overflow-hidden h-full">
        
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.03] via-transparent to-forest/[0.02] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Corner accent — draws itself in on hover */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-teal/30 to-transparent 
            translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-700 ease-out" />
          <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-teal/30 to-transparent 
            translate-x-[100%] group-hover:translate-x-0 transition-transform duration-700 ease-out delay-100" />
        </div>

        <div className="relative" style={{ transform: "translateZ(30px)" }}>
          {/* Number + Icon Row */}
          <div className="flex items-start justify-between mb-6">
            <motion.div 
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-forest/[0.06] 
                group-hover:bg-teal/10 border border-forest/5 group-hover:border-teal/20
                transition-all duration-500"
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="h-5 w-5 text-forest/50 group-hover:text-teal transition-colors duration-500" 
                strokeWidth={1.5} />
            </motion.div>
            
            <span className="font-mono text-[11px] text-forest/20 group-hover:text-teal/40 
              transition-colors duration-500 tracking-wider">
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-[1.3rem] leading-snug text-balance 
            group-hover:text-teal transition-colors duration-500 mb-3">
            {t}
          </h3>
          
          {/* Animated underline that expands on hover */}
          <div className="relative h-[2px] w-full mb-4 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-8 bg-forest/10 group-hover:w-full 
              group-hover:bg-teal/20 transition-all duration-700 ease-out" />
          </div>
          
          {/* Description */}
          <p className="text-[0.9rem] text-forest/55 leading-relaxed group-hover:text-forest/75 
            transition-colors duration-500">
            {d}
          </p>
        </div>

        {/* Bottom accent line glows on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent 
          via-teal/0 to-transparent group-hover:via-teal/30 transition-all duration-700" />
      </div>
    </motion.div>
  );
}

export function Problems({ onCommission }: { onCommission: () => void }) {
  return (
    <section id="problems" className="relative bg-cream py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 paper-grid opacity-40" />
      
      {/* Subtle ambient orbs for depth */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-forest/[0.02] rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-12 gap-8 mb-20 pb-8 border-b-2 border-forest"
        >
          <div className="md:col-span-3 font-mono text-[10px] text-forest/70 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal/60" />
              Section 01
            </div>
            <div className="mt-2 text-forest/50">Symptômes — 06</div>
          </div>
          <h2 className="md:col-span-9 font-display font-light text-[clamp(2.2rem,5.5vw,5rem)] 
            leading-[0.95] tracking-[-0.03em] text-balance">
            Reconnaissez-vous l'un de ces <span className="font-display-wonk italic text-teal">signaux</span>
            <span className="text-mondrian-red">?</span>
          </h2>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {ITEMS.map((item, i) => (
            <ProblemCard key={item.t} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-center"
        >
          <motion.button 
            onClick={onCommission}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-4 rounded-full bg-forest text-canvas 
              px-9 py-4.5 font-head text-sm font-medium hover:bg-teal transition-colors duration-300 
              focus-ring shadow-lg shadow-forest/10 hover:shadow-teal/20"
          >
            <span>Diagnostiquer mon activité — gratuit</span>
            <span className="grid place-items-center h-8 w-8 rounded-full bg-canvas/15 
              group-hover:bg-canvas/25 group-hover:translate-x-0.5 transition-all duration-300">
              →
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}