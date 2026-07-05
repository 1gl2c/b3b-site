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

  const chars = text.split("");

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {chars.map((char, i) => {
          const delayIndex = Math.min(i, MAX_STAGGER_CHARS);
          return (
            <span
              key={i}
              aria-hidden="true"
              style={{
                opacity: visible ? 1 : 0,
                display: char === " " ? "inline" : "inline-block",
                transition: visible ? `opacity 0.3s ease ${delayIndex * 0.02}s` : "none",
              }}
            >
              {char === " " ? " " : char}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
