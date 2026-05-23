import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.novainternationalschool.et";

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
      <input {...props} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}

// Map display names to the backend field names expected by multer
const docFields: { label: string; fieldName: string }[] = [
  { label: "Birth Certificate", fieldName: "birthCertificate" },
  { label: "Report Cards", fieldName: "reportCards" },
  { label: "ID Documents", fieldName: "idDocuments" },
];

function Register() {
  const [sending, setSending] = useState(false);
  const [program, setProgram] = useState("");
  const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({});
  const fileRefs = useRef<{ [key: string]: File | null }>({});

  const allFilesUploaded = docFields.every(d => fileStatus[d.fieldName]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!allFilesUploaded) {
      toast.error("Please upload all required documents before submitting.");
      return;
    }
    setSending(true);

    const form = e.target as HTMLFormElement;

    // Build FormData with both text fields and files
    const formData = new FormData();
    formData.append("parentName", (form.elements.namedItem("parentName") as HTMLInputElement).value);
    formData.append("parentPhone", (form.elements.namedItem("parentPhone") as HTMLInputElement).value);
    formData.append("parentEmail", (form.elements.namedItem("parentEmail") as HTMLInputElement).value);
    formData.append("occupation", (form.elements.namedItem("occupation") as HTMLInputElement).value);
    formData.append("studentName", (form.elements.namedItem("studentName") as HTMLInputElement).value);
    formData.append("dob", (form.elements.namedItem("dob") as HTMLInputElement).value);
    formData.append("grade", (form.elements.namedItem("grade") as HTMLInputElement)?.value || "");
    formData.append("prevSchool", (form.elements.namedItem("prevSchool") as HTMLInputElement).value);
    formData.append("medical", (form.elements.namedItem("medical") as HTMLTextAreaElement).value);
    formData.append("needs", (form.elements.namedItem("needs") as HTMLTextAreaElement).value);

    // Append actual files
    for (const doc of docFields) {
      const file = fileRefs.current[doc.fieldName];
      if (file) {
        formData.append(doc.fieldName, file);
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        body: formData, // No Content-Type header — browser sets it with boundary
      });

      const json = await res.json();

      setSending(false);
      if (res.ok) {
        form.reset();
        setProgram("");
        setFileStatus({});
        fileRefs.current = {};
        toast.success("Application submitted! Our admissions team will be in touch.");
      } else {
        toast.error(json.error || "Failed to submit application. Please try again.");
      }
    } catch {
      setSending(false);
      toast.error("Network error. Please try again later.");
    }
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
              <Field label="Parent Full Name" required name="parentName" />
              <Field label="Occupation" name="occupation" />
              <Field label="Phone Number" type="tel" required name="parentPhone" />
              <Field label="Email Address" type="email" required name="parentEmail" />
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Student Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Student Name" required name="studentName" />
              <Field label="Date of Birth (DD/MMM/YYYY)" type="text" placeholder="e.g. 15/Sep/2018" required name="dob" />
              <label className="block">
                <span className="text-xs font-semibold">Program Applying For</span>
                <select required name="program" value={program} onChange={(e) => setProgram(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm">
                  <option value="">Select program...</option>
                  <option value="ec">Early Childhood</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                </select>
              </label>

              {program && (
                <label className="block">
                  <span className="text-xs font-semibold">Specific Grade Level</span>
                  <select required name="grade" className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm">
                    <option value="">Select specific grade...</option>
                    {program === "ec" && (
                      <>
                        <option>Pre-KG</option>
                        <option>Lower KG</option>
                        <option>Upper KG</option>
                      </>
                    )}
                    {program === "primary" && (
                      <>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n}>Grade {n}</option>)}
                      </>
                    )}
                    {program === "secondary" && (
                      <>
                        {[9, 10, 11, 12].map(n => <option key={n}>Grade {n}</option>)}
                      </>
                    )}
                  </select>
                </label>
              )}
              <Field label="Previous School" name="prevSchool" />
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Additional Information</h3>
            <div className="grid gap-4">
              <label className="block">
                <span className="text-xs font-semibold">Medical Conditions</span>
                <textarea name="medical" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold">Special Learning Needs</span>
                <textarea name="needs" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-4">Upload Documents <span className="text-destructive">*</span></h3>
            <p className="text-xs text-muted-foreground mb-4">Accepted formats: PDF, JPG, PNG, DOC (max 10MB each)</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {docFields.map((doc) => (
                <label key={doc.fieldName} className={`cursor-pointer rounded-xl border-2 border-dashed p-5 text-center text-sm flex flex-col items-center gap-2 transition ${fileStatus[doc.fieldName] ? "bg-green-50/50 border-green-500 text-green-700" : "border-border hover:border-gold text-foreground"}`}>
                  <Upload className={fileStatus[doc.fieldName] ? "text-green-600" : "text-primary"} />
                  <span className="font-medium">{doc.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {fileStatus[doc.fieldName] || "Click to upload"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        fileRefs.current[doc.fieldName] = file;
                        setFileStatus(prev => ({ ...prev, [doc.fieldName]: `✓ ${file.name}` }));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
            {!allFilesUploaded && (
              <p className="mt-4 text-xs text-destructive font-medium">Note: You must upload all 3 documents to enable the submit button.</p>
            )}
          </div>

          <button
            disabled={sending || !allFilesUploaded}
            className={`w-full sm:w-auto inline-flex items-center justify-center rounded-full px-10 py-4 font-semibold transition ${(!allFilesUploaded || sending) ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-gold text-gold-foreground hover:brightness-95"}`}
          >
            {sending ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
