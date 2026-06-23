"use client";
import { useCart } from "@/context/CartContext";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  origin: string;
}

export default function StickyAddToBag({ id, name, price, image, material, origin }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="sticky bottom-0 bg-[#0e0e0e] border-t border-[#1e1e1e] px-10 py-3.5 flex items-center justify-between z-40">
      <div>
        <div className="text-[13px] italic text-[#f0ebe3]" style={{ fontFamily: "Georgia, serif" }}>
          {name}
        </div>
        <div className="text-[10px] text-[#3a3a3a] tracking-[0.1em] mt-0.5">
          {material} · {origin}
        </div>
      </div>
      <button
        onClick={() => addToCart({ id, name, price, image })}
        className="px-7 py-3 bg-[#f0ebe3] text-[#0e0e0e] text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-colors"
      >
        Add to Bag — ${price.toLocaleString()}
      </button>
    </div>
  );
}
