import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/eiden/Nav";
import { Hero } from "@/components/eiden/Hero";
import { Problems } from "@/components/eiden/Problems";
import { Reframe } from "@/components/eiden/Reframe";
import { Services } from "@/components/eiden/Services";
import { HowItWorks } from "@/components/eiden/HowItWorks";
import { Testimonials } from "@/components/eiden/Testimonials";
import { FAQ } from "@/components/eiden/FAQ";
import { Contact } from "@/components/eiden/Contact";
import { Footer } from "@/components/eiden/Footer";
import { CommissionModal } from "@/components/eiden/CommissionModal";
import { ChatWidget } from "@/components/eiden/ChatWidget";
import { PageLoader } from "@/components/eiden/PageLoader";
import { MobileStickyCTA } from "@/components/eiden/MobileStickyCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EIDEN Services | Architectes de croissance · Audit, Stratégie, Branding, Web" },
      { name: "description", content: "EIDEN Group conçoit l'architecture qui fait grandir votre entreprise. Réservez un appel découverte gratuit de 30 min avec un associé." },
      { property: "og:title", content: "EIDEN Services | Architectes de croissance" },
      { property: "og:description", content: "Huit disciplines. Une architecture. Réservez un appel gratuit de 30 min." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  const start = useCallback((s?: string) => { setService(s); setOpen(true); }, []);

  return (
    <>
      <PageLoader onComplete={() => setLoaded(true)} />
      <AnimatePresence>
        {loaded && (
          <motion.main className="bg-canvas text-forest font-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Nav />
            <Hero onCommission={() => start()} />
            <Problems onCommission={() => start()} />
            <HowItWorks onCommission={() => start()} />
            {/* <Testimonials onCommission={() => start()} /> */}
            <FAQ onCommission={() => start()} />
            <Contact onCommission={() => start()} />
            <Reframe onCommission={() => start()} />
            <Services onCommission={start} />
            <Footer />
            <CommissionModal open={open} onClose={() => setOpen(false)} initialService={service} />
            {/* <ChatWidget onCommission={() => start()} /> */}
            <MobileStickyCTA onCommission={() => start()} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
