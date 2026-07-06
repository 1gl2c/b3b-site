"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

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

    // Use a flag so we only start fade-in once even if both events fire
    let started = false;
    const onStart = () => {
      if (started) return;
      started = true;
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
      started = false;
      vid.currentTime = 0;
      vid.style.opacity = "0";
      vid.play().catch(() => {});
    };

    vid.addEventListener("playing", onStart);
    vid.addEventListener("canplay", onStart);
    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("ended", onEnded);

    // Explicit play() call — belt-and-suspenders on top of the autoPlay attribute.
    // iOS Safari requires muted + playsInline + autoPlay attribute + a programmatic
    // play() call for guaranteed inline autoplay.
    vid.play().catch(() => {});

    return () => {
      cancelAnimationFrame(rafRef.current);
      vid.removeEventListener("playing", onStart);
      vid.removeEventListener("canplay", onStart);
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <>
      {/* Poster image — always visible, gives instant content on slow/mobile connections */}
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden={true}
        />
      )}
      {/* Video fades in over the poster once it starts playing */}
      <video
        ref={vidRef}
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ opacity: 0 }}
      />
    </>
  );
}
