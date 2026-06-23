import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const SERVICES = [
  "Marque & Identité",
  "Site Web & Développement",
  "Photo & Vidéo",
  "Marketing & Acquisition",
  "IA & Automatisation",
  "Logiciels propriétaires (abonnement léger)",
];

const BUDGETS = ["<8000 DH", "8000 – 15000 DH", "15000 – 50000 DH", "+50000 DH"];
const TIMELINES = ["Immédiat", "< 1 mois", "1 – 3 mois"];

type Form = {
  services: string[];
  budget: string;
  timeline: string;
  preferredDate: string;
  preferredTime: string;
  name: string;
  email: string;
  company: string;
  brief: string;
};

const empty: Form = { services: [], budget: "", timeline: "", preferredDate: "", preferredTime: "", name: "", email: "", company: "", brief: "" };

export function HowItWorks({
  initialService,
  onCommission,
}: {
  initialService?: string;
  onCommission: () => void;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);
  const [commissionId, setCommissionId] = useState(() =>
    Math.floor(100000 + Math.random() * 899999)
  );

  useEffect(() => {
    if (initialService && !form.services.includes(initialService)) {
      setForm((f) => ({ ...f, services: [...f.services, initialService] }));
    }
  }, [initialService]);

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));

  const canNext =
    (step === 0 && form.services.length > 0) ||
    (step === 1 && form.budget && form.timeline) ||
    (step === 2 && form.name && form.email && form.preferredDate && form.preferredTime && form.brief);

  const submit = () => {
    const subject = encodeURIComponent(`Commission   ${form.name}${form.company ? " · " + form.company : ""}`);
    const body = encodeURIComponent(
      `Services: ${form.services.join(", ")}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\nDate souhaitée: ${form.preferredDate}\nHeure souhaitée (Maroc, GMT+1): ${form.preferredTime}\n\nNom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\n\nBrief:\n${form.brief}`
    );
    window.location.href = `mailto:contact@eiden-group.com?subject=${subject}&body=${body}`;
    setSent(true);
    setStep(3);
  };

  const resetForm = () => {
    setForm(empty);
    setSent(false);
    setStep(0);
    setCommissionId(Math.floor(100000 + Math.random() * 899999));
  };

  return (
    <section id="contact" className="relative bg-forest text-canvas py-24 md:py-36 overflow-hidden grain">
      <div className="absolute inset-0 paper-grid opacity-[0.06]" />
      <div className="absolute top-0 left-0 h-1.5 w-full" style={{ background: "#0E7A73" }} />
      <div className="absolute top-0 left-1/3 h-1.5 w-1/3 bg-forest" />
      <div className="absolute top-0 right-0 h-1.5 w-[12%]" style={{ background: "#CFC292" }} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-16 pb-10">
          <h2 className="md:col-span-9 font-display font-light text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.92] tracking-[-0.03em] text-balance">
            30 minutes pour voir où votre activité <span className="font-display-wonk italic text-gold">fuit</span>
            <span className="text-mondrian-red">.</span>
          </h2>
        </div>
        <div className="w-full rounded-2xl overflow-hidden glass shadow-2xl">
          <div className="grid md:grid-cols-12">
            {/* SIDE – animated scenes */}
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

            {/* MAIN – form */}
            <div className="relative md:col-span-7 bg-canvas/95 p-6 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <Stepper step={step} />
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
                            <span className={`font-head text-sm ${on ? "text-canvas" : "text-forest"}`}>{s}</span>
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
                    <div className="mt-4 grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Date souhaitée pour démarrer"
                        type="date"
                        v={form.preferredDate}
                        onChange={(v) => setForm({ ...form, preferredDate: v })}
                        required
                      />
                      <Field
                        label="Heure souhaitée (Maroc, GMT+1)"
                        type="time"
                        v={form.preferredTime}
                        onChange={(v) => setForm({ ...form, preferredTime: v })}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Field label="Brief" textarea v={form.brief} onChange={(v) => setForm({ ...form, brief: v })} required />
                    </div>
                  </Step>
                )}

                {step === 3 && (
                  <Step key="s3">
                    <div className="relative py-8 md:py-12">
                      {/* Seal */}
                      <motion.div
                        initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
                        className="mx-auto relative h-24 w-24"
                      >
                        <div className="absolute inset-0 rounded-full bg-teal-lt/10 animate-ping" />
                        <div className="relative mx-auto grid place-items-center h-24 w-24 rounded-full bg-teal-lt text-canvas shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] ring-8 ring-teal-lt/10">
                          <Check className="h-10 w-10" strokeWidth={2.5} />
                        </div>
                      </motion.div>

                      {/* Headline */}
                      <motion.div
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.18, duration: 0.5 }}
                        className="mt-10 text-center"
                      >
                        <h4 className="mt-3 font-display font-light text-4xl md:text-5xl leading-[0.95] text-forest">
                          Merci ,<span className="text-teal">{form.name ? ` ${form.name.split(" ")[0]}` : ""}.{" "}</span>
                        </h4>
                        <p className="mt-4 text-forest/70 max-w-md mx-auto leading-relaxed">
                          Votre brief a été scellé et transmis à un associé. <br />Vous recevrez une réponse
                          personnelle <span className="text-forest font-medium">sous 24h ouvrables</span> à{" "}
                          <span className="text-forest font-medium">{form.email || "votre adresse"}</span>.
                        </p>
                      </motion.div>

                      {/* Receipt card */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.32, duration: 0.5 }}
                        className="mt-8 mx-auto max-w-md rounded-2xl border border-forest/15 bg-canvas/60 backdrop-blur p-5 text-left"
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-forest/50 pb-3 border-b border-dashed border-forest/15">
                          <span>RÉCÉPISSÉ</span>
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal" /> REÇU
                          </span>
                        </div>
                        <dl className="mt-3 space-y-2 text-sm">
                          <Row k="Disciplines" v={form.services.join(" · ") || "—"} />
                          <Row k="Cadre" v={`${form.budget || "—"} · ${form.timeline || "—"}`} />
                          <Row k="Rendez-vous" v={`${form.preferredDate || "—"} · ${form.preferredTime || "—"}`} />
                        </dl>
                      </motion.div>

                    </div>
                  </Step>
                )}
              </AnimatePresence>

              {/* navigation */}
              {step < 3 && (
                <div className="mt-10 pt-6 border-t border-forest/10 flex items-center justify-between">
                  <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="font-label text-[10px] text-forest/70 disabled:opacity-30 hover:text-forest">
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
                    <button onClick={submit} disabled={!canNext} className="inline-flex items-center gap-3 rounded-full bg-mondrian-red px-6 py-3 font-head text-sm text-canvas disabled:opacity-40 hover:bg-forest transition">
                      Envoyer la commission →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── sous-composants ──────────────────────────

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
              on ? "bg-forest text-canvas border-forest" : "text-forest border-forest/20 hover:border-forest/50"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  v,
  onChange,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    "peer w-full bg-transparent border-b border-forest/20 pt-6 pb-2 text-forest font-head text-base outline-none focus:border-forest transition";
  return (
    <label className="relative block">
      <span className="absolute left-0 top-2 font-label text-[10px] text-forest/60">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          required={required}
          rows={4}
          value={v}
          onChange={(e) => onChange(e.target.value)}
          className={cls + " resize-none"}
        />
      ) : (
        <input required={required} type={type} value={v} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Services", "Cadre", "Identité", "Envoyé"];
  return (
    <div className="flex items-center gap-1.5 sm:gap-3 font-mono text-[10px] text-forest/60 w-full overflow-hidden">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span
            className={`grid place-items-center h-6 w-6 shrink-0 rounded-full border text-[10px] transition ${
              i === step
                ? "bg-forest text-canvas border-forest"
                : i < step
                ? "bg-teal text-canvas border-teal"
                : "border-forest/20"
            }`}
          >
            {i < step ? "✓" : i + 1}
          </span>
          <span className={`hidden sm:inline ${i === step ? "text-forest" : ""}`}>{l}</span>
          {i < labels.length - 1 && <span className="text-forest/20">/</span>}
        </div>
      ))}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="font-mono text-[10px] tracking-[0.2em] text-forest/50 pt-1 shrink-0">{k}</dt>
      <dd className="text-forest text-right text-sm leading-snug">{v}</dd>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
function SceneVideo() {
  return (
    <div className="absolute inset-0">
      {/* Scene 1 */}
      <div className="scene scene-1 bg-forest-md">
        <div className="absolute inset-0 paper-grid opacity-20" />
        <svg viewBox="0 0 400 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g stroke="oklch(0.81 0.06 90)" strokeWidth="1.4" fill="none" opacity="0.85">
            <motion.path
              d="M40 480 Q140 360 220 440 T380 380"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 18 }}
            />
            <motion.path
              d="M60 520 L340 200"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 18, delay: 1 }}
            />
            <motion.circle
              cx="260"
              cy="300"
              r="80"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 18, delay: 2 }}
            />
          </g>
        </svg>
      </div>

      {/* Scene 2 */}
      <div className="scene scene-2 bg-canvas/95">
        <div className="absolute inset-8 grid grid-cols-3 grid-rows-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, repeat: Infinity, repeatDelay: 22 }}
              className={`rounded-sm ${
                i % 5 === 0 ? "bg-mondrian-red" : i % 4 === 0 ? "bg-mondrian-yellow" : i % 3 === 0 ? "bg-forest" : "bg-beige"
              }`}
              style={{ opacity: 0.85 }}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-8 font-mono text-[10px] text-forest/70">EPREUVES · 12 / 24</div>
      </div>

      {/* Scene 3 */}
      <div className="scene scene-3 bg-beige">
        <div className="absolute inset-0 flex flex-col">
          {["bg-forest", "bg-teal", "bg-gold", "bg-mondrian-red", "bg-mondrian-blue"].map((c, i) => (
            <motion.div
              key={c}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: i * 0.15, repeat: Infinity, repeatDelay: 22, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className={`flex-1 ${c}`}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-8 font-mono text-[10px] text-canvas mix-blend-difference">PALETTE · 05</div>
      </div>

      {/* Scene 4 */}
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
          <div className="font-display text-2xl leading-tight">
            Architecture
            <br />
            <span className="italic text-gold">éditée.</span>
          </div>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full border-2 border-mondrian-red"
        />
      </div>

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
