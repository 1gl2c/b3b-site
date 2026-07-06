"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
  onOpenLightbox: (index: number) => void;
}

export default function PDPGallery({ images, name, onOpenLightbox }: Props) {
  const [active, setActive] = useState(0);
  const unique = images.filter((img, i, arr) => arr.indexOf(img) === i);

  return (
    <div className="bg-[#F8F6F2] border-r border-[#e8e4de] flex flex-col">
      {/* Main image — object-contain so full bag always visible */}
      <button
        className="flex-1 relative min-h-[560px] md:min-h-[80vh] border-b border-[#e8e4de] overflow-hidden group cursor-zoom-in p-8 md:p-14"
        onClick={() => onOpenLightbox(active)}
        aria-label="Open full-screen image viewer"
      >
        <div className="relative w-full h-full">
          <Image
            key={active}
            src={unique[active] ?? images[0]}
            alt={name}
            fill
            className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="50vw"
            priority
          />
        </div>
        <span className="absolute bottom-4 right-4 text-[9px] tracking-[0.18em] uppercase text-[#8a7f72]/60 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand
        </span>
      </button>

      {/* Thumbnails */}
      {unique.length > 1 && (
        <div className="flex">
          {unique.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 h-20 relative border-r border-[#e8e4de] last:border-r-0 overflow-hidden transition-opacity p-2 ${
                i === active ? "opacity-100 ring-1 ring-inset ring-[#0a0a0a]/20" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={img}
                alt={`${name} view ${i + 1}`}
                fill
                className="object-contain"
                sizes="10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
