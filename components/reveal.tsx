"use client";

import { motion, type Variants } from "motion/react";
import { ReactNode } from "react";

const base: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/**
 * Fade + 12px rise on scroll-in, once. Transform/opacity only.
 * `delay` staggers siblings; reduced motion is handled by Motion itself.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={base}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
