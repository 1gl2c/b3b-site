"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  const [hoverSrc, setHoverSrc] = useState(product.card.hover);
  const [triedFallback, setTriedFallback] = useState(false);

  // {code}-model.png may not exist yet — fall back to {code}-a2.png with no code change
  // required once the model shot is actually added to the folder.
  const handleHoverError = () => {
    if (triedFallback) return;
    setTriedFallback(true);
    const fallback = product.card.gallery.find((g) => g.includes(`${product.code}-a2`));
    if (fallback) setHoverSrc(fallback);
  };

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
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <Image
          src={hoverSrc}
          alt=""
          fill
          onError={handleHoverError}
          className="product-card-hover-img object-cover opacity-0 transition-opacity duration-[400ms]"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>

      <div className="pt-3">
        <div className="text-[15px] text-[#1a1a1a]">{product.name}</div>
        <div className="text-[15px] text-[#1a1a1a]/55">
          {product.price != null ? `$${product.price.toLocaleString()}` : "Pricing soon"}
        </div>
      </div>
    </Link>
  );
}
