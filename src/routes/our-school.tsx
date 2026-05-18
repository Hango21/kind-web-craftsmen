import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import {
  Beaker, BookOpen, Cpu, Music, Palette, Trophy, Users, Salad, TreePine, Building2,
} from "lucide-react";

export const Route = createFileRoute("/our-school")({
  head: () => ({
    meta: [
      { title: "Our School — NOVA International School" },
      { name: "description", content: "Pearson Edexcel curriculum, modern facilities, extracurricular activities and technology-enabled learning at NOVA International School." },
    ],
  }),
  component: OurSchool,
});

const facilities = [
  { icon: Building2, label: "Smart Classrooms" },
  { icon: Beaker, label: "Science Laboratories" },
  { icon: Cpu, label: "Computer Labs" },
  { icon: BookOpen, label: "Library" },
  { icon: Trophy, label: "Sports Fields" },
  { icon: Palette, label: "Art Studio" },
  { icon: Music, label: "Music Room" },
  { icon: Users, label: "Auditorium" },
  { icon: TreePine, label: "Playground" },
  { icon: Salad, label: "Cafeteria" },
];

const activities = ["Football","Basketball","Athletics","STEM Clubs","Debate Club","Music & Drama","Entrepreneurship Programs","Community Service"];

function OurSchool() {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Our School"
        title="Where the Pearson curriculum meets character"
        subtitle="A student-centered learning community blending academic rigor with creativity, technology and strong values."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle eyebrow="School Overview" title="The Pearson Edexcel Pathway" />
        <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">
          Globally recognized curriculum ensuring academic excellence and university readiness — emphasising critical thinking, inquiry-based learning, creativity and continuous assessment from Early Childhood through Secondary.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {["Student-Centered Learning","Inquiry-Based Education","Experiential Learning","Technology Integration","Character Development"].map((l) => (
            <div key={l} className="rounded-2xl bg-primary text-primary-foreground p-5 text-center shadow-[var(--shadow-soft)]">
              <div className="font-display font-semibold text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Facilities" title="Built for modern learning" center />
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {facilities.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-card rounded-2xl p-6 border border-border text-center hover:border-gold transition">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon />
                </div>
                <div className="font-medium text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionTitle eyebrow="Extracurricular" title="Beyond the classroom" />
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {activities.map((a) => (
              <div key={a} className="rounded-xl border border-border p-4 bg-card text-sm">{a}</div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="Technology in Learning" title="Digital, connected, secure" />
          <ul className="mt-8 space-y-3 text-muted-foreground">
            {["Smart classrooms","Digital learning platforms","Online assessments","Parent communication systems"].map((t) => (
              <li key={t} className="flex items-start gap-3"><span className="h-2 w-2 rounded-full bg-gold mt-2"/> <span className="text-foreground">{t}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
