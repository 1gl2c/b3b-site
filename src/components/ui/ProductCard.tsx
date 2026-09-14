import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block"
    >
      <div className={`relative overflow-hidden bg-[#F2F1EF] ${tall ? "aspect-[3/4]" : "aspect-square"}`}>
        <Image
          src={product.card.primary}
          alt={product.name}
          fill
          className={`object-cover ${product.soldOut ? "opacity-50" : ""}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <Image
          src={product.card.hover}
          alt=""
          fill
          className="product-card-hover-img object-cover opacity-0 transition-opacity duration-[400ms]"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        {product.soldOut && (
          <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] tracking-[0.18em] uppercase px-2.5 py-1">
            Sold Out
          </span>
        )}
      </div>

      <div className="pt-3">
        <div className="text-[15px] text-[#1a1a1a]">{product.name}</div>
        <div className="text-[15px] text-[#1a1a1a]/55">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
