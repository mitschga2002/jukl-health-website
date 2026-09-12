import { useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";

const teamBanner = "/img/team-banner-1824.webp";

type Search = { trainer?: string };

const CONTACT_EMAIL = "julian@juklhealth.com";

export const Route = createFileRoute("/kontakt")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    trainer: typeof s.trainer === "string" ? s.trainer : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kontakt – JuklHealth Performance Club Dornbirn" },
      {
        name: "description",
        content:
          "Kontaktiere JuklHealth in Dornbirn. Bildgasse 10, 6850 Dornbirn, julian@juklhealth.com.",
      },
      { property: "og:title", content: "Kontakt – JuklHealth" },
      { property: "og:description", content: "Julian Kleinheinz · Dornbirn." },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  const search = useSearch({ from: "/kontakt" }) as Search;
  const [state, setState] = useState<"idle" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const topic = String(fd.get("topic") || "");
    const message = String(fd.get("message") || "");
    const trainer = search.trainer ?? "";

    const subject = trainer
      ? `Termin-Anfrage für ${trainer}`
      : topic
        ? `Anfrage: ${topic}`
        : "Anfrage über juklhealth.com";

    const bodyLines = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      topic ? `Anliegen: ${topic}` : null,
      trainer ? `Trainer: ${trainer}` : null,
      "",
      "Nachricht:",
      message,
    ].filter(Boolean) as string[];

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setState("sent");
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="KONTAKT"
        title="Schreib uns."
        intro={
          search.trainer
            ? `Termin-Anfrage für ${search.trainer}. Wir melden uns zeitnah.`
            : "Julian Kleinheinz, BSc · Bildgasse 10 · A-6850 Dornbirn"
        }
        image={teamBanner}
        imageAlt="Team von JuklHealth"
      />

      <Section eyebrow="KONTAKT" title="So erreichst du uns">
        <div className="grid md:grid-cols-2 gap-10 not-prose">
          <div className="space-y-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">
                E-Mail
              </div>
              <a
                href="mailto:julian@juklhealth.com"
                className="font-display text-2xl lg:text-3xl hover:text-primary break-all"
              >
                julian@juklhealth.com
              </a>
              <br />
              <a
                href="mailto:florian@juklhealth.com"
                className="font-display text-2xl lg:text-3xl hover:text-primary break-all"
              >
                florian@juklhealth.com
              </a>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">
                Adresse
              </div>
              <div className="text-lg leading-snug">
                Bildgasse 10
                <br />
                A-6850 Dornbirn
                <br />
                Österreich
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">
                Social
              </div>
              <a
                href="https://www.instagram.com/juklhealth_clubs/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary underline"
              >
                @juklhealth_clubs (Instagram)
              </a>
            </div>

            <div className="aspect-video w-full border border-foreground/10 overflow-hidden">
              <iframe
                title="JuklHealth Location Bildgasse 10, Dornbirn"
                src="https://www.google.com/maps?q=Bildgasse+10,+6850+Dornbirn,+Austria&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-5 border border-foreground/10 p-6 lg:p-8 bg-background"
          >
            {search.trainer ? (
              <div className="text-sm bg-muted px-3 py-2">
                Termin-Anfrage für <strong>{search.trainer}</strong>
              </div>
            ) : null}
            <Field id="name" label="Name" required>
              <input
                id="name"
                name="name"
                required
                maxLength={200}
                className="w-full border border-foreground/20 bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </Field>
            <Field id="email" label="E-Mail" required>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={320}
                className="w-full border border-foreground/20 bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </Field>
            <Field id="topic" label="Anliegen">
              <select
                id="topic"
                name="topic"
                defaultValue=""
                className="w-full border border-foreground/20 bg-background px-4 py-3 focus:outline-none focus:border-primary"
              >
                <option value="">Bitte auswählen …</option>
                <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                <option value="Personal Training">Personal Training</option>
                <option value="Athletiktraining">Athletiktraining</option>
                <option value="Gruppentraining">Gruppentraining</option>
                <option value="Physiotherapie">Physiotherapie</option>
                <option value="Trainingstherapie">Trainingstherapie</option>
                <option value="Analysen">Analysen</option>
                <option value="Performance Club">Performance Club</option>
              </select>
            </Field>
            <Field id="phone" label="Telefon (optional)">
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={60}
                className="w-full border border-foreground/20 bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </Field>
            <Field id="message" label="Nachricht" required>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                className="w-full border border-foreground/20 bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </Field>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 font-display uppercase hover:bg-primary-hover"
            >
              Nachricht senden
            </button>

            {state === "sent" ? (
              <p className="text-sm text-primary font-semibold">
                Dein E-Mail-Programm wurde geöffnet. Falls nicht, schreib uns direkt an{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            ) : null}

            <p className="text-[11px] text-muted-foreground">
              Mit dem Absenden akzeptierst du unsere{" "}
              <a href="/datenschutz" className="underline hover:text-primary">
                Datenschutzerklärung
              </a>
              .
            </p>
          </form>
        </div>
      </Section>
    </PageShell>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-1"
      >
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
    </div>
  );
}
