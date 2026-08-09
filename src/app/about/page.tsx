import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { marketingAngles } from "@/lib/data";

export default function About() {
  return (
    <div className="bg-[#f5f2ee]">
      <Nav />

      {/* HERO */}
      <section className="px-10 py-16 border-b border-[#ddd8cf]">
        <div className="relative h-[380px] w-full mb-10 overflow-hidden">
          <Image
            src="/images/products/gym-bag-2.jpg"
            alt="B3B — Built for the Journey"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="max-w-[560px] flex flex-col gap-4">
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72]">About B3B</span>
          <h1
            className="text-[46px] italic text-[#1a1a1a] font-normal leading-[1.1] font-serif"
          >
            Luxury leather redefined through legacy.
          </h1>
          <p className="text-[14px] text-[#5a5a5a] leading-[1.9]">
            B3B is more than a brand — it&apos;s a reflection of lived experience, discipline, and
            timeless style. Born from the hands of a master craftsman with over 35 years shaping the
            silhouettes of global denim and leather, B3B represents a personal renaissance — his
            name, his story, his legacy.
          </p>
          <p className="text-[14px] text-[#5a5a5a] leading-[1.9]">
            Bo didn&apos;t chase fame. He shaped it. Behind the scenes, he&apos;s been the quiet
            architect of style for world-renowned brands and icons. A designer and pattern maker
            with an unrelenting commitment to precision — from streetwear to runway, from boxing
            rings to boardrooms, Bo has always carried one thing: purpose.
          </p>
        </div>
      </section>

      {/* MARKETING ANGLES */}
      <section className="px-10 py-16">
        <span className="text-[9px] tracking-[0.24em] uppercase text-[#8a7f72] block mb-9">What We Stand For</span>
        <div className="grid grid-cols-2 gap-px bg-[#ddd8cf]">
          {marketingAngles.map((angle) => (
            <div key={angle.title} className="bg-[#f5f2ee] px-7 py-8">
              <div className="text-[12px] tracking-[0.14em] uppercase text-[#1a1a1a] mb-3">{angle.title}</div>
              <blockquote
                className="text-[13px] italic text-[#3a3a3a] leading-[1.6] mb-3 font-serif"
              >
                &ldquo;{angle.quote}&rdquo;
              </blockquote>
              <p className="text-[12px] text-[#8a7f72] leading-[1.7]">{angle.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL */}
      <section className="bg-[#1a1a1a] px-10 py-18 flex flex-col items-center gap-4 text-center border-t border-[#ddd8cf]">
        <span className="text-[9px] tracking-[0.26em] uppercase text-[#5a5a5a]">Join the Journey</span>
        <h2
          className="text-[32px] italic text-[#f5f2ee] font-normal font-serif"
        >
          B3B | Leather built to move through time.
        </h2>
        <p className="text-[12px] text-[#5a5a5a] tracking-[0.1em]">Past. Present. Future.</p>
        <div className="flex mt-2">
          <input
            type="email"
            placeholder="Your email address"
            className="px-5 py-3 bg-[#141414] border border-[#2a2a2a] border-r-0 text-[12px] text-[#f5f2ee] placeholder-[#3a3a3a] w-64 outline-none"
          />
          <button className="px-6 py-3 bg-[#f5f2ee] text-[#1a1a1a] text-[10px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
            Join
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
