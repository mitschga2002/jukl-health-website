import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList, SplitBlock } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";

const athletiktrainingImg = "/img/athletiktraining-1459.webp";
const mannschaftMobility = "/img/angebot-1508.webp";

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
      { property: "og:url", content: "https://juklhealth.com/athletiktraining" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/athletiktraining" }],
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
        image={mannschaftMobility}
        imageAlt="Mannschaft bei einer Mobility-Einheit auf dem Sportplatz"
      />

      {/* The slab, but not the numbered steps the other service pages use:
          Schnelligkeit, Kraft and Stabilität are what the training contains,
          not an order to do them in, and numbering them would claim a sequence
          that isn't there. */}
      <Section
        alt
        eyebrow="INHALTE"
        title="Schnelligkeit · Kraft · Stabilität"
        action={
          <PillLink to="/kontakt" variant="outlineOnDark">
            Athletik anfragen
          </PillLink>
        }
      >
        <p>
          Als Ergänzung in der Vorbereitung, Übergangsphase oder während der Saison trainiere mit
          deiner Mannschaft wie die Profis. Beugt Verletzungen vor und startet top-fit in die
          nächsten Spiele.
        </p>
        <BulletList
          alt
          items={[
            "Schnelligkeit, Kraft, Stabilität, Beweglichkeit",
            "Individuelle Periodisierung über Saisonphasen",
            "Verletzungsprävention & Return-to-Play",
            "Inputs zu Ausführung, Atmung, Konzentration",
            "Screening: FMS, Sprungdiagnostik, L/R-Symmetrie",
            "Kontinuierliche Leistungssteigerung durch systematischen Trainingsaufbau",
          ]}
        />
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
