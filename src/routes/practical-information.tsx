import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Clock, Bus, Utensils, ShieldCheck, Users, FileText } from "lucide-react";
import { usePageContent } from "@/lib/page-content";

export const Route = createFileRoute("/practical-information")({
  head: () => ({
    meta: [
      { title: "Practical Information — NOVA International School" },
      { name: "description", content: "School hours, location, transportation, cafeteria, safety and parent engagement at NOVA International School, Addis Ababa." },
    ],
  }),
  component: Practical,
});

function Practical() {
  const { t } = usePageContent("practical-information");
  const hours: [string, string][] = [
    ["Early Childhood", t("hours_ec")],
    ["Primary School", t("hours_primary")],
    ["Secondary School", t("hours_secondary")],
  ];
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Practical Information"
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionTitle eyebrow="Location" title="Find us in Addis Ababa" />
          <p className="mt-6 text-muted-foreground">{t("address")}</p>
          <div className="mt-6 rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-soft)] aspect-[16/10]">
            <iframe
              title="NOVA School Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.7%2C8.95%2C38.85%2C9.05&layer=mapnik"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="School Hours" title="A structured daily rhythm" />
          <div className="mt-8 rounded-2xl overflow-hidden border border-border">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr><th className="p-4 text-left">Program</th><th className="p-4 text-left">Time</th></tr>
              </thead>
              <tbody>
                {hours.map(([p, t]) => (
                  <tr key={p} className="border-t border-border bg-card">
                    <td className="p-4 font-medium">{p}</td>
                    <td className="p-4 text-muted-foreground flex items-center gap-2"><Clock size={14}/>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Bus, title: "Transportation", body: "Safe and organized student transport services available." },
            { icon: Utensils, title: "Cafeteria", body: "Healthy and hygienic meal options provided daily." },
            { icon: ShieldCheck, title: "Health & Safety", body: "Safeguarding, first aid, secure campus and monitoring." },
            { icon: Users, title: "Parent Engagement", body: "Workshops, parenting skills, and school governance participation." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl bg-card p-6 border border-border">
              <Icon className="text-gold mb-3" />
              <h3 className="font-display font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle eyebrow="School Policies" title="Clear standards, fair expectations" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Attendance Policy","Discipline Policy","Academic Integrity Policy","Child Protection Policy"].map((p) => (
            <div key={p} className="rounded-2xl border border-border p-6 bg-card flex items-start gap-3">
              <FileText className="text-primary shrink-0"/>
              <div className="font-medium">{p}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
