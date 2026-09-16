import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { LocationMap } from "@/components/site/LocationMap";

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

      <Section
        alt
        eyebrow="ANGEBOT"
        title="24 h Zugang & ein Jahr Betreuung"
        action={
          <PillLink to="/kontakt" variant="outlineOnDark">
            Zur Anmeldung
          </PillLink>
        }
      >
        <p>
          Auf 160 m² findest du im Strength Club alles, was du brauchst. 1 Jahr, 7 Tage die Woche,
          24 h Zugang — plus ein Betreuungssystem, das dich nachweisbar zu deinen Zielen bringt.
        </p>
        <BulletList
          alt
          items={[
            "24 h / 7 Tage Zugang",
            "Max. 100 Mitglieder",
            "1 Jahr Betreuungssystem",
            "Exklusives Trainingsambiente",
          ]}
        />
      </Section>

      <Section eyebrow="STANDORT" title="Bildgasse 10 · Erdgeschoss · A-6850 Dornbirn">
        {/* The address is the section heading, so the map belongs beside the
            practical notes rather than under them. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <BulletList
            title="Gut zu wissen"
            items={[
              "160 m² Trainingsfläche",
              "Zugang im Erdgeschoss",
              "Umkleiden & Duschen im 2. Stock",
            ]}
          />
          <LocationMap
            name="Strength Club Dornbirn"
            lines={["Bildgasse 10, Erdgeschoss", "A-6850 Dornbirn"]}
            lat={47.4151713}
            lon={9.7330917}
            destination="Bildgasse 10, 6850 Dornbirn, Österreich"
          />
        </div>
      </Section>
    </PageShell>
  );
}
