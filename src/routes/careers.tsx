import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — NOVA International School" },
      { name: "description", content: "Join NOVA International School. Open roles for teachers, counselors and administrative staff. Apply at careers@novaschool.et." },
    ],
  }),
  component: Careers,
});

const openings = ["Early Childhood Teachers","Primary Teachers","Secondary Subject Teachers","ICT Teachers","School Counselors","Administrative Staff"];
const why = ["Professional Development","Collaborative Culture","Competitive Compensation","International Curriculum Experience","Teacher Empowerment"];

function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Careers"
        title="Join a school built by visionary educators"
        subtitle="NOVA seeks passionate, qualified, and innovative educators and professionals committed to academic excellence and holistic student development."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionTitle eyebrow="Why Work With Us" title="Grow with NOVA" />
          <ul className="mt-8 space-y-3">
            {why.map((w) => (
              <li key={w} className="rounded-xl border border-border p-4 bg-card font-medium">{w}</li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle eyebrow="Current Openings" title="Open positions" />
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {openings.map((o) => (
              <div key={o} className="rounded-xl border border-border bg-card p-4 hover:border-gold transition">
                <div className="font-medium">{o}</div>
                <div className="text-xs text-muted-foreground mt-1">Apply via email</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-3">Application Process</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            <span className="gold-underline">Send us your CV</span>
          </h2>
          <p className="mt-6 text-primary-foreground/85">
            Submit your CV, Cover Letter, Academic Credentials and References to our careers team.
          </p>
          <a href="mailto:careers@novaschool.et" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-3.5 font-semibold">
            <Mail size={16}/> careers@novaschool.et
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
