import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import ShopClient from "@/components/shop/ShopClient";
import { toShopCardProduct } from "@/lib/shopCardProduct";
import type { ShopProduct } from "@/lib/types/shop";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
const TITLE = "Shop Research Peptides | Prime Time Bio Labs";
const DESCRIPTION =
  "Browse our full catalog of research-grade peptides — GLP-1, healing, longevity, cosmetic, and more. Every batch is third-party tested with a Certificate of Analysis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/shop`,
    siteName: "Prime Time Bio Labs",
    type: "website",
    images: [{ url: `${SITE_URL}/shop-banner-image.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

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
