"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { getProductDisplayDetails, type ShopMockProduct } from "@/lib/shopCardProduct";

export type { ShopMockProduct };

export default function ShopProductCard({
  product,
  variant = "dark",
}: {
  product: ShopMockProduct;
  variant?: "dark" | "light";
}) {
  const [selectedDosage, setSelectedDosage] = useState(product.dosageOptions[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const isLight = variant === "light";
  const displayDetails = getProductDisplayDetails(product, selectedDosage);
  const displayPrice = displayDetails.price;
  const displayImage = displayDetails.image;

  return (
    <div
      className={`product-card group relative rounded-2xl p-3 flex flex-col hover:-translate-y-1 transition-transform duration-500 ${
        isLight ? "bg-white border border-black/5 shadow-sm" : "bg-[#1c1c1e]"
      }`}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image panel */}
        <div className="relative aspect-square rounded-xl bg-[#F5F5F5] overflow-hidden">
          {product.featured && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] uppercase tracking-widest font-bold text-white bg-black/80 rounded-full">
              Featured
            </span>
          )}
          <img
            src={displayImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </Link>

      {/* Wishlist toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted((v) => !v);
        }}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black transition-colors"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
      </button>

      {/* Info */}
      <div className="px-2 pt-4 pb-1">
        <Link href={`/product/${product.slug}`} className="block">
          <h3
            className={`font-michroma uppercase text-[15px] font-semibold truncate mb-1.5 ${
              isLight ? "text-gray-900" : "text-white"
            }`}
          >
            {product.name}
          </h3>
          <p className={`font-inter text-sm truncate ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            {product.type}
          </p>
        </Link>

        <p
          className={`font-inter text-xs leading-relaxed line-clamp-2 mt-2 ${
            isLight ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {product.description}
        </p>

        {/* Dosage selection */}
        <div className="mt-3">
          <p
            className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${
              isLight ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Dosage
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.dosageOptions.map((dosage) => (
              <button
                key={dosage}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedDosage(dosage);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-michroma font-medium border transition-colors ${
                  selectedDosage === dosage
                    ? isLight
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-white border-white text-black"
                    : isLight
                      ? "bg-transparent border-black/10 text-gray-500 hover:border-black/30"
                      : "bg-transparent border-white/15 text-gray-400 hover:border-white/40"
                }`}
              >
                {dosage}
              </button>
            ))}
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-4">
          <span className={`text-2xl font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>
            ${displayPrice.toFixed(0)}
          </span>
          <button
            type="button"
            onClick={() =>
              addItem(
                { id: displayDetails.sku, name: product.name, imageUrl: displayImage, slug: product.slug },
                selectedDosage,
                1,
                displayPrice,
                selectedDosage
              )
            }
            aria-label={`Add ${product.name} (${selectedDosage}) to cart`}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              isLight
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
