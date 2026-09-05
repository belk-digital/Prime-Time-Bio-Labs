import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BlogPostCardData {
  id: string | number;
  tag: string;
  date: string;
  title: string;
  image: string;
  slug: string;
}

const FALLBACK_BLOG_POSTS: BlogPostCardData[] = [
  {
    id: 1,
    tag: "RESEARCH",
    date: "MARCH 6, 2026",
    title: "Breakthroughs in Peptide Synthesis for Next-Gen Therapeutics",
    image: "/blog-1.jpg",
    slug: "breakthroughs-in-peptide-synthesis",
  },
  {
    id: 2,
    tag: "TIPS",
    date: "MARCH 6, 2026",
    title: "Best Practices for Maintaining Peptide Stability in Storage",
    image: "/blog-2.jpg",
    slug: "peptide-stability-storage-best-practices",
  },
  {
    id: 3,
    tag: "SCIENCE",
    date: "MARCH 6, 2026",
    title: "Understanding the Role of GLP-1 Agonists in Metabolic Research",
    image: "/blog-3.jpg",
    slug: "glp1-agonists-in-metabolic-research",
  }
];

interface BlogSectionProps {
  posts?: BlogPostCardData[];
}

const BlogSection = ({ posts }: BlogSectionProps) => {
  const items = posts && posts.length > 0 ? posts : FALLBACK_BLOG_POSTS;

  return (
    <section className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-600 bg-indigo-100 border border-indigo-200 rounded uppercase">
              Blog
            </div>
            <h2 className="text-3xl md:text-4xl font-michroma font-bold text-gray-900 tracking-wider uppercase">
              Latest in Peptide Synthesis
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors rounded-lg w-fit">
            See More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer flex flex-col">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">
                  <span>{post.tag}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg md:text-xl font-inter font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
