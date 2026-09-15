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
        <ol className="overflow-hidden rounded-card border border-border">
          {timeline.map((t, i) => (
            <li
              key={i}
              className="grid grid-cols-[110px_1fr] items-baseline gap-6 border-b border-border px-6 py-5 last:border-b-0"
            >
              <span className="text-xs font-light uppercase leading-tight tracking-wider text-primary">
                {t.year}
              </span>
              <span className="text-base lg:text-lg">{t.entry}</span>
            </li>
          ))}
        </ol>
        <BulletList
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
