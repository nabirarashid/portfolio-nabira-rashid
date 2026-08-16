import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` to an element the first time it scrolls into view.
 * Elements are revealed immediately when the visitor prefers reduced motion, or
 * when IntersectionObserver is unavailable, so content is never trapped behind
 * an animation that will not run.
 */
export const useReveal = <T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
};

export default useReveal;
