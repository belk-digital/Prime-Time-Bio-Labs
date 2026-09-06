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
  "Healing & Recovery": "Healing Peptide",
  "Growth Hormone Secretagogue": "Growth Hormone Secretagogue",
  "Nasal Sprays": "Nasal Spray",
  "Longevity & Anti-Aging": "Longevity Peptide",
};

/** Flattens a full Payload product doc into the simple shape the shop grid/card components render. */
export function toShopCardProduct(product: ShopProduct): ShopMockProduct {
  const categoryNames = (product.categories ?? [])
    .map((c) => (typeof c === "object" ? c.name : null))
    .filter((name): name is string => Boolean(name));

  const categoryName = categoryNames[0] ?? "Uncategorized";

  const dosageOptions =
    product.hasVariants && product.variants?.length
      ? Array.from(
          new Set(
            product.variants.flatMap((v) =>
              (v.options ?? []).map((o) => o.value).filter((v): v is string => Boolean(v))
            )
          )
        )
      : ["Standard"];

  return {
    id: String(product.id),
    name: product.name,
    slug: product.slug ?? String(product.id),
    description: product.description ?? "",
    dosageOptions: dosageOptions.length > 0 ? dosageOptions : ["Standard"],
    purity: typeof product.coaPurity === "number" ? `${product.coaPurity}%+ Purity` : "99%+ Purity",
    type: CATEGORY_TYPE_LABEL[categoryName] ?? "Research Grade Peptide",
    price: getEffectivePrice(product.price, product.salePrice),
    image: getProductPrimaryImageUrl(product) || FALLBACK_IMAGE,
    featured: !!product.isBestSeller,
    category: categoryName,
  };
}
