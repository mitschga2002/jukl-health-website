import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  SplitBlock,
  BulletList,
  CTAButton,
} from "@/components/site/content";

const gruppentraining = "/img/gruppentraining-1032.webp";

export const Route = createFileRoute("/gruppentraining")({
  head: () => ({
    meta: [
      { title: "Gruppentraining & Athletiktraining — JuklHealth" },
      {
        name: "description",
        content:
          "Training mit Kollegen, Mannschaft oder Partner. Kleine Gruppen, individuelle Korrektur, gemeinsamer Antrieb.",
      },
      { property: "og:title", content: "Gruppentraining — JuklHealth" },
      { property: "og:description", content: "Training in der Gruppe — Energie, Spaß, Erfolg." },
    ],
  }),
  component: Gruppentraining,
});

function Gruppentraining() {
  return (
    <PageShell>
      <PageHero
        eyebrow="GROUP"
        title="Gruppentraining"
        intro="Gemeinsam erreichen wir deine sportlichen Ziele – mit individuell abgestimmtem Gruppentraining."
      />

      <Section eyebrow="ABLAUF" title="So läuft ein Gruppentraining">
        <BulletList
          items={[
            "Aufnahme der aktuellen Verfassung aller Teilnehmer",
            "Gemeinsame Definition der Trainingsziele und Inhalte",
            "Abstimmung des Trainingsplans auf Bedürfnisse der Gruppe",
            "Die ersten Trainingseinheiten werden an die aktuelle Leistungsfähigkeit angepasst",
            "Jede Trainingseinheit wird sorgfältig geplant und ausgewertet",
            "Jedes Training baut auf den vorherigen Einheiten auf",
            "Kontinuierliches Coaching zu Haltung, Atmung & Konzentration",
            "Erste Fortschritte sind oft bereits nach wenigen Trainingseinheiten spürbar",
            "Training im Fitnessstudio oder draußen in der Natur",
          ]}
        />
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </Section>

      <SplitBlock
        eyebrow="FORMATE"
        title="Sport- & Firmen­gruppen"
        imageLabel="Athletiktraining · Mannschaft"
        image={gruppentraining}
      >
        <p>
          Wir betreuen Vereine, Mannschaften und Firmenteams. Das Training eignet sich ideal als
          Ergänzung in der Saisonvorbereitung, während der Übergangsphase oder im laufenden
          Spielbetrieb. Es unterstützt die Leistungsfähigkeit und kann das Verletzungsrisiko
          reduzieren.
        </p>
        <BulletList
          items={[
            "Mannschaftsathletik (Fußball, Hockey, Volleyball)",
            "Firmenfitness & Active Lunch",
            "Private Kleingruppen 2–6 Personen",
            "Outdoor- und Indoor-Setups",
          ]}
        />
      </SplitBlock>
    </PageShell>
  );
}
