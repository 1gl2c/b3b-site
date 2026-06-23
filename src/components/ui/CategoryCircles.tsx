"use client";
import { useRef, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { label: "Backpacks",     img: "/images/products/backpack-1.jpg" },
  { label: "Belt Bags",     img: "/images/products/beltbag-1.jpg" },
  { label: "Cylinder Bags", img: "/images/products/cylinder-1.jpg" },
  { label: "Crossbody",     img: "/images/products/crossbody-1.jpg" },
  { label: "Drawstring",    img: "/images/products/tote-1.jpg" },
  { label: "Caps",          img: "/images/products/gym-bag-1.jpg" },
];

function Circle({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(280px) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) scale(1.1) translateY(-4px)`;
    el.style.boxShadow = `${x * -12}px ${y * -12 + 16}px 32px rgba(0,0,0,0.18)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  const onMouseDown = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "scale(0.93)";
  };

  const onMouseUp = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <Link
      href="/collections"
      className="flex flex-col items-center gap-2.5 group cursor-pointer"
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className="w-16 h-16 rounded-full overflow-hidden relative transition-[box-shadow] duration-200"
        style={{
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          animation: `float 3.8s ease-in-out ${index * 0.55}s infinite`,
        }}
      >
        <Image
          src={cat.img}
          alt={cat.label}
          fill
          className="object-cover"
          sizes="64px"
        />
        {/* Glass highlight overlay */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.08)",
          }}
        />
        {/* Red accent ring on hover */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#c41e3a] transition-colors duration-300 pointer-events-none" />
      </div>
      <span className="text-[9px] tracking-[0.14em] uppercase text-[#3a3a3a] text-center group-hover:text-[#1a1a1a] transition-colors">
        {cat.label}
      </span>
    </Link>
  );
}

export default function CategoryCircles() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {categories.map((cat, i) => (
        <Circle key={cat.label} cat={cat} index={i} />
      ))}
    </div>
  );
}
