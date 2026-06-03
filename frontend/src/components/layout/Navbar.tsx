"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart, Menu, X, Package, BarChart3,
  MapPin, LogOut, ChevronDown, LogIn, UserPlus, Home, BookOpen
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-menu]")) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg"
        : "bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight hidden sm:inline" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="text-[#e8761a]">Way</span>
              <span className="text-gray-900">Portal</span>
            </span>
          </Link>

          {/* Centre nav links — visible to all */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#e8761a] transition px-3 py-1.5 rounded-lg hover:bg-gray-100">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link href="/catalog" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#e8761a] transition px-3 py-1.5 rounded-lg hover:bg-gray-100">
              <BookOpen className="w-4 h-4" />
              <span>Catalog</span>
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/orders" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#e8761a] transition px-3 py-1.5 rounded-lg hover:bg-gray-100">
                  <MapPin className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
                <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#e8761a] transition px-3 py-1.5 rounded-lg hover:bg-gray-100">
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {/* Cart — visible to all */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-[#e8761a] transition rounded-lg hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] text-white
                                 text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Auth section */}
            {isLoggedIn ? (
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hidden sm:flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#e8761a] transition px-2 py-1 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[80px] truncate">{user?.name.split(" ")[0]}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Logged in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#e8761a]">
                      <MapPin className="w-4 h-4" /> My Orders
                    </Link>
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#e8761a]">
                      <BarChart3 className="w-4 h-4" /> Dashboard
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
              /* Login + Register for unauthenticated users */
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#e8761a] transition px-3 py-1.5 rounded-lg hover:bg-gray-100 border border-gray-200 hover:border-[#e8761a]/40">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link href="/register"
                  className="flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-[#e8761a] to-[#d45c0e] hover:shadow-lg text-white px-4 py-1.5 rounded-full transition duration-200 shadow-md">
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button className="sm:hidden p-2 text-gray-600 hover:text-[#e8761a] transition rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {/* Nav links visible to all */}
          <Link href="/" onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-gray-50 rounded-lg transition">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/catalog" onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-gray-50 rounded-lg transition">
            <BookOpen className="w-4 h-4" /> Catalog
          </Link>

          {isLoggedIn ? (
            <>
              {/* User info card */}
              <div className="flex items-center gap-3 px-3 py-2 mt-2 mb-1 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Link href="/orders" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-gray-50 rounded-lg transition">
                <MapPin className="w-4 h-4" /> My Orders
              </Link>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-[#e8761a] hover:bg-gray-50 rounded-lg transition">
                <BarChart3 className="w-4 h-4" /> Dashboard
              </Link>
              <div className="pt-2 border-t border-gray-100">
                <button onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </>
          ) : (
            /* Login / Register for unauthenticated mobile users */
            <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-700 font-medium px-3 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-[#e8761a] to-[#d45c0e] text-white px-4 py-2.5 rounded-xl transition">
                <UserPlus className="w-4 h-4" /> Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
