// Contact.tsx
import { motion } from "framer-motion";
import { Mail, Phone, Link } from "lucide-react";

export function Contact({ onCommission }: { onCommission: () => void }) {
    return (
        <section id="contact" className="relative bg-forest text-canvas py-24 md:py-36 overflow-hidden grain">
            <div className="absolute inset-0 paper-grid opacity-[0.06]" />
            <div className="absolute top-0 left-0 h-2 w-full bg-mondrian-yellow md:w-1/4" />
            <div className="absolute top-0 left-96 w-2 h-3/5 bg-mondrian-red md:left-1/4 md:h-1/3" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
                <div className="grid md:grid-cols-12 gap-8 mb-16 pb-10 border-b-2 border-canvas/20">
                    <div className="md:col-span-3 font-mono text-[10px] text-canvas/70">
                        <div>SECTION 04</div>
                        <div className="mt-1">CONTACT</div>
                    </div>
                    <h2 className="md:col-span-9 font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] tracking-[-0.03em] text-balance">
                        30 minutes pour voir où votre activité <span className="font-display-wonk italic text-gold">fuit</span>
                        <span className="text-mondrian-red">.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-12 gap-10">
                    <div className="md:col-span-5 space-y-3">
                        {[
                            { I: Mail, label: "EMAIL", v: "contact@eiden-group.com", href: "mailto:contact@eiden-group.com" },
                            { I: Phone, label: "MAROC", v: "+212 7 77 77 74 28", href: "tel:+212777777428" },
                            { I: Link, label: "SITE WEB", v: "www.eiden-group.com", href: "https://www.eiden-group.com" },
                        ].map(({ I, label, v, href }, i) => (
                            <motion.a
                                key={label}
                                href={href}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group flex items-center gap-4 rounded-2xl border border-canvas/15 p-5 hover:border-gold/60 hover:bg-canvas/5 transition"
                            >
                                <span className="grid place-items-center h-11 w-11 rounded-full bg-canvas/10 group-hover:bg-gold group-hover:text-forest transition">
                                    <I className="h-5 w-5" />
                                </span>
                                <div className="min-w-0">
                                    <div className="font-mono text-[10px] text-gold">{label}</div>
                                    <div className="font-head text-base">{v}</div>
                                </div>
                            </motion.a>
                        ))}

                        {/* Carte interactive */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.24 }}
                            className="rounded-2xl border border-canvas/15 overflow-hidden hover:border-gold/60 transition"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.123456789012!2d-9.598888888888888!3d30.420555555555556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzE0LjAiTiA5wrAzNSc1Ni4wIlc!5e0!3m2!1sfr!2sma!4v1712345678901"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="bg-canvas/5"
                                title="Plan d'accès Eiden Group - Agadir Bay · Technopole 1"
                            />
                        </motion.div>
                    </div>

                    {/* Big CTA card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-7 rounded-3xl bg-canvas text-forest p-10 md:p-14 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 h-full w-2 bg-mondrian-red" />
                        <div className="font-mono text-[10px] text-forest/60 mb-4">APPEL DÉCOUVERTE · GRATUIT</div>
                        <h3 className="font-display font-light text-4xl md:text-5xl leading-[0.95] tracking-tight text-balance">
                            Réservez votre <span className="font-display-wonk italic text-teal">appel</span>.
                        </h3>
                        <p className="mt-5 text-forest/70 max-w-md leading-relaxed">
                            30 minutes. Sans deck. Sans pitch. Un associé EIDEN lit chaque brief personnellement et répond sous 24 heures.
                        </p>

                        <ul className="mt-8 space-y-2 text-sm text-forest/70">
                            {[
                                "Vous remplissez un brief court (2 min)",
                                "Un associé vous répond sous 24 h",
                                // ✅ fixed: removed extra spaces, corrected "engagez"
                                "Vous repartez avec une carte claire des fuites que vous nous engagez ou non",
                            ].map((s, i) => (
                                <li key={s} className="flex items-center gap-3">
                                    <span className="grid place-items-center h-5 w-5 rounded-full bg-forest text-canvas font-mono text-[10px] shrink-0">
                                        {i + 1}
                                    </span>
                                    {s}
                                </li>
                            ))}
                        </ul>

                        <button onClick={onCommission}  className="group mt-10 inline-flex items-center gap-3 rounded-full bg-forest text-canvas px-7 py-4 font-head text-sm font-medium hover:bg-mondrian-red transition focus-ring">
                            Réserver mon appel gratuit
                            <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition">
                                →
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}