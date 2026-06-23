"use client";

import { useState } from "react";
import { Container, Kicker, Section } from "../primitives";
import { DecryptText } from "../decrypt-text";
import { Reveal } from "../reveal";
import { TiltCard } from "../tilt-card";
import { Modal } from "../ui/modal";
import { PRICING_GROUPS, PRICING_FAQ, type PricingGroup } from "@/lib/content";
import { PricingQuoteBuilder } from "./pricing-quote-builder";

function PricingCard({ group, onOpen }: { group: PricingGroup; onOpen: () => void }) {
  return (
    <TiltCard className="h-full">
      <button
        onClick={onOpen}
        data-cursor="lock"
        className="card group flex h-full w-full flex-col rounded-xl p-6 text-left"
      >
        <h3 className="font-display text-xl text-text">{group.title}</h3>
        <p className="font-mono mt-2 text-[15px] text-accent">{group.rangeSummary}</p>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted">{group.blurb}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[13px] text-text">
          See what is included
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </TiltCard>
  );
}

function PricingModal({ group }: { group: PricingGroup }) {
  const titleId = `pricing-${group.slug}`;
  return (
    <div className="p-6 sm:p-9">
      <h2 id={titleId} className="font-display text-[clamp(1.6rem,4vw,2.2rem)] text-text">
        {group.title}
      </h2>
      <p className="font-mono mt-2 text-[16px] text-accent">{group.rangeSummary}</p>
      <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{group.blurb}</p>

      <div className="mt-7 space-y-5">
        {group.items.map((item) => (
          <div key={item.name} className="rounded-xl border border-line bg-surface-2/50 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-base text-text">{item.name}</h3>
              <span className="font-mono text-[13px] text-accent">{item.range}</span>
            </div>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-muted">
        Larger scopes, advanced AI features, integrations, compliance needs, and enterprise
        support are quoted after discovery.
      </p>

      <div className="mt-7">
        <a
          href="#start"
          data-cursor="lock"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[14px] font-medium text-bg transition-[filter] duration-300 hover:brightness-110"
        >
          Get a quote
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

export function Pricing() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = PRICING_GROUPS.find((g) => g.slug === activeSlug) ?? null;

  return (
    <Section id="pricing" className="border-t border-line">
      <Container>
        <Reveal>
          <Kicker>PRICING</Kicker>
        </Reveal>
        <DecryptText
          as="h2"
          text="Affordable software, starting at $100."
          accent="$100"
          className="font-display mt-5 max-w-3xl text-[clamp(1.9rem,4.4vw,3rem)]"
        />
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed text-muted">
            You do not need a massive budget to start building custom software or implementing
            AI. Fixed-price starter packages for startups, SMEs, and growing enterprises. Open a
            card for full inclusions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_GROUPS.map((group, i) => (
            <Reveal key={group.slug} delay={i * 0.06}>
              <PricingCard group={group} onOpen={() => setActiveSlug(group.slug)} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {PRICING_FAQ.map((f) => (
              <div key={f.q} className="rounded-xl border border-line bg-surface/40 p-5">
                <h4 className="font-mono text-[13px] text-text">{f.q}</h4>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10">
            <PricingQuoteBuilder />
          </div>
        </Reveal>
      </Container>

      <Modal open={!!active} onClose={() => setActiveSlug(null)} labelledBy={`pricing-${active?.slug ?? ""}`} headerLabel="decrypt · pricing">
        {active && <PricingModal group={active} />}
      </Modal>
    </Section>
  );
}
