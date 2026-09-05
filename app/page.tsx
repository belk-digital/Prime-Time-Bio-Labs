import { getPayload } from "payload";
import config from "@payload-config";
import HomeClient from "@/components/HomeClient";
import type { ProductCardData } from "@/components/BestSellersSection";
import type { CategoryCardData } from "@/components/CategoriesSection";
import { getCategoryImage } from "@/lib/categoryImages";
import type { BlogPostCardData } from "@/components/BlogSection";

const FALLBACK_PRODUCT_IMAGE = "/product-retatrutide.png";
const FALLBACK_BLOG_IMAGE = "/blog-1.jpg";

interface MediaRef {
  url?: string | null;
}

interface ProductImageEntry {
  image?: MediaRef | string | number | null;
}

interface ProductDoc {
  id: string | number;
  name: string;
  slug?: string | null;
  price?: number | null;
  salePrice?: number | null;
  images?: ProductImageEntry[] | null;
  categories?: ({ name?: string | null } | string | number)[] | null;
  isBestSeller?: boolean | null;
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

function formatPrice(price?: number | null, salePrice?: number | null): string {
  const effective = typeof salePrice === "number" ? salePrice : price;
  if (typeof effective !== "number") return "$0.00";
  return `$${effective.toFixed(2)}`;
}

function getProductImageUrl(product: ProductDoc): string {
  const firstImage = product.images?.[0]?.image;
  if (firstImage && typeof firstImage === "object" && "url" in firstImage && firstImage.url) {
    return firstImage.url;
  }
  return FALLBACK_PRODUCT_IMAGE;
}

function getProductCategoryLabel(product: ProductDoc): string {
  const first = product.categories?.[0];
  if (first && typeof first === "object" && "name" in first && first.name) {
    return first.name;
  }
  return "Research Grade Peptide";
}

function mapProduct(product: ProductDoc): ProductCardData {
  return {
    id: product.id,
    name: product.name,
    dosage: "",
    purity: "99%+ Purity",
    type: getProductCategoryLabel(product),
    price: formatPrice(product.price, product.salePrice),
    image: getProductImageUrl(product),
    featured: !!product.isBestSeller,
    slug: product.slug || String(product.id),
  };
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
  let products: ProductCardData[] = [];
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

    products = (productsResult.docs as ProductDoc[]).map(mapProduct);
    categories = (categoriesResult.docs as CategoryDoc[]).map(mapCategory);
    posts = (postsResult.docs as BlogPostDoc[]).map(mapBlogPost);
  } catch (error) {
    // No database connection yet (or a query error) — fall back to the
    // hardcoded arrays baked into each section component so the homepage
    // never renders broken before the database is seeded.
    console.error("Failed to load homepage data from Payload:", error);
  }

  return <HomeClient products={products} categories={categories} posts={posts} />;
}
