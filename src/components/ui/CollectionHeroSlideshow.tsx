"use client";
import { useEffect, useState } from "react";
import HeroImage from "@/components/ui/HeroImage";
import type { CollectionHero } from "@/lib/data";

interface Slide {
  image: string;
  objectPositionX: string;
}

interface Props {
  /** Text overlay + colour come from the View All hero entry. */
  hero: CollectionHero;
  slides: Slide[];
  /** ms between auto-advances. */
  interval?: number;
}

/**
 * View All collection banner only. Same slot, aspect ratios, gradient, and
 * text blocks as `CollectionHeroBanner` — the image just crossfades through
 * `slides`. Auto-advances on a timer; pauses on hover; a prev/next click
 * stops auto-advance for the rest of the visit. `prefers-reduced-motion`
 * disables the timer and the crossfade entirely (arrows still work).
 */
export default function CollectionHeroSlideshow({ hero, slides, interval = 5000 }: Props) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false); // sticky once the user navigates
  const [reducedMotion, setReducedMotion] = useState(false);

  const next = (active + 1) % n;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const autoAdvancing = n > 1 && !stopped && !hovering && !reducedMotion;

  useEffect(() => {
    if (!autoAdvancing) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % n), interval);
    return () => window.clearInterval(id);
  }, [autoAdvancing, interval, n]);

  const go = (dir: -1 | 1) => {
    setStopped(true);
    setActive((i) => (i + dir + n) % n);
  };

  const textColor = hero.textColor === "dark" ? "#1a1a1a" : "#f5f2ee";

  return (
    <div>
      <div
        className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Collection campaign imagery"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={`absolute inset-0 ${reducedMotion ? "" : "transition-opacity duration-700 ease-out"}`}
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i === active ? undefined : true}
          >
            {/* eager: current slide, the one after it (so arrows/timer never
                hit an unloaded image), and slide 0 for first paint. */}
            <HeroImage
              src={s.image}
              objectPositionX={s.objectPositionX}
              eager={i === 0 || i === active || i === next}
            />
          </div>
        ))}

        {/* Gradient + text overlay — identical to CollectionHeroBanner. */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 0% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="hidden md:block absolute md:left-16 md:bottom-16 max-w-[420px] pointer-events-none"
          style={{ color: textColor }}
        >
          <h2 className="font-serif italic text-[46px] leading-[1.1] mb-2">{hero.title}</h2>
          {hero.subtitle && (
            <p className="font-serif italic text-[24px] leading-[1.3] mb-3" style={{ opacity: 0.92 }}>
              {hero.subtitle}
            </p>
          )}
          <p className="text-[15px] leading-[1.6]" style={{ opacity: 0.85 }}>
            {hero.body}
          </p>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/20 backdrop-blur-sm transition-colors hover:bg-black/35"
          style={{ color: textColor }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/20 backdrop-blur-sm transition-colors hover:bg-black/35"
          style={{ color: textColor }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Mobile text block — identical to CollectionHeroBanner. */}
      <div className="md:hidden bg-[#F5F2EE] px-6 py-8">
        <h2 className="font-serif italic text-[32px] text-[#1a1a1a] leading-[1.1] mb-2">{hero.title}</h2>
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
