"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/lib/api";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wp_cart");
    if (stored) {
      try { setItems(JSON.parse(stored)); } catch {}
    }
  }, []);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("wp_cart", JSON.stringify(newItems));
  };

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      const updated = exists
        ? prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { product, quantity: 1 }];
      localStorage.setItem("wp_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId: number) => {
    const updated = items.filter((i) => i.product.id !== productId);
    save(updated);
  };

  const updateQuantity = (productId: number, qty: number) => {
    if (qty < 1) { removeFromCart(productId); return; }
    const updated = items.map((i) =>
      i.product.id === productId ? { ...i, quantity: qty } : i
    );
    save(updated);
  };

  const clearCart = () => {
    save([]);
    localStorage.removeItem("wp_cart");
  };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
