import { useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { submitContact } from "@/lib/contact.functions";
import { MapEmbed } from "@/components/site/MapEmbed";
import { Eyebrow, PillButton } from "@/components/site/Pill";

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
      { property: "og:url", content: "https://juklhealth.com/kontakt" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/kontakt" }],
  }),
  component: Kontakt,
});

function Kontakt() {
  const search = useSearch({ from: "/kontakt" }) as Search;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setState("sending");
    setError("");
    try {
      await submitContact({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          topic: String(fd.get("topic") || ""),
          message: String(fd.get("message") || ""),
          trainer: search.trainer ?? "",
        },
      });
      form.reset();
      setState("sent");
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Deine Nachricht konnte nicht übermittelt werden.",
      );
      setState("error");
    }
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
        ratio="natural"
      />

      <Section eyebrow="KONTAKT" title="So erreichst du uns">
        <div className="grid md:grid-cols-2 gap-10 not-prose">
          <div className="space-y-6">
            <div>
              <Eyebrow className="mb-1 text-xs text-primary">E-Mail</Eyebrow>
              <a
                href="mailto:julian@juklhealth.com"
                className="font-display text-2xl lg:text-3xl hover:text-primary break-all transition-colors duration-300 ease-out"
              >
                julian@juklhealth.com
              </a>
              <br />
              <a
                href="mailto:florian@juklhealth.com"
                className="font-display text-2xl lg:text-3xl hover:text-primary break-all transition-colors duration-300 ease-out"
              >
                florian@juklhealth.com
              </a>
            </div>
            <div>
              <Eyebrow className="mb-1 text-xs text-primary">Adresse</Eyebrow>
              <div className="text-lg leading-snug">
                Bildgasse 10
                <br />
                A-6850 Dornbirn
                <br />
                Österreich
              </div>
            </div>
            <div>
              <Eyebrow className="mb-1 text-xs text-primary">Social</Eyebrow>
              <a
                href="https://www.instagram.com/juklhealth_clubs/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary underline transition-colors duration-300 ease-out"
              >
                @juklhealth_clubs (Instagram)
              </a>
            </div>

            <MapEmbed />
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-card border border-border bg-card p-6 lg:p-8"
          >
            {search.trainer ? (
              <div className="rounded-image bg-muted px-3 py-2 text-sm">
                Termin-Anfrage für <strong>{search.trainer}</strong>
              </div>
            ) : null}
            <Field id="topic" label="Anliegen" required>
              <select
                id="topic"
                name="topic"
                required
                defaultValue=""
                className="w-full rounded-image border border-border bg-background px-4 py-3 transition-colors duration-300 ease-out focus:border-primary focus:outline-none"
              >
                <option value="" disabled>
                  Bitte auswählen …
                </option>
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
            <Field id="name" label="Name" required>
              <input
                id="name"
                name="name"
                required
                maxLength={200}
                className="w-full rounded-image border border-border bg-transparent px-4 py-3 transition-colors duration-300 ease-out focus:border-primary focus:outline-none"
              />
            </Field>
            <Field id="email" label="E-Mail" required>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={320}
                className="w-full rounded-image border border-border bg-transparent px-4 py-3 transition-colors duration-300 ease-out focus:border-primary focus:outline-none"
              />
            </Field>
            <Field id="phone" label="Telefon (optional)">
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={60}
                className="w-full rounded-image border border-border bg-transparent px-4 py-3 transition-colors duration-300 ease-out focus:border-primary focus:outline-none"
              />
            </Field>
            <Field id="message" label="Nachricht" required>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                className="w-full rounded-image border border-border bg-transparent px-4 py-3 transition-colors duration-300 ease-out focus:border-primary focus:outline-none"
              />
            </Field>

            {/* No arrow: the arrow reads as "this takes you somewhere", and a
                submit stays on the page. `px-6` replaces the solid finish's
                lopsided padding, which is cut for the arrow circle. */}
            <PillButton type="submit" disabled={state === "sending"} className="w-full px-6">
              {state === "sending" ? "Wird gesendet …" : "Nachricht senden"}
            </PillButton>

            {state === "sent" ? (
              <p role="status" className="text-sm text-primary font-semibold">
                Danke! Deine Nachricht ist bei uns eingegangen — wir melden uns zeitnah.
              </p>
            ) : null}

            {state === "error" ? (
              <p role="alert" className="text-sm text-destructive font-semibold">
                {error} Du erreichst uns auch direkt unter{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            ) : null}

            <p className="text-[11px] text-muted-foreground">
              Mit dem Absenden akzeptierst du unsere{" "}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-primary transition-colors duration-300 ease-out"
              >
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
        className="mb-1 block text-xs font-light uppercase leading-tight tracking-wider text-primary"
      >
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
    </div>
  );
}
