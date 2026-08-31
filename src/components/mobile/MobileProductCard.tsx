import Link from "next/link";
import FramedCard from "@/components/mobile/FramedCard";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

/**
 * Framed product card for the mobile feed and collection grid. `object-contain`
 * on white keeps the whole bag visible (no crop) — matches the desktop PDP
 * treatment. Links to the shared `/products/[slug]` URL.
 */
export default function MobileProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block transition-transform duration-100 active:scale-[0.98]"
    >
      <FramedCard
        src={product.card.primary}
        alt={product.name}
        ratio="4 / 5"
        fit="contain"
        sizes="(max-width: 480px) 46vw, 220px"
      />
      <div className="px-1 pt-3">
        <div className="text-[14px] leading-tight text-[#1a1a1a]">{product.name}</div>
        <div className="text-[14px] text-[#1a1a1a]/55">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
