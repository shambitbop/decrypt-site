"use client";

import { useEffect, useState } from "react";
import { Briefcase, Route, Boxes, ArrowRight } from "lucide-react";
import { LogoMark } from "./logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "How we work", href: "#how" },
  { label: "Pricing", href: "#pricing" },
] as const;

const ICONS = [Briefcase, Route, Boxes] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className={cn(
          "pointer-events-auto flex items-center transition-all duration-500 ease-out",
          scrolled
            ? "glass mt-3 gap-1 rounded-full px-2 py-1.5 shadow-[0_14px_44px_-16px_rgba(0,0,0,0.35)]"
            : "mt-0 h-16 w-full max-w-[var(--maxw)] justify-between px-[var(--gutter)]"
        )}
      >
        {/* logo */}
        <a
          href="#top"
          aria-label="Decrypt home"
          className={cn(
            "flex items-center rounded-full transition-colors",
            scrolled ? "px-1.5" : ""
          )}
        >
          <LogoMark className="h-7 w-7" />
          <span
            className={cn(
              "ml-2 font-mono text-[15px] font-medium tracking-tight text-text transition-all",
              scrolled ? "hidden" : "inline"
            )}
          >
            decrypt
            <span className="caret" />
          </span>
        </a>

        {/* links */}
        <nav
          className={cn("flex items-center", scrolled ? "gap-0.5" : "hidden gap-7 md:flex")}
          aria-label="Primary"
        >
          {LINKS.map(({ label, href }, i) => {
            const Icon = ICONS[i];
            return (
              <a
                key={href}
                href={href}
                title={label}
                className={cn(
                  "group inline-flex items-center rounded-full text-muted transition-colors hover:text-text",
                  scrolled
                    ? "h-9 w-9 justify-center hover:bg-surface-2"
                    : "font-mono text-[13px]"
                )}
              >
                {scrolled ? (
                  <>
                    <Icon size={17} strokeWidth={1.8} aria-hidden />
                    <span className="sr-only">{label}</span>
                  </>
                ) : (
                  label
                )}
              </a>
            );
          })}
        </nav>

        {/* actions */}
        <div className={cn("flex items-center", scrolled ? "gap-1 pl-1" : "gap-3")}>
          {scrolled && <span className="mx-1 h-5 w-px bg-line" />}
          <a
            href="#start"
            aria-label="Start a project"
            className={cn(
              "group inline-flex items-center justify-center gap-1.5 rounded-full bg-accent font-mono font-medium text-bg transition-[filter] duration-300 hover:brightness-110",
              scrolled ? "h-9 w-9" : "px-4 py-2 text-[13px]"
            )}
          >
            {scrolled ? (
              <ArrowRight size={17} strokeWidth={2} aria-hidden />
            ) : (
              <>
                Start a project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
