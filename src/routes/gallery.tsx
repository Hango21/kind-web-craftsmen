import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { useState } from "react";
import { Camera, Play } from "lucide-react";

export const Route = createFileRoute("/gallery")({
    head: () => ({
        meta: [
            { title: "Gallery — NOVA International School" },
            { name: "description", content: "Explore photos and videos of NOVA International School's campus, facilities, and community life." },
        ],
    }),
    component: Gallery,
});

import campus from "@/assets/campus.jpg";
import collab from "@/assets/students-collab.jpg";
import heroImg from "@/assets/hero-student.jpg";
import ec from "@/assets/early-childhood.jpg";
import primary from "@/assets/primary.jpg";
import secondary from "@/assets/secondary.jpg";

const albums = [
    { title: "Campus & Facilities", category: "Campus" },
    { title: "Student Life", category: "Students" },
    { title: "Academic Programs", category: "Academic" },
    { title: "Events & Activities", category: "Events" },
];

const photos = [
    { src: campus, title: "NOVA Campus Aerial View", category: "Campus" },
    { src: collab, title: "Students Collaborating", category: "Students" },
    { src: heroImg, title: "Student Portrait", category: "Students" },
    { src: ec, title: "Early Childhood Learning", category: "Academic" },
    { src: primary, title: "Primary School Activities", category: "Academic" },
    { src: secondary, title: "Secondary School Lab", category: "Academic" },
    { src: campus, title: "School Grounds", category: "Campus" },
    { src: collab, title: "Group Project Work", category: "Students" },
    { src: heroImg, title: "Learning in Action", category: "Academic" },
];

const videos = [
    { title: "Welcome to NOVA International School", duration: "3:45", thumbnail: campus },
    { title: "A Day in the Life at NOVA", duration: "5:12", thumbnail: collab },
    { title: "Campus Tour 2026", duration: "4:30", thumbnail: heroImg },
];

const categories = ["All", "Campus", "Students", "Academic", "Events"];

function Gallery() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightbox, setLightbox] = useState<number | null>(null);

    const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-background">
            <PageHero
                eyebrow="Gallery"
                title="Life at NOVA in pictures"
                subtitle="Explore our campus, classrooms, student activities, and community events through photos and videos."
            />

            {/* Albums Overview */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle eyebrow="Photo Albums" title="Browse by category" center />
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {albums.map((a) => (
                        <button
                            key={a.title}
                            onClick={() => setActiveCategory(a.category)}
                            className={`rounded-2xl border p-6 text-center transition-all ${activeCategory === a.category ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]" : "border-border bg-card hover:border-primary"}`}
                        >
                            <Camera className={`mx-auto mb-3 ${activeCategory === a.category ? "text-primary" : "text-gold"}`} />
                            <div className="font-display font-semibold text-foreground">{a.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{photos.filter((p) => p.category === a.category).length} photos</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Category Filter */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            className={`rounded-full px-5 py-2 text-sm font-medium border transition-colors ${activeCategory === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary hover:text-primary bg-card"}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            {/* Photo Grid */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((p, i) => (
                        <button
                            key={`${p.title}-${i}`}
                            onClick={() => setLightbox(i)}
                            className="group rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow relative aspect-[4/3]"
                        >
                            <img src={p.src} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                                <div className="text-white text-sm font-semibold">{p.title}</div>
                                <div className="text-white/70 text-xs">{p.category}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button className="absolute top-6 right-6 text-white text-3xl font-light hover:text-gold transition-colors">&times;</button>
                    <img
                        src={filtered[lightbox]?.src}
                        alt={filtered[lightbox]?.title}
                        className="max-w-full max-h-[85vh] rounded-2xl object-contain"
                    />
                    <div className="absolute bottom-8 text-white text-center">
                        <div className="font-display font-semibold text-lg">{filtered[lightbox]?.title}</div>
                    </div>
                </div>
            )}

            {/* Videos Section */}
            <section className="bg-secondary/60 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle eyebrow="Video Gallery" title="Watch NOVA in action" center />
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        {videos.map((v) => (
                            <div key={v.title} className="bg-card rounded-2xl border border-border overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow group cursor-pointer">
                                <div className="relative aspect-video overflow-hidden">
                                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                                        <div className="h-14 w-14 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                            <Play size={24} className="ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{v.duration}</div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
