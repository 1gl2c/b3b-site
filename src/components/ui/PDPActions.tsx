"use client";
import { useCart } from "@/context/CartContext";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  remaining?: number;
  shopifyVariantId?: string;
}

export default function PDPActions({ id, name, price, image, remaining, shopifyVariantId }: Props) {
  const { addToCart, addToWishlist } = useCart();
  const item = { id, name, price, image, shopifyVariantId };

  return (
    <>
      {remaining && remaining <= 8 && (
        <p className="text-[10px] tracking-[0.12em] uppercase text-[#c41e3a] mb-4">
          Only {remaining} remaining — limited run
        </p>
      )}
      <button
        onClick={() => addToCart(item)}
        className="w-full py-4 bg-[#f0ebe3] text-[#0e0e0e] text-[11px] tracking-[0.22em] uppercase mb-2.5 hover:bg-white transition-colors"
      >
        Add to Bag
      </button>
      <button
        onClick={() => addToWishlist(item)}
        className="w-full py-4 bg-transparent text-[#f0ebe3] text-[11px] tracking-[0.22em] uppercase border border-[#2a2a2a] hover:border-[#5a5a5a] transition-colors"
      >
        Save to Wishlist
      </button>
    </>
  );
}
