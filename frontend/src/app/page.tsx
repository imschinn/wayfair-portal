"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalog/ProductCard";
import { ALL_MOCK_PRODUCTS } from "@/lib/api";
import {
  ChevronLeft, ChevronRight, ArrowRight, Star,
  Truck, RotateCcw, Shield, Headphones, HelpCircle
} from "lucide-react";

const SLIDES = [
  {
    title: "Transform Your Living Room",
    subtitle: "Up to 40% off on premium sofas & sectionals",
    cta: "Shop Living Room",
    href: "/catalog?category=Living+Room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90&auto=format&fit=crop",
    dark: true,
  },
  {
    title: "Your Dream Bedroom Awaits",
    subtitle: "Luxury beds, dressers & nightstands at great prices",
    cta: "Shop Bedroom",
    href: "/catalog?category=Bedroom",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=90&auto=format&fit=crop",
    dark: true,
  },
  {
    title: "Dining in Style",
    subtitle: "Solid wood tables & chairs for every home",
    cta: "Shop Dining",
    href: "/catalog?category=Dining+Room",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=90&auto=format&fit=crop",
    dark: true,
  },
];

const CATEGORIES = [
  { label: "Living Room", href: "/catalog?category=Living+Room", emoji: "🛋️", count: "120+ items" },
  { label: "Bedroom", href: "/catalog?category=Bedroom", emoji: "🛏️", count: "85+ items" },
  { label: "Dining Room", href: "/catalog?category=Dining+Room", emoji: "🍽️", count: "60+ items" },
  { label: "Lighting", href: "/catalog?category=Lighting", emoji: "💡", count: "45+ items" },
  { label: "Rugs", href: "/catalog?category=Rugs", emoji: "🎨", count: "35+ items" },
  { label: "All Products", href: "/catalog", emoji: "🏠", count: "500+ items" },
];

