"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

// The 21st.dev interactive 3D robot scene (pulled via Magic MCP).
const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

/** A low-weight poster shown before the robot loads and under reduced motion. */
function RobotPoster({ label = "decoder" }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <svg
          viewBox="0 0 240 240"
          className="h-[58%] w-auto opacity-90"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="rg" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="var(--cipher)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--cipher)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="120" cy="110" r="100" fill="url(#rg)" />
          {/* head */}
          <rect x="78" y="52" width="84" height="68" rx="14" stroke="var(--line)" strokeWidth="2" />
          <rect x="78" y="52" width="84" height="68" rx="14" stroke="var(--cipher)" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
          {/* eyes */}
          <circle cx="104" cy="86" r="7" fill="var(--accent)" />
          <circle cx="136" cy="86" r="7" fill="var(--accent)" />
          {/* antenna */}
          <line x1="120" y1="52" x2="120" y2="36" stroke="var(--line)" strokeWidth="2" />
          <circle cx="120" cy="32" r="4" fill="var(--cipher)" />
          {/* body */}
          <rect x="88" y="128" width="64" height="58" rx="10" stroke="var(--line)" strokeWidth="2" />
          <line x1="100" y1="146" x2="140" y2="146" stroke="var(--cipher)" strokeWidth="2" opacity="0.5" />
          <line x1="100" y1="158" x2="128" y2="158" stroke="var(--muted)" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">
        {label} · standby
      </span>
    </div>
  );
}

/**
 * The hero robot. Mounts the Spline scene only once it nears the viewport and
 * only when motion is allowed. Always shows the poster first (fast paint) and
 * keeps it as the reduced-motion / coarse-pointer fallback.
 */
export function RobotScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData ?? false;
    if (reduce || saveData) {
      // reduced motion / save-data: keep the static poster only (external gate)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllowed(false);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div className="relative h-full w-full">
        {/* poster sits underneath; fades out when robot is ready */}
        <div
          className="transition-opacity duration-700"
          style={{ opacity: ready ? 0 : 1 }}
        >
          <RobotPoster />
        </div>

        {allowed && shouldLoad && (
          <Suspense fallback={null}>
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: ready ? 1 : 0 }}
            >
              <Spline
                scene={ROBOT_SCENE_URL}
                onLoad={() => setReady(true)}
                className="!h-full !w-full"
              />
            </div>
          </Suspense>
        )}

        {/* mask over the "Built with Spline" watermark — the badge is painted on
            the WebGL canvas (not DOM), so we cover it with a solid corner that
            fades into the dark panel. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 z-20 h-28 w-72"
          style={{
            background:
              "linear-gradient(to top left, #070710 0%, #070710 58%, transparent 86%)",
          }}
        />
      </div>
    </div>
  );
}
