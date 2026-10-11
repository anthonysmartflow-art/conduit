"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MotionContext = createContext({ enabled: false });
export const useMotion = () => useContext(MotionContext);
const preferenceKey = "conduit-motion-v1";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const progress = useRef<HTMLDivElement>(null);
  const enabled = ready && !paused && !reduced;

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    try {
      setPaused(localStorage.getItem(preferenceKey) === "paused");
    } catch {}
    setReady(true);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const animations = new Set<Animation>();
    const animate = (element: Element, delay = 0) => {
      const animation = element.animate(
        [
          { transform: "translate3d(0, 28px, 0)" },
          { transform: "translate3d(0, 0, 0)" },
        ],
        { duration: 850, delay, easing: "cubic-bezier(.16,1,.3,1)" },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            animate(entry.target, Math.min(index * 65, 260));
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.08 },
    );
    // Observe readable blocks, never whole nested layouts or sticky navigation.
    document
      .querySelectorAll(
        ".hero-copy > .eyebrow, .hero-action, .hero-caption, .mission h2, .mission-body, .mission .text-link, .section-heading, .research-photo, .research-copy > *, .page-heading > *, .article-header > *, .prose p, .prose h1, .prose h2, .prose h3, .prose img, .prose table, .booking-panel > *, .program-status, .article-end, .footer-top, .footer-bottom",
      )
      .forEach((element) => observer.observe(element));

    const onToggle = (event: Event) => {
      const details = event.target;
      if (details instanceof HTMLDetailsElement && details.open) {
        Array.from(details.children)
          .filter((child) => child.tagName !== "SUMMARY")
          .forEach((child, index) => animate(child, index * 50));
      }
    };
    document.addEventListener("toggle", onToggle, true);
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - innerHeight;
      const fraction =
        range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${fraction})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled, pathname]);

  return (
    <MotionContext.Provider value={{ enabled }}>
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      {children}
      {ready && (
        <button
          className="site-motion-toggle"
          disabled={reduced}
          aria-label={
            reduced
              ? "Motion off: reduced motion preference"
              : enabled
                ? "Pause all animations"
                : "Play animations"
          }
          aria-pressed={!enabled}
          onClick={() => {
            const next = !paused;
            setPaused(next);
            try {
              localStorage.setItem(preferenceKey, next ? "paused" : "playing");
            } catch {}
          }}
        >
          <span className="motion-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {reduced ? "Motion off" : enabled ? "Pause motion" : "Play motion"}
        </button>
      )}
    </MotionContext.Provider>
  );
}

export function TypewriterHeading() {
  const { enabled } = useMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const [count, setCount] = useState(15);
  useEffect(() => {
    if (!enabled || !heading.current) return;
    let timer: ReturnType<typeof setTimeout>;
    let visible = false;
    let position = 0;
    let deleting = false;
    const tick = () => {
      position += deleting ? -1 : 1;
      setCount(position);
      let delay = deleting ? 65 : 145;
      if (position === 15) {
        deleting = true;
        delay = 4800;
      }
      if (position === 0) {
        deleting = false;
        delay = 850;
      }
      timer = setTimeout(tick, delay);
    };
    const sync = () => {
      clearTimeout(timer);
      if (visible && !document.hidden) timer = setTimeout(tick, 500);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    setCount(0);
    observer.observe(heading.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [enabled]);
  const shown = enabled ? count : 15;
  return (
    <h1
      ref={heading}
      className="typewriter-heading"
      aria-label="Thought-to-text"
    >
      {["Thought-", "to-text"].map((line, index) => {
        const letters =
          index === 0 ? Math.min(shown, 8) : Math.max(0, shown - 8);
        const cursor = index === 0 ? shown < 8 : shown >= 8;
        return (
          <span key={line} className="type-line" aria-hidden="true">
            <span className="type-reserve">{line}</span>
            <span className="type-ink">
              {line.slice(0, letters)}
              {cursor && <span className="typing-cursor" />}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
