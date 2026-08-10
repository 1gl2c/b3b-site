import { getImageProps } from "next/image";

interface Props {
  /** Desktop image path, e.g. "/heroes/camp-06-all.png". A sibling "{name}-mobile.png" is served under 768px. */
  src: string;
  alt?: string;
  objectPosition?: string;
}

export default function HeroImage({ src, alt = "", objectPosition = "center 35%" }: Props) {
  const mobileSrc = src.replace(/\.png$/, "-mobile.png");
  const common = {
    alt,
    fill: true as const,
    sizes: "100vw",
    loading: "eager" as const,
    style: { objectFit: "cover" as const, objectPosition },
  };
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: mobileSrc });
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img {...rest} />
    </picture>
  );
}
