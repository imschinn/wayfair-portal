"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Package, ShoppingCart, Star, Clock } from "lucide-react";

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
            Welcome back, {user?.name.split(" ")[0]}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{today}</p>
        </div>

        {/* Account Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Active Orders", value: "0", icon: Package, color: "bg-blue-50 text-blue-600" },
            { label: "Items in Cart", value: "0", icon: ShoppingCart, color: "bg-orange-50 text-orange-600" },
            { label: "Wishlist Items", value: "0", icon: Star, color: "bg-yellow-50 text-yellow-600" },
            { label: "Account Status", value: "Active", icon: Clock, color: "bg-emerald-50 text-emerald-600" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-0.5">{card.value}</div>
              <div className="text-xs text-gray-400 font-medium">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4 text-lg">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Browse Products", href: "/catalog", emoji: "🛍️" },
              { label: "View Orders", href: "/orders", emoji: "📦" },
              { label: "Shopping Cart", href: "/cart", emoji: "🛒" },
            ].map((action) => (
              <a key={action.label} href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#e8761a]/40 hover:bg-orange-50/30 transition text-center group">
                <span className="text-2xl">{action.emoji}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#e8761a] transition">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4 text-lg">Account Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-full flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 px-1">
              Your account is active and ready to use. Browse our catalog to find the perfect pieces for your home.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
