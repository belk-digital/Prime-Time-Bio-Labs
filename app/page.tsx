import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import HomeClient from "@/components/HomeClient";
import type { CategoryCardData } from "@/components/CategoriesSection";
import { getCategoryImage } from "@/lib/categoryImages";
import type { BlogPostCardData } from "@/components/BlogSection";
import { toShopCardProducts, type ShopMockProduct } from "@/lib/shopCardProduct";
import type { ShopProduct } from "@/lib/types/shop";
import { DEFAULT_FAQS } from "@/lib/defaultFaqs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
const FALLBACK_BLOG_IMAGE = "/blog-1.jpg";

const TITLE = "Research Peptides | ≥99% Purity, COA Verified | PrimeTime BioLabs";
const DESCRIPTION =
  "Buy research peptides tested by HPLC and mass spectrometry to ≥99% purity. Every batch ships with a Certificate of Analysis. Synthesised in the USA. RUO only.";
const OG_DESCRIPTION =
  "Every batch is HPLC and MS tested to ≥99% purity and ships with a Certificate of Analysis. Synthesised in US laboratories. For laboratory research use only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "PrimeTime BioLabs",
    type: "website",
    images: [{ url: `${SITE_URL}/cta-banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: OG_DESCRIPTION,
    images: [`${SITE_URL}/cta-banner.png`],
  },
};

function buildJsonLdGraph(products: ShopMockProduct[]) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "PrimeTime BioLabs",
    alternateName: "Primetime Biolabs",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/primtime-biolabs-logo.svg`,
    },
    description:
      "Supplier of research-grade peptides tested by independent HPLC and mass spectrometry analysis to a minimum of 99% purity, with a Certificate of Analysis on every batch. For laboratory research use only.",
    email: "support@primetimebiolabs.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@primetimebiolabs.com",
      areaServed: "US",
      availableLanguage: "English",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "PrimeTime BioLabs",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#bestsellers`,
    name: "Best-Selling Research Peptides",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${p.name} Research Peptide`,
        url: `${SITE_URL}/product/${p.slug}`,
        image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
        sku: p.id,
        description: p.description,
        brand: { "@type": "Brand", name: "PrimeTime BioLabs" },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/product/${p.slug}`,
          price: p.price.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      },
    })),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: DEFAULT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webPage, itemList, faqPage],
  };
}

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLdGraph(products)) }}
      />
      <HomeClient products={products} categories={categories} posts={posts} />
    </>
  );
}
