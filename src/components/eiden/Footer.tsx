import { Mail, Phone, Link } from "lucide-react";
import icon from "@/assets/icon.png";
import logo from "@/assets/logo-1.png";

const CONTACTS = [
  { I: Mail, label: "EMAIL", v: "contact@eiden-group.com", href: "mailto:contact@eiden-group.com" },
  { I: Link, label: "SITE WEB", v: "www.eiden-group.com", href: "https://www.eiden-group.com" },
];

export function Footer() {
  return (
    <footer className="bg-canvas text-forest border-t-2 border-forest">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-8">
        {/* Top row: Logo + Contacts */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10 pb-8 border-b border-forest/10">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-10 w-10 rounded-md bg-forest shrink-0">
              <img src={icon} alt="" className="h-7 w-7" style={{ filter: "brightness(0) invert(0.93) sepia(0.3) saturate(2)" }} />
            </span>
            <img src={logo} alt="Eiden Group" className="h-8 w-auto" />
          </div>

          {/* Contact items */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {CONTACTS.map(({ I, label, v, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2.5 text-forest/60 hover:text-teal transition-colors duration-300"
              >
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-forest/[0.06] 
                  group-hover:bg-teal/10 border border-forest/5 group-hover:border-teal/20 
                  transition-all duration-300">
                  <I className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] tracking-widest text-forest/35 group-hover:text-teal/50 
                    transition-colors duration-300 leading-none">{label}</span>
                  <span className="font-mono text-[11px] tracking-wide mt-0.5">{v}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="font-mono text-[10px] text-forest/50">
            <div>© {new Date().getFullYear()} EIDEN GROUP | TOUS DROITS RÉSERVÉS</div>
          </div>
          <div className="font-mono text-[10px] text-forest/35">
            Architecture d'Entreprise — Maroc
          </div>
        </div>
      </div>
    </footer>
  );
}