import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives";
import { Wordmark } from "@/components/logo";
import { CareersForm } from "@/components/careers-form";

export const metadata: Metadata = {
  title: "Careers · Decrypt",
  description:
    "Join Decrypt, or pitch us what you offer. Send a short, raw note and your CV.",
};

export default function CareersPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/72 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Decrypt home" data-cursor="lock">
            <Wordmark withMark />
          </Link>
          <Link
            href="/"
            data-cursor="lock"
            className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[13px] text-text transition-colors hover:border-accent/50 hover:bg-surface-2"
          >
            <span className="text-accent transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </span>
            Back to site
          </Link>
        </Container>
      </header>

      <main className="pt-28 pb-24 md:pt-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="kicker inline-flex items-center gap-2">
                <span className="text-accent">{"//"}</span> WORK WITH US
              </span>
              <h1 className="font-display mt-5 text-[clamp(2.2rem,5.5vw,3.6rem)]">
                Join us, or <span className="glyph-accent">pitch</span> us.
              </h1>
              <p className="mt-6 max-w-md text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-muted">
                Two doors, same room. Want to join the team? Tell us who you are. Have
                something to offer us, a service, a skill, a partnership? Same form, just say
                so. No cover letter theatre. Be real, be short, and send your CV if you have
                one.
              </p>

              <ul className="mt-9 space-y-3">
                {[
                  "We read every single one ourselves.",
                  "Two or three honest lines beats two polished pages.",
                  "If there is a fit, we reach out fast.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] text-muted">
                    <span className="mt-1 text-accent">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <CareersForm />
          </div>
        </Container>
      </main>

      <footer className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-8 font-mono text-[12px] text-muted sm:flex-row">
          <span>© 2026 Decrypt</span>
          <Link href="/" data-cursor="lock" className="transition-colors hover:text-text">
            decrypt.start →
          </Link>
        </Container>
      </footer>
    </>
  );
}
