import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NOVA International School" },
      { name: "description", content: "Get in touch with NOVA International School. Address, phone, email and admissions contact form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = await apiPost("/api/contact", payload);

    setSending(false);
    if (result.ok) {
      form.reset();
      toast.success("Message sent! Your inquiry has been forwarded to info@novainternationalschool.et. We will respond shortly.");
    } else {
      toast.error(result.error || "Failed to send message. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Reach our admissions team for tours, enquiries, and partnership opportunities."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionTitle eyebrow="Contact Information" title="Get in touch" />
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><MapPin /></div>
              <div><div className="font-semibold">Address</div><div className="text-sm text-muted-foreground">Lemikura Sub-City, Salite Mihiret Area, Addis Ababa, Ethiopia</div></div>
            </li>
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Phone /></div>
              <div><div className="font-semibold">Phone</div><div className="text-sm text-muted-foreground">+251 981 888222 / 0981 888333</div></div>
            </li>
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Mail /></div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-muted-foreground">info@novainternationalschool.et</div>
                <div className="text-sm text-muted-foreground">admission@novainternationalschool.et</div>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="bg-card rounded-3xl border border-border p-8 shadow-[var(--shadow-soft)] space-y-4">
          <h3 className="font-display font-bold text-xl text-primary">Send us a message</h3>
          {[
            { name: "name", label: "Full Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone Number", type: "tel" },
            { name: "subject", label: "Subject", type: "text" },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-xs font-semibold text-foreground">{f.label}</label>
              <input required name={f.name} type={f.type} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-foreground">Message</label>
            <textarea required name="message" rows={4} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <button disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:bg-primary-deep transition">
            {sending ? "Sending…" : (<>Send Message <Send size={16} /></>)}
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <SectionTitle eyebrow="Our Location" title="Find us on the map" center />
        <div className="mt-10 rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)] aspect-[16/7]">
          <iframe
            title="NOVA School Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=38.7%2C8.95%2C38.85%2C9.05&layer=mapnik"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
