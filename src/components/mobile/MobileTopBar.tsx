import Link from "next/link";
import Image from "next/image";

/**
 * Slim frosted app-chrome bar, sticky at the top of every `/m` page. Content
 * scrolls under it and shows through the blur.
 */
export default function MobileTopBar() {
  return (
    <header className="m-glass sticky top-0 z-40 flex h-12 items-center justify-center border-b border-black/[0.06]">
      <Link href="/" aria-label="B3B — home">
        <Image
          src="/images/logos/logo-black.png"
          alt="B3B"
          width={72}
          height={38}
          className="object-contain"
          priority
        />
      </Link>
    </header>
  );
}
