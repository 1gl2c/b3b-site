import HeroImage from "@/components/ui/HeroImage";
import type { CollectionHero } from "@/lib/data";

export default function CollectionHeroBanner({ hero }: { hero?: CollectionHero }) {
  if (!hero) return null;

  const textColor = hero.textColor === "dark" ? "#1a1a1a" : "#f5f2ee";

  return (
    <div>
      <div className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]">
        <HeroImage src={hero.image} />

        {/* Desktop text overlay — mobile gets its own block below the image instead */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 60% at 0% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="hidden md:block absolute md:left-16 md:bottom-16 max-w-[420px]"
          style={{ color: textColor }}
        >
          <h2 className="font-serif italic text-[46px] leading-[1.1] mb-2">
            {hero.title}
          </h2>
          {hero.subtitle && (
            <p
              className="font-serif italic text-[24px] leading-[1.3] mb-3"
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

      {/* Mobile text block — below the image, ink on parchment, never over the model */}
      <div className="md:hidden bg-[#F5F2EE] px-6 py-8">
        <h2 className="font-serif italic text-[32px] text-[#1a1a1a] leading-[1.1] mb-2">
          {hero.title}
        </h2>
        {hero.subtitle && (
          <p className="font-serif italic text-[19px] text-[#1a1a1a] leading-[1.3] mb-3" style={{ opacity: 0.92 }}>
            {hero.subtitle}
          </p>
        )}
        <p className="text-[15px] text-[#1a1a1a] leading-[1.6]" style={{ opacity: 0.85 }}>
          {hero.body}
        </p>
      </div>
    </div>
  );
}
