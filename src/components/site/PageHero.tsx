import type { ReactNode } from "react";
import { Header } from "./Header";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  videoUrl,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  videoUrl?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-primary" />
      </div>

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.79 0.15 80 / 0.4), transparent 40%), radial-gradient(circle at 80% 60%, oklch(0.5 0.18 260 / 0.5), transparent 50%)",
        }}
      />

      <Header />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-28 torn-bottom">
        {eyebrow && (
          <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-4">{eyebrow}</p>
        )}
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl max-w-3xl leading-[1.05]">
          <span className="gold-underline">{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-primary-foreground/85 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
