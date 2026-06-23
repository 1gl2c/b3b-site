"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data";

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (searchOpen) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 60); }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" onClick={() => setSearchOpen(false)} />
      <div className="relative z-10 bg-[#f5f2ee] mx-auto mt-20 w-full max-w-[600px] shadow-2xl">
        <div className="flex items-center border-b border-[#ddd8cf] px-6 py-4 gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a7f72" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bags, materials, categories..."
            className="flex-1 bg-transparent text-[14px] text-[#1a1a1a] placeholder-[#c5bdb2] outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[#c5bdb2] hover:text-[#8a7f72]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {query.trim().length > 1 && (
          <div className="max-h-[400px] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-6 py-8 text-center text-[12px] text-[#8a7f72]">No results for "{query}"</div>
            ) : (
              results.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#ede9e3] transition-colors border-b border-[#ede9e3] last:border-b-0"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 bg-[#ede9e3] overflow-hidden">
                    {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />}
                  </div>
                  <div>
                    <div className="text-[13px] italic text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>{p.name}</div>
                    <div className="text-[10px] tracking-[0.12em] uppercase text-[#8a7f72]">{p.category} · ${p.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {!query && (
          <div className="px-6 py-5">
            <div className="text-[9px] tracking-[0.2em] uppercase text-[#c5bdb2] mb-3">All Categories</div>
            <div className="flex flex-wrap gap-2">
              {["Backpack", "Gym Bag", "Belt Bag", "Cylinder Handbag", "Crossbody", "Drawstring"].map((cat) => (
                <Link
                  key={cat}
                  href="/collections"
                  onClick={() => setSearchOpen(false)}
                  className="text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 border border-[#ddd8cf] text-[#8a7f72] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
