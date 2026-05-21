import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { BookOpen, MessageSquare, CalendarDays, FileText, Bell, GraduationCap, ArrowRight, Lock, MonitorSmartphone } from "lucide-react";

export const Route = createFileRoute("/portal")({
    head: () => ({
        meta: [
            { title: "Student & Parent Portal — NOVA International School" },
            { name: "description", content: "Access the NOVA student and parent portal for grades, attendance, communication and learning resources." },
        ],
    }),
    component: Portal,
});

const features = [
    { icon: BookOpen, title: "Report Cards & Grades", description: "Parents can securely view and download their child's latest report cards and academic progress." },
    { icon: MessageSquare, title: "Teacher Comments", description: "Read personalized feedback, behavioral comments, and performance notes directly from the teachers." },
    { icon: FileText, title: "Fee Payment System", description: "Parents can conveniently view fee statements, track deadlines, and make online payments securely." },
    { icon: CalendarDays, title: "School Calendar", description: "Stay up to date with class timetables, upcoming exams, holidays, and important school events." },
    { icon: Bell, title: "Notifications & Alerts", description: "Receive instant notifications for school announcements, events, and important academic updates." },
    { icon: GraduationCap, title: "Learning Resources", description: "Students can access digital textbooks, study materials, and supplementary educational content online." },
];

function Portal() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="Student & Parent Portal"
                title="Your gateway to NOVA"
                subtitle="A centralized digital platform connecting students, parents, and teachers for a seamless educational experience."
            />

            {/* Portal Login */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <SectionTitle eyebrow="Portal Access" title="Log in to your account" />
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            Use your credentials provided during enrollment to access the NOVA portal. If you haven't received your login details, please contact our IT department.
                        </p>
                        <div className="mt-8 bg-card rounded-3xl border border-border p-8 shadow-[var(--shadow-soft)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <Lock size={20} />
                                </div>
                                <h3 className="font-display font-bold text-lg text-foreground">Secure Login</h3>
                            </div>
                            <form className="space-y-4">
                                <div className="flex gap-4 p-1 bg-secondary/50 rounded-xl mb-4">
                                    <label className="flex-1 text-center cursor-pointer">
                                        <input type="radio" name="role" defaultChecked className="peer sr-only" />
                                        <div className="rounded-lg py-2 text-sm font-semibold text-muted-foreground peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-[var(--shadow-soft)] transition-all">Parent</div>
                                    </label>
                                    <label className="flex-1 text-center cursor-pointer">
                                        <input type="radio" name="role" className="peer sr-only" />
                                        <div className="rounded-lg py-2 text-sm font-semibold text-muted-foreground peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-[var(--shadow-soft)] transition-all">Student</div>
                                    </label>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-foreground">Email (Provided by Admin)</label>
                                    <input type="email" required placeholder="Enter the email given by the school" className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-foreground">Password</label>
                                    <input type="password" required placeholder="Enter your password" className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                                        <span className="text-muted-foreground">Remember me</span>
                                    </label>
                                    <a href="#" className="text-primary hover:text-gold transition-colors font-medium">Forgot password?</a>
                                </div>
                                <Link to="/dashboard" className="w-full inline-flex justify-center rounded-full bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary-deep transition">
                                    Sign In
                                </Link>
                            </form>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <SectionTitle eyebrow="Quick Access" title="Portal resources" />
                        <div className="mt-8 grid gap-4">
                            {[
                                { label: "Moodle Learning Management System", desc: "Access courses, assignments and digital classrooms", highlight: true },
                                { label: "Student Report Cards", desc: "Parents can securely download their child's academic reports", highlight: false },
                                { label: "Teacher Comments", desc: "View personalized feedback and behavioral comments", highlight: false },
                                { label: "Tuition & Fee Payment", desc: "View statements and make secure online payments", highlight: false },
                                { label: "School Calendar", desc: "View upcoming exams, holidays, and important events", highlight: false },
                            ].map((q) => (
                                <div key={q.label} className={`rounded-xl border p-5 flex items-center justify-between gap-4 transition-colors group cursor-pointer ${q.highlight ? "bg-primary/5 border-primary shadow-[var(--shadow-soft)] hover:bg-primary hover:text-primary-foreground text-foreground" : "bg-card border-border hover:border-primary text-foreground"}`}>
                                    <div className="flex items-start gap-3">
                                        {q.highlight && <MonitorSmartphone size={20} className="mt-1 shrink-0 text-primary group-hover:text-gold transition-colors" />}
                                        <div>
                                            <div className="font-semibold">{q.label}</div>
                                            <div className={`text-xs mt-0.5 ${q.highlight ? "text-primary/70 group-hover:text-primary-foreground/80" : "text-muted-foreground"}`}>{q.desc}</div>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className={`${q.highlight ? "text-primary group-hover:text-gold" : "text-muted-foreground group-hover:text-primary"} transition-colors shrink-0`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Portal Features */}
            <section className="bg-secondary/60 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle eyebrow="Portal Features" title="Everything in one place" center />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="bg-card rounded-2xl p-7 border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <Icon />
                                </div>
                                <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Help Banner */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="rounded-3xl bg-primary text-primary-foreground p-10 sm:p-14 text-center">
                    <p className="text-gold uppercase tracking-[0.25em] text-xs font-bold mb-3">Need Help?</p>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl">
                        <span className="gold-underline">IT Support & Portal Assistance</span>
                    </h2>
                    <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">Having trouble logging in? Contact our IT helpdesk for immediate assistance.</p>
                    <a href="mailto:info@novainternationalschool.et" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-8 py-3.5 font-semibold">
                        Contact IT Support
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
