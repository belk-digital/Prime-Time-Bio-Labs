import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { ArrowRight, FlaskConical } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import { formatBlogDate, resolveBlogMediaUrl } from "@/lib/types/blog";
import Footer from "@/components/Footer";

const PLACEHOLDER_IMAGES = ["/blog-1.jpg", "/blog-2.jpg", "/blog-3.jpg"];

function placeholderFor(index: number) {
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
}

export const metadata = {
  title: "Research Blog | Primetime Biolabs",
  description:
    "In-depth articles on peptide synthesis, stability, and research protocols from the Primetime Biolabs research team.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  let posts: BlogPost[] = [];

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "blog-posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 50,
      depth: 1,
    });
    posts = (result.docs ?? []) as unknown as BlogPost[];
  } catch (err) {
    console.error("Failed to load blog posts:", err);
    posts = [];
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <div className="pt-28 md:pt-36 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="relative text-gray-200 overflow-hidden rounded-[2rem] md:rounded-[3rem] pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 lg:px-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/blog-hero-image.webp"
              alt="Primetime Biolabs research and peptide synthesis"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Localized scrim so the heading stays legible without darkening the whole photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
              Research Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
              Peptide Insights
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed font-light">
              Deep dives into synthesis science, stability protocols, and the latest research on peptide compounds &mdash; written by our research team.
            </p>
          </div>
        </section>
      </div>

      {/* Listing */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-gray-300 rounded-2xl bg-white">
              <FlaskConical className="w-10 h-10 text-gray-400 mb-4" strokeWidth={1.5} />
              <h2 className="text-xl font-michroma uppercase tracking-wider text-gray-900 mb-2">
                No Articles Yet
              </h2>
              <p className="text-gray-500 max-w-md">
                Our research team is preparing new content. Check back soon for insights on peptide synthesis and research protocols.
              </p>
            </div>
          ) : (
            <>
              {/* Latest post — featured */}
              {(() => {
                const [latest, ...rest] = posts;
                const imageUrl = resolveBlogMediaUrl(latest.featuredImage) || placeholderFor(0);
                return (
                  <>
                    <Link
                      href={`/blog/${latest.slug ?? latest.id}`}
                      className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16"
                    >
                      <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
                        <img
                          src={imageUrl}
                          alt={latest.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded uppercase">
                          Latest Post
                        </span>
                        <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-gray-500 uppercase mb-3">
                          {latest.category && <span>{latest.category}</span>}
                          {latest.category && latest.publishedAt && <span>&bull;</span>}
                          {latest.publishedAt && <span>{formatBlogDate(latest.publishedAt)}</span>}
                          {latest.readTime && <span>&bull;</span>}
                          {latest.readTime && <span>{latest.readTime}</span>}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-michroma font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors mb-4">
                          {latest.title}
                        </h2>
                        {latest.excerpt && (
                          <p className="font-inter text-gray-500 leading-relaxed mb-6 line-clamp-3">{latest.excerpt}</p>
                        )}
                        <span className="font-inter inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>

                    {/* Remaining posts */}
                    {rest.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rest.map((post, index) => {
                          const postImageUrl = resolveBlogMediaUrl(post.featuredImage) || placeholderFor(index + 1);
                          return (
                            <Link
                              key={post.id}
                              href={`/blog/${post.slug ?? post.id}`}
                              className="group cursor-pointer flex flex-col"
                            >
                              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                                <img
                                  src={postImageUrl}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none"></div>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">
                                  {post.category && <span>{post.category}</span>}
                                  {post.category && post.publishedAt && <span>&bull;</span>}
                                  {post.publishedAt && <span>{formatBlogDate(post.publishedAt)}</span>}
                                  {post.readTime && <span>&bull;</span>}
                                  {post.readTime && <span>{post.readTime}</span>}
                                </div>
                                <h3 className="text-lg md:text-xl font-inter font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors mb-2">
                                  {post.title}
                                </h3>
                                {post.excerpt && (
                                  <p className="font-inter text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
