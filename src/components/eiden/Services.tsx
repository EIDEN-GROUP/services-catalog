import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import svcAudit from "@/assets/audit-2.jpg";
import svcArch from "@/assets/strategy-2.jpg";
import svcOps from "@/assets/op-1.jpg";
import svcLeads from "@/assets/lead-1.jpg";
import svcSeo from "@/assets/seo-1.jpg";
import svcCrm from "@/assets/crm-1.jpg";
import svcBranding from "@/assets/branding-1.jpg";
import svcWeb from "@/assets/web-2.jpg";

export const SERVICES = [
  {
    n: "01",
    t: "Marque & Identité",
    d: "L'art de l'impact immédiat et durable. Nous façonnons des chartes de rigueur et des identités visuelles d'une finesse chirurgicale, établissant votre autorité sectorielle dès le premier regard.",
    img: svcBranding,
    items: [
      "Logo + identité visuelle",
      "Identité complète + charte",
      "Image de dirigeant (personal branding)",
      "Changement d'image complet (rebranding)"
    ]
  },
  {
    n: "02",
    t: "Site Web & Développement",
    d: "Nous développons des sites internet ultra-rapides, modernes et faciles d'accès, conçus spécifiquement pour transformer vos visiteurs en clients.",
    img: svcWeb,
    items: [
      "Page unique (landing page)",
      "Site vitrine (5–7 pages)",
      "Boutique en ligne (e-commerce)",
      "Entretien & hébergement"
    ]
  },
  {
    n: "03",
    t: "Photo & Vidéo",
    d: "Nous mettons en valeur votre entreprise grâce à des photos de haute qualité, des vidéos publicitaires captivantes et des présentations d'entreprise au rendu cinéma.",
    img: svcAudit, // mapped to Photo & Vidéo as per user requirement to preserve images
    items: [
      "Shooting photo ½ journée",
      "Pack contenu vidéo (10 reels/mois)",
      "Vidéo corporate / présentation"
    ]
  },
  {
    n: "04",
    t: "Marketing & Acquisition",
    d: "De la stratégie à l’acquisition de clients, nous renforçons votre visibilité en ligne, attirons des prospects qualifiés et soutenons durablement votre croissance.",
    img: svcLeads, // keeping seo image imported in file structure as reference
    items: [
      "Réseaux sociaux Essentiel",
      "Réseaux sociaux Standard",
      "Référencement Google (SEO)",
      "Publicité en ligne (Meta / Google)",
      "Génération de prospects (leads)",
      "Stratégie marketing"
    ]
  },
  {
    n: "05",
    t: "IA & Automatisation",
    d: "Nous orchestrons l'intégration systémique de vos logiciels et déployons des agents conversationnels intelligents, optimisant vos flux opérationnels pour libérer votre temps au quotidien.",
    img: svcOps,
    items: [
      "Automatiser une tâche / un workflow",
      "Assistant / chatbot IA",
      "Automatisation des processus"
    ]
  },
  {
    n: "06",
    t: "Conseil & Organisation",
    d: "Nous analysons vos méthodes de travail et coachons vos équipes chaque mois pour rendre votre entreprise plus structurée, efficace et performante.",
    img: svcArch,
    items: [
      "Workflows & gestion des opérations",
      "Accompagnement mensuel",
      "Recrutement / talents",
      "Formation des équipes (B-Arch Labs)"
    ]
  },
  {
    n: "07",
    t: "Logiciels propriétaires (abonnement léger)",
    d: "Nous créons des outils informatiques rien que pour vous (système de réservation, gestion d'école, etc.) sous forme d'un petit abonnement mensuel.",
    img: svcCrm, // svcCrm used for CRM & Software
    items: [
      "Gestion d'entreprise (BMS)",
      "CRM Écoles & Centres",
      "CRM Pipeline & Ventes",
      "Tableaux de bord (Dashboards)",
      "Agent de Réservation IA",
      "Logiciel sur mesure"
    ]
  }
];

