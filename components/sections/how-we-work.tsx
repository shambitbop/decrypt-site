"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container, Kicker, Section } from "../primitives";
import { DecryptText } from "../decrypt-text";
import { Reveal } from "../reveal";
import { WireframeCube } from "../wireframe-cube";
import { PROCESS_STEPS } from "@/lib/content";

export function HowWeWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 60%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="how">
      <Container>
        <div className="flex items-start justify-between gap-8">
          <div>
            <Reveal>
              <Kicker>HOW WE WORK</Kicker>
            </Reveal>
            <DecryptText
              as="h2"
              text="From signal to shipped, without the handoffs."
              accent="shipped"
              className="font-display mt-5 max-w-2xl text-[clamp(1.9rem,4.4vw,3rem)]"
            />
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-xl text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-muted">
                A straight line from the first conversation to a thing in production. Every
                step opens as you scroll the route.
              </p>
            </Reveal>
          </div>
          <Reveal className="hidden shrink-0 lg:block">
            <WireframeCube />
          </Reveal>
        </div>

        {/* roadmap */}
        <div ref={railRef} className="relative mt-16 pl-10 sm:pl-14">
          {/* base rail */}
          <span className="absolute left-[14px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
          {/* progress fill */}
          <motion.span
            style={{ height: fillHeight }}
            className="absolute left-[14px] top-2 w-px origin-top bg-accent"
          />

          <ol className="space-y-12">
            {PROCESS_STEPS.map((step) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* node */}
                <span className="absolute -left-10 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-bg sm:-left-14">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <div className="rounded-xl border border-line bg-surface/50 p-6 transition-colors group-hover:border-accent/35">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-accent">{step.n}</span>
                    <h3 className="font-display text-xl text-text">{step.label}</h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
