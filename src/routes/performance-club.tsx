import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, BulletList, QuoteSlab } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { LocationMap } from "@/components/site/LocationMap";

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

      <Section
        alt
        eyebrow="ANGEBOT"
        title="Personal Training, Athletik & Kurse"
        action={
          <PillLink {...contactFormLink("Performance Club")} variant="outlineOnDark">
            Termin vereinbaren
          </PillLink>
        }
      >
        <p>
          Im Performance Club trainierst du in einer modernen Umgebung mit persönlicher Betreuung.
          Unser Angebot reicht von Personal Training über Gruppen- und Athletiktraining bis hin zu
          betreuten Kleingruppenkursen.
        </p>
        <BulletList
          alt
          items={[
            "Personal Training & Athletik",
            "Kurse in Kleingruppen",
            "Mobility · Movement · Strength · Burn",
          ]}
        />
      </Section>

      <Section eyebrow="STANDORT" title="Bildgasse 10 · 3. Stock · A-6850 Dornbirn">
        {/* The address is the section heading, so the map belongs beside the
            practical notes rather than under them. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <BulletList
            title="Gut zu wissen"
            items={[
              "140 m² Trainingsfläche",
              "Wenn möglich bitte die Treppe benutzen",
              "Umkleiden & Duschen im 2. Stock",
              "Toiletten im 3. Stock",
              "Training nur mit Terminvereinbarung",
            ]}
          />
          <LocationMap
            name="Performance Club Dornbirn"
            lines={["Bildgasse 10, 3. Stock", "A-6850 Dornbirn"]}
            lat={47.4151713}
            lon={9.7330917}
            destination="Bildgasse 10, 6850 Dornbirn, Österreich"
          />
        </div>
      </Section>

      {/* The one module the other two clubs have no counterpart for: these
          testimonials exist for this club only, and repeating the same three
          quotes on all three pages would be worse than the asymmetry. */}
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
