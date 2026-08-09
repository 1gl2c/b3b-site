"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PDPGallery from "@/components/ui/PDPGallery";
import PDPActions from "@/components/ui/PDPActions";
import StickyAddToBag from "@/components/ui/StickyAddToBag";
import FadeUp from "@/components/ui/FadeUp";
import Lightbox from "@/components/ui/Lightbox";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

interface Props {
  product: Product;
  related: Product[];
}

export default function PDPPageClient({ product, related }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Editorial images: all except first (first lives in the sticky gallery)
  const editorialImages = product.images.filter((_, i, arr) => arr.indexOf(arr[i]) === i).slice(1);

  return (
    <div className="bg-[#F8F6F2] text-[#0a0a0a]">

      {/* Breadcrumb */}
      <div className="px-10 py-4 border-b border-[#e8e4de]">
        <Link
          href="/collections"
          className="text-[10px] tracking-[0.16em] uppercase text-[#8a7f72] hover:text-[#0a0a0a] transition-colors"
        >
          ← All Products
        </Link>
      </div>

      {/* Gallery + Info split */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <PDPGallery
          images={product.images}
          name={product.name}
          onOpenLightbox={openLightbox}
        />

        <div className="bg-white px-11 py-11 flex flex-col md:sticky md:top-0 md:self-start md:max-h-screen md:overflow-y-auto">
          {/* Category breadcrumb pills */}
          <div className="flex items-center gap-2.5 mb-3.5">
            {["B3B", product.category, "Made to Order"].map((item, i) => (
              <span key={item} className="flex items-center gap-2.5">
                {i > 0 && <span className="w-[3px] h-[3px] bg-[#ddd8cf] rounded-full" />}
                <span className="text-[9px] tracking-[0.22em] uppercase text-[#8a7f72]">{item}</span>
              </span>
            ))}
          </div>

          <h1 className="text-[46px] italic font-serif text-[#0a0a0a] font-normal leading-[1.05] mb-2">
            {product.name}
          </h1>
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#8a7f72] mb-6">
            Full-grain leather · Made in USA · One Size
          </p>

          <div className="pb-5 border-b border-[#e8e4de] mb-5">
            <span className="text-[34px] font-serif text-[#0a0a0a]">{formatPrice(product.price)}</span>
          </div>

          {/* Trust row */}
          <div className="flex items-center gap-5 text-[9px] tracking-[0.14em] uppercase text-[#8a7f72] mb-6 flex-wrap">
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure checkout via Stripe
            </span>
            <span className="text-[#ddd8cf]">|</span>
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
              </svg>
              Made in Los Angeles
            </span>
            <span className="text-[#ddd8cf]">|</span>
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              Ships in 2–3 weeks
            </span>
          </div>

          <p className="text-[13px] text-[#5a5a5a] leading-[1.9] mb-7">{product.description}</p>

          <PDPActions
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={product.image}
            stripePaymentLink={product.stripePaymentLink}
          />
        </div>
      </div>

      {/* ─── Editorial image blocks ─── */}
      {editorialImages.map((img, i) => (
        <FadeUp key={img}>
          <button
            className="w-full block relative cursor-zoom-in group"
            style={{ height: "75vh" }}
            onClick={() => {
              const allUnique = product.images.filter((x, idx, arr) => arr.indexOf(x) === idx);
              const idx = allUnique.indexOf(img);
              openLightbox(idx >= 0 ? idx : i + 1);
            }}
            aria-label="View full-screen"
          >
            <Image
              src={img}
              alt={`${product.name} — detail ${i + 2}`}
              fill
              className="object-contain object-center bg-[#F8F6F2]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#F8F6F2]/0 group-hover:bg-[#F8F6F2]/5 transition-colors" />
          </button>
          <div className="border-b border-[#e8e4de]" />
        </FadeUp>
      ))}

      {/* ─── Craft — centered dark ─── */}
      <FadeUp>
        <div className="bg-[#0a0a0a] px-10 md:px-24 py-20 text-center border-t border-[#1e1e1e]">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#3a3a3a] block mb-5">The Craft</span>
          <blockquote className="text-[32px] md:text-[40px] italic font-serif text-[#f0ebe3] font-normal leading-[1.25] max-w-[680px] mx-auto mb-8">
            Every stitch placed by someone who spent a lifetime learning where it goes.
          </blockquote>
          <p className="text-[13px] text-[#5a5a5a] leading-[1.95] max-w-[560px] mx-auto">
            Bo has spent over 35 years inside the fashion industry — not watching it, building it. Each B3B piece is a direct expression of that knowledge. Leather sourced from imported hides selected for grain consistency and durability. Hardware that is metal, not plated. Lining sewn to stay.
          </p>
        </div>
      </FadeUp>

      {/* ─── Specs — full-width rows ─── */}
      <FadeUp>
        <div className="px-10 md:px-24 py-16 border-t border-[#e8e4de]">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#8a7f72] block mb-8">Specifications</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {product.specs.map((spec) => (
              <div key={spec} className="py-3.5 border-b border-[#e8e4de] flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-[#c5bdb2] mt-2 flex-shrink-0" />
                <span className="text-[13px] text-[#0a0a0a] leading-[1.7]">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ─── Material tiles ─── */}
      <FadeUp>
        <div className="bg-[#0a0a0a] border-t border-[#1e1e1e] px-10 md:px-24 py-14">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#3a3a3a] block mb-7">Material Detail</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#161616]">
            {[
              { label: "Grain", desc: "Full calfskin — top layer of the hide. The strongest cut." },
              { label: "Hardware", desc: "Solid metal throughout. No plating, no compromise." },
              { label: "Logo", desc: "B3B debossed directly into the leather. Permanent." },
              { label: "Construction", desc: "Fully lined. Every edge finished. Built to last." },
            ].map((tile) => (
              <div key={tile.label} className="bg-[#111] px-5 py-6 border border-[#1a1a1a]">
                <div className="text-[9px] tracking-[0.16em] uppercase text-[#3a3a3a] mb-2">{tile.label}</div>
                <div className="text-[11px] text-[#3a3a3a] leading-[1.6]">{tile.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ─── Origin ─── */}
      <FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1e1e1e] bg-[#0a0a0a] text-[#f0ebe3]">
          <div className="md:col-span-2 px-10 md:px-24 py-16 border-r border-[#1e1e1e]">
            <div className="text-[80px] italic font-serif text-[#161616] font-normal leading-none mb-[-16px]">35</div>
            <h2 className="text-[28px] italic font-serif text-[#f0ebe3] font-normal mb-4">
              Years to make a bag worth carrying.
            </h2>
            <p className="text-[13px] text-[#5a5a5a] leading-[1.9] max-w-[440px]">
              Bo didn&apos;t start B3B to compete. He started it because after three and a half decades building other people&apos;s brands, he finally had something to say under his own name.
            </p>
          </div>
          <div className="px-10 py-16 flex flex-col justify-center gap-7">
            {[["35+", "Years in fashion"], ["100%", "Leather shell"], ["1", "Family legacy"]].map(([num, lbl]) => (
              <div key={lbl} className="pb-7 border-b border-[#161616] last:border-b-0 last:pb-0">
                <div className="text-[36px] italic font-serif text-[#f0ebe3]">{num}</div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-[#3a3a3a] mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ─── Related products ─── */}
      <FadeUp>
        <div className="px-10 md:px-24 py-14 border-t border-[#e8e4de]">
          <div className="flex justify-between items-baseline mb-7">
            <span className="text-[9px] tracking-[0.22em] uppercase text-[#8a7f72]">From the Collection</span>
            <Link href="/collections" className="text-[10px] tracking-[0.12em] uppercase text-[#8a7f72] hover:text-[#0a0a0a] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e8e4de]">
            {related.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="bg-white group">
                <div className="h-[220px] relative overflow-hidden border-b border-[#e8e4de] p-6">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="33vw"
                  />
                </div>
                <div className="px-5 py-4">
                  <div className="text-[9px] tracking-[0.14em] uppercase text-[#8a7f72] mb-1">{p.category}</div>
                  <div className="text-[14px] italic font-serif text-[#0a0a0a] mb-1">{p.name}</div>
                  <div className="text-[11px] italic font-serif text-[#8a7f72]">{formatPrice(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Lightbox portal */}
      {lightboxOpen && (
        <Lightbox
          images={product.images.filter((img, i, arr) => arr.indexOf(img) === i)}
          initialIndex={lightboxIndex}
          name={product.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <StickyAddToBag
        name={product.name}
        price={product.price}
        category={product.category}
        stripePaymentLink={product.stripePaymentLink}
      />
    </div>
  );
}
