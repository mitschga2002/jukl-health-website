import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, BulletList, StepList } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";

const trainingsplanung = "/img/gesundheitscoaching-1400.webp";

export const Route = createFileRoute("/trainingsplanung")({
  head: () => ({
    meta: [
      { title: "Individuelle Trainingsplanung & Periodisierung – JuklHealth" },
      {
        name: "description",
        content:
          "Evidenzbasierte, individuell periodisierte Trainingspläne nach dem JuklHealth System – abgestimmt auf deinen Status quo, deine Ziele und deinen Alltag.",
      },
      { property: "og:title", content: "Individuelle Trainingsplanung – JuklHealth" },
      {
        property: "og:description",
        content: "Periodisierte Trainingspläne, die exakt zu deinem Status quo passen.",
      },
      { property: "og:url", content: "https://juklhealth.com/trainingsplanung" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/trainingsplanung" }],
  }),
  component: Trainingsplanung,
});

function Trainingsplanung() {
  return (
    <PageShell>
      <PageHero
        eyebrow="PLANUNG"
        title="Individuelle Trainings­planung & Periodisierung"
        intro="Evidenzbasierte, strukturierte Programmierung, die exakt zu deinem Status quo passt – ob du selbstständig trainierst oder begleitend zu Coaching und Therapie."
        image={trainingsplanung}
        imageAlt="Trainingsplanung am Tablet gemeinsam mit dem Athleten"
      />

      <Section
        alt
        eyebrow="ABLAUF"
        title="Vom Status quo zum Plan"
        action={
          <PillLink {...contactFormLink("Trainingsplanung")} variant="outlineOnDark">
            Planung anfragen
          </PillLink>
        }
      >
        <StepList
          steps={[
            "Anamnese, Zielklärung & Trainingshistorie",
            "Screening & Analysen als objektiver Ausgangspunkt",
            "Periodisierter Plan über Makro-, Meso- und Mikrozyklen",
            "Laufendes Monitoring von Belastung und Fortschritt",
            "Re-Checks und Plananpassungen",
          ]}
        />
      </Section>

      <Section eyebrow="FÜR WEN" title="Selbstständig trainieren, mit System">
        <BulletList
          items={[
            "Ambitionierte Freizeit- und Leistungssportler",
            "Saisonvorbereitung und Wettkampfphasen",
            "Wiedereinstieg nach Verletzung oder Trainingspause",
            "Ergänzung zu Personal Training, Gruppentraining oder Strength Club",
          ]}
        />
      </Section>
    </PageShell>
  );
}
