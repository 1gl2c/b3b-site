"use client";
import { useCart, CartLineInput } from "@/context/CartContext";

interface Props {
  product: CartLineInput;
  stripePaymentLink: string | null;
}

export default function PurchaseButton({ product, stripePaymentLink }: Props) {
  const { addToCart, setCartOpen } = useCart();

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
