import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full px-[var(--gutter)]", className)}
      style={{ maxWidth: "var(--maxw)" }}
    >
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="kicker inline-flex items-center gap-2">
      <span className="text-accent">{"//"}</span>
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[76px] pt-[clamp(2.75rem,5vw,4rem)] pb-[clamp(4rem,9vw,7rem)]",
        className
      )}
    >
      {children}
    </section>
  );
}

/** A hairline divider with a mid-dot, carrying the Greply visual language. */
export function Divider() {
  return (
    <div className="flex items-center gap-3 text-muted">
      <span className="h-px flex-1 bg-line" />
      <span aria-hidden className="text-xs">
        ·
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
