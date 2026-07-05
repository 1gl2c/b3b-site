"use client";
import { useState } from "react";
import Image from "next/image";

export default function PDPGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  // Deduplicate: only show a second thumbnail if it's a different image
  const uniqueImages = images.filter((img, i, arr) => arr.indexOf(img) === i);

  return (
    <div className="bg-[#F8F6F2] border-r border-[#e8e4de] flex flex-col">
      <div className="flex-1 relative min-h-[420px] border-b border-[#e8e4de] overflow-hidden">
        <Image
          key={active}
          src={uniqueImages[active] ?? images[0]}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
      </div>
      {uniqueImages.length > 1 && (
        <div className="flex">
          {uniqueImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 h-[72px] relative border-r border-[#e8e4de] last:border-r-0 overflow-hidden transition-opacity ${
                i === active ? "opacity-100 ring-1 ring-inset ring-[#0a0a0a]/20" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img} alt={`${name} view ${i + 1}`} fill className="object-cover" sizes="10vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
