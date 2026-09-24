import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { contactFormLink } from "@/lib/contact-topics";
import { stories } from "@/lib/stories";
import { PageShell, PageHero, Section, TopicCards, SECTION_Y } from "@/components/site/content";
import { Eyebrow, PillLink } from "@/components/site/Pill";
import { SmartImage } from "@/components/site/SmartImage";
import { StoryCard } from "@/components/site/References";
import { cn } from "@/lib/utils";

const heroImg = "/img/physio-behandlung-1600.webp";
const clubImg = "/img/physio-club-1200.webp";
const florianImg = "/img/florian-winder-1460.webp";

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

const services = [
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
] as const;

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

/* The two stories that are about therapy: Noah's comeback names Florian, and
   Selina's is the back-pain case. Picked by name so reordering the reference
   list cannot swap in an unrelated quote. */
const physioStories = stories.filter((s) => ["Noah Bischof", "Selina Madlener"].includes(s.name));

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

      {/* Four short claims rather than a paragraph: they are what a visitor
          weighs before booking, so they get scanned, not read. */}
      <section className="jh-container jh-gutter">
        <div className="grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="font-display text-[20px] leading-none text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-[22px] leading-[1.25] text-foreground">{p.title}</h2>
              <p className="text-base font-light leading-[1.5] text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="LEISTUNGEN"
        title="Was wir für dich tun"
        action={
          <PillLink {...contactFormLink("Physiotherapie")} variant="outlineOnLight">
            Termin vereinbaren
          </PillLink>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {services.map((s) => (
            <Link
              key={s.title}
              {...s.link}
              className="group flex flex-col overflow-hidden rounded-card bg-muted"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={s.image}
                  alt={s.imageAlt}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[24px] leading-[1.25] text-foreground lg:text-[28px]">
                    {s.title}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <p className="text-base font-light leading-[1.5] text-muted-foreground">{s.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

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

      {/* The Ablauf beside the one portrait-format photo on the page: the
          session in the club shows the steps happening, not a stock gesture. */}
      <section id="ablauf" className="jh-container jh-gutter scroll-mt-24">
        <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16", SECTION_Y)}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-muted lg:aspect-auto">
            <SmartImage
              src={clubImg}
              alt="Physiotherapeutische Übung auf dem Balance-Board im Performance Club"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 size-full object-cover object-[center_60%]"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Eyebrow>ABLAUF</Eyebrow>
              <h2 className="font-display text-balance text-[32px] leading-[1.25] lg:text-[42px]">
                In vier Schritten zurück zu voller Belastbarkeit
              </h2>
            </div>
            <ol className="flex flex-col">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-6 border-t border-border py-6 last:border-b lg:gap-8"
                >
                  <span className="font-display shrink-0 text-[22px] leading-[1.25] text-primary lg:text-[26px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[22px] leading-[1.25] text-foreground lg:text-[24px]">
                      {step.title}
                    </h3>
                    <p className="text-base font-light leading-[1.5] text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The therapist gets a module of his own: the portrait moved out of the
          hero, where it stood for the discipline, to where it stands for him. */}
      <section className="jh-container jh-edge">
        <div className="grid grid-cols-1 gap-10 rounded-card bg-surface p-4 lg:grid-cols-12 lg:gap-16 lg:p-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-image lg:col-span-5">
            <SmartImage
              src={florianImg}
              alt="Florian Winder, Physiotherapeut bei JuklHealth"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center gap-8 px-2 pb-8 lg:col-span-7 lg:px-0 lg:py-12 lg:pr-8">
            <div className="flex flex-col gap-3">
              <Eyebrow className="text-surface-muted-foreground">DEIN PHYSIOTHERAPEUT</Eyebrow>
              <h2 className="font-display text-[32px] leading-[1.25] text-surface-foreground lg:text-[48px]">
                Florian Winder
              </h2>
              <p className="text-xs font-light uppercase tracking-[0.05em] text-surface-foreground/60">
                Physiotherapeut · Athletiktrainer · Personal- & Gruppentrainer
              </p>
            </div>
            <blockquote className="flex flex-col gap-4">
              <span className="font-display text-[48px] leading-[0.5] text-primary" aria-hidden>
                „
              </span>
              <p className="font-display text-balance text-[20px] leading-[1.45] text-surface-foreground lg:text-[24px]">
                Mein Ziel ist es, dich Schritt für Schritt zurück in deinen Sport und deinen Alltag
                zu begleiten. Durch eine klar strukturierte Rehabilitation entwickeln wir gemeinsam
                den schnellsten und sichersten Weg zu deinem Comeback.
              </p>
            </blockquote>
            <div className="flex flex-wrap gap-3">
              <PillLink
                to="/kontakt"
                search={{ topic: "Physiotherapie", trainer: "Florian Winder" }}
                variant="outlineOnDark"
              >
                Termin bei Florian
              </PillLink>
              <PillLink to="/team" variant="quiet">
                Zum ganzen Team
              </PillLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="STIMMEN"
        title="Zurück auf dem Platz – und im Alltag"
        action={
          <PillLink to="/referenzen" variant="outlineOnLight">
            Alle Referenzen
          </PillLink>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          {physioStories.map((story) => (
            <StoryCard key={story.name} story={story} />
          ))}
        </div>
      </Section>

      <Section
        alt
        seamless
        eyebrow="TERMIN"
        title="Bereit für dein Comeback?"
        action={
          <PillLink {...contactFormLink("Physiotherapie")} variant="outlineOnDark">
            Termin vereinbaren
          </PillLink>
        }
      >
        <p className="max-w-[640px]">
          Schreib uns kurz, worum es geht – wir melden uns mit einem Terminvorschlag und klären
          alles Weitere im Erstgespräch.
        </p>
      </Section>
    </PageShell>
  );
}
