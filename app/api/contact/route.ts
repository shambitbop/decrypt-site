import { Resend } from "resend";

const TO = "bizzbinarysolutions@gmail.com";
// Use the Resend test sender until a verified domain is set via env.
const FROM = process.env.RESEND_FROM || "Decrypt Site <onboarding@resend.dev>";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const { name, email, company, website, needs, details, budget, timeline, _hp } =
    data ?? {};

  // honeypot: bots fill hidden fields
  if (_hp) return Response.json({ ok: true });

  // server side validation of the four required fields
  if (
    !name ||
    !email ||
    !details ||
    !Array.isArray(needs) ||
    needs.length === 0
  ) {
    return Response.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company || website
      ? `Company / website: ${(company as string) ?? ""} ${(website as string) ?? ""}`.trim()
      : null,
    `Needs: ${(needs as string[]).join(", ")}`,
    budget ? `Budget: ${budget}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    "",
    "Details:",
    String(details),
  ]
    .filter(Boolean)
    .join("\n");

  // If the key is not configured, log and accept gracefully so local/dev works.
  if (!process.env.RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set. Submission:\n" + lines);
    return Response.json({ ok: true, note: "logged (no email key configured)" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(email),
      subject: `New inquiry · ${name} · ${(needs as string[]).join(", ")}`,
      text: lines,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return Response.json({ ok: false, error: "Send failed" }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send threw", err);
    return Response.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
