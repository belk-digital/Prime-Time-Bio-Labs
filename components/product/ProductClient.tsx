"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  ChevronLeft,
  FileDown,
  FlaskConical,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import ShopProductCard, { type ShopMockProduct } from "@/components/shop/ShopProductCard";
import Footer from "@/components/Footer";
import { resolveMediaUrl, type ShopProduct } from "@/lib/types/shop";

gsap.registerPlugin(ScrollTrigger);

type TabKey = "details" | "research" | "quality" | "compliance";

const DEFAULT_FAQS = [
  {
    question: "How should this peptide be stored?",
    answer:
      "Store the lyophilized vial in a freezer at -20°C, protected from light. Once reconstituted, keep refrigerated at 2-8°C and use within the timeframe noted on the Certificate of Analysis.",
  },
  {
    question: "Is a Certificate of Analysis included?",
    answer:
      "Yes. Every batch is third-party tested and a COA matching the lot number on your vial is available for download from your account after purchase.",
  },
  {
    question: "What is the minimum order requirement?",
    answer:
      "There is no minimum order quantity. Bulk pricing is available on select bundles for qualified research institutions — contact us for details.",
  },
];

export default function ProductClient({
  product,
  cardProduct,
  relatedProducts,
}: {
  product: ShopProduct;
  cardProduct: ShopMockProduct;
  relatedProducts: ShopMockProduct[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedDosage, setSelectedDosage] = useState(cardProduct.dosageOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [addedMessage, setAddedMessage] = useState(false);

  const tabs = useMemo(
    () =>
      [
        {
          key: "details" as const,
          title: product.productDetailsTitle || "Product Details",
          description:
            product.productDetailsDescription ||
            "Every batch is synthesized to research-grade standards and shipped in a sealed, light-protected vial with a printed lot number for full traceability. Store lyophilized peptide at -20°C prior to reconstitution.",
        },
        {
          key: "research" as const,
          title: product.researchFocusTitle || "Research Focus",
          description:
            product.researchFocusDescription ||
            "This compound is supplied strictly for in-vitro laboratory research and is not intended for human or animal consumption. Researchers should follow their institution's handling and disposal protocols.",
        },
        {
          key: "quality" as const,
          title: product.qualityPurityTitle || "Quality & Purity",
          description:
            product.qualityPurityDescription ||
            "Third-party HPLC and mass spectrometry testing verifies purity on every production batch. A Certificate of Analysis (COA) is available on request for the specific lot number received.",
        },
        {
          key: "compliance" as const,
          title: product.complianceNoticeTitle || "Compliance Notice",
          description:
            product.complianceNoticeDescription ||
            "For Research Use Only. Not for human consumption. This product is not a drug, food, or cosmetic and has not been evaluated by the FDA. Sale is restricted to qualified researchers.",
        },
      ] satisfies { key: TabKey; title: string; description: string }[],
    [product]
  );

  const faqs = product.faqs && product.faqs.length > 0 ? product.faqs : DEFAULT_FAQS;
  const coaUrl = resolveMediaUrl(product.coaFile);
  const hasCoa = Boolean(coaUrl || product.coaBatchNumber || typeof product.coaPurity === "number");

  useGSAP(
    () => {
      gsap.fromTo(
        ".pd-gallery, .pd-info",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
      gsap.fromTo(
        ".pd-reveal",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!tabContentRef.current) return;
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 14, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
      );
    },
    { dependencies: [activeTab], scope: sectionRef }
  );

  const handleAddToCart = () => {
    addItem(
      { id: cardProduct.id, name: cardProduct.name, imageUrl: cardProduct.image, slug: cardProduct.slug },
      selectedDosage,
      quantity,
      cardProduct.price,
      selectedDosage
    );
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <main ref={sectionRef} className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <div className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto">
        <div className="pd-info flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          <Link href="/shop" className="hover:text-gray-900 transition-colors inline-flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" /> Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900">{cardProduct.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="relative aspect-square border border-black/5 rounded-[2rem] overflow-hidden mb-4 shadow-sm">
              {cardProduct.featured && (
                <span className="absolute top-5 left-5 z-10 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white bg-gray-900 rounded-full">
                  Featured
                </span>
              )}
              <img
                src={cardProduct.image}
                alt={cardProduct.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`relative w-20 h-20 rounded-2xl border overflow-hidden transition-all ${
                    idx === 0 ? "border-indigo-500" : "border-black/5 hover:border-black/20"
                  }`}
                >
                  <img src={cardProduct.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info flex flex-col">
            <span className="inline-block w-fit px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded uppercase">
              {cardProduct.category}
            </span>

            <h1 className="font-michroma text-3xl md:text-4xl uppercase font-bold tracking-wider text-gray-900 mb-3">
              {cardProduct.name}
            </h1>
            <p className="font-inter text-sm font-medium text-gray-400 mb-5">{cardProduct.type}</p>

            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-gray-600">{cardProduct.purity}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-michroma font-bold text-gray-900">
                ${cardProduct.price.toFixed(2)}
              </span>
            </div>

            <p className="font-inter text-gray-500 leading-relaxed mb-8">{cardProduct.description}</p>

            {/* Dosage selector */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Dosage</h3>
              <div className="flex flex-wrap gap-2">
                {cardProduct.dosageOptions.map((dosage) => (
                  <button
                    key={dosage}
                    type="button"
                    onClick={() => setSelectedDosage(dosage)}
                    className={`px-4 py-2 rounded-xl text-sm font-michroma font-medium border transition-all duration-300 ${
                      selectedDosage === dosage
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-black/10 text-gray-500 hover:border-black/30 hover:text-gray-900"
                    }`}
                  >
                    {dosage}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-black/10 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-medium text-sm uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-[0_8px_20px_rgba(79,70,229,0.25)]"
              >
                <ShoppingBag className="w-4 h-4" />
                {addedMessage ? "Added!" : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted((v) => !v)}
                className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl border border-black/10 bg-white hover:bg-gray-50 transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isWishlisted ? "fill-indigo-500 text-indigo-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">In stock, ready to ship</p>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: ShieldCheck, label: "COA Verified" },
                { icon: FlaskConical, label: cardProduct.purity },
                { icon: Truck, label: "Ships in 24hrs" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-black/5 bg-white shadow-sm"
                >
                  <Icon className="w-5 h-5 text-indigo-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* COA */}
            {hasCoa && (
              <div className="p-5 rounded-2xl border border-black/5 bg-black shadow-sm">
                <h3 className="font-inter text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
                  Certificate of Analysis
                </h3>
                <div className="font-inter flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 mb-4">
                  {product.coaBatchNumber && (
                    <span>
                      Batch: <span className="text-white font-medium">{product.coaBatchNumber}</span>
                    </span>
                  )}
                  {typeof product.coaPurity === "number" && (
                    <span>
                      Purity: <span className="text-white font-medium">{product.coaPurity}%</span>
                    </span>
                  )}
                  {product.coaAnalyzedDate && (
                    <span>
                      Analyzed:{" "}
                      <span className="text-white font-medium">
                        {new Date(product.coaAnalyzedDate).toLocaleDateString("en-US")}
                      </span>
                    </span>
                  )}
                </div>
                {coaUrl && (
                  <a
                    href={coaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                  >
                    <FileDown className="w-4 h-4" /> Download COA
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="pd-reveal mb-20">
          <div className="relative mb-8">
            <div className="flex items-end overflow-x-auto no-scrollbar">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    style={{ zIndex: tabs.length - index, marginLeft: index === 0 ? 0 : "-19px" }}
                    className="relative shrink-0 pb-[2px]"
                  >
                    <span
                      className={`absolute inset-0 -skew-x-[14deg] rounded-t-2xl transition-colors ${
                        isActive
                          ? "bg-gray-900 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
                          : "bg-white border border-black/10 hover:bg-gray-50"
                      }`}
                    />
                    <span
                      className={`relative block py-3.5 text-[11px] md:text-xs uppercase tracking-wide font-bold whitespace-nowrap transition-colors ${
                        index === 0 ? "px-4 md:px-5" : "pl-6 md:pl-7 pr-3 md:pr-4"
                      } ${isActive ? "text-white" : "text-gray-500"}`}
                    >
                      {tab.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="h-[3px] bg-gray-900 -mt-[2px] relative z-0 rounded-full" />
          </div>
          <div ref={tabContentRef} className="max-w-3xl">
            {tabs
              .filter((tab) => tab.key === activeTab)
              .map((tab) => (
                <p key={tab.key} className="font-inter text-gray-500 leading-relaxed whitespace-pre-line">
                  {tab.description}
                </p>
              ))}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="pd-reveal">
            <h2 className="text-2xl md:text-3xl font-michroma font-bold uppercase tracking-wider text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((related) => (
                <ShopProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>

      {/* FAQs */}
      <section className="pd-reveal py-24 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-michroma font-bold uppercase tracking-wider mb-6">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                Questions
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Find answers to common questions about this product, storage, and testing standards.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border ${
                  openFaqIndex === index ? "border-indigo-500/50 bg-indigo-900/20" : "border-white/10 bg-[#111111]"
                } rounded-2xl overflow-hidden transition-all duration-300`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="text-lg font-bold text-white uppercase tracking-wide">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ml-4 ${
                      openFaqIndex === index ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
