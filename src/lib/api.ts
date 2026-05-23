// Central API configuration
// In production, this points to your cPanel backend subdomain.
// In development, it points to localhost.
const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://api.novainternationalschool.et";

export async function apiPost<T = unknown>(
    endpoint: string,
    data: Record<string, unknown>
): Promise<{ ok: boolean; data?: T; error?: string }> {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) {
            return { ok: false, error: json.error || "Something went wrong" };
        }

        return { ok: true, data: json };
    } catch {
        return { ok: false, error: "Network error. Please try again later." };
    }
}

export async function apiGet<T = unknown>(
    endpoint: string
): Promise<{ ok: boolean; data?: T; error?: string }> {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`);
        const json = await res.json();

        if (!res.ok) {
            return { ok: false, error: json.error || "Something went wrong" };
        }

        return { ok: true, data: json };
    } catch {
        return { ok: false, error: "Network error. Please try again later." };
    }
}
