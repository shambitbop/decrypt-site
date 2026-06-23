import { Resend } from "resend";

const TO = "bizzbinarysolutions@gmail.com";
const FROM = process.env.RESEND_FROM || "Decrypt Site <onboarding@resend.dev>";

type QuoteItem = { name: string; range: string; category: string };
type Estimate = { low: number; high: number; monthlyLow: number; monthlyHigh: number };

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const { name, email, company, items, estimate, _hp } = data ?? {};

  if (_hp) return Response.json({ ok: true });

  if (!name || !email || !Array.isArray(items) || items.length === 0) {
    return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const est = estimate as Estimate;
  const lineItems = (items as QuoteItem[])
    .map((i) => `  - ${i.name} (${i.category}): ${i.range}`)
    .join("\n");

  const estimateLines = [
    `One-time estimate: $${est.low.toLocaleString("en-US")} to $${est.high.toLocaleString("en-US")}+`,
    est.monthlyLow > 0
      ? `Ongoing: $${est.monthlyLow.toLocaleString("en-US")} to $${est.monthlyHigh.toLocaleString("en-US")}/mo`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    "Selected items:",
    lineItems,
    "",
    estimateLines,
    "",
    "Note: starting estimate only, final scope confirmed after discovery.",
  ]
    .filter((l) => l !== null)
    .join("\n");

  if (!process.env.RESEND_API_KEY) {
    console.warn("[quote] RESEND_API_KEY not set. Submission:\n" + lines);
    return Response.json({ ok: true, note: "logged (no email key configured)" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(email),
      subject: `Quote request · ${name} · ${(items as QuoteItem[]).length} items`,
      text: lines,
    });
    if (error) {
      console.error("[quote] resend error", error);
      return Response.json({ ok: false, error: "Send failed" }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[quote] send threw", err);
    return Response.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
