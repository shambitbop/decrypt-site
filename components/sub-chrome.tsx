import Link from "next/link";
import { Container } from "./primitives";
import { Wordmark } from "./logo";

export function SubHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/72 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Decrypt home">
          <Wordmark withMark />
        </Link>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[13px] text-text transition-colors hover:border-accent/50 hover:bg-surface-2"
        >
          <span className="text-accent transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
          Back to site
        </Link>
      </Container>
    </header>
  );
}

export function SubFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-3 py-8 font-mono text-[12px] text-muted sm:flex-row">
        <span>© 2026 Decrypt</span>
        <Link href="/" className="transition-colors hover:text-text">
          decrypt.start →
        </Link>
      </Container>
    </footer>
  );
}

/** Shared layout for legal / text pages. */
export function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SubHeader />
      <main className="pt-28 pb-20 md:pt-36">
        <Container className="max-w-3xl">
          <span className="kicker inline-flex items-center gap-2">
            <span className="text-accent">{"//"}</span> {kicker}
          </span>
          <h1 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.2rem)]">{title}</h1>
          <p className="mt-4 font-mono text-[12px] text-muted">{updated}</p>
          <div className="legal-body mt-10 space-y-8">{children}</div>
        </Container>
      </main>
      <SubFooter />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl text-text">{heading}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}
