"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Fixed bottom navigation for the mobile (`/m`) tree — the primary nav.
 *
 * Stage (a): Search / Bag / Account tap straight into the existing global
 * modals from the root layout (desktop-styled but fully functional). Stages
 * (c) and (d) swap Bag and Search for the bottom-sheet mobile components.
 */
export default function MobileTabBar() {
  const pathname = usePathname();
  const { setSearchOpen, setAccountOpen, setCartOpen, cartCount } = useCart();

  const isHome = pathname === "/" || pathname === "/m";
  const isShop = pathname.startsWith("/collections");

  return (
    <nav
      className="m-tabbar m-glass fixed inset-x-0 bottom-0 z-[100] border-t border-[#1a1a1a]/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="flex h-14 items-stretch">
        <li className="flex-1">
          <Link href="/" className={tab(isHome)}>
            <span className={iconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
              </svg>
            </span>
            <span className={labelCls}>Home</span>
          </Link>
        </li>

        <li className="flex-1">
          {/* Desktop collections until stage (d) adds the mobile grid. */}
          <Link href="/collections" className={tab(isShop)}>
            <span className={iconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <span className={labelCls}>Shop</span>
          </Link>
        </li>

        <li className="flex-1">
          <button type="button" onClick={() => setSearchOpen(true)} className={tab(false)}>
            <span className={iconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <span className={labelCls}>Search</span>
          </button>
        </li>

        <li className="flex-1">
          <button type="button" onClick={() => setCartOpen(true)} className={tab(false)}>
            <span className={`${iconWrap} relative`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8h12l-1 13H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[#1a1a1a] px-1 text-[9px] leading-none text-white">
                  {cartCount}
                </span>
              )}
            </span>
            <span className={labelCls}>Bag</span>
          </button>
        </li>

        <li className="flex-1">
          <button type="button" onClick={() => setAccountOpen(true)} className={tab(false)}>
            <span className={iconWrap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className={labelCls}>Account</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

const labelCls = "text-[9px] tracking-[0.14em] uppercase";
const iconWrap = "flex items-center justify-center transition-transform duration-75 active:scale-90";

function tab(active: boolean): string {
  return [
    "flex h-full w-full flex-col items-center justify-center gap-1",
    "transition-opacity duration-75 active:opacity-50",
    active ? "text-[#1a1a1a]" : "text-[#1a1a1a]/45",
  ].join(" ");
}
