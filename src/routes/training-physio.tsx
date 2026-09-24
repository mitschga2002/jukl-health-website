import { FlaskConical, Medal, Network, Users } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, TopicCards } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  OfferCards,
  Pillars,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";

export const Route = createFileRoute("/training-physio")({
  head: () => ({
    meta: [
      { title: "Training & Physio – JuklHealth" },
      {
        name: "description",
        content:
          "Personal Training, Gruppentraining, Athletiktraining, Trainingsplanung, Physiotherapie und Trainingstherapie: alle Leistungen des JuklHealth Systems im Überblick.",
      },
      { property: "og:title", content: "Training & Physio – JuklHealth" },
      {
        property: "og:description",
        content: "Wissenschaftliches Training kombiniert mit klinischer Physiotherapie.",
      },
      { property: "og:url", content: "https://juklhealth.com/training-physio" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/training-physio" }],
  }),
  component: TrainingPhysio,
});

const pillars = [
  {
    icon: Network,
    title: "Ein System",
    body: "Training, Therapie und Analyse greifen ineinander – statt nebeneinander herzulaufen.",
  },
  {
    icon: Users,
    title: "Ein Team",
    body: "Sportwissenschaft und Physiotherapie unter einem Dach, eng abgestimmt auf dich.",
  },
  {
    icon: FlaskConical,
    title: "Evidenzbasiert",
    body: "Methoden nach aktuellem Stand der Wissenschaft – und Fortschritt, der messbar ist.",
  },
  {
    icon: Medal,
    title: "Vom Alltag bis zum Profisport",
    body: "Ob schmerzfrei durch den Tag oder bereit für die nächste Saison – wir holen dich ab.",
  },
];

/* Same photo per service as its own page opens with, so a visitor recognises
   where a card leads. */
const training: OfferCard[] = [
  {
    title: "Personal Training",
    body: "1:1 Betreuung mit voller Aufmerksamkeit – in Dornbirn und Widnau.",
    image: "/img/pt-coaching-1600.webp",
    imageAlt: "Coach korrigiert eine Kundin bei einer Ausfallschritt-Übung",
    link: { to: "/personaltraining" },
  },
  {
    title: "Gruppentraining",
    body: "Kleingruppenkurse wie HYROX, Mobility, Strength und Burn – oder eure eigene Gruppe.",
    image: "/img/gt-partner-1600.webp",
    imageAlt: "Zwei Trainingspartner bei einer Partnerübung",
    link: { to: "/gruppentraining" },
  },
  {
    title: "Athletiktraining",
    body: "Periodisierte Athletik für Vereine, Mannschaften und Einzelathleten.",
    image: "/img/ath-einzel-1200.webp",
    imageAlt: "Athlet bei Sprüngen über Hürden",
    imagePosition: "object-[center_40%]",
    link: { to: "/athletiktraining" },
  },
];

const therapy: OfferCard[] = [
  {
    title: "Trainingsplanung",
    body: "Individuell periodisierte Pläne, exakt auf deinen Status quo abgestimmt.",
    image: "/img/tp-planung-1600.webp",
    imageAlt: "Coach und Athlet planen das Training am Tablet",
    link: { to: "/trainingsplanung" },
  },
  {
    title: "Physiotherapie",
    body: "Ursache finden, gezielt behandeln und stärker zurück in Sport und Alltag.",
    image: "/img/physio-behandlung-1600.webp",
    imageAlt: "Physiotherapeut bei der Behandlung am Knie",
    imagePosition: "object-[30%_center]",
    link: { to: "/physiotherapie" },
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

function TrainingPhysio() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="LEISTUNGEN"
        title="Trainings- & Physio­angebote"
        intro="Von der Diagnose bis zur Performance: ein durchgängiges System aus Trainingswissenschaft und klinischer Physiotherapie – für jedes Ziel das passende Angebot."
      />

      <Pillars items={pillars} />

      <OfferCards
        eyebrow="TRAINING"
        title="Besser werden – allein, zu zweit oder im Team"
        action={
          <PillLink to="/kontakt" variant="outlineOnLight">
            Erstgespräch vereinbaren
          </PillLink>
        }
        items={training}
      />

      <OfferCards
        eyebrow="PLANUNG & THERAPIE"
        title="Mit System zurück und weiter"
        items={therapy}
      />

      <Section alt eyebrow="WAS DU BEKOMMST" title="Wissenschaft + Praxis">
        <TopicCards
          alt
          items={[
            {
              eyebrow: "Analyse",
              title: "Klarer Ausgangspunkt",
              points: [
                "Functional Movement Screen als Basis",
                "Anamnese, Zielklärung, klare Maßnahmen",
                "Verknüpfung mit Leistungs- und Stoffwechselanalyse",
              ],
            },
            {
              eyebrow: "Plan",
              title: "Periodisiert & individuell",
              points: [
                "Periodisierter Trainingsplan",
                "Vor- und Nachbereitung jeder Einheit",
                "Abgestimmt auf Alltag, Sport und Belastbarkeit",
              ],
            },
            {
              eyebrow: "Verlauf",
              title: "Messbarer Fortschritt",
              points: [
                "Re-Checks und Plananpassungen",
                "Enge Abstimmung zwischen Training und Therapie",
                "Ein Team, das deinen Weg kennt",
              ],
            },
          ]}
        />
      </Section>

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Noah Bischof", "Sebastian Santin", "Selina Madlener"]}
      />

      <ClosingCta
        title="Nicht sicher, was passt?"
        body="Schreib uns, was du erreichen willst – im Erstgespräch finden wir gemeinsam das richtige Angebot für dich."
        topic="Allgemeine Anfrage"
        label="Erstgespräch vereinbaren"
      />
    </PageShell>
  );
}
