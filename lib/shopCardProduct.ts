import {
  getEffectivePrice,
  getProductPrimaryImageUrl,
  type ShopProduct,
} from "@/lib/types/shop";

export interface ShopMockProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  dosageOptions: string[];
  purity: string;
  type: string;
  price: number;
  image: string;
  featured: boolean;
  category: string;
}

const FALLBACK_IMAGE = "/product-card-image.png";

const CATEGORY_TYPE_LABEL: Record<string, string> = {
  "GLP-1 & Metabolic": "Research Grade Peptide",
  "Healing & Recovery": "Research Peptide",
  "Growth Hormone Secretagogue": "Growth Hormone Secretagogue",
  "Nasal Sprays": "Nasal Spray",
  "Longevity & Anti-Aging": "Longevity Peptide",
  "Cognitive & Nootropic": "Cognitive Peptide",
  "Sexual & Hormonal": "Hormonal Peptide",
  "Cosmetic & Skin": "Cosmetic Peptide",
};

export interface MultiVariantProductConfig {
  name: string;
  slug: string;
  dosageOptions: string[];
  defaultDosage: string;
  category: string;
  isBestSeller?: boolean;
  dbKeywords: string[];
  variants: Record<
    string,
    {
      price: number;
      image: string;
      sku: string;
    }
  >;
}

export const MULTI_VARIANT_PRODUCTS: Record<string, MultiVariantProductConfig> = {
  retatrutide: {
    name: "GLP-3RTA",
    slug: "glp-3rta",
    dosageOptions: ["10mg", "30mg"],
    defaultDosage: "10mg",
    category: "GLP-1 & Metabolic",
    isBestSeller: true,
    dbKeywords: ["Retatrutide", "retatrutide"],
    variants: {
      "10mg": {
        price: 64.99,
        image: "/primetimebiolabs prod images/GLP-3RTA-10MG_PRIME.png",
        sku: "RETA-10MG",
      },
      "30mg": {
        price: 99.99,
        image: "/primetimebiolabs prod images/GLP-3RTA_30MG_PRIME.png",
        sku: "RETA-30MG",
      },
    },
  },
  tirzepatide: {
    name: "GLP-1TRZ",
    slug: "glp-1trz",
    dosageOptions: ["10mg", "30mg"],
    defaultDosage: "10mg",
    category: "GLP-1 & Metabolic",
    isBestSeller: true,
    dbKeywords: ["Tirzepatide", "tirzepatide"],
    variants: {
      "10mg": {
        price: 61.99,
        image: "/primetimebiolabs prod images/GLP1TRZ_10MG_PRIME.png",
        sku: "TIRZ-10MG",
      },
      "30mg": {
        price: 89.99,
        image: "/primetimebiolabs prod images/GLP1TRZ_30MG_PRIME.png",
        sku: "TIRZ-30MG",
      },
    },
  },
  "mots-c": {
    name: "MOTS-c",
    slug: "mots-c",
    dosageOptions: ["10mg", "20mg"],
    defaultDosage: "10mg",
    category: "Growth Hormone Secretagogue",
    dbKeywords: ["Mots C", "MOTS-c", "mots-c"],
    variants: {
      "10mg": {
        price: 59.99,
        image: "/primetimebiolabs prod images/MOTS-C-10MG.webp",
        sku: "MOTSC-10MG",
      },
      "20mg": {
        price: 79.99,
        image: "/primetimebiolabs prod images/MOTC-20MG.webp",
        sku: "MOTSC-20MG",
      },
    },
  },
  tesamorelin: {
    name: "Tesamorelin",
    slug: "tesamorelin",
    dosageOptions: ["10mg", "20mg"],
    defaultDosage: "10mg",
    category: "Growth Hormone Secretagogue",
    dbKeywords: ["Tesamorelin", "tesamorelin"],
    variants: {
      "10mg": {
        price: 64.99,
        image: "/primetimebiolabs prod images/Tesamorelin-10mg.webp",
        sku: "TESA-10MG",
      },
      "20mg": {
        price: 89.99,
        image: "/primetimebiolabs prod images/TESAMORELIN-20MG.webp",
        sku: "TESA-20MG",
      },
    },
  },
};

export function getMultiVariantConfig(nameOrSlug?: string | null): MultiVariantProductConfig | null {
  if (!nameOrSlug) return null;
  const norm = nameOrSlug.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (norm.includes("retatrutide") || norm.includes("glp3rta") || norm.includes("glp3")) return MULTI_VARIANT_PRODUCTS.retatrutide;
  if (norm.includes("tirzepatide") || norm.includes("tirzepetide") || norm.includes("glp1trz") || norm.includes("glp1")) return MULTI_VARIANT_PRODUCTS.tirzepatide;
  if (norm.includes("motsc") || norm.includes("motc")) return MULTI_VARIANT_PRODUCTS["mots-c"];
  if (norm.includes("tesamorelin")) return MULTI_VARIANT_PRODUCTS.tesamorelin;
  return null;
}

