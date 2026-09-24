import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Section, TopicCards, SECTION_Y } from "@/components/site/content";
import { ClosingCta, Pillars } from "@/components/site/ServicePage";
import { Eyebrow, PillLink } from "@/components/site/Pill";
import { cn } from "@/lib/utils";

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
      { property: "og:url", content: "https://juklhealth.com/vortraege" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/vortraege" }],
  }),
  component: Vortraege,
});

const referenzen: { year: string; entry: string }[] = [
  {
    year: "2025",
    entry: "Speaker Lehrer Konferenz Buchs — Kommunikation & Erfolgsfaktoren Elite-Fußball",
  },
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

const jahre = Object.entries(
  referenzen.reduce<Record<string, string[]>>((acc, r) => {
    (acc[r.year] ??= []).push(r.entry);
    return acc;
  }, {}),
).sort((a, b) => b[0].localeCompare(a[0]));

function Vortraege() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="KEYNOTES & WORKSHOPS"
        title="Are you ready to upgrade yourself?"
        intro="Wir bringen Wissenschaft in deinen Alltag — praxisnah, motivierend und sofort umsetzbar."
        image={banner}
        objectPosition="50% 40%"
      />

      {/* The homepage's dark slab: the two audiences are the page's core claim,
          so the section changes key instead of stacking as another light block. */}
      <Section
        alt
        eyebrow="THEMEN"
        title="Zwei Zielgruppen, ein Prinzip"
        action={
          <PillLink {...contactFormLink("Vorträge & Workshops")} variant="outlineOnDark">
            Anfrage senden
          </PillLink>
        }
      >
        <TopicCards
          alt
          items={[
            {
              eyebrow: "Für Unternehmen",
              title: "Energie & Fokus im Arbeitsalltag",
              points: [
                "High-Performance-Energieprinzipien: Schlaf, Atmung, Ernährung, Bewegung, Wasser",
                "Produktivitäts\u00adrhythmen ohne Burnout — Energie\u00admanagement & Micro-Breaks",
                "Gesunder Rücken & Beweglichkeit — Routinen für Büro & Homeoffice",
                "Stress- & Emotions\u00admanagement — Fokus-Atmung & Tools",
                "Stoffwechsel verstehen — Ernährung, die wirklich funktioniert",
              ],
            },
            {
              eyebrow: "Für Sportinstitutionen",
              title: "Leistung steuern · Verletzungsrisiko senken",
              points: [
                "Energiemanagement im Leistungs\u00adfußball & Teamsport",
                "Ernährungs\u00adstrategien & Stoffwechselanalyse",
                "Trainings\u00adzonen & Schwellen\u00adsteuerung (Puls/Pace/Watt)",
                "Schlaf, Regeneration & Reise\u00admanagement",
                "Screening & Prävention — FMS, Mobility, Return-to-Play",
              ],
            },
          ]}
        />
      </Section>

      {/* The video had a section to itself with nothing beside it. Paired with
          the formats line it becomes a block rather than a stray asset. */}
      <section className="jh-container jh-gutter">
        <div
          className={cn(
            "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16",
            SECTION_Y,
          )}
        >
          <video
            src={video}
            controls
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full max-w-[280px] rounded-card bg-foreground object-cover sm:max-w-sm lg:max-w-none"
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>Einblick</Eyebrow>
              <h2 className="font-display text-balance text-[32px] leading-[1.25] lg:text-[42px]">
                Live vor Ort
              </h2>
            </div>
            <p className="max-w-[460px] text-base font-light leading-[1.6] text-muted-foreground lg:text-lg">
              Formate: Keynote · Impuls · Lunch & Learn · Webinar-Reihe · On-Site oder Online.
            </p>
            <div className="flex">
              <PillLink {...contactFormLink("Vorträge & Workshops")} variant="outlineOnLight">
                Anfrage senden
              </PillLink>
            </div>
          </div>
        </div>
      </section>

      <Pillars
        items={[
          {
            title: "Wissenschaftlich fundiert",
            body: "Aktuelle Erkenntnisse aus Sportwissenschaft und Gesundheit – verständlich aufbereitet.",
          },
          {
            title: "Sofort umsetzbar",
            body: "Konkrete Routinen und Tools, die dein Team am nächsten Tag anwenden kann.",
          },
          {
            title: "Motivierend",
            body: "Mit Energie und Praxisbeispielen aus dem Profisport – kein trockener Frontalvortrag.",
          },
          {
            title: "On-Site oder Online",
            body: "Keynote, Impuls, Lunch & Learn oder Webinar-Reihe – bei euch vor Ort oder digital.",
          },
        ]}
      />

      <Section eyebrow="AUFTRITTE" title="Ein Ausschnitt aus vielen Auftritten">
        {/* Grouped by year and flowed into columns: 22 bordered rows made a
            wall, and the year repeated on most of them. */}
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
          {jahre.map(([year, entries]) => (
            <div key={year} className="mb-8 flex break-inside-avoid flex-col gap-2">
              <h3 className="font-display text-[22px] leading-[1.25] text-primary">{year}</h3>
              <ul className="flex flex-col gap-2">
                {entries.map((entry) => (
                  <li key={entry} className="text-base font-light leading-[1.45]">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <ClosingCta
        title="Ein Vortrag für dein Team?"
        body="Schreib uns Thema, Zielgruppe und Wunschtermin – wir melden uns mit einem Vorschlag für Format und Inhalt."
        topic="Vorträge & Workshops"
        label="Anfrage senden"
      />
    </PageShell>
  );
}
