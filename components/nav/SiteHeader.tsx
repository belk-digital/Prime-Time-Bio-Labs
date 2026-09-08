import { getPayload } from "payload";
import config from "@payload-config";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";
import SiteNav, { type NavCategory } from "@/components/nav/SiteNav";

export default async function SiteHeader() {
  let categories: NavCategory[] = [];
  let wishlistCount = 0;
  let wishlistProductIds: string[] = [];

  try {
    const payload = await getPayload({ config });

    const categoriesResult = await payload.find({
      collection: "categories",
      where: { isVisible: { equals: true } },
      sort: "sortOrder",
      limit: 12,
      depth: 0,
    });

    categories = await Promise.all(
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
          limit: 3,
          depth: 1,
        });

        return {
          id: String(category.id),
          name: category.name,
          slug: category.slug ?? "",
          products: (productsResult.docs ?? []).map((product) => {
            // TEMPORARY: local media storage isn't reachable on Vercel yet (R2 not
            // connected), so serve the shared placeholder instead of the stored URL.
            void product.images;
            const imageUrl = "/product-card-image.png";
            return {
              name: product.name,
              slug: product.slug ?? "",
              image: imageUrl,
              price: product.price,
            };
          }),
        };
      })
    );

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
