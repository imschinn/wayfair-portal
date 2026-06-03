"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Package, ArrowRight, Lock, Mail, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2d1a0e] relative overflow-hidden flex-col items-center justify-center px-12">
        {/* Decorative blobs */}
        <div className="absolute w-80 h-80 bg-[#e8761a]/15 rounded-full -top-16 -left-16 blur-3xl" />
        <div className="absolute w-56 h-56 bg-[#e8761a]/8 rounded-full bottom-16 right-8 blur-2xl" />
        <div className="absolute w-32 h-32 bg-orange-400/10 rounded-full top-1/2 left-8 blur-xl" />

        <div className="relative z-10 text-center space-y-8 w-full">
          <Link href="/" className="inline-flex items-center gap-3 group mb-2">
            <div className="w-11 h-11 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[#e8761a]/40 group-hover:shadow-xl transition-all">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              WayPortal
            </span>
          </Link>

          <div>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Welcome Back
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Your dream home is just<br />one sign-in away.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            {[
              "500+ Premium Furniture Products",
              "Free Shipping on Orders Over $49",
              "30-Day Easy Returns",
              "24/7 Customer Support",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 text-left border border-white/8 hover:border-[#e8761a]/30 hover:bg-white/8 transition">
                <div className="w-1.5 h-1.5 bg-[#e8761a] rounded-full shrink-0" />
                <span className="text-gray-300 text-sm">{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10 justify-center">
            <ShieldCheck className="w-4 h-4 text-[#e8761a] shrink-0" />
            <span className="text-gray-400 text-xs">Your data is secure and encrypted</span>
          </div>

          {/* Back to Home — desktop left panel */}
          {/* <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link> */}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Top bar: mobile logo + back button */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="lg:hidden flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-lg flex items-center justify-center shadow-md">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                <span className="text-[#e8761a]">Way</span><span className="text-gray-900">Portal</span>
              </span>
            </Link>

            {/* Back to Home button — always visible on right side */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#e8761a] transition px-3 py-2 rounded-xl hover:bg-orange-50 border border-gray-200 hover:border-[#e8761a]/40 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Sign In
              </h1>
              <p className="text-gray-500 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#e8761a] font-semibold hover:underline">
                  Create one free
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-800">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a]
                               bg-gray-50 hover:bg-white transition placeholder-gray-400"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-800">Password</label>
                  <button type="button" className="text-xs text-[#e8761a] hover:underline font-medium"
                    onClick={() => setError("Password reset is not available in demo mode.")}>
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a]
                               bg-gray-50 hover:bg-white transition placeholder-gray-400"
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#e8761a] to-[#d45c0e]
                           disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all text-sm mt-2
                           shadow-lg shadow-[#e8761a]/20 hover:shadow-[#e8761a]/35 hover:shadow-xl active:scale-[0.98]">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Demo hint */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs space-y-1">
              <p className="font-semibold flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Demo Tip</p>
              <p>Register a new account first, then sign in with those credentials to explore the platform.</p>
            </div>

            <p className="text-center text-xs text-gray-400 mt-5">
              By signing in, you agree to our{" "}
              <span className="text-[#e8761a] cursor-pointer hover:underline">Terms of Service</span> and{" "}
              <span className="text-[#e8761a] cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}