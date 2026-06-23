import { useCallback, useEffect, useRef, useState, FormEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { 
  TrendingDown, 
  Megaphone, 
  Users, 
  Compass, 
  Tag, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
} from "lucide-react";

const ITEMS = [
  {
    icon: TrendingDown,
    title: "Vos ventes bloquent",
    description: "Vous dépensez plus d'argent en marketing, mais vos revenus n’augmentent plus.",
    tag: "Commercial",
    accent: "teal" as const,
  },
  {
    icon: Megaphone,
    title: "La pub ne rapporte plus",
    description: "Vous payez de la pub sur Instagram, mais vos bénéfices fondent car votre page ne retient personne.",
    tag: "Acquisition",
    accent: "gold" as const,
  },
  {
    icon: Users,
    title: "Vous perdez des clients",
    description: "Les messages s'accumulent, vous oubliez de rappeler les gens et votre équipe travaille dans le désordre.",
    tag: "Opérations",
    accent: "red" as const,
  },
  {
    icon: Compass,
    title: "Vous avancez à l'aveugle",
    description: "Vous n'avez pas de chiffres précis sur votre business. Toutes vos décisions se font au feeling.",
    tag: "Pilotage",
    accent: "yellow" as const,
  },
  {
    icon: Tag,
    title: "La concurrence casse vos prix",
    description: "D'autres vous copient et baissent les tarifs. Sans une identité forte, vous êtes obligé de vendre moins cher.",
    tag: "Positionnement",
    accent: "teal" as const,
  },
  {
    icon: Sparkles,
    title: "Votre image fait \"amateur\"",
    description: "Vos produits sont excellents, mais vos réseaux sociaux font fuir les clients chez ceux qui présentent mieux.",
    tag: "Image de marque",
    accent: "red" as const,
  },
];

const ACCENT_STYLES: Record<
  "teal" | "gold" | "red" | "yellow", 
  { bar: string; chip: string; ring: string; text: string; bgCard: string; borderCard: string }
> = {
  teal: {
    bar: "bg-teal",
    chip: "bg-teal text-canvas",
    ring: "ring-teal/30",
    text: "text-teal-lt",
    bgCard: "bg-canvas",
    borderCard: "border-teal",
  },
  gold: {
    bar: "bg-gold-dk",
    chip: "bg-gold-dk text-forest",
    ring: "ring-gold-dk/30",
    text: "text-gold-dk",
    bgCard: "bg-cream",
    borderCard: "border-gold-dk",
  },
  red: {
    bar: "bg-mondrian-red",
    chip: "bg-mondrian-red text-canvas",
    ring: "ring-mondrian-red/20",
    text: "text-mondrian-red",
    bgCard: "bg-beige",
    borderCard: "border-mondrian-red",
  },
  yellow: {
    bar: "bg-mondrian-yellow",
    chip: "bg-mondrian-yellow text-forest",
    ring: "ring-mondrian-yellow/40",
    text: "text-forest",
    bgCard: "bg-beige-dk",
    borderCard: "border-mondrian-yellow",
  },
};

export function Problems({ onCommission }: { onCommission: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Dynamic parallax blobs tracking pointer coordinates
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 100, damping: 20, mass: 0.5 });
  const springY = useSpring(pointerY, { stiffness: 100, damping: 20, mass: 0.5 });


  // Get expected scroll placement for any card index based on custom boundaries
  const getScrollLeftForIndex = useCallback((targetIndex: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (targetIndex <= 1) {
      return 0;
    }
    if (targetIndex >= ITEMS.length - 2) {
      return maxScroll > 0 ? maxScroll : 0;
    }

    const cards = Array.from(el.querySelectorAll("[data-card]")) as HTMLElement[];
    const targetElement = cards.find(c => parseInt(c.dataset.realIndex ?? "") === targetIndex);
    if (!targetElement) return 0;

    const targetScroll = targetElement.offsetLeft - (el.clientWidth - targetElement.offsetWidth) / 2;
    return Math.max(0, Math.min(maxScroll > 0 ? maxScroll : 0, targetScroll));
  }, []);

  // Scroll focus animation handler
  const scrollToItem = useCallback((targetIndex: number, behavior: ScrollBehavior = "smooth") => {
    const el = trackRef.current;
    if (!el) return;

    const targetScroll = getScrollLeftForIndex(targetIndex);
    el.scrollTo({ left: targetScroll, behavior });
    setActive(targetIndex);
  }, [getScrollLeftForIndex]);

  // Primary direction stepping handler
  const handleStep = useCallback((direction: -1 | 1) => {
    const nextIndex = active + direction;
    if (nextIndex < 0) {
      scrollToItem(ITEMS.length - 1, "smooth");
    } else if (nextIndex >= ITEMS.length) {
      scrollToItem(0, "smooth");
    } else {
      scrollToItem(nextIndex, "smooth");
    }
  }, [active, scrollToItem]);

  // Align starting offset
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const center2 = getScrollLeftForIndex(2);
      const center3 = getScrollLeftForIndex(3);
      const scrollLeft = el.scrollLeft;

      let targetIdx = active;

      if (scrollLeft <= 10) {
        if (active !== 0 && active !== 1) {
          targetIdx = 0;
        } else {
          targetIdx = active;
        }
      } else if (scrollLeft >= maxScroll - 10) {
        if (active !== 4 && active !== 5) {
          targetIdx = ITEMS.length - 1;
        } else {
          targetIdx = active;
        }
      } else {
        if (scrollLeft < center2) {
          const ratio = scrollLeft / center2;
          if (ratio < 0.35) {
            targetIdx = 0;
          } else if (ratio >= 0.35 && ratio < 0.8) {
            targetIdx = 1;
          } else {
            targetIdx = 2;
          }
        } else if (scrollLeft >= center2 && scrollLeft < center3) {
          const mid = (center2 + center3) / 2;
          if (scrollLeft < mid) {
            targetIdx = 2;
          } else {
            targetIdx = 3;
          }
        } else {
          const ratio = (scrollLeft - center3) / (maxScroll - center3);
          if (ratio < 0.2) {
            targetIdx = 3;
          } else if (ratio >= 0.2 && ratio < 0.65) {
            targetIdx = 4;
          } else {
            targetIdx = 5;
          }
        }
      }

      setActive(targetIdx);
      setProgress(scrollLeft / maxScroll);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [getScrollLeftForIndex, active]);

  return (
    <section
      id="problems"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      className="relative w-full bg-cream py-20 md:py-28 overflow-hidden transition-colors duration-500"
    >
      
      

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-12 pb-8 border-b-2 border-forest">
          <h2 className="md:col-span-9 font-display font-light text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            Reconnaissez-vous l'un de ces <span className="font-display-wonk italic text-teal">signaux</span>
            <span className="text-mondrian-red">?</span>
          </h2>
        </div>
        {/* Carousel Meta Info & Navigation Controller */}
        <div className="flex items-center justify-between mb-8 gap-6">
          <div className="font-mono text-[11px] text-forest/70 flex items-center gap-4">
            <span className="tabular-nums text-forest font-semibold">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="h-[2px] w-8 bg-forest/20" />
            <span className="tabular-nums opacity-60">{String(ITEMS.length).padStart(2, "0")}</span>
            <span className="hidden sm:inline-block ml-4 uppercase tracking-[0.18em] text-[10px] bg-beige-dk/40 px-3 py-1 rounded">
              {ITEMS[active].tag}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              id="problems-btn-prev"
              onClick={() => handleStep(-1)}
              aria-label="Symptôme Précédent"
              className="grid place-items-center h-10 w-10 rounded-full border border-forest/15 text-forest bg-canvas/30 hover:bg-forest hover:text-canvas hover:border-forest transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal/50"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <button
              id="problems-btn-next"
              onClick={() => handleStep(1)}
              aria-label="Symptôme Suivant"
              className="grid place-items-center h-10 w-10 rounded-full border border-forest/15 text-forest bg-canvas/30 hover:bg-forest hover:text-canvas hover:border-forest transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal/50"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Carousel Tracks Frame */}
        <div className="relative -mx-6 md:-mx-12">
          <div
            id="problems-carousel-track"
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-10 pt-2 px-6 md:px-12 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {ITEMS.map((item, index) => {
              const realIndex = index;
              const isActive = active === realIndex;
              const styles = ACCENT_STYLES[item.accent];
              const IconComp = item.icon;

              return (
                <motion.article
                  data-card
                  data-real-index={realIndex}
                  key={`card-${index}`}
                  onClick={() => scrollToItem(realIndex, "smooth")}
                  layoutId={`card-base-${realIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  animate={{
                    scale: isActive ? 1.04 : 0.95,
                    opacity: isActive ? 1 : 0.62,
                  }}
                  whileHover={{ y: -4 }}
                  className={`group relative snap-center shrink-0 w-[84vw] sm:w-[50vw] md:w-[42vw] lg:w-[32vw] xl:w-[380px] cursor-pointer select-none border rounded-xl overflow-hidden transition-[box-shadow,border-color,background-color] duration-500 ${
                    isActive 
                      ? `${styles.bgCard} ${styles.borderCard} shadow-[0_20px_45px_-12px_rgba(30,45,35,0.18)]` 
                      : "border-forest/10 bg-canvas animate-none hover:border-forest/20"
                  }`}
                >
                  {/* Accent Line Indicator */}
                  <motion.div
                    className={`h-[4px] ${styles.bar} origin-left`}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0.15 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Card Main Interior */}
                  <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-between">
                    <div>
                      {/* Top Row Label Info */}
                      <div className="flex items-start justify-between">
                        <div className="font-mono text-[10px] tracking-wider text-forest/40">
                          <div>0{realIndex + 1} / 0{ITEMS.length}</div>
                          <div className="mt-0.5 uppercase font-medium">{item.tag}</div>
                        </div>
                        <span className={`font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-[0.14em] ${styles.chip}`}>
                          Symptôme
                        </span>
                      </div>

                      {/* Accent Circular Icon Housing */}
                      <div className="mt-6 relative flex items-center">
                        <motion.div
                          animate={{ rotate: isActive ? 0 : -5 }}
                          transition={{ duration: 0.5 }}
                          className={`relative grid place-items-center h-11 w-11 rounded-full bg-cream border border-forest/10 ring-2 ${isActive ? styles.ring : "ring-transparent"} ring-offset-2 ring-offset-canvas`}
                        >
                          <IconComp className={`h-4 w-4 ${isActive ? styles.text : "text-forest/60"} transition-colors duration-300`} strokeWidth={1.8} />
                          <AnimatePresence>
                            {isActive && (
                              <motion.span
                                key={`pulse-${index}`}
                                initial={{ scale: 1, opacity: 0.4 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                                className={`absolute inset-0 rounded-full ${styles.bar} opacity-20 pointer-events-none`}
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                        
                        {/* Huge translucent back index index styling */}
                        <span className="absolute right-0 top-0 font-display font-bold text-[5.5rem] leading-[0.8] text-forest/[0.04] select-none pointer-events-none">
                          0{realIndex + 1}
                        </span>
                      </div>

                      {/* Title & Description block */}
                      <h3 className="mt-6 font-display text-lg md:text-xl font-medium tracking-tight text-forest leading-[1.12]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-xs md:text-[13px] text-forest/70 leading-relaxed min-h-[4rem]">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Custom Progress Indication Dot Track bar */}
        <div className="mt-4 flex items-center gap-6">
          <div className="relative flex-1 h-[2px] bg-forest/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-forest rounded-full"
              style={{ width: `${Math.max(6, ((active + 1) / ITEMS.length) * 100)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
            />
          </div>
          
          <div className="flex gap-2">
            {ITEMS.map((_, i) => (
              <button
                key={`dot-${i}`}
                id={`problems-indicator-dot-${i}`}
                onClick={() => scrollToItem(i, "smooth")}
                aria-label={`Aller au symptôme ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active 
                    ? "w-6 bg-forest" 
                    : "w-2 bg-forest/20 hover:bg-forest/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

       <div className="mt-14 flex justify-center">
          <button onClick={() => onCommission()} className="group inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red transition focus-ring">
              Réserver mon appel découverte
              <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 transition group-hover:bg-canvas/25">→</span>
            </button>
        </div>
    </section>
  );
}