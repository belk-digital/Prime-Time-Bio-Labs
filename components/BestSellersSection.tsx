"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ShopProductCard from "@/components/shop/ShopProductCard";
import type { ShopMockProduct } from "@/lib/shopCardProduct";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE = "/product-card-image.png";

const FALLBACK_PRODUCTS: ShopMockProduct[] = [
  {
    id: "1",
    name: "Retatrutide",
    slug: "retatrutide",
    description:
      "Triple GIP/GLP-1/glucagon receptor agonist studied for its effects on metabolic pathways and body composition.",
    dosageOptions: ["5MG", "10MG", "15MG"],
    purity: "99%+ Purity",
    type: "Research Grade Peptide",
    price: 149.99,
    image: FALLBACK_IMAGE,
    featured: true,
    category: "GLP-1 & Metabolic",
  },
  {
    id: "2",
    name: "Tirzepatide",
    slug: "tirzepatide",
    description:
      "Dual GIP and GLP-1 receptor agonist researched for synergistic effects on glucose homeostasis.",
    dosageOptions: ["5MG", "10MG", "15MG"],
    purity: "99.9% Purity",
    type: "Research Grade Peptide",
    price: 129.99,
    image: FALLBACK_IMAGE,
    featured: false,
    category: "GLP-1 & Metabolic",
  },
  {
    id: "3",
    name: "Semaglutide",
    slug: "semaglutide",
    description: "GLP-1 receptor agonist widely studied for glycemic control and weight management research.",
    dosageOptions: ["2MG", "5MG", "10MG"],
    purity: "99.5% Purity",
    type: "Research Grade Peptide",
    price: 99.99,
    image: FALLBACK_IMAGE,
    featured: false,
    category: "GLP-1 & Metabolic",
  },
  {
    id: "4",
    name: "BPC-157",
    slug: "bpc-157",
    description:
      "Synthetic peptide derived from a protective stomach protein, studied for tissue repair and gut healing.",
    dosageOptions: ["5MG", "10MG"],
    purity: "99%+ Purity",
    type: "Healing Peptide",
    price: 79.99,
    image: FALLBACK_IMAGE,
    featured: false,
    category: "Healing & Recovery",
  },
];

interface BestSellersSectionProps {
  products?: ShopMockProduct[];
}

export default function BestSellersSection({ products }: BestSellersSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const items = products && products.length > 0 ? products : FALLBACK_PRODUCTS;

  useGSAP(
    () => {
      gsap.fromTo(
        ".product-card",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".bs-title",
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-12 bg-[#020202] text-white overflow-hidden">
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="bs-title">
            <h2 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider mb-4">
              Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Sellers</span>
            </h2>
            <p className="text-gray-400 max-w-lg font-light text-sm md:text-base">
              Explore our most sought-after research peptides, engineered for maximum purity and exceptional scientific results.
            </p>
          </div>
          <Link href="/shop" className="bs-title mt-6 md:mt-0 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors group">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button className="hidden md:flex shrink-0 items-center justify-center text-gray-500 hover:text-white transition-colors z-10">
            <ChevronLeft className="w-12 h-12" strokeWidth={1} />
          </button>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {items.map((product) => (
              <ShopProductCard key={product.id} product={product} variant="light" />
            ))}
          </div>

          {/* Right Arrow */}
          <button className="hidden md:flex shrink-0 items-center justify-center text-gray-500 hover:text-white transition-colors z-10">
            <ChevronRight className="w-12 h-12" strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
}
