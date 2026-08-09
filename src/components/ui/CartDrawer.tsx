"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { createShopifyCheckout } from "@/lib/shopify";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCartOpen]);

  // Reset transient checkout state whenever the drawer is reopened.
  useEffect(() => {
    if (cartOpen) setCheckoutError(null);
  }, [cartOpen]);

  if (!cartOpen) return null;

  const handleCheckout = async () => {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const checkoutUrl = await createShopifyCheckout(
        items.map((i) => ({ merchandiseId: i.variantId, quantity: i.quantity }))
      );
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Shopify checkout failed:", err);
      setCheckoutError("Something went wrong starting checkout. Please try again.");
      setCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />

      <div className="cart-drawer-panel relative z-10 w-full sm:w-[420px] h-full bg-[#F5F2EE] text-[#1a1a1a] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a]/15 flex-shrink-0">
          <span className="text-[13px] tracking-[0.2em] uppercase">Bag</span>
          <div className="flex items-center gap-4">
            <span className="text-[11px] tracking-[0.1em] uppercase text-[#1a1a1a]/55">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
            <button
              aria-label="Close bag"
              onClick={() => setCartOpen(false)}
              className="text-[#1a1a1a] hover:opacity-60 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-[13px] tracking-[0.05em] text-[#1a1a1a]/70">Your bag is empty</p>
            <Link
              href="/collections"
              onClick={() => setCartOpen(false)}
              className="px-7 py-3 bg-[#1a1a1a] text-white text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Line items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-[#F2F1EF]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="text-[13px] text-[#1a1a1a] truncate">{item.name}</div>
                      <div className="text-[13px] text-[#1a1a1a]/55 mt-0.5">{formatPrice(item.price)}</div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#1a1a1a]/20">
                        <button
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[13px] hover:bg-[#1a1a1a]/5 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-[12px]">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[13px] hover:bg-[#1a1a1a]/5 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-[11px] tracking-[0.05em] uppercase text-[#1a1a1a]/55 hover:text-[#1a1a1a] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-[#1a1a1a]/15 px-6 py-5">
              <div className="flex items-center justify-between text-[14px] mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-[13px] text-[#1a1a1a]/55 mb-4">
                Shipping and taxes calculated at checkout
              </p>

              {checkoutError && (
                <div className="mb-3 px-3 py-2.5 border border-[#1a1a1a] text-[11px] tracking-[0.05em] text-[#1a1a1a]">
                  {checkoutError}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-4 bg-[#1a1a1a] text-white text-[13px] tracking-[0.1em] uppercase transition-opacity duration-150 hover:opacity-80 disabled:opacity-50"
              >
                {checkingOut ? "Checking Out..." : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
