"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cta-content > *", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12 bg-white">
      <div ref={containerRef} className="max-w-7xl mx-auto w-full relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/cta-banner.png" 
            alt="Call to Action Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 cta-content py-10 px-8 md:py-16 md:px-12 lg:py-20 lg:px-16 flex flex-col items-start text-left text-white max-w-2xl">
          <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Accelerate Your Discoveries
          </h2>
          <h3 className="text-4xl md:text-5xl font-michroma font-bold leading-tight mb-6 uppercase tracking-wider">
            Ready to Elevate Your Research?
          </h3>
          <p className="text-gray-300 leading-relaxed mb-10 text-lg">
            Experience the difference that 99.9% purity can make. Browse our complete catalog of research-grade peptides, synthesized and tested in the USA.
          </p>
          <button className="flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors group">
            Shop Our Catalog
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
