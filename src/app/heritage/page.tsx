import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { timelineItems, brandValues } from "@/lib/data";

export default function Heritage() {
  return (
    <div className="bg-[#f5f2ee]">
      <Nav />

      {/* HERO */}
      <section className="px-10 pt-20 pb-16 border-b border-[#ddd8cf] grid grid-cols-2 gap-20 items-end">
        <div className="flex flex-col gap-5">
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72]">Heritage</span>
          <h1
            className="text-[56px] italic text-[#1a1a1a] font-normal leading-[1.05] font-serif"
          >
            Built for the Journey.
          </h1>
          <p className="text-[14px] text-[#5a5a5a] leading-[1.9] max-w-[440px]">
            B3B is more than a brand — it&apos;s a reflection of lived experience, discipline, and
            timeless style. Born from the hands of a master craftsman with over 35 years shaping the
            silhouettes of global fashion, B3B represents a personal renaissance — his name, his
            story, his legacy.
          </p>
          <Link
            href="/collections"
            className="inline-block self-start px-8 py-3.5 bg-[#1a1a1a] text-[#f5f2ee] text-[10px] tracking-[0.2em] uppercase hover:opacity-88 transition-opacity"
          >
            Shop the Collection
          </Link>
        </div>
        <div className="flex flex-col">
          {[["35+", "Years in fashion"], ["6", "Product categories"], ["100%", "Leather construction"], ["1", "Family legacy"]].map(([num, lbl], i) => (
            <div
              key={lbl}
              className={`flex justify-between items-baseline py-5 border-b border-[#ddd8cf] ${i === 0 ? "border-t" : ""}`}
            >
              <span className="text-[32px] italic text-[#1a1a1a] font-serif">{num}</span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8a7f72]">{lbl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-10 py-18">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72] block mb-12">The Journey</span>
        <div className="flex flex-col">
          {timelineItems.map((item) => (
            <div key={item.era} className="grid grid-cols-[80px_1px_1fr] gap-x-8 mb-0">
              <div className="text-[11px] tracking-[0.14em] text-[#8a7f72] pt-1 text-right">{item.era}</div>
              <div className="bg-[#ddd8cf] relative">
                <div className="w-2 h-2 rounded-full bg-[#1a1a1a] absolute top-1.5 -left-[3.5px]" />
              </div>
              <div className="pb-10">
                <h3
                  className="text-[16px] italic text-[#1a1a1a] mb-2 font-serif"
                >
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#8a7f72] leading-[1.8] max-w-[480px]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROTOTYPE — garage origin photo */}
      <section className="px-10 py-18 bg-[#ede9e3] border-t border-[#ddd8cf] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[480px] overflow-hidden bg-[#e8e3da]">
          <Image
            src="/products/crossbody-saddle.jpg"
            alt="The original B3B sling prototype — hand-crafted in Bo's garage, 2021"
            fill
            className="object-contain object-center"
            sizes="50vw"
          />
        </div>
        <div>
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72] block mb-4">Where It Started</span>
          <h2 className="text-[28px] italic font-serif text-[#1a1a1a] font-normal leading-[1.2] mb-4">
            The first one came out of a garage. It always does.
          </h2>
          <p className="text-[13px] text-[#8a7f72] leading-[1.9] mb-4">
            Before production runs and professional shoots, there was a single prototype — cut and stitched by Bo's own hands in his garage. This is that bag. Every detail was worked out here first: the strap angle, the hardware placement, the proportions. Nothing ships until Bo is satisfied, and satisfaction has a 35-year standard.
          </p>
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#c5bdb2] italic">
            The original Sling Bag prototype — Los Angeles, 2021
          </p>
        </div>
      </section>

      {/* MISSION QUOTE — dark section */}
      <section className="bg-[#1a1a1a] px-10 py-20 grid grid-cols-2 gap-20 items-center">
        <blockquote
          className="text-[32px] italic text-[#f5f2ee] font-normal leading-[1.3] font-serif"
        >
          &ldquo;They don&apos;t just carry your things. They carry your identity.&rdquo;
        </blockquote>
        <div className="flex flex-col gap-5">
          <p className="text-[13px] text-[#5a5a5a] leading-[1.9]">
            B3B began with a craftsman named Bo and a vision forged through decades of denim,
            leather, and legacy. These aren&apos;t just bags — they&apos;re built for the journey.
            Each piece is a fusion of global street culture, old-world craftsmanship, and
            future-forward design.
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#3a3a3a]">— Bo, Founder · B3B</p>
          <Link
            href="/collections"
            className="self-start px-7 py-3 bg-transparent text-[#f5f2ee] text-[10px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#5a5a5a] transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* B3B MEANING */}
      <section className="px-10 py-18 bg-[#ede9e3] border-t border-[#ddd8cf]">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72] block mb-10">What B3B Stands For</span>
        <div className="grid grid-cols-3 gap-px bg-[#ddd8cf]">
          {[
            { letter: "B", word: "Bo", desc: "The founder, the craftsman, the visionary. Every product carries his name, his eye, and his standard." },
            { letter: "3", word: "The Journey", desc: "Past. Present. Future. Three chapters of one story — and the thread running through all of them." },
            { letter: "B", word: "Bags", desc: "Not just accessories. Statements of legacy. Objects built to outlast the moment they were made for." },
          ].map((item) => (
            <div key={item.word} className="bg-[#f5f2ee] px-8 py-9">
              <div
                className="text-[56px] italic text-[#ddd8cf] font-normal leading-none mb-1 font-serif"
              >
                {item.letter}
              </div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#1a1a1a] mb-2.5">{item.word}</div>
              <div className="text-[12px] text-[#8a7f72] leading-[1.8]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND VALUES */}
      <section className="px-10 py-18">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72] block mb-9">Brand Values</span>
        <div className="grid grid-cols-3 gap-px bg-[#ddd8cf]">
          {brandValues.map((v) => (
            <div key={v.num} className="bg-[#f5f2ee] px-7 py-8">
              <div
                className="text-[32px] italic text-[#ede9e3] font-normal leading-none mb-[-4px] font-serif"
              >
                {v.num}
              </div>
              <div className="text-[13px] tracking-[0.14em] uppercase text-[#1a1a1a] mb-2.5">{v.title}</div>
              <div className="text-[12px] text-[#8a7f72] leading-[1.8]">{v.body}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
