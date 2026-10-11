"use client";
import { useEffect, useRef } from "react";
import { useMotion } from "./MotionSystem";
export function NeuralVisual() {
  const video = useRef<HTMLVideoElement>(null);
  const { enabled } = useMotion();
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let visible = false;
    const sync = () => {
      if (enabled && visible && !document.hidden)
        element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      element.parentElement?.setAttribute("data-visible", String(visible));
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [enabled]);
  return (
    <div
      className="neural-visual"
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--pointer-x",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 24}px`,
        );
        event.currentTarget.style.setProperty(
          "--pointer-y",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * 24}px`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--pointer-x", "0px");
        event.currentTarget.style.setProperty("--pointer-y", "0px");
      }}
    >
      <div className="neural-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
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
