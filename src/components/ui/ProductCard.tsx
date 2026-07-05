import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  const secondary = product.images[1] && product.images[1] !== product.images[0]
    ? product.images[1]
    : undefined;

  return (
    <Link href={`/products/${product.slug}`} className="block group bg-white overflow-hidden cursor-pointer">
      <div className={`relative overflow-hidden ${tall ? "h-[340px]" : "h-[240px]"}`}>
        <span className="absolute top-3 left-3 z-10 text-[8px] tracking-[0.18em] uppercase text-[#8a7f72]">
          Made to Order
        </span>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500 ${
            secondary ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
          }`}
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

      <div className="px-4 pt-3.5 pb-5 border-b border-[#ede9e3]">
        <div className="text-[9px] tracking-[0.16em] uppercase text-[#8a7f72] mb-1">{product.category}</div>
        <div className="text-[15px] italic font-serif text-[#0a0a0a] mb-1.5 group-hover:underline underline-offset-2 decoration-[#0a0a0a]/30 transition-all">
          {product.name}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] italic text-[#8a7f72] font-serif">
            {product.price != null ? `$${product.price.toLocaleString()}` : "Pricing soon"}
          </span>
        </div>
      </div>
    </Link>
  );
}
