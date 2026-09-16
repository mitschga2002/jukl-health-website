import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList } from "@/components/site/content";
import { ConnectedCards } from "@/components/site/ConnectedCards";

export const Route = createFileRoute("/training-physio")({
  head: () => ({
    meta: [
      { title: "Training & Physio – JuklHealth" },
      {
        name: "description",
        content:
          "Personal Training, Gruppen-, Athletiktraining, Physiotherapie und Trainingstherapie: alle Leistungen im Überblick.",
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

const services = [
  {
    to: "/personaltraining",
    label: "Personal Training",
    num: "01",
    desc: "1:1 Betreuung mit voller Aufmerksamkeit.",
  },
  {
    to: "/gruppentraining",
    label: "Gruppentraining",
    num: "02",
    desc: "Kleine Gruppen, gemeinsamer Antrieb.",
  },
  {
    to: "/athletiktraining",
    label: "Athletiktraining",
    num: "03",
    desc: "Periodisierte Athletik für Mannschaften.",
  },
  {
    to: "/physiotherapie",
    label: "Physiotherapie",
    num: "04",
    desc: "Ursache finden, schmerzfrei werden.",
  },
  {
    to: "/trainingstherapie",
    label: "Trainingstherapie",
    num: "05",
    desc: "Aktives Aufbautraining nach Verletzungen.",
  },
] as const;

function TrainingPhysio() {
  return (
    <PageShell>
      <PageHero
        eyebrow="LEISTUNGEN"
        title="Trainings- & Physio­angebote"
        intro="Von der Diagnose bis zur Performance: ein durchgängiges System aus Trainingswissenschaft und klinischer Physiotherapie."
      />

      <Section eyebrow="ÜBERSICHT" title="Alle Trainingsformate">
        <ConnectedCards
          items={[
            ...services.map((svc) => ({ to: svc.to, title: svc.label, body: svc.desc })),
            // Closes the second row, so the slab never ends on an empty cell.
            {
              to: "/kontakt",
              title: "Nicht das Richtige dabei?",
              body: "Schreib uns – wir stellen dir ein individuelles Erstgespräch zusammen.",
              action: "Erstgespräch vereinbaren",
              accent: true,
            },
          ]}
        />
      </Section>

      <Section eyebrow="WAS DU BEKOMMST" title="Wissenschaft + Praxis">
        <BulletList
          items={[
            "Functional Movement Screen als Basis",
            "Anamnese, Zielklärung, klare Maßnahmen",
            "Periodisierter Trainingsplan",
            "Vor- und Nachbereitung jeder Einheit",
            "Verknüpfung mit Leistungs- und Stoffwechselanalyse",
            "Re-Checks und Plananpassungen",
          ]}
        />
      </Section>
    </PageShell>
  );
}
