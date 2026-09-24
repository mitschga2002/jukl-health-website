import { CalendarRange, ChartLine, RefreshCw, Target } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  ExpertGrid,
  OfferCards,
  Pillars,
  ProcessSplit,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";

const heroImg = "/img/tp-planung-1600.webp";
const processImg = "/img/tp-coach-1600.webp";

export const Route = createFileRoute("/trainingsplanung")({
  head: () => ({
    meta: [
      { title: "Individuelle Trainingsplanung & Periodisierung – JuklHealth" },
      {
        name: "description",
        content:
          "Evidenzbasierte, individuell periodisierte Trainingspläne nach dem JuklHealth System – abgestimmt auf deinen Status quo, deine Ziele und deinen Alltag.",
      },
      { property: "og:title", content: "Individuelle Trainingsplanung – JuklHealth" },
      {
        property: "og:description",
        content: "Periodisierte Trainingspläne, die exakt zu deinem Status quo passen.",
      },
      { property: "og:url", content: "https://juklhealth.com/trainingsplanung" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/trainingsplanung" }],
  }),
  component: Trainingsplanung,
});

const pillars = [
  {
    icon: Target,
    title: "Exakt auf dich abgestimmt",
    body: "Kein Plan von der Stange – Übungen, Umfang und Intensität passen zu deinem Status quo.",
  },
  {
    icon: CalendarRange,
    title: "Periodisiert",
    body: "Aufbau, Belastung und Erholung sind über Wochen und Monate sinnvoll geplant.",
  },
  {
    icon: ChartLine,
    title: "Datenbasiert",
    body: "Screenings und Analysen bilden den Ausgangspunkt – Fortschritt wird messbar.",
  },
  {
    icon: RefreshCw,
    title: "Laufend angepasst",
    body: "Re-Checks zeigen, wo du stehst, und der Plan entwickelt sich mit dir weiter.",
  },
];

const audiences: OfferCard[] = [
  {
    title: "Selbstständig trainieren",
    body: "Du trainierst eigenständig – mit einem Plan, der dir genau sagt, was, wie viel und warum.",
    image: "/img/tp-app-1600.webp",
    imageAlt: "Coach und Athlet besprechen den Trainingsplan am Smartphone",
    link: contactFormLink("Trainingsplanung"),
  },
  {
    title: "Saison & Wettkampf",
    body: "Gezielt in Form kommen: Vorbereitung, Wettkampfphasen und Regeneration im richtigen Rhythmus.",
    image: "/img/tp-saison-1600.webp",
    imageAlt: "Athlet bei einem Sprint auf der Trainingsfläche",
    link: contactFormLink("Trainingsplanung"),
  },
  {
    title: "Wiedereinstieg",
    body: "Nach Verletzung oder Trainingspause mit der richtigen Dosierung zurück zu alter Stärke.",
    image: "/img/tp-wiedereinstieg-1600.webp",
    imageAlt: "Stabilitätsübung mit Gymnastikball",
    link: { to: "/trainingstherapie" },
  },
];

const steps = [
  {
    title: "Anamnese & Zielklärung",
    body: "Deine Ziele, deine Trainingshistorie und dein Alltag – daraus ergibt sich, was der Plan leisten muss.",
  },
  {
    title: "Screening & Analysen",
    body: "Objektive Werte statt Bauchgefühl: Bewegungs- und Leistungsdaten als Ausgangspunkt.",
  },
  {
    title: "Periodisierter Plan",
    body: "Aufbau über Makro-, Meso- und Mikrozyklen – mit klarer Dosierung für jede Einheit.",
  },
  {
    title: "Monitoring & Re-Checks",
    body: "Wir verfolgen Belastung und Fortschritt und passen den Plan an, wenn sich etwas ändert.",
  },
];

function Trainingsplanung() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="TRAININGSPLANUNG"
        title="Ein Plan, der zu dir passt."
        intro="Evidenzbasierte, strukturierte Programmierung, die exakt zu deinem Status quo passt – ob du selbstständig trainierst oder begleitend zu Coaching und Therapie."
        image={heroImg}
        imageAlt="Coach und Athlet planen das Training am Tablet"
        objectPosition="40% 50%"
      />

      <Pillars items={pillars} />

      <OfferCards
        eyebrow="FÜR WEN"
        title="Selbstständig trainieren, mit System"
        action={
          <PillLink {...contactFormLink("Trainingsplanung")} variant="outlineOnLight">
            Planung anfragen
          </PillLink>
        }
        items={audiences}
      />

      <ProcessSplit
        title="Vom Status quo zum Plan"
        image={processImg}
        imageAlt="Coach mit Trainingsplan auf der Trainingsfläche"
        imagePosition="object-[55%_center]"
        steps={steps}
      />

      <ExpertGrid
        eyebrow="DAS TEAM"
        title="Wer deinen Plan schreibt"
        slugs={["julian-kleinheinz", "florian-winder", "caroline-fritsch"]}
        topic="Trainingsplanung"
      />

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Sebastian Santin", "Angelina Natter", "Dario Clasadonte"]}
      />

      <ClosingCta
        title="Bereit für deinen Plan?"
        body="Schreib uns, was du vorhast und wo du gerade stehst – wir melden uns mit den nächsten Schritten."
        topic="Trainingsplanung"
        label="Planung anfragen"
      />
    </PageShell>
  );
}
