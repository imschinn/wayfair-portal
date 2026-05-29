"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "Hi! I'm your WayPortal AI assistant. I can help you find the perfect furniture, answer product questions, or give home décor advice. What are you looking for today?";

const QUICK_PROMPTS = [
  "Recommend a sofa for small spaces",
  "Best bedroom furniture under $500",
  "How to style a dining room",
  "What rugs suit modern homes?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  const sendMessage = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const systemPrompt = `You are a helpful AI shopping assistant for WayPortal, a premium home furnishings e-commerce store.
WayPortal sells: sofas, sectionals, beds, dining tables, chairs, lighting fixtures, rugs, and home décor accessories.
Price range: $50 - $5,000. Key selling points: free shipping over $49, 30-day returns, quality guarantee.

Help users with: product recommendations, style advice, room planning, budget tips, and product comparisons.
Keep responses concise, friendly, and focused on home furnishings. Use bullet points for lists.
Always try to guide users toward products available on WayPortal.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.map((c: { type: string; text?: string }) => c.type === "text" ? c.text : "").filter(Boolean).join("\n") || "I'm here to help! Could you tell me more about what you're looking for?";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment!" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-full shadow-2xl shadow-[#e8761a]/40 flex items-center justify-center hover:scale-105 transition-all group"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-200 ${minimized ? "w-72 h-14" : "w-80 sm:w-96 h-[540px]"}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#e8761a] to-[#d45c0e] rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AI Shopping Assistant</p>
                {!minimized && <p className="text-white/70 text-xs">Powered by Claude AI</p>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMinimized(!minimized)} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition">
                {minimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-[#e8761a] to-[#d45c0e]"
                        : "bg-gray-200"
                    }`}>
                      {msg.role === "assistant"
                        ? <Bot className="w-3.5 h-3.5 text-white" />
                        : <User className="w-3.5 h-3.5 text-gray-600" />}
                    </div>
                    <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "assistant"
                        ? "bg-gray-50 text-gray-800 rounded-tl-sm"
                        : "bg-gradient-to-br from-[#e8761a] to-[#d45c0e] text-white rounded-tr-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e8761a] to-[#d45c0e] flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-3.5 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Quick prompts - only show if first message */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((p) => (
                    <button key={p} onClick={() => sendMessage(p)}
                      className="text-xs bg-orange-50 text-[#e8761a] border border-orange-200 rounded-full px-2.5 py-1 hover:bg-orange-100 transition">
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-gray-100">
                <div className="flex gap-2 items-end">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask about products, styles, advice…"
                    rows={1}
                    className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e8761a]/30 focus:border-[#e8761a] placeholder-gray-400 transition max-h-24"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="w-9 h-9 bg-gradient-to-br from-[#e8761a] to-[#d45c0e] rounded-xl flex items-center justify-center disabled:opacity-40 transition hover:shadow-lg shrink-0"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
