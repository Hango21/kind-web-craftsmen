import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import logo from "@/assets/nova-logo.png";
import { useTheme } from "@/hooks/use-theme";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us", sub: [{ to: "/about", label: "Our Vision" }, { to: "/about", label: "Governance" }] },
  { to: "/admissions", label: "Admissions", sub: [{ to: "/admissions", label: "How to Apply" }, { to: "/register", label: "Start Application" }] },
  { to: "/our-school", label: "Our School", sub: [{ to: "/our-school", label: "Curriculum" }, { to: "/our-school", label: "Facilities" }] },
  { to: "/practical-information", label: "Practical Info", sub: [{ to: "/practical-information", label: "Term Dates" }, { to: "/practical-information", label: "Transport" }] },
  { to: "/careers", label: "Careers", sub: [{ to: "/careers", label: "Open Roles" }, { to: "/careers", label: "Why Join Us" }] },
  { to: "/contact", label: "Contact", sub: [{ to: "/contact", label: "Get in Touch" }, { to: "/contact", label: "Location" }] },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/80 backdrop-blur-md shadow-lg border-b border-primary-foreground/10" : "bg-transparent"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="NOVA International School" className="h-12 w-12 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-primary-foreground font-display font-bold text-lg tracking-wide">NOVA</span>
            <span className="text-primary-foreground/80 text-[10px] tracking-[0.2em] uppercase">International School</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => (
            <div key={n.to} className="relative group">
              <Link
                to={n.to}
                className="text-primary-foreground/90 hover:text-gold text-sm font-medium transition-colors py-2 flex items-center gap-1"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label} {n.sub && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
              </Link>
              {n.sub && (
                <div className="absolute top-full left-0 hidden group-hover:block pt-2">
                  <div className="bg-card w-48 rounded-xl shadow-xl border border-border p-2 flex flex-col gap-1">
                    {n.sub.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        className="text-sm px-3 py-2 rounded-md hover:bg-secondary/50 text-foreground hover:text-primary transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
