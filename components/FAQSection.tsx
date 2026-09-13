"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { DEFAULT_FAQS } from "@/lib/defaultFaqs";

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  hideHeading?: boolean;
  title?: React.ReactNode;
  subtitle?: string;
  faqs?: { question: string; answer: string }[];
}

export default function FAQSection({ hideHeading = false, title, subtitle, faqs = DEFAULT_FAQS }: FAQSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    gsap.fromTo(".faq-heading",
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

    gsap.fromTo(".faq-item",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {!hideHeading && (
          <div className="text-center mb-16 faq-heading">
            <h2 className="text-3xl md:text-5xl font-michroma font-bold uppercase tracking-wider mb-6">
              {title ?? (
                <>
                  Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Questions</span>
                </>
              )}
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              {subtitle ?? "Find answers to common questions about our products, testing standards, and research policies."}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item border ${openIndex === index ? 'border-indigo-500/50 bg-indigo-900/20' : 'border-white/10 bg-[#111111]'} rounded-2xl overflow-hidden transition-all duration-300`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-bold text-white uppercase tracking-wide">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-indigo-400' : ''}`}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-64 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