export function getProductDisplayDetails(
  product: { name: string; slug?: string; price: number; image: string },
  selectedDosage: string
) {
  const cfg = getMultiVariantConfig(product.slug || product.name);
  if (!cfg) {
    return {
      price: product.price,
      image: product.image,
      sku: product.slug || "standard",
      galleryImages: [product.image],
    };
  }

  const normDosage = (selectedDosage || "").toLowerCase().replace(/[^0-9a-z]/g, "");
  const matchingKey =
    Object.keys(cfg.variants).find(
      (k) => k.toLowerCase().replace(/[^0-9a-z]/g, "") === normDosage
    ) || cfg.defaultDosage;

  const variant = cfg.variants[matchingKey] || cfg.variants[cfg.defaultDosage];
  const galleryImages = Object.values(cfg.variants).map((v) => v.image);

  return {
    price: variant.price,
    image: variant.image,
    sku: variant.sku,
    galleryImages,
  };
}

/** Extracts dosage like "10mg", "1mg", "500mg", "5mg" from product name and returns clean name and dosage */
export function extractDosageFromName(rawName: string): { cleanName: string; dosage: string | null } {
  if (!rawName) return { cleanName: rawName, dosage: null };
  const dosageMatch = rawName.match(/\b(\d+(?:\.\d+)?)\s*(mg|mcg|iu|g|ml)\b/i);
  if (dosageMatch) {
    const dosage = `${dosageMatch[1]}${dosageMatch[2].toLowerCase()}`;
    const cleanName = rawName
      .replace(new RegExp(`\\b${dosageMatch[1]}\\s*${dosageMatch[2]}\\b`, "i"), "")
      .replace(/\s+/g, " ")
      .trim();
    return { cleanName: cleanName || rawName, dosage };
  }
  return { cleanName: rawName, dosage: null };
}

/** Cleans dosage suffixes from a slug or derives clean slug from product name (e.g. "bpc-157-10-mg" -> "bpc-157") */
export function toCleanSlug(rawSlug?: string | null, fallbackName?: string | null): string {
  const base = (rawSlug || fallbackName || "")
    .toLowerCase()
    .trim()
    .replace(/-?\b\d+(\.\d+)?(-?)(mg|mcg|iu|g|ml)\b/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || "product";
}

/** Flattens a full Payload product doc into the simple shape the shop grid/card components render. */
export function toShopCardProduct(product: ShopProduct): ShopMockProduct {
  const mvConfig = getMultiVariantConfig(product.slug || product.name);
  const parsed = extractDosageFromName(product.name || "");

  const categoryNames = (product.categories ?? [])
    .map((c) => (typeof c === "object" ? c.name : null))
    .filter((name): name is string => Boolean(name));

  const categoryName = categoryNames[0] ?? (mvConfig ? mvConfig.category : "Uncategorized");

  let dosageOptions =
    product.hasVariants && product.variants?.length
      ? Array.from(
          new Set(
            product.variants.flatMap((v) =>
              (v.options ?? []).map((o) => o.value).filter((v): v is string => Boolean(v))
            )
          )
        )
      : (parsed.dosage ? [parsed.dosage] : ["Standard"]);

  if (mvConfig) {
    dosageOptions = mvConfig.dosageOptions;
  }

  const name = mvConfig ? mvConfig.name : (parsed.cleanName || product.name);
  const slug = mvConfig ? mvConfig.slug : toCleanSlug(product.slug, parsed.cleanName);
  const defaultVariant = mvConfig ? mvConfig.variants[mvConfig.defaultDosage] : null;
  const image = defaultVariant
    ? defaultVariant.image
    : getProductPrimaryImageUrl(product) || FALLBACK_IMAGE;
  const price = defaultVariant
    ? defaultVariant.price
    : getEffectivePrice(product.price, product.salePrice);
  const featured = mvConfig?.isBestSeller ?? !!product.isBestSeller;

  return {
    id: mvConfig ? mvConfig.slug : String(product.id),
    name,
    slug,
    description: product.description ?? "",
    dosageOptions: dosageOptions.length > 0 ? dosageOptions : ["Standard"],
    purity: typeof product.coaPurity === "number" ? `${product.coaPurity}%+ Purity` : "99%+ Purity",
    type: CATEGORY_TYPE_LABEL[categoryName] ?? categoryName,
    price,
    image,
    featured,
    category: categoryName,
  };
}

/** Flattens and deduplicates product docs into shop cards (merging variants into single cards). */
export function toShopCardProducts(products: ShopProduct[]): ShopMockProduct[] {
  const seenSlugs = new Set<string>();
  const results: ShopMockProduct[] = [];

  for (const p of products) {
    const card = toShopCardProduct(p);
    if (!seenSlugs.has(card.slug)) {
      seenSlugs.add(card.slug);
      results.push(card);
    }
  }

  return results;
}
