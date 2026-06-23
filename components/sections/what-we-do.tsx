import { Container, Kicker, Section } from "../primitives";
import { DecryptText } from "../decrypt-text";
import { Reveal } from "../reveal";
import { TiltCard } from "../tilt-card";
import { PROMISES, SERVICES } from "@/lib/content";

function ServiceCard({ label, body }: { label: string; body: string }) {
  return (
    <TiltCard className="h-full">
      <div className="card group h-full overflow-hidden rounded-xl p-6">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
        <h4 className="font-mono text-sm tracking-tight text-text">{label}</h4>
        <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{body}</p>
      </div>
    </TiltCard>
  );
}

function GroupHeader({ name }: { name: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">·</span> {name}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function WhatWeDo() {
  const build = SERVICES.slice(0, 3);
  const systems = SERVICES.slice(3);

  return (
    <Section id="what">
      <Container>
        <Reveal>
          <Kicker>WHAT WE DO</Kicker>
        </Reveal>
        <DecryptText
          as="h2"
          text="Design, build, automate, and ship, all under one roof."
          accent="ship"
          className="font-display mt-5 max-w-3xl text-[clamp(1.9rem,4.4vw,3rem)]"
        />
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed text-muted">
            One team takes you from rough idea to production-ready system. Discovery, UI/UX,
            content, product management, development, backend, AI integration, SharePoint,
            Power Automate, QA, and long-term maintenance, all from one place.
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          <div>
            <Reveal>
              <GroupHeader name="Build" />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {build.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <ServiceCard label={s.label} body={s.body} />
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <GroupHeader name="Automate and support" />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {systems.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <ServiceCard label={s.label} body={s.body} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* promises strip */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.07}>
              <TiltCard className="h-full" max={5}>
                <div className="h-full rounded-xl border border-accent/25 bg-accent/[0.05] p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <h4 className="font-mono text-sm text-accent">{p.label}</h4>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
