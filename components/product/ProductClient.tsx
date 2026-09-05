"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Heart, Minus, Plus, ShoppingCart, FileDown, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { toggleWishlistItem } from "@/lib/wishlist/actions";
import ProductCard from "@/components/shop/ProductCard";
import Footer from "@/components/Footer";
import {
  formatUsd,
  getEffectivePrice,
  resolveMediaUrl,
  type ShopProduct,
  type ShopVariant,
} from "@/lib/types/shop";

gsap.registerPlugin(ScrollTrigger);

type TabKey = "details" | "research" | "quality" | "compliance";

export default function ProductClient({
  product,
  relatedProducts,
  isWishlisted = false,
}: {
  product: ShopProduct;
  relatedProducts: ShopProduct[];
  isWishlisted?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const [wishlistPending, setWishlistPending] = useState(false);

  const images = useMemo(() => product.images ?? [], [product.images]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const variants = product.variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState<ShopVariant | null>(
    product.hasVariants && variants.length > 0 ? variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [addedMessage, setAddedMessage] = useState(false);

  // Group variant options by key, e.g. { Dosage: ["5mg", "10mg"] }
  const optionGroups = useMemo(() => {
    const groups = new Map<string, string[]>();
    variants.forEach((variant) => {
      (variant.options ?? []).forEach((opt) => {
        if (!opt.key || !opt.value) return;
        const values = groups.get(opt.key) ?? [];
        if (!values.includes(opt.value)) values.push(opt.value);
        groups.set(opt.key, values);
      });
    });
    return Array.from(groups.entries());
  }, [variants]);

  const activeImages =
    selectedVariant?.images && selectedVariant.images.length > 0
      ? selectedVariant.images
      : images;

  const currentImageUrl = resolveMediaUrl(activeImages[activeImageIndex]?.image ?? activeImages[0]?.image);

  const price = product.hasVariants && selectedVariant ? selectedVariant.price : product.price;
  const salePrice =
    product.hasVariants && selectedVariant ? selectedVariant.salePrice : product.salePrice;
  const effectivePrice = getEffectivePrice(price, salePrice);
  const stock = product.hasVariants && selectedVariant ? selectedVariant.stock : product.stock;
  const inStock = stock > 0;
  const sku = product.hasVariants && selectedVariant ? selectedVariant.sku : product.sku ?? String(product.id);
  const variantTitle = selectedVariant?.options
    ?.map((o) => o.value)
    .filter(Boolean)
    .join(" / ");

  const coaUrl = resolveMediaUrl(product.coaFile);

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

  const handleSelectOption = (key: string, value: string) => {
    // Find a variant matching this option value together with whatever
    // other already-selected options remain valid; fall back to the first
    // variant that has this key/value pair.
    const match =
      variants.find((v) =>
        (v.options ?? []).some((o) => o.key === key && o.value === value) &&
        (selectedVariant?.options ?? []).every((selOpt) => {
          if (selOpt.key === key) return true;
          return (v.options ?? []).some((o) => o.key === selOpt.key && o.value === selOpt.value);
        })
      ) ?? variants.find((v) => (v.options ?? []).some((o) => o.key === key && o.value === value));

    if (match) {
      setSelectedVariant(match);
      setActiveImageIndex(0);
    }
  };

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem(
      {
        id: String(product.id),
        name: product.name,
        imageUrl: currentImageUrl,
        slug: product.slug ?? String(product.id),
      },
      sku,
      quantity,
      effectivePrice,
      variantTitle || undefined
    );
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleToggleWishlist = async () => {
    if (wishlistPending) return;
    setWishlistPending(true);
    try {
      const result = await toggleWishlistItem(product.id, sku, effectivePrice);
      if ("error" in result) {
        if (result.error === "login_required") {
          router.push("/login");
        }
        return;
      }
      setWishlisted(result.added);
    } finally {
      setWishlistPending(false);
    }
  };

  const tabs: { key: TabKey; title: string; description?: string | null }[] = [
    {
      key: "details",
      title: product.productDetailsTitle || "Product Details",
      description: product.productDetailsDescription,
    },
    {
      key: "research",
      title: product.researchFocusTitle || "Research Focus & Mechanism Overview",
      description: product.researchFocusDescription,
    },
    {
      key: "quality",
      title: product.qualityPurityTitle || "Quality & Purity Standards",
      description: product.qualityPurityDescription,
    },
    {
      key: "compliance",
      title: product.complianceNoticeTitle || "Compliance Notice",
      description: product.complianceNoticeDescription,
    },
  ];

  const faqs = product.faqs ?? [];

  return (
    <main ref={sectionRef} className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="pd-info inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="relative aspect-square bg-white/[0.02] border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden mb-4">
              {currentImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentImageUrl}
                  alt={product.name}
                  className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl"
                />
              ) : (
                <span className="text-gray-600 text-xs uppercase tracking-widest">No Image</span>
              )}
            </div>
            {activeImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {activeImages.map((img, idx) => {
                  const thumbUrl = resolveMediaUrl(img.image);
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`shrink-0 w-20 h-20 rounded-xl border overflow-hidden flex items-center justify-center bg-white/[0.02] transition-all ${
                        activeImageIndex === idx
                          ? "border-indigo-500"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      {thumbUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumbUrl} alt="" className="max-h-full max-w-full object-contain" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info flex flex-col">
            <h1 className="text-3xl md:text-4xl font-michroma uppercase font-bold tracking-wider mb-4">
              {product.name}
            </h1>

            {typeof product.coaPurity === "number" && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-sm font-medium text-gray-300">
                  {product.coaPurity}%+ Purity
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              {salePrice ? (
                <>
                  <span className="text-3xl font-light text-white">{formatUsd(salePrice)}</span>
                  <span className="text-lg font-light text-gray-500 line-through">
                    {formatUsd(price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-light text-white">{formatUsd(price)}</span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-400 font-light leading-relaxed mb-8">{product.description}</p>
            )}

            {/* Variant selector */}
            {optionGroups.length > 0 && (
              <div className="mb-8 space-y-5">
                {optionGroups.map(([key, values]) => (
                  <div key={key}>
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
                      {key}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {values.map((value) => {
                        const isSelected = selectedVariant?.options?.some(
                          (o) => o.key === key && o.value === value
                        );
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleSelectOption(key, value)}
                            className={`px-4 py-2 rounded-xl text-sm border transition-all duration-300 ${
                              isSelected
                                ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                : "bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-medium text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                {inStock ? (addedMessage ? "Added!" : "Add to Cart") : "Out of Stock"}
              </button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                disabled={wishlistPending}
                className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    wishlisted ? "fill-indigo-400 text-indigo-400" : "text-gray-300"
                  }`}
                />
              </button>
            </div>

            <p className={`text-xs uppercase tracking-widest ${inStock ? "text-gray-500" : "text-red-400/80"}`}>
              {inStock ? `${stock} in stock` : "Currently unavailable"}
            </p>

            {/* COA */}
            {(coaUrl || product.coaBatchNumber || product.coaPurity) && (
              <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
                  Certificate of Analysis
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 mb-4">
                  {product.coaBatchNumber && (
                    <span>Batch: <span className="text-white">{product.coaBatchNumber}</span></span>
                  )}
                  {typeof product.coaPurity === "number" && (
                    <span>Purity: <span className="text-white">{product.coaPurity}%</span></span>
                  )}
                  {product.coaAnalyzedDate && (
                    <span>
                      Analyzed:{" "}
                      <span className="text-white">
                        {new Date(product.coaAnalyzedDate).toLocaleDateString()}
                      </span>
                    </span>
                  )}
                </div>
                {coaUrl && (
                  <a
                    href={coaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
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
          <div className="flex flex-wrap gap-2 border-b border-white/10 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-xs md:text-sm uppercase tracking-wider font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab.key
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {tabs
              .filter((tab) => tab.key === activeTab)
              .map((tab) => (
                <div key={tab.key}>
                  <p className="text-gray-400 font-light leading-relaxed whitespace-pre-line">
                    {tab.description || "No information provided yet."}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="pd-reveal mb-20 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-michroma font-bold uppercase tracking-wider mb-8">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border ${
                    openFaqIndex === index
                      ? "border-indigo-500/50 bg-indigo-900/20"
                      : "border-white/10 bg-[#111111]"
                  } rounded-2xl overflow-hidden transition-all duration-300`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <span className="text-base font-bold text-white uppercase tracking-wide">
                      {faq.question}
                    </span>
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
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="pd-reveal">
            <h2 className="text-2xl md:text-3xl font-michroma font-bold uppercase tracking-wider mb-8">
              You May Also <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={String(related.id)} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
