import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import { PageShell, PageHero, Listing, ListingRow, BulletList } from "@/components/site/content";
import { ClosingCta, Pillars, StoriesSection } from "@/components/site/ServicePage";

const heroImg = "/img/an-spiro-1200.webp";
const fms = "/img/an-fms-1600.webp";
const performanceScreening = "/img/analysen-hero-1446.webp";
const stoffwechsel = "/img/an-ruheumsatz-1600.webp";
const leistungsanalyse = "/img/leistungsanalyse-1217.webp";
const physioanalyse = "/img/physio-knie-1600.webp";
const gesundheitscoaching = "/img/an-coaching-1600.webp";

export const Route = createFileRoute("/analysen")({
  head: () => ({
    meta: [
      { title: "Analysen — FMS, Stoffwechsel, Leistung & Physio | JuklHealth" },
      {
        name: "description",
        content:
          "FMS Bewegungsscreening, Performance Screening, Stoffwechselanalyse, Leistungsanalyse, Physioanalyse und Gesundheitscoaching bei JuklHealth.",
      },
      { property: "og:title", content: "Analysen — JuklHealth" },
      { property: "og:description", content: "Datenbasis für nachhaltige Leistung & Gesundheit." },
      { property: "og:url", content: "https://juklhealth.com/analysen" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/analysen" }],
  }),
  component: Analysen,
});

function Anchor({ id }: { id: string }) {
  return <span id={id} className="block h-0 scroll-mt-24" aria-hidden />;
}

function Analysen() {
  return (
    <PageShell seamlessFooter>
      <PageHero
        eyebrow="DATEN & DIAGNOSTIK"
        title="Analysen"
        intro="Living a healthy life is your choice – wir liefern die Daten dazu. Vom Bewegungsscreening über Stoffwechsel- und Leistungsanalyse bis zum Gesundheitscoaching: objektive Werte als Basis für dein Training."
        image={heroImg}
        imageAlt="Coach legt einem Athleten die Atemmaske für die Leistungsdiagnostik an"
        objectPosition="50% 30%"
      />

      <Pillars
        items={[
          {
            title: "Objektiv",
            body: "Messwerte statt Bauchgefühl – du siehst schwarz auf weiß, wo du stehst.",
          },
          {
            title: "Individuell",
            body: "Zonen, Schwellen und Empfehlungen, die für deinen Körper gelten, nicht für den Durchschnitt.",
          },
          {
            title: "Verständlich erklärt",
            body: "Jede Analyse endet mit einem Gespräch, in dem wir die Ergebnisse gemeinsam durchgehen.",
          },
          {
            title: "Direkt umsetzbar",
            body: "Die Ergebnisse fließen in dein Training, deine Therapie oder deinen Plan ein.",
          },
        ]}
      />

      <Listing>
        <Anchor id="fms" />
        <ListingRow
          index={1}
          {...contactFormLink("Analysen")}
          title="FMS-Bewegungs­screening"
          image={fms}
          imageAlt="FMS · Functional Movement Screen mit Messstab"
        >
          <p>
            Der Functional Movement Screen (FMS) ist ein standardisiertes Screeningverfahren, das
            einen fundierten Überblick über deine grundlegenden Bewegungsmuster sowie mögliche
            Stärken und Schwächen liefert.
          </p>
          <p>
            Asymmetrien, Bewegungseinschränkungen und muskuläre Defizite können das
            Verletzungsrisiko erhöhen und die Leistungsfähigkeit beeinträchtigen. Auf Basis der
            Ergebnisse entwickeln wir eine gezielte korrigierende Trainingsstrategie, um vorhandene
            Stärken weiter auszubauen und Schwächen gezielt zu verbessern.
          </p>
        </ListingRow>

        <Anchor id="performance-screening" />
        <ListingRow
          index={2}
          {...contactFormLink("Analysen")}
          title="Performance Screening"
          image={performanceScreening}
          imageAlt="Performance Screening · Y-Balance-Test mit Coach"
        >
          <p>
            Das Performance Screening ist eine Testbatterie, angepasst auf deine Sportart. Wir
            erfassen die Fähigkeiten, die in deinem Sport den Unterschied machen – und zeigen, wo
            dein größtes Potenzial liegt.
          </p>
          <BulletList
            items={[
              "Sprungdiagnostik & Reaktivkraft",
              "Schnelligkeit & Richtungswechsel",
              "Maximal- und Schnellkraft",
              "Links/Rechts-Symmetrie",
              "Beweglichkeit & Stabilität",
              "Auswertung mit konkreten Trainingsempfehlungen",
            ]}
          />
        </ListingRow>

        <Anchor id="stoffwechsel" />
        <ListingRow
          index={3}
          {...contactFormLink("Analysen")}
          title="Stoffwechsel­analyse"
          image={stoffwechsel}
          imageAlt="Stoffwechselanalyse: Messung des Ruheumsatzes mit Atemmaske"
        >
          <p>
            Abnehmen, Muskeln aufbauen, den Körper formen oder die Leistung steigern? Mit unseren
            Analyse-Tools machen wir deinen Stoffwechsel sichtbar. Die Stoffwechselanalyse ist seit
            über 40 Jahren ein etabliertes Verfahren in der Sportmedizin.
          </p>
          <p>
            Über deine Atmung wird der Stoffwechsel analysiert: Stoffwechseltyp, Kalorienverbrauch
            in Ruhe und Bewegung, optimaler Pulsbereich für Fettverbrennung — individuell auf dich
            angepasst, wie ein maßgeschneidertes Kleid.
          </p>
        </ListingRow>

        <Anchor id="leistung" />
        <ListingRow
          index={4}
          {...contactFormLink("Analysen")}
          title="Leistungs­analyse"
          image={leistungsanalyse}
          imageAlt="Spiroergometrie · Laufband"
        >
          <p>
            Trainiere nicht „nach Gefühl", sondern auf Basis deiner Daten. Wir ermitteln unter
            definierter Belastung deine individuellen Trainingszonen, aerobe und anaerobe Schwelle
            sowie deinen Energieumsatz — auf Fahrrad­ergometer oder Laufband.
          </p>
          <BulletList
            items={[
              "Persönliche Trainingszonen (Puls / Pace / Watt)",
              "Aerobe & anaerobe Schwelle",
              "Energieprofil: Fett, Kohlenhydrate und Eiweiß",
              "Schwellen für präzise Intensitätssteuerung",
              "Empfehlungen für Umfang, Intervalle, Regeneration",
              "Ausgiebiges Analysegespräch",
            ]}
          />
          <p className="text-sm text-muted-foreground">
            Ablauf ca. 60–75 Min. Optionaler Re-Test nach 8–12 Wochen.
          </p>
        </ListingRow>

        <Anchor id="physio" />
        <ListingRow
          index={5}
          {...contactFormLink("Analysen")}
          title="Physio­analyse"
          image={physioanalyse}
          imageAlt="Physioanalyse: Beinachse und Kniekontrolle bei einer Übung mit Miniband"
        >
          <p>
            Dein Körper ist dein Werkzeug. In der Physioanalyse finden wir die Ursache hinter
            Schmerzen, Verspannungen oder Leistungsplateaus. Wir screenen Haltung, Beweglichkeit,
            Kraftverhältnisse (L/R), Stabilität und deine wichtigsten Bewegungsmuster.
          </p>
          <p>
            Am Ende: strukturierter Befund mit Prioritäten, individueller Übungsplan (PDF/Video) mit
            klarer Dosierung — optional verknüpft mit Personal Training, Leistungsanalyse oder
            deinem Performance Club Plan.
          </p>
          <p className="text-sm text-muted-foreground">
            Dauer 60–75 Min. Geeignet bei wiederkehrenden Beschwerden, nach Reha oder zur Senkung
            des Re-Injury-Risikos.
          </p>
        </ListingRow>

        <Anchor id="coaching" />
        <ListingRow
          index={6}
          {...contactFormLink("Analysen")}
          title="Gesundheits­coaching"
          image={gesundheitscoaching}
          imageAlt="Gesundheitscoaching im Performance Club"
        >
          <p>
            Are you ready to upgrade yourself? Wir streben eine Steigerung deiner Energie,
            Leistungsfähigkeit und deines Wohlbefindens an. Anamnese, Anliegen, Ziele — und dann
            gemeinsam die fünf Säulen stärken.
          </p>
          <BulletList
            items={["Schlaf", "Ernährung", "Bewegung", "Mentale Gesundheit", "Regeneration"]}
          />
        </ListingRow>
      </Listing>

      <StoriesSection
        title="Stimmen aus der Praxis"
        names={["Ina Ludwig", "Dario Clasadonte", "Noah Bischof"]}
      />

      <ClosingCta
        title="Welche Analyse passt zu dir?"
        body="Schreib uns dein Ziel – wir empfehlen dir die passende Analyse und melden uns mit einem Termin."
        topic="Analysen"
      />
    </PageShell>
  );
}
