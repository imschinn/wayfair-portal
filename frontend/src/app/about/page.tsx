import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, Users, Globe, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

const STATS = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Package, value: "500+", label: "Premium Products" },
  { icon: Globe, value: "30+", label: "Cities Delivered" },
  { icon: Award, value: "4.8★", label: "Average Rating" },
];

const TEAM = [
  { name: "Arjun Malhotra", role: "Founder & CEO", initials: "AM" },
  { name: "Sneha Kapoor", role: "Head of Design", initials: "SK" },
  { name: "Vikram Nair", role: "Operations Lead", initials: "VN" },
  { name: "Pooja Desai", role: "Customer Success", initials: "PD" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-[#2d1a0e] py-20 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e8761a]/20 text-[#f29530] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Package className="w-4 h-4" /> Our Story
            </div>
            <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
              About WayPortal
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              WayPortal is a premium furniture and home décor platform dedicated to helping you make your home beautiful. 
              We believe every home has the potential to become a true masterpiece.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-14">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-12 h-12 bg-[#fef8f0] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-[#e8761a]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                WayPortal began in 2020 with a simple idea — that premium quality furniture should be accessible to everyone. 
                Today we are one of the leading home décor platforms.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our products are carefully curated from certified suppliers, and every item goes through a quality check 
                before it reaches your home.
              </p>
              <div className="flex flex-col gap-3">
                {["Certified Quality Products", "Sustainable Sourcing", "Fast & Safe Delivery", "Lifetime Customer Support"].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#e8761a] rounded-full" />
                    <span className="text-gray-700 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#fef8f0] to-[#fdefd9] rounded-3xl p-10 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Award Winning
              </h3>
              <p className="text-gray-600 text-sm">Best Home Décor Platform — India E-Commerce Awards 2025</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-[#faf8f5] py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Team
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:border-[#e8761a]/30 transition shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#e8761a] to-[#f29530] rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
