"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "GLP-1 & Metabolic", image: "/images/categories/glp1.jpg" },
  { name: "Healing & Recovery", image: "/images/categories/healing.jpg" },
  { name: "Peptide Bundles", image: "/images/categories/bundles.jpg" },
  { name: "Nasal Sprays", image: "/images/categories/spray.jpg" },
  { name: "Cosmetic & Skin", image: "/images/categories/skin.jpg" },
  { name: "Sexual & Hormonal", image: "/images/categories/hormonal.jpg" },
  { name: "Growth Hormone Secretagogue", image: "/images/categories/growth.jpg" },
  { name: "Cognitive & Nootropic", image: "/images/categories/brain.jpg" },
  { name: "Longevity & Anti-Aging", image: "/images/categories/longevity.jpg" },
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Categories</span>
            </h2>
            <p className="text-gray-600 max-w-lg text-base">
              Browse our comprehensive selection of high-purity research compounds categorized by scientific application.
            </p>
          </div>
          <button className="mt-6 md:mt-0 flex items-center gap-2 text-sm uppercase tracking-widest text-indigo-600 font-bold hover:text-indigo-800 transition-colors group">
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex items-center p-4 pr-6 gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
