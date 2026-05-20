import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { useState } from "react";
import { ChevronDown, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/faq")({
    head: () => ({
        meta: [
            { title: "FAQ — NOVA International School" },
            { name: "description", content: "Frequently asked questions about admissions, curriculum, fees, and school life at NOVA International School." },
        ],
    }),
    component: FAQ,
});

const faqData = [
    {
        category: "Admissions",
        items: [
            { q: "When does NOVA International School open?", a: "NOVA International School is scheduled to commence operations in September 2026 in Addis Ababa, Ethiopia." },
            { q: "How do I apply for admission?", a: "You can apply online through our registration page. Submit the online inquiry form, complete the application, and our admissions team will guide you through the assessment and enrollment process." },
            { q: "What age groups do you accept?", a: "NOVA accepts students across three levels: Early Childhood (ages 3–6), Primary School (ages 6–12), and Secondary School (ages 12–18)." },
            { q: "What documents are required for admission?", a: "Required documents include Birth Certificate, Passport Photos, Previous School Reports, Parent Identification, and Medical Records." },
            { q: "Is there an entrance exam?", a: "Yes, all applicants go through a student assessment as part of the six-step admission process. This helps us understand each student's academic readiness and learning needs." },
        ],
    },
    {
        category: "Curriculum",
        items: [
            { q: "What curriculum does NOVA follow?", a: "NOVA implements the globally recognized Pearson Edexcel curriculum across all levels — aligned with Ethiopia's Ministry of Education requirements and international best practices." },
            { q: "Are classes taught in English?", a: "Yes, English is the primary medium of instruction. Amharic language classes are also offered to maintain cultural connection." },
            { q: "What extracurricular activities are offered?", a: "We offer Football, Basketball, Athletics, STEM Clubs, Debate Club, Music & Drama, Entrepreneurship Programs, and Community Service activities." },
            { q: "How are students assessed?", a: "Students are continuously assessed through a combination of formative assessments, projects, examinations, and the Pearson grading system." },
        ],
    },
    {
        category: "Fees & Finance",
        items: [
            { q: "What are the school fees?", a: "The tuition fee is Birr 300,000 per year. A detailed fee breakdown including registration, uniform, and transport fees is shared during the enrollment process." },
            { q: "Are there payment plans available?", a: "Yes, NOVA offers flexible payment plans including termly and monthly installment options. Details are provided during enrollment." },
            { q: "Are scholarships available?", a: "Yes, NOVA offers merit-based scholarships for outstanding students. Details about eligibility and application will be announced on our news page." },
        ],
    },
    {
        category: "School Life",
        items: [
            { q: "What are the school hours?", a: "Early Childhood: 8:00 AM – 2:00 PM. Primary and Secondary: 8:00 AM – 3:00 PM." },
            { q: "Is transportation provided?", a: "Yes, safe and organized student transport services are available covering major routes across Addis Ababa." },
            { q: "Is there a school cafeteria?", a: "Yes, NOVA provides healthy and hygienic meal options daily in our on-campus cafeteria." },
            { q: "What safety measures are in place?", a: "NOVA prioritizes student safety with secure campus monitoring, trained security personnel, first aid facilities, and comprehensive child protection policies." },
            { q: "How do parents stay involved?", a: "Through our parent-investor governance model, parents actively participate in school development. We also offer parent workshops, regular communication through the portal, and parent-teacher meetings." },
        ],
    },
    {
        category: "Parent-Investor Model",
        items: [
            { q: "What is the parent-investor model?", a: "NOVA's unique parent-investor ownership model allows parents to invest in the school and participate in its governance. This creates stronger accountability, transparency, and long-term educational commitment." },
            { q: "How can I become a parent-investor?", a: "Details about the parent-investor program are shared during our information sessions. Contact our admissions team or attend an upcoming open day to learn more." },
        ],
    },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/30 transition-colors"
            >
                <span className="font-semibold text-foreground text-sm">{q}</span>
                <ChevronDown size={18} className={`text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {a}
                </div>
            )}
        </div>
    );
}

function FAQ() {
    const [search, setSearch] = useState("");

    const filteredFaq = faqData.map((cat) => ({
        ...cat,
        items: cat.items.filter(
            (item) =>
                item.q.toLowerCase().includes(search.toLowerCase()) ||
                item.a.toLowerCase().includes(search.toLowerCase())
        ),
    })).filter((cat) => cat.items.length > 0);

    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                subtitle="Find answers to common questions about admissions, curriculum, fees, and school life at NOVA."
            />

            {/* Search */}
            <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search questions..."
                        className="w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-4 text-sm shadow-[var(--shadow-card)] focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">
                    {filteredFaq.map((cat) => (
                        <div key={cat.category}>
                            <h2 className="font-display font-bold text-2xl text-primary mb-5">{cat.category}</h2>
                            <div className="space-y-3">
                                {cat.items.map((item) => (
                                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                    {filteredFaq.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No questions match your search.</p>
                            <button onClick={() => setSearch("")} className="mt-4 text-primary font-semibold hover:text-gold transition-colors">Clear search</button>
                        </div>
                    )}
                </div>
            </section>

            {/* Still have questions CTA */}
            <section className="bg-secondary/60 py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                    <SectionTitle eyebrow="Still Have Questions?" title="We're here to help" center />
                    <p className="mt-4 text-muted-foreground">Can't find the answer you're looking for? Our admissions team is ready to assist you.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:bg-primary-deep transition">
                            Contact Us <ArrowRight size={16} />
                        </Link>
                        <Link to="/admissions" className="inline-flex items-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-7 py-3.5 font-semibold transition-colors">
                            View Admissions
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
