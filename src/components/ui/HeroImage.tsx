import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

interface Props {
  /** Desktop image path, e.g. "/heroes/camp-06-all.png". A sibling "{name}-mobile.png" is served under 768px. */
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
}

export default function HeroImage({ src, alt = "", objectPositionX }: Props) {
  const mobileSrc = src.replace(/\.png$/, "-mobile.png");
  const common = {
    alt,
    fill: true as const,
    sizes: "100vw",
    loading: "eager" as const,
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
