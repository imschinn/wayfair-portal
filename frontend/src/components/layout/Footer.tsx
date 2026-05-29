import Link from "next/link";
import { Package, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#e8761a] rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
              WayPortal
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
            Your premium home furnishings destination. Quality furniture, beautiful décor, delivered to your door.
          </p>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <div key={i} className="w-9 h-9 bg-gray-800 hover:bg-[#e8761a] rounded-xl flex items-center justify-center cursor-pointer transition">
                <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Living Room", href: "/catalog?category=Living+Room" },
              { label: "Bedroom", href: "/catalog?category=Bedroom" },
              { label: "Dining Room", href: "/catalog?category=Dining+Room" },
              { label: "Lighting", href: "/catalog?category=Lighting" },
              { label: "Rugs", href: "/catalog?category=Rugs" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-[#e8761a] transition">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Help</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "My Orders", href: "/orders" },
              { label: "Shopping Cart", href: "/cart" },
              { label: "Dashboard", href: "/dashboard" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-[#e8761a] transition">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Account</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Login", href: "/login" },
              { label: "Register", href: "/register" },
              { label: "All Products", href: "/catalog" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-[#e8761a] transition">{link.label}</Link>
              </li>
            ))}
          </ul>
          {/* Newsletter */}
          <div className="mt-6">
            <h4 className="text-white font-semibold text-sm mb-3">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e8761a] min-w-0" />
              <button className="bg-[#e8761a] hover:bg-[#d45c0e] text-white px-3 py-2 rounded-lg text-xs font-semibold transition shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} WayPortal. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
