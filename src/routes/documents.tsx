import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { FileText, Download, Clock } from "lucide-react";

export const Route = createFileRoute("/documents")({
    head: () => ({
        meta: [
            { title: "Document Repository — NOVA International School" },
            { name: "description", content: "Download school policies, forms, handbooks, and official documents from NOVA International School." },
        ],
    }),
    component: Documents,
});

const docs = [
    { title: "Parent-Student Handbook 2026-2027", category: "Handbooks", size: "2.4 MB" },
    { title: "School Uniform Guide", category: "Guidelines", size: "1.1 MB" },
    { title: "Admissions Policy & Guidelines", category: "Policies", size: "0.8 MB" },
    { title: "Academic Honesty Policy", category: "Policies", size: "0.5 MB" },
    { title: "Child Protection & Safeguarding Policy", category: "Policies", size: "1.2 MB" },
    { title: "Medical Information & Consent Form", category: "Forms", size: "0.3 MB" },
    { title: "School Bus Transport Route Map", category: "Transport", size: "3.5 MB" },
    { title: "Tuition & Fee Policy 2026", category: "Finance", size: "0.6 MB" },
];

function Documents() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="Document Repository"
                title="Official policies & forms"
                subtitle="Access and download important school documents, handbooks, and guidelines."
            />

            <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle eyebrow="Downloads" title="Available Documents" />

                <div className="mt-8 bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="divide-y divide-border">
                        {docs.map((d) => (
                            <div key={d.title} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{d.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                            <span className="font-medium text-primary">{d.category}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> Updated recently</span>
                                            <span>PDF • {d.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="sm:shrink-0 inline-flex items-center gap-2 rounded-full border border-border bg-background hover:border-primary hover:text-primary px-5 py-2 text-sm font-semibold transition-colors">
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
