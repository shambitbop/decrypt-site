import { Container, Kicker, Section } from "../primitives";
import { DecryptText } from "../decrypt-text";
import { Reveal } from "../reveal";
import { TiltCard } from "../tilt-card";
import { PREMISE_POINTS } from "@/lib/content";

export function Premise() {
  return (
    <Section id="premise">
      <Container>
        <Reveal>
          <Kicker>THE PREMISE</Kicker>
        </Reveal>
        <DecryptText
          as="h2"
          text="Every hard business problem is just something not yet decoded."
          accent="decoded"
          className="font-display mt-5 max-w-3xl text-[clamp(1.9rem,4.4vw,3rem)]"
        />
        <Reveal delay={0.05}>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed text-muted">
            Most studios can build the easy version: a clean website, a nice demo, a basic app
            screen. Real business software gets difficult where the workflow gets messy, legacy
            tools, undocumented approvals, disconnected data, manual reporting, fragile
            integrations, or an AI idea that needs a real technical plan. That is where Decrypt
            starts.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PREMISE_POINTS.map((point, i) => (
            <Reveal key={point.label} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="card group h-full rounded-xl p-7">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-lg text-text">{point.label}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{point.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
