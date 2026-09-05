import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import ProductClient from "@/components/product/ProductClient";
import type { ShopProduct } from "@/lib/types/shop";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const productsResult = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  const product = (productsResult.docs?.[0] ?? null) as unknown as ShopProduct | null;

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
        depth: 1,
      });
      relatedProducts = (relatedResult.docs ?? []) as unknown as ShopProduct[];
    } catch (err) {
      console.error("Failed to load related products:", err);
    }
  }

  let isWishlisted = false;
  try {
    const user = await getPayloadUser();
    if (user) {
      const wishlistResult = await payload.find({
        collection: "wishlists",
        where: { user: { equals: user.id } },
        limit: 1,
        overrideAccess: true,
      });
      const items = wishlistResult.docs?.[0]?.items ?? [];
      isWishlisted = items.some((item) => {
        const itemProductId = typeof item.product === "object" ? item.product?.id : item.product;
        return String(itemProductId) === String(product.id);
      });
    }
  } catch (err) {
    console.error("Failed to load wishlist state:", err);
  }

  return (
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
      isWishlisted={isWishlisted}
    />
  );
}
