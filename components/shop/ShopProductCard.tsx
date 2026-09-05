"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";

export interface ShopMockProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  dosageOptions: string[];
  purity: string;
  type: string;
  price: number;
  image: string;
  featured: boolean;
  category: string;
}

export default function ShopProductCard({ product }: { product: ShopMockProduct }) {
  const [selectedDosage, setSelectedDosage] = useState(product.dosageOptions[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card group relative bg-[#1c1c1e] rounded-[28px] p-3 flex flex-col hover:-translate-y-1 transition-transform duration-500">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image panel */}
        <div className="relative aspect-square rounded-[20px] bg-[#F5F5F5] overflow-hidden">
          {product.featured && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] uppercase tracking-widest font-bold text-white bg-black/80 rounded-full">
              Featured
            </span>
          )}
          <img
            src={product.image}
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
          <h3 className="text-[15px] font-medium text-white truncate">{product.name}</h3>
          <p className="text-sm text-gray-400 truncate">{product.type}</p>
        </Link>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-2">{product.description}</p>

        {/* Dosage selection */}
        <div className="mt-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Dosage</p>
          <div className="flex flex-wrap gap-1.5">
            {product.dosageOptions.map((dosage) => (
              <button
                key={dosage}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedDosage(dosage);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border transition-colors ${
                  selectedDosage === dosage
                    ? "bg-white border-white text-black"
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
          <span className="text-2xl font-semibold text-white">${product.price.toFixed(0)}</span>
          <button
            type="button"
            onClick={() =>
              addItem(
                { id: product.id, name: product.name, imageUrl: product.image, slug: product.slug },
                selectedDosage,
                1,
                product.price,
                selectedDosage
              )
            }
            aria-label={`Add ${product.name} (${selectedDosage}) to cart`}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
