"use client";
import { useState } from "react";

// Set to your Formspree form ID once created at formspree.io
// Sign up with mylesstafford17@gmail.com and create a form to get this ID
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "FORMSPREE_ID_TBD";

interface Props {
  productName: string;
  stripePaymentLink: string | null;
}

export default function PurchaseButton({ productName, stripePaymentLink }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (stripePaymentLink) {
    return (
      <a
        href={stripePaymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 bg-[#f0ebe3] text-[#0e0e0e] text-[11px] tracking-[0.22em] uppercase text-center block hover:bg-white transition-colors"
      >
        Purchase
      </a>
    );
  }

  if (submitted) {
    return (
      <div className="w-full py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-center">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#8a7f72]">
          Reserved — we'll reach out when pricing is set.
        </p>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="w-full border border-[#2a2a2a] p-4">
        <p className="text-[10px] tracking-[0.16em] uppercase text-[#5a5a5a] mb-3">
          Reserve your spot — we'll notify you when pricing is confirmed.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email, product: productName }),
              });
            } finally {
              setSubmitted(true);
              setLoading(false);
            }
          }}
          className="flex gap-2"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent border border-[#2a2a2a] px-3 py-2.5 text-[11px] text-[#f0ebe3] placeholder-[#3a3a3a] outline-none focus:border-[#5a5a5a]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#f0ebe3] text-[#0e0e0e] text-[10px] tracking-[0.18em] uppercase hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Notify Me"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowForm(true)}
      className="w-full py-4 bg-transparent text-[#f0ebe3] text-[11px] tracking-[0.22em] uppercase border border-[#2a2a2a] hover:border-[#5a5a5a] transition-colors"
    >
      Reserve — pricing soon
    </button>
  );
}
