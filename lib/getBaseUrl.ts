import { headers } from "next/headers";

/** Best-effort absolute site origin, for building shareable links server-side. */
export async function getBaseUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    if (host) return `${protocol}://${host}`;
  } catch {
    // headers() unavailable (e.g. outside a request context)
  }
  return "https://primetimebiolabs.com";
}
