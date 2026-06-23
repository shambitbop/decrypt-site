"use client";

import dynamic from "next/dynamic";

// Dynamically import client components that access window/browser APIs
// with ssr: false to prevent "window is not defined" during build
const AmbientBackground = dynamic(
  () => import("@/components/ambient-background").then((mod) => ({ default: mod.AmbientBackground })),
  { ssr: false }
);

const SmoothScroll = dynamic(
  () => import("@/components/smooth-scroll").then((mod) => ({ default: mod.SmoothScroll })),
  { ssr: false }
);

export function ClientWrappers() {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
    </>
  );
}
