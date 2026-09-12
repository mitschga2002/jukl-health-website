import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  CTAButton,
  ImagePlaceholder,
} from "@/components/site/content";

const teamBanner = "/img/team-banner-1824.webp";
const julianPortrait = "/img/julian-portrait-1460.webp";
const florianWinder = "/img/florian-winder-1460.webp";
const carolineFritsch = "/img/caroline-fritsch-1387.webp";
const biljanaKleinheinz = "/img/biljana-kleinheinz-1458.webp";
const aminElghazzali = "/img/amin-elghazzali-1460.webp";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team – JuklHealth Performance Club Dornbirn" },
      {
        name: "description",
        content:
          "Das Team von JuklHealth: Sportwissenschaft, Physiotherapie, Coaching, Personal Training und Marketing – vereint in Dornbirn.",
      },
      { property: "og:title", content: "Team – JuklHealth" },
      {
        property: "og:description",
        content: "Sportwissenschaft, Physiotherapie und Coaching aus einer Hand.",
      },
      { property: "og:url", content: "https://juklhealth.com/team" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/team" }],
  }),
  component: Team,
});

type Member = {
  name: string;
  slug: string;
  role: string;
  quote: string;
  learnMore?: string;
  reverse?: boolean;
  image?: string;
};

const members: Member[] = [
  {
    name: "Julian Kleinheinz, BSc",
    slug: "julian-kleinheinz",
    image: julianPortrait,
    role: "Sportwissenschaftler · Personal Trainer · Athletiktrainer · Gruppentrainer · Gesundheitscoach",
    quote:
      "Ich habe den Drang jeden Tag etwas Neues zu lernen. Dadurch bin ich in einem stetigen Lern- und Verbesserungsprozess und immer dabei, mein Wissen und meinen Körper auf eine andere, unbekannte Art zu fordern und weiterzuentwickeln. Meine Philosophie besteht darin, in jeder Disziplin etwas zu lernen und Bewegungsabläufe sowie motorische Grundeigenschaften auf eine selbstentwickelte Art erfolgreich zu schulen.",
    learnMore: "/meine-person",
  },
  {
    name: "Florian Winder",
    slug: "florian-winder",
    image: florianWinder,
    role: "Physiotherapeut · Athletiktrainer · Personal- & Gruppentrainer",
    quote:
      "Mein Ziel ist es, dich Schritt für Schritt zurück in deinen Sport und deinen Alltag zu begleiten. Durch eine klar strukturierte Rehabilitation entwickeln wir gemeinsam den schnellsten und sichersten Weg zu deinem Comeback. (Kraft-)Training ist meine Leidenschaft, und genau dieses Wissen möchte ich weitergeben. Denn Training bedeutet weit mehr als nur körperliche Anstrengung.",
    reverse: true,
  },
  {
    name: "Caroline Fritsch",
    slug: "caroline-fritsch",
    image: carolineFritsch,
    role: "Personal Trainer · Coach",
    quote:
      "Sport begleitet mich, seit ich denken kann. Aus dieser Leidenschaft ist der Wunsch entstanden, Menschen zu zeigen, wie viel Freude, Stärke und Energie in Bewegung steckt. Kein Training ist wie das andere, jeder Mensch, jedes Ziel, jede Einheit ist einzigartig.",
  },
  {
    name: "Biljana Kleinheinz, MMSc",
    slug: "biljana-kleinheinz",
    image: biljanaKleinheinz,
    role: "Coach · Marketing",
    reverse: true,
    quote:
      "Mein Antrieb, täglich Neues über Menschen, ihre Gedanken und Emotionen zu lernen, hält mich in einem stetigen Lern- und Entwicklungsprozess. Mit Einfühlungsvermögen und wissenschaftlich fundierten mentalen Methoden helfe ich, innere Hürden zu überwinden.",
  },
  {
    name: "Amin Elghazzali, B.A.",
    slug: "amin-elghazzali",
    image: aminElghazzali,
    role: "Brand Manager · Marketing",
    quote:
      "Mein Antrieb ist es, Menschen über Bilder, Geschichten und Begegnungen besser zu verstehen. Mit Aufmerksamkeit, Ehrlichkeit und einem offenen Blick versuche ich Inhalte zu schaffen, die nicht nur konsumiert, sondern gefühlt werden.",
  },
];

function MemberBlock({ m }: { m: Member }) {
  if (!m.image) {
    return (
      <section className="border-b border-foreground/10">
        <div className="px-6 lg:px-12 py-16 lg:py-24 flex flex-col items-center text-center">
          <h2 className="font-display text-3xl lg:text-5xl tracking-tight leading-[1.05] mb-3">
            {m.name}
          </h2>
          <p className="text-xs uppercase tracking-[0.22em] text-primary mb-6">{m.role}</p>
          <p className="text-base lg:text-lg leading-relaxed text-muted-foreground max-w-2xl">
            „{m.quote}"
          </p>
          <div className="flex gap-3 flex-wrap justify-center pt-2">
            <Link
              to="/kontakt"
              search={{ trainer: m.name }}
              className="inline-block mt-8 bg-primary text-primary-foreground px-8 py-4 font-display text-sm hover:bg-primary-hover"
            >
              Termin vereinbaren
            </Link>
            {m.learnMore ? (
              <a
                href={m.learnMore}
                className="inline-block mt-8 border border-foreground px-8 py-4 font-display text-sm hover:bg-foreground hover:text-background"
              >
                Mehr erfahren
              </a>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="grid lg:grid-cols-2 border-b border-foreground/10">
      <div className={m.reverse ? "lg:order-2" : ""}>
        <ImagePlaceholder label={m.name} ratio="square" className="h-full" image={m.image} />
      </div>
      <div
        className={`px-6 lg:px-12 py-16 lg:py-24 flex flex-col justify-center ${
          m.reverse ? "lg:order-1" : ""
        }`}
      >
        <h2 className="font-display text-3xl lg:text-5xl tracking-tight leading-[1.05] mb-3">
          {m.name}
        </h2>
        <p className="text-xs uppercase tracking-[0.22em] text-primary mb-6">{m.role}</p>
        <p className="text-base lg:text-lg leading-relaxed text-muted-foreground max-w-xl">
          „{m.quote}"
        </p>
        <div className="flex gap-3 flex-wrap pt-2">
          <Link
            to="/kontakt"
            search={{ trainer: m.name }}
            className="inline-block mt-8 bg-primary text-primary-foreground px-8 py-4 font-display text-sm hover:bg-primary-hover"
          >
            Termin vereinbaren
          </Link>
          {m.learnMore ? (
            <a
              href={m.learnMore}
              className="inline-block mt-8 border border-foreground px-8 py-4 font-display text-sm hover:bg-foreground hover:text-background"
            >
              Mehr erfahren
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Unsere Vision"
        title="Unser Team – Experten für Performance & Gesundheit"
        intro="Freude verspüren und Lebensqualität steigern. Das ist unser Antrieb, als Team aus Sportwissenschaft, Physiotherapie, Coaching und Marketing."
        image={teamBanner}
        imageAlt="Das Team von JuklHealth im Performance Club Dornbirn"
        imageFit="contain"
      />

      {members.map((m) => (
        <MemberBlock key={m.slug} m={m} />
      ))}

      <Section eyebrow="Karriere" title="Werde Teil des Teams.">
        <p>
          Du brennst für Bewegung, Sportwissenschaft oder Physiotherapie? Schreib uns – wir freuen
          uns über initiative Bewerbungen.
        </p>
        <CTAButton to="/kontakt">Bewerben</CTAButton>
      </Section>
    </PageShell>
  );
}
