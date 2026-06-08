"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Hook to listen to URL shifts
import { SlidersHorizontal, Grid3X3, LayoutList, Search, Package } from "lucide-react";
import ProductCard from "./ProductCard";
import AIRecommendations from "./AIRecommendations";
import type { Product, ProductFilters } from "@/lib/api";
import { getProducts, ALL_MOCK_PRODUCTS } from "@/lib/api";

const CATEGORIES = ["All", "Living Room", "Bedroom", "Dining Room", "Lighting", "Rugs"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductGrid() {
  const searchParams = useSearchParams();
  
  // Extract real-time values directly from the browser URL address bar
  const urlCategory = searchParams.get("category");
  const urlSearchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState<"grid" | "list">("grid");
  const [totalCount, setTotalCount] = useState(0);

  // Sync state search field text with the active URL search parameter
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  const [filters, setFilters] = useState<ProductFilters>({
    category: urlCategory && urlCategory !== "All" ? urlCategory : undefined,
    sort: "newest",
    inStock: undefined,
  });

  // Effect 1: Watch the browser URL updates to auto-sync the local React state configurations
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: urlCategory && urlCategory !== "All" ? urlCategory : undefined,
    }));
    setSearchQuery(urlSearchQuery);
  }, [urlCategory, urlSearchQuery]);

  // Effect 2: Run data query loads whenever filters or URL parameters change
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ ...filters, search: urlSearchQuery || undefined });
        setProducts(res.content);
        setTotalCount(res.totalElements);
      } catch {
        // Backend fallback option utilizing local mock arrays
        let data = [...ALL_MOCK_PRODUCTS];
        if (filters.category) data = data.filter((p) => p.category === filters.category);
        if (filters.inStock) data = data.filter((p) => p.inStock);
        if (urlSearchQuery) {
          data = data.filter((p) =>
            p.name.toLowerCase().includes(urlSearchQuery.toLowerCase())
          );
        }
        if (filters.sort === "price_asc") data.sort((a, b) => a.price - b.price);
        if (filters.sort === "price_desc") data.sort((a, b) => b.price - a.price);
        if (filters.sort === "rating") data.sort((a, b) => b.rating - a.rating);
        setProducts(data);
        setTotalCount(data.length);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters, urlSearchQuery]);

  const handleCategoryChange = (cat: string) => {
    setFilters((f) => ({ ...f, category: cat === "All" ? undefined : cat }));
  };

  // Submit local text queries into URL parameters
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 p-10 mb-10 text-white">
        <div className="relative z-10">
          <p className="text-[#e8761a] font-semibold text-sm uppercase tracking-widest mb-2">
            Wayfair Portal — Product Catalog
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Furnish Every Space
          </h1>
          <p className="text-gray-300 max-w-xl text-lg">
            Browse {totalCount.toLocaleString()}+ products across all categories. Real-time inventory,
            enterprise-grade logistics.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#e8761a]/10 blur-3xl" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Search Input Box with Form Submission Wrapper */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-16 py-2.5 border border-gray-200 rounded-xl text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40 focus:border-[#e8761a]"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-[#e8761a] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#d45c0e] transition"
          >
            Go
          </button>
        </form>

        <div className="flex items-center gap-3">
          {/* Sort selection dropdown */}
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sort: e.target.value as ProductFilters["sort"] }))
            }
            className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none
                       focus:ring-2 focus:ring-[#e8761a]/40 bg-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* In-stock tracking toggle checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!filters.inStock}
              onChange={(e) =>
                setFilters((f) => ({ ...f, inStock: e.target.checked ? true : undefined }))
              }
              className="rounded accent-[#e8761a]"
            />
            In Stock
          </label>

          {/* Grid Layout Toggles */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setGridView("grid")}
              className={`p-2.5 transition ${gridView === "grid" ? "bg-[#e8761a] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridView("list")}
              className={`p-2.5 transition ${gridView === "list" ? "bg-[#e8761a] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs container */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = cat === "All" ? !filters.category : filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition border
                ${isActive
                  ? "bg-[#e8761a] border-[#e8761a] text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#e8761a] hover:text-[#e8761a]"
                }`}
            >
              {cat}
            </button>
          );
        })}
        <span className="ml-auto text-sm text-gray-400 self-center">
          <SlidersHorizontal className="inline w-3.5 h-3.5 mr-1" />
          {totalCount} results
        </span>
      </div>

      {/* Main product results container */}
      {loading ? (
        <div className={`grid gap-6 ${gridView === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="skeleton aspect-[4/3]" />
              <div className="p-4 space-y-3">
                <div className="skeleton h-4 rounded w-1/2" />
                <div className="skeleton h-5 rounded w-3/4" />
                <div className="skeleton h-4 rounded w-1/3" />
                <div className="skeleton h-8 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <>
          <div className={`grid gap-6 ${gridView === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* AI Recommendation Blocks */}
          {products.length > 0 && (
            <AIRecommendations 
              allProducts={products} 
              currentSearchQuery={urlSearchQuery}
              limit={4}
            />
          )}
        </>
      )}
    </div>
  );
}