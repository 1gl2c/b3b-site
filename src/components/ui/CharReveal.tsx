"use client";
import { useEffect, useRef, useState, ElementType } from "react";

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
}

const MAX_STAGGER_CHARS = 60;

export default function CharReveal({ text, className, as: Tag = "p" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  let globalIndex = 0;
  const nodes: React.ReactNode[] = [];

  words.forEach((word, wi) => {
    if (wi > 0) {
      globalIndex++; // space occupies a stagger slot, matching the original per-character timing
      nodes.push(" ");
    }
    nodes.push(
      <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {word.split("").map((char, ci) => {
          const delayIndex = Math.min(globalIndex++, MAX_STAGGER_CHARS);
          return (
            <span
              key={ci}
              aria-hidden="true"
              style={{
                opacity: visible ? 1 : 0,
                display: "inline-block",
                transition: visible ? `opacity 0.3s ease ${delayIndex * 0.02}s` : "none",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  });

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {nodes}
      </Tag>
    </div>
  );
}
