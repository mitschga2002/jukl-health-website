import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  SplitBlock,
  BulletList,
  CTAButton,
  Testimonial,
} from "@/components/site/content";

const trainingBanner = "/img/training-banner-1588.webp";
const personalTraining = "/img/personal-training-1458.webp";
const gruppentraining = "/img/gruppentraining-1032.webp";
const athletiktraining = "/img/athletiktraining-1459.webp";
const physiotherapie = "/img/physiotherapie-1460.webp";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Training — JuklHealth Performance Club" },
      {
        name: "description",
        content:
          "Personal, Gruppen-, Athletiktraining, Physiotherapie und Trainingstherapie — wissenschaftlich fundiert, im Performance Club oder draußen in der Natur.",
      },
      { property: "og:title", content: "Training — JuklHealth" },
      {
        property: "og:description",
        content:
          "Alle Trainingsformate im Überblick — vom Personal Training bis zur Trainingstherapie.",
      },
    ],
  }),
  component: Training,
});

const ablauf = [
  "Aufnahme Ist-Zustand mit einer Anamnese",
  "Aufnahme Ist-Zustand mit dem FMS (Functional Movement Screen)",
  "Persönliche Ziele besprechen und definieren",
  "Individuelle Abstimmung des Trainingsplans",
  "Erste Trainings auf momentane Verfassung angepasst",
  "Jede Einheit wird vor- und nachbereitet",
  "Jedes Training baut auf den vorherigen Einheiten auf",
  "Inputs zu Haltung, Ausführung, Atmung und Konzentration",
  "Nach zwei Trainings spürbare Verbesserung",
];

function Training() {
  return (
    <PageShell>
      <PageHero
        eyebrow="TRAINING"
        title="Training & Physiotherapie"
        intro="Ob im Performance Club oder draußen im Grünen, ob Spitzen- oder Breitensportler — wir entwickeln gemeinsam ein auf dich abgestimmtes Programm für nachhaltige Ergebnisse."
        image={trainingBanner}
      />

      <Section eyebrow="VERSPRECHEN" title="Was du dir aus unseren Trainings versprechen kannst">
        <BulletList
          items={[
            "100 % Leidenschaft",
            "Spaß & Motivation",
            "Professionalität",
            "Individuelles Training",
            "Individuelle Terminvereinbarung",
            "Verletzungsprävention & Rehabilitation",
            "Nachhaltige Ergebnisse",
            "Bessere körperliche Leistungsfähigkeit",
            "Fettreduktion · Muskelaufbau",
            "Verbesserte Körperhaltung",
            "Weniger Beschwerden im Alltag und Sport",
            "Wertvolle Zeit mit Partner & Freunden",
          ]}
        />
        <CTAButton to="/kontakt">Jetzt anfragen</CTAButton>
      </Section>

      <SplitBlock
        eyebrow="01 · PERSONAL"
        title="Personal Training"
        imageLabel="Personal Training"
        image={personalTraining}
      >
        <p>
          Gerne widmen wir dir exklusiv unsere Aufmerksamkeit, um gezielt Wünsche im Detail
          nachzugehen oder gewissen Problemzonen auf den Zahn zu fühlen.
        </p>
        <BulletList items={ablauf.slice(0, 6)} />
      </SplitBlock>

      <SplitBlock
        reverse
        eyebrow="02 · GROUP"
        title="Gruppentraining"
        imageLabel="Gruppentraining"
        image={gruppentraining}
      >
        <p>
          Mehr Spaß beim Training in kleinen Gruppen. Trainiere mit Kollegen, Freunden oder Partner
          — im Performance Club oder draußen in der Natur.
        </p>
        <BulletList
          items={[
            "Aufnahme aktueller Verfassung aller Teilnehmer",
            "Trainingsinhalte gemeinsam definieren",
            "Anpassung auf Bedürfnisse der Gruppe",
            "Inputs zu Ausführung, Atmung & Konzentration",
          ]}
        />
      </SplitBlock>

      <SplitBlock
        eyebrow="03 · ATHLETIC"
        title="Athletiktraining"
        imageLabel="Athletiktraining"
        image={athletiktraining}
      >
        <p>
          Als Ergänzung in Vorbereitung, Übergangsphase oder Saison — trainiere mit deiner
          Mannschaft wie die Profis. Beugt Verletzungen vor und startet top-fit in die nächsten
          Spiele.
        </p>
        <BulletList
          items={[
            "Schnelligkeit · Kraft · Stabilität",
            "Individuelle Periodisierung",
            "Inputs zu Atmung & Konzentration",
            "Spürbare Verbesserung nach 2 Einheiten",
          ]}
        />
      </SplitBlock>

      <SplitBlock
        reverse
        eyebrow="04 · PHYSIO"
        title="Physiotherapie"
        imageLabel="Physiotherapie"
        image={physiotherapie}
      >
        <p>
          Schneller zurück in schmerzfreie Bewegung — mit individueller Physiotherapie und aktivem
          Training. Ursache finden, gezielt behandeln, sicher zurück.
        </p>
        <BulletList
          items={[
            "Anamnese & Sichtung Befunde",
            "Funktionelles Screening",
            "Manuelle Techniken & aktive Mobilisation",
            "Individueller Übungsplan + Dosierung",
            "Re-Checks und Plananpassungen",
          ]}
        />
      </SplitBlock>

      <SplitBlock
        eyebrow="05 · REHAB"
        title="Trainingstherapie"
        imageLabel="Trainingstherapie"
        image={athletiktraining}
      >
        <p>
          Gezieltes aktives Aufbautraining nach Beschwerden oder Verletzungen. Wir verbinden
          medizinisch fundierte Kräftigung, Mobilität und Technik-Coaching.
        </p>
        <BulletList
          items={[
            "Schmerzadaptierter Einstieg",
            "Progressive Kräftigung „load to tolerance“",
            "Technik-Coaching für Alltag & Sport",
            "Monitoring (RPE, Tempo, Schmerzskala)",
          ]}
        />
      </SplitBlock>

      <Section eyebrow="KUNDENSTIMMEN" title="Athletes & Members">
        <div className="grid lg:grid-cols-3 gap-6 not-prose">
          <Testimonial
            quote="Die Trainings sind intensiv, machen aber mega Spaß. Bessere Körperbeherrschung und mehr Sicherheit im Spiel."
            name="Yago Gomez"
            role="Mittelfeld · FC Vaduz"
          />
          <Testimonial
            quote="Immer abwechslungsreich. Mental und körperlich extrem schnell weitergebracht — vor allem im Bereich Schnelligkeit."
            name="Tom Zimmerschied"
            role="Mittelfeld · Hallescher FC"
          />
          <Testimonial
            quote="Very professional and done with joy. We managed to combine pleasure and work — results: transfer to KV Mechelen and Cameroon NT debut."
            name="Samuel Oum Gouet"
            role="1. belgische Liga"
          />
        </div>
      </Section>
    </PageShell>
  );
}
