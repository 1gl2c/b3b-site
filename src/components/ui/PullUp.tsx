"use client";
import { useEffect, useRef, useState, ElementType } from "react";

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
}

export default function PullUp({ text, className, as: Tag = "h2" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: visible
                ? `opacity 0.45s ease ${i * 0.08}s, transform 0.45s ease ${i * 0.08}s`
                : "none",
            }}
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
