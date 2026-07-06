"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Props {
  images: string[];
  initialIndex: number;
  name: string;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, name, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const panAtDragStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);
  const touchStartX = useRef(0);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const close = useCallback(() => {
    setZoomed(false);
    onClose();
  }, [onClose]);

  const prev = useCallback(() => {
    if (zoomed) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length, zoomed]);

  const next = useCallback(() => {
    if (zoomed) return;
    setIndex((i) => (i + 1) % images.length);
  }, [images.length, zoomed]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, prev, next]);

  // Reset pan when switching images or unzooming
  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [index, zoomed]);

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!zoomed) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDragStart.current = pan;
    didDrag.current = false;
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;
    setPan({ x: panAtDragStart.current.x + dx, y: panAtDragStart.current.y + dy });
  };

  const onMouseUp = () => {
    dragStart.current = null;
  };

  const handleImageClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    if (zoomed) {
      setZoomed(false);
    } else {
      setZoomed(true);
    }
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (zoomed) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
  };

  const overlay = (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-[#F8F6F2]"
      style={{ animation: "lightbox-in 0.28s cubic-bezier(0.22,1,0.36,1) both" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4de] flex-shrink-0">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#8a7f72]">
          {name} — {index + 1} / {images.length}
        </span>
        <button
          onClick={close}
          aria-label="Close lightbox"
          className="text-[#8a7f72] hover:text-[#0a0a0a] transition-colors p-1"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ cursor: zoomed ? (dragStart.current ? "grabbing" : "zoom-out") : "zoom-in" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={handleImageClick}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: zoomed
              ? `scale(2.4) translate(${pan.x / 2.4}px, ${pan.y / 2.4}px)`
              : "scale(1)",
            transition: zoomed && dragStart.current ? "none" : "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="relative w-full h-full max-w-[900px] max-h-full mx-auto p-8">
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${name} — view ${index + 1}`}
              fill
              className="object-contain select-none"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* Prev / Next arrows */}
        {images.length > 1 && !zoomed && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[#e8e4de] hover:border-[#0a0a0a]/20 hover:bg-white transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[#e8e4de] hover:border-[#0a0a0a]/20 hover:bg-white transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex-shrink-0 border-t border-[#e8e4de] px-4 py-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setZoomed(false); setIndex(i); }}
              className={`flex-shrink-0 w-16 h-16 relative overflow-hidden border transition-all ${
                i === index
                  ? "border-[#0a0a0a] opacity-100"
                  : "border-[#e8e4de] opacity-45 hover:opacity-75"
              }`}
            >
              <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill className="object-contain" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
