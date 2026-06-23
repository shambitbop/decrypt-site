# Decrypt · One Page Site

> We decode what others cannot.

A single page marketing site for **Decrypt**, an AI-powered software studio that builds
custom software, AI automation, web apps, mobile apps, ERP systems, websites, and ongoing
maintenance across manufacturing, SaaS, language services, education, healthcare, and
ecommerce.

Dark only, monospace-accented, with a signature **decryption resolve** motif (headlines
render with a green accent word) and an interactive 3D robot hero.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** with CSS-variable design tokens, dark theme only
- **Motion** (Framer Motion) for whileInView reveals and the hero load sequence
- **Lenis** smooth scroll, gated behind reduced motion / coarse pointer
- **@splinetool/react-spline** for the interactive 3D robot (lazy loaded, poster fallback)
- **Resend** for contact and careers form email delivery
- Self-hosted **Clash Display** (display), **Geist** (body), **JetBrains Mono** (utility)

## Page sections

Hero → Premise → What We Do → How We Work → Work (7 case study cards, modal detail) →
Pricing (6 category cards, modal detail) → About → Contact → Footer

Case study and pricing cards open accessible modal dialogs (`Esc` to close, focus trapped,
backdrop click to dismiss) with full project/package detail.

## Develop

```bash
npm install   # or pnpm install
npm run dev   # http://localhost:3000
npm run build
npm run lint
```

## IMPORTANT: missing font files

`app/fonts.ts` expects 4 self-hosted Clash Display files at `app/fonts/`:

```
ClashDisplay-Regular.woff2
ClashDisplay-Medium.woff2
ClashDisplay-Semibold.woff2
ClashDisplay-Bold.woff2
```

These were not included in the original project files handed to Claude, so they could not
be carried into this delivery. Download them from https://www.fontshare.com/fonts/clash-display
(free, OFL-adjacent license, check terms) and place them in `app/fonts/` before running
`next build`. Without them, the build fails at the font loader step.

Geist and JetBrains Mono load from Google Fonts automatically at build time and need network
access; no local files required for those two.

## Contact and careers form email (Resend)

Both `app/api/contact/route.ts` and `app/api/careers/route.ts` send to
**bizzbinarysolutions@gmail.com**.

Set environment variables (see `.env.example` if present, or create one):

```
RESEND_API_KEY=re_xxx
RESEND_FROM=Decrypt <hello@yourdomain.com>   # optional; defaults to the Resend test sender
```

Without a key the routes validate, log the submission server-side, and return ok so local
development works. For production, add a verified sending domain in Resend and set
RESEND_FROM.

## Content

All copy lives in `lib/content.ts`: services, premise points, process steps, 7 case studies,
6 pricing groups (covering 13 original line items), pricing FAQ, homepage FAQ, About section
copy, footer columns, and contact form options. Edit there first for any copy change.

## Notes before further launch prep

- **Case study "Project reflection" quotes are drafts pending client approval.** Each is
  clearly labeled in its modal as draft and not yet a verified testimonial. Replace with
  approved quotes (or remove the block) before treating them as real testimonials.
- The copy follows one hard rule: no em dashes and no en dashes. Use the middle dot,
  slashes, commas, and the word "to" for ranges.
- Dark theme only. No theme toggle, no light-mode tokens.

---

Hero robot component sourced via the 21st.dev Magic MCP (Interactive 3D Robot / Spline Scene).
