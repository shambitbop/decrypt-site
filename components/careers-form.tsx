"use client";

import { useRef, useState } from "react";
import { Chip, FieldError, FieldLabel, Input, Textarea } from "./ui/field";

const MODES = ["I want to join", "I have something to offer"] as const;
const MAX_CV_BYTES = 4 * 1024 * 1024; // 4MB

type Errors = Partial<Record<"mode" | "name" | "email" | "about" | "cv", string>>;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const result = String(r.result);
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export function CareersForm() {
  const [mode, setMode] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState("");
  const [about, setAbout] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [hp, setHp] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!mode) e.mode = "Pick one so we know how to read this.";
    if (!name.trim()) e.name = "Add your name.";
    if (!email.trim()) e.email = "Add an email so we can reply.";
    else if (!emailOk(email)) e.email = "That email does not look right.";
    if (!about.trim()) e.about = "Tell us about yourself, even two lines.";
    if (cv && cv.size > MAX_CV_BYTES) e.cv = "That file is over 4MB. Trim it or send a link.";
    return e;
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setCv(f);
    setErrors((p) => ({ ...p, cv: f && f.size > MAX_CV_BYTES ? "That file is over 4MB. Trim it or send a link." : undefined }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).filter((k) => e[k as keyof Errors]).length > 0) return;

    setStatus("sending");
    try {
      let cvName: string | undefined;
      let cvContent: string | undefined;
      if (cv) {
        cvName = cv.name;
        cvContent = await readAsBase64(cv);
      }
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, name, email, links, about, cvName, cvContent, _hp: hp }),
      });
      const data = await res.json();
      setStatus(data?.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-line bg-surface/40 p-8 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1.5 font-mono text-[12px] text-accent">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
          received
        </span>
        <p className="font-display max-w-md text-[clamp(1.3rem,3vw,1.9rem)] leading-snug text-text">
          Got it. If there is a fit, a real person on our team will reach out.
        </p>
        <p className="mt-6 font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
          {"// channel secure"}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-7 rounded-2xl border border-line bg-surface/40 p-6 sm:p-8"
    >
      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Do not fill this
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 block font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
          Which one are you?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {MODES.map((m) => (
            <Chip key={m} active={mode === m} onClick={() => setMode(m)}>
              {m}
            </Chip>
          ))}
        </div>
        <FieldError>{errors.mode}</FieldError>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="c-name">Your name</FieldLabel>
          <Input
            id="c-name"
            value={name}
            invalid={!!errors.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Reyes"
            autoComplete="name"
          />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="c-email">Email</FieldLabel>
          <Input
            id="c-email"
            type="email"
            value={email}
            invalid={!!errors.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="c-links">Links</FieldLabel>
        <Input
          id="c-links"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder="portfolio, github, or site  ·  optional"
        />
      </div>

      <div>
        <FieldLabel htmlFor="c-about">Tell us about yourself</FieldLabel>
        <Textarea
          id="c-about"
          value={about}
          invalid={!!errors.about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Two or three lines, raw and honest. What you are great at, what you are tired of, what you want to build next."
          rows={3}
        />
        <FieldError>{errors.about}</FieldError>
      </div>

      <div>
        <FieldLabel htmlFor="c-cv">Attach your CV</FieldLabel>
        <input
          ref={fileRef}
          id="c-cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf"
          onChange={onFile}
          data-cursor="lock"
          className="block w-full text-[14px] text-muted file:mr-4 file:rounded-full file:border file:border-line file:bg-surface file:px-4 file:py-2 file:font-mono file:text-[13px] file:text-text hover:file:border-accent/50"
        />
        <p className="mt-2 font-mono text-[11px] text-muted/70">
          {"// pdf or doc, up to 4MB · optional but it helps"}
        </p>
        <FieldError>{errors.cv}</FieldError>
      </div>

      <div className="flex flex-col gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="lock"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[14px] font-medium text-bg transition-[filter] duration-300 hover:brightness-110 disabled:opacity-60"
        >
          {status === "sending" ? (
            <span>sending…</span>
          ) : (
            <>
              Send it
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
        {status === "error" && (
          <p className="font-mono text-[13px] text-[#d6453f]" role="alert">
            {"// something broke on send. try again in a moment."}
          </p>
        )}
        <p className="text-center text-[13px] leading-relaxed text-muted">
          No forms in triplicate. A real person reads this.
        </p>
      </div>
    </form>
  );
}
