import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { from: "bot" | "you"; text: string };

const SUGGESTIONS = [
  "Quels sont vos tarifs ?",
  "Combien de temps prend un audit ?",
  "Travaillez-vous à l'international ?",
  "Comment démarrer une commission ?",
];

function reply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("tarif") || t.includes("prix") || t.includes("budget"))
    return "Nos engagements démarrent à 25 000 MAD pour un audit, et se construisent sur-mesure ensuite. Indiquez votre budget dans le formulaire de commission pour une estimation précise.";
  if (t.includes("temps") || t.includes("durée") || t.includes("delai") || t.includes("délai"))
    return "Un audit dure 10 à 15 jours ouvrables. Une architecture complète : 6 à 12 semaines selon le périmètre.";
  if (t.includes("international") || t.includes("étranger") || t.includes("canada") || t.includes("europe"))
    return "Oui   bureaux à Casablanca, Agadir et Montréal. Nous accompagnons des clients sur trois continents.";
  if (t.includes("commission") || t.includes("démarrer") || t.includes("commencer") || t.includes("comment"))
    return "Cliquez sur « Démarrer une commission » en haut, ou utilisez le formulaire en bas de page. Réponse personnelle sous 24h.";
  if (t.includes("merci")) return "Avec plaisir. Je reste disponible.";
  if (t.includes("bonjour") || t.includes("salut") || t.includes("hello"))
    return "Bonjour. Je suis l'assistant EIDEN   posez-moi vos questions sur nos services, notre méthode, ou démarrez une commission.";
  return "Bonne question. Pour une réponse précise, ouvrez une commission ou écrivez à contact@eiden-group.com   un associé vous répond sous 24h.";
}

export function ChatWidget({ onCommission }: { onCommission: () => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Bonjour 👋   je suis l'assistant EIDEN. Que puis-je clarifier sur nos services ?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [msgs, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "you", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: reply(text) }]);
    }, 550);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 18 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[90] grid place-items-center h-14 w-14 rounded-full bg-forest text-canvas shadow-2xl hover:bg-mondrian-red transition focus-ring"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gold animate-pulse" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
            className="fixed bottom-24 right-6 z-[90] w-[min(380px,calc(100vw-2rem))] h-[520px] rounded-2xl overflow-hidden glass shadow-2xl flex flex-col"
          >
            {/* header */}
            <div className="bg-forest text-canvas px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-gold text-forest font-display font-semibold">E</span>
                <div>
                  <div className="font-head text-sm font-semibold">EIDEN   Assistant</div>
                  <div className="font-mono text-[10px] text-canvas/60 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-lt animate-pulse" /> en ligne
                  </div>
                </div>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-canvas/60">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-snug ${
                    m.from === "you"
                      ? "bg-forest text-canvas rounded-br-sm"
                      : "bg-canvas border border-forest/10 text-forest rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {msgs.length <= 2 && (
                <div className="pt-2 space-y-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-cream hover:bg-beige border border-forest/10 text-forest/80 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA strip */}
            <button
              onClick={() => { setOpen(false); onCommission(); }}
              className="w-full bg-mondrian-red text-canvas py-2.5 font-label text-[10px] hover:bg-forest transition"
            >
              Démarrer une commission →
            </button>

            {/* input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="bg-canvas border-t border-forest/10 p-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question…"
                className="flex-1 bg-cream rounded-full px-4 py-2.5 text-sm outline-none focus-ring"
              />
              <button type="submit" className="grid place-items-center h-10 w-10 rounded-full bg-forest text-canvas hover:bg-teal transition">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
