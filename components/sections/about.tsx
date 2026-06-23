import { Container, Kicker, Section } from "../primitives";
import { DecryptText } from "../decrypt-text";
import { Reveal } from "../reveal";
import { DecodePanel } from "../decode-panel";
import {
  ABOUT_INTRO,
  ABOUT_BODY,
  ABOUT_DIFFERENTIATORS,
  ABOUT_STATS,
} from "@/lib/content";

export function About() {
  return (
    <Section id="about" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <Kicker>ABOUT DECRYPT</Kicker>
            </Reveal>
            <DecryptText
              as="h2"
              text="An AI-powered software studio, built for real operations."
              accent="real operations"
              className="font-display mt-5 max-w-2xl text-[clamp(1.9rem,4.4vw,3rem)]"
            />
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-xl text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed text-muted">
                {ABOUT_INTRO}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
                {ABOUT_BODY}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <h3 className="font-display mt-10 text-lg text-text">What makes us different</h3>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {ABOUT_DIFFERENTIATORS.map((point, i) => (
                <Reveal key={point} as="li" delay={0.14 + i * 0.04}>
                  <div className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-muted">
                    <span className="mt-1 text-accent">→</span>
                    {point}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <Reveal delay={0.1} className="hidden self-end lg:block">
              <DecodePanel size={168} />
            </Reveal>
            <div className="mt-6 space-y-4 lg:mt-2">
              {ABOUT_STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.06 + i * 0.07}>
                  <div className="card rounded-xl p-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {stat.label}
                    </span>
                    <p className="mt-3 text-[15px] leading-relaxed text-text">{stat.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
