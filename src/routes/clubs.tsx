import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { ConnectedCards } from "@/components/site/ConnectedCards";

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

const clubs = [
  {
    name: "Performance Club Dornbirn",
    area: "140 m²",
    address: "Bildgasse 10, 3. Stock · A-6850 Dornbirn",
    points: [
      "Personal Training & Athletik",
      "Kurse in Kleingruppen",
      "Mobility · Movement · Strength · Burn",
      "Nur mit Terminvereinbarung",
    ],
    to: "/performance-club",
  },
  {
    name: "Strength Club Dornbirn",
    area: "160 m²",
    address: "Bildgasse 10, Erdgeschoss · A-6850 Dornbirn",
    points: [
      "24 h / 7 Tage Zugang",
      "Max. 100 Mitglieder",
      "1 Jahr Betreuungssystem",
      "Exklusives Trainingsambiente",
    ],
    to: "/strength-club",
  },
  {
    name: "Training Club Widnau (CH)",
    area: "50 m²",
    address: "Schützenstrasse 13 · CH-9443 Widnau",
    points: [
      "1:1 Personal Training",
      "Trainingstherapie",
      "Privates Ambiente",
      "15 Jahre Erfahrung",
    ],
    to: "/training-club-widnau",
  },
];

function Clubs() {
  return (
    <PageShell>
      <PageHero
        eyebrow="STANDORTE"
        title="Drei Clubs. Ein System."
        intro="Performance, Strength und Training Club — entwickelt, um dich auf das nächste Level zu bringen."
      />

      <Section
        eyebrow="ÜBERSICHT"
        title="Wähle deinen Club"
        action={<PillLink to="/kontakt">Termin vereinbaren</PillLink>}
      >
        <ConnectedCards
          items={clubs.map((c) => ({
            to: c.to,
            title: c.name,
            meta: c.area,
            detail: c.address,
            points: c.points,
          }))}
        />
      </Section>
    </PageShell>
  );
}
