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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        trainer: data.trainer || null,
        topic: data.topic || null,
      } as never);
    if (error) {
      console.error("[contact_submissions] insert failed", error);
      throw new Error("Nachricht konnte nicht gespeichert werden.");
    }

    // Recipients: always Julian, plus Florian if topic is Physiotherapie
    const recipients = ["julian@juklhealth.com"];
    if (data.topic === "Physiotherapie") {
      recipients.push("Florian@juklhealth.com");
    }

    // Send app email via Lovable Emails (once domain is configured & templates scaffolded).
    try {
      const { sendTransactionalEmail } = await import("@/lib/email/send.server");
      await sendTransactionalEmail({
        templateName: "contact-notification",
        recipients,
        templateData: {
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          message: data.message,
          trainer: data.trainer || "",
          topic: data.topic || "Allgemeine Anfrage",
        },
      });
    } catch (mailErr) {
      // Do not fail the submission if email sending is not yet configured.
      console.error("[contact email] send failed", mailErr);
    }

    return { ok: true as const };
  });
