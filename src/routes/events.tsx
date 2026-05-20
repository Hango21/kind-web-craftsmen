import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Calendar, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
    head: () => ({
        meta: [
            { title: "Events Calendar — NOVA International School" },
            { name: "description", content: "Upcoming events, open days, parent sessions and academic calendar at NOVA International School." },
        ],
    }),
    component: Events,
});

const upcoming = [
    { title: "Parent-Investor Information Session", date: "June 15, 2026", time: "10:00 AM – 12:00 PM", location: "NOVA Main Hall", category: "Open Day", description: "Learn about NOVA's unique parent-investor governance model and how you can be part of our school's development." },
    { title: "Campus Open Day & Guided Tours", date: "July 5, 2026", time: "9:00 AM – 1:00 PM", location: "NOVA Campus", category: "Open Day", description: "Explore our modern campus, meet the leadership team, and see our smart classrooms and facilities firsthand." },
    { title: "Teacher Recruitment Fair", date: "July 20, 2026", time: "9:00 AM – 4:00 PM", location: "NOVA Campus", category: "Recruitment", description: "Meet our academic leadership team. Interviews and demonstrations for prospective teaching staff." },
    { title: "Curriculum & Standards Workshop", date: "August 8, 2026", time: "2:00 PM – 5:00 PM", location: "NOVA Auditorium", category: "Workshop", description: "An interactive workshop for parents on the Pearson curriculum, assessments, grading standards, and student expectations." },
    { title: "Orientation Week Begins", date: "September 1, 2026", time: "8:00 AM", location: "NOVA Campus", category: "Academic", description: "Welcome week for all enrolled students and families. Campus tours, class assignments, and introductions." },
    { title: "Official School Opening Ceremony", date: "September 7, 2026", time: "9:00 AM – 12:00 PM", location: "NOVA Main Hall", category: "Ceremony", description: "The grand opening of NOVA International School. Join us for speeches, performances, and celebrations." },
];

const months = ["June 2026", "July 2026", "August 2026", "September 2026"];

const categoryColors: Record<string, string> = {
    "Open Day": "bg-gold text-gold-foreground",
    "Recruitment": "bg-primary text-primary-foreground",
    "Workshop": "bg-accent text-accent-foreground",
    "Academic": "bg-primary/10 text-primary",
    "Ceremony": "bg-gold/20 text-gold-foreground",
};

function Events() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="Events Calendar"
                title="Upcoming events & key dates"
                subtitle="Stay connected with important dates, open days, workshops, and academic milestones at NOVA."
            />

            {/* Month Filter */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
                <div className="flex flex-wrap gap-2">
                    <button className="rounded-full px-5 py-2 text-sm font-medium bg-primary text-primary-foreground border border-primary">All Events</button>
                    {months.map((m) => (
                        <button key={m} className="rounded-full px-5 py-2 text-sm font-medium border border-border hover:border-primary hover:text-primary bg-card transition-colors">
                            {m}
                        </button>
                    ))}
                </div>
            </section>

            {/* Events Timeline */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-6">
                    {upcoming.map((ev) => (
                        <div key={ev.title} className="bg-card rounded-2xl border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                            <div className="lg:w-32 shrink-0 text-center">
                                <div className="text-3xl font-display font-bold text-primary">{ev.date.split(" ")[1]?.replace(",", "")}</div>
                                <div className="text-sm text-muted-foreground font-medium">{ev.date.split(" ")[0]} {ev.date.split(" ")[2]}</div>
                            </div>
                            <div className="flex-1">
                                <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider mb-2 ${categoryColors[ev.category] || "bg-muted text-foreground"}`}>
                                    {ev.category}
                                </span>
                                <h3 className="font-display font-bold text-xl text-foreground">{ev.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ev.description}</p>
                                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Clock size={13} /> {ev.time}</span>
                                    <span className="flex items-center gap-1"><MapPin size={13} /> {ev.location}</span>
                                </div>
                            </div>
                            <button className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2.5 text-sm font-semibold transition-colors shrink-0">
                                RSVP
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Academic Calendar */}
            <section className="bg-secondary/60 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle eyebrow="Academic Calendar" title="2026–2027 key dates" center />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { term: "Term 1", dates: "Sept 7 – Dec 18, 2026", weeks: "15 weeks" },
                            { term: "Term 2", dates: "Jan 11 – Mar 26, 2027", weeks: "11 weeks" },
                            { term: "Term 3", dates: "Apr 12 – Jun 25, 2027", weeks: "11 weeks" },
                            { term: "Summer Break", dates: "Jun 26 – Aug 31, 2027", weeks: "9 weeks" },
                        ].map((t) => (
                            <div key={t.term} className="bg-card rounded-2xl border border-border p-6 text-center">
                                <Calendar className="text-gold mx-auto mb-3" />
                                <div className="font-display font-bold text-lg text-primary">{t.term}</div>
                                <div className="text-sm text-foreground mt-2">{t.dates}</div>
                                <div className="text-xs text-muted-foreground mt-1">{t.weeks}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
