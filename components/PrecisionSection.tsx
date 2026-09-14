"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure to register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function PrecisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // We create a scrubbed timeline that pins the section for 200% of the viewport height.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Increased scroll distance to make everything slower
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // 0. Slowly reveal the background over the entire scroll
      tl.to(bgRef.current, {
        opacity: 1,
        duration: 6,
        ease: "none"
      }, 0);

      // 1. Fade in tags sequentially (spaced out based on scroll)
      tagsRef.current.forEach((tag) => {
        tl.to(tag, {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "back.out(1.2)"
        }, "+=0.5"); // Positive offset means wait before the next one starts
      });
      
      // 3. Add empty space at the end so it holds the final state before unpinning
      tl.to({}, { duration: 1 });
    });
  }, { scope: containerRef });

  const tags = [
    { text: "≥99% Purity Verified", style: { top: "28%", left: "8%" }, mobileStyle: { top: "18%", left: "2%" } },
    { text: "Third-Party Tested", style: { top: "12%", left: "50%", marginLeft: "-90px" }, mobileStyle: { top: "8%", left: "50%", marginLeft: "-55px" } },
    { text: "Research Grade", style: { top: "26%", right: "8%" }, mobileStyle: { top: "24%", right: "2%" } },
    { text: "Fast USA Shipping", style: { bottom: "25%", left: "12%" }, mobileStyle: { bottom: "20%", left: "2%" } },
    { text: "Secure Checkout", style: { bottom: "30%", right: "10%" }, mobileStyle: { bottom: "26%", right: "2%" } }
  ];

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] md:h-screen py-24 md:py-0 bg-[#020202] overflow-hidden flex flex-col items-center justify-center text-white">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src="/sillouhette-bg.png" 
          alt="Peptide Silhouette" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-100 md:opacity-0" 
        />
      </div>

      {/* Animated SVG Rings (using framer motion for infinite smooth loop) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-90 drop-shadow-[0_0_12px_rgba(192,192,192,0.5)]">
        <svg
          className="absolute min-w-[200vw] min-h-[200vh] md:min-w-[150vw] md:min-h-[150vh]"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ring */}
          <motion.circle
            cx="500"
            cy="500"
            r="440"
            fill="none"
            stroke="rgba(210, 210, 210, 0.8)"
            strokeWidth="1.5"
            strokeDasharray="500 800"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Middle Ring 1 */}
          <motion.circle
            cx="500"
            cy="500"
            r="340"
            fill="none"
            stroke="rgba(210, 210, 210, 0.5)"
            strokeWidth="1.0"
            initial={{ rotate: 360 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {/* Middle Ring 2 - Dashed */}
          <motion.circle
            cx="500"
            cy="500"
            r="260"
            fill="none"
            stroke="rgba(210, 210, 210, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="150 250 80 200"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
        </svg>
      </div>

      {/* Floating Tags (Desktop - Animated) */}
      <div className="absolute inset-0 z-10 pointer-events-none max-w-7xl mx-auto w-full h-full hidden md:block">
        {tags.map((tag, i) => (
          <div
            key={i}
            ref={(el) => { tagsRef.current[i] = el; }}
            className="absolute bg-[#181818] border border-white/5 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur-sm opacity-0"
            style={{ ...tag.style, transform: "scale(0.8)" }}
          >
            <div className="w-1.5 h-1.5 bg-[#555] rounded-sm" />
            <span className="text-sm font-bold tracking-wider uppercase text-gray-300 whitespace-nowrap">{tag.text}</span>
          </div>
        ))}
      </div>

      {/* Floating Tags (Mobile - Static) */}
      <div className="absolute inset-0 z-10 pointer-events-none w-full h-full block md:hidden">
        {tags.map((tag, i) => (
          <div
            key={`mobile-${i}`}
            className="absolute bg-[#181818] border border-white/5 px-2 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xl backdrop-blur-sm"
            style={{ ...tag.mobileStyle, transform: "scale(0.85)" }}
          >
            <div className="w-1 h-1 bg-[#555] rounded-sm" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-300 whitespace-nowrap">{tag.text}</span>
          </div>
        ))}
      </div>

        {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto mt-20 md:mt-0">
        <p
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 md:mb-6 leading-tight uppercase"
        >
          Precision in Every Peptide.
        </p>
      </div>
    </section>
  );
}
