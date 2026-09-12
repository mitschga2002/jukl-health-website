import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList, CTAButton } from "@/components/site/content";

const strengthClub = "/img/strength-club-1824.webp";

export const Route = createFileRoute("/strength-club")({
  head: () => ({
    meta: [
      { title: "Strength Club Dornbirn — JuklHealth" },
      {
        name: "description",
        content:
          "160 m² Strength Club in Dornbirn. 24/7 Zugang, max. 100 Members, exklusives Trainingsambiente mit persönlicher Betreuung.",
      },
      { property: "og:title", content: "Strength Club Dornbirn — JuklHealth" },
      {
        property: "og:description",
        content: "160 m² · 24/7 Zugang · max. 100 Mitglieder.",
      },
      { property: "og:url", content: "https://juklhealth.com/strength-club" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/strength-club" }],
  }),
  component: StrengthClub,
});

function StrengthClub() {
  return (
    <PageShell>
      <PageHero
        eyebrow="STRENGTH CLUB"
        title="160 m² · 24/7 für Members"
        intro="Exklusives Trainingsambiente mitten in Dornbirn. Max. 100 Mitglieder, ein Jahr Betreuungssystem — Zugang rund um die Uhr."
        image={strengthClub}
      />

      <Section eyebrow="DORNBIRN" title="Bildgasse 10 · Erdgeschoss">
        <p>
          Auf 160 m² findest du im Strength Club alles, was du brauchst. 1 Jahr, 7 Tage die Woche,
          24 h Zugang — plus ein Betreuungssystem, das dich nachweisbar zu deinen Zielen bringt.
        </p>
        <BulletList
          items={[
            "Erdgeschoss Bildgasse 10, Dornbirn",
            "24 h / 7 Tage Zugang",
            "Max. 100 Mitglieder",
            "1 Jahr Betreuungssystem",
            "Exklusives Trainingsambiente",
            "Umkleiden & Duschen im 2. Stock",
          ]}
        />
        <CTAButton to="/kontakt">Zur Anmeldung</CTAButton>
      </Section>
    </PageShell>
  );
}
