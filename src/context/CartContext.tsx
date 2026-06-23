"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Toast {
  id: number;
  message: string;
  type: "cart" | "wishlist";
}

interface CartContextType {
  cart: CartItem[];
  wishlist: CartItem[];
  toasts: Toast[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: CartItem) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((message: string, type: "cart" | "wishlist") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((c) => {
      if (c.find((x) => x.id === item.id)) return c;
      return [...c, item];
    });
    pushToast(`${item.name} added to bag`, "cart");
  }, [pushToast]);

  const addToWishlist = useCallback((item: CartItem) => {
    setWishlist((w) => {
      if (w.find((x) => x.id === item.id)) return w;
      return [...w, item];
    });
    pushToast(`${item.name} saved to wishlist`, "wishlist");
  }, [pushToast]);

  return (
    <CartContext.Provider value={{ cart, wishlist, toasts, addToCart, addToWishlist, cartCount: cart.length }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-[#1a1a1a] text-[#f5f2ee] text-[11px] tracking-[0.14em] uppercase px-5 py-3.5 flex items-center gap-3 shadow-lg animate-toast-in"
          >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.type === "cart" ? "bg-[#c41e3a]" : "bg-[#8a7f72]"}`} />
            {t.message}
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
