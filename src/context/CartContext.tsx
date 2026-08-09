"use client";
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

/** Minimal shape needed to add a line to the cart — mirrors the relevant Product fields. */
export interface CartLineInput {
  shopifyVariantId: string;
  code: string;
  name: string;
  price: number | null;
  image: string;
}

export interface CartItem {
  variantId: string;
  code: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Toast {
  id: number;
  message: string;
  type: "wishlist";
}

const CART_STORAGE_KEY = "b3b-cart";

interface CartContextType {
  wishlist: WishlistItem[];
  toasts: Toast[];
  searchOpen: boolean;
  accountOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  setAccountOpen: (v: boolean) => void;
  addToWishlist: (item: WishlistItem) => void;
  items: CartItem[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (product: CartLineInput, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Rehydrate from localStorage on mount. Guarded for SSR — this effect never
  // runs on the server, but the `typeof window` check keeps it explicit.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // malformed or inaccessible storage — start empty
    }
  }, []);

  // Persist on every change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private browsing, quota, etc.)
    }
  }, [items]);

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

  const addToCart = useCallback((product: CartLineInput, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === product.shopifyVariantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === product.shopifyVariantId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          variantId: product.shopifyVariantId,
          code: product.code,
          name: product.name,
          price: product.price ?? 0,
          image: product.image,
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.variantId !== variantId);
      return prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i));
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      wishlist, toasts, searchOpen, accountOpen,
      setSearchOpen, setAccountOpen, addToWishlist,
      items, cartOpen, setCartOpen, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal,
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
