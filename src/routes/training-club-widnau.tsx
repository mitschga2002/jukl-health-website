import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList, CTAButton } from "@/components/site/content";

const widnauClub = "/img/widnau-club-1080.webp";

export const Route = createFileRoute("/training-club-widnau")({
  head: () => ({
    meta: [
      { title: "Training Club Widnau – JuklHealth (CH)" },
      {
        name: "description",
        content:
          "50 m² Personal Training, Athletiktraining und Trainingstherapie in Widnau (CH). 1:1 Setting, Termin auf Anfrage.",
      },
      { property: "og:title", content: "Training Club Widnau – JuklHealth" },
      {
        property: "og:description",
        content: "1:1 Personal Training in Widnau, Schweiz.",
      },
      { property: "og:url", content: "https://juklhealth.com/training-club-widnau" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/training-club-widnau" }],
  }),
  component: Widnau,
});

function Widnau() {
  return (
    <PageShell>
      <PageHero
        eyebrow="TRAINING CLUB WIDNAU"
        title="50 m² · 1 : 1 Personal Training"
        intro="Privates Trainingsambiente auf höchstem Niveau – in Widnau, Schweiz. Nur mit Terminvereinbarung."
        image={widnauClub}
      />

      <Section eyebrow="STANDORT" title="Schützenstrasse 13 · CH-9443 Widnau">
        <p>
          Auf 50 m² bieten wir Personal Training, Athletiktrainings und Trainingstherapien auf
          neuestem Stand – 1:1, mit angenehm privatem Ambiente. Nur eine kurze Fahrt vom Rheintal
          aus, ideal für Kunden aus Vorarlberg und der Ostschweiz.
        </p>
        <BulletList
          items={[
            "Schützenstrasse 13, 9443 Widnau (CH)",
            "Nur mit Terminvereinbarung",
            "Umkleiden & Duschen vorhanden",
            "15 Jahre Erfahrung auf höchstem Niveau",
            "Personal Training · Athletik · Trainingstherapie",
          ]}
        />
        <CTAButton to="/kontakt">Termin anfragen</CTAButton>
      </Section>
    </PageShell>
  );
}
