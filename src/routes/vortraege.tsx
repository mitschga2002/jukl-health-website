import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  SplitBlock,
  BulletList,
  CTAButton,
} from "@/components/site/content";

const banner = "/img/vortraege-banner-1080.webp";
const video = "/img/vortraege-video.mp4";

export const Route = createFileRoute("/vortraege")({
  head: () => ({
    meta: [
      { title: "Vorträge & Workshops — JuklHealth" },
      {
        name: "description",
        content:
          "Wissenschaft in deinen Alltag — Keynotes, Workshops und Webinare für Unternehmen und Sportinstitutionen.",
      },
      { property: "og:title", content: "Vorträge — JuklHealth" },
      { property: "og:description", content: "Keynotes, Workshops & Webinare." },
    ],
  }),
  component: Vortraege,
});

const referenzen: { year: string; entry: string }[] = [
  { year: "2025", entry: "Speaker Lehrer Konferenz Buchs — Kommunikation & Erfolgsfaktoren Elite-Fußball" },
  { year: "2025", entry: "Energiemanagement im Leistungsfußball — FC St. Gallen" },
  { year: "2025", entry: "VFV UEFA C und UEFA B Lizenz Vortragender" },
  { year: "2025", entry: "Workshopreihe Russmedia — High Performance Energieprinzipien" },
  { year: "2024", entry: "Speaker Tomorrowmind Festival — High Performance Energieprinzipien" },
  { year: "2024", entry: "Workshopreihe Stadt Feldkirch — Gesunder Rücken" },
  { year: "2024", entry: "VFV UEFA C und UEFA B Lizenz Vortragender" },
  { year: "2024", entry: "Energiemanagement im Leistungsfußball — FC St. Gallen" },
  { year: "2024", entry: "Workshopreihe Kindergarten Hohenems — Mehr Beweglichkeit im Alltag" },
  { year: "2023", entry: "Ernährung für den Leistungssport — FC Nenzing" },
  { year: "2023", entry: "VFV UEFA C und UEFA B Lizenz Vortragender" },
  { year: "2023", entry: "Energiemanagement im Leistungsfußball — FC St. Gallen" },
  { year: "2022", entry: "Volksbank Keynote — Leistungsfaktoren Schlaf und Bewegung" },
  { year: "2022", entry: "Ernährung im Sport — SCR Altach" },
  { year: "2021", entry: "Blum — Ernährung für mehr Leistung (Stoffwechselanalyse)" },
  { year: "2021", entry: "Blum — Schlaf für mehr Leistung" },
  { year: "2021", entry: "Ojah Workshop — Bewegung & Emotion im Essverhalten" },
  { year: "2020", entry: "Webinar Reihe Upgrade Yourself" },
  { year: "2020", entry: "UBS Zürich — Bewegung & optimale Leistung" },
  { year: "2019", entry: "Webinar Reihe Upgrade Yourself" },
  { year: "2017", entry: "Erstes eigenes Rhetorik Seminar" },
  { year: "2012–2016", entry: "Tutorien an der Universität Innsbruck" },
];

function Vortraege() {
  return (
    <PageShell>
      <PageHero
        eyebrow="KEYNOTES & WORKSHOPS"
        title="Are you ready to upgrade yourself?"
        intro="Wir bringen Wissenschaft in deinen Alltag — praxisnah, motivierend und sofort umsetzbar."
        image={banner}
        objectPosition="50% 40%"
      />

      <SplitBlock
        eyebrow="FÜR UNTERNEHMEN"
        title="Energie & Fokus im Arbeitsalltag"
        imageLabel="Keynote · Office"
      >
        <BulletList
          items={[
            "High-Performance-Energieprinzipien: Schlaf, Atmung, Ernährung, Bewegung, Wasser",
            "Produktivitäts­rhythmen ohne Burnout — Energie­management & Micro-Breaks",
            "Gesunder Rücken & Beweglichkeit — Routinen für Büro & Homeoffice",
            "Stress- & Emotions­management — Fokus-Atmung & Tools",
            "Stoffwechsel verstehen — Ernährung, die wirklich funktioniert",
          ]}
        />
        <p className="text-muted-foreground text-sm mt-6">
          Formate: Keynote · Impuls · Lunch & Learn · Webinar-Reihe · On-Site oder Online.
        </p>
        <CTAButton to="/kontakt">Anfrage senden</CTAButton>
      </SplitBlock>

      <SplitBlock
        reverse
        eyebrow="FÜR SPORTINSTITUTIONEN"
        title="Leistung steuern · Verletzungsrisiko senken"
        imageLabel="Sport-Institutionen"
      >
        <BulletList
          items={[
            "Energiemanagement im Leistungs­fußball & Teamsport",
            "Ernährungs­strategien & Stoffwechselanalyse",
            "Trainings­zonen & Schwellen­steuerung (Puls/Pace/Watt)",
            "Schlaf, Regeneration & Reise­management",
            "Screening & Prävention — FMS, Mobility, Return-to-Play",
          ]}
        />
      </SplitBlock>

      <Section eyebrow="EINBLICK" title="Live vor Ort">
        <video
          src={video}
          controls
          playsInline
          preload="metadata"
          className="w-full max-w-[280px] sm:max-w-sm lg:max-w-lg mx-auto aspect-[9/16] object-cover bg-foreground"
        />
      </Section>

      <Section eyebrow="REFERENZEN" title="Bisherige Auftritte">
        <ol className="space-y-0 border-t border-foreground/10">
          {referenzen.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[80px_1fr] gap-6 py-4 border-b border-foreground/10 items-baseline"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                {r.year}
              </span>
              <span>{r.entry}</span>
            </li>
          ))}
        </ol>
      </Section>
    </PageShell>
  );
}
