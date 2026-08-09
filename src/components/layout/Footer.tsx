import Link from "next/link";

const shopLinks = [
  { label: "Backpacks",                    href: "/collections/backpacks" },
  { label: "Crossbody and Shoulder Bags",  href: "/collections/crossbody-shoulder" },
  { label: "Bumbags",                      href: "/collections/bumbags" },
  { label: "Totes and Handbags",           href: "/collections/totes" },
  { label: "Gym and Travel",               href: "/collections/gym-travel" },
  { label: "Accessories",                  href: "/collections/accessories" },
];

const brandLinks = [
  { label: "Heritage",    href: "/heritage" },
  { label: "The Craft",   href: "/heritage" },
  { label: "About",       href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#242424] px-10 pt-14 pb-7">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="text-[30px] italic font-serif text-[#f5f2ee] mb-3 leading-none">
            B3B
          </div>
          <p className="text-[11px] text-[#5a5a5a] leading-relaxed max-w-[200px]">
            Luxury leather goods built on 35 years of craft, experience, and legacy.
          </p>
        </div>

        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#f5f2ee] mb-4">Shop</div>
          {shopLinks.map((l) => (
            <Link key={l.label} href={l.href} className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#f5f2ee] mb-4">Brand</div>
          {brandLinks.map((l) => (
            <Link key={l.label} href={l.href} className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#f5f2ee] mb-4">Support</div>
          {/* TODO: add page before showing */}
          {/* <Link href="#" className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">Shipping &amp; Returns</Link> */}
          {/* <Link href="#" className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">Care Guide</Link> */}
          {/* <Link href="#" className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors">Sizing</Link> */}
          <a
            href="mailto:hello@b3b.ai"
            className="block text-[11px] text-[#5a5a5a] mb-2 hover:text-[#8a7f72] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="border-t border-[#242424] pt-5 flex justify-between items-center">
        <p className="text-[10px] text-[#3a3a3a] tracking-[0.08em]">
          &copy; 2026 B3B — Bo&apos;s 3 Bags. All rights reserved.
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
