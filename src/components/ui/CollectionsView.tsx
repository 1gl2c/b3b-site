"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import CollectionHeroBanner from "@/components/ui/CollectionHeroBanner";
import CollectionHeroSlideshow from "@/components/ui/CollectionHeroSlideshow";
import { products } from "@/data/products";
import { collectionTabs, collectionHeroes, collectionBannerSlides } from "@/lib/data";

export default function CollectionsView({ activeSlug }: { activeSlug: string }) {
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    tabRefs.current[activeSlug]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeSlug]);

  const visible = products.filter((p) => !!p.card?.primary);
  const hidden = products.filter((p) => !p.card?.primary);
  if (hidden.length && process.env.NODE_ENV !== "production") {
    console.warn(
      `[collections] hiding ${hidden.length} product(s) from the grid — missing {code}-a1 image:`,
      hidden.map((p) => `${p.code ?? p.slug} (${p.name})`)
    );
  }

  const filtered = (
    activeSlug === ""
      ? visible
      : activeSlug === "new-in"
        ? visible.filter((p) => p.isNew)
        : visible.filter((p) => p.collection === activeSlug)
  ).sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  const activeTab = collectionTabs.find((t) => t.slug === activeSlug);

  return (
    <div className="bg-[#F8F6F2]">
      <div className="px-10 pt-14 pb-10">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72]">The Collection</span>
        <h1 className="text-[54px] italic font-serif text-[#0a0a0a] font-normal leading-[1.1] mt-3 mb-7">
          {activeTab?.slug === "" ? "All Products" : (activeTab?.label ?? "All Products")}
        </h1>

        <nav
          className="no-scrollbar flex overflow-x-auto"
          style={{ gap: "28px", flexWrap: "nowrap" }}
        >
          {collectionTabs.map((tab) => {
            const isActive = tab.slug === activeSlug;
            return (
              <Link
                key={tab.slug || "view-all"}
                href={tab.slug ? `/collections/${tab.slug}` : "/collections"}
                ref={(el) => {
                  tabRefs.current[tab.slug] = el;
                }}
                className={`relative inline-block shrink-0 whitespace-nowrap pb-2 text-[15px] transition-colors duration-150 ${
                  isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
                }`}
                style={{ letterSpacing: "0.01em" }}
              >
                {tab.label}
                {isActive && (
                  <span
                    className="absolute left-0 right-0 h-px bg-[#1a1a1a]"
                    style={{ top: "calc(100% + 8px)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {activeSlug === "" ? (
        <CollectionHeroSlideshow hero={collectionHeroes[""]} slides={collectionBannerSlides} />
      ) : (
        <CollectionHeroBanner hero={collectionHeroes[activeSlug]} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e4de] p-px">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
