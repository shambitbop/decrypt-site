"use client";

import { useEffect } from "react";

/**
 * Gentle smooth scroll. Disabled entirely under reduced motion and on coarse
 * pointers / save-data so it never fights the user or stutters on phones.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Import Lenis only in the browser to avoid "window is not defined" during build
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const mqCoarse = window.matchMedia("(pointer: coarse)");
      const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData ?? false;

      if (mqReduce.matches || mqCoarse.matches || saveData) return;

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });

      let raf = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // keep anchor links working with Lenis
      const onClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
        if (!target) return;
        const id = target.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -76 });
        }
      };
      document.addEventListener("click", onClick);

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("click", onClick);
        lenis.destroy();
      };
    };

    const cleanup = initLenis();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return null;
}
