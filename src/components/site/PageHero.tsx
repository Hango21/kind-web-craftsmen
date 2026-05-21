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
  const videoId = videoUrl ? videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop()?.split("?")[0] : "oJigZ4PWbHc";

  return (
    <div className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-30"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0`}
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
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
