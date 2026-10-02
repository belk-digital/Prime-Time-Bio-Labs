/**
 * Single source of truth for canonical product slugs and 301 redirect mappings.
 *
 * Canonical decision: Short-form clean slugs without dosage suffixes are the
 * single surviving canonical standard for every product.
 */

/** Known 301 redirects from legacy / dosage-suffixed slugs to canonical short slugs. */
export const PRODUCT_SLUG_REDIRECTS: Record<string, string> = {
  // Multi-variant products (legacy compound names and dosage variants)
  "retatrutide-10-mg": "glp-3rta",
  "retatrutide-30-mg": "glp-3rta",
  "retatrutide": "glp-3rta",
  "tirzepatide-10-mg": "glp-1trz",
  "tirzepatide-30-mg": "glp-1trz",
  "tirzepatide": "glp-1trz",
  "tesamorelin-10-mg": "tesamorelin",
  "tesamorelin-20-mg": "tesamorelin",
  "mots-c-10-mg": "mots-c",
  "mots-c-20-mg": "mots-c",

  // Single-variant products (dosage suffixes -> short clean slugs)
  "semaglutide-10-mg": "semaglutide",
  "metabolic-x-reta-x-cangri-10-mg": "metabolic-x-reta-x-cangri",
  "bpc-157-10-mg": "bpc-157",
  "tb-500-10-mg": "tb-500",
  "kpv-10-mg": "kpv",
  "wolverine-20-mg": "wolverine",
  "igf1-lr3-1-mg": "igf1-lr3",
  "semax-10-mg": "semax",
  "dsip-10-mg": "dsip",
  "pt-141-10-mg": "pt-141",
  "epitalon-10-mg": "epitalon",
  "nad-500-mg": "nad",
  "thymosin-5-mg": "thymosin",
  "ghkcu-50-mg": "ghkcu",
  "ahkcu-50-mg": "ahkcu",
  "glow-70-mg": "glow",
  "klow-80-mg": "klow",
};

/** All 21 canonical product slugs. */
export const CANONICAL_PRODUCT_SLUGS = new Set([
  "glp-3rta",
  "glp-1trz",
  "semaglutide",
  "metabolic-x-reta-x-cangri",
  "bpc-157",
  "tb-500",
  "kpv",
  "wolverine",
  "tesamorelin",
  "mots-c",
  "igf1-lr3",
  "semax",
  "dsip",
  "pt-141",
  "epitalon",
  "nad",
  "thymosin",
  "ghkcu",
  "ahkcu",
  "glow",
  "klow",
]);

/** Returns canonical slug if valid, or redirect target if legacy, or null if unknown. */
export function resolveCanonicalProductSlug(slug: string): string | null {
  const normalized = (slug || "").toLowerCase().trim();
  if (CANONICAL_PRODUCT_SLUGS.has(normalized)) return normalized;
  if (PRODUCT_SLUG_REDIRECTS[normalized]) return PRODUCT_SLUG_REDIRECTS[normalized];
  return null;
}
