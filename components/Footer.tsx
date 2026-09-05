"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about-us" },
  { label: "Affiliates", href: "/affiliates" },
  { label: "Account", href: "/account" },
];

const RESOURCE_LINKS = [
  { label: "Peptide Calculator", href: "/peptide-calculator" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Certificates of Analysis", href: "/certificates" },
];

const FOOTER_LINK_UNDERLINE_CLASS =
  "relative inline-block w-fit text-gray-400 hover:text-white transition-colors text-sm after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

const CONTACT_LINK_UNDERLINE_CLASS =
  "relative inline-block w-fit transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-0.5 after:left-0 after:bg-indigo-300 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-indigo-300";

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const email = new FormData(e.currentTarget).get("email");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      e.currentTarget.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={containerRef} className="bg-[#0b0b0b] text-white pt-24 pb-0 px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-16 gap-16">

          {/* Brand Info + Newsletter */}
          <div className="lg:w-1/3 footer-stagger flex flex-col gap-8">
            <div>
              <img src="/primtime-biolabs-logo.svg" alt="Primetime Biolabs" className="h-16 md:h-20 w-auto mb-6" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Primetime Biolabs is a premier peptide synthesis facility specializing in high-purity research materials and custom synthesis.
              </p>
            </div>

            <div className="max-w-sm">
              <h4 className="text-base font-semibold text-white mb-3">Stay in the loop</h4>
              <p className="text-gray-400 text-sm mb-4">Get research updates and product releases in your inbox.</p>
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={status === "loading" || status === "success"}
                  placeholder={
                    status === "success" ? "Subscribed!" : status === "error" ? "Something went wrong" : "you@example.com"
                  }
                  className={`w-full rounded-xl pl-4 pr-12 py-3 text-sm bg-white/5 border transition-colors outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                    status === "success"
                      ? "border-green-500/40 text-green-400 placeholder:text-green-400"
                      : status === "error"
                      ? "border-red-500/40 text-red-400 placeholder:text-red-400"
                      : "border-white/10 text-white placeholder:text-gray-500"
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === "success" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="footer-stagger">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-6">Menu</h4>
              <ul className="space-y-4">
                {MENU_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={FOOTER_LINK_UNDERLINE_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-stagger">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-6">Resources</h4>
              <ul className="space-y-4">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={FOOTER_LINK_UNDERLINE_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-stagger">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-6">Legal</h4>
              <ul className="space-y-4">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={FOOTER_LINK_UNDERLINE_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact row */}
        <div className="footer-stagger flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-8 mb-8 text-sm text-gray-400">
          <p>
            Questions? <Link href="/contact-us" className={`text-white ${CONTACT_LINK_UNDERLINE_CLASS}`}>Contact us</Link>{" "}
            or email{" "}
            <a href="mailto:support@primetimebiolabs.com" className={`text-white ${CONTACT_LINK_UNDERLINE_CLASS}`}>
              support@primetimebiolabs.com
            </a>
          </p>
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 pl-4 pr-2 py-2 rounded-full transition-colors w-fit"
          >
            <span className="text-xs font-medium tracking-wide">Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:-translate-y-0.5 transition-transform shrink-0">
              <ArrowRight className="w-3.5 h-3.5 -rotate-90" strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="footer-stagger border-t border-white/5 pt-8 mb-8">
          <p className="text-[11px] leading-relaxed text-gray-500 max-w-4xl">
            <span className="font-bold text-gray-400 uppercase tracking-wider mr-2">Research Use Only:</span>
            Products sold by Primetime Biolabs are intended strictly for laboratory and in-vitro research use by qualified professionals.
            They are not drugs, dietary supplements, or cosmetics, and are not intended for human or animal consumption, diagnostic, or
            therapeutic use of any kind.
          </p>
        </div>

        {/* Middle Section (Copyright) */}
        <div className="footer-stagger flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 mb-16">
          <p>&copy; {new Date().getFullYear()} Primetime Biolabs. All rights reserved.</p>
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
