import { Gauge, Handshake, HeartPulse, TrendingUp } from "lucide-react";
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

const heroImg = "/img/tt-belastung-1200.webp";
const processImg = "/img/tt-uebung-1600.webp";

export const Route = createFileRoute("/trainingstherapie")({
  head: () => ({
    meta: [
      { title: "Trainingstherapie – JuklHealth" },
      {
        name: "description",
        content:
          "Aktives Aufbautraining nach Verletzung, Operation oder bei chronischen Beschwerden – schmerzadaptiert, progressiv und eng abgestimmt mit unserer Physiotherapie.",
      },
      { property: "og:title", content: "Trainingstherapie – JuklHealth" },
      {
        property: "og:description",
        content: "Aktives Aufbautraining nach Beschwerden oder Verletzungen.",
      },
      { property: "og:url", content: "https://juklhealth.com/trainingstherapie" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/trainingstherapie" }],
  }),
  component: Trainingstherapie,
});

const pillars = [
  {
    icon: HeartPulse,
    title: "Schmerzadaptiert",
    body: "Der Einstieg richtet sich nach deinen Beschwerden – nie gegen, immer mit deinem Körper.",
  },
  {
    icon: TrendingUp,
    title: "Progressiv",
    body: "Belastung steigt nach dem Prinzip „Load to Tolerance“ – so viel, wie dein Gewebe gerade verträgt.",
  },
  {
    icon: Gauge,
    title: "Messbar",
    body: "RPE, Tempo und Schmerzskala machen deinen Fortschritt sichtbar und steuern das Training.",
  },
  {
    icon: Handshake,
    title: "Hand in Hand mit der Physio",
    body: "Enge Abstimmung mit Physiotherapie und Sportmedizin – ein Team, ein Plan.",
  },
];

const cases: OfferCard[] = [
  {
    title: "Nach Verletzung & OP",
    body: "Strukturierter Wiederaufbau von Kraft und Beweglichkeit, abgestimmt auf die Heilungsphase.",
    image: "/img/tt-op-1600.webp",
    imageAlt: "Coach begleitet einen Klienten bei einer Übung auf der Behandlungsbank",
    imagePosition: "object-[center_40%]",
    link: contactFormLink("Trainingstherapie"),
  },
  {
    title: "Chronische Beschwerden",
    body: "Rücken, Schulter oder Knie: Mit gezieltem Training wieder belastbar und schmerzfrei im Alltag.",
    image: "/img/tt-chronisch-1600.webp",
    imageAlt: "Coach sichert eine Klientin bei einer Übung mit der Langhantel",
    imagePosition: "object-[center_35%]",
    link: contactFormLink("Trainingstherapie"),
  },
  {
    title: "Return to Sport",
    body: "Vom Aufbautraining zurück in den Sport – mit Tests, die zeigen, dass du bereit bist.",
    image: "/img/trainingstherapie-1600.webp",
    imageAlt: "Athlet beim Y-Balance-Test im Performance Club",
    link: { to: "/athletiktraining" },
  },
];

const steps = [
  {
    title: "Schmerzadaptierter Einstieg",
    body: "Wir starten dort, wo du schmerzfrei trainieren kannst, und bauen von da aus auf.",
  },
  {
    title: "Progressive Kräftigung",
    body: "Die Belastung steigt entsprechend deiner Belastbarkeit – Schritt für Schritt, ohne Rückschläge.",
  },
  {
    title: "Technik-Coaching",
    body: "Saubere Bewegungsmuster für Alltag und Sport, damit die Beschwerden nicht zurückkommen.",
  },
  {
    title: "Monitoring & Abstimmung",
    body: "RPE, Tempo und Schmerzskala im Blick – und enge Abstimmung mit Physiotherapie und Sportmedizin.",
  },
];

function Trainingstherapie() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="TRAININGSTHERAPIE"
        title="Aktiv zurück zu voller Belastbarkeit."
        intro="Gezieltes Aufbautraining nach Verletzung, Operation oder bei chronischen Beschwerden: progressive Kräftigung, abgestimmt auf deine aktuelle Belastbarkeit – und eng verzahnt mit unserer Physiotherapie."
        image={heroImg}
        imageAlt="Coach begleitet eine Klientin beim Kreuzheben mit der Langhantel"
        objectPosition="50% 40%"
      />

      <Pillars items={pillars} />

      <OfferCards
        eyebrow="WANN"
        title="Wofür Trainingstherapie hilft"
        action={
          <PillLink {...contactFormLink("Trainingstherapie")} variant="outlineOnLight">
            Termin vereinbaren
          </PillLink>
        }
        items={cases}
      />

      <ProcessSplit
        title="Progressive Belastungssteuerung"
        image={processImg}
        imageAlt="Coach korrigiert einen Klienten bei einer Übung am Boden"
        imagePosition="object-[40%_center]"
        steps={steps}
      />

      <ExpertGrid
        eyebrow="DAS TEAM"
        title="Unsere Trainingstherapeuten"
        slugs={["julian-kleinheinz", "florian-winder", "caroline-fritsch"]}
        topic="Trainingstherapie"
      />

      <StoriesSection
        title="Zurück im Alltag – und im Sport"
        names={["Noah Bischof", "Selina Madlener", "Ina Ludwig"]}
      />

      <ClosingCta
        title="Bereit für den nächsten Schritt?"
        body="Schreib uns, was passiert ist und wo du gerade stehst – wir melden uns mit einem Terminvorschlag."
        topic="Trainingstherapie"
      />
    </PageShell>
  );
}
