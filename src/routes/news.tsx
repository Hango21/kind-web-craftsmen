import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export const Route = createFileRoute("/news")({
    head: () => ({
        meta: [
            { title: "News & Announcements — NOVA International School" },
            { name: "description", content: "Latest news, updates and announcements from NOVA International School Addis Ababa." },
        ],
    }),
    component: News,
});

const featured = {
    title: "NOVA International School to Open Doors in September 2026",
    excerpt: "We are thrilled to announce that NOVA International School will officially commence operations in September 2026 in Addis Ababa, offering the globally recognized Pearson Edexcel curriculum across Early Childhood, Primary, and Secondary levels.",
    date: "May 15, 2026",
    category: "Announcement",
};

const articles = [
    {
        title: "Pearson Edexcel Partnership Officially Confirmed",
        excerpt: "NOVA has secured its partnership with Pearson to deliver the Edexcel International curriculum, ensuring globally benchmarked education for all students.",
        date: "April 28, 2026",
        category: "Curriculum",
    },
    {
        title: "Campus Construction Progress Update",
        excerpt: "Construction of the NOVA campus in Lemikura Sub-City is progressing on schedule. Smart classrooms, science labs, and sports facilities are taking shape.",
        date: "April 10, 2026",
        category: "Campus",
    },
    {
        title: "Parent-Investor Information Session Announced",
        excerpt: "Join us for an exclusive information session about NOVA's unique parent-investor governance model. Learn how parents actively participate in school development.",
        date: "March 25, 2026",
        category: "Event",
    },
    {
        title: "Recruitment Drive: Seeking World-Class Educators",
        excerpt: "NOVA is actively recruiting passionate teachers and staff who share our vision of academic excellence combined with character development.",
        date: "March 12, 2026",
        category: "Careers",
    },
    {
        title: "Early Childhood Program Details Released",
        excerpt: "Our Early Childhood program will focus on play-based learning, social development, and foundational literacy and numeracy skills in a nurturing environment.",
        date: "February 20, 2026",
        category: "Curriculum",
    },
    {
        title: "NOVA Scholarship Program for Outstanding Students",
        excerpt: "We are proud to announce a merit-based scholarship program to support talented students from diverse backgrounds in accessing world-class education.",
        date: "February 5, 2026",
        category: "Announcement",
    },
];

const categories = ["All", "Announcement", "Curriculum", "Campus", "Event", "Careers"];

function News() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="News & Announcements"
                title="Stay informed with NOVA"
                subtitle="The latest updates, milestones, and stories from our school community."
            />

            {/* Featured Article */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle eyebrow="Featured Story" title="Latest from NOVA" />
                <div className="mt-10 rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 shadow-[var(--shadow-card)]">
                    <span className="inline-block rounded-full bg-gold text-gold-foreground px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                        {featured.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight">
                        {featured.title}
                    </h3>
                    <p className="mt-4 text-primary-foreground/80 max-w-3xl leading-relaxed">
                        {featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-primary-foreground/60">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {featured.date}</span>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map((c, i) => (
                        <button
                            key={c}
                            className={`rounded-full px-5 py-2 text-sm font-medium border transition-colors ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary hover:text-primary bg-card"}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            {/* Articles Grid */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((a) => (
                        <article key={a.title} className="bg-card rounded-2xl border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow overflow-hidden group">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="flex items-center gap-1 text-xs text-gold font-semibold"><Tag size={12} /> {a.category}</span>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {a.date}</span>
                                </div>
                                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                                    {a.title}
                                </h3>
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                    {a.excerpt}
                                </p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold hover:gap-2 transition-all cursor-pointer">
                                        Read more <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="bg-secondary/60 py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                    <SectionTitle eyebrow="Stay Updated" title="Subscribe to our newsletter" center />
                    <p className="mt-4 text-muted-foreground">Get the latest NOVA news delivered directly to your inbox.</p>
                    <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <input type="email" required placeholder="Enter your email" className="flex-1 rounded-full border border-input bg-background px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                        <button className="rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold text-sm hover:bg-primary-deep transition">Subscribe</button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
