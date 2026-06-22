import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

const SERVICES = [
  "Audit & Diagnostic",
  "Architecture Stratégique",
  "Optimisation Opérationnelle",
  "Génération de Leads & Achat Média",
  "Référencement Local & Digital",
  "CRM · Relation Client",
  "Branding & Positionnement",
  "Développement Web",
];

const BUDGETS = ["< 25k MAD", "25 – 75k MAD", "75 – 200k MAD", "200k+ MAD"];
const TIMELINES = ["Immédiat", "< 1 mois", "1 – 3 mois", "Exploration"];

type Form = {
  services: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  brief: string;
};

const empty: Form = { services: [], budget: "", timeline: "", name: "", email: "", company: "", brief: "" };

export function CommissionModal({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open && initialService && !form.services.includes(initialService)) {
      setForm((f) => ({ ...f, services: [...f.services, initialService] }));
    }
  }, [open, initialService]);

  useEffect(() => {
    if (!open) { setStep(0); setSent(false); }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleService = (s: string) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const canNext =
    (step === 0 && form.services.length > 0) ||
    (step === 1 && form.budget && form.timeline) ||
    (step === 2 && form.name && form.email && form.brief);

  const submit = () => {
    const subject = encodeURIComponent(`Commission   ${form.name}${form.company ? " · " + form.company : ""}`);
    const body = encodeURIComponent(
      `Services: ${form.services.join(", ")}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nNom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\n\nBrief:\n${form.brief}`
    );
    window.location.href = `mailto:contact@eiden-group.com?subject=${subject}&body=${body}`;
    setSent(true);
    setStep(3);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-stretch justify-center p-0 md:p-6"
        >
          {/* backdrop */}
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/70 backdrop-blur-md"
            aria-label="Fermer"
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
            className="relative z-10 w-full max-w-6xl my-auto grid md:grid-cols-12 rounded-none md:rounded-3xl overflow-hidden glass shadow-2xl"
          >
            {/* SIDE   animated scenes */}
            <div className="relative md:col-span-5 min-h-[180px] md:min-h-[640px] bg-forest text-canvas overflow-hidden">
              <SceneVideo />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                <div className="font-mono text-[10px] text-canvas/70 flex items-center justify-between">
                  <span>EIDEN / COMMISSION</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-mondrian-red animate-pulse" /> LIVE
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gold/80 mb-3">FIG. 0{step + 1} / 04</div>
                  <h3 className="font-display font-light text-3xl md:text-5xl leading-[0.95] tracking-tight text-balance">
                    {sent ? (
                      <>Votre brief est <span className="font-display-wonk italic text-gold">en route.</span></>
                    ) : step === 0 ? (
                      <>Choisissez vos <span className="font-display-wonk italic text-gold">disciplines.</span></>
                    ) : step === 1 ? (
                      <>Donnez-nous la <span className="font-display-wonk italic text-gold">forme</span> du projet.</>
                    ) : (
                      <>Présentez-vous, <span className="font-display-wonk italic text-gold">brièvement.</span></>
                    )}
                  </h3>
                  <p className="mt-4 text-canvas/70 text-sm leading-relaxed max-w-sm">
                    Chaque commission lue personnellement par un associé. Réponse sous 24 heures ouvrables.
                  </p>
                </div>
              </div>
            </div>

            {/* MAIN   form */}
            <div className="relative md:col-span-7 bg-canvas/95 p-6 md:p-10 max-h-[100vh] md:max-h-[640px] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <Stepper step={step} />
                <button onClick={onClose} aria-label="Fermer" className="grid place-items-center h-9 w-9 rounded-full border border-forest/15 hover:bg-forest hover:text-canvas transition">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <Step key="s0">
                    <Label>Quel(s) service(s) ?</Label>
                    <div className="mt-4 grid sm:grid-cols-2 gap-2">
                      {SERVICES.map((s) => {
                        const on = form.services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={`group flex items-center justify-between gap-3 text-left px-4 py-3.5 rounded-xl border transition focus-ring ${
                              on ? "bg-forest text-canvas border-forest" : "bg-canvas border-forest/15 hover:border-forest/40"
                            }`}
                          >
                            <span className="font-head text-sm">{s}</span>
                            <span className={`grid place-items-center h-5 w-5 rounded-full border ${on ? "bg-gold border-gold text-forest" : "border-forest/30"}`}>
                              {on && <Check className="h-3 w-3" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </Step>
                )}

                {step === 1 && (
                  <Step key="s1">
                    <Label>Budget envisagé</Label>
                    <Pills options={BUDGETS} value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
                    <Label className="mt-8">Horizon</Label>
                    <Pills options={TIMELINES} value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} />
                  </Step>
                )}

                {step === 2 && (
                  <Step key="s2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Nom" v={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                      <Field label="Email" type="email" v={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    </div>
                    <div className="mt-4">
                      <Field label="Entreprise" v={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    </div>
                    <div className="mt-4">
                      <Field label="Brief" textarea v={form.brief} onChange={(v) => setForm({ ...form, brief: v })} required />
                    </div>
                  </Step>
                )}

                {step === 3 && (
                  <Step key="s3">
                    <div className="py-10 text-center">
                      <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-teal text-canvas">
                        <Check className="h-7 w-7" />
                      </div>
                      <h4 className="mt-6 font-display text-3xl">Brief transmis.</h4>
                      <p className="mt-3 text-forest/70 max-w-sm mx-auto">
                        Un membre de l'équipe vous répond sous 24h. Vérifiez votre client mail si la fenêtre ne s'est pas ouverte.
                      </p>
                      <button onClick={onClose} className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest text-canvas px-6 py-3 font-head text-sm">
                        Fermer
                      </button>
                    </div>
                  </Step>
                )}
              </AnimatePresence>

              {/* nav */}
              {step < 3 && (
                <div className="mt-10 pt-6 border-t border-forest/10 flex items-center justify-between">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="font-label text-[10px] text-forest/70 disabled:opacity-30 hover:text-forest"
                  >
                    ← Retour
                  </button>
                  {step < 2 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canNext}
                      className="inline-flex items-center gap-3 rounded-full bg-forest px-6 py-3 font-head text-sm text-canvas disabled:opacity-40 hover:bg-teal transition"
                    >
                      Continuer →
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={!canNext}
                      className="inline-flex items-center gap-3 rounded-full bg-mondrian-red px-6 py-3 font-head text-sm text-canvas disabled:opacity-40 hover:bg-forest transition"
                    >
                      Envoyer la commission →
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-label text-[10px] text-forest/70 ${className}`}>{children}</div>;
}

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`px-4 py-2.5 rounded-full border font-head text-sm transition focus-ring ${
              on ? "bg-forest text-canvas border-forest" : "border-forest/20 hover:border-forest/50"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, v, onChange, type = "text", textarea, required }: {
  label: string; v: string; onChange: (v: string) => void; type?: string; textarea?: boolean; required?: boolean;
}) {
  const cls = "peer w-full bg-transparent border-b border-forest/20 pt-6 pb-2 text-forest font-head text-base outline-none focus:border-forest transition";
  return (
    <label className="relative block">
      <span className="absolute left-0 top-2 font-label text-[10px] text-forest/60">{label}{required && " *"}</span>
      {textarea ? (
        <textarea required={required} rows={4} value={v} onChange={(e) => onChange(e.target.value)} className={cls + " resize-none"} />
      ) : (
        <input required={required} type={type} value={v} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Services", "Cadre", "Identité", "Envoyé"];
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] text-forest/60">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span className={`grid place-items-center h-6 w-6 rounded-full border text-[10px] transition ${
            i === step ? "bg-forest text-canvas border-forest" :
            i < step ? "bg-teal text-canvas border-teal" : "border-forest/20"
          }`}>{i < step ? "✓" : i + 1}</span>
          <span className={i === step ? "text-forest" : ""}>{l}</span>
          {i < labels.length - 1 && <span className="text-forest/20">/</span>}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────
 *  Looping side "video": four painterly CSS scenes
 *  (sketching · print proofs · color swatches · tabletop)
 * ────────────────────────────────────────────────────── */
function SceneVideo() {
  return (
    <div className="absolute inset-0">
      {/* Scene 1   sketching */}
      <div className="scene scene-1 bg-forest-md">
        <div className="absolute inset-0 paper-grid opacity-20" />
        <svg viewBox="0 0 400 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g stroke="oklch(0.81 0.06 90)" strokeWidth="1.4" fill="none" opacity="0.85">
            <motion.path d="M40 480 Q140 360 220 440 T380 380" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 6, repeat: Infinity, repeatDelay: 18 }} />
            <motion.path d="M60 520 L340 200" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 6, repeat: Infinity, repeatDelay: 18, delay: 1 }} />
            <motion.circle cx="260" cy="300" r="80" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 6, repeat: Infinity, repeatDelay: 18, delay: 2 }} />
          </g>
        </svg>
      </div>

      {/* Scene 2   print proofs */}
      <div className="scene scene-2 bg-canvas/95">
        <div className="absolute inset-8 grid grid-cols-3 grid-rows-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, repeat: Infinity, repeatDelay: 22 }}
              className={`rounded-sm ${i % 5 === 0 ? "bg-mondrian-red" : i % 4 === 0 ? "bg-mondrian-yellow" : i % 3 === 0 ? "bg-forest" : "bg-beige"}`}
              style={{ opacity: 0.85 }}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-8 font-mono text-[10px] text-forest/70">EPREUVES · 12 / 24</div>
      </div>

      {/* Scene 3   color swatches */}
      <div className="scene scene-3 bg-beige">
        <div className="absolute inset-0 flex flex-col">
          {["bg-forest","bg-teal","bg-gold","bg-mondrian-red","bg-mondrian-blue"].map((c, i) => (
            <motion.div
              key={c}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: i * 0.15, repeat: Infinity, repeatDelay: 22, ease: [0.22,1,0.36,1] }}
              style={{ originX: 0 }}
              className={`flex-1 ${c}`}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-8 font-mono text-[10px] text-canvas mix-blend-difference">PALETTE · 05</div>
      </div>

      {/* Scene 4   tabletop */}
      <div className="scene scene-4 bg-cream">
        <div className="absolute inset-0 paper-grid opacity-30" />
        <motion.div
          initial={{ rotate: -4, y: 20, opacity: 0 }}
          animate={{ rotate: -2, y: 0, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 22 }}
          className="absolute top-10 left-8 w-44 h-56 bg-canvas shadow-xl rounded-sm p-3"
        >
          <div className="h-full border border-forest/20 flex flex-col">
            <div className="h-1/2 bg-mondrian-blue" />
            <div className="p-2 font-mono text-[8px] text-forest/70">EIDEN.001</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ rotate: 5, y: 30, opacity: 0 }}
          animate={{ rotate: 3, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, repeat: Infinity, repeatDelay: 22 }}
          className="absolute bottom-12 right-8 w-52 h-40 bg-forest text-canvas shadow-xl rounded-sm p-4"
        >
          <div className="font-display text-2xl leading-tight">Architecture<br/><span className="italic text-gold">éditée.</span></div>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full border-2 border-mondrian-red"
        />
      </div>

      {/* permanent vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
