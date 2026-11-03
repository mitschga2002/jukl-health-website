import { createServerFn } from "@tanstack/react-start";

/** What the app's catalog API returns; the shape is documented in the SaaS
 *  repo under docs/public-catalog-api.md. Only the fields the page uses. */
export type AcademyCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  duration: string;
  chapters: number;
  experts: { name: string; occupation: string; imageUrl: string | null }[];
  coverImageUrl: string | null;
  coverImagePosition: string | null;
  price: string | null;
  url: string;
  startUrl: string;
};

export type AcademyBundle = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImageUrl: string | null;
  priceCents: number;
  regularPriceCents: number;
  savingsPercent: number;
  courseCount: number;
  lessonCount: number;
  totalMinutes: number;
  courses: { slug: string; title: string }[];
  url: string;
  startUrl: string;
};

export type AcademyCatalog = {
  organization: { name: string; intro: string | null; url: string };
  courses: AcademyCourse[];
  bundles: AcademyBundle[];
};

export type AcademyCatalogResult =
  | { ok: true; catalog: AcademyCatalog }
  /** `unconfigured`: no key in the environment; `unavailable`: the app did not answer. */
  | { ok: false; reason: "unconfigured" | "unavailable" };

const CACHE_MS = 5 * 60_000;

/* One copy per worker isolate: the app allows 120 calls a minute per key, and
   a busy page must not spend them on every visitor. Plain state, never set at
   module load, so the Workers runtime has nothing to object to. */
let cached: { at: number; result: AcademyCatalogResult } | null = null;

async function fetchCatalog(): Promise<AcademyCatalogResult> {
  const appUrl = (process.env.JUKL_APP_URL || "https://app.juklhealth.com").replace(/\/$/, "");
  const orgSlug = process.env.JUKL_ORG_SLUG || "jukl-health";
  const apiKey = process.env.JUKL_CATALOG_API_KEY;
  if (!apiKey) return { ok: false, reason: "unconfigured" };

  try {
    const response = await fetch(`${appUrl}/api/public/catalog/${orgSlug}`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
    });
    if (!response.ok) {
      console.error(`[academy] catalog answered ${response.status}`);
      return { ok: false, reason: "unavailable" };
    }
    const catalog = (await response.json()) as AcademyCatalog;
    return { ok: true, catalog };
  } catch (err) {
    console.error("[academy] catalog fetch failed", err);
    return { ok: false, reason: "unavailable" };
  }
}

/** The organisation's public course catalog, fetched server-side with the
 *  website's key and kept for five minutes. A failure keeps the last good
 *  copy, so a hiccup in the app does not empty the page. */
export const getAcademyCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<AcademyCatalogResult> => {
    const now = Date.now();
    if (cached && now - cached.at < CACHE_MS) return cached.result;

    const result = await fetchCatalog();
    if (result.ok || !cached?.result.ok) {
      cached = { at: now, result };
    } else {
      cached = { at: now, result: cached.result };
    }
    return cached.result;
  },
);
