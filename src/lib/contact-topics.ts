/* The "Anliegen" a visitor can pick on the contact form. One list, shared by
   the form (options), the router (`?topic=` validation) and the server
   (schema), so a CTA cannot preselect a value the server would then reject.
   The strings are the values the mail carries, so they are user-facing. */
export const CONTACT_TOPICS = [
  "Allgemeine Anfrage",
  "Personal Training",
  "Athletiktraining",
  "Gruppentraining",
  "Physiotherapie",
  "Trainingstherapie",
  "Analysen",
  "Performance Club",
  "Strength Club",
  "Training Club Widnau",
  "Vorträge & Workshops",
  "Bewerbung",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (CONTACT_TOPICS as readonly string[]).includes(value);
}

/** The form's element id — the hash a topic-carrying CTA lands on. */
export const CONTACT_FORM_ID = "anfrage";

/* Link props for a CTA that already knows what the visitor wants: preselects
   the topic and jumps straight to the form, past the address block above it.
   Spread into `PillLink`, `CTAButton` or `ListingRow`. */
export function contactFormLink(topic: ContactTopic) {
  return { to: "/kontakt", search: { topic }, hash: CONTACT_FORM_ID } as const;
}
