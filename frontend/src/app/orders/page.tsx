"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-92741",
    date: "2026-05-27",
    status: "Shipped",
    total: 1849.99,
    items: [
      { name: "Hartwell Mid-Century Sectional Sofa", qty: 1, price: 1299.99, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=90&auto=format&fit=crop" },
      { name: "Cascade Pendant Light — Brass", qty: 2, price: 275.00, image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=90&auto=format&fit=crop" },
    ],
    tracking: "IND2026052789123",
    eta: "2026-05-31",
    steps: [
      { label: "Order Placed", done: true, date: "May 27, 9:30 AM" },
      { label: "Processing", done: true, date: "May 27, 2:00 PM" },
      { label: "Shipped", done: true, date: "May 28, 10:00 AM" },
      { label: "Out for Delivery", done: false, date: "Expected May 31" },
      { label: "Delivered", done: false, date: "" },
    ],
  },
  {
    id: "ORD-92738",
    date: "2026-05-26",
    status: "Delivered",
    total: 679.99,
    items: [
      { name: "Elara Velvet King Bed Frame", qty: 1, price: 679.99, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=90&auto=format&fit=crop" },
    ],
    tracking: "IND2026052665432",
    eta: "2026-05-29",
    steps: [
      { label: "Order Placed", done: true, date: "May 26, 11:00 AM" },
      { label: "Processing", done: true, date: "May 26, 3:00 PM" },
      { label: "Shipped", done: true, date: "May 27, 9:00 AM" },
      { label: "Out for Delivery", done: true, date: "May 28, 8:00 AM" },
      { label: "Delivered", done: true, date: "May 28, 4:00 PM" },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!isLoggedIn) router.replace("/login"); }, [isLoggedIn, router]);
  if (!isLoggedIn) return null;
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>("ORD-92741");

  const filtered = MOCK_ORDERS.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            My Orders
          </h1>
          <p className="text-gray-500 text-sm">Track and manage your orders</p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by order ID…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40" />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Order header */}
                <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50/50 transition"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#fef8f0] rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#e8761a]" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-400">{order.date} · {order.items.length} item(s)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                    <div className="text-right hidden sm:block">
                      <div className="font-bold text-gray-900">${order.total.toFixed(2)}</div>
                    </div>
                    {expanded === order.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === order.id && (
                  <div className="border-t border-gray-100 p-5 space-y-6">
                    {/* Items */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.name} className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                              <div className="text-xs text-gray-400">Qty: {item.qty}</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tracking */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-900">Tracking</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" /> {order.tracking}
                        </div>
                      </div>
                      <div className="relative">
                        {/* Progress line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
                        <div className="space-y-4">
                          {order.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-4 relative">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                                ${step.done ? "bg-emerald-500" : "bg-gray-100"}`}>
                                {step.done ? (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <Clock className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                              <div className="pt-0.5">
                                <div className={`text-sm font-medium ${step.done ? "text-gray-900" : "text-gray-400"}`}>
                                  {step.label}
                                </div>
                                {step.date && (
                                  <div className="text-xs text-gray-400 mt-0.5">{step.date}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ETA */}
                    {order.status !== "Delivered" && (
                      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-xl px-4 py-3 text-sm">
                        <Truck className="w-4 h-4" />
                        Expected Delivery: <strong>{order.eta}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
