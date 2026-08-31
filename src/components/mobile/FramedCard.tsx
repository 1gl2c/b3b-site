import Image from "next/image";
import type { ReactNode } from "react";

interface Props {
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "1 / 1" or "4 / 5". */
  ratio: string;
  /** `cover` for lifestyle/campaign shots; `contain` floats a product on white. */
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * The mobile feed's core visual primitive: a photo in a rounded, soft-shadowed
 * card that floats on white with a subtle frosted inner edge. Instagram-post
 * feel — the image never bleeds to the screen edge.
 */
export default function FramedCard({
  src,
  alt,
  ratio,
  fit = "cover",
  sizes = "(max-width: 480px) 92vw, 440px",
  priority = false,
  className = "",
  children,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(20,18,16,0.08)] ring-1 ring-black/[0.04] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "contain" ? "object-contain p-4" : "object-cover"}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/40" />
      {children}
    </div>
  );
}
