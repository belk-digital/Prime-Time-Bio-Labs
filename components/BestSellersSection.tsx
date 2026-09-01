"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Retatrutide",
    dosage: "10MG",
    purity: "99%+ Purity",
    type: "Research Grade Peptide",
    price: "$149.99",
    image: "/product-retatrutide.png",
    featured: true,
  },
  {
    id: 2,
    name: "Tirzepatide",
    dosage: "10MG",
    purity: "99.9% Purity",
    type: "Research Grade Peptide",
    price: "$129.99",
    image: "/product-retatrutide.png",
    featured: false,
  },
  {
    id: 3,
    name: "Semaglutide",
    dosage: "5MG",
    purity: "99.5% Purity",
    type: "Research Grade Peptide",
    price: "$99.99",
    image: "/product-retatrutide.png",
    featured: false,
  },
  {
    id: 4,
    name: "BPC-157",
    dosage: "5MG",
    purity: "99%+ Purity",
    type: "Healing Peptide",
    price: "$79.99",
    image: "/product-retatrutide.png",
    featured: false,
  }
];

export default function BestSellersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".product-card", 
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
    
    gsap.fromTo(".bs-title", 
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
  }, { scope: sectionRef });

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
          <button className="bs-title mt-6 md:mt-0 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors group">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button className="hidden md:flex shrink-0 items-center justify-center text-gray-500 hover:text-white transition-colors z-10">
            <ChevronLeft className="w-12 h-12" strokeWidth={1} />
          </button>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="product-card group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle gradient glow behind the image on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {product.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="relative h-48 mb-6 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium font-michroma leading-tight text-gray-100">{product.name}</h3>
                    <span className="text-sm font-mono text-gray-400">{product.dosage}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">{product.type}</p>
                  
                  <div className="flex items-center gap-2 mb-6 mt-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    <span className="text-xs font-medium text-gray-300">{product.purity}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xl font-light text-white">{product.price}</span>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all duration-300">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
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
