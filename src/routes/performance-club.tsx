import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  OfferCards,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";
import { ClubGallery, ClubLocation } from "@/components/site/ClubPage";

const heroImg = "/img/pc-banner-1386.webp";

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

const offers: OfferCard[] = [
  {
    title: "Personal Training",
    body: "1:1 mit voller Aufmerksamkeit – von der Bewegungsanalyse bis zum messbaren Fortschritt.",
    image: "/img/pt-coaching-1600.webp",
    imageAlt: "Coach korrigiert eine Kundin bei einer Ausfallschritt-Übung",
    link: { to: "/personaltraining" },
  },
  {
    title: "Gruppenkurse",
    body: "HYROX, Mobility, Strength und Burn in Kleingruppen – oder eure eigene Gruppe.",
    image: "/img/gruppentraining-1032.webp",
    imageAlt: "Gruppentraining mit Gymnastikbällen im Performance Club",
    link: { to: "/gruppentraining" },
  },
  {
    title: "Physio & Therapie",
    body: "Physiotherapie und Trainingstherapie unter einem Dach mit deinem Training.",
    image: "/img/physio-behandlung-1600.webp",
    imageAlt: "Physiotherapeut bei der Behandlung am Knie",
    imagePosition: "object-[30%_center]",
    link: { to: "/physiotherapie" },
  },
];

function PerformanceClub() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="PERFORMANCE CLUB"
        title="Dein Zentrum für funktionelles Training."
        intro="140 m² Trainingsfläche mitten in Dornbirn, top ausgebildete Coaches und eine klare Trainingsstruktur – hier treffen Personal Training, Kleingruppenkurse, Athletik und Physio aufeinander."
        image={heroImg}
        imageAlt="Trainingsfläche im Performance Club Dornbirn"
        facts={[
          { label: "Fläche", value: "140 m²" },
          { label: "Lage", value: "Bildgasse 10, 3. Stock" },
          { label: "Training", value: "1:1 & Kleingruppen" },
          { label: "Zugang", value: "Mit Termin" },
        ]}
      />

      <ClubGallery
        eyebrow="EINBLICKE"
        title="So trainierst du im Performance Club"
        images={[
          {
            src: "/img/pc-coaching-1600.webp",
            alt: "Coach erklärt einem Kunden eine Übung vor der Performance-Club-Wand",
          },
          { src: "/img/pc-ball-1600.webp", alt: "Kundin bei einer Übung mit Medizinball" },
          { src: "/img/pc-agility-1600.webp", alt: "Koordinationstraining mit Coach" },
          {
            src: "/img/pc-koordination-1600.webp",
            alt: "Koordinationsleiter auf der Trainingsfläche",
          },
          { src: "/img/gt-drills-1600.webp", alt: "Laufübung auf dem Kunstrasen" },
        ]}
      />

      <OfferCards
        eyebrow="ANGEBOT"
        title="Was du hier trainieren kannst"
        action={
          <PillLink {...contactFormLink("Performance Club")} variant="outlineOnLight">
            Termin vereinbaren
          </PillLink>
        }
        items={offers}
      />

      <ClubLocation
        title="Bildgasse 10 · 3. Stock · A-6850 Dornbirn"
        notes={[
          "140 m² Trainingsfläche",
          "Wenn möglich bitte die Treppe benutzen",
          "Umkleiden & Duschen im 2. Stock",
          "Toiletten im 3. Stock",
          "Training nur mit Terminvereinbarung",
        ]}
        map={{
          name: "Performance Club Dornbirn",
          lines: ["Bildgasse 10, 3. Stock", "A-6850 Dornbirn"],
          lat: 47.4151713,
          lon: 9.7330917,
          destination: "Bildgasse 10, 6850 Dornbirn, Österreich",
        }}
      />

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Alexander Konzett", "Selina Madlener", "Angelina Natter"]}
      />

      <ClosingCta
        title="Komm vorbei."
        body="Schreib uns, was du vorhast – wir melden uns mit einem Termin für dein erstes Training im Performance Club."
        topic="Performance Club"
      />
    </PageShell>
  );
}
