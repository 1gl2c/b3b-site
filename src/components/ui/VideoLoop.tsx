"use client";
import { useRef, useEffect } from "react";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoLoop({ src, poster, className = "" }: Props) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;

    const startFadeIn = () => {
      cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 500, 1);
        vid.style.opacity = String(t);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onCanPlay = () => {
      vid.style.opacity = "0";
      vid.play().catch(() => {});
      startFadeIn();
    };

    const onTimeUpdate = () => {
      if (!vid.duration) return;
      const timeLeft = vid.duration - vid.currentTime;
      if (timeLeft < 0.55) {
        cancelAnimationFrame(rafRef.current);
        vid.style.opacity = String(Math.max(timeLeft / 0.55, 0));
      }
    };

    const onEnded = () => {
      vid.currentTime = 0;
      vid.style.opacity = "0";
      vid.play().catch(() => {});
      startFadeIn();
    };

    vid.addEventListener("canplay", onCanPlay);
    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(rafRef.current);
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={vidRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ opacity: 0 }}
    />
  );
}
