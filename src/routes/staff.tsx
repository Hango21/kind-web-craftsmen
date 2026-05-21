import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Mail, Linkedin } from "lucide-react";

export const Route = createFileRoute("/staff")({
    head: () => ({
        meta: [
            { title: "Staff Directory — NOVA International School" },
            { name: "description", content: "Meet the leadership team, educators and staff dedicated to academic excellence at NOVA International School." },
        ],
    }),
    component: Staff,
});

const leadership = [
    { name: "Ato Tadesse Ayanew", role: "Chairman of the Board", bio: "Visionary leader and founding parent-investor driving NOVA's mission to deliver world-class education in Ethiopia.", initials: "TA" },
    { name: "Dr. Meron Abebe", role: "School Director", bio: "Experienced international school leader with 20+ years in education. PhD in Educational Leadership from the University of London.", initials: "MA" },
    { name: "Mr. Samuel Kebede", role: "Head of Academics", bio: "Curriculum design expert with deep experience in Pearson Edexcel implementation across East African schools.", initials: "SK" },
    { name: "Mrs. Hiwot Tesfaye", role: "Head of Student Affairs", bio: "Passionate about holistic student development, character education, and creating inclusive learning communities.", initials: "HT" },
];

const faculty = [
    { name: "Mr. Daniel Girma", role: "Early Childhood Lead", department: "Early Childhood", initials: "DG" },
    { name: "Mrs. Rahel Worku", role: "Primary Section Head", department: "Primary", initials: "RW" },
    { name: "Mr. Yohannes Belay", role: "Secondary Section Head", department: "Secondary", initials: "YB" },
    { name: "Ms. Sara Mulugeta", role: "Science & STEM Coordinator", department: "Science", initials: "SM" },
    { name: "Mr. Abiy Tadesse", role: "Mathematics Lead", department: "Mathematics", initials: "AT" },
    { name: "Mrs. Tigist Hailu", role: "English & Literacy Lead", department: "English", initials: "TH" },
    { name: "Mr. Dawit Alemu", role: "ICT & Digital Learning Lead", department: "Technology", initials: "DA" },
    { name: "Ms. Bethlehem Fikre", role: "Arts & Music Coordinator", department: "Arts", initials: "BF" },
    { name: "Mr. Henok Mekonnen", role: "Sports & Physical Ed Lead", department: "Sports", initials: "HM" },
    { name: "Mrs. Almaz Negash", role: "School Counselor", department: "Wellbeing", initials: "AN" },
    { name: "Mr. Tewodros Seyoum", role: "Librarian", department: "Library", initials: "TS" },
    { name: "Mrs. Marta Getachew", role: "Administrative Manager", department: "Admin", initials: "MG" },
];

function Staff() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="Our Team"
                title="Meet the people behind NOVA"
                subtitle="Dedicated educators and professionals committed to excellence, character, and global vision."
            />

            {/* Leadership Team */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle eyebrow="Leadership" title="School Leadership Team" center />
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leadership.map((p) => (
                        <div key={p.name} className="bg-card rounded-2xl border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow p-6 text-center group">
                            <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-display font-bold">
                                {p.initials}
                            </div>
                            <h3 className="mt-4 font-display font-bold text-lg text-foreground">{p.name}</h3>
                            <p className="text-sm text-gold font-semibold">{p.role}</p>
                            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{p.bio}</p>
                            <div className="mt-4 flex justify-center gap-2">
                                <a href="#" className="h-8 w-8 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                                    <Mail size={14} />
                                </a>
                                <a href="#" className="h-8 w-8 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                                    <Linkedin size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Faculty & Staff */}
            <section className="bg-secondary/60 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle eyebrow="Faculty & Staff" title="Our educators and team" center />
                    <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {faculty.map((f) => (
                            <div key={f.name} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 hover:border-primary transition-colors">
                                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
                                    {f.initials}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm text-foreground">{f.name}</div>
                                    <div className="text-xs text-muted-foreground">{f.role}</div>
                                    <div className="text-[10px] text-gold font-semibold uppercase tracking-wider mt-0.5">{f.department}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join banner */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="rounded-3xl bg-primary text-primary-foreground p-10 sm:p-14 text-center">
                    <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-3">Join Our Team</p>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl">
                        <span className="gold-underline">We're hiring passionate educators</span>
                    </h2>
                    <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">Interested in joining NOVA? We are looking for talented teachers and staff.</p>
                    <a href="mailto:career@novainternationalschool.et" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-8 py-3.5 font-semibold">
                        <Mail size={16} /> Apply Now
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
