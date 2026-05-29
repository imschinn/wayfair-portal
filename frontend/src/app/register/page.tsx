"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Package, ArrowRight, Lock, Mail, User, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabel = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = register(name, email, password);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1800);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2d1a0e] relative overflow-hidden flex-col items-center justify-center px-12">
        <div className="absolute w-80 h-80 bg-[#e8761a]/15 rounded-full -bottom-16 -right-16 blur-3xl" />
        <div className="absolute w-56 h-56 bg-[#e8761a]/8 rounded-full top-20 left-10 blur-2xl" />

        <div className="relative z-10 text-center space-y-8 w-full">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              WayPortal
            </span>
          </Link>

          <div>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Join Our Community
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Thousands of happy customers have<br />transformed their homes with WayPortal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "500+", label: "Products" },
              { num: "4.8★", label: "Average Rating" },
              { num: "30", label: "Day Returns" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-2xl p-4 text-center border border-white/8 hover:border-[#e8761a]/30 transition">
                <div className="text-xl font-bold text-[#e8761a] mb-1">{stat.num}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {["Free account, no credit card required", "Access to exclusive member deals", "Track orders & manage returns easily"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-left">
                <CheckCircle2 className="w-4 h-4 text-[#e8761a] shrink-0" />
                <span className="text-gray-400 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="lg:hidden flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                <span className="text-[#e8761a]">Way</span><span className="text-gray-900">Portal</span>
              </span>
            </Link>
            <div className="hidden lg:block" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 sm:p-10">
            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    Account Created!
                  </h2>
                  <p className="text-gray-500 text-sm">Redirecting you to the login page…</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    Create Account
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#e8761a] font-semibold hover:underline">Sign in</Link>
                  </p>
                </div>

                {error && (
                  <div className="mb-5 px-4 py-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-800">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a] bg-gray-50 hover:bg-white transition placeholder-gray-400"
                        required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-800">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a] bg-gray-50 hover:bg-white transition placeholder-gray-400"
                        required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-800">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a] bg-gray-50 hover:bg-white transition placeholder-gray-400"
                        required />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength() ? strengthColor[passwordStrength()] : "bg-gray-200"}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{strengthLabel[passwordStrength()]}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-800">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`w-full pl-11 pr-11 py-3.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a] bg-gray-50 hover:bg-white transition placeholder-gray-400 ${confirm && password !== confirm ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                        required />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {confirm && password !== confirm && (
                      <p className="text-xs text-red-500 font-medium">Passwords do not match</p>
                    )}
                    {confirm && password === confirm && confirm.length > 0 && (
                      <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#e8761a] to-[#d45c0e]
                               disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all text-sm mt-2
                               shadow-lg shadow-[#e8761a]/20 hover:shadow-[#e8761a]/35 hover:shadow-xl active:scale-[0.98]">
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>Create Account <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-5">
                  By creating an account, you agree to our{" "}
                  <span className="text-[#e8761a] cursor-pointer hover:underline">Terms of Service</span> and{" "}
                  <span className="text-[#e8761a] cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
