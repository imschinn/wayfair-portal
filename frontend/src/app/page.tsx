"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalog/ProductCard";
import { ALL_MOCK_PRODUCTS } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, ArrowRight, Star,
  Truck, RotateCcw, Shield, Headphones
} from "lucide-react";

const SLIDES = [
  {
    title: "Transform Your Living Room",
    subtitle: "Up to 40% off on premium sofas & sectionals",
    cta: "Shop Living Room",
    href: "/catalog?category=Living+Room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    dark: true,
  },
  {
    title: "Your Dream Bedroom Awaits",
    subtitle: "Luxury beds, dressers & nightstands at great prices",
    cta: "Shop Bedroom",
    href: "/catalog?category=Bedroom",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    dark: true,
  },
  {
    title: "Dining in Style",
    subtitle: "Solid wood tables & chairs for every home",
    cta: "Shop Dining",
    href: "/catalog?category=Dining+Room",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80",
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
  { icon: Truck, title: "Free Shipping", desc: "On orders over $49" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked" },
  { icon: Shield, title: "Quality Guarantee", desc: "Verified products" },
  { icon: Headphones, title: "24/7 Support", desc: "Always available" },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const featuredProducts = ALL_MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);
  const newArrivals = ALL_MOCK_PRODUCTS.slice(-6);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Slider */}
        <section className="relative h-[480px] sm:h-[560px] overflow-hidden">
          {SLIDES.map((s, i) => (
            <div key={i}
              className={"absolute inset-0 transition-opacity duration-700 " + (i === slide ? "opacity-100 z-10" : "opacity-0 z-0")}>
              <Image src={s.image} alt={s.title} fill className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6 sm:px-10">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold mb-4 px-3 py-1 rounded-full bg-[#e8761a]/20 text-[#f29530]">
                    <Star className="w-3.5 h-3.5" /> New Collection 2026
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    {s.title}
                  </h1>
                  <p className="text-gray-300 text-lg mb-8">{s.subtitle}</p>
                  <Link href={s.href}
                    className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-white bg-[#e8761a] hover:bg-[#d45c0e] transition">
                    {s.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={"transition-all rounded-full " + (i === slide ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50")} />
            ))}
          </div>
        </section>

        {/* Perks Bar */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {PERKS.map((p) => (
              <div key={p.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fef8f0] rounded-xl flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-[#e8761a]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{p.title}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
              Shop by Category
            </h2>
            <Link href="/catalog" className="text-sm font-semibold text-[#e8761a] hover:underline flex items-center gap-1">
              All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-[#e8761a]/40 hover:shadow-lg transition-all p-5 text-center">
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <div className="font-semibold text-gray-900 text-sm group-hover:text-[#e8761a] transition">{cat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{cat.count}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-[#faf8f5] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[#e8761a] font-semibold text-sm uppercase tracking-widest mb-1">Handpicked</p>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
                  Featured Products
                </h2>
              </div>
              <Link href="/catalog" className="text-sm font-semibold text-[#e8761a] hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1a1a1a] to-[#3d2010] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <div className="text-[#f29530] font-semibold text-sm uppercase tracking-widest mb-2">Limited Time Offer</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                Up to 40% Off<br />All Categories
              </h3>
              <p className="text-gray-400">This week only. Don&apos;t miss out!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/catalog"
                className="px-8 py-3.5 bg-[#e8761a] hover:bg-[#d45c0e] text-white font-semibold rounded-full transition text-center">
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[#e8761a] font-semibold text-sm uppercase tracking-widest mb-1">Just In</p>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
                  New Arrivals
                </h2>
              </div>
              <Link href="/catalog" className="text-sm font-semibold text-[#e8761a] hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
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
        <section className="bg-[#faf8f5] py-14">
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
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
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
