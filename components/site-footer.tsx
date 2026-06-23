import Link from "next/link";
import { LogoMark } from "./logo";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";
import { FOOTER_COLUMNS } from "@/lib/content";

function FooterLink({ href, label }: { href: string; label: string }) {
  const internal = href.startsWith("/");
  const cls =
    "text-[14px] text-muted transition-colors hover:text-accent";
  return internal ? (
    <Link href={href} className={cls}>
      {label}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-[var(--gutter)] pb-8">
      <div className="glass relative mx-auto max-w-[var(--maxw)] overflow-hidden rounded-3xl">
        <FooterBackgroundGradient />

        <div className="relative z-10 p-10 sm:p-14">
          <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.2em] text-muted uppercase">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {"// all signals decoded"}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div>
              <div className="flex items-center gap-3">
                <LogoMark className="h-8 w-8" />
                <span className="font-display text-2xl text-text">decrypt</span>
              </div>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
                We decode what others cannot. An AI-powered software studio.
              </p>
              <a
                href="#start"
                className="group mt-6 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-[13px] text-text transition-colors hover:border-accent/50"
              >
                Start a project
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {FOOTER_COLUMNS.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    <span className="text-accent">{"//"}</span> {col.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink href={link.href} label={link.label} />
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between border-t border-line pt-6 font-mono text-[12px] text-muted">
            <span>© 2026 Decrypt</span>
            <a href="#top" className="transition-colors hover:text-text">
              back to top ↑
            </a>
          </div>
        </div>

        {/* big hover wordmark */}
        <div className="relative z-10 -mt-6 hidden h-44 w-full sm:flex md:h-56">
          <TextHoverEffect text="DECRYPT" />
        </div>
      </div>
    </footer>
  );
}
