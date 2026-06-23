"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { X } from "lucide-react";
import { RobotScene } from "./robot-scene";

/**
 * Sticky robot — fixed-position, animates from hero slot to bottom-right dock.
 *
 * Key design decisions to avoid jitter:
 * - Slot measurements are taken ONCE on mount (and on resize, never on scroll).
 * - Document-coordinate math (slot.top + scrollY) gives us the stable page
 *   position; we convert to viewport coords as (docTop - scrollY) inside the
 *   motion transform, which is a pure calculation — no rAF polling.
 * - scrollY is tracked as a MotionValue via useScroll so it stays in sync with
 *   Motion's animation loop and never causes React re-renders.
 * - We animate width/height of the fixed container directly so the entire box
 *   (not just the inner Spline canvas) shrinks.
 */
export function StickyRobot({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  // Slot measurements — document-absolute, stable across scroll
  const slotDocTop = useMotionValue(0);
  const slotDocLeft = useMotionValue(0);
  const slotW = useMotionValue(0);
  const slotH = useMotionValue(0);

  // Dock target — stable across scroll, only changes on resize
  const [coarse, setCoarse] = useState(false);
  const dockW = useMotionValue(0);
  const dockLeft = useMotionValue(0);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCoarse(isCoarse);

    const measure = () => {
      const el = slotRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Convert to document coords (stable across scroll)
      slotDocTop.set(r.top + window.scrollY);
      slotDocLeft.set(r.left + window.scrollX);
      slotW.set(r.width);
      slotH.set(r.height);

      const sz = isCoarse ? 84 : 110;
      const margin = isCoarse ? 14 : 22;
      dockW.set(sz);
      dockLeft.set(window.innerWidth - sz - margin);
    };

    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 350);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scrollY as a motion value — drives the viewport→document conversion
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["end start", "end -15%"],
  });

  // Also grab raw scrollY for the viewport-coord math
  const rawScrollY = useMotionValue(0);
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => rawScrollY.set(v));
    return () => unsub();
  }, [scrollY, rawScrollY]);

  // Docked state for toggling UI overlays (no React re-render on every frame)
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setDocked(v > 0.5));
    return () => unsub();
  }, [scrollYProgress]);

  // Animated position — pure math, no DOM reads during scroll
  const animTop = useTransform(
    [scrollYProgress, slotDocTop, rawScrollY],
    ([p, sTop, sY]: number[]) => {
      const expandedTop = sTop - sY;
      const sz = coarse ? 84 : 110;
      const margin = coarse ? 14 : 22;
      const dockedTop = window.innerHeight - sz - margin;
      return lerp(expandedTop, dockedTop, p);
    }
  );

  const animLeft = useTransform(
    [scrollYProgress, slotDocLeft, dockLeft],
    ([p, sLeft, dLeft]: number[]) => lerp(sLeft, dLeft, p)
  );

  const animWidth = useTransform(
    [scrollYProgress, slotW, dockW],
    ([p, sW, dW]: number[]) => lerp(sW, dW, p)
  );

  const animHeight = useTransform(
    [scrollYProgress, slotH],
    ([p, sH]: number[]) => lerp(sH, coarse ? 84 : 110, p)
  );

  const animRadius = useTransform(scrollYProgress, [0, 1], [16, 12]);

  if (dismissed) return null;

  if (reduce) {
    return (
      <div
        ref={slotRef}
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-[#070710] [background-image:radial-gradient(120%_90%_at_50%_0%,#171432_0%,#070710_60%)] md:aspect-[4/5] lg:aspect-square"
      >
        <RobotScene className="absolute inset-0" />
      </div>
    );
  }

  return (
    <>
      {/* Flow spacer — keeps hero grid layout intact */}
      <div
        ref={slotRef}
        className="relative aspect-square w-full md:aspect-[4/5] lg:aspect-square"
        aria-hidden
      />

      <motion.div
        style={{
          position: "fixed",
          top: animTop,
          left: animLeft,
          width: animWidth,
          height: animHeight,
          borderRadius: animRadius,
          zIndex: 40,
          overflow: "hidden",
          willChange: "transform, width, height",
        }}
        className="pointer-events-auto border border-line bg-[#070710] shadow-[0_18px_50px_-16px_rgba(0,0,0,0.6)] [background-image:radial-gradient(120%_90%_at_50%_0%,#171432_0%,#070710_60%)]"
      >
        {/* Corner ticks — only in expanded state */}
        {!docked && <CornerTicks />}

        {/* Status chip — only in expanded state */}
        {!docked && (
          <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 backdrop-blur">
            <span className="status-dot h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-[12px] tracking-wide text-text">
              decoder · online
            </span>
          </div>
        )}

        {/* Dismiss button — only when docked */}
        {docked && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Hide assistant"
            data-cursor="lock"
            className="absolute right-1 top-1 z-30 inline-flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-md transition-colors hover:border-accent/50 hover:text-text"
          >
            <X size={12} strokeWidth={2.4} aria-hidden />
          </button>
        )}

        <RobotScene className="absolute inset-0" />
      </motion.div>
    </>
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

function CornerTicks() {
  const corners = [
    "left-3 top-3 border-l border-t",
    "right-3 top-3 border-r border-t",
    "left-3 bottom-3 border-l border-b",
    "right-3 bottom-3 border-r border-b",
  ] as const;
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute z-10 h-4 w-4 border-accent/40 ${c}`}
        />
      ))}
    </>
  );
}
