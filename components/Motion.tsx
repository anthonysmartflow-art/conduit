"use client";
import { useEffect, useRef, useState } from "react";
export function NeuralVisual() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) {
        video.current?.pause();
        setPlaying(false);
      } else {
        video.current
          ?.play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return (
    <div className="neural-visual">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        poster="/assets/images/conduit-bg.webp"
      >
        <source src="/assets/videos/conduit-bg.mp4" type="video/mp4" />
      </video>
      <button
        className="motion-toggle"
        aria-label={
          playing ? "Pause background animation" : "Play background animation"
        }
        onClick={() => {
          if (playing) {
            video.current?.pause();
            setPlaying(false);
          } else
            video.current
              ?.play()
              .then(() => setPlaying(true))
              .catch(() => setPlaying(false));
        }}
      >
        {playing ? "Pause motion" : "Play motion"}
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
      </button>
    </div>
  );
}
export function ArticleBehavior() {
  useEffect(() => {
    const reveal = () => {
      if (!location.hash) return;
      const el = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      if (!el) return;
      let p = el.parentElement;
      while (p) {
        if (p instanceof HTMLDetailsElement) p.open = true;
        p = p.parentElement;
      }
      el.scrollIntoView({ block: "start" });
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  return null;
}
