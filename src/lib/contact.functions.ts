import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TOPICS = [
  "Allgemeine Anfrage",
  "Personal Training",
  "Athletiktraining",
  "Gruppentraining",
  "Physiotherapie",
  "Trainingstherapie",
  "Analysen",
  "Performance Club",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(200),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(320),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(5000),
  trainer: z.string().trim().max(60).optional().or(z.literal("")),
  topic: z.enum(TOPICS).optional().or(z.literal("")),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Recipients: always Julian, plus Florian for physiotherapy enquiries.
    const recipients = ["julian@juklhealth.com"];
    if (data.topic === "Physiotherapie") {
      recipients.push("florian@juklhealth.com");
    }

    const row = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      trainer: data.trainer || null,
      topic: data.topic || null,
    };

    // Store and notify independently: a submission is not lost just because one
    // of the two backends is unconfigured or temporarily down.
    const [stored, mailed] = await Promise.all([
      (async () => {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("contact_submissions").insert(row as never);
          if (error) throw new Error(error.message);
          return true;
        } catch (err) {
          console.error("[contact] storing submission failed", err);
          return false;
        }
      })(),
      (async () => {
        try {
          const { sendContactNotification } = await import("@/lib/email/send.server");
          return await sendContactNotification(recipients, {
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            message: data.message,
            trainer: data.trainer || undefined,
            topic: data.topic || undefined,
          });
        } catch (err) {
          console.error("[contact] sending notification failed", err);
          return false;
        }
      })(),
    ]);

    // Only a total failure is reported to the visitor, so they know to email us.
    if (!stored && !mailed) {
      throw new Error(
        "Deine Nachricht konnte nicht übermittelt werden. Bitte schreib uns direkt an julian@juklhealth.com.",
      );
    }

    return { ok: true as const, stored, mailed };
  });
