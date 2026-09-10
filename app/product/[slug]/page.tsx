import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "@/components/product/ProductClient";
import { toShopCardProduct } from "@/lib/shopCardProduct";
import { getProductPrimaryImageUrl } from "@/lib/types/shop";
import type { ShopProduct } from "@/lib/types/shop";

export const dynamic = "force-dynamic";

const getProductBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl }],
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

  return (
    <ProductClient
      product={product}
      cardProduct={toShopCardProduct(product)}
      relatedProducts={relatedProducts.map(toShopCardProduct)}
    />
  );
}
