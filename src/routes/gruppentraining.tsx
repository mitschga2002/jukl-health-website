import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  CourseGrid,
  ExpertGrid,
  OfferCards,
  ProcessSplit,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";

const heroImg = "/img/gruppentraining-1032.webp";
const processImg = "/img/gt-drills-1600.webp";

export const Route = createFileRoute("/gruppentraining")({
  head: () => ({
    meta: [
      { title: "Gruppentraining – JuklHealth" },
      {
        name: "description",
        content:
          "Gruppenkurse in Kleingruppen – HYROX, Mobility, Strength und Burn – sowie Gruppentraining für Freunde, Firmenteams und Mannschaften. Individuelle Korrektur nach dem JuklHealth System.",
      },
      { property: "og:title", content: "Gruppentraining – JuklHealth" },
      {
        property: "og:description",
        content: "Gemeinsam trainieren – mit individueller Betreuung für jeden in der Gruppe.",
      },
      { property: "og:url", content: "https://juklhealth.com/gruppentraining" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/gruppentraining" }],
  }),
  component: Gruppentraining,
});

const courses = [
  {
    name: "HYROX",
    body: "Laufen trifft funktionelle Stationen – gezielte Vorbereitung auf das Fitness-Rennformat.",
    tags: ["Ausdauer", "Functional"],
  },
  {
    name: "Mobility",
    body: "Beweglichkeit und Gelenkkontrolle verbessern – für einen schmerzfreien Alltag und besseres Training.",
    tags: ["Beweglichkeit", "Prävention"],
  },
  {
    name: "Strength",
    body: "Kraft mit sauberer Technik aufbauen – strukturiert, progressiv und individuell korrigiert.",
    tags: ["Kraft", "Technik"],
  },
  {
    name: "Burn",
    body: "Intensives Ganzkörpertraining, das Kondition und Energie auf ein neues Level bringt.",
    tags: ["Kondition", "Intensität"],
  },
] as const;

const formats: OfferCard[] = [
  {
    title: "Private Kleingruppen",
    body: "Mit Partner, Freunden oder Familie trainieren – persönlich betreut und mit gemeinsamen Zielen.",
    image: "/img/gt-partner-1600.webp",
    imageAlt: "Zwei Trainingspartner bei einer Partnerübung",
    link: contactFormLink("Gruppentraining"),
  },
  {
    title: "Firmenteams",
    body: "Bewegung, die im Arbeitsalltag ankommt – für mehr Energie, weniger Beschwerden und ein starkes Team.",
    image: "/img/gt-firma-1600.webp",
    imageAlt: "Coach trainiert mit zwei Teilnehmern im Performance Club",
    link: contactFormLink("Gruppentraining"),
  },
  {
    title: "Vereine & Mannschaften",
    body: "Athletik für euer Team – in der Vorbereitung, der Übergangsphase oder während der Saison.",
    image: "/img/angebot-1508.webp",
    imageAlt: "Mannschaft bei einer Mobility-Einheit auf dem Sportplatz",
    link: { to: "/athletiktraining" },
  },
];

const steps = [
  {
    title: "Kurs wählen oder Gruppe anfragen",
    body: "Melde dich zu einem unserer Kurse an – oder schreib uns, wenn ihr als eigene Gruppe trainieren wollt.",
  },
  {
    title: "Einstieg auf deinem Niveau",
    body: "Wir holen jeden dort ab, wo er steht – Übungen werden an deine aktuelle Leistungsfähigkeit angepasst.",
  },
  {
    title: "Geplante Einheiten",
    body: "Jedes Training wird vorbereitet, ausgewertet und baut auf dem vorherigen auf.",
  },
  {
    title: "Coaching für jeden",
    body: "Korrekturen zu Haltung, Ausführung und Atmung – individuell, auch mitten in der Gruppe.",
  },
];

function Gruppentraining() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="GRUPPENTRAINING"
        title="Gemeinsam stärker."
        intro="In unseren Kleingruppenkursen oder mit deiner eigenen Gruppe: Du trainierst gemeinsam mit anderen – und hast trotzdem einen Coach, der dich im Blick hat und jede Übung korrigiert."
        image={heroImg}
        imageAlt="Gruppentraining mit Gymnastikbällen im Performance Club"
      />

      <OfferCards
        eyebrow="EIGENE GRUPPE"
        title="Ihr bringt die Gruppe, wir den Plan"
        action={
          <PillLink {...contactFormLink("Gruppentraining")} variant="outlineOnLight">
            Gruppe anfragen
          </PillLink>
        }
        items={formats}
      />

      <CourseGrid
        eyebrow="GRUPPENKURSE"
        title="Individuelle Kleingruppenkurse"
        intro="Feste Kurse, zu denen du dich anmeldest – in kleinen Gruppen, damit jeder individuell betreut wird."
        topic="Gruppentraining"
        items={courses}
      />

      <ProcessSplit
        title="So läuft euer Gruppentraining"
        image={processImg}
        imageAlt="Koordinationsübung auf der Trainingsfläche im Performance Club"
        imagePosition="object-[40%_center]"
        steps={steps}
      />

      <ExpertGrid
        eyebrow="DAS TEAM"
        title="Unsere Gruppentrainer"
        slugs={["julian-kleinheinz", "florian-winder", "caroline-fritsch"]}
        topic="Gruppentraining"
      />

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Alexander Konzett", "Ina Ludwig", "Dario Clasadonte"]}
      />

      <ClosingCta
        title="Bereit, gemeinsam loszulegen?"
        body="Melde dich für einen Kurs an oder schreib uns, wer ihr als Gruppe seid – wir melden uns mit den nächsten Terminen."
        topic="Gruppentraining"
        label="Anmelden oder anfragen"
      />
    </PageShell>
  );
}
