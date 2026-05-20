import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { CheckCircle2 } from "lucide-react";
import campus from "@/assets/campus.jpg";
import { usePageContent } from "@/lib/page-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NOVA International School" },
      { name: "description", content: "Learn about NOVA International School's vision, mission, values and the parent-investor governance model behind Addis Ababa's newest international school." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = usePageContent("about");
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="About Us"
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
      />

      {/* Chairman */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle eyebrow="Chairman's Welcome" title="A message from our Chairman" />
        <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
          <p>{t("chairman_message")}</p>
          <p className="text-foreground font-semibold pt-4">
            {t("chairman_name")}<br/>
            <span className="text-muted-foreground font-normal text-sm">Chairman of the Board, NOVA International School</span>
          </p>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-[var(--shadow-soft)]">
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-3">Vision</p>
            <p className="text-foreground leading-relaxed">
              To become one of Ethiopia's most trusted and future-ready international schools,
              producing globally competent, ethically grounded, and academically excellent graduates
              prepared for higher education and leadership worldwide.
            </p>
          </div>
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-[var(--shadow-card)]">
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-3">Mission</p>
            <ul className="space-y-2 text-primary-foreground/90 text-sm">
              {[
                "Deliver high-quality Pearson curriculum education",
                "Provide a safe and inclusive environment",
                "Prepare students for global universities and careers",
                "Partner with parents and communities",
                "Operate with ethical governance and sustainability",
              ].map((m) => (
                <li key={m} className="flex gap-2"><CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5"/> {m}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border shadow-[var(--shadow-soft)]">
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-3">Core Values</p>
            <ul className="space-y-2 text-foreground text-sm">
              {["Academic Excellence","Integrity & Ethical Leadership","Global Mindset","Respect & Inclusivity","Collaboration & Partnership","Innovation & Professional Growth","Responsibility & Sustainability"].map((v) => (
                <li key={v} className="flex gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5"/> {v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Story + Governance */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle eyebrow="Our Story" title="Born from a parental vision" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            NOVA International School emerged from a shared parental vision to create a world-class
            educational institution that addresses the growing demand for globally recognized
            education in Ethiopia. Our parent-investor model creates stronger accountability,
            transparency, and long-term educational commitment.
          </p>
          <h3 className="font-display font-bold text-xl text-primary mt-10 mb-4">Governance Model</h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm">
            {["Board of Directors","Parent-Investors","Academic Leadership Team","Professional Administrative Team"].map((g) => (
              <li key={g} className="rounded-xl border border-border p-4 bg-card">{g}</li>
            ))}
          </ul>
        </div>
        <img src={campus} alt="NOVA campus" loading="lazy" width={1280} height={800} className="rounded-3xl shadow-[var(--shadow-card)] w-full h-auto object-cover" />
      </section>

      {/* Accreditation */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Accreditation</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            <span className="gold-underline">Internationally Benchmarked</span> Education
          </h2>
          <p className="mt-6 text-primary-foreground/85 leading-relaxed">
            NOVA implements the globally respected Pearson Edexcel curriculum across Early Childhood,
            Primary and Secondary levels — aligned with Ethiopia's Ministry of Education
            requirements and international best practices in safeguarding, assessment and school
            leadership.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
