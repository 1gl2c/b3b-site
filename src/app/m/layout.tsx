import type { Viewport } from "next";
import MobileTopBar from "@/components/mobile/MobileTopBar";
import MobileTabBar from "@/components/mobile/MobileTabBar";

/**
 * Shell for the mobile (`/m`) tree. Renders inside the root layout, so it
 * inherits `<CartProvider>`, the font variables, and the global modals —
 * only the presentation changes here: white ground, app-style chrome.
 *
 * `viewport-fit=cover` exposes `env(safe-area-inset-*)` so the tab bar can
 * clear the home indicator on notched phones.
 */
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-root min-h-[100dvh] bg-white text-[#1a1a1a]">
      <MobileTopBar />
      <main className="pb-[calc(3.5rem+env(safe-area-inset-bottom))]">{children}</main>
      <MobileTabBar />
    </div>
  );
}
