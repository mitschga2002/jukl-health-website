import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, TopicCards } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  ExpertSlab,
  OfferCards,
  Pillars,
  ProcessSplit,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";

const heroImg = "/img/physio-behandlung-1600.webp";
const clubImg = "/img/physio-club-1200.webp";

export const Route = createFileRoute("/physiotherapie")({
  head: () => ({
    meta: [
      { title: "Physiotherapie – JuklHealth" },
      {
        name: "description",
        content:
          "Aktive Physiotherapie und Sportphysiotherapie nach dem JuklHealth System: Ursache finden, gezielt behandeln und stärker zurück in Sport und Alltag – für Freizeit- und Profisportler.",
      },
      { property: "og:title", content: "Physiotherapie – JuklHealth" },
      {
        property: "og:description",
        content: "Aktive Physiotherapie und Sportphysiotherapie nach dem JuklHealth System.",
      },
      { property: "og:url", content: "https://juklhealth.com/physiotherapie" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/physiotherapie" }],
  }),
  component: Physio,
});

const pillars = [
  {
    title: "Know-how aus dem Profisport",
    body: "Wir betreuen Profis und Vereine – dieselben Standards gelten für jeden, der zu uns kommt.",
  },
  {
    title: "Evidenzbasiert",
    body: "Diagnostik und Therapie nach aktuellem Stand der Wissenschaft, messbar statt nach Gefühl.",
  },
  {
    title: "Aktive Therapie",
    body: "Manuelle Techniken, wo sie helfen – im Zentrum steht, was du selbst an Belastbarkeit aufbaust.",
  },
  {
    title: "Physio & Training aus einer Hand",
    body: "Therapie, Trainingstherapie und Athletik greifen nahtlos ineinander – ein System, ein Team.",
  },
] as const;

const services: OfferCard[] = [
  {
    title: "Aktive Physiotherapie",
    body: "Schmerzen reduzieren und Beweglichkeit zurückgewinnen – mit gezielter Behandlung und Übungen, die du in deinen Alltag mitnimmst.",
    image: "/img/physio-knie-1600.webp",
    imageAlt: "Physiotherapeut korrigiert die Beinachse bei einer Übung mit Miniband",
    link: contactFormLink("Physiotherapie"),
  },
  {
    title: "Sportphysiotherapie & Reha",
    body: "Strukturierte Rehabilitation nach Verletzung oder Operation, etwa am Kreuzband – bis zur Return-to-Sport-Testung.",
    image: "/img/physio-sprunggelenk-1600.webp",
    imageAlt: "Stabilitätsübung für das Sprunggelenk auf dem Balance-Board",
    link: { to: "/trainingstherapie" },
  },
  {
    title: "Prävention & Athletik",
    body: "Kraft, Stabilität und Koordination gezielt aufbauen, damit Verletzungen gar nicht erst entstehen.",
    image: "/img/athletiktraining-1459.webp",
    imageAlt: "Athletiktraining zur Verletzungsprävention",
    link: { to: "/athletiktraining" },
  },
];

const steps = [
  {
    title: "Anamnese & Befund",
    body: "Wir nehmen uns Zeit für deine Geschichte, deine Ziele und vorhandene Befunde.",
  },
  {
    title: "Physiotherapeutische Diagnostik",
    body: "Beweglichkeit, Kraft, Stabilität und Bewegungsmuster – wir suchen die Ursache, nicht nur das Symptom.",
  },
  {
    title: "Individueller Therapieplan",
    body: "Klare Ziele und Maßnahmen, abgestimmt auf deinen Alltag, deinen Sport und deine Belastbarkeit.",
  },
  {
    title: "Aktive Umsetzung & Return to Sport",
    body: "Behandlung und progressives Training bis zu objektiven Testungen, die zeigen: Du bist bereit.",
  },
] as const;

function Physio() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="PHYSIOTHERAPIE"
        title="Stärker zurück in Sport und Alltag."
        intro="Aktive Physiotherapie und Sportphysiotherapie nach dem JuklHealth System: Wir finden die Ursache deiner Beschwerden, behandeln gezielt und bauen deine Belastbarkeit Schritt für Schritt wieder auf – vom Freizeit- bis zum Profisport."
        image={heroImg}
        imageAlt="Physiotherapeut Florian Winder bei der Behandlung am Knie"
        objectPosition="30% 50%"
      />

      <Pillars items={pillars} />

      <OfferCards
        eyebrow="LEISTUNGEN"
        title="Was wir für dich tun"
        action={
          <PillLink {...contactFormLink("Physiotherapie")} variant="outlineOnLight">
            Termin vereinbaren
          </PillLink>
        }
        items={services}
      />

      <Section alt eyebrow="SCHWERPUNKTE" title="Worauf wir spezialisiert sind">
        <TopicCards
          alt
          items={[
            {
              eyebrow: "Knie",
              title: "Kreuzband, Meniskus & Knorpel",
              points: [
                "Konservativ oder nach Operation",
                "Stabilität, Kraft und Beinachse",
                "Strukturierter Weg zurück in den Sport",
              ],
            },
            {
              eyebrow: "Sprunggelenk & Hüfte",
              title: "Umknicktrauma, Impingement & Arthrose",
              points: [
                "Akute Verletzungen und chronische Instabilität",
                "Beweglichkeit und Belastbarkeit der Hüfte",
                "Gelenkschonender Kraftaufbau",
              ],
            },
            {
              eyebrow: "Rücken, Schulter & Muskulatur",
              title: "Schmerzen, Zerrungen & Dysbalancen",
              points: [
                "Akute und chronische Rücken- und Schulterschmerzen",
                "Muskelfaserrisse und Zerrungen",
                "Haltung und Bewegungsmuster korrigieren",
              ],
            },
          ]}
        />
      </Section>

      <ProcessSplit
        id="ablauf"
        title="In vier Schritten zurück zu voller Belastbarkeit"
        image={clubImg}
        imageAlt="Physiotherapeutische Übung auf dem Balance-Board im Performance Club"
        imagePosition="object-[center_60%]"
        steps={steps}
      />

      {/* The therapist gets a module of his own: the portrait moved out of the
          hero, where it stood for the discipline, to where it stands for him. */}
      <ExpertSlab
        slug="florian-winder"
        eyebrow="DEIN PHYSIOTHERAPEUT"
        quote="Mein Ziel ist es, dich Schritt für Schritt zurück in deinen Sport und deinen Alltag zu begleiten. Durch eine klar strukturierte Rehabilitation entwickeln wir gemeinsam den schnellsten und sichersten Weg zu deinem Comeback."
        topic="Physiotherapie"
        bookLabel="Termin bei Florian"
      />

      {/* Noah's comeback names Florian, Selina's is the back-pain case and
          Sebastian's stands for prevention: years without injury. */}
      <StoriesSection
        title="Zurück auf dem Platz – und im Alltag"
        names={["Noah Bischof", "Selina Madlener", "Sebastian Santin"]}
      />

      <ClosingCta
        title="Bereit für dein Comeback?"
        body="Schreib uns kurz, worum es geht – wir melden uns mit einem Terminvorschlag und klären alles Weitere im Erstgespräch."
        topic="Physiotherapie"
      />
    </PageShell>
  );
}
