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
import { ClubLocation } from "@/components/site/ClubPage";

const heroImg = "/img/strength-club-1824.webp";

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

const offers: OfferCard[] = [
  {
    title: "24/7 Membership",
    body: "Ein Jahr, sieben Tage die Woche, rund um die Uhr – trainiere, wann es in deinen Alltag passt.",
    image: "/img/strength-club-1824.webp",
    imageAlt: "Trainingsfläche im Strength Club Dornbirn",
    link: contactFormLink("Strength Club"),
  },
  {
    title: "Betreuungssystem",
    body: "Ein Jahr begleitet: individuelle Planung und regelmäßige Checks, die dich nachweisbar zu deinen Zielen bringen.",
    image: "/img/tp-planung-1600.webp",
    imageAlt: "Coach und Mitglied planen das Training am Tablet",
    link: { to: "/trainingsplanung" },
  },
  {
    title: "Personal Training",
    body: "Zusätzlich 1:1-Einheiten buchen, wenn du Technik, Kraft oder ein Ziel gezielt angehen willst.",
    image: "/img/pt-kraft-1600.webp",
    imageAlt: "Coach begleitet eine Kundin beim Kreuzheben",
    link: { to: "/personaltraining" },
  },
];

function StrengthClub() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="STRENGTH CLUB"
        title="Dein Club. Rund um die Uhr."
        intro="160 m² exklusives Trainingsambiente mitten in Dornbirn: 24/7 Zugang, auf 100 Mitglieder begrenzt und mit einem Betreuungssystem, das dich ein ganzes Jahr begleitet."
        image={heroImg}
        imageAlt="Trainingsfläche im Strength Club Dornbirn"
        facts={[
          { label: "Fläche", value: "160 m²" },
          { label: "Zugang", value: "24/7" },
          { label: "Mitglieder", value: "Max. 100" },
          { label: "Betreuung", value: "1 Jahr inklusive" },
        ]}
      />

      <OfferCards
        eyebrow="MEMBERSHIP"
        title="Mehr als ein Schlüssel zum Gym"
        action={
          <PillLink {...contactFormLink("Strength Club")} variant="outlineOnLight">
            Zur Anmeldung
          </PillLink>
        }
        items={offers}
      />

      <ClubLocation
        title="Bildgasse 10 · Erdgeschoss · A-6850 Dornbirn"
        notes={[
          "160 m² Trainingsfläche",
          "Zugang im Erdgeschoss",
          "Umkleiden & Duschen im 2. Stock",
        ]}
        map={{
          name: "Strength Club Dornbirn",
          lines: ["Bildgasse 10, Erdgeschoss", "A-6850 Dornbirn"],
          lat: 47.4151713,
          lon: 9.7330917,
          destination: "Bildgasse 10, 6850 Dornbirn, Österreich",
        }}
      />

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Angelina Natter", "Sebastian Santin", "Alexander Konzett"]}
      />

      <ClosingCta
        title="Sichere dir deinen Platz."
        body="Der Strength Club ist auf 100 Mitglieder begrenzt. Schreib uns – wir melden uns mit allen Infos zur Mitgliedschaft."
        topic="Strength Club"
        label="Zur Anmeldung"
      />
    </PageShell>
  );
}
