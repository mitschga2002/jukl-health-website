import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  CTAButton,
  StatRow,
} from "@/components/site/content";

export const Route = createFileRoute("/bioimpedanzanalyse")({
  head: () => ({
    meta: [
      { title: "Bioimpedanzanalyse – JuklHealth" },
      {
        name: "description",
        content:
          "Weltweit anerkannte Methode zur Ermittlung der Körperzusammensetzung. Wasser, Proteine, Mineralien, Skelettmuskel- und Fettmasse präzise gemessen.",
      },
      { property: "og:title", content: "Bioimpedanzanalyse – JuklHealth" },
      { property: "og:description", content: "Körperzusammensetzung präzise gemessen." },
      { property: "og:url", content: "https://juklhealth.com/bioimpedanzanalyse" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/bioimpedanzanalyse" }],
  }),
  component: Bia,
});

function Bia() {
  return (
    <PageShell>
      <PageHero
        eyebrow="BODY COMPOSITION"
        title="Bioimpedanz-Analyse"
        intro="Was wir messbar machen können, können wir verbessern. Der Ist-Zustand deines Körpers – präzise und in Minuten."
      />

      <Section eyebrow="GRUNDLAGE" title="Mehr als die Badezimmerwaage">
        <p>
          Die Bioimpedanzanalyse ist eine weltweit anerkannte Messmethode zur Ermittlung der
          Körperzusammensetzung. Die einfache Badezimmerwaage unterscheidet nicht, ob Gewicht durch
          Muskulatur oder Fettgewebe zustande kommt.
        </p>
        <p>
          In der Ernährungsmedizin wird der Ernährungs- und Gesundheitszustand nicht nur nach
          Gewicht oder BMI beurteilt, sondern nach der Körperzusammensetzung. Darum ist die
          Bioimpedanzanalyse die richtige Wahl, um Top-Ergebnisse zu erzielen.
        </p>
      </Section>

      <StatRow
        items={[
          { value: "10", label: "Min Messdauer" },
          { value: "20+", label: "Parameter" },
          { value: "L / R", label: "Seitenvergleich" },
          { value: "PDF", label: "Report" },
        ]}
      />

      <Section eyebrow="WERTE" title="Was wir messen">
        <BulletList
          items={[
            "Gesamtkörperwasser",
            "Proteine & Mineralien",
            "Körperfettmasse & Skelettmuskelmasse",
            "Gewicht & Körperfettanteil",
            "Viszerales Fett",
            "Intra- & extrazelluläres Wasser",
            "Muskelverteilung Arme, Beine, Rumpf",
            "Phasenwinkel (Zellgesundheit)",
          ]}
        />
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>
    </PageShell>
  );
}
