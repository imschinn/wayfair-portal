import type { Product } from "./api";

/**
 * AI-powered product recommendation engine
 * Uses pattern matching and intelligent filtering
 */

export interface UserPreferences {
  budget?: { min: number; max: number };
  style?: string[];
  categories?: string[];
  priceRange?: "budget" | "mid-range" | "premium";
  selectedProducts?: number[];
}

export interface Recommendation {
  productId: number;
  score: number;
  reason: string;
}

/**
 * Calculate compatibility score between products
 * Higher score = better match for recommendations
 */
export function calculateProductScore(
  product: Product,
  searchQuery: string,
  preferences?: UserPreferences
): number {
  let score = 0;

  // Text matching (search query)
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    if (product.name.toLowerCase().includes(query)) score += 40;
    if (product.description.toLowerCase().includes(query)) score += 20;
    if (product.tags.some((tag) => tag.toLowerCase().includes(query))) score += 30;
    if (product.category.toLowerCase().includes(query)) score += 15;
  }

  // Category matching
  if (preferences?.categories) {
    if (preferences.categories.includes(product.category)) score += 20;
  }

  // Price range matching
  if (preferences?.budget) {
    if (product.price >= preferences.budget.min && product.price <= preferences.budget.max) {
      score += 25;
    }
  }

  // Rating boost
  if (product.rating >= 4.5) score += 15;
  if (product.rating >= 4.7) score += 10;

  // Inventory boost (in-stock products get a slight boost)
  if (product.inStock) score += 10;

  // Featured products slight boost
  if (product.isFeatured) score += 8;

  return score;
}

/**
 * Get AI-powered recommendations based on a single product
 */
export function getComplementaryProducts(
  selectedProduct: Product,
  allProducts: Product[],
  limit: number = 4
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  const complementaryCategories: Record<string, string[]> = {
    "Living Room": ["Rugs", "Lighting", "Living Room"],
    "Bedroom": ["Lighting", "Rugs", "Bedroom"],
    "Dining Room": ["Rugs", "Lighting", "Dining Room"],
    "Lighting": ["Living Room", "Bedroom", "Dining Room"],
    "Rugs": ["Living Room", "Bedroom", "Dining Room"],
  };

  const relevantCategories = complementaryCategories[selectedProduct.category] || [];

  allProducts.forEach((product) => {
    if (product.id === selectedProduct.id) return; // Skip the same product

    let score = 0;

    // Same category boost
    if (product.category === selectedProduct.category) {
      score += 25;
    }

    // Complementary category boost
    if (relevantCategories.includes(product.category)) {
      score += 30;
    }

    // Similar price range
    const priceDiff = Math.abs(product.price - selectedProduct.price);
    if (priceDiff < selectedProduct.price * 0.3) {
      score += 20;
    }

    // Rating match
    const ratingDiff = Math.abs(product.rating - selectedProduct.rating);
    if (ratingDiff < 0.5) {
      score += 15;
    }

    // In-stock and featured boost
    if (product.inStock) score += 10;
    if (product.isFeatured) score += 8;

    if (score > 0) {
      const reasons: string[] = [];
      if (product.category === selectedProduct.category) reasons.push("Same category");
      if (relevantCategories.includes(product.category)) reasons.push("Complements your choice");
      if (ratingDiff < 0.5) reasons.push("Similar quality");
      if (priceDiff < selectedProduct.price * 0.3) reasons.push("Similar price");

      recommendations.push({
        productId: product.id,
        score,
        reason: reasons[0] || "Great choice",
      });
    }
  });

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Smart search recommendations
 * Suggests products based on search intent
 */
export function getSmartSearchRecommendations(
  searchQuery: string,
  allProducts: Product[],
  limit: number = 6
): Product[] {
  const scored = allProducts.map((product) => ({
    product,
    score: calculateProductScore(product, searchQuery),
  }));

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}

/**
 * Generate AI-like product description enhancement
 */
export function getProductInsights(product: Product): string[] {
  const insights: string[] = [];

  // Price insights
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
    insights.push(`Save ${discount}% compared to regular price`);
  }

  // Rating insights
  if (product.rating >= 4.7) {
    insights.push("Highly rated by customers");
  } else if (product.rating >= 4.5) {
    insights.push("Well-reviewed product");
  }

  // Popularity insights
  if (product.reviewCount > 200) {
    insights.push(`Trusted by ${product.reviewCount}+ customers`);
  }

  // Availability insights
  if (product.inStock && product.inventoryCount < 10) {
    insights.push("Limited stock available");
  } else if (!product.inStock) {
    insights.push("Currently out of stock");
  }

  // Style insights
  if (product.tags.length > 0) {
    insights.push(`Perfect for ${product.tags[0]} style`);
  }

  return insights;
}

/**
 * Trending products recommendation
 */
export function getTrendingProducts(allProducts: Product[], limit: number = 5): Product[] {
  return allProducts
    .filter((p) => p.isFeatured && p.inStock)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

/**
 * Budget-friendly recommendations
 */
export function getBudgetRecommendations(budget: number, allProducts: Product[], limit: number = 5): Product[] {
  return allProducts
    .filter((p) => p.price <= budget && p.inStock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
