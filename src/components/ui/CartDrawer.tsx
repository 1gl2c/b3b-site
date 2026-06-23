"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, checkout, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-[2px]"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#f5f2ee] z-[100] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#ddd8cf]">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#1a1a1a]">
            Your Bag {cart.length > 0 && `(${cart.reduce((s, i) => s + i.quantity, 0)})`}
          </span>
          <button
            onClick={() => setCartOpen(false)}
            className="text-[#8a7f72] hover:text-[#1a1a1a] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-7">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c5bdb2" strokeWidth="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-[12px] text-[#8a7f72] tracking-[0.1em]">Your bag is empty.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#ddd8cf]">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 px-7 py-5">
                  <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-[#ede9e3] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="72px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] italic text-[#1a1a1a] mb-0.5" style={{ fontFamily: "Georgia, serif" }}>
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#8a7f72] mb-3">
                      ${item.price.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#ddd8cf]">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#8a7f72] hover:text-[#1a1a1a] transition-colors text-[14px]"
                        >−</button>
                        <span className="w-7 text-center text-[11px] text-[#1a1a1a]">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#8a7f72] hover:text-[#1a1a1a] transition-colors text-[14px]"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[9px] tracking-[0.14em] uppercase text-[#c5bdb2] hover:text-[#c41e3a] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#ddd8cf] px-7 py-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8a7f72]">Subtotal</span>
              <span className="text-[18px] italic text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-[#c5bdb2] mb-4 tracking-[0.08em]">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={checkout}
              className="w-full py-4 bg-[#1a1a1a] text-[#f5f2ee] text-[11px] tracking-[0.22em] uppercase hover:bg-[#000] transition-colors mb-2"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full py-3 text-[10px] tracking-[0.14em] uppercase text-[#8a7f72] hover:text-[#1a1a1a] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
