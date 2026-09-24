import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, TopicCards } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  CareerTimeline,
  ExpertGrid,
  OfferCards,
  ProcessSplit,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";

const heroImg = "/img/angebot-1508.webp";
const processImg = "/img/ath-screening-1200.webp";

export const Route = createFileRoute("/athletiktraining")({
  head: () => ({
    meta: [
      { title: "Athletiktraining – JuklHealth" },
      {
        name: "description",
        content:
          "Periodisiertes Athletiktraining für Vereine, Mannschaften und Einzelathleten – mit Erfahrung aus dem Profifußball. Schnelligkeit, Kraft, Stabilität und Verletzungsprävention nach dem JuklHealth System.",
      },
      { property: "og:title", content: "Athletiktraining – JuklHealth" },
      {
        property: "og:description",
        content: "Athletiktraining wie bei den Profis – individuell periodisiert.",
      },
      { property: "og:url", content: "https://juklhealth.com/athletiktraining" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/athletiktraining" }],
  }),
  component: Athletik,
});

const clubs = [
  { name: "Hella DSV", period: "2019", detail: "Athletiktraining · Vorarlbergliga" },
  { name: "FC Dornbirn", period: "2019–2021", detail: "Athletiktraining · 2. Liga" },
  { name: "SCR Altach", period: "2021–2023", detail: "Athletiktraining · 1. Bundesliga" },
  {
    name: "FC St. Gallen",
    period: "2023–2026",
    detail: "Leitung Athletik Nachwuchs · Mitarbeit Super League",
  },
];

const audiences: OfferCard[] = [
  {
    title: "Vereine & Mannschaften",
    body: "Athletik für das ganze Team – abgestimmt auf Sportart, Saisonphase und Trainingsbetrieb.",
    image: "/img/athletiktraining-1459.webp",
    imageAlt: "Mannschaftsathletik auf dem Trainingsplatz",
    link: contactFormLink("Athletiktraining"),
  },
  {
    title: "Einzelathleten",
    body: "Individuell periodisiertes Training für ambitionierte Sportler, die das nächste Level wollen.",
    image: "/img/ath-einzel-1200.webp",
    imageAlt: "Athlet bei Sprüngen über Hürden",
    imagePosition: "object-[center_40%]",
    link: contactFormLink("Athletiktraining"),
  },
  {
    title: "Return to Play",
    body: "Nach einer Verletzung sicher zurück in den Wettkampf – mit Tests, die zeigen, dass du bereit bist.",
    image: "/img/ath-testing-1600.webp",
    imageAlt: "Athlet bei einem Balance-Test auf der Trainingsfläche",
    link: { to: "/trainingstherapie" },
  },
];

const steps = [
  {
    title: "Screening",
    body: "FMS, Sprungdiagnostik und Links/Rechts-Symmetrie zeigen Stärken, Defizite und Verletzungsrisiken.",
  },
  {
    title: "Periodisierte Planung",
    body: "Inhalte und Belastung, abgestimmt auf deine Sportart und die aktuelle Saisonphase.",
  },
  {
    title: "Training & Coaching",
    body: "Hinweise zu Ausführung, Atmung und Konzentration – im Team oder individuell.",
  },
  {
    title: "Kontrolle & Anpassung",
    body: "Regelmäßige Re-Tests und ein systematischer Aufbau sorgen für kontinuierliche Leistungssteigerung.",
  },
];

function Athletik() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="ATHLETIKTRAINING"
        title="Athletik wie bei den Profis."
        intro="Schneller, stärker, stabiler: Unser Athletiktraining verbessert deine Leistungsfähigkeit und senkt das Verletzungsrisiko – ideal in der Saisonvorbereitung, der Übergangsphase oder im laufenden Spielbetrieb."
        image={heroImg}
        imageAlt="Mannschaft bei einer Mobility-Einheit auf dem Sportplatz"
      />

      <CareerTimeline eyebrow="ERFAHRUNG" title="Hier haben wir gearbeitet" items={clubs} />

      <OfferCards
        eyebrow="FÜR WEN"
        title="Vom Verein bis zum Einzelathleten"
        action={
          <PillLink {...contactFormLink("Athletiktraining")} variant="outlineOnLight">
            Athletik anfragen
          </PillLink>
        }
        items={audiences}
      />

      <Section alt eyebrow="INHALTE" title="Schnelligkeit · Kraft · Stabilität">
        <TopicCards
          alt
          items={[
            {
              eyebrow: "Schnelligkeit",
              title: "Antritt, Sprint & Richtungswechsel",
              points: ["Beschleunigung und Maximaltempo", "Reaktivkraft", "Agilität"],
            },
            {
              eyebrow: "Kraft",
              title: "Maximal- und Schnellkraft",
              points: ["Grundlagen sauber aufbauen", "Explosivität", "Belastbarkeit"],
            },
            {
              eyebrow: "Stabilität",
              title: "Rumpf, Gelenke & Beweglichkeit",
              points: ["Stabile Gelenke", "Rumpfkontrolle", "Beweglichkeit"],
            },
          ]}
        />
      </Section>

      <ProcessSplit
        title="Vom Screening zur Leistungssteigerung"
        image={processImg}
        imageAlt="Athlet beim Y-Balance-Test im Performance Club"
        imagePosition="object-[center_40%]"
        steps={steps}
      />

      <ExpertGrid
        eyebrow="DAS TEAM"
        title="Unsere Athletiktrainer"
        slugs={["julian-kleinheinz", "florian-winder", "caroline-fritsch"]}
        topic="Athletiktraining"
      />

      <StoriesSection
        title="Stimmen aus dem Profisport"
        names={["Sebastian Santin", "Noah Bischof", "Dario Clasadonte"]}
      />

      <ClosingCta
        title="Bereit für die nächste Saison?"
        body="Schreib uns, für wen das Training ist und wann eure Saison startet – wir melden uns mit einem Vorschlag."
        topic="Athletiktraining"
        label="Athletik anfragen"
      />
    </PageShell>
  );
}
