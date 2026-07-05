"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

const categories = ["All", "Backpack", "Belt Bag", "Crossbody", "Duffle", "Handbag", "Sling", "Tote", "Accessory"];

function CollectionsInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const validInitial = categories.includes(initialCategory) ? initialCategory : "All";
  const [active, setActive] = useState(validInitial);

  useEffect(() => {
    const cat = searchParams.get("category") ?? "All";
    if (categories.includes(cat)) setActive(cat);
  }, [searchParams]);

  const filtered = active === "All"
    ? products
    : products.filter((p) => p.category === active);

  return (
    <div className="bg-[#F8F6F2]">
      <Nav />

      <div className="px-10 pt-14 pb-10 border-b border-[#e8e4de]">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72]">The Collection</span>
        <h1 className="text-[48px] italic font-serif text-[#0a0a0a] font-normal leading-[1.1] mt-3 mb-7">
          All Products
        </h1>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.14em] uppercase border rounded-full transition-colors ${
                active === cat
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                  : "bg-transparent text-[#8a7f72] border-[#ddd8cf] hover:border-[#8a7f72]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e4de] p-px">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default function Collections() {
  return (
    <Suspense fallback={<div className="bg-[#F8F6F2] min-h-screen" />}>
      <CollectionsInner />
    </Suspense>
  );
}
