import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, BulletList } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { LocationMap } from "@/components/site/LocationMap";

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

      <Section
        alt
        eyebrow="ANGEBOT"
        title="Personal Training, Athletik & Therapie"
        action={
          <PillLink {...contactFormLink("Training Club Widnau")} variant="outlineOnDark">
            Termin anfragen
          </PillLink>
        }
      >
        <p>
          Auf 50 m² bieten wir Personal Training, Athletiktrainings und Trainingstherapien auf
          neuestem Stand – 1:1, mit angenehm privatem Ambiente. Nur eine kurze Fahrt vom Rheintal
          aus, ideal für Kunden aus Vorarlberg und der Ostschweiz.
        </p>
        <BulletList
          alt
          items={[
            "1 : 1 Personal Training",
            "Trainingstherapie",
            "Privates Ambiente",
            "15 Jahre Erfahrung auf höchstem Niveau",
          ]}
        />
      </Section>

      <Section eyebrow="STANDORT" title="Schützenstrasse 13 · CH-9443 Widnau">
        {/* The address is the section heading, so the map belongs beside the
            practical notes rather than under them. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <BulletList
            title="Gut zu wissen"
            items={[
              "50 m² Trainingsfläche",
              "Umkleiden & Duschen vorhanden",
              "Nur mit Terminvereinbarung",
            ]}
          />
          <LocationMap
            name="Training Club Widnau"
            lines={["Schützenstrasse 13", "CH-9443 Widnau"]}
            lat={47.4054167}
            lon={9.6449079}
            destination="Schützenstrasse 13, 9443 Widnau, Schweiz"
          />
        </div>
      </Section>
    </PageShell>
  );
}
