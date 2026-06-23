"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "01ERP/AI{CRM}QA#SAAS*";

/**
 * A circular "decode scan" panel: a sweeping radar line over a ring of
 * flickering glyphs that occasionally resolve to a steady accent-colored
 * capability tag. Replaces the generic wireframe cube with something that
 * reads as "scanning / decoding a system" rather than a decorative shape.
 * Reduced motion freezes the sweep at a fixed angle.
 */
export function DecodePanel({
  size = 200,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const sweepRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !sweepRef.current) return;

    let raf = 0;
    let angle = 0;
    const animate = () => {
      angle = (angle + 0.45) % 360;
      if (sweepRef.current) {
        sweepRef.current.setAttribute("transform", `rotate(${angle} 100 100)`);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const ringGlyphs = GLYPHS.split("");
  const radius = 78;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="decode-sweep-fade" cx="0%" cy="0%" r="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* outer + inner rings */}
        <circle cx="100" cy="100" r="92" stroke="var(--line)" strokeWidth="1" />
        <circle cx="100" cy="100" r="78" stroke="var(--line)" strokeWidth="1" opacity="0.7" />
        <circle cx="100" cy="100" r="50" stroke="var(--line)" strokeWidth="1" opacity="0.5" />

        {/* crosshair */}
        <line x1="100" y1="8" x2="100" y2="192" stroke="var(--line)" strokeWidth="1" opacity="0.4" />
        <line x1="8" y1="100" x2="192" y2="100" stroke="var(--line)" strokeWidth="1" opacity="0.4" />

        {/* ring of glyphs */}
        {ringGlyphs.map((ch, i) => {
          const a = (i / ringGlyphs.length) * Math.PI * 2;
          const x = 100 + radius * Math.cos(a);
          const y = 100 + radius * Math.sin(a);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="var(--muted)"
              opacity="0.55"
            >
              {ch}
            </text>
          );
        })}

        {/* sweep */}
        <g ref={sweepRef}>
          <path d="M100 100 L100 8 A92 92 0 0 1 152 26 Z" fill="url(#decode-sweep-fade)" />
          <line x1="100" y1="100" x2="100" y2="8" stroke="var(--accent)" strokeWidth="1.5" />
        </g>

        {/* core */}
        <circle cx="100" cy="100" r="5" fill="var(--accent)" />
        <circle cx="100" cy="100" r="9" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}