const PERKS = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $49", details: "Applies automatically at checkout to domestic orders." },
  { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked", details: "Return items in original packaging within 30 days for a full refund." },
  { icon: Shield, title: "Quality Guarantee", desc: "Verified products", details: "All items pass rigorous multi-point structural testing." },
  { icon: Headphones, title: "24/7 Support", desc: "Always available", details: "Get live-chat or phone support any hour of the day." },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [activePerkTooltip, setActivePerkTooltip] = useState<string | null>(null);
  
  const featuredProducts = ALL_MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);
  const newArrivals = ALL_MOCK_PRODUCTS.slice(-6);

  // Auto-play slider loop
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* NOTE FOR NAVBAR UPDATES: 
        Pass search configuration, sticky behavior flag, or layout types to your <Navbar /> component.
        Ensure your Navbar layout handles position: sticky, backdrop-blur, search arrays, and locale tools.
      */}
      <Navbar />
      
      <main className="relative">
        {/* Hero Slider */}
        <section className="relative h-[500px] sm:h-[620px] overflow-hidden bg-neutral-900">
          {SLIDES.map((s, i) => (
            <div key={i}
              className={"absolute inset-0 transition-opacity duration-1000 ease-in-out " + (i === slide ? "opacity-100 z-10" : "opacity-0 z-0")}>
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover scale-105 transition-transform duration-[6000ms] ease-out"
                priority={i === 0}
                quality={90}
                sizes="100vw"
              />
              {/* Enhanced overlay gradient for better text legibility & shadow contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent lg:from-black/75 lg:via-black/35" />
              
              <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6 sm:px-10">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold mb-5 px-3.5 py-1 rounded-full bg-[#e8761a]/20 text-[#fca5a5] border border-[#e8761a]/30 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-[#e8761a] text-[#e8761a]" /> New Collection 2026
                  </div>
                  
                  {/* Dynamic Heading with subtle text shadow for crisp visibility on bright image spots */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-md"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    {s.title}
                  </h1>
                  
                  <p className="text-gray-200 text-lg mb-8 drop-shadow-sm max-w-md">{s.subtitle}</p>
                  
                  {/* Highly interactive Call To Action reflecting the unique collection slide text */}
                  <Link href={s.href}
                    className="inline-flex items-center gap-2.5 font-semibold px-8 py-4 rounded-full text-white bg-[#e8761a] hover:bg-[#d45c0e] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#e8761a]/30">
                    {s.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Upgraded High Contrast Navigation Controls — hidden on mobile, displayed on desktop/tablet width */}
          <button 
            onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Previous Slide"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-[#e8761a] border border-white/20 hover:border-transparent backdrop-blur-md rounded-full items-center justify-center text-white transition-all shadow-lg hover:scale-110 hidden sm:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
            aria-label="Next Slide"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-[#e8761a] border border-white/20 hover:border-transparent backdrop-blur-md rounded-full items-center justify-center text-white transition-all shadow-lg hover:scale-110 hidden sm:flex">
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Expanded, highly accessible index indicator pills */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm">
            {SLIDES.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full h-2.5 ${i === slide ? "w-8 bg-[#e8761a]" : "w-2.5 bg-white/60 hover:bg-white"}`} 
              />
            ))}
          </div>
        </section>

        {/* Perks Bar with Interactive Tooltips */}
        <section className="bg-white border-b border-gray-100 relative z-20">
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {PERKS.map((p) => (
              <div 
                key={p.title} 
                className="group relative flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-neutral-50 transition"
                onMouseEnter={() => setActivePerkTooltip(p.title)}
                onMouseLeave={() => setActivePerkTooltip(null)}
                onClick={() => setActivePerkTooltip(activePerkTooltip === p.title ? null : p.title)}
              >
                <div className="w-11 h-11 bg-[#fef8f0] group-hover:bg-[#e8761a]/10 rounded-xl flex items-center justify-center shrink-0 transition">
                  <p.icon className="w-5 h-5 text-[#e8761a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                    {p.title}
                    <HelpCircle className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition" />
                  </div>
                  <div className="text-xs text-gray-500 truncate">{p.desc}</div>
                </div>

                {/* Popover Tooltip for Value Propositions */}
                {activePerkTooltip === p.title && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl z-30 animate-fade-in">
                    <div className="font-semibold mb-1 text-[#f29530]">{p.title}</div>
                    <p className="text-gray-300 leading-normal">{p.details}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
              Shop by Category
            </h2>
            <Link href="/catalog" className="text-sm font-semibold text-[#e8761a] hover:underline flex items-center gap-1 group">
              All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-[#e8761a]/40 hover:shadow-xl transition-all p-5 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                <div className="font-semibold text-gray-900 text-sm group-hover:text-[#e8761a] transition">{cat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{cat.count}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-[#faf8f5] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[#e8761a] font-semibold text-sm uppercase tracking-widest mb-1">Handpicked</p>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
                  Featured Products
                </h2>
              </div>
              <Link href="/catalog" className="text-sm font-semibold text-[#e8761a] hover:underline flex items-center gap-1 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1a1a1a] to-[#3d2010] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="text-white">
              <div className="text-[#f29530] font-semibold text-sm uppercase tracking-widest mb-2">Limited Time Offer</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                Up to 40% Off<br />All Categories
              </h3>
              <p className="text-gray-400">This week only. Don&apos;t miss out!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/catalog"
                className="px-8 py-4 bg-[#e8761a] hover:bg-[#d45c0e] text-white font-semibold rounded-full shadow-lg shadow-[#e8761a]/20 hover:scale-105 active:scale-95 transition-all text-center">
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[#e8761a] font-semibold text-sm uppercase tracking-widest mb-1">Just In</p>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
                  New Arrivals
                </h2>
              </div>
              <Link href="/catalog" className="text-sm font-semibold text-[#e8761a] hover:underline flex items-center gap-1 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#faf8f5] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
              What Our Customers Say
            </h2>
            <p className="text-gray-500 mt-2">50,000+ satisfied customers worldwide</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Mitchell", city: "New York", text: "WayPortal completely transformed my living room! The quality and delivery experience were both outstanding.", rating: 5 },
              { name: "James Anderson", city: "Chicago", text: "Excellent products with very reasonable prices. The customer support team was incredibly helpful throughout.", rating: 5 },
              { name: "Emily Chen", city: "San Francisco", text: "This is my second order and the quality is consistently excellent. Highly recommended to anyone furnishing a home.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={"w-4 h-4 " + (i < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200")} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#e8761a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}