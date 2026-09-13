"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GenomicsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(textRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(topTextRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(imageRef.current,
      { y: 150, opacity: 0, filter: "blur(20px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
      "-=1"
    )
    .fromTo(toggleRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
      "-=1"
    );



  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] md:h-screen bg-[#020202] text-white overflow-hidden flex flex-col font-sans">
      
      {/* Background Masked Blur Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Right Image */}
      <div 
        className="absolute right-0 bottom-0 h-full w-full flex items-end justify-end pointer-events-none z-10"
      >
         <img 
           ref={imageRef}
           src="/gloves-holding-vial.png" 
           alt="Holding Vial" 
           className="h-[60%] sm:h-[70%] md:h-[90%] w-auto object-contain object-right-bottom translate-x-[2%]"
         />
         {/* Smooth bottom blur */}
         <div 
           className="absolute bottom-0 left-0 w-full h-[20%] backdrop-blur-md z-10" 
           style={{ WebkitMaskImage: 'linear-gradient(to top, black, transparent)', maskImage: 'linear-gradient(to top, black, transparent)' }}
         ></div>
         {/* Vertical fading for bottom edge */}
         <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-20"></div>
      </div>

      <div className="relative z-10 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto px-6 flex flex-col md:flex-row items-center justify-between h-full pt-16">
        
        {/* Top Center text */}
        <div ref={topTextRef} className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 max-w-sm hidden md:block text-sm text-white/80 z-20 font-michroma font-light leading-relaxed text-center">
           Rigorous third-party testing for<br/>
           absolute confidence.
        </div>

        {/* Left Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center h-full z-20 relative">
          <div ref={textRef}>
            <div className="inline-block px-3 py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md rounded-md uppercase shadow-sm">
              Certificate of Analysis
            </div>
            <p className="text-4xl md:text-5xl lg:text-6xl font-michroma font-light leading-[1.1] mb-8 tracking-tight text-white">
              Transparency<br />
              in Every Batch.
            </p>
          </div>
          
          <p ref={subTextRef} className="text-white/70 max-w-xs text-sm font-michroma font-light leading-relaxed mb-10">
            Every peptide is independently<br />
            verified to ≥99% purity<br />
            and identity.
          </p>

          <div ref={toggleRef} className="z-40">
            <button className="px-6 py-3 text-sm font-michroma font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-md backdrop-blur-sm transition-all shadow-xl">
              View COA
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
