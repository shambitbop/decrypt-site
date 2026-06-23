import { cn } from "@/lib/utils";

/** The reticle mark: a target locking onto the decoded core. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-7 w-7", className)}
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="var(--accent)"
        strokeWidth="3.4"
        strokeLinecap="square"
      >
        <path d="M16 22 V16 H22" />
        <path d="M48 22 V16 H42" />
        <path d="M16 42 V48 H22" />
        <path d="M48 42 V48 H42" />
      </g>
      <rect x="25" y="25" width="6" height="14" rx="1" fill="var(--cipher)" />
      <rect x="33" y="25" width="6" height="14" rx="1" fill="var(--accent)" />
    </svg>
  );
}

/** Lowercase mono wordmark with a blinking terminal cursor block. */
export function Wordmark({
  withMark = false,
  className,
}: {
  withMark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 select-none", className)}>
      {withMark && <LogoMark className="h-6 w-6" />}
      <span className="font-mono text-[15px] font-medium tracking-tight text-text">
        decrypt
        <span className="caret" />
      </span>
    </span>
  );
}
