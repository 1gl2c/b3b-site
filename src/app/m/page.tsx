import Image from "next/image";

/**
 * Stage (a) placeholder. Its only job right now is to confirm the device
 * branch resolves and the mobile shell + bottom tab bar render on a real
 * phone. The home feed (stacked framed cards) lands in stage (b).
 */
export default function MobileHome() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 pt-16 text-center">
      <Image
        src="/images/logos/logo-black.png"
        alt="B3B"
        width={140}
        height={74}
        className="object-contain"
        priority
      />
      <p className="font-serif text-[26px] italic leading-[1.15] text-[#1a1a1a]">
        Built for the Journey.
      </p>
      <p className="max-w-[240px] text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/45">
        Mobile experience — in progress
      </p>
    </div>
  );
}
