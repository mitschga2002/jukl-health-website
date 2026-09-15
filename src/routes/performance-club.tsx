import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  CTAButton,
  QuoteSlab,
} from "@/components/site/content";

const pcBanner = "/img/pc-banner-1386.webp";

export const Route = createFileRoute("/performance-club")({
  head: () => ({
    meta: [
      { title: "Performance Club Dornbirn — JuklHealth" },
      {
        name: "description",
        content:
          "Dein Zentrum für funktionelles Training. Personal Training, Athletik & Kurse in Kleingruppen auf 140 m² mitten in Dornbirn.",
      },
      { property: "og:title", content: "Performance Club — JuklHealth" },
      {
        property: "og:description",
        content: "Dein Zentrum für funktionelles Training in Dornbirn.",
      },
      { property: "og:url", content: "https://juklhealth.com/performance-club" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/performance-club" }],
  }),
  component: PerformanceClub,
});

function PerformanceClub() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="PERFORMANCE CLUB"
        title="Dein Zentrum für funktionelles Training"
        intro="Performance Club Dornbirn — 140 m² Trainingsfläche, top ausgebildete Coaches, klare Trainingsstruktur."
        image={pcBanner}
      />

      <Section eyebrow="DORNBIRN" title="Performance Club Dornbirn">
        <p>
          Im Performance Club trainierst du in einer modernen Umgebung mit persönlicher Betreuung.
          Unser Angebot reicht von Personal Training über Gruppen- und Athletiktraining bis hin zu
          betreuten Kleingruppenkursen.
        </p>
        <BulletList
          title="Allgemeine Informationen"
          items={[
            "3. Stock der Bildgasse 10, Dornbirn",
            "Wenn möglich bitte die Treppe benutzen",
            "Umkleiden / Duschen im 2. Stock",
            "Toiletten im 3. Stock",
            "Training nur mit Terminvereinbarung",
          ]}
        />
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>

      <QuoteSlab
        seamless
        eyebrow="Kundenstimmen"
        title="Was unsere Members sagen"
        quotes={[
          {
            quote:
              "Ich genieße das professionelle Training in der Gruppe. Mir gefällt die ganzheitliche Art — die gute Betreuung sorgt dafür, dass ich die Übungen richtig mache.",
            name: "Alexander Konzett",
            role: "Privatperson",
          },
          {
            quote:
              "Nach jahrelangen Rückenschmerzen war ich nach wenigen Trainingseinheiten schmerzfrei. Julian hat ein unglaubliches Gespür für den Körper. Best Trainer ever!",
            name: "Selina Madlener",
            role: "Privatperson",
          },
          {
            quote:
              "Durch das maßgeschneiderte Training mit den vielen Inputs hat sich meine Lebensqualität nachhaltig verbessert. Viel mehr als ein Coach.",
            name: "Angelina Natter",
            role: "Privatperson",
          },
        ]}
      />
    </PageShell>
  );
}
