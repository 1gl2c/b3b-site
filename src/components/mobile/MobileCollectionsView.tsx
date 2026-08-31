"use client";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FramedCard from "@/components/mobile/FramedCard";
import MobileProductCard from "@/components/mobile/MobileProductCard";
import { products } from "@/data/products";
import { collectionTabs, collectionHeroes } from "@/lib/data";

export default function MobileCollectionsView({ activeSlug }: { activeSlug: string }) {
  // Filter/sort duplicated verbatim from desktop CollectionsView so that file
  // stays byte-unchanged. Keep the two in sync by hand.
  const visible = products.filter((p) => !!p.card?.primary);
  const filtered = (
    activeSlug === ""
      ? visible
      : activeSlug === "new-in"
        ? visible.filter((p) => p.isNew)
        : visible.filter((p) => p.collection === activeSlug)
  ).sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  const activeTab = collectionTabs.find((t) => t.slug === activeSlug);
  const hero = collectionHeroes[activeSlug];
  const title = activeSlug === "" ? "All Products" : activeTab?.label ?? "All Products";

  return (
    <div>
      {/* Sticky frosted pill row. top-12 clears the 3rem MobileTopBar. */}
      <div className="m-glass sticky top-12 z-30 border-b border-black/[0.06] px-4 py-3">
        <nav className="flex flex-wrap gap-2">
          {collectionTabs.map((t) => {
            const isActive = t.slug === activeSlug;
            return (
              <Link
                key={t.slug || "all"}
                href={t.slug ? `/collections/${t.slug}` : "/collections"}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                  isActive
                    ? "bg-[#1a1a1a] text-white"
                    : "border border-[#1a1a1a]/20 text-[#1a1a1a]/70 active:bg-black/[0.04]"
                }`}
              >
                {t.shortLabel ?? t.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Typographic header */}
      <header className="px-5 pb-6 pt-7">
        <span className="text-[9px] uppercase tracking-[0.24em] text-[#8a7f72]">The Collection</span>
        <h1 className="mt-2 font-serif text-[34px] italic leading-[1.1] text-[#0a0a0a]">{title}</h1>
        {hero?.body && (
          <p className="mt-3 max-w-[46ch] text-[13px] leading-[1.7] text-[#5a5a5a]">{hero.body}</p>
        )}
      </header>

      {/* View All only: one 1:1 framed campaign card (no 21:9 banners on mobile). */}
      {activeSlug === "" && (
        <div className="px-4 pb-8">
          {/* PLACEHOLDER: camp-07-rooftop is 21:9 — heavy centre-crop until a 1:1 crop exists. */}
          <FramedCard
            src="/heroes/camp-07-rooftop.webp"
            alt="B3B campaign — three people on a city rooftop at dusk"
            ratio="1 / 1"
            fit="cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 px-4 pb-12">
        {filtered.map((p) => (
          <MobileProductCard key={p.slug} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="px-5 pb-16 text-[13px] text-[#8a7f72]">Nothing in this category yet.</p>
      )}

      <Footer />
    </div>
  );
}
