"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-[#1a1a1a] py-16 text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Contact Us
          </h1>
          <p className="text-gray-400">Have a question? We're here to help!</p>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
              Contact Information
            </h2>
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", info: "+91 96179 88233", sub: "Mon-Sat, 9am - 6pm" },
                { icon: Mail, title: "Email", info: "sachinnayma@gmail.com", sub: "Replies within 24 hours" },
                { icon: MapPin, title: "Address", info: "Vijay Nagar, Indore, MP 452020", sub: "India" },
                { icon: Clock, title: "Working Hours", info: "Monday – Saturday", sub: "9:00 AM – 6:00 PM IST" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#fef8f0] rounded-2xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#e8761a]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-gray-700 text-sm mt-0.5">{item.info}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-br from-[#fef8f0] to-[#fdefd9] rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Quick Help</h3>
              <p className="text-sm text-gray-600">
                Email us directly for order tracking, returns, or any other issue. 
                We typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-500">We'll get back to you shortly. Thank you!</p>
                <button onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 bg-[#e8761a] text-white font-semibold rounded-xl hover:bg-[#d45c0e] transition text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name" required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com" required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What would you like to ask?" required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Type your message here..." rows={5} required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/40 resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#e8761a] hover:bg-[#d45c0e] text-white font-semibold py-3.5 rounded-xl transition">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}