export function Services({ onCommission }: { onCommission: (service?: string) => void }) {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Sync horizontal tab scrolling on change with optimal centering
  useEffect(() => {
    const activeTabEl = document.getElementById(`tab-${SERVICES[active].n}`);
    if (activeTabEl && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const tabOffsetLeft = activeTabEl.offsetLeft;
      const tabWidth = activeTabEl.offsetWidth;
      
      container.scrollTo({
        left: tabOffsetLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth"
      });
    }
  }, [active]);

  const handleNext = () => {
    setActive((active + 1) % SERVICES.length);
  };

  return (
    <section id="services" className="relative bg-canvas py-12 px-4 md:px-8 border-t border-forest/10 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        {/* Editorial header - Swiss split */}
        <div id="services-header" className="mb-8 pb-6 border-b border-forest/20">
          <h2 className="md:col-span-9 font-display font-light text-[clamp(1.75rem,4vw,3rem)] leading-[0.92] tracking-[-0.03em] text-balance text-forest">
            Là où votre activité <span className="font-display-wonk italic text-teal">se déploie</span>
            <span className="text-mondrian-red font-bold font-sans">.</span>
          </h2>
        </div>

        {/* Tabs strip - horizontally scrollable pills */}
        <div className="relative mb-8">
          {/* Subtle fade indicators for scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-canvas to-transparent pointer-events-none z-10 md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-canvas to-transparent pointer-events-none z-10 md:hidden" />
          
          <div 
            ref={tabsContainerRef}
            role="tablist" 
            aria-label="Services" 
            className="flex gap-2 overflow-x-auto py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  id={`tab-${s.n}`}
                  key={s.n}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${s.n}`}
                  onClick={() => setActive(i)}
                  className="relative shrink-0 overflow-hidden rounded-full border border-forest/15 px-4 py-2 transition-all duration-300 focus-ring cursor-pointer hover:border-forest/50"
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-tab-bg"
                      className="absolute inset-0 bg-forest"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span
                    className={`relative z-10 inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-wider ${
                      isActive ? "text-canvas" : "text-forest/70"
                    }`}
                  >
                    <span className={isActive ? "text-[#E6C681]" : "text-forest/35 font-semibold"}>{s.n}</span>
                    <span className="font-semibold">{s.t}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content - plate image + copy */}
        <AnimatePresence mode="wait">
          <motion.div
            id={`panel-${current.n}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.n}`}
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            {/* Visual Frame */}
            <div className="relative h-[440px] overflow-hidden border border-forest/15 bg-cream group shadow-xs rounded-lg">
              <img 
                src={current.img} 
                alt={current.t} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                loading="lazy" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent mix-blend-multiply opacity-50 pointer-events-none" />
              <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
                <span className="rounded-full bg-forest/85 px-2.5 py-1 text-canvas backdrop-blur-md font-semibold border border-canvas/10">Pl. {current.n}</span>
                <span className="rounded-full bg-forest/85 px-2.5 py-1 text-canvas backdrop-blur-md font-semibold border border-canvas/10">Eiden Group</span>
              </div>
            </div>

            {/* Copy & Details */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="font-mono text-[10px] font-bold text-teal tracking-widest uppercase">
                  Service {current.n} / {SERVICES.length.toString().padStart(2, '0')}
                </div>

                <h3 className="mt-2 font-display font-light text-2xl md:text-4xl leading-[1.03] tracking-tight text-balance text-forest">
                  {current.t}
                </h3>

                <p className="mt-4 text-forest/80 text-sm md:text-base leading-relaxed text-pretty">
                  {current.d}
                </p>

                {/* Highly structured lists of specialized deliverables */}
                <div className="mt-6 border-t border-forest/10 pt-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-forest/40">Prestations & Livrables</span>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {current.items.map((b) => (
                      <li 
                        key={b} 
                        onClick={() => onCommission(b)}
                        className="flex items-center gap-2.5 text-xs text-forest/80 hover:text-mondrian-red transition-colors duration-200 cursor-pointer group"
                      >
                        <span className="h-1 w-1 shrink-0 bg-gold transition-transform group-hover:scale-125" />
                        <span className="font-medium group-hover:translate-x-0.5 transition-transform">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="mt-6 space-y-1.5 border-t border-forest/10 pt-4">
                  {["Appel de cadrage gratuit, diagnostic clair et sans engagement", "Étude d'architecture stratégique sous 48h"].map((b, idx) => (
                    <li key={b} className="flex items-start gap-2.5 text-[11px] text-forest/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-teal rounded-full" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 pt-4 border-t border-forest/10">
                <button
                  id="cta-commission"
                  onClick={() => onCommission(current.t)}
                  className="group inline-flex items-center gap-3 rounded-full bg-forest px-5 py-3 font-display text-xs font-semibold text-canvas transition-all hover:bg-mondrian-red shadow-xs cursor-pointer hover:shadow hover:-translate-y-0.5"
                >
                  Réserver mon appel gratuit
                  <span className="grid h-5 w-5 rounded-full bg-canvas/15 transition group-hover:bg-canvas/25 place-content-center font-bold">→</span>
                </button>
                <button
                  id="btn-next-service"
                  onClick={handleNext}
                  className="inline-flex items-center rounded-full border border-forest/25 px-5 py-3 font-display text-xs font-semibold text-forest transition-all hover:border-forest hover:bg-cream cursor-pointer hover:-translate-y-0.5"
                >
                  Service suivant
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
