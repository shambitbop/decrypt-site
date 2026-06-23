"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01<>/{}=*#%&ABCDEF6789アカサ";

/**
 * Fixed texture layer behind all content: a hairline grid, a faint drifting
 * field of monospace glyphs where a character occasionally resolves to accent,
 * and a low-intensity glow that tracks the cursor (transform only). Dark-only.
 * Static frame under reduced motion.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let inkGlyph = "134, 141, 150";
    let inkAccent = "54, 245, 163";
    const mult = 1;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      inkGlyph = s.getPropertyValue("--ink-glyph").trim() || inkGlyph;
      inkAccent = s.getPropertyValue("--ink-accent").trim() || inkAccent;
    };

    type Cell = { x: number; y: number; ch: string; a: number; accent: boolean; phase: number };
    let cells: Cell[] = [];
    const FONT = 13;
    const GAP = 30;

    const build = () => {
      readColors();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT}px ui-monospace, monospace`;
      ctx.textBaseline = "top";

      cells = [];
      const cols = Math.ceil(width / GAP);
      const rows = Math.ceil(height / GAP);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if ((r * 31 + c * 17) % 7 !== 0) continue;
          cells.push({
            x: c * GAP + 6,
            y: r * GAP + 6,
            ch: GLYPHS[(r * 7 + c * 13) % GLYPHS.length],
            a: 0.04 + ((c * r) % 5) * 0.008,
            accent: false,
            phase: ((r * c) % 100) / 100,
          });
        }
      }
    };

    let frame = 0;
    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const cell of cells) {
        const flicker = Math.sin(frame * 0.012 + cell.phase * 6.28) > 0.992;
        if (flicker && !cell.accent) {
          cell.accent = true;
          cell.ch = GLYPHS[(frame + Math.floor(cell.x)) % GLYPHS.length];
        } else if (cell.accent && Math.sin(frame * 0.05 + cell.phase * 6) < 0) {
          cell.accent = false;
        }
        ctx.fillStyle = cell.accent
          ? `rgba(${inkAccent}, ${Math.min(cell.a * 4.5 * mult, 0.7)})`
          : `rgba(${inkGlyph}, ${cell.a * mult})`;
        ctx.fillText(cell.ch, cell.x, cell.y + Math.sin(frame * 0.006 + cell.phase * 6) * 2);
      }
      frame++;
      rafId = requestAnimationFrame(draw);
    };

    build();

    if (reduce) {
      draw();
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(draw);
    }

    const onResize = () => {
      build();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);

    let onMoveGlow: ((e: PointerEvent) => void) | null = null;
    if (!reduce && !coarse && glowRef.current) {
      const glow = glowRef.current;
      onMoveGlow = (e: PointerEvent) => {
        glow.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      };
      window.addEventListener("pointermove", onMoveGlow);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (onMoveGlow) window.removeEventListener("pointermove", onMoveGlow);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="blob"
        style={{
          top: "-12%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          animation: "blob-a 26s var(--ease-in-out) infinite",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 65%)",
          opacity: 0.55,
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          animation: "blob-b 32s var(--ease-in-out) infinite",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--cipher) 18%, transparent) 0%, transparent 65%)",
          opacity: 0.5,
        }}
      />
      <div className="grid-lines absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 0%, transparent 50%, var(--bg) 100%)",
        }}
      />
      <div
        ref={glowRef}
        className="absolute h-[600px] w-[600px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent-bright) 12%, transparent) 0%, transparent 60%)",
          left: 0,
          top: 0,
          opacity: 0.7,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
