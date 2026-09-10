import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ArrowLeft, BookOpen, Calendar, ExternalLink, FlaskConical, ShoppingCart, User as UserIcon } from "lucide-react";
import type { BlogPost, BlogRelatedProduct } from "@/lib/types/blog";
import { formatBlogDate, getAuthorDisplayName, resolveBlogMediaUrl } from "@/lib/types/blog";
import BlogFaqAccordion from "@/components/blog/BlogFaqAccordion";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "blog-posts",
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      },
      depth: 2,
      limit: 1,
    });
    const doc = result.docs?.[0];
    return (doc as unknown as BlogPost) ?? null;
  } catch (err) {
    console.error("Failed to load blog post:", err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found | Primetime Biolabs" };

  const title = `${post.title} | Primetime Biolabs`;
  const description = post.excerpt ?? undefined;
  const url = `${SITE_URL}/blog/${slug}`;
  const imageUrl = resolveBlogMediaUrl(post.featuredImage) ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Prime Time Bio Labs",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const imageUrl = resolveBlogMediaUrl(post.featuredImage);
  const relatedProducts = (post.relatedProducts ?? []).filter(
    (p): p is BlogRelatedProduct => typeof p === "object" && p !== null
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: imageUrl ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    author: { "@type": "Person", name: getAuthorDisplayName(post.author) },
    publisher: {
      "@type": "Organization",
      name: "Prime Time Bio Labs",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/primtime-biolabs-logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-gray-200 overflow-hidden pt-40 pb-16 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
            {post.category && (
              <span className="px-3 py-1 text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
                {post.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.3] mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              {getAuthorDisplayName(post.author)}
            </span>
            {post.publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatBlogDate(post.publishedAt)}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {post.readTime}
              </span>
            )}
          </div>
        </div>
      </section>

      {imageUrl && (
        <section className="px-6 md:px-12 lg:px-24 -mt-4 mb-4 relative z-10">
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={imageUrl} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-8 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-8">
            <h2 className="text-sm font-bold tracking-widest text-indigo-300 uppercase mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {post.keyTakeaways.map((item, i) => (
                <li key={item.id ?? i} className="flex items-start gap-3 text-gray-200 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <article className="max-w-4xl mx-auto prose prose-lg prose-headings:font-michroma prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-gray-900 prose-a:text-indigo-600 max-w-none">
          {post.content ? (
            <RichText data={post.content as any} />
          ) : (
            <p className="text-gray-500">This article's content is coming soon.</p>
          )}
        </article>

        {/* References */}
        {post.references && post.references.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-6">References</h2>
            <ol className="space-y-3 list-decimal list-inside">
              {post.references.map((ref, i) => (
                <li key={ref.id ?? i} className="text-sm text-gray-600">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:text-indigo-600 transition-colors underline underline-offset-2"
                  >
                    {ref.citationText}
                    <ExternalLink className="inline w-3 h-3 ml-1 -translate-y-px" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* FAQs */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-black text-white border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-michroma font-bold uppercase tracking-wider mb-10 text-center">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Questions</span>
            </h2>
            <BlogFaqAccordion faqs={post.faqs} />
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-4 md:px-8 lg:px-12 bg-[#020202] text-white overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-michroma uppercase font-bold tracking-wider mb-10">
              Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => {
                const productImageUrl = resolveBlogMediaUrl(product.images?.[0]?.image) ?? "/product-card-image.png";
                const price = product.salePrice ?? product.price;
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug ?? product.id}`}
                    className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative h-40 mb-6 flex items-center justify-center">
                      {productImageUrl ? (
                        <img
                          src={productImageUrl}
                          alt={product.name}
                          className="h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <FlaskConical className="w-12 h-12 text-white/20" strokeWidth={1} />
                      )}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-medium font-michroma leading-tight text-gray-100 mb-4">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-xl font-light text-white">${price.toFixed(2)}</span>
                        <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-all duration-300">
                          <ShoppingCart className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
