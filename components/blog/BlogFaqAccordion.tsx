"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BlogFaq } from "@/lib/types/blog";

export default function BlogFaqAccordion({ faqs }: { faqs: BlogFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.id ?? index}
          className={`border ${
            openIndex === index ? "border-indigo-500/50 bg-indigo-900/20" : "border-white/10 bg-[#111111]"
          } rounded-2xl overflow-hidden transition-all duration-300`}
        >
          <button
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            aria-controls={`blog-faq-answer-${index}`}
          >
            <span className="text-base md:text-lg font-bold text-white uppercase tracking-wide pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-indigo-400" : ""
              }`}
            />
          </button>
          <div
            id={`blog-faq-answer-${index}`}
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
