"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, FlaskConical, CheckCircle2, Truck, Flag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FlaskConical className="w-8 h-8 text-indigo-500" />,
    topRightText: "VERIFIED\nPURITY",
    titleMain: "99%+",
    titleMainColor: "text-indigo-600 text-4xl mb-1",
    titleSub: "GUARANTEED PURITY",
    description: "Every batch undergoes rigorous HPLC and MS testing to ensure absolute purity and consistency.",
    badges: ["HPLC TESTED", "MS VERIFIED", "BATCH CERTIFIED"]
  },
  {
    icon: <Flag className="w-8 h-8 text-indigo-500" />,
    topRightText: "AMERICAN\nSYNTHESIS",
    titleMain: "SYNTHESIZED",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "IN THE USA",
    description: "All our research peptides are synthesized in state-of-the-art American laboratory facilities.",
    badges: ["USA MADE", "cGMP FACILITY", "LAB TESTED"]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
    topRightText: "QUALITY\nASSURED",
    titleMain: "STRICT QUALITY",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "CONTROL",
    description: "We employ strict multi-stage quality control protocols to meet the highest scientific standards.",
    badges: ["MULTI-STAGE QC", "STANDARDIZED", "RELIABLE"]
  },
  {
    icon: <Truck className="w-8 h-8 text-indigo-500" />,
    topRightText: "SECURE\nDELIVERY",
    titleMain: "COLD-CHAIN",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "SHIPPING",
    description: "Temperature-controlled logistics ensure your research materials arrive stable and intact.",
    badges: ["TEMP CONTROLLED", "SECURE PACKAGING", "RELIABLE DELIVERY"]
  }
];

export default function QualitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".quality-card",
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );

    gsap.fromTo(".quality-bg",
      { scale: 1.1, opacity: 0.5 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        scale: 1,
        opacity: 1,
        ease: "none"
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center min-h-screen"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/quality and standards bg.png" 
          alt="Quality Background" 
          className="quality-bg w-full h-full object-cover object-center"
        />
        {/* Subtle overlay to ensure cards pop */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="quality-card bg-white/95 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/40 flex flex-col h-full justify-between"
            >
              {/* Card Header: Icon & Top Right Text */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-50/50 rounded-xl">
                  {feature.icon}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase whitespace-pre-line leading-tight block">
                    {feature.topRightText}
                  </span>
                </div>
              </div>

              {/* Card Title */}
              <div className="mb-4 mt-auto">
                <h3 className={`font-bold tracking-tight ${feature.titleMainColor}`}>
                  {feature.titleMain}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 tracking-wide leading-tight">
                  {feature.titleSub}
                </h4>
                {/* Separator Line */}
                <div className="w-10 h-0.5 bg-indigo-500/30 mt-4 rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {feature.badges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-1 bg-gray-50 px-1.5 py-1 rounded-md border border-gray-100">
                    <CheckCircle2 className="w-[10px] h-[10px] text-indigo-400" />
                    <span className="text-[8px] font-bold text-gray-500 tracking-wider uppercase">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
