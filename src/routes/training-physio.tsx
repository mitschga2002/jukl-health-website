import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { ConnectedCards } from "@/components/site/ConnectedCards";

export const Route = createFileRoute("/training-physio")({
  head: () => ({
    meta: [
      { title: "Training & Physio – JuklHealth" },
      {
        name: "description",
        content:
          "Personal Training, Gruppen-, Athletiktraining, Trainingsplanung, Physiotherapie und Trainingstherapie: alle Leistungen im Überblick.",
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
    to: "/trainingsplanung",
    label: "Trainingsplanung",
    num: "04",
    desc: "Individuell periodisiert, exakt auf dich abgestimmt.",
  },
  {
    to: "/physiotherapie",
    label: "Physiotherapie",
    num: "05",
    desc: "Ursache finden, schmerzfrei werden.",
  },
  {
    to: "/trainingstherapie",
    label: "Trainingstherapie",
    num: "06",
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

      {/* Six formats fill both rows of the three-column slab on their own, so
          the "Nicht das Richtige dabei?" card that used to close the second row
          moves up beside the heading as a pill. */}
      <Section
        eyebrow="ÜBERSICHT"
        title="Alle Trainingsformate"
        action={<PillLink to="/kontakt">Erstgespräch vereinbaren</PillLink>}
      >
        <ConnectedCards
          items={services.map((svc) => ({ to: svc.to, title: svc.label, body: svc.desc }))}
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
