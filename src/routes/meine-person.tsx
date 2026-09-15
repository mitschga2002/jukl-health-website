import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  SplitBlock,
  CTAButton,
  StatRow,
} from "@/components/site/content";
import { cn } from "@/lib/utils";

const banner = "/img/meine-person-banner-1920.webp";
const julianPortrait = "/img/julian-portrait-1460.webp";

export const Route = createFileRoute("/meine-person")({
  head: () => ({
    meta: [
      { title: "Meine Person — Julian Kleinheinz | JuklHealth" },
      {
        name: "description",
        content:
          "Julian Kleinheinz — Sportwissenschaftler, Athletiktrainer und Gründer von JuklHealth. Werdegang, Vision und Stationen.",
      },
      { property: "og:title", content: "Meine Person — JuklHealth" },
      { property: "og:description", content: "Julian Kleinheinz — Werdegang & Vision." },
      { property: "og:url", content: "https://juklhealth.com/meine-person" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/meine-person" }],
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
    <PageShell>
      <PageHero
        eyebrow="MEINE PERSON"
        title="Über Julian Kleinheinz"
        intro="Julian Kleinheinz — Sportwissenschaftler, Athletik- und Gesundheitscoach aus Dornbirn."
        image={banner}
        objectPosition="30% 50%"
      />

      <Section eyebrow="PHILOSOPHIE" title="Stetiger Lern- und Verbesserungsprozess">
        <p>
          Ich habe den Drang jeden Tag etwas Neues zu lernen. Dadurch bin ich in einem stetigen
          Lern- und Verbesserungsprozess und immer dabei, mein Wissen und meinen Körper auf eine
          andere, unbekannte Art zu fordern und weiterzuentwickeln.
        </p>
        <p>
          Meine Philosophie besteht darin, in jeder Disziplin etwas zu lernen und Bewegungsabläufe
          sowie motorische Grundeigenschaften auf eine selbstentwickelte Art erfolgreich zu schulen.
          So erreichen Büroathleten und Athleten mit meinem Fachwissen, Enthusiasmus und der
          richtigen Motivation ihre Ziele.
        </p>
        <p>
          Es gibt mir sehr viel Energie, den Prozess zu begleiten und die Weiterentwicklung und
          Fortschritte zu sehen, die uns Step by Step den Zielen näher bringen.
        </p>
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>

      <StatRow
        items={[
          { value: "15+", label: "Jahre Erfahrung" },
          { value: "1.Liga", label: "Athletiktrainer Erfahrung" },
          { value: "3", label: "Clubs Vorarlberg / Widnau" },
          { value: "∞", label: "Disziplinen" },
        ]}
      />

      <SplitBlock
        eyebrow="STATIONEN"
        title="Lebenslauf"
        imageLabel="Portrait · Julian Kleinheinz"
        image={julianPortrait}
      >
        <p>
          Über 15 Jahre Praxis in Spitzensport, Athletik, Physiotherapie-Schnittstelle und
          Gesundheitscoaching — auf höchstem Niveau und im Alltag von Büroathleten.
        </p>
      </SplitBlock>

      <Section eyebrow="LEBEN" title="Werdegang">
        {/* 22 bordered rows read as a wall, and the hairline between every one
            of them is the divider the rest of the site never draws. A rail
            instead: one line down the page, a marker per year, and the years
            themselves in display type doing the structuring. */}
        <ol className="relative flex flex-col gap-8 pl-8 lg:gap-10 lg:pl-0 mb-12 lg:mb-16">
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
        <BulletList
          title="Qualifikationen"
          items={[
            "Sportwissenschaftler (BSc, Universität Innsbruck)",
            "FMSpro Experte · Functional Movement Screen",
            "Os Coach — Ortho & Sport",
            "Five Rücken- und Gelenks-Konzept Master",
            "Autor „Upgrade Yourself“ (Dailymed)",
          ]}
        />
      </Section>
    </PageShell>
  );
}
