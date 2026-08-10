"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Shop", href: "/collections" },
  { label: "Collections", href: "/collections" },
  { label: "Heritage", href: "/heritage" },
  { label: "About", href: "/about" },
];

export default function Nav({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  const { setSearchOpen, setAccountOpen, setCartOpen, cartCount } = useCart();

  const base = dark
    ? "bg-[#0e0e0e] border-b border-[#1e1e1e]"
    : "bg-[#F8F6F2] border-b border-[#ddd8cf]";
  const linkColor = dark ? "text-[#5a5a5a] hover:text-[#f0ebe3]" : "text-[#3a3a3a] hover:text-[#1a1a1a]";
  const iconColor = dark ? "text-[#5a5a5a] hover:text-[#f0ebe3]" : "text-[#3a3a3a] hover:text-[#1a1a1a]";

  return (
    <nav className={`flex items-center justify-between px-10 py-4 sticky top-0 z-50 ${base}`}>
      <Link href="/" className="flex items-center gap-1.5">
        <Image
          src={dark ? "/images/logos/logo-white.png" : "/images/logos/logo-black.png"}
          alt="B3B"
          width={120}
          height={63}
          className="object-contain"
          preload
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
        <button
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          className={`${iconColor} transition-colors`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <button
          aria-label="Account"
          onClick={() => setAccountOpen(true)}
          className={`${iconColor} transition-colors`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        <button
          aria-label="Bag"
          onClick={() => setCartOpen(true)}
          className={`relative ${iconColor} transition-colors`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center bg-[#1a1a1a] text-white text-[9px] leading-none">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
