import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONTACT_TOPICS } from "@/lib/contact-topics";

const schema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(200),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(320),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(5000),
  trainer: z.string().trim().max(60).optional().or(z.literal("")),
  topic: z.enum(CONTACT_TOPICS).optional().or(z.literal("")),
  /* Checked in the browser too, but the browser is not where this is decided:
     the form can be posted without ever rendering, so consent is a condition
     of the request rather than a tick the UI is trusted to have collected. */
  consent: z.literal(true, { message: "Einwilligung ist erforderlich" }),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Recipients: always Julian, plus Florian for physiotherapy enquiries.
    const recipients = ["julian@juklhealth.com"];
    if (data.topic === "Physiotherapie") {
      recipients.push("florian@juklhealth.com");
    }

    // Email is the only delivery path, so the send has to be reported honestly:
    // a swallowed failure would lose the enquiry without anyone noticing.
    let sent = false;
    try {
      const { sendContactNotification } = await import("@/lib/email/send.server");
      sent = await sendContactNotification(recipients, {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message,
        trainer: data.trainer || undefined,
        topic: data.topic || undefined,
      });
    } catch (err) {
      console.error("[contact] sending notification failed", err);
    }

    if (!sent) {
      // Just the failure. The fallback address is the page's to add — it has
      // one already, as a mailto link, and saying it here too printed it twice.
      throw new Error("Deine Nachricht konnte nicht übermittelt werden.");
    }

    return { ok: true as const };
  });
