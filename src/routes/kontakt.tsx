import { useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { submitContact } from "@/lib/contact.functions";
import { Eyebrow, PillButton } from "@/components/site/Pill";
import { SITE } from "@/lib/site";
import {
  CONTACT_FORM_ID,
  CONTACT_TOPICS,
  isContactTopic,
  type ContactTopic,
} from "@/lib/contact-topics";

/* The three clubs, for the "Standorte" block beside the form. Each links to
   its own page, which carries the map and the practical notes. */
const locations = [
  {
    name: "Performance Club",
    lines: ["Bildgasse 10, 3. Stock", "A-6850 Dornbirn"],
    to: "/performance-club",
  },
  {
    name: "Strength Club",
    lines: ["Bildgasse 10, Erdgeschoss", "A-6850 Dornbirn"],
    to: "/strength-club",
  },
  {
    name: "Training Club Widnau",
    lines: ["Schützenstrasse 13", "CH-9443 Widnau"],
    to: "/training-club-widnau",
  },
] as const;

/* `topic` is what a service page's CTA hands over so the form opens on the
   right "Anliegen"; anything not on the list is dropped rather than shown.
   `trainer` comes from the team page and rides along silently: it is sent
   with the enquiry but never shown on the page. */
type Search = { trainer?: string; topic?: ContactTopic };

const CONTACT_EMAIL = SITE.emails.primary;

/* The form now sits on the dark slab, where `border-border` — a light-theme
   token — all but disappears. One declaration for all five controls, so they
   cannot drift apart again. */
const FIELD =
  "w-full rounded-image border border-surface-foreground/25 bg-transparent px-4 py-3 text-surface-foreground transition-colors duration-300 ease-out focus:border-primary focus:outline-none";

export const Route = createFileRoute("/kontakt")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    trainer: typeof s.trainer === "string" ? s.trainer : undefined,
    topic: isContactTopic(s.topic) ? s.topic : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kontakt – JuklHealth Clubs" },
      {
        name: "description",
        content:
          "Kontaktiere JuklHealth – Clubs in Dornbirn und Widnau. Bildgasse 10, 6850 Dornbirn, julian@juklhealth.com.",
      },
      { property: "og:title", content: "Kontakt – JuklHealth" },
      { property: "og:description", content: "Julian Kleinheinz · Dornbirn & Widnau." },
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
          consent: fd.get("consent") === "on",
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
    <PageShell seamlessFooter>
      {/* Text only: the form is what this page is for, so it follows the
          headline directly instead of sitting below a full-width photo. */}
      <PageHero
        eyebrow="KONTAKT"
        title="Schreib uns."
        intro="Ob Training, Therapie, Analyse oder eine Frage zu unseren Clubs in Dornbirn und Widnau – schreib uns kurz, worum es geht. Wir melden uns persönlich bei dir."
      />

      {/* The homepage's dark slab, run seamless into the footer: contact is the
          last thing on the page and the footer is already this surface, so the
          two read as one block instead of a card with a stripe of background
          caught above the footer. */}
      <Section alt seamless eyebrow="ANFRAGE" title="Wie können wir dir helfen?">
        {/* The form is first in the markup, so it leads on a phone; from md up
            the order classes put it in the right column, with the ways to
            reach us on the left. `grid-cols-1` (minmax(0, 1fr)) rather than the implicit auto
            track, so a long e-mail address cannot widen the column past the
            viewport on a phone. */}
        <div className="not-prose grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          {/* `scroll-mt-24` clears the floating nav when a CTA lands here by
              hash; the same margin the analysis anchors use. */}
          <form
            id={CONTACT_FORM_ID}
            onSubmit={onSubmit}
            className="scroll-mt-24 space-y-5 rounded-card bg-surface-elevated p-6 md:order-2 lg:p-8"
          >
            <Field id="topic" label="Anliegen" required>
              {/* A native `<select>` draws its chevron against the right edge
                  of the border box, where the field's `px-4` never reaches it:
                  the arrow sat flush against the border while the text inside
                  kept its gutter. `appearance-none` drops the UA control, and
                  the chevron below is ours — positioned like any other element,
                  sized like the one in the nav, and `pointer-events-none` so
                  clicking it still opens the menu. `pr-11` keeps a long option
                  from running under it. */}
              <div className="relative">
                {/* Uncontrolled on purpose — the visitor may still change it —
                    but keyed on the preselection, so a client-side hop from one
                    CTA to another remounts it with the new default instead of
                    keeping the first. */}
                <select
                  key={search.topic ?? ""}
                  id="topic"
                  name="topic"
                  required
                  defaultValue={search.topic ?? ""}
                  className={`${FIELD} appearance-none bg-surface-elevated pr-11`}
                >
                  <option value="" disabled>
                    Bitte auswählen …
                  </option>
                  {CONTACT_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-surface-foreground/70"
                />
              </div>
            </Field>
            <Field id="name" label="Name" required>
              <input id="name" name="name" required maxLength={200} className={FIELD} />
            </Field>
            <Field id="email" label="E-Mail" required>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={320}
                className={FIELD}
              />
            </Field>
            <Field id="phone" label="Telefon (optional)">
              <input id="phone" name="phone" type="tel" maxLength={60} className={FIELD} />
            </Field>
            <Field id="message" label="Nachricht" required>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                className={FIELD}
              />
            </Field>

            {/* The consent itself. A privacy policy is information, not terms
                — the old line said "akzeptierst du unsere Datenschutzerklärung",
                which asked the visitor to agree to a document that is not an
                agreement. What needs agreeing to is the processing, and that
                is what this says. The link is separate so reading the policy
                does not require ticking anything. */}
            <label
              htmlFor="consent"
              className="flex cursor-pointer items-start gap-3 text-xs leading-[1.5] text-surface-foreground/80"
            >
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
              />
              <span>
                Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet
                werden. Die Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen.{" "}
                <span aria-hidden>*</span>
              </span>
            </label>

            <p className="text-[11px] text-surface-foreground/60">
              Wie wir mit deinen Daten umgehen, steht in unserer{" "}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noreferrer"
                className="underline transition-colors duration-300 ease-out hover:text-surface-foreground/80"
              >
                Datenschutzerklärung
              </a>
              .
            </p>

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
              <p role="alert" className="text-sm font-semibold text-red-400">
                {error} Du erreichst uns auch direkt unter{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            ) : null}
          </form>

          <div className="flex flex-col gap-10 md:order-1">
            <div className="flex flex-col gap-2">
              <Eyebrow className="text-xs text-surface-muted-foreground">E-Mail</Eyebrow>
              {SITE.emails.all.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="font-display w-fit break-all text-2xl text-surface-foreground transition-colors duration-300 ease-out hover:text-primary lg:text-3xl"
                >
                  {email}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Eyebrow className="text-xs text-surface-muted-foreground">Standorte</Eyebrow>
              <ul className="flex flex-col gap-3">
                {locations.map((l) => (
                  <li key={l.name}>
                    <Link
                      to={l.to}
                      className="group flex items-start justify-between gap-4 rounded-card bg-surface-elevated p-5 transition-colors duration-300 ease-out hover:bg-surface-foreground/10"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-[20px] leading-[1.25] text-surface-foreground">
                          {l.name}
                        </span>
                        {l.lines.map((line) => (
                          <span
                            key={line}
                            className="text-sm font-light text-surface-foreground/70"
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight
                        className="mt-1 size-5 shrink-0 text-surface-foreground/40 transition-colors duration-300 group-hover:text-primary"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Eyebrow className="text-xs text-surface-muted-foreground">Social</Eyebrow>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-surface-foreground underline transition-colors duration-300 ease-out hover:text-primary"
              >
                {SITE.instagram.handle} (Instagram)
              </a>
            </div>
          </div>
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
        className="mb-1 block text-xs font-light uppercase leading-tight tracking-wider text-surface-foreground/70"
      >
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
    </div>
  );
}
