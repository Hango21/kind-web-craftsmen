import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import {
  Award,
  Users,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Globe2,
  Compass,
  ArrowRight,
} from "lucide-react";
import hero from "@/assets/hero-student.jpg";
import collab from "@/assets/students-collab.jpg";
import campus from "@/assets/campus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA International School — Excellence. Character. Global Vision." },
      { name: "description", content: "Premium international school in Addis Ababa launching September 2026. Pearson Edexcel curriculum, parent-investor model, holistic development." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden torn-bottom pb-4 min-h-[90vh] flex flex-col">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            className="w-[110vw] h-[61.875vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-50"
            src="https://www.youtube.com/embed/oJigZ4PWbHc?autoplay=1&mute=1&controls=0&loop=1&playlist=oJigZ4PWbHc&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
            allow="autoplay; encrypted-media"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80 backdrop-blur-[1px]" />
        </div>

        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(212, 175, 55, 0.4), transparent 45%), radial-gradient(circle at 85% 70%, rgba(43, 88, 126, 0.5), transparent 55%)",
          }}
        />

        <Header />
        <div className="relative z-10 flex-1 flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-5">Welcome to</p>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                NOVA <span className="gold-underline">International School</span>
              </h1>
              <p className="mt-7 text-primary-foreground/85 text-base sm:text-lg max-w-xl leading-relaxed">
                A future-ready international school launching September 2026 in Addis Ababa.
                Globally recognized Pearson curriculum delivered with strong values, discipline,
                and character development.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground hover:brightness-95 transition"
                >
                  Admissions <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-full border-2 border-primary-foreground/30 hover:border-gold hover:text-gold px-7 py-3.5 text-sm font-semibold transition"
                >
                  Register Here
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full border-2 border-primary-foreground/30 hover:border-gold hover:text-gold px-7 py-3.5 text-sm font-semibold transition"
                >
                  Admission Enquiry
                </Link>
              </div>
            </div>

            <div className="relative lg:justify-self-end">
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-3xl bg-gold/30 blur-2xl" />
              <div className="absolute -bottom-8 -right-4 h-40 w-40 rounded-3xl bg-primary-foreground/10 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-gold/40 shadow-2xl max-w-md">
                <img
                  src={hero}
                  alt="NOVA International School student"
                  width={640}
                  height={640}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="hidden lg:flex absolute -left-10 top-10 rounded-2xl bg-primary-deep/90 backdrop-blur p-3 border border-gold/30 shadow-xl">
                <Sparkles className="text-gold" />
              </div>
              <div className="hidden lg:flex absolute -right-6 bottom-16 rounded-2xl bg-primary-deep/90 backdrop-blur p-3 border border-gold/30 shadow-xl">
                <GraduationCap className="text-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Award, title: "Pearson Edexcel Curriculum", sub: "Globally recognized" },
            { icon: Users, title: "Parent-Investor Model", sub: "Shared governance" },
            { icon: GraduationCap, title: "EC, Primary & Secondary", sub: "Opens Sept 2026" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="rounded-2xl bg-primary text-primary-foreground p-7 shadow-[var(--shadow-card)] flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-gold flex items-center justify-center shrink-0">
                <Icon className="text-gold-foreground" />
              </div>
              <div>
                <div className="font-display font-semibold text-lg leading-snug">{title}</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCING GLOBAL LEADERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle eyebrow="Our Promise" title="Producing Global Leaders" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Welcome to <strong className="text-foreground">NOVA International School</strong> — a
            new international learning community in Addis Ababa rooted in Ethiopian values with a
            global outlook. We deliver the Pearson Edexcel curriculum to prepare students for the
            world's leading universities and meaningful, ethical leadership.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Premium yet accessible international education with strong discipline, ethical
            leadership, and holistic student development.
          </p>
          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Learn more about us <ArrowRight size={16} />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gold/20 -rotate-2" />
          <img
            src={collab}
            alt="NOVA students collaborating"
            loading="lazy"
            width={1280}
            height={900}
            className="relative rounded-3xl shadow-[var(--shadow-card)] w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* WHY CHOOSE NOVA */}
      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Why Choose NOVA" title="A School Built on Values" center />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe2, title: "Globally Recognized Curriculum", body: "Pearson Edexcel learning pathways from Early Childhood through Secondary." },
              { icon: ShieldCheck, title: "Strong Discipline & Character", body: "Respect, integrity, punctuality and accountability embedded in daily life." },
              { icon: HeartHandshake, title: "Parent-Investor Model", body: "Parents actively participate in governance and school development." },
              { icon: Sparkles, title: "Holistic Development", body: "Academics combined with creativity, leadership and emotional well-being." },
              { icon: ShieldCheck, title: "Safe & Inclusive Environment", body: "Secure, supportive, student-centered learning spaces." },
              { icon: Compass, title: "Future-Ready Education", body: "Technology-integrated learning designed for the modern world." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card rounded-2xl p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow border border-border">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground p-10 sm:p-16">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url(${campus})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "overlay",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-3">Now Enrolling</p>
                <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
                  <span className="gold-underline">Join the NOVA family</span> — September 2026.
                </h2>
                <p className="mt-5 text-primary-foreground/80 max-w-xl">
                  Secure a place for your child at one of Addis Ababa's most ambitious new
                  international schools.
                </p>
              </div>
              <div className="flex lg:justify-end gap-3 flex-wrap">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground hover:brightness-95">
                  Register Here <ArrowRight size={16} />
                </Link>
                <Link to="/admissions" className="inline-flex items-center rounded-full border-2 border-primary-foreground/30 hover:border-gold hover:text-gold px-7 py-3.5 text-sm font-semibold">
                  View Admissions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
