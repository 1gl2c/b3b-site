"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { label: "Shop", href: "/collections" },
  { label: "Collections", href: "/collections" },
  { label: "Heritage", href: "/heritage" },
  { label: "About", href: "/about" },
];

export default function Nav({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();

  const base = dark
    ? "bg-[#0e0e0e] border-b border-[#1e1e1e]"
    : "bg-[#f5f2ee] border-b border-[#ddd8cf]";

  const logoColor = dark ? "text-[#f0ebe3]" : "text-[#1a1a1a]";
  const linkColor = dark ? "text-[#5a5a5a] hover:text-[#f0ebe3]" : "text-[#3a3a3a] hover:text-[#1a1a1a]";
  const iconColor = dark ? "text-[#5a5a5a]" : "text-[#3a3a3a]";

  return (
    <nav className={`flex items-center justify-between px-10 py-5 sticky top-0 z-50 ${base}`}>
      <Link href="/" className="flex items-center">
        <Image
          src={dark ? "/images/logos/logo-white.png" : "/images/logos/logo-black.png"}
          alt="B3B"
          width={120}
          height={63}
          className="object-contain"
          priority
        />
      </Link>

      <div className="hidden md:flex gap-8">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className={`text-[10px] tracking-[0.18em] uppercase transition-colors ${linkColor} ${
              pathname === l.href ? "border-b border-current pb-[2px]" : ""
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex gap-5 items-center">
        <button aria-label="Search" className={`${iconColor} transition-colors`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button aria-label="Account" className={`${iconColor} transition-colors`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </button>
        <button aria-label="Cart" className={`${iconColor} transition-colors`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
