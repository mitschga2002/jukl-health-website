import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, StepList } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";

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
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="Reha"
        title="Trainingstherapie"
        intro="Gezieltes aktives Aufbautraining nach Beschwerden oder Verletzungen. Progressive trainingstherapeutische Kräftigung, entsprechend deiner aktuellen Belastbarkeit."
        image={athletik}
      />

      {/* The page's only module, and its last, so the slab does not stop above
          the footer and leave a stripe of background between two dark blocks —
          it runs full bleed and the footer continues the same surface. */}
      <Section
        alt
        seamless
        eyebrow="AUFBAU"
        title="Progressive Belastungssteuerung"
        action={
          <PillLink {...contactFormLink("Trainingstherapie")} variant="outlineOnDark">
            Termin vereinbaren
          </PillLink>
        }
      >
        <StepList
          steps={[
            "Schmerzadaptierter Einstieg",
            "Progressive Kräftigung entsprechend deiner Belastbarkeit („Load to Tolerance“)",
            "Technik-Coaching für Alltag und Sport",
            "Monitoring (RPE, Tempo, Schmerzskala)",
            "Enge Abstimmung mit Physiotherapie und Sportmedizin",
          ]}
        />
      </Section>
    </PageShell>
  );
}
