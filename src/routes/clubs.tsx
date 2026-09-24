import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { ClosingCta } from "@/components/site/ServicePage";
import { ClubCards } from "@/components/site/ClubPage";
import { clubs } from "@/lib/clubs";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Clubs — Performance, Strength & Training Club | JuklHealth" },
      {
        name: "description",
        content:
          "Performance Club Dornbirn, Strength Club Dornbirn und Training Club Widnau — drei Standorte, ein System.",
      },
      { property: "og:title", content: "Clubs — JuklHealth" },
      { property: "og:description", content: "Unsere Performance Clubs in Dornbirn & Widnau." },
      { property: "og:url", content: "https://juklhealth.com/clubs" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/clubs" }],
  }),
  component: Clubs,
});

function Clubs() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="STANDORTE"
        title="Drei Clubs. Ein System."
        intro="Performance, Strength und Training Club – in Dornbirn und Widnau. Jeder Club mit eigenem Charakter, alle nach dem JuklHealth System."
      />

      <Section
        eyebrow="ÜBERSICHT"
        title="Finde deinen Club"
        action={<PillLink to="/kontakt">Termin vereinbaren</PillLink>}
      >
        <ClubCards items={clubs} />
      </Section>

      <ClosingCta
        title="Nicht sicher, welcher Club passt?"
        body="Schreib uns, was du vorhast – wir empfehlen dir den passenden Standort und melden uns mit einem Termin."
        topic="Allgemeine Anfrage"
      />
    </PageShell>
  );
}
