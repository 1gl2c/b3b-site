import Link from "next/link";
import Image from "next/image";

interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
  remaining?: number;
  image?: string;
}

export default function ProductCard({
  product,
  tall = false,
}: {
  product: Product;
  tall?: boolean;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="block group bg-white overflow-hidden cursor-pointer">
      <div className={`bg-[#ede9e3] relative overflow-hidden ${tall ? "h-[300px]" : "h-[220px]"}`}>
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#1a1a1a] text-[#f5f2ee] text-[8px] tracking-[0.18em] uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c5bdb2" strokeWidth="1" className="opacity-60">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pt-3.5 pb-5 border-t border-[#ede9e3]">
        <div className="text-[9px] tracking-[0.16em] uppercase text-[#8a7f72] mb-1">{product.category}</div>
        <div
          className="text-[15px] italic text-[#1a1a1a] mb-1.5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {product.name}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>
            ${product.price.toLocaleString()}
          </span>
          {product.remaining && product.remaining <= 8 && (
            <span className="text-[9px] tracking-[0.12em] uppercase text-[#8a7f72]">
              {product.remaining} remaining
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
