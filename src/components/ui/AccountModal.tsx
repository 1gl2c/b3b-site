"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AccountModal() {
  const { accountOpen, setAccountOpen } = useCart();
  const [tab, setTab] = useState<"signin" | "create">("signin");

  if (!accountOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" onClick={() => setAccountOpen(false)} />
      <div className="relative z-10 bg-[#f5f2ee] w-full max-w-[400px] shadow-2xl">
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#ddd8cf]">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#1a1a1a]">Account</span>
          <button onClick={() => setAccountOpen(false)} className="text-[#8a7f72] hover:text-[#1a1a1a] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-[#ddd8cf]">
          {(["signin", "create"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[10px] tracking-[0.16em] uppercase transition-colors ${
                tab === t ? "text-[#1a1a1a] border-b-2 border-[#1a1a1a]" : "text-[#8a7f72]"
              }`}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="px-7 py-7 flex flex-col gap-4">
          <div>
            <label className="text-[9px] tracking-[0.18em] uppercase text-[#8a7f72] block mb-1.5">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white border border-[#ddd8cf] text-[13px] text-[#1a1a1a] placeholder-[#c5bdb2] outline-none focus:border-[#8a7f72]"
            />
          </div>
          <div>
            <label className="text-[9px] tracking-[0.18em] uppercase text-[#8a7f72] block mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border border-[#ddd8cf] text-[13px] text-[#1a1a1a] placeholder-[#c5bdb2] outline-none focus:border-[#8a7f72]"
            />
          </div>
          {tab === "signin" && (
            <button className="text-[9px] tracking-[0.12em] uppercase text-[#8a7f72] hover:text-[#1a1a1a] text-right transition-colors">
              Forgot password?
            </button>
          )}
          <button className="w-full py-4 bg-[#1a1a1a] text-[#f5f2ee] text-[11px] tracking-[0.22em] uppercase hover:bg-black transition-colors mt-1">
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>
          <p className="text-[10px] text-[#c5bdb2] text-center tracking-[0.06em]">
            {tab === "signin"
              ? "Full account management coming soon. Contact us at hello@b3b.ai."
              : "Join to get early access to new drops and founder notes from Bo."}
          </p>
        </div>
      </div>
    </div>
  );
}
