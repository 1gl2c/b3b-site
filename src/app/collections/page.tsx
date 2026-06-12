"use client";
import { useState } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

const categories = ["All", "Backpack", "Gym Bag", "Cylinder Handbag", "Belt Bag", "Crossbody", "Drawstring"];

export default function Collections() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? products
    : products.filter((p) => p.category === active);

  return (
    <div className="bg-[#f5f2ee]">
      <Nav />

      {/* Header */}
      <div className="px-10 pt-14 pb-10 border-b border-[#ddd8cf]">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72]">The Collection</span>
        <h1
          className="text-[48px] italic text-[#1a1a1a] font-normal leading-[1.1] mt-3 mb-7"
          style={{ fontFamily: "Georgia, serif" }}
        >
          All Products
        </h1>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-[10px] tracking-[0.14em] uppercase border transition-colors ${
                active === cat
                  ? "bg-[#1a1a1a] text-[#f5f2ee] border-[#1a1a1a]"
                  : "bg-transparent text-[#8a7f72] border-[#ddd8cf] hover:border-[#8a7f72]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — leading with $1,100 backpack for price anchoring */}
      <div className="grid grid-cols-3 gap-[2px] bg-[#ede9e3] p-[2px]">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
