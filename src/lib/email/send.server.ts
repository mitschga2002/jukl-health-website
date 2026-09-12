// Transactional email via the Resend HTTP API.
//
// Uses fetch directly rather than the SDK so it runs unchanged on the
// Cloudflare Workers runtime. Configure in the deployment environment:
//   RESEND_API_KEY   required - without it sending is skipped, not attempted
//   RESEND_FROM      optional - defaults to noreply@juklhealth.com
// The from-domain must be verified in Resend or the API rejects the send.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type ContactNotification = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  trainer?: string;
  topic?: string;
};

/** Escapes interpolated values so user input cannot inject markup into the email. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function buildHtml(data: ContactNotification): string {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["E-Mail", data.email],
    ...(data.phone ? ([["Telefon", data.phone]] as Array<[string, string]>) : []),
    ["Anliegen", data.topic || "Allgemeine Anfrage"],
    ...(data.trainer ? ([["Trainer", data.trainer]] as Array<[string, string]>) : []),
  ];

  const rowHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap">${esc(label)}</td>` +
        `<td style="padding:6px 0"><strong>${esc(value)}</strong></td></tr>`,
    )
    .join("");

  return `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.5;color:#111">
  <h2 style="margin:0 0 16px">Neue Anfrage über juklhealth.com</h2>
  <table style="border-collapse:collapse;margin-bottom:20px">${rowHtml}</table>
  <div style="border-top:1px solid #e5e5e5;padding-top:16px">
    <div style="color:#666;margin-bottom:6px">Nachricht</div>
    <div style="white-space:pre-wrap">${esc(data.message)}</div>
  </div>
</div>`;
}

function buildText(data: ContactNotification): string {
  return [
    "Neue Anfrage über juklhealth.com",
    "",
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    `Anliegen: ${data.topic || "Allgemeine Anfrage"}`,
    data.trainer ? `Trainer: ${data.trainer}` : null,
    "",
    "Nachricht:",
    data.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

/**
 * Sends the contact notification. Throws on a failed send so the caller can
 * decide how to react; returns false when email is simply not configured.
 */
export async function sendContactNotification(
  recipients: string[],
  data: ContactNotification,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const subject = data.trainer
    ? `Termin-Anfrage für ${data.trainer}`
    : `Anfrage: ${data.topic || "Allgemeine Anfrage"}`;

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "JuklHealth <noreply@juklhealth.com>",
      to: recipients,
      // So hitting reply in the inbox answers the person who wrote in.
      reply_to: data.email,
      subject,
      html: buildHtml(data),
      text: buildText(data),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${body.slice(0, 300)}`);
  }
  return true;
}
