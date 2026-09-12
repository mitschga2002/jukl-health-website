import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList, CTAButton } from "@/components/site/content";

const athletik = "/img/athletiktraining-1459.webp";

export const Route = createFileRoute("/trainingstherapie")({
  head: () => ({
    meta: [
      { title: "Trainingstherapie Dornbirn – JuklHealth" },
      {
        name: "description",
        content:
          "Aktives Aufbautraining nach Verletzungen. Schmerzadaptiert, progressiv, wissenschaftlich fundiert.",
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
  component: Reha,
});

function Reha() {
  return (
    <PageShell>
      <PageHero
        eyebrow="REHAB"
        title="Trainingstherapie"
        intro="Gezieltes aktives Aufbautraining nach Beschwerden oder Verletzungen. Progressive trainingstherapeutische Kräftigung, entsprechend deiner aktuellen Belastbarkeit."
        image={athletik}
      />

      <Section eyebrow="AUFBAU" title="Progressive Belastungssteuerung">
        <BulletList
          items={[
            "Schmerzadaptierter Einstieg",
            "Progressive Kräftigung entsprechend deiner Belastbarkeit („Load to Tolerance“)",
            "Technik-Coaching für Alltag und Sport",
            "Monitoring (RPE, Tempo, Schmerzskala)",
            "Enge Abstimmung mit Physiotherapie und Sportmedizin",
          ]}
        />
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>
    </PageShell>
  );
}
