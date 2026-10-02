import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "@/components/product/ProductClient";
import {
  extractDosageFromName,
  getMultiVariantConfig,
  toShopCardProduct,
  toShopCardProducts,
} from "@/lib/shopCardProduct";
import { getProductPrimaryImageUrl, getEffectivePrice } from "@/lib/types/shop";
import type { ShopProduct } from "@/lib/types/shop";
import { siteUrl } from "@/lib/siteUrl";
import {
  CANONICAL_PRODUCT_SLUGS,
  PRODUCT_SLUG_REDIRECTS,
  resolveCanonicalProductSlug,
} from "@/lib/productSlugs";

export const dynamic = "force-dynamic";

function buildProductJsonLd(product: ShopProduct, imageUrl: string, canonicalSlug: string) {
  const card = toShopCardProduct(product);
  const price = getEffectivePrice(product.price, product.salePrice);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: card.name,
    description: product.description || product.seoDescription || undefined,
    image: imageUrl,
    sku: product.sku || undefined,
    brand: { "@type": "Brand", name: "Prime Time Bio Labs" },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/product/${canonicalSlug}`,
      priceCurrency: "USD",
      price: price.toFixed(2),
      availability:
        (product.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(typeof product.coaPurity === "number"
      ? { additionalProperty: { "@type": "PropertyValue", name: "Purity", value: `${product.coaPurity}%` } }
      : {}),
  };
}

function buildFaqJsonLd(product: ShopProduct) {
  const faqs = (product.faqs ?? []).filter((f) => f.question && f.answer);
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

const getProductBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config });
  const canonicalSlug = resolveCanonicalProductSlug(slug);
  if (!canonicalSlug) return null;

  const mvConfig = getMultiVariantConfig(canonicalSlug);

  if (mvConfig) {
    const keywordConditions = (mvConfig.dbKeywords || [mvConfig.name, mvConfig.slug]).flatMap(
      (kw) => [
        { slug: { equals: kw } },
        { slug: { like: `${kw}%` } },
        { name: { like: `${kw}%` } },
        { name: { equals: kw } },
      ]
    );

    const result = await payload.find({
      collection: "products",
      where: {
        or: [
          { slug: { equals: canonicalSlug } },
          { slug: { equals: mvConfig.slug } },
          ...keywordConditions,
        ],
      } as any,
      sort: "name", // Ascending sort guarantees 10mg precedes 20mg/30mg
      depth: 2,
      limit: 10,
    });

    if (result.docs?.length > 0) {
      // Deterministically pick the primary (default dosage, e.g. 10mg) document
      const primaryDoc = result.docs.find((d: any) => {
        const parsed = extractDosageFromName(d.name || "");
        return parsed.dosage?.toLowerCase() === mvConfig.defaultDosage.toLowerCase();
      }) || result.docs[0];

      return primaryDoc as unknown as ShopProduct;
    }
  }

  // 1. Exact match by canonical slug
  let result = await payload.find({
    collection: "products",
    where: { slug: { equals: canonicalSlug } },
    depth: 2,
    limit: 1,
  });
  if (result.docs?.[0]) return result.docs[0] as unknown as ShopProduct;

  // 2. Exact prefix match with dosage delimiter (e.g. "bpc-157" matches "bpc-157-10-mg")
  result = await payload.find({
    collection: "products",
    where: {
      or: [
        { slug: { like: `${canonicalSlug}-%` } },
      ],
    } as any,
    sort: "name",
    depth: 2,
    limit: 1,
  });

  return (result.docs?.[0] ?? null) as unknown as ShopProduct | null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = resolveCanonicalProductSlug(slug);

  if (!canonicalSlug) {
    return { title: "Product Not Found | PrimeTime BioLabs" };
  }

  const product = await getProductBySlug(canonicalSlug);

  if (!product) {
    return { title: "Product Not Found | PrimeTime BioLabs" };
  }

  const cardProduct = toShopCardProduct(product);
  const title = product.seoTitle || `${cardProduct.name} | PrimeTime BioLabs`;
  const description =
    product.seoDescription || product.description || "Research peptide for laboratory use.";
  const imageUrl = getProductPrimaryImageUrl(product);
  const url = `${siteUrl}/product/${canonicalSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Prime Time Bio Labs",
      type: "website",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // If accessed directly via legacy long slug, redirect immediately with 301
  if (PRODUCT_SLUG_REDIRECTS[slug]) {
    redirect(`/product/${PRODUCT_SLUG_REDIRECTS[slug]}`);
  }

  // Non-canonical unknown slugs 404
  if (!CANONICAL_PRODUCT_SLUGS.has(slug)) {
    notFound();
  }

  const payload = await getPayload({ config });
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryIds = (product.categories ?? [])
    .map((c) => (typeof c === "object" ? c.id : c))
    .filter(Boolean);

  let relatedProducts: ShopProduct[] = [];
  if (categoryIds.length > 0) {
    try {
      const relatedResult = await payload.find({
        collection: "products",
        where: {
          and: [
            { status: { equals: "active" } },
            { isVisible: { equals: true } },
            { categories: { in: categoryIds } },
            { id: { not_equals: product.id } },
          ],
        },
        limit: 4,
        depth: 2,
      });
      relatedProducts = (relatedResult.docs ?? []) as unknown as ShopProduct[];
    } catch (err) {
      console.error("Failed to load related products:", err);
    }
  }

  const imageUrl = getProductPrimaryImageUrl(product);
  const productJsonLd = buildProductJsonLd(product, imageUrl, slug);
  const faqJsonLd = buildFaqJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ProductClient
        product={product}
        cardProduct={toShopCardProduct(product)}
        relatedProducts={toShopCardProducts(relatedProducts)}
      />
    </>
  );
}
