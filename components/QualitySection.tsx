"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, FlaskConical, Microscope, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "99%+ Guaranteed Purity",
    description: "Every batch undergoes rigorous HPLC and MS testing to ensure absolute purity and consistency.",
    icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />
  },
  {
    title: "Synthesized in the USA",
    description: "All our research peptides are synthesized in state-of-the-art American laboratory facilities.",
    icon: <FlaskConical className="w-8 h-8 text-indigo-600" />
  },
  {
    title: "Strict Quality Control",
    description: "We employ strict multi-stage quality control protocols to meet the highest scientific standards.",
    icon: <Microscope className="w-8 h-8 text-indigo-600" />
  },
  {
    title: "Cold-Chain Shipping",
    description: "Temperature-controlled logistics ensure your research materials arrive stable and intact.",
    icon: <Truck className="w-8 h-8 text-indigo-600" />
  }
];

export default function QualitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".quality-heading",
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

    gsap.fromTo(".quality-card",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 quality-heading">
          <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">Uncompromising Standards</h2>
          <h3 className="text-3xl md:text-5xl font-michroma font-bold uppercase tracking-wider mb-6">
            The Gold Standard in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Peptide Synthesis</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            We don't cut corners. Our commitment to absolute quality ensures your research yields reliable, reproducible data every single time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="quality-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
