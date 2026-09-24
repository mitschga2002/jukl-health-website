import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, BulletList, StepList } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";

const physio = "/img/physiotherapie-1460.webp";

export const Route = createFileRoute("/physiotherapie")({
  head: () => ({
    meta: [
      { title: "Physiotherapie – JuklHealth" },
      {
        name: "description",
        content:
          "Klinische Physiotherapie nach dem JuklHealth System. Ursache finden, gezielt behandeln, aktiv zurück in schmerzfreie Bewegung.",
      },
      { property: "og:title", content: "Physiotherapie – JuklHealth" },
      {
        property: "og:description",
        content: "Klinische Physiotherapie nach dem JuklHealth System.",
      },
      { property: "og:url", content: "https://juklhealth.com/physiotherapie" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/physiotherapie" }],
  }),
  component: Physio,
});

function Physio() {
  return (
    <PageShell>
      <PageHero
        eyebrow="PHYSIO"
        title="Physio­therapie"
        intro="Schneller zurück in schmerzfreie Bewegung: individuelle Physiotherapie mit aktivem Training. Ursache finden, gezielt behandeln, sicher zurück."
        image={physio}
      />

      {/* The homepage's dark slab. The Ablauf is the page's argument — this is
          how a course of treatment runs — so it carries the weight rather than
          opening as a bulleted list on the same light ground as everything else.
          The CTA moves up beside the heading, where the homepage keeps its pill. */}
      <Section
        alt
        eyebrow="ABLAUF"
        title="Wie wir vorgehen"
        action={
          <PillLink {...contactFormLink("Physiotherapie")} variant="outlineOnDark">
            Termin vereinbaren
          </PillLink>
        }
      >
        <StepList
          steps={[
            "Anamnese & Sichtung Befunde",
            "Physiotherapeutische Diagnostik",
            "Manuelle Techniken & aktive Mobilisation",
            "Individuelle Rehaplanung",
            "Return to Sport / Play – Testungen",
          ]}
        />
      </Section>

      <Section eyebrow="WOFÜR" title="Indikationen">
        <BulletList
          items={[
            "Akute & chronische Schmerzen (Rücken, Schulter, Knie, Hüfte)",
            "Verletzungen & Return-to-Sport",
            "Haltungsprobleme & Dysbalancen",
            "Prävention & Leistungsoptimierung",
          ]}
        />
      </Section>
    </PageShell>
  );
}
