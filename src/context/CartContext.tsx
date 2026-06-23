"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { createShopifyCheckout, buildFallbackCheckoutUrl } from "@/lib/shopify";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shopifyVariantId?: string;
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
  cartOpen: boolean;
  searchOpen: boolean;
  accountOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setAccountOpen: (v: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  addToWishlist: (item: Omit<CartItem, "quantity">) => void;
  checkout: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const pushToast = useCallback((message: string, type: "cart" | "wishlist") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((c) => {
      const existing = c.find((x) => x.id === item.id);
      if (existing) return c.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...c, { ...item, quantity: 1 }];
    });
    pushToast(`${item.name} added to bag`, "cart");
    setCartOpen(true);
  }, [pushToast]);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((x) => x.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setCart((c) => c.map((x) => x.id === id ? { ...x, quantity: qty } : x));
  }, []);

  const addToWishlist = useCallback((item: Omit<CartItem, "quantity">) => {
    setWishlist((w) => {
      if (w.find((x) => x.id === item.id)) return w;
      return [...w, { ...item, quantity: 1 }];
    });
    pushToast(`${item.name} saved to wishlist`, "wishlist");
  }, [pushToast]);

  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    const hasVariantIds = cart.some((i) => i.shopifyVariantId);

    if (hasVariantIds) {
      const lines = cart
        .filter((i) => i.shopifyVariantId)
        .map((i) => ({ merchandiseId: i.shopifyVariantId!, quantity: i.quantity }));
      const url = await createShopifyCheckout(lines);
      if (url) { window.location.href = url; return; }
    }

    // Fallback: direct Shopify cart URL or store front
    const fallbackUrl = buildFallbackCheckoutUrl(
      cart.map((i) => ({ shopifyVariantId: i.shopifyVariantId, quantity: i.quantity }))
    );
    window.location.href = fallbackUrl;
  }, [cart]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, wishlist, toasts, cartOpen, searchOpen, accountOpen,
      setCartOpen, setSearchOpen, setAccountOpen,
      addToCart, removeFromCart, updateQty, addToWishlist,
      checkout, cartCount, cartTotal,
    }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
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
