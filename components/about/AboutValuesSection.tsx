"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Microscope, ShieldCheck, Users, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FlaskConical className="w-8 h-8 text-indigo-500" />,
    topRightText: "SOLID-PHASE\nSYNTHESIS",
    titleMain: "SPPS",
    titleMainColor: "text-indigo-600 text-4xl mb-1",
    titleSub: "PRECISION SYNTHESIS",
    description:
      "Every batch is synthesized using state-of-the-art solid-phase peptide synthesis techniques, engineered for consistency and reproducibility.",
    badges: ["CONSISTENT", "REPRODUCIBLE", "STANDARDIZED"],
  },
  {
    icon: <Microscope className="w-8 h-8 text-indigo-500" />,
    topRightText: "HPLC & MS\nANALYSIS",
    titleMain: "THIRD-PARTY",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "RIGOROUS TESTING",
    description:
      "All products undergo third-party HPLC and mass spectrometry analysis to verify purity, identity, and concentration before release.",
    badges: ["HPLC TESTED", "MS VERIFIED", "BATCH CERTIFIED"],
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
    topRightText: "CERTIFICATE\nOF ANALYSIS",
    titleMain: "COA",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "QUALITY ASSURANCE",
    description:
      "Our quality control processes meet stringent standards, with a Certificate of Analysis provided for every batch we produce.",
    badges: ["COA PROVIDED", "MULTI-STAGE QC", "RELIABLE"],
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-500" />,
    topRightText: "LAB\nPARTNERSHIPS",
    titleMain: "DIRECT",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "RESEARCH PARTNERSHIP",
    description:
      "We work directly with laboratories and research institutions to understand their exact specifications and support their scientific goals.",
    badges: ["CUSTOM SPECS", "DEDICATED SUPPORT", "COLLABORATIVE"],
  },
];

export default function AboutValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".value-card",
        { y: 100, opacity: 0 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".value-bg",
        { scale: 1.1 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
          scale: 1,
          ease: "none",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-white">
        <img
          src="/quality and standards bg.png"
          alt="Quality Background"
          className="value-bg w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto">
        <h2 className="value-card text-3xl md:text-4xl font-michroma font-bold text-gray-900 tracking-wider uppercase text-center mb-16">
          What Sets Us Apart
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="value-card bg-white/95 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/40 flex flex-col h-full justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-50/50 rounded-xl">{feature.icon}</div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase whitespace-pre-line leading-tight block">
                    {feature.topRightText}
                  </span>
                </div>
              </div>

              <div className="mb-4 mt-auto">
                <h3 className={`font-bold tracking-tight ${feature.titleMainColor}`}>{feature.titleMain}</h3>
                <h4 className="text-lg font-semibold text-gray-800 tracking-wide leading-tight">
                  {feature.titleSub}
                </h4>
                <div className="w-10 h-0.5 bg-indigo-500/30 mt-4 rounded-full" />
              </div>

              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-6">{feature.description}</p>

              <div className="flex flex-wrap gap-1 mt-auto">
                {feature.badges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-1 bg-gray-50 px-1.5 py-1 rounded-md border border-gray-100">
                    <CheckCircle2 className="w-[10px] h-[10px] text-indigo-400" />
                    <span className="text-[8px] font-bold text-gray-500 tracking-wider uppercase">{badge}</span>
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
