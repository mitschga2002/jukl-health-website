import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  OfferCards,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";
import { ClubLocation } from "@/components/site/ClubPage";

const heroImg = "/img/widnau-club-1080.webp";

export const Route = createFileRoute("/training-club-widnau")({
  head: () => ({
    meta: [
      { title: "Training Club Widnau – JuklHealth (CH)" },
      {
        name: "description",
        content:
          "50 m² Personal Training, Athletiktraining und Trainingstherapie in Widnau (CH). 1:1 Setting, Termin auf Anfrage.",
      },
      { property: "og:title", content: "Training Club Widnau – JuklHealth" },
      {
        property: "og:description",
        content: "1:1 Personal Training in Widnau, Schweiz.",
      },
      { property: "og:url", content: "https://juklhealth.com/training-club-widnau" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/training-club-widnau" }],
  }),
  component: Widnau,
});

const offers: OfferCard[] = [
  {
    title: "Personal Training",
    body: "1:1 mit voller Aufmerksamkeit – in angenehm privatem Ambiente.",
    image: "/img/pt-coaching-1600.webp",
    imageAlt: "Coach korrigiert eine Kundin bei einer Ausfallschritt-Übung",
    link: { to: "/personaltraining" },
  },
  {
    title: "Athletiktraining",
    body: "Individuell periodisierte Athletik für ambitionierte Sportler aus Vorarlberg und der Ostschweiz.",
    image: "/img/ath-einzel-1200.webp",
    imageAlt: "Athlet bei Sprüngen über Hürden",
    imagePosition: "object-[center_40%]",
    link: { to: "/athletiktraining" },
  },
  {
    title: "Trainingstherapie",
    body: "Aktives Aufbautraining nach Verletzung, OP oder bei chronischen Beschwerden.",
    image: "/img/tt-belastung-1200.webp",
    imageAlt: "Coach begleitet eine Klientin beim Kreuzheben",
    imagePosition: "object-[center_35%]",
    link: { to: "/trainingstherapie" },
  },
];

function Widnau() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="TRAINING CLUB WIDNAU"
        title="Privat trainieren – auf höchstem Niveau."
        intro="Auf 50 m² in Widnau bieten wir Personal Training, Athletiktraining und Trainingstherapie im 1:1-Setting – nur eine kurze Fahrt vom Rheintal, ideal für Kunden aus Vorarlberg und der Ostschweiz."
        image={heroImg}
        imageAlt="Trainingsfläche im Training Club Widnau"
        facts={[
          { label: "Fläche", value: "50 m²" },
          { label: "Setting", value: "Privat, 1:1" },
          { label: "Erfahrung", value: "15 Jahre" },
          { label: "Zugang", value: "Mit Termin" },
        ]}
      />

      <OfferCards
        eyebrow="ANGEBOT"
        title="Was du hier trainieren kannst"
        action={
          <PillLink {...contactFormLink("Training Club Widnau")} variant="outlineOnLight">
            Termin anfragen
          </PillLink>
        }
        items={offers}
      />

      <ClubLocation
        title="Schützenstrasse 13 · CH-9443 Widnau"
        notes={[
          "50 m² Trainingsfläche",
          "Umkleiden & Duschen vorhanden",
          "Nur mit Terminvereinbarung",
        ]}
        map={{
          name: "Training Club Widnau",
          lines: ["Schützenstrasse 13", "CH-9443 Widnau"],
          lat: 47.4054167,
          lon: 9.6449079,
          destination: "Schützenstrasse 13, 9443 Widnau, Schweiz",
        }}
      />

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Sebastian Santin", "Dario Clasadonte", "Ina Ludwig"]}
      />

      <ClosingCta
        title="Termin in Widnau anfragen"
        body="Schreib uns, was du vorhast – wir melden uns mit einem Terminvorschlag im Training Club Widnau."
        topic="Training Club Widnau"
        label="Termin anfragen"
      />
    </PageShell>
  );
}
