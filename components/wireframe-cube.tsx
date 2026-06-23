import { cn } from "@/lib/utils";

/**
 * A pure-CSS 3D wireframe cube, slowly rotating. Decorative, intentional 3D.
 * Faces flicker between a cipher glyph and a resolved character. Reduced motion
 * freezes it at an angle.
 */
export function WireframeCube({
  size = 132,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const half = size / 2;
  const faces: { t: string; ch: string }[] = [
    { t: `translateZ(${half}px)`, ch: "0" },
    { t: `rotateY(180deg) translateZ(${half}px)`, ch: "1" },
    { t: `rotateY(90deg) translateZ(${half}px)`, ch: "/" },
    { t: `rotateY(-90deg) translateZ(${half}px)`, ch: ">" },
    { t: `rotateX(90deg) translateZ(${half}px)`, ch: "#" },
    { t: `rotateX(-90deg) translateZ(${half}px)`, ch: "*" },
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
      style={{ perspective: "800px", width: size, height: size }}
    >
      <div className="cube3d relative h-full w-full">
        {faces.map((f, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center font-mono"
            style={{
              width: size,
              height: size,
              transform: f.t,
              border: "1px solid color-mix(in oklab, var(--accent) 55%, transparent)",
              background: "color-mix(in oklab, var(--accent) 5%, transparent)",
              color: "color-mix(in oklab, var(--cipher) 80%, var(--text))",
              fontSize: size * 0.26,
              boxShadow: "inset 0 0 30px color-mix(in oklab, var(--accent) 12%, transparent)",
            }}
          >
            {f.ch}
          </div>
        ))}
      </div>
    </div>
  );
}
