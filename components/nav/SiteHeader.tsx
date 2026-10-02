import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";
import SiteNav, { type NavCategory } from "@/components/nav/SiteNav";
import { toShopCardProducts } from "@/lib/shopCardProduct";

// Category/product nav data is identical for every visitor and rarely changes, but it was being
// re-queried (one query per category) on every page render, adding ~1s+ to routes like /checkout.
const getNavCategories = unstable_cache(
  async (): Promise<NavCategory[]> => {
    const payload = await getPayload({ config });

    const categoriesResult = await payload.find({
      collection: "categories",
      where: { isVisible: { equals: true } },
      sort: "sortOrder",
      limit: 12,
      depth: 0,
    });

    return Promise.all(
      (categoriesResult.docs ?? []).map(async (category) => {
        const productsResult = await payload.find({
          collection: "products",
          where: {
            and: [
              { categories: { contains: category.id } },
              { status: { equals: "active" } },
              { isVisible: { equals: true } },
            ],
          },
          limit: 10,
          depth: 1,
        });

        const dedupedProducts = toShopCardProducts((productsResult.docs ?? []) as any).slice(0, 3);

        return {
          id: String(category.id),
          name: category.name,
          slug: category.slug ?? "",
          products: dedupedProducts.map((card) => {
            const imageUrl = "/product-card-image.png";
            return {
              name: card.name,
              slug: card.slug,
              image: imageUrl,
              price: card.price,
            };
          }),
        };
      })
    );
  },
  ["site-nav-categories"],
  { revalidate: 300, tags: ["site-nav"] }
);

export default async function SiteHeader() {
  let categories: NavCategory[] = [];
  let wishlistCount = 0;
  let wishlistProductIds: string[] = [];

  try {
    const payload = await getPayload({ config });

    categories = await getNavCategories();

    const user = await getPayloadUser();
    if (user) {
      const wishlistResult = await payload.find({
        collection: "wishlists",
        where: { user: { equals: user.id } },
        limit: 1,
        overrideAccess: true,
      });
      const wishlistDoc = wishlistResult.docs?.[0];
      wishlistCount = wishlistDoc?.items?.length ?? 0;
      wishlistProductIds = (wishlistDoc?.items ?? [])
        .map((item) => (typeof item.product === "object" ? item.product?.id : item.product))
        .filter((id): id is number => id !== null && id !== undefined)
        .map((id) => String(id));
    }
  } catch (err) {
    console.error("Failed to load nav data:", err);
    categories = [];
    wishlistCount = 0;
    wishlistProductIds = [];
  }

  return (
    <SiteNav
      categories={categories}
      wishlistCount={wishlistCount}
      wishlistProductIds={wishlistProductIds}
    />
  );
}
