import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  CTAButton,
  StatRow,
  TopicCards,
} from "@/components/site/content";
import { CareerTimeline, ClosingCta } from "@/components/site/ServicePage";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/site/SmartImage";
import { Eyebrow } from "@/components/site/Pill";
import { SECTION_Y } from "@/components/site/rhythm";

const banner = "/img/meine-person-banner-1920.webp";
const julianPortrait = "/img/julian-portrait-1460.webp";

export const Route = createFileRoute("/julian-kleinheinz")({
  head: () => ({
    meta: [
      { title: "Julian Kleinheinz – Gründer | JuklHealth" },
      {
        name: "description",
        content:
          "Julian Kleinheinz — Sportwissenschaftler, Athletiktrainer und Gründer von JuklHealth. Werdegang, Vision und Stationen.",
      },
      { property: "og:title", content: "Julian Kleinheinz – JuklHealth" },
      { property: "og:description", content: "Julian Kleinheinz — Werdegang & Vision." },
      { property: "og:url", content: "https://juklhealth.com/julian-kleinheinz" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/julian-kleinheinz" }],
  }),
  component: MeinePerson,
});

const timeline: { year: string; entry: string }[] = [
  { year: "2025", entry: "Eröffnung Strength Club und Trainingsclub Widnau" },
  {
    year: "2023–2026",
    entry: "FC St. Gallen — Leiter Athletik Nachwuchs + Mitarbeit Super League",
  },
  { year: "2021–2023", entry: "Athletiktrainer SCR Altach (1. Bundesliga)" },
  { year: "2021", entry: "Eröffnung des Performance Club" },
  { year: "2021", entry: "Publikation des Buches „Upgrade Yourself“ mit Dailymed" },
  { year: "2020", entry: "Entwicklung des eigenen Gesundheitskonzepts mit Dailymed" },
  { year: "2019–2021", entry: "Athletiktrainer FC Dornbirn (2. Liga)" },
  { year: "seit 2019", entry: "Director of Sports and Movement, Hotel Post Bezau" },
  { year: "2019", entry: "FMSpro Experten Ausbildung" },
  { year: "2019", entry: "Athletiktrainer Hella DSV (Rückrunde, Vorarlbergliga)" },
  { year: "2019", entry: "Os Coach (Ortho und Sport)" },
  { year: "2018/2019", entry: "Coach der Vorarlberger Missen" },
  { year: "seit 2018", entry: "Personal Trainer im Hotel Post Bezau" },
  { year: "seit 2018", entry: "Trainer und Coach diverser Spitzensportler und Privatpersonen" },
  { year: "2017", entry: "Five Rücken- und Gelenks-Konzept Master Zertifikat" },
  { year: "2017/2018", entry: "Trainer Home of Balance" },
  { year: "2017", entry: "Ninja Warrior Austria Athlet" },
  { year: "2017", entry: "Personal Trainingsbetreuung und Lifecoaching" },
  { year: "2016", entry: "Praktikum Jump and Reach (Stefan Kraft, Michael Hayböck)" },
  { year: "2016/2017", entry: "Trainer Body & Soul Innsbruck" },
  { year: "2014", entry: "Sportstudium Universität Innsbruck" },
  { year: "2009", entry: "Abschluss Sportgymnasium Dornbirn" },
];

/* Grouped so the year is stated once per station instead of repeating down the
   rail — 2017 alone carried three rows. A Map, not `Object.entries`: plain
   years are integer-like keys, so an object would reorder them ascending and
   drop the ranges ("seit 2019", "2018/2019") at the end. The array is already
   in the order the page wants, newest first, so insertion order is the order. */
const stationen = [
  ...timeline.reduce((acc, t) => {
    acc.set(t.year, [...(acc.get(t.year) ?? []), t.entry]);
    return acc;
  }, new Map<string, string[]>()),
];

function MeinePerson() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="MEINE PERSON"
        title="Über Julian Kleinheinz"
        intro="Julian Kleinheinz — Sportwissenschaftler, Athletik- und Gesundheitscoach aus Dornbirn."
        image={julianPortrait}
        imageAlt="Julian Kleinheinz"
        imagePosition="top"
      />

      {/* The philosophy beside his portrait: it is written in the first
          person, so it reads as him speaking rather than as page copy. */}
      <section className="jh-container jh-gutter">
        <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16", SECTION_Y)}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-muted lg:col-span-5">
            <SmartImage
              src={banner}
              alt="Julian Kleinheinz"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 size-full object-cover object-[30%_50%]"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 lg:col-span-7">
            <div className="flex flex-col gap-3">
              <Eyebrow>PHILOSOPHIE</Eyebrow>
              <h2 className="font-display text-balance text-[32px] leading-[1.25] lg:text-[42px]">
                Stetiger Lern- und Verbesserungsprozess
              </h2>
            </div>
            <div className="space-y-4 text-base font-light leading-[1.6] text-muted-foreground lg:text-lg">
              <p>
                Ich habe den Drang jeden Tag etwas Neues zu lernen. Dadurch bin ich in einem
                stetigen Lern- und Verbesserungsprozess und immer dabei, mein Wissen und meinen
                Körper auf eine andere, unbekannte Art zu fordern und weiterzuentwickeln.
              </p>
              <p>
                Meine Philosophie besteht darin, in jeder Disziplin etwas zu lernen und
                Bewegungsabläufe sowie motorische Grundeigenschaften auf eine selbstentwickelte Art
                erfolgreich zu schulen. So erreichen Büroathleten und Athleten mit meinem
                Fachwissen, Enthusiasmus und der richtigen Motivation ihre Ziele.
              </p>
              <p>
                Es gibt mir sehr viel Energie, den Prozess zu begleiten und die Weiterentwicklung
                und Fortschritte zu sehen, die uns Step by Step den Zielen näher bringen.
              </p>
            </div>
            <div className="flex pt-2">
              <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
            </div>
          </div>
        </div>
      </section>

      <StatRow
        items={[
          { value: "15+", label: "Jahre Erfahrung" },
          { value: "1.Liga", label: "Athletiktrainer Erfahrung" },
          { value: "3", label: "Clubs, ein System" },
          { value: "∞", label: "Disziplinen" },
        ]}
      />

      <CareerTimeline
        eyebrow="PROFISPORT"
        title="Stationen als Athletiktrainer"
        items={[
          { name: "Hella DSV", period: "2019", detail: "Athletiktraining · Vorarlbergliga" },
          { name: "FC Dornbirn", period: "2019–2021", detail: "Athletiktraining · 2. Liga" },
          { name: "SCR Altach", period: "2021–2023", detail: "Athletiktraining · 1. Bundesliga" },
          {
            name: "FC St. Gallen",
            period: "2023–2026",
            detail: "Leitung Athletik Nachwuchs · Mitarbeit Super League",
          },
        ]}
      />

      {/* Qualifications on the dark slab sit between the two light modules,
          not at the end, where they would run straight into the dark closing
          CTA. */}
      <Section alt eyebrow="QUALIFIKATIONEN" title="Ausbildung & Zertifikate">
        <TopicCards
          alt
          items={[
            {
              eyebrow: "Studium",
              title: "Sportwissenschaft",
              points: ["Sportwissenschaftler (BSc, Universität Innsbruck)"],
            },
            {
              eyebrow: "Zertifikate",
              title: "Screening & Therapie",
              points: [
                "FMSpro Experte · Functional Movement Screen",
                "Os Coach — Ortho & Sport",
                "Five Rücken- und Gelenks-Konzept Master",
              ],
            },
            {
              eyebrow: "Autor",
              title: "Upgrade Yourself",
              points: ["Buch „Upgrade Yourself“ mit Dailymed"],
            },
          ]}
        />
      </Section>

      <Section eyebrow="LEBEN" title="Werdegang">
        {/* 22 bordered rows read as a wall, and the hairline between every one
            of them is the divider the rest of the site never draws. A rail
            instead: one line down the page, a marker per year, and the years
            themselves in display type doing the structuring. */}
        <ol className="relative flex flex-col gap-8 pl-8 lg:gap-10 lg:pl-0">
          {stationen.map(([year, entries], i) => (
            <li
              key={year}
              className="relative grid grid-cols-1 gap-2 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-0"
            >
              {/* One segment per station rather than a single rail behind the
                  list: a rail spanning the <ol> can only end at the last
                  station's *text*, leaving a thread hanging past the final
                  marker. Each segment reaches from its own marker to the next
                  one — the negative bottom is the flex gap it has to cross — so
                  the last station simply draws none and the line stops on the
                  dot. Only the first is tinted, which is all the original
                  gradient was saying: this end is the present. */}
              {i < stationen.length - 1 ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-8 -left-8 top-[0.55em] w-px -translate-x-1/2 lg:-bottom-10 lg:left-52",
                    i === 0 ? "bg-gradient-to-b from-primary/60 to-border" : "bg-border",
                  )}
                />
              ) : null}
              {/* Sits on the rail, and its ring is the background colour — the
                  line appears to break around each marker rather than run under it. */}
              <span
                aria-hidden
                className="absolute -left-8 top-[0.55em] size-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background lg:left-52"
              />
              {/* "2023–2026" and "seit 2019" are a hair wider than the column
                  was, so they broke across two lines beside a one-line entry.
                  There is room on the rail for a wider column, and `nowrap`
                  holds the promise; below lg the year is on its own full-width
                  line, where wrapping is free and harmless. */}
              <h3 className="font-display text-[22px] leading-[1.25] text-primary lg:whitespace-nowrap lg:pr-10 lg:text-right">
                {year}
              </h3>
              <ul className="flex flex-col gap-2 lg:pl-10">
                {entries.map((entry) => (
                  <li
                    key={entry}
                    className="max-w-[620px] text-base leading-[1.45] text-foreground lg:text-lg"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta
        title="Lass uns sprechen."
        body="Ob Training, Athletik oder ein Vortrag für dein Team – schreib mir, und wir finden gemeinsam den richtigen Weg."
        topic="Allgemeine Anfrage"
      />
    </PageShell>
  );
}
