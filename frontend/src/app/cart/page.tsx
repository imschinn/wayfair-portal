"use client";
import { useEffect } from 'react';

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Package } from "lucide-react";

export default function CartPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  
  useEffect(() => { 
    if (!isLoggedIn) router.replace("/login"); 
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const shipping = totalPrice >= 49 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#fafaf8]">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Your cart is empty
            </h1>
            <p className="text-gray-500 mb-8">
              Your cart is empty. Let's find some great products!
            </p>
            <Link href="/catalog"
              className="inline-flex items-center gap-2 bg-[#e8761a] hover:bg-[#d45c0e] text-white font-semibold px-8 py-3.5 rounded-xl transition">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#fafaf8] min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
              Shopping Cart
            </h1>
            <p className="text-gray-500 text-sm mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} in cart</p>
          </div>
          <button onClick={clearCart}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition">
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:border-[#e8761a]/30 transition">
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                  <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                        {item.product.category}
                      </p>
                      <Link href={`/catalog/${item.product.id}`}
                        className="font-semibold text-gray-900 hover:text-[#e8761a] transition line-clamp-1">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">SKU: {item.product.sku}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 transition">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 transition">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-400">{formatCurrency(item.product.price)} each</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/catalog"
              className="flex items-center gap-2 text-sm text-[#e8761a] hover:underline mt-2 w-fit">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Coupon code"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40" />
                </div>
                <button className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition">
                  Apply
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-gray-900">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-medium" : "font-medium text-gray-900"}>
                    {shipping === 0 ? "FREE 🎉" : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                    ${(49 - totalPrice).toFixed(2)} more to qualify for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[#e8761a]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-[#e8761a] hover:bg-[#d45c0e] text-white font-semibold py-4 rounded-xl
                           transition flex items-center justify-center gap-2 text-base">
                <ShoppingBag className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>🔒 Secure Checkout</span>
                <span>·</span>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}