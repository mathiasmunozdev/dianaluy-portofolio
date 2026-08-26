import { useEffect, useRef, useState } from "react";

type RevealOnScrollOptions = {
  threshold?: number;
  rootMargin?: string;
  requireScroll?: boolean;
};

export function useRevealOnScroll<T extends Element>({
  threshold = 0.3,
  rootMargin = "0px",
  requireScroll = false,
}: RevealOnScrollOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || isRevealed) return;

    if (typeof IntersectionObserver === "undefined") {
      if (requireScroll) {
        const revealOnScroll = () => setIsRevealed(true);
        window.addEventListener("scroll", revealOnScroll, {
          once: true,
          passive: true,
        });

        return () => window.removeEventListener("scroll", revealOnScroll);
      }

      const timeoutId = setTimeout(() => setIsRevealed(true), 0);
      return () => clearTimeout(timeoutId);
    }

    let hasScrolled = !requireScroll;
    let isIntersecting = false;

    function reveal() {
      setIsRevealed(true);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    }

    function handleScroll() {
      hasScrolled = true;

      if (isIntersecting) {
        reveal();
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;

        if (isIntersecting && hasScrolled) {
          reveal();
        }
      },
      { threshold, rootMargin },
    );

    if (requireScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isRevealed, requireScroll, rootMargin, threshold]);

  return { ref, isRevealed };
}
