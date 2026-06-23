import { Resend } from "resend";

const TO = "bizzbinarysolutions@gmail.com";
const FROM = process.env.RESEND_FROM || "Decrypt Careers <onboarding@resend.dev>";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const { mode, name, email, links, about, cvName, cvContent, _hp } = data ?? {};

  if (_hp) return Response.json({ ok: true });

  if (!mode || !name || !email || !about) {
    return Response.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const lines = [
    `Type: ${mode}`,
    `Name: ${name}`,
    `Email: ${email}`,
    links ? `Links: ${links}` : null,
    cvName ? `CV attached: ${cvName}` : "No CV attached",
    "",
    "About (in their words):",
    String(about),
  ]
    .filter(Boolean)
    .join("\n");

  const attachments =
    cvName && cvContent
      ? [{ filename: String(cvName), content: String(cvContent) }]
      : undefined;

  if (!process.env.RESEND_API_KEY) {
    console.warn("[careers] RESEND_API_KEY not set. Submission:\n" + lines);
    return Response.json({ ok: true, note: "logged (no email key configured)" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(email),
      subject: `Careers · ${mode} · ${name}`,
      text: lines,
      attachments,
    });
    if (error) {
      console.error("[careers] resend error", error);
      return Response.json({ ok: false, error: "Send failed" }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[careers] send threw", err);
    return Response.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
