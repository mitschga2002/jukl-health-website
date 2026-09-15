import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  CTAButton,
  ImagePlaceholder,
} from "@/components/site/content";
import { Eyebrow, PillAnchor, PillLink } from "@/components/site/Pill";
import { cn } from "@/lib/utils";

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
  const copy = (
    <div className={cn("flex flex-col justify-center gap-6", m.image && m.reverse && "lg:order-1")}>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-balance text-[32px] leading-[1.25] lg:text-[42px]">
          {m.name}
        </h2>
        <Eyebrow className="text-xs text-primary">{m.role}</Eyebrow>
      </div>
      <p className="max-w-[560px] text-base font-light leading-[1.6] text-muted-foreground lg:text-lg">
        „{m.quote}"
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <PillLink to="/kontakt" search={{ trainer: m.name }}>
          Termin vereinbaren
        </PillLink>
        {m.learnMore ? (
          <PillAnchor href={m.learnMore} variant="outlineOnLight">
            Mehr erfahren
          </PillAnchor>
        ) : null}
      </div>
    </div>
  );

  if (!m.image) {
    return (
      <section className="jh-container jh-gutter">
        <div className="py-10 lg:py-24">{copy}</div>
      </section>
    );
  }

  return (
    <section className="jh-container jh-gutter">
      <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className={m.reverse ? "lg:order-2" : ""}>
          <ImagePlaceholder label={m.name} ratio="square" image={m.image} />
        </div>
        {copy}
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
        banner
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
