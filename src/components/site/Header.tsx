import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import logo from "@/assets/nova-logo.png";
import { useTheme } from "@/hooks/use-theme";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/admissions", label: "Admissions" },
  { to: "/our-school", label: "Our School" },
  { to: "/practical-information", label: "Practical Info" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="NOVA International School" className="h-12 w-12 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-primary-foreground font-display font-bold text-lg tracking-wide">NOVA</span>
            <span className="text-primary-foreground/80 text-[10px] tracking-[0.2em] uppercase">International School</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-primary-foreground/90 hover:text-gold text-sm font-medium transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            aria-label="Toggle dark mode"
            onClick={toggle}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full border-2 border-gold bg-transparent px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-gold hover:text-gold-foreground transition-colors"
          >
            Register Here
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button
            aria-label="Toggle dark mode"
            onClick={toggle}
            className="text-primary-foreground p-2"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-primary-foreground p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mb-2 rounded-2xl bg-primary/95 backdrop-blur border border-primary-foreground/10 p-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-primary-foreground/90 hover:text-gold py-2 px-3 rounded-md text-sm"
                activeProps={{ className: "text-gold bg-primary-foreground/5" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full bg-gold text-gold-foreground py-2.5 font-semibold"
            >
              Register Here
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
