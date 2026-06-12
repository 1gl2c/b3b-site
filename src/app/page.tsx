import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/ui/Marquee";
import ProductCard from "@/components/ui/ProductCard";
import { products, siteValues, reviews } from "@/lib/data";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="bg-[#f5f2ee]">
      <Nav />

      {/* HERO */}
      <section className="bg-[#1a1a1a] px-10 py-24 flex flex-col items-center text-center gap-4">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#5a5a5a]">
          Luxury Leather Goods — Los Angeles
        </span>
        <Image
          src="/images/logos/logo-white.png"
          alt="B3B"
          width={280}
          height={146}
          className="object-contain"
          priority
        />
        <div className="w-12 h-px bg-[#3a3a3a]" />
        <p className="text-[14px] tracking-[0.3em] uppercase text-[#f5f2ee]">Built for the Journey</p>
        <div className="flex items-center gap-4 text-[10px] tracking-[0.22em] uppercase text-[#4a4a4a]">
          <span>Past</span>
          <span className="w-[2px] h-[2px] bg-[#3a3a3a] rounded-full" />
          <span>Present</span>
          <span className="w-[2px] h-[2px] bg-[#3a3a3a] rounded-full" />
          <span>Future</span>
        </div>
        <p className="text-[13px] text-[#5a5a5a] max-w-[360px] leading-[1.9] mt-2">
          Premium calfskin leather goods crafted by a fashion veteran with 35 years of experience. Designed to last generations.
        </p>
        <div className="flex gap-3 mt-4">
          <Link
            href="/collections"
            className="px-9 py-3.5 bg-[#f5f2ee] text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-85"
          >
            Shop the Collection
          </Link>
          <Link
            href="/heritage"
            className="px-9 py-3.5 bg-transparent text-[#f5f2ee] text-[10px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#5a5a5a] transition-colors"
          >
            Our Heritage
          </Link>
        </div>
      </section>

      <Marquee />

      {/* NEW ARRIVALS — price anchored, backpack first */}
      <section className="px-10 py-14">
        <div className="flex justify-between items-baseline mb-8">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#1a1a1a]">New Arrivals</span>
          <Link href="/collections" className="text-[10px] tracking-[0.14em] uppercase text-[#8a7f72] flex items-center gap-1.5 hover:text-[#1a1a1a] transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-[2px]">
          <div className="col-span-2">
            <ProductCard product={featured[0]} tall />
          </div>
          <div className="flex flex-col gap-[2px]">
            <ProductCard product={featured[1]} />
            <ProductCard product={featured[2]} />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-10 py-12 border-t border-[#ede9e3]">
        <div className="text-[10px] tracking-[0.22em] uppercase text-[#1a1a1a] mb-6">Shop by Category</div>
        <div className="grid grid-cols-6 gap-3">
          {["Backpacks", "Belt Bags", "Cylinder Bags", "Crossbody", "Drawstring", "Caps"].map((cat) => (
            <Link key={cat} href="/collections" className="flex flex-col items-center gap-2.5 group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#ede9e3] border border-[#ddd8cf] flex items-center justify-center group-hover:bg-[#ddd8cf] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a7f72" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <span className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a] text-center">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-[#1a1a1a] px-10 py-20 grid grid-cols-2 gap-18 items-center">
        <div className="bg-[#161616] h-[340px] flex items-center justify-center border border-[#242424]">
          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="1" className="mx-auto mb-3">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p className="text-[9px] tracking-[0.18em] uppercase text-[#2a2a2a]">Founder photo</p>
          </div>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#5a5a5a] mb-5">The Story Behind the Brand</p>
          <h2
            className="text-[30px] italic text-[#f5f2ee] font-normal leading-[1.2] mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            After 35 years building others' dreams, this one is ours.
          </h2>
          <p className="text-[13px] text-[#5a5a5a] leading-[1.9] mb-5">
            Bo spent decades working with the world&apos;s leading fashion houses — a quiet architect of style whose work shaped some of the most iconic silhouettes in modern fashion.
          </p>
          <blockquote className="text-[11px] italic text-[#8a7f72] border-l-2 border-[#2a2a2a] pl-4 leading-[1.7] mb-7" style={{ fontFamily: "Georgia, serif" }}>
            &ldquo;Trusted by icons in the fashion industry for over three decades. B3B is what happens when experience finally has a name.&rdquo;
          </blockquote>
          <div className="flex gap-8 pt-6 border-t border-[#242424] mb-8">
            {[["35+", "Years Experience"], ["6", "Categories"], ["1", "Family Legacy"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div className="text-[28px] italic text-[#f5f2ee]" style={{ fontFamily: "Georgia, serif" }}>{num}</div>
                <div className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a] mt-1">{lbl}</div>
              </div>
            ))}
          </div>
          <Link
            href="/heritage"
            className="inline-block px-7 py-3 bg-transparent text-[#f5f2ee] text-[10px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#5a5a5a] transition-colors"
          >
            Read the Story
          </Link>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#ede9e3] px-10 py-13 grid grid-cols-4 gap-8 border-t border-b border-[#ddd8cf]">
        {siteValues.map((v) => (
          <div key={v.num}>
            <div className="text-[10px] tracking-[0.14em] text-[#c5bdb2] mb-2">{v.num}</div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#1a1a1a] mb-1.5">{v.title}</div>
            <div className="text-[11px] text-[#8a7f72] leading-[1.7]">{v.body}</div>
          </div>
        ))}
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-10 py-13 border-b border-[#ddd8cf]">
        <div className="text-[10px] tracking-[0.22em] uppercase text-[#1a1a1a] mb-7">Early Feedback</div>
        <div className="grid grid-cols-3 gap-[2px]">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white p-6 border border-[#ede9e3]">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[12px] text-[#1a1a1a]">★</span>
                ))}
              </div>
              <p className="text-[13px] italic text-[#1a1a1a] leading-[1.7] mb-3.5" style={{ fontFamily: "Georgia, serif" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="text-[10px] tracking-[0.14em] uppercase text-[#8a7f72]">
                — {r.name}, {r.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="bg-[#1a1a1a] px-10 py-18 flex flex-col items-center gap-4 text-center">
        <span className="text-[9px] tracking-[0.26em] uppercase text-[#5a5a5a]">Private Access</span>
        <h2
          className="text-[30px] italic text-[#f5f2ee] font-normal"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Be first to know.
        </h2>
        <p className="text-[12px] text-[#5a5a5a] tracking-[0.06em]">
          Early access to new drops, limited releases, and founder notes from Bo.
        </p>
        <div className="flex mt-2">
          <input
            type="email"
            placeholder="Your email address"
            className="px-5 py-3 bg-[#141414] border border-[#2a2a2a] border-r-0 text-[12px] text-[#f5f2ee] placeholder-[#3a3a3a] w-64 outline-none focus:border-[#5a5a5a]"
          />
          <button className="px-6 py-3 bg-[#f5f2ee] text-[#1a1a1a] text-[10px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
            Join
          </button>
        </div>
        <p className="text-[10px] text-[#3a3a3a] mt-1">No spam. One email when something matters.</p>
      </section>

      <Footer />
    </div>
  );
}
