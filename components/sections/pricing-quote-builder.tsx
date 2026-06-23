"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Check } from "lucide-react";
import { Chip, FieldError, FieldLabel, Input } from "../ui/field";
import { PRICING_GROUPS, type PricingItem } from "@/lib/content";

type SelectedItem = PricingItem & { groupTitle: string; isMonthly: boolean };

function parseRange(range: string): { low: number; high: number; isMonthly: boolean } {
  const isMonthly = range.includes("/mo");
  const nums = range
    .replace(/\/mo/g, "")
    .match(/\$[\d,]+/g)
    ?.map((s) => Number(s.replace(/[$,]/g, ""))) ?? [0, 0];
  return { low: nums[0] ?? 0, high: nums[1] ?? nums[0] ?? 0, isMonthly };
}

function formatUSD(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function PricingQuoteBuilder() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [stage, setStage] = useState<"build" | "gated" | "sent">("build");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "error">("idle");

  const allItems: SelectedItem[] = useMemo(
    () =>
      PRICING_GROUPS.flatMap((g) =>
        g.items.map((item) => ({
          ...item,
          groupTitle: g.title,
          isMonthly: item.range.includes("/mo"),
        }))
      ),
    []
  );

  const toggle = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selected = allItems.filter((item) => selectedKeys.has(item.name));

  const totals = useMemo(() => {
    let low = 0;
    let high = 0;
    let monthlyLow = 0;
    let monthlyHigh = 0;
    for (const item of selected) {
      const r = parseRange(item.range);
      if (r.isMonthly) {
        monthlyLow += r.low;
        monthlyHigh += r.high;
      } else {
        low += r.low;
        high += r.high;
      }
    }
    return { low, high, monthlyLow, monthlyHigh };
  }, [selected]);

  const hasSelection = selected.length > 0;

  const validate = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = "Add your name.";
    if (!email.trim()) e.email = "Add an email so we can send your quote.";
    else if (!emailOk(email)) e.email = "That email does not look right.";
    return e;
  };

  const onReveal = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setStage("sent");
  };

  const onSendBreakdown = async () => {
    setSendStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          items: selected.map((s) => ({ name: s.name, range: s.range, category: s.groupTitle })),
          estimate: totals,
          _hp: hp,
        }),
      });
      const data = await res.json();
      setSendStatus(data?.ok ? "idle" : "error");
    } catch {
      setSendStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-text sm:text-2xl">Build your own quote</h3>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted">
            Select everything that applies. We will estimate a real-time range as you go.
          </p>
        </div>
        {hasSelection && (
          <span className="rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1.5 font-mono text-[12px] text-accent">
            {selected.length} selected
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {stage === "build" && (
          <motion.div
            key="build"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mt-7 space-y-7">
              {PRICING_GROUPS.map((group) => (
                <div key={group.slug}>
                  <h4 className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                    {group.title}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <Chip
                        key={item.name}
                        active={selectedKeys.has(item.name)}
                        onClick={() => toggle(item.name)}
                      >
                        {selectedKeys.has(item.name) && (
                          <Check size={12} strokeWidth={2.5} className="mr-1 -ml-0.5 inline" aria-hidden />
                        )}
                        {item.name}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* live estimate */}
            <div className="mt-8 rounded-xl border border-line bg-surface-2/50 p-5">
              {hasSelection ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Estimated range
                  </p>
                  <p className="font-display mt-2 text-[clamp(1.4rem,3vw,1.9rem)] text-text">
                    {formatUSD(totals.low)} to {formatUSD(totals.high)}
                    {totals.high === 0 && totals.low === 0 ? "" : "+"}
                  </p>
                  {(totals.monthlyLow > 0 || totals.monthlyHigh > 0) && (
                    <p className="mt-1.5 font-mono text-[13px] text-accent">
                      plus {formatUSD(totals.monthlyLow)} to {formatUSD(totals.monthlyHigh)}/mo
                      ongoing
                    </p>
                  )}
                  <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                    A rough starting estimate from selected packages. Final scope is confirmed
                    after discovery.
                  </p>
                </>
              ) : (
                <p className="text-[14px] text-muted">
                  Select one or more items above to see a real-time estimate.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!hasSelection}
              onClick={() => setStage("gated")}
              data-cursor="lock"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[14px] font-medium text-bg transition-[filter] duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Lock size={14} strokeWidth={2.2} aria-hidden />
              Unlock my estimate
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        )}

        {stage === "gated" && (
          <motion.form
            key="gated"
            onSubmit={onReveal}
            noValidate
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 space-y-5"
          >
            <div className="rounded-xl border border-line bg-surface-2/50 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {selected.length} item{selected.length === 1 ? "" : "s"} selected
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-text blur-sm select-none">
                {formatUSD(totals.low)} to {formatUSD(totals.high)}+ estimated
              </p>
              <p className="mt-2.5 text-[12.5px] text-muted">
                Enter your details to reveal your estimate and get the full breakdown by email.
              </p>
            </div>

            <div>
              <FieldLabel htmlFor="q-name">Your name</FieldLabel>
              <Input
                id="q-name"
                value={name}
                invalid={!!errors.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Reyes"
                autoComplete="name"
              />
              <FieldError>{errors.name}</FieldError>
            </div>
            <div>
              <FieldLabel htmlFor="q-email">Work email</FieldLabel>
              <Input
                id="q-email"
                type="email"
                value={email}
                invalid={!!errors.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
              <FieldError>{errors.email}</FieldError>
            </div>
            <div>
              <FieldLabel htmlFor="q-company">Company</FieldLabel>
              <Input
                id="q-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="optional"
              />
            </div>
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label>
                Do not fill this
                <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <button
                type="button"
                onClick={() => setStage("build")}
                data-cursor="lock"
                className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 font-mono text-[13px] text-muted transition-colors hover:border-accent/50 hover:text-text"
              >
                ← Back
              </button>
              <button
                type="submit"
                data-cursor="lock"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[14px] font-medium text-bg transition-[filter] duration-300 hover:brightness-110"
              >
                Reveal my estimate
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </motion.form>
        )}

        {stage === "sent" && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7"
          >
            <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-6">
              <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
                decoded
              </span>
              <p className="font-display mt-3 text-[clamp(1.5rem,3.4vw,2rem)] text-text">
                {formatUSD(totals.low)} to {formatUSD(totals.high)}+
              </p>
              {(totals.monthlyLow > 0 || totals.monthlyHigh > 0) && (
                <p className="mt-1 font-mono text-[14px] text-accent">
                  plus {formatUSD(totals.monthlyLow)} to {formatUSD(totals.monthlyHigh)}/mo
                  ongoing
                </p>
              )}
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Thanks, {name.split(" ")[0] || "there"}. This is a starting range based on what
                you selected. Real scope, timeline, and final pricing are confirmed after a short
                discovery call.
              </p>
            </div>

            <ul className="mt-5 space-y-2">
              {selected.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 border-b border-line py-2 text-[13.5px]"
                >
                  <span className="text-text">{item.name}</span>
                  <span className="font-mono text-muted">{item.range}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onSendBreakdown}
                disabled={sendStatus === "sending"}
                data-cursor="lock"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[14px] font-medium text-bg transition-[filter] duration-300 hover:brightness-110 disabled:opacity-60"
              >
                {sendStatus === "sending" ? "sending…" : "Email me this breakdown"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <a
                href="#start"
                data-cursor="lock"
                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 font-mono text-[14px] text-text transition-colors hover:border-accent/50 hover:bg-surface"
              >
                Start a project
              </a>
            </div>
            {sendStatus === "error" && (
              <p className="mt-3 font-mono text-[13px] text-[#ff8585]" role="alert">
                {"// something broke on send. email us directly and we will sort it."}
              </p>
            )}
            {sendStatus === "idle" && (
              <p className="mt-3 text-center text-[12.5px] text-muted">
                No spam. A real person on our team reads this.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
