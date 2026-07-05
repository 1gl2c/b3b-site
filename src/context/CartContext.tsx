"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Toast {
  id: number;
  message: string;
  type: "wishlist";
}

interface CartContextType {
  wishlist: WishlistItem[];
  toasts: Toast[];
  searchOpen: boolean;
  accountOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  setAccountOpen: (v: boolean) => void;
  addToWishlist: (item: WishlistItem) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const pushToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type: "wishlist" as const }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((w) => {
      if (w.find((x) => x.id === item.id)) return w;
      return [...w, item];
    });
    pushToast(`${item.name} saved to wishlist`);
  }, [pushToast]);

  return (
    <CartContext.Provider value={{
      wishlist, toasts, searchOpen, accountOpen,
      setSearchOpen, setAccountOpen, addToWishlist,
    }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-[#1a1a1a] text-[#f5f2ee] text-[11px] tracking-[0.14em] uppercase px-5 py-3.5 flex items-center gap-3 shadow-lg animate-toast-in"
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#8a7f72]" />
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
