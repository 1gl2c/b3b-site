"use client";
import { useState } from "react";
import Image from "next/image";

export default function PDPGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-[#111] border-r border-[#1e1e1e] flex flex-col">
      <div className="flex-1 relative min-h-[420px] border-b border-[#1e1e1e] overflow-hidden">
        <Image
          key={active}
          src={images[active]}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
      </div>
      <div className="flex">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 h-[72px] relative border-r border-[#1a1a1a] last:border-r-0 overflow-hidden transition-opacity ${
              i === active ? "opacity-100 ring-1 ring-inset ring-[#f0ebe3]/30" : "opacity-40 hover:opacity-70"
            }`}
          >
            <Image src={img} alt={`${name} view ${i + 1}`} fill className="object-cover" sizes="10vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
