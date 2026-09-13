"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatAreResearchPeptidesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".warp-block",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="warp-block mb-10">
          <h2 className="text-3xl md:text-5xl font-michroma font-bold uppercase tracking-wider mb-6">
            What Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Research Peptides?</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
            Research peptides are short chains of amino acids, typically between two and fifty residues,
            manufactured for laboratory study rather than clinical use. Laboratories use them in in-vitro assays,
            receptor-binding studies and analytical method development. Because they are research reagents, they
            are not drugs, supplements or cosmetics, and carry no approval for human or veterinary administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="warp-block">
            <h3 className="text-lg md:text-xl font-michroma uppercase tracking-wider text-gray-900 mb-3">
              How Research Peptides Are Synthesised
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Nearly all modern research peptides come from solid-phase peptide synthesis, or SPPS. The method
              builds the chain one amino acid at a time on a solid resin support. Chemists then cleave it, purify
              it by preparative chromatography and freeze-dry it into a lyophilised powder.
              <br />
              <br />
              Synthesis alone never guarantees purity — analysis establishes it. Every reputable supplier runs
              analytical HPLC to quantify purity, then mass spectrometry to confirm molecular identity. Both
              results belong on the{" "}
              <Link href="/certificates" className="text-indigo-600 font-medium hover:underline">
                Certificate of Analysis
              </Link>{" "}
              that accompanies the batch.
            </p>
          </div>

          <div className="warp-block">
            <h3 className="text-lg md:text-xl font-michroma uppercase tracking-wider text-gray-900 mb-3">
              Who Buys Research Peptides
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Our accounts include university laboratories, contract research organisations, independent
              analytical labs and private research groups. We also supply formulation scientists who need
              reference material for method validation and comparison work.
              <br />
              <br />
              What these buyers share is a documentation requirement: a traceable batch number and a purity
              figure from an independent laboratory, reproducible on request. We archive every COA we issue and
              make it{" "}
              <Link href="/certificates" className="text-indigo-600 font-medium hover:underline">
                retrievable by batch number
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
