import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — NOVA International School" },
      { name: "description", content: "Begin your child's enrollment at NOVA International School. Complete the registration form for September 2026 admission." },
    ],
  }),
  component: Register,
});

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"/>
    </label>
  );
}

function Register() {
  const [sending, setSending] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Application submitted! Our admissions team will be in touch.");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Register Here"
        title="Student Registration Form"
        subtitle="Please complete the form below to begin your child's enrollment journey at NOVA International School."
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <form onSubmit={onSubmit} className="bg-card rounded-3xl border border-border p-8 sm:p-10 shadow-[var(--shadow-soft)] space-y-10">
          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Parent Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Parent Full Name" required name="parentName"/>
              <Field label="Occupation" name="occupation"/>
              <Field label="Phone Number" type="tel" required name="parentPhone"/>
              <Field label="Email Address" type="email" required name="parentEmail"/>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Student Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Student Name" required name="studentName"/>
              <Field label="Date of Birth" type="date" required name="dob"/>
              <label className="block">
                <span className="text-xs font-semibold">Grade Applying For</span>
                <select required name="grade" className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm">
                  <option value="">Select grade</option>
                  <option>Early Childhood</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                </select>
              </label>
              <Field label="Previous School" name="prevSchool"/>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Additional Information</h3>
            <div className="grid gap-4">
              <label className="block">
                <span className="text-xs font-semibold">Medical Conditions</span>
                <textarea name="medical" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"/>
              </label>
              <label className="block">
                <span className="text-xs font-semibold">Special Learning Needs</span>
                <textarea name="needs" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"/>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Upload Documents</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {["Birth Certificate","Report Cards","ID Documents"].map((d) => (
                <label key={d} className="cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-gold p-5 text-center text-sm flex flex-col items-center gap-2 transition">
                  <Upload className="text-primary"/>
                  <span className="font-medium">{d}</span>
                  <span className="text-xs text-muted-foreground">Click to upload</span>
                  <input type="file" className="hidden"/>
                </label>
              ))}
            </div>
          </div>

          <button disabled={sending} className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gold text-gold-foreground px-10 py-4 font-semibold hover:brightness-95 transition">
            {sending ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
