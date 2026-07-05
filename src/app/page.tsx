import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/ui/Marquee";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCircles from "@/components/ui/CategoryCircles";
import CharReveal from "@/components/ui/CharReveal";
import PullUp from "@/components/ui/PullUp";
import FadeUp from "@/components/ui/FadeUp";
import { products } from "@/data/products";
import { siteValues, reviews } from "@/lib/data";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="bg-[#0e0e0e]">
      <Nav dark />

      {/* ─── HERO: Ken Burns ─── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Ken Burns background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/products/flat-backpack.jpg"
            alt="B3B Flat Back Pack"
            fill
            priority
            className="object-cover object-center animate-ken-burns"
            sizes="100vw"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Fractal noise SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.04 }}
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-6">
          <Image
            src="/images/logos/logo-white.png"
            alt="B3B"
            width={280}
            height={146}
            className="object-contain"
            style={{ width: "clamp(220px, 16vw, 380px)", height: "auto" }}
            priority
          />
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#f0ebe3]/70 mt-1">
            Built for the Journey
          </p>
        </div>

        {/* CTA buttons at bottom of hero */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
          <Link
            href="/collections"
            className="px-9 py-3.5 bg-[#f5f2ee] text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase rounded-full transition-colors hover:bg-white"
          >
            Shop the Collection
          </Link>
          <Link
            href="/heritage"
            className="px-9 py-3.5 bg-transparent text-[#f5f2ee] text-[10px] tracking-[0.2em] uppercase border border-[#f5f2ee]/30 rounded-full hover:border-[#f5f2ee]/60 transition-colors"
          >
            Our Heritage
          </Link>
        </div>
      </section>

      {/* ─── BRAND STORY: dark ─── */}
      <section className="bg-[#0e0e0e] px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[340px] overflow-hidden">
          <Image
            src="/products/flat-backpack.jpg"
            alt="B3B — Flat Back Pack"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div>
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#5a5a5a] mb-5">The Story Behind the Brand</p>
          <CharReveal
            as="h2"
            text="After 35 years building others' dreams, this one is ours."
            className="text-[30px] italic font-serif text-[#f5f2ee] font-normal leading-[1.2] mb-4"
          />
          <p className="text-[13px] text-[#5a5a5a] leading-[1.9] mb-5">
            Trademarked and established 2021. Eight years in the making. Bo has spent 35+ years working leather — from boxing gyms to fashion houses, from college classrooms to global runways. B3B is not a startup. It is patience made manifest.
          </p>
          <blockquote className="text-[11px] italic font-serif text-[#8a7f72] border-l-2 border-[#2a2a2a] pl-4 leading-[1.7] mb-7">
            &ldquo;Trusted by icons in the fashion industry for over three decades. B3B is what happens when experience finally has a name.&rdquo;
          </blockquote>
          <div className="flex gap-8 pt-6 border-t border-[#242424] mb-8">
            {[["35+", "Years Experience"], ["6", "Categories"], ["1", "Family Legacy"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div className="text-[28px] italic font-serif text-[#f5f2ee]">{num}</div>
                <div className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a] mt-1">{lbl}</div>
              </div>
            ))}
          </div>
          <Link
            href="/heritage"
            className="inline-block px-7 py-3 bg-transparent text-[#f5f2ee] text-[10px] tracking-[0.2em] uppercase border border-[#3a3a3a] rounded-full hover:border-[#5a5a5a] transition-colors"
          >
            Read the Story
          </Link>
        </div>
      </section>

      <Marquee dark />

      {/* ─── SECTION CARD: rounded corner lift into light ─── */}
      <div className="bg-[#F8F6F2] rounded-t-[40px] -mt-10 relative z-10 pt-14 pb-0">

        {/* NEW ARRIVALS — light section */}
        <section className="px-10 pb-14">
          <div className="flex justify-between items-baseline mb-8">
            <PullUp
              text="New Arrivals"
              as="span"
              className="text-[10px] tracking-[0.22em] uppercase text-[#0a0a0a] block"
            />
            <Link href="/collections" className="text-[10px] tracking-[0.14em] uppercase text-[#8a7f72] flex items-center gap-1.5 hover:text-[#0a0a0a] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8e4de]">
            <div className="md:col-span-2">
              <FadeUp delay={0.05}>
                <ProductCard product={featured[0]} tall />
              </FadeUp>
            </div>
            <div className="flex flex-col gap-px bg-[#e8e4de]">
              <FadeUp delay={0.1}>
                <ProductCard product={featured[1]} />
              </FadeUp>
              <FadeUp delay={0.15}>
                <ProductCard product={featured[2]} />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="px-10 py-12 border-t border-[#e8e4de]">
          <div className="text-[10px] tracking-[0.22em] uppercase text-[#0a0a0a] mb-6">Shop by Category</div>
          <CategoryCircles />
        </section>

        {/* VALUES */}
        <section className="bg-[#F8F6F2] px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-[#e8e4de]">
          {siteValues.map((v) => (
            <FadeUp key={v.num}>
              <div className="text-[10px] tracking-[0.14em] text-[#c5bdb2] mb-2">{v.num}</div>
              <div className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a] mb-1.5">{v.title}</div>
              <div className="text-[11px] text-[#8a7f72] leading-[1.7]">{v.body}</div>
            </FadeUp>
          ))}
        </section>

        {/* EARLY FEEDBACK — testimonials, keep light */}
        <section className="px-10 py-12 border-b border-[#e8e4de]">
          <div className="text-[10px] tracking-[0.22em] uppercase text-[#0a0a0a] mb-7">Early Feedback</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8e4de]">
            {reviews.map((r, i) => (
              <FadeUp key={r.name} delay={i * 0.08}>
                <div className="bg-white p-6 h-full">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-[12px] text-[#0a0a0a]">★</span>
                    ))}
                  </div>
                  <p className="text-[13px] italic font-serif text-[#0a0a0a] leading-[1.7] mb-3.5">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[#8a7f72]">
                    — {r.name}, {r.location}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* EMAIL CAPTURE */}
        <section className="bg-[#F8F6F2] border-t border-[#e8e4de] px-10 py-16 flex flex-col items-center gap-4 text-center">
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#8a7f72]">Private Access</span>
          <h2 className="text-[30px] italic font-serif text-[#0a0a0a] font-normal">
            Be first to know.
          </h2>
          <p className="text-[12px] text-[#8a7f72] tracking-[0.06em]">
            Early access to new drops, limited releases, and founder notes from Bo.
          </p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 bg-white border border-[#e8e4de] border-r-0 text-[12px] text-[#0a0a0a] placeholder-[#c5bdb2] w-64 outline-none focus:border-[#8a7f72]"
            />
            <button className="px-6 py-3 bg-[#0a0a0a] text-white text-[10px] tracking-[0.18em] uppercase hover:bg-[#c41e1e] transition-colors duration-200">
              Join
            </button>
          </div>
          <p className="text-[10px] text-[#c5bdb2] mt-1">No spam. One email when something matters.</p>
        </section>

      </div>{/* end section card */}

      <Footer />
    </div>
  );
}
