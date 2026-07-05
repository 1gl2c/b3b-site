"use client";
import { useCart } from "@/context/CartContext";
import { WishlistItem } from "@/context/CartContext";
import PurchaseButton from "@/components/ui/PurchaseButton";

interface Props {
  slug: string;
  name: string;
  price: number | null;
  image: string;
  stripePaymentLink: string | null;
}

export default function PDPActions({ slug, name, price, image, stripePaymentLink }: Props) {
  const { addToWishlist } = useCart();
  const wishlistItem: WishlistItem = { id: slug, name, price: price ?? 0, image };

  return (
    <>
      <p className="text-[10px] tracking-[0.12em] uppercase text-[#5a5a5a] mb-4">
        Each piece is cut and stitched by Bo — allow 2–3 weeks.
      </p>
      <PurchaseButton productName={name} stripePaymentLink={stripePaymentLink} />
      <button
        onClick={() => addToWishlist(wishlistItem)}
        className="w-full py-3.5 mt-2.5 bg-transparent text-[#0a0a0a] text-[11px] tracking-[0.22em] uppercase border border-[#e8e4de] rounded-full hover:border-[#0a0a0a] transition-colors"
      >
        Save to Wishlist
      </button>
    </>
  );
}
