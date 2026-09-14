"use client";
import { useCart, CartLineInput } from "@/context/CartContext";

interface Props {
  product: CartLineInput;
  stripePaymentLink: string | null;
  soldOut?: boolean;
}

export default function PurchaseButton({ product, stripePaymentLink, soldOut }: Props) {
  const { addToCart, setCartOpen } = useCart();

  if (soldOut) {
    return (
      <button
        disabled
        aria-label={`${product.name} is sold out`}
        className="w-full py-4 bg-[#e8e4de] text-[#8a7f72] text-[11px] tracking-[0.22em] uppercase cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }

  if (stripePaymentLink) {
    return (
      <a
        href={stripePaymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 bg-[#0a0a0a] text-white text-[11px] tracking-[0.22em] uppercase text-center block transition-colors duration-200 hover:bg-[#c41e1e]"
      >
        Purchase
      </a>
    );
  }

  return (
    <button
      onClick={() => {
        addToCart(product);
        setCartOpen(true);
      }}
      aria-label={`Add ${product.name} to bag`}
      className="w-full py-4 bg-[#0a0a0a] text-white text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 hover:bg-[#c41e1e]"
    >
      Add to Bag
    </button>
  );
}
