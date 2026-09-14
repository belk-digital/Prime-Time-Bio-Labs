"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface CategoryCardData {
  id: string | number;
  name: string;
  slug: string;
  image: string;
}

import { CATEGORY_IMAGE_MAP } from "@/lib/categoryImages";
import { getCategoryDescription, getCategoryDisplayName } from "@/lib/categoryDescriptions";

const FALLBACK_CATEGORIES: CategoryCardData[] = Object.entries(CATEGORY_IMAGE_MAP).map(
  ([name, image], index) => ({
    id: index + 1,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    image,
  })
);

interface CategoriesSectionProps {
  categories?: CategoryCardData[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const items = categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  useGSAP(() => {
    gsap.fromTo(".category-heading",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(".category-card",
      { y: 30, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 category-heading">
          <div>
            <h2 className="text-3xl md:text-5xl font-michroma font-bold uppercase tracking-wider mb-4">
              Shop Research Peptides <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">by Category</span>
            </h2>
            <p className="font-inter text-gray-600 max-w-lg text-base">
              We organise the catalogue by research application, so you can move straight to the compound class you need. Every category page carries the same purity standard, the same independent testing protocol and the same COA on each batch.
            </p>
          </div>
          <Link href="/shop" className="mt-6 md:mt-0 flex items-center gap-2 text-sm uppercase tracking-widest text-indigo-600 font-bold hover:text-indigo-800 transition-colors group">
            Browse the Full Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((category) => (
            <Link
              href={`/shop?category=${category.slug}`}
              key={category.id}
              className="category-card group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex items-center p-4 pr-6 gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-inter font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {getCategoryDisplayName(category.name)}
                  </h3>
                  {getCategoryDescription(category.name) && (
                    <p className="font-inter text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                      {getCategoryDescription(category.name)}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
