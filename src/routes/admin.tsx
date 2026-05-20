import { createFileRoute, Link, useNavigate, useServerFn } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PAGES, PAGE_BY_SLUG, fieldsToDefaults } from "@/content/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { claimAdminIfNone } from "@/lib/admin.functions";
import { LogOut, Save, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — NOVA International School" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [activeSlug, setActiveSlug] = useState<string>(PAGES[0].slug);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return <NeedsAdmin email={user.email ?? ""} />;
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="font-display font-bold flex items-center gap-2">
            <ShieldCheck size={20} className="text-gold" /> NOVA Admin
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline opacity-80">{user.email}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/login" });
              }}
            >
              <LogOut size={14} /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Pages</p>
          {PAGES.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                activeSlug === p.slug
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-card text-foreground"
              }`}
            >
              {p.title}
            </button>
          ))}
        </aside>

        <main>
          <PageEditor slug={activeSlug} />
        </main>
      </div>
    </div>
  );
}

function NeedsAdmin({ email }: { email: string }) {
  const navigate = useNavigate();
  const claim = useServerFn(claimAdminIfNone);
  const [busy, setBusy] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/40 px-4">
      <div className="max-w-md bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
        <ShieldCheck className="mx-auto text-primary mb-3" />
        <h2 className="font-display text-xl font-bold">Admin access required</h2>
        <p className="text-sm text-muted-foreground mt-2">
          You're signed in as <strong>{email}</strong>, but this account is not an administrator.
        </p>
        <p className="text-sm text-muted-foreground mt-3">
          If you're the first administrator, claim admin access below.
        </p>
        <Button
          className="mt-5 w-full"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const res = await claim();
              if (res.claimed) {
                toast.success("Admin access granted");
                window.location.reload();
              } else {
                toast.error(res.reason ?? "Cannot claim admin");
              }
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Failed");
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Working…" : "Claim admin access"}
        </Button>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/login" });
          }}
          className="mt-3 text-sm text-muted-foreground hover:text-primary"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function PageEditor({ slug }: { slug: string }) {
  const def = PAGE_BY_SLUG[slug];
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["page_content", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_contents")
        .select("data")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data?.data ?? {}) as Record<string, string>;
    },
  });

  const defaults = useMemo(() => fieldsToDefaults(slug), [slug]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValues({ ...defaults, ...(data ?? {}) });
  }, [data, defaults]);

  const onSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("page_contents")
        .upsert({ slug, data: values }, { onConflict: "slug" });
      if (error) throw error;
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["page_content", slug] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => setValues({ ...defaults });

  if (!def) return <p>Unknown page.</p>;
  if (isLoading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl font-bold">{def.title}</h2>
          <p className="text-sm text-muted-foreground">Edit content for the <code className="text-xs">/{def.slug === "home" ? "" : def.slug}</code> page.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} type="button">Reset to defaults</Button>
          <Button onClick={onSave} disabled={saving}>
            <Save size={14} /> {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {def.fields.map((f) => (
          <div key={f.key}>
            <Label htmlFor={f.key}>{f.label}</Label>
            {f.type === "textarea" ? (
              <Textarea
                id={f.key}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                rows={4}
              />
            ) : (
              <Input
                id={f.key}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
