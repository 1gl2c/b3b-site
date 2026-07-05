import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import PDPGallery from "@/components/ui/PDPGallery";
import PDPActions from "@/components/ui/PDPActions";
import StickyAddToBag from "@/components/ui/StickyAddToBag";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: `${product?.name ?? "Product"} — B3B`,
    description: product?.description?.slice(0, 155) ?? "",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#F8F6F2] text-[#0a0a0a]">
      <Nav />

      <div className="px-10 py-4 border-b border-[#e8e4de]">
        <Link
          href="/collections"
          className="text-[10px] tracking-[0.16em] uppercase text-[#8a7f72] hover:text-[#0a0a0a] transition-colors flex items-center gap-2"
        >
          ← All Products
        </Link>
      </div>

      {/* HERO SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        <PDPGallery images={product.images} name={product.name} />

        <div className="bg-white px-11 py-11 flex flex-col">
          <div className="flex items-center gap-2.5 mb-3.5">
            {["B3B", product.category, "Made to Order"].map((item, i) => (
              <span key={item} className="flex items-center gap-2.5">
                {i > 0 && <span className="w-[3px] h-[3px] bg-[#ddd8cf] rounded-full" />}
                <span className="text-[9px] tracking-[0.22em] uppercase text-[#8a7f72]">{item}</span>
              </span>
            ))}
          </div>

          <h1 className="text-[40px] italic font-serif text-[#0a0a0a] font-normal leading-[1.05] mb-2">
            {product.name}
          </h1>
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#8a7f72] mb-6">
            Full-grain leather · Made in USA · One Size
          </p>

          {/* Price */}
          <div className="pb-5 border-b border-[#e8e4de] mb-5">
            {product.price != null ? (
              <span className="text-[30px] font-serif text-[#0a0a0a]">
                ${product.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-[15px] italic font-serif text-[#5a5a5a]">
                Pricing soon
              </span>
            )}
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
            {/* TODO: confirm shipping policy before launch */}
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

      {/* CRAFT + SPECS — light */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#e8e4de]">
        <div className="px-11 py-14 border-r border-[#e8e4de]">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#8a7f72]">The Craft</span>
          <h2 className="text-[26px] italic font-serif text-[#0a0a0a] font-normal leading-[1.2] mt-3 mb-4">
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
        <div className="px-11 py-14 bg-white">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#8a7f72] block mb-6">Specifications</span>
          {product.specs.map((spec) => (
            <div key={spec} className="py-3 border-b border-[#e8e4de] last:border-b-0">
              <span className="text-[12px] text-[#0a0a0a] leading-[1.7]">
                {spec}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MATERIAL TILES — keep dark for contrast */}
      <div className="bg-[#0a0a0a] border-t border-[#1e1e1e] px-11 py-14">
        <span className="text-[9px] tracking-[0.26em] uppercase text-[#3a3a3a] block mb-7">Material Detail</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#161616]">
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

      {/* ORIGIN — keep dark */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1e1e1e] bg-[#0a0a0a] text-[#f0ebe3]">
        <div className="md:col-span-2 px-11 py-16 border-r border-[#1e1e1e]">
          <div className="text-[72px] italic font-serif text-[#161616] font-normal leading-none mb-[-16px]">
            35
          </div>
          <h2 className="text-[24px] italic font-serif text-[#f0ebe3] font-normal mb-4">
            Years to make a bag worth carrying.
          </h2>
          <p className="text-[13px] text-[#5a5a5a] leading-[1.9] max-w-[440px]">
            Bo didn&apos;t start B3B to compete. He started it because after three and a half decades
            building other people&apos;s brands — working with icons across the fashion world,
            shaping silhouettes for world-renowned houses — he finally had something to say under
            his own name.
          </p>
        </div>
        <div className="px-11 py-16 flex flex-col justify-center gap-7">
          {[["35+", "Years in fashion"], ["100%", "Leather shell"], ["1", "Family legacy"]].map(([num, lbl]) => (
            <div key={lbl} className="pb-7 border-b border-[#161616] last:border-b-0 last:pb-0">
              <div className="text-[32px] italic font-serif text-[#f0ebe3]">{num}</div>
              <div className="text-[9px] tracking-[0.18em] uppercase text-[#3a3a3a] mt-1">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED — light */}
      <div className="px-11 py-14 border-t border-[#e8e4de]">
        <div className="flex justify-between items-baseline mb-7">
          <span className="text-[9px] tracking-[0.22em] uppercase text-[#8a7f72]">From the Collection</span>
          <Link href="/collections" className="text-[10px] tracking-[0.12em] uppercase text-[#8a7f72] hover:text-[#0a0a0a] transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e8e4de]">
          {related.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="bg-white group">
              <div className="h-[200px] relative overflow-hidden border-b border-[#e8e4de]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="33vw"
                />
              </div>
              <div className="px-4 py-4">
                <div className="text-[9px] tracking-[0.14em] uppercase text-[#8a7f72] mb-1">{p.category}</div>
                <div className="text-[14px] italic font-serif text-[#0a0a0a] mb-1">{p.name}</div>
                <div className="text-[11px] italic font-serif text-[#8a7f72]">
                  {p.price != null ? `$${p.price.toLocaleString()}` : "Pricing soon"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <StickyAddToBag
        name={product.name}
        price={product.price}
        category={product.category}
        stripePaymentLink={product.stripePaymentLink}
      />
    </div>
  );
}
