import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/nova-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="NOVA logo" className="h-12 w-12" />
            <div>
              <div className="font-display font-bold text-lg">NOVA</div>
              <div className="text-xs tracking-widest text-primary-foreground/70">INTERNATIONAL SCHOOL</div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Excellence. Character. Global Vision. Launching September 2026 in Addis Ababa.
          </p>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/careers" className="hover:text-gold">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-widest uppercase">Programs</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Early Childhood</li>
            <li>Primary School</li>
            <li>Secondary School</li>
            <li>Pearson Edexcel</li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-widest uppercase">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin size={16} className="text-gold shrink-0 mt-0.5" /> Lemikura Sub-City, Salite Mihiret, Addis Ababa</li>
            <li className="flex gap-2"><Mail size={16} className="text-gold shrink-0 mt-0.5" /> info@novaschool.et</li>
            <li className="flex gap-2"><Phone size={16} className="text-gold shrink-0 mt-0.5" /> +251 XXX XXX XXX</li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "X (Twitter)" },
            ].map(({ icon: Icon, label }, i) => (
              <a key={i} href="#" aria-label={label} className="h-9 w-9 rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-primary-foreground/60 flex flex-wrap justify-between gap-2">
          <span>© 2026 NOVA International School. All Rights Reserved.</span>
          <span>Excellence • Character • Global Vision</span>
        </div>
      </div>
    </footer>
  );
}
