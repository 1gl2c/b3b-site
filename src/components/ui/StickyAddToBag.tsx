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
    <div className="sticky bottom-0 bg-white border-t border-[#e8e4de] px-10 py-3.5 flex items-center justify-between z-40">
      <div>
        <div className="text-[13px] italic font-serif text-[#0a0a0a]">
          {name}
        </div>
        <div className="text-[10px] text-[#8a7f72] tracking-[0.1em] mt-0.5">
          {/* TODO: confirm shipping policy before launch */}
          {category} · {price != null ? `$${price.toLocaleString()}` : "Pricing soon"} · Ships in 2–3 weeks
        </div>
      </div>
      <div className="w-52">
        <PurchaseButton productName={name} stripePaymentLink={stripePaymentLink} />
      </div>
    </div>
  );
}
