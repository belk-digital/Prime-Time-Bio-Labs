"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import ShopProductCard from "@/components/shop/ShopProductCard";
import type { ShopMockProduct } from "@/lib/shopCardProduct";

gsap.registerPlugin(ScrollTrigger);

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const STATS = [
  { value: "99%", label: "Purity Guarantee", icon: ShieldCheck },
  { value: "30K+", label: "Vials Shipped to U.S. Labs", icon: Sparkles },
  { value: "100%", label: "Batches COA-Verified", icon: FlaskConical },
];

function ShopClientInner({
  products,
  categories,
}: {
  products: ShopMockProduct[];
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter state lives in the URL (?category=…&sort=…&q=…), so the back button, reloads and shared
  // links keep it. The nav mega menu links with a category *slug*, while the pills use the category
  // *name*, so both are matched on a normalized slug.
  const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam
    ? categories.find((c) => slugify(c) === slugify(categoryParam)) ?? null
    : null;
  const sort = (searchParams.get("sort") as SortKey | null) ?? "featured";
  const queryParam = searchParams.get("q") ?? "";
  const [searchText, setSearchText] = useState(queryParam);

  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const setActiveCategory = (category: string | null) => updateParams({ category: category ? slugify(category) : null });

  // Debounce typing into the search box before it hits the URL.
  useEffect(() => {
    if (searchText === queryParam) return;
    const t = setTimeout(() => updateParams({ q: searchText.trim() || null }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const filteredProducts = useMemo(() => {
    let list = activeCategory ? products.filter((p) => p.category === activeCategory) : products;
    const q = queryParam.trim().toLowerCase();
    if (q) list = list.filter((p) => `${p.name} ${p.category} ${p.type}`.toLowerCase().includes(q));
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, activeCategory, queryParam, sort]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".shop-heading",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.1 }
      );
      gsap.fromTo(
        ".product-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    },
    { scope: sectionRef, dependencies: [filteredProducts.length] }
  );

  return (
    <main ref={sectionRef} className="min-h-screen bg-[#FAFAFA] text-gray-900">
      {/* Hero */}
      <div className="pt-28 md:pt-36 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="relative text-gray-200 overflow-hidden rounded-[2rem] md:rounded-[3rem] pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 lg:px-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/shop-banner-image.png"
              alt="Primetime Biolabs research facility"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Faint overall scrim so the photo still reads through around the text panel below */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Backdrop-blurred panel behind the text — the photo has its own printed labels/text,
              so a translucent scrim alone can't guarantee contrast against arbitrary photo content;
              blurring what's directly behind the text (rather than the whole hero) does. */}
          <div className="relative z-10 max-w-4xl -m-4 p-4 sm:-m-6 sm:p-6 rounded-2xl bg-black/55 backdrop-blur-md">
            <div className="shop-heading inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
              Shop
            </div>
            <h1 className="shop-heading text-3xl sm:text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-4 md:mb-6">
              Shop Peptides
            </h1>
            <p className="shop-heading text-gray-300 text-sm md:text-lg max-w-2xl leading-relaxed font-light">
              Browse our full catalog of research-grade peptides. Every batch is third-party tested for purity and
              backed by a Certificate of Analysis you can review before you order.
            </p>
          </div>
        </section>
      </div>

      {/* Catalog */}
      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] pt-12 pb-10 mx-auto">

        {/* Stats row */}
        <div className="shop-heading grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 flex items-center justify-between border border-black/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-michroma font-bold text-gray-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Category pills */}
        <div className="shop-heading sticky top-24 z-30 mb-10">
          <div className="w-full overflow-x-auto no-scrollbar bg-white/95 backdrop-blur-lg border border-black/5 shadow-sm rounded-2xl p-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shrink-0 ${
                activeCategory === null
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search + sort */}
        <div className="shop-heading flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search peptides"
            aria-label="Search peptides"
            className="font-inter flex-1 bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
          />
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value === "featured" ? null : e.target.value })}
            aria-label="Sort products"
            className="font-inter bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-indigo-500/50"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="shop-heading flex flex-col items-center justify-center text-center py-24 border border-dashed border-gray-200 rounded-2xl bg-white">
            <FlaskConical className="w-10 h-10 text-gray-300 mb-4" strokeWidth={1} />
            <h3 className="text-xl font-michroma uppercase tracking-wide text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-400 max-w-sm text-sm">
              {queryParam
                ? `Nothing matches "${queryParam}". Try a different search or browse all products.`
                : "No products found in this category. Try browsing all products instead."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function ShopClient({
  products,
  categories,
}: {
  products: ShopMockProduct[];
  categories: string[];
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <ShopClientInner products={products} categories={categories} />
    </Suspense>
  );
}
