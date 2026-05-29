"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import type { Product } from "@/lib/api";
import { getTrendingProducts, getSmartSearchRecommendations, getProductInsights } from "@/lib/ai-recommendations";
import ProductCard from "./ProductCard";

interface AIRecommendationsProps {
  allProducts: Product[];
  currentSearchQuery?: string;
  limit?: number;
}

export default function AIRecommendations({
  allProducts,
  currentSearchQuery,
  limit = 4,
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [recommendationType, setRecommendationType] = useState<"trending" | "search" | "none">("trending");

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    let recs: Product[] = [];
    let type: "trending" | "search" | "none" = "none";

    // If there's an active search, show search-based recommendations
    if (currentSearchQuery && currentSearchQuery.trim()) {
      recs = getSmartSearchRecommendations(currentSearchQuery, allProducts, limit);
      type = "search";
    } else {
      // Show trending products
      recs = getTrendingProducts(allProducts, limit);
      type = "trending";
    }

    // Only show if we have recommendations
    if (recs.length > 0) {
      setRecommendations(recs);
      setRecommendationType(type);
    }
  }, [allProducts, currentSearchQuery, limit]);

  if (recommendations.length === 0) return null;

  return (
    <section className="my-12 pt-12 border-t border-gray-200">
      {/* Header with AI badge */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              AI-Powered Recommendations
              <span className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2.5 py-0.5 rounded-full font-semibold">
                Smart
              </span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {recommendationType === "search"
                ? "Products matched to your search using intelligent recommendations"
                : "Trending products with excellent ratings and reviews"}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => {
          const insights = getProductInsights(product);
          return (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300"
            >
              {/* AI Badge */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full border border-purple-200 shadow-lg">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-semibold text-purple-600">AI Pick</span>
              </div>

              {/* Product Card */}
              <ProductCard product={product} />

              {/* AI Insights */}
              {insights.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="space-y-1">
                    {insights.slice(0, 2).map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white">
                        <TrendingUp className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Banner */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200 text-center">
        <p className="text-gray-700 mb-3">
          💡 Our AI engine analyzes product ratings, prices, and your preferences to deliver
          personalized recommendations.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition"
        >
          Explore All Products →
        </Link>
      </div>
    </section>
  );
}
