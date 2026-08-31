import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FramedCard from "@/components/mobile/FramedCard";
import MobileProductCard from "@/components/mobile/MobileProductCard";
import { products } from "@/data/products";
import { collectionTabs, reviews } from "@/lib/data";

/**
 * Mobile home feed — stacked framed cards on white, vertical scroll.
 * Desktop-tree sections deliberately dropped here: 21:9 hero, marquee,
 * the dark brand-story panel, Values 4-up, the 35/6/1 stat blocks
 * (kept as a single Cormorant line instead).
 */
export default function MobileHome() {
  const featured = products.slice(0, 4);
  const categories = collectionTabs.filter((t) => t.slug !== "");

  return (
    <div className="flex flex-col gap-14 pt-6">
      {/* ── Hero ── */}
      <section className="px-4">
        {/* PLACEHOLDER: gym-model.png stands in for a 1:1 campaign crop (needed before merge). */}
        <FramedCard
          src="/products/gym/gym-model.png"
          alt="B3B — full-grain leather, made to order"
          ratio="1 / 1"
          fit="cover"
          priority
        />
        <div className="px-1 pt-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/50">
            Full-Grain Leather · Made to Order
          </p>
          <h1 className="mt-3 font-serif text-[34px] italic leading-[1.1] text-[#1a1a1a]">
            Built for the Journey.
          </h1>
          <div className="mt-5 flex gap-3">
            <Link
              href="/collections"
              className="flex-1 bg-[#1a1a1a] px-5 py-3.5 text-center text-[12px] uppercase tracking-[0.1em] text-white active:opacity-70"
            >
              Shop the Collection
            </Link>
            <Link
              href="/heritage"
              className="flex-1 border border-[#1a1a1a] px-5 py-3.5 text-center text-[12px] uppercase tracking-[0.1em] text-[#1a1a1a] active:opacity-60"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="px-4">
        <div className="mb-5 flex items-baseline justify-between px-1">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#0a0a0a]">New Arrivals</span>
          <Link
            href="/collections"
            className="text-[10px] uppercase tracking-[0.14em] text-[#8a7f72] active:text-[#0a0a0a]"
          >
            View all →
          </Link>
        </div>
        <div className="flex flex-col gap-9">
          {featured.map((p) => (
            <MobileProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="px-4">
        <span className="mb-4 block px-1 text-[10px] uppercase tracking-[0.22em] text-[#0a0a0a]">
          Shop by Category
        </span>
        <div className="overflow-hidden rounded-[20px] ring-1 ring-black/[0.06]">
          {categories.map((t, i) => (
            <Link
              key={t.slug}
              href={`/collections/${t.slug}`}
              className={`flex items-center justify-between px-4 py-4 active:bg-black/[0.03] ${
                i > 0 ? "border-t border-black/[0.06]" : ""
              }`}
            >
              <span className="text-[14px] text-[#1a1a1a]">{t.label}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[#1a1a1a]/35"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Brand story ── */}
      <section className="px-4">
        {/* PLACEHOLDER: sling-bag.jpg (~4:5 already); a true 4:5 campaign crop preferred. */}
        <FramedCard
          src="/products/sling-bag.jpg"
          alt="B3B — every stitch placed by someone who spent a lifetime learning where it goes"
          ratio="4 / 5"
          fit="cover"
        />
        <div className="px-1 pt-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a7f72]">
            The Story Behind the Brand
          </p>
          <h2 className="mt-3 font-serif text-[26px] italic leading-[1.25] text-[#1a1a1a]">
            After 35 years building others&rsquo; dreams, this one is ours.
          </h2>
          <p className="mt-3 text-[13px] leading-[1.9] text-[#5a5a5a]">
            Trademarked and established 2021. Eight years in the making. B3B is not a startup — it is
            patience made manifest.
          </p>
          <p className="mt-4 font-serif text-[15px] italic text-[#8a7f72]">
            Thirty-five years in fashion. Six categories. One family legacy.
          </p>
          <Link
            href="/heritage"
            className="mt-5 inline-block rounded-full border border-[#3a3a3a]/40 px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] active:opacity-60"
          >
            Read the Story
          </Link>
        </div>
      </section>

      {/* ── Early Feedback ── */}
      <section className="px-4">
        <span className="mb-4 block px-1 text-[10px] uppercase tracking-[0.22em] text-[#0a0a0a]">
          Early Feedback
        </span>
        <div className="flex flex-col gap-4">
          {reviews.slice(0, 2).map((r) => (
            <div key={r.name} className="rounded-[16px] bg-[#F8F6F2] p-5">
              <div className="mb-2 text-[12px] text-[#0a0a0a]">★★★★★</div>
              <p className="font-serif text-[14px] italic leading-[1.7] text-[#0a0a0a]">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#8a7f72]">
                — {r.name}, {r.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Email capture ── */}
      <section className="px-4">
        <div className="flex flex-col items-center gap-3 rounded-[20px] bg-[#F8F6F2] px-6 py-10 text-center">
          <span className="text-[9px] uppercase tracking-[0.26em] text-[#8a7f72]">Private Access</span>
          <h2 className="font-serif text-[28px] italic text-[#0a0a0a]">Be first to know.</h2>
          <p className="text-[12px] text-[#8a7f72]">
            Early access to new drops, limited releases, and founder notes from Bo.
          </p>
          <div className="mt-2 flex w-full flex-col gap-2">
            <input
              type="email"
              inputMode="email"
              placeholder="Your email address"
              className="w-full border border-[#e8e4de] bg-white px-4 py-3 text-[13px] text-[#0a0a0a] outline-none placeholder:text-[#c5bdb2] focus:border-[#8a7f72]"
            />
            <button
              type="button"
              className="w-full bg-[#0a0a0a] px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white active:opacity-70"
            >
              Join
            </button>
          </div>
          <p className="text-[10px] text-[#c5bdb2]">No spam. One email when something matters.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
