"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Package, Check } from "lucide-react";
import type { Product } from "@/lib/api";
import { formatCurrency, formatDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.compareAtPrice
    ? formatDiscount(product.compareAtPrice, product.price)
    : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // Upgrade Unsplash image resolution and quality
  const getHighResImage = (url: string) => {
    if (url.includes("unsplash.com")) {
      // Replace existing w= and q= params with higher values
      return url
        .replace(/w=\d+/, "w=800")
        .replace(/q=\d+/, "q=90")
        + (url.includes("auto=") ? "" : "&auto=format&fit=crop");
    }
    return url;
  };

  const imageUrl = getHighResImage(product.imageUrl);

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#e8761a]/30 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <Link href={`/catalog/${product.id}`} className="block relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              −{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[#e8761a] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
          {product.category} · {product.subCategory}
        </p>

        <Link href={`/catalog/${product.id}`}>
          <h3 className="font-semibold text-gray-900 leading-snug mb-2 hover:text-[#e8761a] transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star}
                className={`w-3.5 h-3.5 ${star <= Math.round(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</div>
            {product.compareAtPrice && (
              <div className="text-sm text-gray-400 line-through">{formatCurrency(product.compareAtPrice)}</div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 text-white text-sm font-semibold px-3 py-2 rounded-xl transition cursor-pointer
              disabled:bg-gray-300 disabled:cursor-not-allowed
              ${added ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#e8761a] hover:bg-[#d45c0e]"}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <><Check className="w-4 h-4" /><span className="hidden sm:inline">Added!</span></>
            ) : (
              <><ShoppingCart className="w-4 h-4" /><span className="hidden sm:inline">Add</span></>
            )}
          </button>
        </div>

        {/* SKU & inventory */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            <span>SKU: {product.sku}</span>
          </div>
          {product.inStock && (
            <span className={`font-medium ${product.inventoryCount < 10 ? "text-red-500" : "text-emerald-500"}`}>
              {product.inventoryCount < 10 ? `Only ${product.inventoryCount} left` : "In Stock"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
