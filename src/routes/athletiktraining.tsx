import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  CTAButton,
  SplitBlock,
} from "@/components/site/content";

const athletiktrainingImg = "/img/athletiktraining-1459.webp";

export const Route = createFileRoute("/athletiktraining")({
  head: () => ({
    meta: [
      { title: "Athletiktraining Dornbirn – JuklHealth" },
      {
        name: "description",
        content:
          "Periodisiertes Athletiktraining für Vereine, Mannschaften und Einzelathleten. Schnelligkeit, Kraft, Stabilität – wissenschaftlich fundiert.",
      },
      { property: "og:title", content: "Athletiktraining – JuklHealth" },
      {
        property: "og:description",
        content: "Athletiktraining wie bei den Profis – individuell periodisiert.",
      },
    ],
  }),
  component: Athletik,
});

function Athletik() {
  return (
    <PageShell>
      <PageHero
        eyebrow="ATHLETIK"
        title="Athletiktraining"
        intro="Ideal als Ergänzung in der Saisonvorbereitung, während der Übergangsphase oder im laufenden Spielbetrieb. Das Athletiktraining verbessert Kraft, Schnelligkeit und Stabilität und trägt zur Verletzungsprävention bei."
        image={athletiktrainingImg}
      />

      <Section eyebrow="INHALTE" title="Schnelligkeit · Kraft · Stabilität">
        <p>
          Als Ergänzung in der Vorbereitung, Übergangsphase oder während der Saison
          trainiere mit deiner Mannschaft wie die Profis. Beugt Verletzungen vor und
          startet top-fit in die nächsten Spiele.
        </p>
        <BulletList
          items={[
            "Schnelligkeit, Kraft, Stabilität, Beweglichkeit",
            "Individuelle Periodisierung über Saisonphasen",
            "Verletzungsprävention & Return-to-Play",
            "Inputs zu Ausführung, Atmung, Konzentration",
            "Screening: FMS, Sprungdiagnostik, L/R-Symmetrie",
            "Kontinuierliche Leistungssteigerung durch systematischen Trainingsaufbau",
          ]}
        />
        <CTAButton to="/kontakt">Athletik anfragen</CTAButton>
      </Section>

      <SplitBlock
        reverse
        eyebrow="FÜR WEN"
        title="Vereine, Teams & Einzelathleten"
        imageLabel="Mannschaftsathletik"
        image={athletiktrainingImg}
      >
        <BulletList
          items={[
            "Fußball, Hockey, Volleyball, Handball",
            "Ambitionierte Ausdauer- und Kraftsportler",
            "Rückkehr aus Verletzung / Return-to-Competition",
            "Individuelle Programmierung nach Saisonphase",
          ]}
        />
      </SplitBlock>
    </PageShell>
  );
}
