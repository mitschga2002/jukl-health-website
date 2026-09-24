import { FlaskConical, Focus, MapPin, TrendingUp } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import {
  ClosingCta,
  ExpertGrid,
  OfferCards,
  Pillars,
  ProcessSplit,
  StoriesSection,
  type OfferCard,
} from "@/components/site/ServicePage";

const heroImg = "/img/pt-coaching-1600.webp";
const processImg = "/img/pt-motivation-1200.webp";

export const Route = createFileRoute("/personaltraining")({
  head: () => ({
    meta: [
      { title: "Personal Training – JuklHealth" },
      {
        name: "description",
        content:
          "1:1 Personal Training in Dornbirn und Widnau: Anamnese, Bewegungsanalyse, individueller Plan und messbare Fortschritte – mit deinem persönlichen Coach nach dem JuklHealth System.",
      },
      { property: "og:title", content: "Personal Training – JuklHealth" },
      {
        property: "og:description",
        content: "1:1 Personal Training mit voller Aufmerksamkeit – in Dornbirn und Widnau.",
      },
      { property: "og:url", content: "https://juklhealth.com/personaltraining" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/personaltraining" }],
  }),
  component: PersonalTraining,
});

const pillars = [
  {
    icon: Focus,
    title: "Volle Aufmerksamkeit",
    body: "Ein Coach, nur du – jede Wiederholung wird gesehen und korrigiert.",
  },
  {
    icon: FlaskConical,
    title: "Wissenschaftlich fundiert",
    body: "Anamnese und Bewegungsanalyse zu Beginn, Training nach aktuellem Stand der Sportwissenschaft.",
  },
  {
    icon: TrendingUp,
    title: "Messbare Fortschritte",
    body: "Jede Einheit wird geplant, ausgewertet und baut auf der letzten auf – Fortschritt, den du siehst.",
  },
  {
    icon: MapPin,
    title: "Dornbirn & Widnau",
    body: "Personal Training an unseren Standorten in Vorarlberg und im St. Galler Rheintal.",
  },
];

const goals: OfferCard[] = [
  {
    title: "Kraft & Athletik",
    body: "Stärker, schneller, belastbarer – mit sauberer Technik und einem Plan, der dich konsequent weiterbringt.",
    image: "/img/pt-kraft-1600.webp",
    imageAlt: "Coach begleitet eine Kundin beim Kreuzheben",
    link: contactFormLink("Personal Training"),
  },
  {
    title: "Gesundheit & Haltung",
    body: "Weniger Beschwerden, mehr Energie im Alltag – ideal bei Bürotätigkeit und für jedes Alter.",
    image: "/img/pt-gesundheit-1600.webp",
    imageAlt: "Coach trainiert mit einem Kunden am Schlingentrainer",
    imagePosition: "object-[center_40%]",
    link: contactFormLink("Personal Training"),
  },
  {
    title: "Comeback nach Verletzung",
    body: "Der sichere Weg zurück zu voller Belastbarkeit – eng abgestimmt mit unserer Physio- und Trainingstherapie.",
    image: "/img/pt-comeback-1600.webp",
    imageAlt: "Coach begleitet eine Kundin bei einer Rumpfübung",
    link: { to: "/trainingstherapie" },
  },
];

const steps = [
  {
    title: "Kennenlernen & Anamnese",
    body: "Wir besprechen deine Ziele, deine Geschichte und deinen aktuellen Gesundheits- und Fitnesszustand.",
  },
  {
    title: "Bewegungsanalyse",
    body: "Der Functional Movement Screen zeigt Stärken, Einschränkungen und Asymmetrien – die Basis für deinen Plan.",
  },
  {
    title: "Dein individueller Plan",
    body: "Übungen, Umfang und Intensität, abgestimmt auf deine Leistungsfähigkeit und deinen Alltag.",
  },
  {
    title: "Training, Coaching & Re-Checks",
    body: "Coaching zu Ausführung, Haltung und Atmung in jeder Einheit – und regelmäßige Re-Checks, die zeigen, wo du stehst.",
  },
];

function PersonalTraining() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="PERSONAL TRAINING"
        title="Dein Training. Deine Ziele. Volle Aufmerksamkeit."
        intro="Im 1:1 Personal Training widmen wir uns ganz dir: Wir erkennen, wo du stehst, setzen klare Ziele und arbeiten Schritt für Schritt an nachhaltigen Verbesserungen – in Dornbirn und Widnau."
        image={heroImg}
        imageAlt="Coach korrigiert eine Kundin bei einer Ausfallschritt-Übung im Performance Club"
        objectPosition="55% 50%"
      />

      <Pillars items={pillars} />

      <OfferCards
        eyebrow="ZIELE"
        title="Wofür du mit uns trainierst"
        action={
          <PillLink {...contactFormLink("Personal Training")} variant="outlineOnLight">
            Jetzt anfragen
          </PillLink>
        }
        items={goals}
      />

      <ProcessSplit
        title="So arbeiten wir zusammen"
        image={processImg}
        imageAlt="Coach und Kundin klatschen sich nach dem Training ab"
        imagePosition="object-[center_30%]"
        steps={steps}
      />

      <ExpertGrid
        eyebrow="DAS TEAM"
        title="Unsere Personal Trainer"
        slugs={["julian-kleinheinz", "florian-winder", "caroline-fritsch"]}
        topic="Personal Training"
      />

      <StoriesSection
        title="Was unsere Kunden sagen"
        names={["Angelina Natter", "Sebastian Santin", "Ina Ludwig"]}
      />

      <ClosingCta
        title="Bereit für dein erstes Training?"
        body="Schreib uns, was du erreichen willst – wir melden uns mit einem Terminvorschlag für dein Kennenlerngespräch."
        topic="Personal Training"
        label="Jetzt anfragen"
      />
    </PageShell>
  );
}
