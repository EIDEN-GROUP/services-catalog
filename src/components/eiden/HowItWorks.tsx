// Contact.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

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

const BUDGETS   = ["< 25k MAD", "25 – 75k MAD", "75 – 200k MAD", "200k+ MAD"];
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

const EMPTY_FORM: Form = {
    services: [],
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    brief: "",
};

export function HowItWorks() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<Form>(EMPTY_FORM);
    const [sent, setSent] = useState(false);

    const toggle = (service: string) =>
        setForm((f) => ({
            ...f,
            services: f.services.includes(service)
                ? f.services.filter((s) => s !== service)
                : [...f.services, service],
        }));

    const set = (key: keyof Form, value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    const canContinue =
        (step === 0 && form.services.length > 0) ||
        (step === 1 && !!form.budget && !!form.timeline) ||
        (step === 2 && !!form.name && !!form.email && !!form.brief);

    const submit = () => {
        const subject = encodeURIComponent(`Commission · ${form.name}`);
        const body = encodeURIComponent(
            `Services: ${form.services.join(", ")}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nNom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\n\nBrief:\n${form.brief}`
        );
        window.location.href = `mailto:contact@eiden-group.com?subject=${subject}&body=${body}`;
        setSent(true);
        setStep(3);
    };

    const reset = () => {
        setStep(0);
        setForm(EMPTY_FORM);
        setSent(false);
    };

    return (
        <section id="contact" className="relative bg-forest text-canvas py-24 md:py-36 overflow-hidden grain">
            {/* Background decorations */}
            <div className="absolute inset-0 paper-grid opacity-[0.06]" />
            <div className="absolute top-0 left-0 h-2 w-full bg-mondrian-yellow md:w-1/4" />
            <div className="absolute top-0 left-96 w-2 h-3/5 bg-mondrian-red md:left-1/4 md:h-1/3" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">

                {/* Title */}
                <div className="grid md:grid-cols-12 gap-8 mb-16 pb-10 border-b-2 border-canvas/20">
                    <div className="md:col-span-3 font-mono text-[10px] text-canvas/70">
                        <div>SECTION 04</div>
                        <div className="mt-1">CONTACT</div>
                    </div>
                    <h2 className="md:col-span-9 font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] tracking-[-0.03em] text-balance">
                        30 minutes pour voir où votre activité{" "}
                        <span className="font-display-wonk italic text-gold">fuit</span>
                        <span className="text-mondrian-red">.</span>
                    </h2>
                </div>

                {/* Form card */}
                <div className="rounded-3xl overflow-hidden grid md:grid-cols-12">

                    {/* Left — static info panel */}
                    <div className="md:col-span-5 bg-teal/20 border border-canvas/10 p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
                        <div className="font-mono text-[10px] text-canvas/60 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-mondrian-red animate-pulse" />
                            EIDEN / COMMISSION
                        </div>

                        <div>
                            <div className="font-mono text-[10px] text-gold/80 mb-3">
                                ÉTAPE {step + 1} / 4
                            </div>
                            <h3 className="font-display font-light text-3xl md:text-5xl leading-[0.95] tracking-tight text-balance">
                                {sent       && <>Brief <span className="font-display-wonk italic text-gold">transmis.</span></>}
                                {step === 0 && <>Vos <span className="font-display-wonk italic text-gold">disciplines.</span></>}
                                {step === 1 && <>Le <span className="font-display-wonk italic text-gold">cadre</span> du projet.</>}
                                {step === 2 && <>Votre <span className="font-display-wonk italic text-gold">identité.</span></>}
                            </h3>
                            <p className="mt-4 text-canvas/60 text-sm leading-relaxed">
                                Brief lu personnellement par un associé. Réponse sous 24 h ouvrables.
                            </p>
                        </div>
                    </div>

                    {/* Right — form steps */}
                    <div className="md:col-span-7 bg-canvas/95 text-forest p-8 md:p-12">

                        {/* Stepper */}
                        <div className="flex items-center gap-2 mb-10 font-mono text-[10px] text-forest/50">
                            {["Services", "Cadre", "Identité", "Envoyé"].map((label, i) => (
                                <div key={label} className="flex items-center gap-2">
                                    <span className={`grid place-items-center h-6 w-6 rounded-full border text-[10px] transition ${
                                        i === step ? "bg-forest text-canvas border-forest"
                                        : i < step ? "bg-teal text-canvas border-teal"
                                        : "border-forest/20"
                                    }`}>
                                        {i < step ? "✓" : i + 1}
                                    </span>
                                    <span className={i === step ? "text-forest" : ""}>{label}</span>
                                    {i < 3 && <span className="text-forest/20">/</span>}
                                </div>
                            ))}
                        </div>

                        {/* Steps */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Step 0 — Services */}
                                {step === 0 && (
                                    <div>
                                        <p className="font-mono text-[10px] text-forest/60 mb-4">Quel(s) service(s) ?</p>
                                        <div className="grid sm:grid-cols-2 gap-2">
                                            {SERVICES.map((s) => {
                                                const selected = form.services.includes(s);
                                                return (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => toggle(s)}
                                                        className={`flex items-center justify-between gap-3 text-left px-4 py-3.5 rounded-xl border transition ${
                                                            selected
                                                                ? "bg-forest text-canvas border-forest"
                                                                : "border-forest/15 hover:border-forest/40"
                                                        }`}
                                                    >
                                                        <span className="font-head text-sm">{s}</span>
                                                        {selected && <Check className="h-4 w-4 shrink-0 text-gold" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Step 1 — Budget & Timeline */}
                                {step === 1 && (
                                    <div className="space-y-8">
                                        <div>
                                            <p className="font-mono text-[10px] text-forest/60 mb-4">Budget envisagé</p>
                                            <div className="flex flex-wrap gap-2">
                                                {BUDGETS.map((b) => (
                                                    <button
                                                        key={b}
                                                        type="button"
                                                        onClick={() => set("budget", b)}
                                                        className={`px-4 py-2.5 rounded-full border font-head text-sm transition ${
                                                            form.budget === b
                                                                ? "bg-forest text-canvas border-forest"
                                                                : "border-forest/20 hover:border-forest/50"
                                                        }`}
                                                    >
                                                        {b}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] text-forest/60 mb-4">Horizon</p>
                                            <div className="flex flex-wrap gap-2">
                                                {TIMELINES.map((t) => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => set("timeline", t)}
                                                        className={`px-4 py-2.5 rounded-full border font-head text-sm transition ${
                                                            form.timeline === t
                                                                ? "bg-forest text-canvas border-forest"
                                                                : "border-forest/20 hover:border-forest/50"
                                                        }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2 — Identity */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <TextInput label="Nom *"   value={form.name}    onChange={(v) => set("name", v)} />
                                            <TextInput label="Email *" value={form.email}   onChange={(v) => set("email", v)} type="email" />
                                        </div>
                                        <TextInput label="Entreprise" value={form.company} onChange={(v) => set("company", v)} />
                                        <TextInput label="Brief *"    value={form.brief}   onChange={(v) => set("brief", v)} textarea />
                                    </div>
                                )}

                                {/* Step 3 — Success */}
                                {step === 3 && (
                                    <div className="py-10 text-center">
                                        <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-teal text-canvas mb-6">
                                            <Check className="h-7 w-7" />
                                        </div>
                                        <h4 className="font-display text-3xl text-forest">Brief transmis.</h4>
                                        <p className="mt-3 text-forest/60 max-w-sm mx-auto text-sm leading-relaxed">
                                            Un associé vous répond sous 24 h. Vérifiez votre messagerie si la fenêtre ne s'est pas ouverte.
                                        </p>
                                        <button
                                            onClick={reset}
                                            className="mt-8 rounded-full bg-forest text-canvas px-6 py-3 font-head text-sm hover:bg-teal transition"
                                        >
                                            Nouveau brief →
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        {step < 3 && (
                            <div className="mt-10 pt-6 border-t border-forest/10 flex items-center justify-between">
                                <button
                                    onClick={() => setStep((s) => s - 1)}
                                    disabled={step === 0}
                                    className="font-mono text-[10px] text-forest/50 disabled:opacity-30 hover:text-forest transition"
                                >
                                    ← Retour
                                </button>

                                {step < 2 ? (
                                    <button
                                        onClick={() => setStep((s) => s + 1)}
                                        disabled={!canContinue}
                                        className="rounded-full bg-forest text-canvas px-6 py-3 font-head text-sm disabled:opacity-40 hover:bg-teal transition"
                                    >
                                        Continuer →
                                    </button>
                                ) : (
                                    <button
                                        onClick={submit}
                                        disabled={!canContinue}
                                        className="rounded-full bg-mondrian-red text-canvas px-6 py-3 font-head text-sm disabled:opacity-40 hover:bg-forest transition"
                                    >
                                        Envoyer →
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

/* ── reusable text input ──────────────────────────────── */
function TextInput({ label, value, onChange, type = "text", textarea = false }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    textarea?: boolean;
}) {
    const base = "w-full bg-transparent border-b border-forest/20 pt-6 pb-2 font-head text-base text-forest outline-none focus:border-forest transition";
    return (
        <label className="relative block">
            <span className="absolute left-0 top-2 font-mono text-[10px] text-forest/50">{label}</span>
            {textarea
                ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={base + " resize-none"} />
                : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
            }
        </label>
    );
}