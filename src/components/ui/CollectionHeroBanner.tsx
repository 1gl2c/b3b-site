import Image from "next/image";
import type { CollectionHero } from "@/lib/data";

export default function CollectionHeroBanner({ hero }: { hero?: CollectionHero }) {
  if (!hero) return null;

  const textColor = hero.textColor === "dark" ? "#1a1a1a" : "#f5f2ee";

  return (
    <div className="collection-hero relative w-full overflow-hidden">
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 55% 60% at 0% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        className="absolute left-6 bottom-6 md:left-16 md:bottom-16 max-w-[420px]"
        style={{ color: textColor }}
      >
        <h2 className="font-serif italic text-[32px] md:text-[46px] leading-[1.1] mb-2">
          {hero.title}
        </h2>
        {hero.subtitle && (
          <p
            className="font-serif italic text-[19px] md:text-[24px] leading-[1.3] mb-3"
            style={{ opacity: 0.92 }}
          >
            {hero.subtitle}
          </p>
        )}
        <p className="text-[15px] leading-[1.6]" style={{ opacity: 0.85 }}>
          {hero.body}
        </p>
      </div>
    </div>
  );
}
