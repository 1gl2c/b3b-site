"use client";

interface Props {
  productName: string;
  stripePaymentLink: string | null;
}

export default function PurchaseButton({ productName, stripePaymentLink }: Props) {
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
        // TODO: wire to cart
      }}
      aria-label={`Add ${productName} to bag`}
      className="w-full py-4 bg-[#0a0a0a] text-white text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 hover:bg-[#c41e1e]"
    >
      Add to Bag
    </button>
  );
}
