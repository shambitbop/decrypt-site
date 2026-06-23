"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Container } from "./primitives";
import { DecryptText } from "./decrypt-text";
import { StickyRobot } from "./sticky-robot";

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 + i * 0.08 },
  }),
};

const MICRO = ["AI software systems", "workflow automation", "custom web and mobile apps"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-[clamp(5rem,12vw,9rem)] md:pt-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* left column */}
          <div className="relative z-10">
            <motion.div
              custom={0}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5"
            >
              <span className="kicker !tracking-[0.18em]">
                <span className="text-accent">{"//"}</span> AI-powered software studio
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)]">
              <DecryptText
                text="We decode complex"
                as="span"
                trigger="load"
                accent="decode"
                className="block"
                options={{ speed: 24, stepPerChar: 1.4 }}
              />
              <DecryptText
                text="workflows into AI software."
                as="span"
                trigger="load"
                className="block text-muted"
                options={{ speed: 24, delay: 8, stepPerChar: 1.2 }}
              />
            </h1>

            <motion.p
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-xl text-[clamp(1rem,1.5vw,1.18rem)] leading-relaxed text-muted"
            >
              Your business should not be forced into generic tools. Decrypt builds custom
              software, automation systems, dashboards, web apps, mobile apps, ERP platforms,
              websites, and AI-powered internal systems that match your workflow and help your
              team move faster with fewer manual steps.
            </motion.p>

            <motion.div
              custom={4}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#start"
                data-cursor="lock"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[14px] font-medium text-bg shadow-[0_8px_24px_-10px_color-mix(in_oklab,var(--accent)_70%,transparent)] transition-[filter,box-shadow] duration-300 hover:brightness-110"
              >
                Start a project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#how"
                data-cursor="lock"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[14px] text-text transition-colors hover:border-accent/50 hover:bg-surface"
              >
                See how we work
                <span className="text-accent transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </motion.div>

            <motion.ul
              custom={5}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap gap-x-7 gap-y-2"
            >
              {MICRO.map((m) => (
                <li key={m} className="kicker">
                  <span className="text-accent">{"//"}</span> {m}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* right column: robot panel, sticks bottom-right on scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative"
          >
            <StickyRobot heroRef={sectionRef} />
          </motion.div>
        </div>
      </Container>

      {/* bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
    </section>
  );
}
