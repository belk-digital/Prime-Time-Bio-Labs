/**
 * Local blog-domain types mirroring the field shapes defined in
 * collections/BlogPosts.ts and globals/BlogAuthorProfile.ts.
 *
 * payload-types.ts is currently a placeholder (no live database is
 * connected yet), so these types let blog pages type-check against the
 * known collection shapes now; once real generated types exist, call
 * sites can be switched over to them.
 */

export interface BlogMediaDoc {
  id: string | number;
  url?: string | null;
  alt?: string | null;
  filename?: string | null;
}

export interface BlogAuthorUser {
  id: string | number;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface BlogKeyTakeaway {
  id?: string | number | null;
  text: string;
}

export interface BlogFaq {
  id?: string | number | null;
  question: string;
  answer: string;
}

export interface BlogReference {
  id?: string | number | null;
  citationText: string;
  url: string;
}

export interface BlogInlineImage {
  id?: string | number | null;
  image: (string | number) | BlogMediaDoc;
  caption?: string | null;
}

export interface BlogRelatedProduct {
  id: string | number;
  name: string;
  slug?: string | null;
  price: number;
  salePrice?: number | null;
  images?: { id?: string | number | null; image: (string | number) | BlogMediaDoc }[] | null;
}

// Minimal shape for the Lexical serialized editor state — the exact node
// structure is handled by @payloadcms/richtext-lexical's RichText renderer.
export type BlogRichTextContent = {
  root: {
    children: unknown[];
    [key: string]: unknown;
  };
} | null | undefined;

export interface BlogPost {
  id: string | number;
  title: string;
  slug?: string | null;
  author?: (string | number) | BlogAuthorUser | null;
  featuredImage?: (string | number) | BlogMediaDoc | null;
  excerpt?: string | null;
  content?: BlogRichTextContent;
  inlineImages?: BlogInlineImage[] | null;
  publishedAt?: string | null;
  status?: "draft" | "published" | null;
  category?: string | null;
  relatedProducts?: ((string | number) | BlogRelatedProduct)[] | null;
  readTime?: string | null;
  keyTakeaways?: BlogKeyTakeaway[] | null;
  faqs?: BlogFaq[] | null;
  references?: BlogReference[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogAuthorProfile {
  name?: string | null;
  bio?: string | null;
  avatar?: (string | number) | BlogMediaDoc | null;
  title?: string | null;
}

export function resolveBlogMediaUrl(
  media: (string | number) | BlogMediaDoc | null | undefined
): string | undefined {
  if (!media) return undefined;
  if (typeof media === "object") return media.url ?? undefined;
  return undefined;
}

export function getAuthorDisplayName(
  author: (string | number) | BlogAuthorUser | null | undefined,
  fallback?: string | null
): string {
  if (author && typeof author === "object") {
    const name = [author.firstName, author.lastName].filter(Boolean).join(" ").trim();
    if (name) return name;
    if (author.email) return author.email;
  }
  return fallback || "Primetime Biolabs Research Team";
}

export function formatBlogDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
