"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A card that tilts in 3D toward the pointer. It rotates in place with
 * perspective (it never translates out of its grid slot) and lifts with a
 * glow. Reduced motion renders a plain static card.
 */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 180, damping: 20, mass: 0.4 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  if (reduce) {
    return (
      <div className={cn("tilt-card", className)}>
        <div className="tilt-inner h-full">{children}</div>
      </div>
    );
  }

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("tilt-card", className)}
    >
      <div className="tilt-inner h-full" style={{ transform: "translateZ(0.01px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
