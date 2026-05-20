import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fieldsToDefaults } from "@/content/schema";

export function usePageContent(slug: string) {
  const defaults = fieldsToDefaults(slug);

  const query = useQuery({
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
    staleTime: 60_000,
  });

  const merged: Record<string, string> = { ...defaults, ...(query.data ?? {}) };
  const t = (key: string, fallback?: string) => merged[key] ?? fallback ?? "";

  return { t, data: merged, isLoading: query.isLoading, refetch: query.refetch };
}
