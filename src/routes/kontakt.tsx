import { useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { submitContact } from "@/lib/contact.functions";
import { LocationMap } from "@/components/site/LocationMap";
import { Eyebrow, PillButton } from "@/components/site/Pill";
import { SITE } from "@/lib/site";
import {
  CONTACT_FORM_ID,
  CONTACT_TOPICS,
  isContactTopic,
  type ContactTopic,
} from "@/lib/contact-topics";

const teamBanner = "/img/team-banner-1824.webp";

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
      <PageHero
        eyebrow="KONTAKT"
        title="Schreib uns."
        intro="Julian Kleinheinz, BSc · Bildgasse 10 · A-6850 Dornbirn"
        image={teamBanner}
        imageAlt="Team von JuklHealth"
        ratio="natural"
      />

      {/* The homepage's dark slab, run seamless into the footer: contact is the
          last thing on the page and the footer is already this surface, so the
          two read as one block instead of a card with a stripe of background
          caught above the footer. */}
      <Section alt seamless eyebrow="KONTAKT" title="So erreichst du uns">
        {/* `grid-cols-1` is not redundant with the implicit single column below
            `md`: an implicit track is `auto`, and an auto track takes its
            minimum from the max-content width of what is in it. The map card
            is `aspect-video` over a 380px floor, so its intrinsic width is
            380 × 16/9 ≈ 676px — which blew the column, and the page with it,
            past the viewport on a phone. `grid-cols-1` is `minmax(0, 1fr)`,
            which caps that minimum at 0 and lets the card take the column's
            width instead of setting it. The club pages already spell it out
            for the same reason. */}
        <div className="not-prose grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div>
              <Eyebrow className="mb-1 text-xs text-surface-muted-foreground">E-Mail</Eyebrow>
              {SITE.emails.all.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="font-display w-fit block break-all text-2xl text-surface-foreground transition-colors duration-300 ease-out hover:text-surface-foreground/70 lg:text-3xl"
                >
                  {email}
                </a>
              ))}
            </div>
            <div>
              <Eyebrow className="mb-1 text-xs text-surface-muted-foreground">Adresse</Eyebrow>
              <div className="text-lg leading-snug text-surface-foreground">
                {SITE.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {SITE.address.country}
              </div>
            </div>
            <div>
              <Eyebrow className="mb-1 text-xs text-surface-muted-foreground">Social</Eyebrow>
              <a
                href="https://www.instagram.com/juklhealth_clubs/"
                target="_blank"
                rel="noreferrer"
                className="text-surface-foreground underline transition-colors duration-300 ease-out hover:text-surface-foreground/70"
              >
                @juklhealth_clubs (Instagram)
              </a>
            </div>

            <LocationMap
              name="JuklHealth Clubs"
              lines={[...SITE.address.lines]}
              lat={47.4151713}
              lon={9.7330917}
              destination="Bildgasse 10, 6850 Dornbirn, Österreich"
            />
          </div>

          {/* `scroll-mt-24` clears the floating nav when a CTA lands here by
              hash; the same margin the analysis anchors use. */}
          <form
            id={CONTACT_FORM_ID}
            onSubmit={onSubmit}
            className="scroll-mt-24 space-y-5 rounded-card bg-surface-elevated p-6 lg:p-8"
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
