export function SectionTitle({
  eyebrow,
  title,
  center,
}: { eyebrow?: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary leading-tight">
        <span className="gold-underline">{title}</span>
      </h2>
    </div>
  );
}
