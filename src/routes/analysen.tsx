import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  SplitBlock,
  BulletList,
  CTAButton,
  Testimonial,
  Section,
} from "@/components/site/content";

const analysenHero = "/img/analysen-hero-1446.webp";
const stoffwechsel = "/img/stoffwechsel-1065.webp";
const leistungsanalyse = "/img/leistungsanalyse-1217.webp";
const gesundheitscoaching = "/img/gesundheitscoaching-1400.webp";
const athletiktraining = "/img/athletiktraining-1459.webp";
const physiotherapie = "/img/physiotherapie-1460.webp";

export const Route = createFileRoute("/analysen")({
  head: () => ({
    meta: [
      { title: "Analysen — FMS, Stoffwechsel, Leistung & Physio | JuklHealth" },
      {
        name: "description",
        content:
          "FMS Bewegungsscreening, Stoffwechselanalyse, Leistungsanalyse, Physioanalyse und Gesundheitscoaching bei JuklHealth.",
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
    <PageShell>
      <PageHero
        eyebrow="DATEN & DIAGNOSTIK"
        title="Analysen"
        intro="Living a healthy life is your choice — wir liefern die Daten dazu. Vom FMS bis zum Gesundheitscoaching."
        image={analysenHero}
      />

      <Anchor id="fms" />
      <SplitBlock
        eyebrow="01"
        title="FMS-Bewegungsscreening"
        imageLabel="FMS · Functional Movement Screen"
        image={athletiktraining}
      >
        <p>
          Der Functional Movement Screen (FMS) ist ein standardisiertes Screeningverfahren, das
          einen fundierten Überblick über deine grundlegenden Bewegungsmuster sowie mögliche Stärken
          und Schwächen liefert.
        </p>
        <p>
          Asymmetrien, Bewegungseinschränkungen und muskuläre Defizite können das Verletzungsrisiko
          erhöhen und die Leistungsfähigkeit beeinträchtigen. Auf Basis der Ergebnisse entwickeln
          wir eine gezielte korrigierende Trainingsstrategie, um vorhandene Stärken weiter
          auszubauen und Schwächen gezielt zu verbessern.
        </p>
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </SplitBlock>

      <Anchor id="stoffwechsel" />
      <SplitBlock
        reverse
        eyebrow="02"
        title="Stoffwechselanalyse"
        imageLabel="Stoffwechselanalyse"
        image={stoffwechsel}
      >
        <p>
          Abnehmen, Muskeln aufbauen, den Körper formen oder die Leistung steigern? Mit unseren
          Analyse-Tools machen wir deinen Stoffwechsel sichtbar. Die Stoffwechselanalyse ist seit
          über 40 Jahren ein etabliertes Verfahren in der Sportmedizin.
        </p>
        <p>
          Über deine Atmung wird der Stoffwechsel analysiert: Stoffwechseltyp, Kalorienverbrauch in
          Ruhe und Bewegung, optimaler Pulsbereich für Fettverbrennung — individuell auf dich
          angepasst, wie ein maßgeschneidertes Kleid.
        </p>
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </SplitBlock>

      <Anchor id="leistung" />
      <SplitBlock
        eyebrow="03"
        title="Leistungsanalyse"
        imageLabel="Spiroergometrie · Laufband"
        image={leistungsanalyse}
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
        <p className="text-muted-foreground text-sm mt-6">
          Ablauf ca. 60–75 Min. Optionaler Re-Test nach 8–12 Wochen.
        </p>
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </SplitBlock>

      <Anchor id="physio" />
      <SplitBlock
        reverse
        eyebrow="04"
        title="Physioanalyse"
        imageLabel="Physioanalyse"
        image={physiotherapie}
      >
        <p>
          Dein Körper ist dein Werkzeug. In der Physioanalyse finden wir die Ursache hinter
          Schmerzen, Verspannungen oder Leistungsplateaus. Wir screenen Haltung, Beweglichkeit,
          Kraftverhältnisse (L/R), Stabilität und deine wichtigsten Bewegungsmuster.
        </p>
        <p>
          Am Ende: strukturierter Befund mit Prioritäten, individueller Übungsplan (PDF/Video) mit
          klarer Dosierung — optional verknüpft mit Personal Training, Leistungsanalyse oder deinem
          Performance Club Plan.
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Dauer 60–75 Min. Geeignet bei wiederkehrenden Beschwerden, nach Reha oder zur Senkung des
          Re-Injury-Risikos.
        </p>
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </SplitBlock>

      <Anchor id="coaching" />
      <SplitBlock
        eyebrow="05"
        title="Gesundheitscoaching"
        imageLabel="Gesundheitscoaching"
        image={gesundheitscoaching}
      >
        <p>
          Are you ready to upgrade yourself? Wir streben eine Steigerung deiner Energie,
          Leistungsfähigkeit und deines Wohlbefindens an. Anamnese, Anliegen, Ziele — und dann
          gemeinsam die fünf Säulen stärken.
        </p>
        <BulletList
          items={["Schlaf", "Ernährung", "Bewegung", "Mentale Gesundheit", "Regeneration"]}
        />
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </SplitBlock>

      <Section eyebrow="KUNDENSTIMMEN" title="Stimmen aus der Praxis">
        <div className="grid lg:grid-cols-2 gap-6 not-prose">
          <Testimonial
            quote="Julian setzt sich mit mir und meiner Krankheit auseinander und wendet speziell auf mich angepasste Trainingsmethoden an. Vielfältig und mit viel Spaß."
            name="Ina Ludwig"
            role="Privatperson"
          />
          <Testimonial
            quote="Top motivierter Athletiktrainer mit ausgeprägtem Fachwissen. Athletisch wie konditionell konnte ich enorm zulegen."
            name="Dario Clasadonte"
            role="Mittelfeld · FC St. Gallen"
          />
        </div>
      </Section>
    </PageShell>
  );
}
