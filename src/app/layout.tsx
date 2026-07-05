import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";
import SearchModal from "@/components/ui/SearchModal";
import AccountModal from "@/components/ui/AccountModal";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "B3B — Bo's 3 Bags | Built for the Journey",
  description:
    "Luxury leather goods crafted by a fashion veteran with 35 years of experience. Premium calfskin, limited production, made in USA.",
  keywords: ["luxury leather bags", "B3B", "Bo's 3 Bags", "premium leather goods", "handcrafted bags"],
  openGraph: {
    title: "B3B — Built for the Journey",
    description: "Past. Present. Future. Luxury leather goods crafted with 35 years of fashion expertise.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${instrumentSerif.variable}`}>
        <CartProvider>
          {children}
          <CartDrawer />
          <SearchModal />
          <AccountModal />
        </CartProvider>
      </body>
    </html>
  );
}
