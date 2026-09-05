"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import ShopProductCard, { type ShopMockProduct } from "@/components/shop/ShopProductCard";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_IMAGE = "/product-card-image.png";

// Placeholder catalog for the shop redesign — real product data will be wired back in later.
const MOCK_PRODUCTS: ShopMockProduct[] = [
  { id: "1", name: "Retatrutide", slug: "retatrutide", description: "Triple GIP/GLP-1/glucagon receptor agonist studied for its effects on metabolic pathways and body composition.", dosageOptions: ["5MG", "10MG", "15MG"], purity: "99%+ Purity", type: "Research Grade Peptide", price: 149.99, image: PLACEHOLDER_IMAGE, featured: true, category: "GLP-1 & Metabolic" },
  { id: "2", name: "Tirzepatide", slug: "tirzepatide", description: "Dual GIP and GLP-1 receptor agonist researched for synergistic effects on glucose homeostasis.", dosageOptions: ["5MG", "10MG", "15MG"], purity: "99.9% Purity", type: "Research Grade Peptide", price: 129.99, image: PLACEHOLDER_IMAGE, featured: false, category: "GLP-1 & Metabolic" },
  { id: "3", name: "Semaglutide", slug: "semaglutide", description: "GLP-1 receptor agonist widely studied for glycemic control and weight management research.", dosageOptions: ["2MG", "5MG", "10MG"], purity: "99.5% Purity", type: "Research Grade Peptide", price: 99.99, image: PLACEHOLDER_IMAGE, featured: false, category: "GLP-1 & Metabolic" },
  { id: "4", name: "BPC-157", slug: "bpc-157", description: "Synthetic peptide derived from a protective stomach protein, studied for tissue repair and gut healing.", dosageOptions: ["5MG", "10MG"], purity: "99%+ Purity", type: "Healing Peptide", price: 79.99, image: PLACEHOLDER_IMAGE, featured: false, category: "Healing & Recovery" },
  { id: "5", name: "TB-500", slug: "tb-500", description: "Synthetic fraction of thymosin beta-4, researched for its potential to promote healing and reduce inflammation.", dosageOptions: ["5MG", "10MG"], purity: "99%+ Purity", type: "Healing Peptide", price: 84.99, image: PLACEHOLDER_IMAGE, featured: false, category: "Healing & Recovery" },
  { id: "6", name: "CJC-1295 / Ipamorelin", slug: "cjc-1295-ipamorelin-blend", description: "Blend of CJC-1295 and Ipamorelin studied together for amplified pulsatile growth hormone release.", dosageOptions: ["5/5MG", "10/10MG"], purity: "99%+ Purity", type: "Growth Hormone Secretagogue", price: 89.99, image: PLACEHOLDER_IMAGE, featured: false, category: "Growth Hormone Secretagogue" },
  { id: "7", name: "Selank Nasal Spray", slug: "selank-nasal-spray", description: "Synthetic peptide analog studied for anxiolytic and nootropic properties in a nasal spray format.", dosageOptions: ["10ML"], purity: "99%+ Purity", type: "Nasal Spray", price: 64.99, image: PLACEHOLDER_IMAGE, featured: false, category: "Nasal Sprays" },
  { id: "8", name: "Epithalon", slug: "epithalon", description: "Synthetic tetrapeptide studied for its potential role in telomerase activation and longevity research.", dosageOptions: ["10MG", "20MG"], purity: "99%+ Purity", type: "Longevity Peptide", price: 74.99, image: PLACEHOLDER_IMAGE, featured: false, category: "Longevity & Anti-Aging" },
];

const CATEGORIES = [
  "GLP-1 & Metabolic",
  "Healing & Recovery",
  "Peptide Bundles",
  "Nasal Sprays",
  "Cosmetic & Skin",
  "Sexual & Hormonal",
  "Growth Hormone Secretagogue",
  "Cognitive & Nootropic",
  "Longevity & Anti-Aging",
];

const STATS = [
  { value: "99%", label: "Purity Guarantee", icon: ShieldCheck },
  { value: "30K+", label: "Vials Shipped to U.S. Labs", icon: Sparkles },
  { value: "100%", label: "Batches COA-Verified", icon: FlaskConical },
];

function ShopClientInner() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Deep-link support for the nav mega menu, which links to /shop?category=<slug>.
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setActiveCategory(category);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
            {/* Localized scrim so the heading stays legible without darkening the whole photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="shop-heading inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
              Shop
            </div>
            <h1 className="shop-heading text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
              Shop Peptides
            </h1>
            <p className="shop-heading text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed font-light">
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
            {CATEGORIES.map((category) => {
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

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="shop-heading flex flex-col items-center justify-center text-center py-24 border border-dashed border-gray-200 rounded-2xl bg-white">
            <FlaskConical className="w-10 h-10 text-gray-300 mb-4" strokeWidth={1} />
            <h3 className="text-xl font-michroma uppercase tracking-wide text-gray-700 mb-2">No Products Yet</h3>
            <p className="text-gray-400 max-w-sm text-sm">
              No products found in this category. Try browsing all products instead.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
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

export default function ShopClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <ShopClientInner />
    </Suspense>
  );
}
