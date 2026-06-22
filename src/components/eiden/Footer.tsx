import icon from "@/assets/icon.png";
import logo from "@/assets/logo-1.png";

export function Footer() {
  return (
    <footer className="bg-canvas text-forest border-t-2 border-forest">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-5 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-10 w-10 rounded-md bg-forest shrink-0">
            <img src={icon} alt="" className="h-7 w-7" style={{ filter: "brightness(0) invert(0.93) sepia(0.3) saturate(2)" }} />
          </span>
          <img src={logo} alt="" style={{width: "100%", height: 30}} />
        </div>

        <div className="font-mono text-[10px] text-forest/60 md:text-right">
          <div>© {new Date().getFullYear()} EIDEN GROUP | TOUS DROITS RÉSERVÉS</div>
        </div>
      </div>
    </footer>
  );
}