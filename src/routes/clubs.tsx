import { Dumbbell, MapPin, Network, Users } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { ClosingCta, Pillars } from "@/components/site/ServicePage";
import { ClubCards, type ClubCard } from "@/components/site/ClubPage";

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

const clubs: ClubCard[] = [
  {
    name: "Performance Club",
    area: "140 m²",
    address: "Bildgasse 10, 3. Stock · A-6850 Dornbirn",
    image: "/img/pc-hero-1386.webp",
    imageAlt: "Trainingsfläche im Performance Club Dornbirn",
    points: [
      "Personal Training & Athletik",
      "Kleingruppenkurse: HYROX · Mobility · Strength · Burn",
      "Physio & Trainingstherapie",
    ],
    link: { to: "/performance-club" },
  },
  {
    name: "Strength Club",
    area: "160 m²",
    address: "Bildgasse 10, Erdgeschoss · A-6850 Dornbirn",
    image: "/img/strength-club-1824.webp",
    imageAlt: "Trainingsfläche im Strength Club Dornbirn",
    points: ["24/7 Zugang", "Max. 100 Mitglieder", "1 Jahr Betreuungssystem"],
    link: { to: "/strength-club" },
  },
  {
    name: "Training Club Widnau",
    area: "50 m²",
    address: "Schützenstrasse 13 · CH-9443 Widnau",
    image: "/img/widnau-club-1080.webp",
    imageAlt: "Trainingsfläche im Training Club Widnau",
    points: ["1:1 Personal Training", "Athletik & Trainingstherapie", "Privates Ambiente"],
    link: { to: "/training-club-widnau" },
  },
];

function Clubs() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="STANDORTE"
        title="Drei Clubs. Ein System."
        intro="Performance, Strength und Training Club – in Dornbirn und Widnau. Jeder Club mit eigenem Charakter, alle nach dem JuklHealth System."
      />

      <Pillars
        items={[
          {
            icon: Network,
            title: "Ein System",
            body: "Gleiche Methoden, gleiche Standards – egal, in welchem Club du trainierst.",
          },
          {
            icon: MapPin,
            title: "Zwei Länder",
            body: "Dornbirn in Vorarlberg und Widnau im St. Galler Rheintal.",
          },
          {
            icon: Dumbbell,
            title: "Drei Charaktere",
            body: "Funktionell und betreut, 24/7 und exklusiv, oder ganz privat im 1:1.",
          },
          {
            icon: Users,
            title: "Ein Team",
            body: "Unsere Coaches und Therapeuten kennen dich – an jedem Standort.",
          },
        ]}
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
