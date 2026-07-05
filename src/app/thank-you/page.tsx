import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Order Received — B3B",
  description: "Your B3B order has been received. Bo begins your piece.",
};

export default function ThankYou() {
  return (
    <div className="bg-[#0e0e0e] text-[#f0ebe3] min-h-screen flex flex-col">
      <Nav dark />

      <main className="flex-1 flex flex-col items-center justify-center px-10 py-24 text-center">
        <Image
          src="/images/logos/logo-white.png"
          alt="B3B"
          width={120}
          height={63}
          className="object-contain mb-10 opacity-60"
        />

        <span className="text-[9px] tracking-[0.3em] uppercase text-[#5a5a5a] mb-5">Order Received</span>

        <h1
          className="text-[42px] italic font-serif text-[#f0ebe3] font-normal leading-[1.1] mb-5 max-w-lg"
        >
          Bo begins your piece.
        </h1>

        <div className="w-12 h-px bg-[#2a2a2a] mb-7" />

        <p className="text-[13px] text-[#5a5a5a] leading-[1.9] max-w-md mb-3">
          Every B3B piece is cut and finished by Bo's hands — not a factory floor. Your order enters
          his build queue and will be ready within <strong className="text-[#8a7f72] font-normal">2–3 weeks</strong>.
        </p>
        <p className="text-[13px] text-[#5a5a5a] leading-[1.9] max-w-md mb-10">
          You'll receive a confirmation from Stripe. For questions, reach Bo directly at{" "}
          <a
            href="mailto:mylesstafford17@gmail.com"
            className="text-[#8a7f72] hover:text-[#f0ebe3] transition-colors underline underline-offset-2"
          >
            mylesstafford17@gmail.com
          </a>
          .
        </p>

        <div className="grid grid-cols-3 gap-px bg-[#1a1a1a] w-full max-w-lg mb-12">
          {[
            ["Order placed", "Stripe confirmation sent"],
            // TODO: confirm shipping policy before launch
            ["2–3 weeks", "Build window"],
            ["Ships direct", "From Bo's studio"],
          ].map(([num, lbl]) => (
            <div key={lbl} className="bg-[#111] px-4 py-5 text-center">
              <div className="text-[14px] italic font-serif text-[#f0ebe3] mb-1">
                {num}
              </div>
              <div className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a]">{lbl}</div>
            </div>
          ))}
        </div>

        <Link
          href="/collections"
          className="px-9 py-3.5 bg-transparent text-[#f0ebe3] text-[10px] tracking-[0.2em] uppercase border border-[#2a2a2a] hover:border-[#5a5a5a] transition-colors"
        >
          Continue Shopping
        </Link>
      </main>

      <Footer />
    </div>
  );
}
