import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import { products } from "@/lib/data";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#0e0e0e] text-[#f0ebe3]">
      {/* Dark nav */}
      <Nav dark />

      {/* Back link */}
      <div className="px-10 py-4 border-b border-[#1e1e1e]">
        <Link
          href="/collections"
          className="text-[10px] tracking-[0.16em] uppercase text-[#5a5a5a] hover:text-[#8a7f72] transition-colors flex items-center gap-2"
        >
          ← All Products
        </Link>
      </div>

      {/* HERO SPLIT */}
      <div className="grid grid-cols-2 min-h-[500px]">
        {/* Image side */}
        <div className="bg-[#111] border-r border-[#1e1e1e] flex flex-col">
          <div className="flex-1 flex items-center justify-center border-b border-[#1e1e1e] min-h-[380px]">
            <div className="text-center">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="0.8" className="mx-auto mb-3">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#2a2a2a]">Product photo</p>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-[68px] flex items-center justify-center border-r border-[#1a1a1a] last:border-r-0 cursor-pointer transition-colors ${i === 0 ? "bg-[#161616]" : "bg-[#0e0e0e] hover:bg-[#141414]"}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Info side */}
        <div className="px-11 py-11 flex flex-col">
          <div className="flex items-center gap-2.5 mb-3.5">
            {["B3B", product.category, "Limited"].map((item, i) => (
              <span key={item} className="flex items-center gap-2.5">
                {i > 0 && <span className="w-[3px] h-[3px] bg-[#2a2a2a] rounded-full" />}
                <span className="text-[9px] tracking-[0.22em] uppercase text-[#5a5a5a]">{item}</span>
              </span>
            ))}
          </div>

          <h1
            className="text-[40px] italic text-[#f0ebe3] font-normal leading-[1.05] mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {product.name}
          </h1>
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#3a3a3a] mb-7">
            {product.material} · {product.origin} · One Size
          </p>

          <div className="flex items-baseline gap-4 pb-6 border-b border-[#1e1e1e] mb-6">
            <span className="text-[30px] text-[#f0ebe3]" style={{ fontFamily: "Georgia, serif" }}>
              ${product.price.toLocaleString()}
            </span>
            <span className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a]">
              Free shipping · Worldwide
            </span>
          </div>

          <p className="text-[13px] text-[#5a5a5a] leading-[1.9] mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-7">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.14em] uppercase px-2.5 py-1.5 border border-[#2a2a2a] text-[#3a3a3a]"
              >
                {tag}
              </span>
            ))}
          </div>

          {product.remaining && product.remaining <= 8 && (
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#8a7f72] mb-4">
              Only {product.remaining} remaining — limited run
            </p>
          )}

          <button className="w-full py-4 bg-[#f0ebe3] text-[#0e0e0e] text-[11px] tracking-[0.22em] uppercase mb-2.5 hover:opacity-90 transition-opacity">
            Add to Bag
          </button>
          <button className="w-full py-4 bg-transparent text-[#f0ebe3] text-[11px] tracking-[0.22em] uppercase border border-[#2a2a2a] hover:border-[#5a5a5a] transition-colors">
            Save to Wishlist
          </button>
          <p className="text-[10px] text-[#2a2a2a] text-center mt-3 tracking-[0.08em]">
            Handcrafted · Ships in 5–7 business days
          </p>
        </div>
      </div>

      {/* CRAFT + SPECS */}
      <div className="grid grid-cols-2 border-t border-[#1e1e1e]">
        <div className="px-11 py-14 border-r border-[#1e1e1e]">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#5a5a5a]">The Craft</span>
          <h2
            className="text-[26px] italic text-[#f0ebe3] font-normal leading-[1.2] mt-3 mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every stitch placed by someone who spent a lifetime learning where it goes.
          </h2>
          <p className="text-[13px] text-[#5a5a5a] leading-[1.95]">
            Bo has spent over 35 years inside the fashion industry — not watching it, building it.
            Each B3B piece is a direct expression of that knowledge. Leather sourced from imported
            hides selected for grain consistency and durability. Hardware that is metal, not plated.
            Lining sewn to stay.
            <br /><br />
            This is not a bag made to photograph well and fall apart. It is made to be carried hard,
            travel far, and look better for it.
          </p>
        </div>
        <div className="px-11 py-14">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#5a5a5a] block mb-6">Specifications</span>
          {product.specs.map((s) => (
            <div key={s.key} className="flex justify-between items-baseline py-3 border-b border-[#161616] last:border-b-0">
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#3a3a3a]">{s.key}</span>
              <span className="text-[12px] italic text-[#5a5a5a]" style={{ fontFamily: "Georgia, serif" }}>
                {s.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MATERIAL TILES */}
      <div className="bg-[#0a0a0a] border-t border-[#1e1e1e] px-11 py-14">
        <span className="text-[9px] tracking-[0.26em] uppercase text-[#3a3a3a] block mb-7">Material Detail</span>
        <div className="grid grid-cols-4 gap-px bg-[#161616]">
          {[
            { label: "Grain", desc: "Full calfskin — top layer of the hide. The strongest cut." },
            { label: "Hardware", desc: "Solid metal throughout. No plating, no compromise." },
            { label: "Logo", desc: "B3B debossed directly into the leather. Permanent." },
            { label: "Construction", desc: "Fully lined. Every edge finished. Built to last." },
          ].map((tile) => (
            <div key={tile.label} className="bg-[#111] px-4 py-5 border border-[#1a1a1a]">
              <div className="text-[9px] tracking-[0.16em] uppercase text-[#3a3a3a] mb-2">{tile.label}</div>
              <div className="text-[11px] text-[#3a3a3a] leading-[1.6]">{tile.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ORIGIN */}
      <div className="grid grid-cols-3 border-t border-[#1e1e1e]">
        <div className="col-span-2 px-11 py-16 border-r border-[#1e1e1e]">
          <div
            className="text-[72px] italic text-[#161616] font-normal leading-none mb-[-16px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            35
          </div>
          <h2
            className="text-[24px] italic text-[#f0ebe3] font-normal mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Years to make a bag worth carrying.
          </h2>
          <p className="text-[13px] text-[#5a5a5a] leading-[1.9] max-w-[440px]">
            Bo didn&apos;t start B3B to compete. He started it because after three and a half decades
            building other people&apos;s brands — working with icons across the fashion world,
            shaping silhouettes for world-renowned houses — he finally had something to say under
            his own name.
            <br /><br />
            The Open Champ is named for the very first bag he ever made. A gym bag. It carried his
            ambition then. This one carries his legacy now.
          </p>
        </div>
        <div className="px-11 py-16 flex flex-col justify-center gap-7">
          {[["35+", "Years in fashion"], ["100%", "Leather shell"], ["1", "Family legacy"]].map(([num, lbl]) => (
            <div key={lbl} className="pb-7 border-b border-[#161616] last:border-b-0 last:pb-0">
              <div className="text-[32px] italic text-[#f0ebe3]" style={{ fontFamily: "Georgia, serif" }}>{num}</div>
              <div className="text-[9px] tracking-[0.18em] uppercase text-[#3a3a3a] mt-1">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED */}
      <div className="px-11 py-14 border-t border-[#1e1e1e]">
        <div className="flex justify-between items-baseline mb-7">
          <span className="text-[9px] tracking-[0.22em] uppercase text-[#3a3a3a]">From the Collection</span>
          <Link href="/collections" className="text-[10px] tracking-[0.12em] uppercase text-[#3a3a3a] hover:text-[#5a5a5a] transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-px bg-[#1a1a1a]">
          {related.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="bg-[#111] group">
              <div className="h-[150px] flex items-center justify-center border-b border-[#1a1a1a]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="1.5" className="group-hover:stroke-[#3a3a3a] transition-colors">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className="px-4 py-4">
                <div className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a] mb-1">{p.category}</div>
                <div className="text-[14px] italic text-[#f0ebe3] mb-1" style={{ fontFamily: "Georgia, serif" }}>{p.name}</div>
                <div className="text-[11px] text-[#3a3a3a]" style={{ fontFamily: "Georgia, serif" }}>${p.price.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* STICKY ADD TO BAG */}
      <div className="sticky bottom-0 bg-[#0e0e0e] border-t border-[#1e1e1e] px-10 py-3.5 flex items-center justify-between z-40">
        <div>
          <div className="text-[13px] italic text-[#f0ebe3]" style={{ fontFamily: "Georgia, serif" }}>
            {product.name}
          </div>
          <div className="text-[10px] text-[#3a3a3a] tracking-[0.1em] mt-0.5">
            {product.material} · {product.origin}
          </div>
        </div>
        <button className="px-7 py-3 bg-[#f0ebe3] text-[#0e0e0e] text-[10px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
          Add to Bag — ${product.price.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
