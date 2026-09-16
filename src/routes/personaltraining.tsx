import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import {
  PageShell,
  PageHero,
  Section,
  SplitBlock,
  BulletList,
  StepList,
} from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";

const personalTraining = "/img/personal-training-1458.webp";
const trainingMitKunde = "/img/training-mit-kunde-1672.webp";

export const Route = createFileRoute("/personaltraining")({
  head: () => ({
    meta: [
      { title: "Personal Training — JuklHealth" },
      {
        name: "description",
        content:
          "1:1 Personal Training mit voller Aufmerksamkeit. Anamnese, FMS, individueller Plan und messbare Fortschritte.",
      },
      { property: "og:title", content: "Personal Training — JuklHealth" },
      { property: "og:description", content: "1:1 Personal Training mit voller Betreuung." },
      { property: "og:url", content: "https://juklhealth.com/personaltraining" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/personaltraining" }],
  }),
  component: PersonalTraining,
});

function PersonalTraining() {
  return (
    <PageShell>
      <PageHero
        eyebrow="1 : 1"
        title="Personal Training"
        intro="Wir widmen dir gerne exklusiv unsere Aufmerksamkeit. Gemeinsam gehen wir auf deine Ziele ein, erkennen mögliche Defizite und arbeiten Schritt für Schritt an nachhaltigen Verbesserungen."
        image={trainingMitKunde}
        imageAlt="Trainer und Kunde im Performance Club"
        imagePosition="left"
      />

      {/* The dark slab, as on /physiotherapie: on every service page the process
          module is the one that carries weight, and it is the same block each
          time so a visitor moving between them recognises it. */}
      <Section
        alt
        eyebrow="ABLAUF"
        title="So arbeiten wir zusammen"
        action={
          <PillLink {...contactFormLink("Personal Training")} variant="outlineOnDark">
            Jetzt anfragen
          </PillLink>
        }
      >
        <StepList
          steps={[
            "Anamnese und Analyse deines aktuellen Gesundheits- und Fitnesszustands",
            "Bewegungsanalyse mit dem Functional Movement Screen (FMS)",
            "Persönliche Ziele besprechen und definieren",
            "Individuelle Abstimmung des Trainingsplans",
            "Die ersten Trainings werden auf deine aktuelle Leistungsfähigkeit angepasst",
            "Jede Trainingseinheit wird sorgfältig geplant und ausgewertet",
            "Jedes Training baut auf den vorherigen Einheiten auf",
            "Kontinuierliches Coaching zu: Haltung, Ausführung, Atmung und Körperwahrnehmung",
            "Erste Fortschritte sind bereits nach wenigen Trainings spürbar",
            "Training im Performance Club oder draußen in der Natur",
          ]}
        />
      </Section>

      <SplitBlock
        eyebrow="FÜR WEN"
        title="Geeignet für"
        imageLabel="Personal Training · Coaching"
        image={personalTraining}
      >
        <BulletList
          items={[
            "Einsteiger mit klaren Zielen",
            "Spitzensportler in Vorbereitung & Saison",
            "Personen mit Haltungsproblemen durch Bürotätigkeit",
            "Rückkehrer nach Verletzungen",
            "Alle, die Wert auf individuelle Betreuung und nachhaltige Ergebnisse legen",
          ]}
        />
      </SplitBlock>
    </PageShell>
  );
}
