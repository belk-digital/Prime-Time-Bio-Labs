import { getPayload } from "payload";
import config from "@payload-config";
import ShopClient from "@/components/shop/ShopClient";
import { toShopCardProduct } from "@/lib/shopCardProduct";
import type { ShopProduct } from "@/lib/types/shop";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const payload = await getPayload({ config });

  let products: ShopProduct[] = [];
  let categoryNames: string[] = [];

  try {
    const [productsResult, categoriesResult] = await Promise.all([
      payload.find({
        collection: "products",
        where: { and: [{ status: { equals: "active" } }, { isVisible: { equals: true } }] },
        depth: 2,
        limit: 100,
      }),
      payload.find({
        collection: "categories",
        where: { isVisible: { equals: true } },
        sort: "sortOrder",
        limit: 50,
      }),
    ]);
    products = (productsResult.docs ?? []) as unknown as ShopProduct[];
    categoryNames = (categoriesResult.docs ?? []).map((c) => c.name as string).filter(Boolean);
  } catch (err) {
    console.error("Failed to load shop data:", err);
  }

  const cardProducts = products.map(toShopCardProduct);

  return <ShopClient products={cardProducts} categories={categoryNames} />;
}
