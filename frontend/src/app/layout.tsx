import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import AIAssistant from "@/components/ai/AIAssistant";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | WayPortal",
    default: "WayPortal — Home Furnishings & Décor",
  },
  description:
    "Premium home furnishings, décor, and lifestyle products. Shop sofas, beds, dining tables, lighting, and more.",
  keywords: ["furniture", "home decor", "sofas", "beds", "lighting", "rugs"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-[--color-surface] antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <AIAssistant />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
