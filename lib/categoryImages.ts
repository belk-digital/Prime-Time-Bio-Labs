export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "GLP-1 & Metabolic": "/images/categories/glp1.jpg",
  "Healing & Recovery": "/images/categories/healing.jpg",
  "Peptide Bundles": "/images/categories/bundles.jpg",
  "Nasal Sprays": "/images/categories/spray.jpg",
  "Cosmetic & Skin": "/images/categories/skin.jpg",
  "Sexual & Hormonal": "/images/categories/hormonal.jpg",
  "Growth Hormone Secretagogue": "/images/categories/growth.jpg",
  "Cognitive & Nootropic": "/images/categories/brain.jpg",
  "Longevity & Anti-Aging": "/images/categories/longevity.jpg",
};

export const PLACEHOLDER_CATEGORY_IMAGE = "/images/categories/glp1.jpg";

export function getCategoryImage(name: string): string {
  return CATEGORY_IMAGE_MAP[name] ?? PLACEHOLDER_CATEGORY_IMAGE;
}
