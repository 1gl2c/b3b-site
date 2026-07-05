import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  const secondary = product.images[1];

  return (
    <Link href={`/products/${product.slug}`} className="block group bg-white overflow-hidden cursor-pointer">
      <div className={`relative overflow-hidden ${tall ? "h-[340px]" : "h-[240px]"}`}>
        <span className="absolute top-3 left-3 z-10 bg-[#1a1a1a] text-[#f5f2ee] text-[8px] tracking-[0.18em] uppercase px-2.5 py-1">
          Made to Order
        </span>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${secondary ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {secondary && (
          <Image
            src={secondary}
            alt={`${product.name} alternate`}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="px-4 pt-3.5 pb-5 border-t border-[#ede9e3]">
        <div className="text-[9px] tracking-[0.16em] uppercase text-[#8a7f72] mb-1">{product.category}</div>
        <div className="text-[15px] italic text-[#1a1a1a] mb-1.5" style={{ fontFamily: "Georgia, serif" }}>
          {product.name}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>
            {product.price != null ? `$${product.price.toLocaleString()}` : "Pricing soon"}
          </span>
          <span className="text-[9px] tracking-[0.12em] uppercase text-[#8a7f72]">
            2–3 wk lead
          </span>
        </div>
      </div>
    </Link>
  );
}
