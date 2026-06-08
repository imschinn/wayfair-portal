"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart, Menu, X, Package, BarChart3, Search,
  MapPin, LogOut, ChevronDown, Home, BookOpen
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const NAV_CATEGORIES = [
  { label: "Living Room", href: "/catalog?category=Living+Room" },
  { label: "Bedroom", href: "/catalog?category=Bedroom" },
  { label: "Dining Room", href: "/catalog?category=Dining+Room" },
  { label: "Lighting", href: "/catalog?category=Lighting" },
  { label: "Rugs", href: "/catalog?category=Rugs" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (userMenuOpen && !target.closest("[data-user-menu]")) setUserMenuOpen(false);
      if (catalogMenuOpen && !target.closest("[data-catalog-menu]")) setCatalogMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen, catalogMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
        : "bg-white border-b border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight hidden md:inline" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="text-[#e8761a]">Way</span>
              <span className="text-gray-900">Portal</span>
            </span>
          </Link>

          {/* 2. Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search premium furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-2.5 bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-[#e8761a] rounded-full outline-none transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </form>

          {/* 3. Navigation Links & Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#e8761a] transition px-3 py-2 rounded-lg hover:bg-neutral-50">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            {/* Catalog Dropdown Trigger */}
            <div className="relative" data-catalog-menu>
              <button
                onClick={() => setCatalogMenuOpen(!catalogMenuOpen)}
                className={`flex items-center gap-1.5 text-sm font-medium transition px-3 py-2 rounded-lg hover:bg-neutral-50 ${catalogMenuOpen ? "text-[#e8761a]" : "text-gray-600 hover:text-[#e8761a]"}`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Catalog</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catalogMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {catalogMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <Link href="/catalog" onClick={() => setCatalogMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-neutral-50 hover:text-[#e8761a] border-b border-neutral-50">
                    Browse All Furniture
                  </Link>
                  {NAV_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setCatalogMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-neutral-50 hover:text-[#e8761a]"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn && (
              <>
                <Link href="/orders" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#e8761a] transition px-3 py-2 rounded-lg hover:bg-neutral-50">
                  <MapPin className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
                <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#e8761a] transition px-3 py-2 rounded-lg hover:bg-neutral-50">
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </nav>

          {/* 4. Action Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Shopping Cart Button */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-[#e8761a] transition rounded-lg hover:bg-neutral-50">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#e8761a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Auth section */}
            {isLoggedIn ? (
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#e8761a] transition px-2 py-1.5 rounded-lg hover:bg-neutral-50"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-inner">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[70px] truncate hidden sm:inline">{user?.name.split(" ")[0]}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Logged in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-neutral-50 hover:text-[#e8761a]">
                      <MapPin className="w-4 h-4 text-gray-400" /> My Orders
                    </Link>
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-neutral-50 hover:text-[#e8761a]">
                      <BarChart3 className="w-4 h-4 text-gray-400" /> Dashboard
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-[#e8761a] transition px-3 py-2 rounded-lg hover:bg-neutral-50">
                  Login
                </Link>
                <Link href="/register"
                  className="text-sm font-semibold bg-[#e8761a] hover:bg-[#d45c0e] text-white px-4 py-2 rounded-full transition shadow-md shadow-[#e8761a]/10">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger toggle */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-[#e8761a] transition rounded-lg hover:bg-neutral-50" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer layout overlay */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-xl">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-2 bg-neutral-50 border border-gray-200 rounded-xl outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>

          <div className="space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-neutral-50 rounded-lg transition">
              <Home className="w-4 h-4" /> Home
            </Link>
            
            {/* Expanded Catalog view for Mobile */}
            <div className="py-1">
              <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Catalog Categories</div>
              <Link href="/catalog" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2 px-6 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-neutral-50 rounded-lg transition">
                All Products
              </Link>
              {NAV_CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 px-6 text-sm font-medium text-gray-600 hover:text-[#e8761a] hover:bg-neutral-50 rounded-lg transition">
                  {cat.label}
                </Link>
              ))}
            </div>

            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 mt-4 mb-2 bg-neutral-50 rounded-xl">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <Link href="/orders" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-neutral-50 rounded-lg transition">
                  <MapPin className="w-4 h-4" /> My Orders
                </Link>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-neutral-50 rounded-lg transition">
                  <BarChart3 className="w-4 h-4" /> Dashboard
                </Link>
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2 pt-4 border-t border-gray-100 mt-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-700 font-medium px-3 py-2 border border-gray-200 rounded-xl hover:bg-neutral-50 transition">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-[#e8761a] text-white px-4 py-2 rounded-xl transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}