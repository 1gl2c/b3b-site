import Link from "next/link";

const shopLinks = ["Backpacks", "Belt Bags", "Cylinder Bags", "Crossbody", "Drawstring", "Caps"];
const brandLinks = ["Heritage", "The Craft", "Materials", "Limited Drops"];
const supportLinks = ["Shipping & Returns", "Care Guide", "Sizing", "Contact"];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#242424] px-10 pt-14 pb-7">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div
            className="text-[26px] italic text-[#f5f2ee] mb-3 leading-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            B3B
          </div>
          <p className="text-[11px] text-[#5a5a5a] leading-relaxed max-w-[200px]">
            Luxury leather goods built on 35 years of craft, experience, and legacy.
          </p>
        </div>

        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#f5f2ee] mb-4">Shop</div>
          {shopLinks.map((l) => (
            <Link key={l} href="/collections" className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">
              {l}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#f5f2ee] mb-4">Brand</div>
          {brandLinks.map((l) => (
            <Link key={l} href={l === "Heritage" ? "/heritage" : l === "The Craft" ? "/heritage" : "/about"} className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">
              {l}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#f5f2ee] mb-4">Support</div>
          {supportLinks.map((l) => (
            <Link key={l} href="#" className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">
              {l}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[#242424] pt-5 flex justify-between items-center">
        <p className="text-[10px] text-[#3a3a3a] tracking-[0.08em]">
          © 2025 B3B — Bo&apos;s 3 Bags. All rights reserved.
        </p>
        <div className="flex gap-5">
          {["Instagram", "TikTok", "Pinterest"].map((s) => (
            <Link key={s} href="#" className="text-[10px] tracking-[0.12em] uppercase text-[#5a5a5a] hover:text-[#8a7f72] transition-colors">
              {s}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
