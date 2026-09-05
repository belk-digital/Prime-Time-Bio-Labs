"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";

export async function toggleWishlistItem(
  productId: string | number,
  variantSku: string,
  priceSnapshot: number,
  currentPath?: string
): Promise<{ added: boolean } | { error: string }> {
  const user = await getPayloadUser();
  if (!user) {
    return { error: "login_required" };
  }

  const payload = await getPayload({ config });

  const existingResult = await payload.find({
    collection: "wishlists",
    where: { user: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  });

  const existingDoc = existingResult.docs?.[0];
  const productIdStr = String(productId);
  const productIdNum = Number(productId);

  let added: boolean;

  if (!existingDoc) {
    await payload.create({
      collection: "wishlists",
      data: {
        user: user.id,
        items: [
          {
            product: productIdNum,
            variantSku,
            quantity: 1,
            addedAt: new Date().toISOString(),
            priceSnapshot,
          },
        ],
      },
      overrideAccess: true,
    });
    added = true;
  } else {
    const items = existingDoc.items ?? [];
    const matchIndex = items.findIndex((item) => {
      const itemProductId =
        typeof item.product === "object" ? item.product?.id : item.product;
      return String(itemProductId) === productIdStr && item.variantSku === variantSku;
    });

    let newItems;
    if (matchIndex >= 0) {
      newItems = items.filter((_, idx) => idx !== matchIndex);
      added = false;
    } else {
      newItems = [
        ...items,
        {
          product: productIdNum,
          variantSku,
          quantity: 1,
          addedAt: new Date().toISOString(),
          priceSnapshot,
        },
      ];
      added = true;
    }

    await payload.update({
      collection: "wishlists",
      id: existingDoc.id,
      data: { items: newItems },
      overrideAccess: true,
    });
  }

  if (currentPath) {
    try {
      revalidatePath(currentPath);
    } catch {
      // best-effort; not critical if it fails
    }
  }

  return { added };
}
