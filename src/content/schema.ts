export type FieldType = "text" | "textarea";
export type FieldDef = { key: string; label: string; type: FieldType; default: string };
export type PageDef = { slug: string; title: string; fields: FieldDef[] };

export const PAGES: PageDef[] = [
  {
    slug: "home",
    title: "Home",
    fields: [
      { key: "hero_eyebrow", label: "Hero eyebrow", type: "text", default: "Welcome to" },
      { key: "hero_title_main", label: "Hero title (main)", type: "text", default: "NOVA" },
      { key: "hero_title_accent", label: "Hero title (accent)", type: "text", default: "International School" },
      { key: "hero_paragraph", label: "Hero paragraph", type: "textarea", default: "A future-ready international school launching September 2026 in Addis Ababa. Globally recognized Pearson curriculum delivered with strong values, discipline, and character development." },
      { key: "promise_title", label: "Promise title", type: "text", default: "Producing Global Leaders" },
      { key: "promise_body", label: "Promise paragraph", type: "textarea", default: "Welcome to NOVA International School — a new international learning community in Addis Ababa rooted in Ethiopian values with a global outlook. We deliver the Pearson Edexcel curriculum to prepare students for the world's leading universities and meaningful, ethical leadership." },
      { key: "cta_title", label: "CTA title", type: "text", default: "Join the NOVA family" },
      { key: "cta_body", label: "CTA body", type: "textarea", default: "Secure a place for your child at one of Addis Ababa's most ambitious new international schools." },
    ],
  },
  {
    slug: "about",
    title: "About",
    fields: [
      { key: "hero_title", label: "Hero title", type: "text", default: "A new chapter for international education in Ethiopia" },
      { key: "hero_subtitle", label: "Hero subtitle", type: "textarea", default: "NOVA International School was founded by visionary parents to deliver globally competitive education rooted in strong values, discipline, and character development." },
      { key: "chairman_message", label: "Chairman message", type: "textarea", default: "It is with great pride and a deep sense of responsibility that I welcome you to NOVA International School — a new and ambitious educational institution founded with a clear vision: to provide world-class international education in Ethiopia while nurturing disciplined, ethical, and future-ready young leaders." },
      { key: "chairman_name", label: "Chairman name", type: "text", default: "Ato Tadesse Ayanew" },
      { key: "vision", label: "Vision statement", type: "textarea", default: "To become one of Ethiopia's most trusted and future-ready international schools, producing globally competent, ethically grounded, and academically excellent graduates prepared for higher education and leadership worldwide." },
      { key: "story", label: "Our story", type: "textarea", default: "NOVA International School emerged from a shared parental vision to create a world-class educational institution that addresses the growing demand for globally recognized education in Ethiopia. Our parent-investor model creates stronger accountability, transparency, and long-term educational commitment." },
    ],
  },
  {
    slug: "admissions",
    title: "Admissions",
    fields: [
      { key: "hero_title", label: "Hero title", type: "text", default: "Welcoming families for September 2026" },
      { key: "hero_subtitle", label: "Hero subtitle", type: "textarea", default: "We welcome applications from families seeking high-quality international education with strong values and discipline." },
      { key: "fee_label", label: "Fee label", type: "text", default: "Birr 300,000 / year" },
      { key: "fee_note", label: "Fee note", type: "textarea", default: "Transparent tuition structure. Detailed fee breakdown shared during enrollment." },
    ],
  },
  {
    slug: "practical-information",
    title: "Practical Information",
    fields: [
      { key: "hero_title", label: "Hero title", type: "text", default: "Everything families need to know" },
      { key: "hero_subtitle", label: "Hero subtitle", type: "textarea", default: "Location, schedules, safety, and the day-to-day life that supports learning at NOVA." },
      { key: "address", label: "Address", type: "text", default: "Lemikura Sub-City, Salite Mihiret Area, Addis Ababa, Ethiopia" },
      { key: "hours_ec", label: "Early Childhood hours", type: "text", default: "8:00 AM – 2:00 PM" },
      { key: "hours_primary", label: "Primary School hours", type: "text", default: "8:00 AM – 3:00 PM" },
      { key: "hours_secondary", label: "Secondary School hours", type: "text", default: "8:00 AM – 3:00 PM" },
    ],
  },
  {
    slug: "careers",
    title: "Careers",
    fields: [
      { key: "hero_title", label: "Hero title", type: "text", default: "Join a school built by visionary educators" },
      { key: "hero_subtitle", label: "Hero subtitle", type: "textarea", default: "NOVA seeks passionate, qualified, and innovative educators and professionals committed to academic excellence and holistic student development." },
      { key: "careers_email", label: "Careers email", type: "text", default: "careers@novaschool.et" },
      { key: "careers_invite", label: "Application invite", type: "textarea", default: "Submit your CV, Cover Letter, Academic Credentials and References to our careers team." },
    ],
  },
];

export const PAGE_BY_SLUG: Record<string, PageDef> = Object.fromEntries(PAGES.map((p) => [p.slug, p]));

export function fieldsToDefaults(slug: string): Record<string, string> {
  const def = PAGE_BY_SLUG[slug];
  if (!def) return {};
  return Object.fromEntries(def.fields.map((f) => [f.key, f.default]));
}
