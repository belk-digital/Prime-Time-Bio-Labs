"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrecisionSection from "@/components/PrecisionSection";
import GenomicsSection from "@/components/GenomicsSection";
import BestSellersSection from "@/components/BestSellersSection";
import QualitySection from "@/components/QualitySection";
import FAQSection from "@/components/FAQSection";
import CategoriesSection, { type CategoryCardData } from "@/components/CategoriesSection";
import MilitaryDiscountSection from "@/components/MilitaryDiscountSection";
import BlogSection, { type BlogPostCardData } from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import type { ShopMockProduct } from "@/lib/shopCardProduct";

gsap.registerPlugin(ScrollTrigger);

interface HomeClientProps {
  products: ShopMockProduct[];
  categories: CategoryCardData[];
  posts: BlogPostCardData[];
}

export default function HomeClient({ products, categories, posts }: HomeClientProps) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".gsap-hero", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2,
    });

    // About section animations
    gsap.from(".gsap-about-text", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".gsap-about-image", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative w-full font-futuristic bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden flex flex-col pt-24 md:pt-32">
        {/* User uploaded background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 mix-blend-luminosity"
          />
          {/* Top Overlay for Navigation visibility */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/90 to-transparent" />

          {/* Bottom Overlay for Text readability */}
          <div className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-4 pb-4 md:px-8 lg:px-12 md:pb-6 overflow-y-auto">
          {/* Top Section of Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full mt-8 md:mt-12">
            {/* Left List */}
            <div className="gsap-hero hidden md:flex flex-col gap-3 font-mono text-xs tracking-wider text-gray-400 uppercase">
              <p className="flex items-center gap-3">
                <span className="text-white/40">/</span> CUSTOM SYNTHESIS
              </p>
              <p className="flex items-center gap-3">
                <span className="text-white/40">/</span> PURITY ANALYSIS
              </p>
              <p className="flex items-center gap-3">
                <span className="text-white/40">/</span> RESEARCH PEPTIDES
              </p>
            </div>

            {/* Right Description Text */}
            <div className="gsap-hero max-w-md mt-0 text-left md:text-right">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                Premium-grade, 99%+ purity peptides engineered for breakthrough research and scientific excellence.
              </p>
            </div>
          </div>

          {/* Bottom Section of Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-4 md:mb-8">
            {/* Main Title Area */}
            <div className="gsap-hero max-w-2xl mb-12 md:mb-0">
              <div className="hidden md:inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-white bg-white/10 border border-white/10 rounded backdrop-blur-sm uppercase">
                We Supply 100+ Research Labs
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-michroma uppercase tracking-wider text-white leading-[1.2]">
                Pure. Precise.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  Peptides.
                </span>
              </h1>
            </div>

            {/* Featured Product Card */}
            <div className="gsap-hero hidden md:flex w-full md:w-[440px]">
              <div className="p-4 bg-[#111111]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl flex flex-row items-stretch gap-5 group w-full">
                {/* Left side: Image */}
                <div className="w-2/5 aspect-square rounded-xl overflow-hidden relative shrink-0">
                  <img
                    src="/product-card-image.png"
                    alt="Retatrutide"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Right side: Details */}
                <div className="flex flex-col w-3/5 justify-between py-1 pr-1">
                  <div>
                    <div className="mb-3">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 rounded uppercase">
                        Featured
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg text-white font-medium font-michroma leading-tight">Retatrutide</h3>
                      <span className="text-white font-light text-sm ml-2">10mg</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Research Grade Peptide
                    </p>
                  </div>
                  <Link
                    href="/product/retatrutide"
                    className="flex items-center justify-between w-full px-4 py-2 mt-4 text-xs text-black bg-white hover:bg-gray-200 transition-colors rounded-lg font-medium"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <BestSellersSection products={products} />

      {/* About Section */}
      <section className="about-section bg-white text-gray-900 py-24 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <h2 className="gsap-about-text text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">About Primetime Biolabs</h2>
          <h3 className="gsap-about-text text-4xl md:text-5xl font-michroma font-bold leading-tight mb-6 uppercase tracking-wider">Pioneering the Future of Peptide Synthesis</h3>
          <p className="gsap-about-text text-gray-600 leading-relaxed mb-6">
            At Primetime Biolabs, we are dedicated to pushing the boundaries of scientific research by providing the highest purity peptides available on the market. Our state-of-the-art laboratory facilities and stringent quality control processes ensure that every product we synthesize meets the exacting standards required for breakthrough discoveries.
          </p>
          <p className="gsap-about-text text-gray-600 leading-relaxed mb-8">
            Whether you are conducting complex cellular assays or developing next-generation therapeutics, our precision-engineered solutions deliver the reliability and consistency your research demands. Partner with us to accelerate your scientific endeavors.
          </p>
          <Link
            href="/about-us"
            className="gsap-about-text inline-block px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors"
          >
            Learn More About Our Lab
          </Link>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="gsap-about-image relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/about-image.jpg"
              alt="Primetime Biolabs Research Facility"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 border border-black/10 rounded-2xl pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Precision Section */}
      <PrecisionSection />

      {/* Military & Veteran Discount */}
      <MilitaryDiscountSection />

      {/* Quality & Standards Section */}
      <QualitySection />

      {/* Genomics Section */}
      <GenomicsSection />


      {/* Blog Section */}
      <BlogSection posts={posts} />

      {/* FAQ Section */}
      <FAQSection />



      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
