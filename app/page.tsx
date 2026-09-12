import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import HomeClient from "@/components/HomeClient";
import type { CategoryCardData } from "@/components/CategoriesSection";
import { getCategoryImage } from "@/lib/categoryImages";
import type { BlogPostCardData } from "@/components/BlogSection";
import { toShopCardProducts, type ShopMockProduct } from "@/lib/shopCardProduct";
import type { ShopProduct } from "@/lib/types/shop";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
const FALLBACK_BLOG_IMAGE = "/blog-1.jpg";

const TITLE = "Prime Time Bio Labs | Research-Grade Peptides & Certificates of Analysis";
const DESCRIPTION =
  "Buy research-grade peptides third-party tested for purity, with a Certificate of Analysis on every batch. Fast, discreet shipping for laboratory research use only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Prime Time Bio Labs",
    type: "website",
    images: [{ url: `${SITE_URL}/cta-banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/cta-banner.png`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Prime Time Bio Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/primtime-biolabs-logo.svg`,
  description: DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@primetimebiolabs.com",
    contactType: "customer support",
  },
};

interface MediaRef {
  url?: string | null;
}

interface CategoryDoc {
  id: string | number;
  name: string;
  slug?: string | null;
  isVisible?: boolean | null;
  sortOrder?: number | null;
}

interface BlogPostDoc {
  id: string | number;
  title: string;
  slug?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  featuredImage?: MediaRef | string | number | null;
}

function mapCategory(category: CategoryDoc): CategoryCardData {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug || String(category.id),
    image: getCategoryImage(category.name),
  };
}

function formatBlogDate(dateString?: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    .toUpperCase();
}

function getBlogImageUrl(post: BlogPostDoc): string {
  const image = post.featuredImage;
  if (image && typeof image === "object" && "url" in image && image.url) {
    return image.url;
  }
  return FALLBACK_BLOG_IMAGE;
}

function mapBlogPost(post: BlogPostDoc): BlogPostCardData {
  return {
    id: post.id,
    tag: post.category || "RESEARCH",
    date: formatBlogDate(post.publishedAt),
    title: post.title,
    image: getBlogImageUrl(post),
    slug: post.slug || String(post.id),
  };
}

export default async function Home() {
  let products: ShopMockProduct[] = [];
  let categories: CategoryCardData[] = [];
  let posts: BlogPostCardData[] = [];

  try {
    const payload = await getPayload({ config });

    const [productsResult, categoriesResult, postsResult] = await Promise.all([
      payload.find({
        collection: "products",
        where: {
          isBestSeller: { equals: true },
          status: { equals: "active" },
        },
        limit: 4,
        depth: 2,
        overrideAccess: true,
      }),
      payload.find({
        collection: "categories",
        where: { isVisible: { equals: true } },
        sort: "sortOrder",
        overrideAccess: true,
      }),
      payload.find({
        collection: "blog-posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 3,
        overrideAccess: true,
      }),
    ]);

    products = toShopCardProducts(productsResult.docs as unknown as ShopProduct[]);
    categories = (categoriesResult.docs as CategoryDoc[]).map(mapCategory);
    posts = (postsResult.docs as BlogPostDoc[]).map(mapBlogPost);
  } catch (error) {
    // No database connection yet (or a query error) — fall back to the
    // hardcoded arrays baked into each section component so the homepage
    // never renders broken before the database is seeded.
    console.error("Failed to load homepage data from Payload:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeClient products={products} categories={categories} posts={posts} />
    </>
  );
}
