"use client";

import { useState } from "react";
import { Container, Kicker, Section } from "../primitives";
import { DecryptText } from "../decrypt-text";
import { Reveal } from "../reveal";
import { Chip, FieldError, FieldLabel, Input, Textarea } from "../ui/field";
import { BUDGET_OPTIONS, NEED_OPTIONS, TIMELINE_OPTIONS } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "needs" | "details", string>>;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [hp, setHp] = useState(""); // honeypot

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggleNeed = (n: string) =>
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = "Add your name so we know who we are talking to.";
    if (!email.trim()) e.email = "Add an email so we can reply.";
    else if (!emailOk(email)) e.email = "That email does not look right. Check it once.";
    if (needs.length === 0) e.needs = "Pick at least one thing you need.";
    if (!details.trim()) e.details = "Tell us a little about the project.";
    return e;
  };

  const blur = (field: keyof Errors) => {
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          website: company,
          needs,
          details,
          budget,
          timeline,
          _hp: hp,
        }),
      });
      const data = await res.json();
      setStatus(data?.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="start" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* left: pitch */}
          <div>
            <Reveal>
              <Kicker>START HERE</Kicker>
            </Reveal>
            <DecryptText
              as="h2"
              text="Tell us what you are trying to build."
              accent="build"
              className="font-display mt-5 text-[clamp(1.9rem,4.4vw,3rem)]"
            />
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed text-muted">
                The more you share, the faster we can tell you what is possible, what should
                happen first, and whether Decrypt is the right team. Send us your rough idea,
                current workflow, broken system, AI concept, website issue, app requirement, or
                business problem.
              </p>
            </Reveal>
          </div>

          {/* right: form / confirmation */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
              {status === "sent" ? (
                <Confirmation />
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-7">
                  {/* honeypot */}
                  <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Do not fill this
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div data-invalid={!!errors.name}>
                      <FieldLabel htmlFor="name">Your name</FieldLabel>
                      <Input
                        id="name"
                        value={name}
                        invalid={!!errors.name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => blur("name")}
                        placeholder="Jordan Reyes"
                        autoComplete="name"
                      />
                      <FieldError>{errors.name}</FieldError>
                    </div>
                    <div data-invalid={!!errors.email}>
                      <FieldLabel htmlFor="email">Work email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        invalid={!!errors.email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => blur("email")}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                      <FieldError>{errors.email}</FieldError>
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="company">Company or website</FieldLabel>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="company.com  ·  optional"
                    />
                  </div>

                  <fieldset data-invalid={!!errors.needs}>
                    <legend className="mb-2 block font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                      What do you need?
                    </legend>
                    <div className="flex flex-wrap gap-2.5">
                      {NEED_OPTIONS.map((n) => (
                        <Chip key={n} active={needs.includes(n)} onClick={() => toggleNeed(n)}>
                          {n}
                        </Chip>
                      ))}
                    </div>
                    <FieldError>{errors.needs}</FieldError>
                  </fieldset>

                  <div data-invalid={!!errors.details}>
                    <FieldLabel htmlFor="details">Tell us about it</FieldLabel>
                    <Textarea
                      id="details"
                      value={details}
                      invalid={!!errors.details}
                      onChange={(e) => setDetails(e.target.value)}
                      onBlur={() => blur("details")}
                      placeholder="Paste links, docs, or a few sentences. The more context, the faster we can help."
                      rows={4}
                    />
                    <FieldError>{errors.details}</FieldError>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Budget</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_OPTIONS.map((b) => (
                          <Chip
                            key={b}
                            active={budget === b}
                            onClick={() => setBudget(budget === b ? "" : b)}
                          >
                            {b}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Timeline</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINE_OPTIONS.map((t) => (
                          <Chip
                            key={t}
                            active={timeline === t}
                            onClick={() => setTimeline(timeline === t ? "" : t)}
                          >
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="lock"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[14px] font-medium text-bg transition-[filter] duration-300 hover:brightness-110 disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <span className="font-mono">encrypting · sending…</span>
                      ) : (
                        <>
                          Send brief
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="font-mono text-[13px] text-[#ff8585]" role="alert">
                        {"// something broke on send. email us directly and we will sort it."}
                      </p>
                    )}

                    <p className="text-center text-[13px] leading-relaxed text-muted">
                      No newsletters. No spam. A real person on our team reads this and replies.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Confirmation() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1.5 font-mono text-[12px] text-accent">
        <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
        decoded
      </span>
      <DecryptText
        as="p"
        text="Brief received. We will reach out within two business days."
        trigger="load"
        accent="received"
        className="font-display max-w-md text-[clamp(1.3rem,3vw,1.9rem)] leading-snug text-text"
        options={{ speed: 20, stepPerChar: 0.7 }}
      />
      <p className="mt-6 font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
        {"// channel secure"}
      </p>
    </div>
  );
}
