import React from "react";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";
import {
  WishlistClient,
  type WishlistItemData,
} from "@/components/account/WishlistClient";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const user = await getPayloadUser();
  if (!user) redirect("/login");

  const payload = await getPayload({ config });

  const { docs: wishlists } = await payload.find({
    collection: "wishlists",
    where: { user: { equals: user.id } },
    limit: 1,
    depth: 2,
    overrideAccess: true,
  });

  const wishlist = wishlists[0] as any;
  const items: WishlistItemData[] = [];

  if (wishlist && Array.isArray(wishlist.items)) {
    for (const item of wishlist.items) {
      const product =
        typeof item.product === "object" && item.product !== null
          ? item.product
          : null;

      let imageUrl: string | null = null;
      if (
        product?.images?.length &&
        typeof product.images[0].image === "object" &&
        product.images[0].image !== null
      ) {
        imageUrl = product.images[0].image.url || null;
      }

      items.push({
        variantSku: item.variantSku,
        productId: product ? String(product.id) : null,
        slug: product?.slug || null,
        name: product?.name || "Unknown Product",
        image: imageUrl,
        quantity: Number(item.quantity || 1),
        price: Number(item.priceSnapshot || 0),
      });
    }
  }

  return <WishlistClient items={items} />;
}
