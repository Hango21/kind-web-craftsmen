import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, CalendarDays, FileText, LayoutDashboard, LogOut, MessageSquare, Settings, User } from "lucide-react";
import logo from "@/assets/nova-logo.jpg";

export const Route = createFileRoute("/dashboard")({
    head: () => ({ meta: [{ title: "Dashboard — NOVA Portal" }] }),
    component: Dashboard,
});

function Dashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [role, setRole] = useState<"parent" | "student">("parent"); // For mockup switching

    // Mock Data
    const student = { name: "Eyob", grade: "Grade 8" };

    return (
        <div className="min-h-screen bg-secondary/30 flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-primary text-primary-foreground flex flex-col shadow-2xl">
                <div className="p-6 flex items-center gap-3 border-b border-primary-foreground/10">
                    <img src={logo} alt="NOVA" className="h-10 w-10" />
                    <span className="font-display font-bold text-xl tracking-widest text-gold">NOVA</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "overview" ? "bg-gold text-primary-deep font-semibold" : "hover:bg-primary-foreground/10"}`}>
                        <LayoutDashboard size={18} /> Overview
                    </button>
                    <button onClick={() => setActiveTab("grades")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "grades" ? "bg-gold text-primary-deep font-semibold" : "hover:bg-primary-foreground/10"}`}>
                        <BookOpen size={18} /> {role === "parent" ? "Report Cards" : "My Grades"}
                    </button>
                    <button onClick={() => setActiveTab("comments")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "comments" ? "bg-gold text-primary-deep font-semibold" : "hover:bg-primary-foreground/10"}`}>
                        <MessageSquare size={18} /> Teacher Comments
                    </button>
                    {role === "parent" && (
                        <button onClick={() => setActiveTab("fees")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "fees" ? "bg-gold text-primary-deep font-semibold" : "hover:bg-primary-foreground/10"}`}>
                            <FileText size={18} /> Fee Payments
                        </button>
                    )}
                    <button onClick={() => setActiveTab("calendar")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "calendar" ? "bg-gold text-primary-deep font-semibold" : "hover:bg-primary-foreground/10"}`}>
                        <CalendarDays size={18} /> Schedule & Events
                    </button>
                </nav>

                <div className="p-4 border-t border-primary-foreground/10">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors text-primary-foreground/80">
                        <LogOut size={18} /> Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
                {/* Top Header */}
                <header className="bg-background border-b border-border p-4 sm:p-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">
                            {role === "parent" ? "Parent Information Dashboard" : "Student Learning Dashboard"}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">Viewing records for {student.name} ({student.grade})</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-sm bg-secondary p-1 rounded-xl border border-border">
                            <button onClick={() => setRole("parent")} className={`px-4 py-1.5 rounded-lg font-semibold transition ${role === "parent" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}>View as Parent</button>
                            <button onClick={() => setRole("student")} className={`px-4 py-1.5 rounded-lg font-semibold transition ${role === "student" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}>View as Student</button>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={20} />
                        </div>
                    </div>
                </header>

                {/* Dynamic Inner Content */}
                <div className="p-4 sm:p-8">

                    {/* TAB: OVERVIEW */}
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-soft)]">
                                    <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-2">Current GPA</div>
                                    <div className="text-4xl font-display font-bold text-primary">3.8</div>
                                    <div className="text-sm text-green-600 mt-2 font-medium">↑ +0.2 from last term</div>
                                </div>
                                <div className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-soft)]">
                                    <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-2">Attendance</div>
                                    <div className="text-4xl font-display font-bold text-primary">98%</div>
                                    <div className="text-sm text-muted-foreground mt-2">2 absences total</div>
                                </div>
                                {role === "parent" && (
                                    <div className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-soft)]">
                                        <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-2">Next Payment</div>
                                        <div className="text-4xl font-display font-bold text-primary">Birr 0</div>
                                        <div className="text-sm text-green-600 mt-2 font-medium">Term 2 fully paid</div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-[var(--shadow-soft)]">
                                <h3 className="font-semibold text-lg border-b border-border pb-4 mb-4">Latest Teacher Comments</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-secondary/50 rounded-xl border border-primary/10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold">Mathematics — Mr. Abebe</div>
                                            <span className="text-xs text-muted-foreground">Today</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Eyob has shown remarkable improvement in Geometry this week. His active participation in group work is highly appreciated.</p>
                                    </div>
                                    <div className="p-4 bg-secondary/50 rounded-xl border border-primary/10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold">English Lit — Ms. Sarah</div>
                                            <span className="text-xs text-muted-foreground">2 days ago</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">A great analytical essay submitted for the mid-term project. Keep up the reading habit!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: GRADES */}
                    {activeTab === "grades" && (
                        <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-soft)] overflow-hidden">
                            <div className="p-6 border-b border-border flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Term 1 Report Card</h3>
                                {role === "parent" && <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold hover:bg-primary-deep transition">Download PDF</button>}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-secondary/50">
                                        <tr>
                                            <th className="p-4 font-semibold text-muted-foreground">Subject</th>
                                            <th className="p-4 font-semibold text-muted-foreground">Grade</th>
                                            <th className="p-4 font-semibold text-muted-foreground">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {[
                                            { s: "Mathematics", g: "A", r: "Excellent problem solving." },
                                            { s: "Science (Physics)", g: "A-", r: "Great lab participation." },
                                            { s: "English Literature", g: "B+", r: "Solid writing skills." },
                                            { s: "History", g: "A", r: "Outstanding project presentation." },
                                        ].map(row => (
                                            <tr key={row.s} className="hover:bg-secondary/20 transition-colors">
                                                <td className="p-4 font-medium">{row.s}</td>
                                                <td className="p-4 text-primary font-bold">{row.g}</td>
                                                <td className="p-4 text-muted-foreground">{row.r}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PLACEHOLDER TABS */}
                    {["comments", "fees", "calendar"].includes(activeTab) && (
                        <div className="bg-card rounded-2xl p-12 border border-border flex flex-col items-center justify-center text-center shadow-[var(--shadow-soft)]">
                            <div className="h-16 w-16 mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                {activeTab === "comments" ? <MessageSquare size={32} /> : activeTab === "fees" ? <FileText size={32} /> : <CalendarDays size={32} />}
                            </div>
                            <h2 className="text-xl font-display font-semibold mb-2 text-foreground capitalize">{activeTab} Details</h2>
                            <p className="text-muted-foreground max-w-md">Detailed information for this section is managed directly within the backend portal. When live, this tab connects directly to the school database.</p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
