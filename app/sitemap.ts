import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com").replace(/\/+$/, "");

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/shop", priority: 0.9, changeFrequency: "daily" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/certificates", priority: 0.6, changeFrequency: "monthly" },
  { path: "/peptide-calculator", priority: 0.6, changeFrequency: "monthly" },
  { path: "/affiliates", priority: 0.5, changeFrequency: "monthly" },
  { path: "/military-discount", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/medical-disclaimer", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path ? (route.path.startsWith("/") ? route.path : `/${route.path}`) : ""}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const products = await payload.find({
      collection: "products",
      where: { and: [{ status: { equals: "active" } }, { isVisible: { equals: true } }] },
      limit: 1000,
      depth: 0,
    });
    for (const product of products.docs) {
      if (!product.slug) continue;
      const cleanSlug = String(product.slug).replace(/^\/+/, "");
      entries.push({
        url: `${SITE_URL}/product/${cleanSlug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (err) {
    console.error("sitemap: failed to load products:", err);
  }

  try {
    const posts = await payload.find({
      collection: "blog-posts",
      where: { status: { equals: "published" } },
      limit: 1000,
      depth: 0,
    });
    for (const post of posts.docs) {
      if (!post.slug) continue;
      const cleanSlug = String(post.slug).replace(/^\/+/, "");
      entries.push({
        url: `${SITE_URL}/blog/${cleanSlug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (err) {
    console.error("sitemap: failed to load blog posts:", err);
  }

  return entries;
}
