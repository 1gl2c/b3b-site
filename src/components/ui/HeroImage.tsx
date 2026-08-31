import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

interface Props {
  /** Desktop image path, e.g. "/heroes/camp-06-all.webp". A sibling "{name}-mobile.webp" is served under 768px. */
  src: string;
  alt?: string;
  /**
   * Horizontal focal point (e.g. "75%"), applied at mobile/tablet widths via
   * the `.hero-object-position` rule in globals.css. Vertical is fixed at
   * center — the source is wider than every container, so cover only ever
   * crops width. Overridden back to plain center at ≥1024px, where the crop
   * is negligible.
   */
  objectPositionX: string;
  /**
   * Load priority. Defaults to `true` (eager) for above-the-fold hero use —
   * every existing caller relies on that. Set `false` for the off-screen
   * slides of a slideshow so only the visible one blocks first paint.
   */
  eager?: boolean;
}

export default function HeroImage({ src, alt = "", objectPositionX, eager = true }: Props) {
  const mobileSrc = src.replace(/\.webp$/, "-mobile.webp");
  const common = {
    alt,
    fill: true as const,
    sizes: "100vw",
    loading: (eager ? "eager" : "lazy") as "eager" | "lazy",
    style: { objectFit: "cover" as const },
  };
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: mobileSrc });
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src });

  const style: CSSProperties & Record<"--hero-obj-x", string> = {
    ...rest.style,
    "--hero-obj-x": objectPositionX,
  };

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img {...rest} className="hero-object-position" style={style} />
    </picture>
  );
}
