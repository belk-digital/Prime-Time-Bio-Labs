import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-stagger", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".footer-giant-text", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      scale: 0.9,
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="bg-[#0b0b0b] text-white pt-24 pb-0 px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-24 gap-16">
          
          {/* Brand Info */}
          <div className="lg:w-1/3 footer-stagger">
            <img src="/primtime-biolabs-logo.svg" alt="Primetime Biolabs" className="h-16 md:h-20 w-auto mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Primetime Biolabs is a premier peptide synthesis facility specializing in high-purity research materials and custom synthesis.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="footer-stagger">
              <h4 className="text-base font-semibold text-white mb-6">Quick link</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">License</a></li>
              </ul>
            </div>
            
            <div className="footer-stagger">
              <h4 className="text-base font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Research</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Quality</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
              </ul>
            </div>

            <div className="footer-stagger">
              <h4 className="text-base font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">COA</a></li>
              </ul>
            </div>

            <div className="footer-stagger">
              <h4 className="text-base font-semibold text-white mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Section (Copyright) */}
        <div className="footer-stagger flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 mb-16">
          <p>&copy; {new Date().getFullYear()} Primetime Biolabs All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Design by <a href="https://belkdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Belk Digital</a>
          </p>
        </div>
      </div>

      {/* Bottom Section (Giant Text) */}
      <div className="w-full flex justify-center mt-auto pb-4 relative">
        <div 
          className="w-full text-center"
          style={{ 
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        >
          <h1 
            className="footer-giant-text text-[12vw] font-black tracking-tighter leading-none m-0 p-0 bg-gradient-to-b from-indigo-600 to-purple-900 text-transparent bg-clip-text"
          >
            PRIMETIME
          </h1>
        </div>
      </div>
    </footer>
  );
}
