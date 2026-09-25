"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  ArrowDown,
  HelpCircle,
  ShieldCheck,
  Thermometer,
  Truck,
  Award,
  RotateCcw,
  CreditCard,
  Building2,
  ExternalLink,
  User,
} from "lucide-react";
import {
  FAQ_CATEGORIES,
  type FaqCategory,
  type FaqItem,
  type FaqAsset,
} from "@/lib/faqHubData";

// Helper to parse markdown links [text](url) inside answer paragraphs into React nodes
function renderParagraph(text: string, pIdx: number) {
  if (text.startsWith("<!--") && text.endsWith("-->")) {
    return <span key={pIdx} dangerouslySetInnerHTML={{ __html: text }} />;
  }

  // Parse markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];

    if (linkUrl.startsWith("http")) {
      parts.push(
        <a
          key={`${pIdx}-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/40 hover:decoration-indigo-400 transition-colors font-medium inline-flex items-center gap-0.5"
        >
          {linkText}
          <ExternalLink className="w-3 h-3 inline-block ml-0.5 opacity-70" />
        </a>
      );
    } else {
      parts.push(
        <Link
          key={`${pIdx}-${match.index}`}
          href={linkUrl}
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/40 hover:decoration-indigo-400 transition-colors font-medium"
        >
          {linkText}
        </Link>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <p key={pIdx} className="text-gray-300 font-inter text-sm sm:text-base leading-relaxed">
      {parts}
    </p>
  );
}

// Icon helper by category
function getCategoryIcon(id: string) {
  switch (id) {
    case "trust-and-legitimacy":
      return <Building2 className="w-6 h-6 text-indigo-400 shrink-0" />;
    case "ordering-and-payments":
      return <CreditCard className="w-6 h-6 text-amber-400 shrink-0" />;
    case "shipping-and-delivery":
      return <Truck className="w-6 h-6 text-sky-400 shrink-0" />;
    case "product-quality-and-coas":
      return <Award className="w-6 h-6 text-purple-400 shrink-0" />;
    case "storage-and-handling":
      return <Thermometer className="w-6 h-6 text-indigo-400 shrink-0" />;
    case "returns-refunds-and-order-changes":
      return <RotateCcw className="w-6 h-6 text-pink-400 shrink-0" />;
    case "legality-and-research-use":
      return <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />;
    default:
      return <HelpCircle className="w-6 h-6 text-indigo-400 shrink-0" />;
  }
}

export default function FaqHubClient() {
  const [searchQuery, setSearchQuery] = useState("");
  // Open the first question of each major category by default for clean presentation
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "what-is-the-difference-between-a-research-peptide-supplier-and-a-clinical-peptide-provider": true,
    "do-you-offer-bulk-wholesale-or-discount-pricing": true,
    "how-long-does-shipping-take": true,
    "are-your-peptides-third-party-tested": true,
    "how-do-i-store-peptides-freezer-or-fridge-for-lyophilized-peptides": true,
    "do-you-offer-refunds-or-returns": true,
    "what-does-research-use-only-mean": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_CATEGORIES;
    const query = searchQuery.toLowerCase();

    return FAQ_CATEGORIES.map((category) => {
      const matchingItems = category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.plainAnswer.toLowerCase().includes(query)
      );
      return { ...category, items: matchingItems };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
      {/* Search & Jump-link navigation */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-md">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions by keyword, compound (e.g. BPC-157, TB-500, storage, FDA, shipping)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-inter text-sm transition-all"
          />
        </div>

        {/* On this page jump links */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 font-michroma">
            <ArrowDown className="w-4 h-4 text-indigo-400" />
            <span>On this page</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            <a
              href="#trust-and-legitimacy"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Trust and legitimacy
            </a>
            <a
              href="#ordering-and-payments"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Ordering and payments
            </a>
            <a
              href="#shipping-and-delivery"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Shipping and delivery
            </a>
            <a
              href="#product-quality-and-coas"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Product quality and COAs
            </a>
            <a
              href="#storage-and-handling"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Storage and handling
            </a>
            <a
              href="#returns-refunds-and-order-changes"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Returns refunds and order changes
            </a>
            <a
              href="#legality-and-research-use"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all font-inter"
            >
              Legality and research use
            </a>
          </div>
        </div>
      </div>

      {/* Rendered Categories */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-[#111111] border border-white/10 rounded-2xl p-8">
          <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="font-michroma text-lg text-white mb-2">No matching questions found</h3>
          <p className="text-gray-400 text-sm font-inter mb-4">
            Try searching with another keyword or browse the categories below.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors font-inter"
          >
            Clear Search
          </button>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-32 space-y-8"
          >
            {/* Category Header */}
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl md:text-3xl font-michroma font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-3">
                {getCategoryIcon(category.id)}
                <span>{category.title}</span>
              </h2>
              <p className="font-inter text-gray-400 text-sm md:text-base leading-relaxed max-w-4xl">
                {category.intro}
              </p>
            </div>

            {/* Reference Asset if present */}
            {category.asset && (
              <div id={category.asset.id} className="scroll-mt-32 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-michroma text-base md:text-lg uppercase tracking-wider text-indigo-300 font-bold">
                    {category.asset.title}
                  </h3>
                </div>

                {/* Asset Type 1: Stages (e.g. How an order moves, Refund timeline) */}
                {category.asset.type === "stages" && category.asset.stages && (
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4 divide-y divide-white/5 shadow-xl">
                    {category.asset.stages.map((stage, idx) => (
                      <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                        <div className="font-michroma font-bold text-white text-sm md:text-base mb-1">
                          {stage.label}
                        </div>
                        {stage.flag && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `<!-- OWNER FACT NEEDED: ${stage.flag} -->`,
                            }}
                          />
                        )}
                        {stage.body ? (
                          <div className="text-gray-300 font-inter text-sm leading-relaxed">
                            {renderParagraph(stage.body, idx)}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}

                {/* Asset Type 2: Rows (e.g. COA proof, Storage reference) */}
                {category.asset.type === "rows" && category.asset.rows && (
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4 divide-y divide-white/5 shadow-xl">
                    {category.asset.rows.map((row, idx) => (
                      <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                        <div className="font-michroma font-bold text-white text-sm md:text-base mb-1">
                          {row.label}
                        </div>
                        {row.flag && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `<!-- OWNER FACT NEEDED: ${row.flag} -->`,
                            }}
                          />
                        )}
                        {row.body ? (
                          <div className="text-gray-300 font-inter text-sm leading-relaxed">
                            {renderParagraph(row.body, idx)}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}

                {/* Asset Type 3: Timeline (e.g. Regulatory timeline) */}
                {category.asset.type === "timeline" && category.asset.timelineRows && (
                  <div className="space-y-6">
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 divide-y divide-white/10 shadow-xl">
                      {category.asset.timelineRows.map((row, idx) => (
                        <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                          <div className="font-michroma font-bold text-indigo-400 text-sm mb-3">
                            {row.label}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-inter">
                            <div className="md:col-span-1 text-gray-400 font-medium">
                              <span className="text-white font-semibold block mb-1">Date:</span>
                              {row.date}
                            </div>
                            <div className="md:col-span-3 space-y-3">
                              <div>
                                <span className="text-white font-semibold block mb-1">Event:</span>
                                <p className="text-gray-300 leading-relaxed">{row.event}</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                                  <span className="text-emerald-400 font-semibold block text-xs uppercase tracking-wider mb-1">
                                    What it changed:
                                  </span>
                                  <p className="text-gray-300 text-xs leading-relaxed">{row.changed}</p>
                                </div>
                                <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3">
                                  <span className="text-red-400 font-semibold block text-xs uppercase tracking-wider mb-1">
                                    What it did NOT change:
                                  </span>
                                  <p className="text-gray-300 text-xs leading-relaxed">{row.notChanged}</p>
                                </div>
                              </div>
                              <div className="text-xs text-gray-400 pt-1">
                                <span className="text-gray-300 font-semibold">Primary source: </span>
                                {row.source}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {category.asset.closingLine && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-gray-300 font-inter italic leading-relaxed">
                        {category.asset.closingLine}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Questions Accordion List */}
            <div className="space-y-4">
              {category.items.map((item) => {
                const isOpen = !!openItems[item.id];
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className="border border-white/10 rounded-2xl bg-[#111111] overflow-hidden transition-all duration-200 hover:border-white/20 shadow-lg"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-michroma text-base sm:text-lg font-bold text-white leading-snug">
                        {item.question}
                      </h3>
                      <div
                        className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-indigo-600/20 border-indigo-500/40" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-300" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
                        {item.paragraphs.map((p, pIdx) => renderParagraph(p, pIdx))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}

      {/* Visible Author Byline */}
      <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-inter">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          <span>Written &amp; Curated by: <strong className="text-gray-300 font-medium">Primetime Admin</strong></span>
        </div>
      </div>

      {/* Page Footer Disclaimers */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <p className="text-gray-400 italic font-inter text-xs sm:text-sm leading-relaxed">
          This page covers a regulatory and operational picture that changes. It is general information, not legal or medical advice. For the current federal position, check FDA.gov and the Federal Register directly.
        </p>
        <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl space-y-2">
          <p className="text-white font-bold font-inter text-xs sm:text-sm">
            Research Use Only.
          </p>
          <p className="text-gray-400 font-inter text-xs sm:text-sm leading-relaxed">
            Products supplied by PrimeTime BioLabs are intended strictly for laboratory and in-vitro research by qualified professionals. They are not drugs, dietary supplements or cosmetics. They are not intended for human or animal consumption, and they are not for diagnostic, therapeutic or preventive use of any kind. No statement on this site has been evaluated by the Food and Drug Administration.
          </p>
        </div>
      </div>
    </div>
  );
}
