import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ec from "@/assets/early-childhood.jpg";
import primary from "@/assets/primary.jpg";
import secondary from "@/assets/secondary.jpg";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — NOVA International School" },
      { name: "description", content: "Admissions process, required documents and programs at NOVA International School Addis Ababa. Apply for Early Childhood, Primary or Secondary." },
    ],
  }),
  component: Admissions,
});

const programs = [
  { img: ec, title: "Early Childhood", body: "A nurturing environment focused on foundational learning and development." },
  { img: primary, title: "Primary School", body: "Strong literacy, numeracy, inquiry-based learning, and creativity." },
  { img: secondary, title: "Secondary School", body: "Academic rigor, leadership development, and global university preparation." },
];

const steps = [
  "Submit Online Inquiry",
  "Complete Application Form",
  "Student Assessment",
  "Interview & Documentation Review",
  "Admission Decision",
  "Enrollment Confirmation",
];

const docs = ["Birth Certificate", "Passport Photos", "Previous School Reports", "Parent Identification", "Medical Records"];

function Admissions() {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Admissions"
        title="Welcoming families for September 2026"
        subtitle="We welcome applications from families seeking high-quality international education with strong values and discipline."
      >
        <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground hover:brightness-95">
          Start Application <ArrowRight size={16} />
        </Link>
      </PageHero>

      {/* Quick Facts Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <SectionTitle eyebrow="At a Glance" title="School Quick Facts" />
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
              {[
                { label: "Opening Date", value: "September 2026" },
                { label: "Curriculum", value: "Pearson Edexcel" },
                { label: "Location", value: "Lemikura Sub-City, Addis Ababa" },
                { label: "Programs", value: "EC, Primary & Secondary" },
                { label: "Campus Size", value: "6,000 m²" },
                { label: "Learning Model", value: "International + Local Relevance" }
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-primary font-display font-bold text-xl mb-1">{f.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle eyebrow="Programs Offered" title="Three pathways. One vision." center />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="group rounded-3xl overflow-hidden bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle eyebrow="Admission Process" title="Six clear steps" />
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 items-start bg-card rounded-xl p-4 border border-border">
                  <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <div className="font-medium text-foreground">{s}</div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionTitle eyebrow="Required Documents" title="What to prepare" />
            <ul className="mt-8 grid gap-3">
              {docs.map((d) => (
                <li key={d} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                  <CheckCircle2 className="text-gold" /> <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-6 rounded-2xl bg-primary text-primary-foreground">
              <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-2">School Fees</p>
              <p className="font-display text-2xl font-bold">Birr 300,000 / year</p>
              <p className="text-primary-foreground/70 text-sm mt-2">Transparent tuition structure. Detailed fee breakdown shared during enrollment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle eyebrow="Why Parents Choose NOVA" title="A school worth choosing" center />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {["International curriculum", "Strong discipline culture", "Transparent tuition structure", "Technology-enabled learning", "Holistic development"].map((r) => (
            <div key={r} className="rounded-2xl border border-border p-5 text-center bg-card">
              <CheckCircle2 className="text-gold mx-auto mb-3" />
              <div className="text-sm font-medium">{r}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
