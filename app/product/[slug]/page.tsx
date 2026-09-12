import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "@/components/product/ProductClient";
import { getMultiVariantConfig, toShopCardProduct, toShopCardProducts } from "@/lib/shopCardProduct";
import { getProductPrimaryImageUrl, getEffectivePrice } from "@/lib/types/shop";
import type { ShopProduct } from "@/lib/types/shop";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";

function buildProductJsonLd(product: ShopProduct, imageUrl: string) {
  const price = getEffectivePrice(product.price, product.salePrice);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.seoDescription || undefined,
    image: imageUrl,
    sku: product.sku || undefined,
    brand: { "@type": "Brand", name: "Prime Time Bio Labs" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
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
  const mvConfig = getMultiVariantConfig(slug);

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
          { slug: { equals: slug } },
          { slug: { equals: mvConfig.slug } },
          ...keywordConditions,
        ],
      } as any,
      depth: 2,
      limit: 1,
    });
    if (result.docs?.[0]) return result.docs[0] as unknown as ShopProduct;
  }

  // 1. Exact match by slug
  let result = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });
  if (result.docs?.[0]) return result.docs[0] as unknown as ShopProduct;

  // 2. Prefix or contains match (e.g. clean slug "bpc-157" matches "bpc-157-10-mg")
  const searchName = slug.replace(/-/g, " ");
  result = await payload.find({
    collection: "products",
    where: {
      or: [
        { slug: { like: `${slug}%` } },
        { slug: { contains: slug } },
        { name: { contains: searchName } },
      ],
    } as any,
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
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | PrimeTime BioLabs" };
  }

  const title = product.seoTitle || `${product.name} | PrimeTime BioLabs`;
  const description =
    product.seoDescription || product.description || "Research peptide for laboratory use.";
  const imageUrl = getProductPrimaryImageUrl(product);
  const url = `${SITE_URL}/product/${slug}`;

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
  const productJsonLd = buildProductJsonLd(product, imageUrl);
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
