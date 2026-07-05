"use client";
import PurchaseButton from "@/components/ui/PurchaseButton";

interface Props {
  name: string;
  price: number | null;
  category: string;
  stripePaymentLink: string | null;
}

export default function StickyAddToBag({ name, price, category, stripePaymentLink }: Props) {
  return (
    <div className="sticky bottom-0 bg-[#0e0e0e] border-t border-[#1e1e1e] px-10 py-3.5 flex items-center justify-between z-40">
      <div>
        <div className="text-[13px] italic text-[#f0ebe3]" style={{ fontFamily: "Georgia, serif" }}>
          {name}
        </div>
        <div className="text-[10px] text-[#3a3a3a] tracking-[0.1em] mt-0.5">
          {category} · {price != null ? `$${price.toLocaleString()}` : "Pricing soon"}
        </div>
      </div>
      <div className="w-52">
        <PurchaseButton productName={name} stripePaymentLink={stripePaymentLink} />
      </div>
    </div>
  );
}
