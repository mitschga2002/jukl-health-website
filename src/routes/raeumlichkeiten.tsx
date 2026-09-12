import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  SplitBlock,
  BulletList,
  CTAButton,
} from "@/components/site/content";

const strengthClub = "/img/strength-club-1824.webp";
const widnauClub = "/img/widnau-club-1080.webp";

export const Route = createFileRoute("/raeumlichkeiten")({
  head: () => ({
    meta: [
      { title: "Räumlichkeiten — JuklHealth Performance Club" },
      {
        name: "description",
        content:
          "Performance Club Dornbirn, Strength Club, Training Club Widnau und MagicFit Dornbirn — über 4000 m² Trainingsfläche.",
      },
      { property: "og:title", content: "Räumlichkeiten — JuklHealth" },
      { property: "og:description", content: "Unsere Räumlichkeiten in Dornbirn." },
    ],
  }),
  component: Raeumlichkeiten,
});

function Raeumlichkeiten() {
  return (
    <PageShell>
      <PageHero
        eyebrow="LOCATIONS"
        title="Räumlichkeiten"
        intro="Performance, Strength, Training & MagicFit — alles, was dein Trainingsherz höherschlagen lässt."
      />

      <Section eyebrow="DER PERFORMANCE CLUB" title="Mobility · Movement · Strength · Burn · Sisyphus">
        <p>
          MOBILITY, MOVEMENT, STRENGTH, BURN, SISYPHUS und noch viele weitere Kurse — bei
          uns findest du alles, was dein Trainingsherz höherschlagen lässt und dich deinem
          ganz persönlichen Ziel näher bringt.
        </p>
        <p className="text-muted-foreground">
          Personal Training und Gruppentrainings. Lass dich von den top ausgebildeten
          Coaches mitreißen und begeistern. Für Informationen bzw. Terminvereinbarung
          melde dich einfach per E-Mail.
        </p>
        <CTAButton to="/kontakt">Kontakt aufnehmen</CTAButton>
      </Section>

      <SplitBlock
        eyebrow="MAGICFIT DORNBIRN"
        title="Über 4000 m² Trainingsfläche"
        imageLabel="MagicFit · Dornbirn"
      >
        <p>
          Neben dem Performance Club und zahlreichen Outdoor-Möglichkeiten hast du bei
          uns über 4000 m² Trainingsfläche im MagicFit Dornbirn zur Verfügung.
        </p>
        <BulletList
          items={[
            "Funktioneller Trainingsbereich",
            "Flexx Rückenkonzept",
            "Fitnessgerätebereich",
            "Saunalandschaft",
          ]}
        />
      </SplitBlock>

      <SplitBlock
        reverse
        eyebrow="STRENGTH CLUB"
        title="160 m² · 24/7 · max. 100 Members"
        imageLabel="Strength Club · Bildgasse 10"
        image={strengthClub}
      >
        <p>
          Auf 160 m² findest du im Strength Club alles, was dein Trainingsherz höherschlagen
          lässt — exklusives Trainingsambiente und persönliche Betreuung über mindestens
          ein Jahr.
        </p>
        <BulletList
          items={[
            "Erdgeschoss Bildgasse 10",
            "24 h / 7 Tage Zugang",
            "Umkleiden im 2. Stock",
            "Max. 100 Mitglieder",
          ]}
        />
      </SplitBlock>

      <SplitBlock
        eyebrow="TRAINING CLUB WIDNAU"
        title="50 m² · 1:1 Setting in der Schweiz"
        imageLabel="Training Club · Widnau"
        image={widnauClub}
      >
        <p>
          Auf 50 m² bieten wir Personal Training, Athletiktrainings und Trainingstherapien
          auf neuestem Stand — 1:1, mit angenehm privatem Ambiente.
        </p>
        <BulletList
          items={[
            "Schützenstrasse 13, 9443 Widnau (CH)",
            "Nur mit Terminvereinbarung",
            "Umkleiden & Duschen vorhanden",
            "15 Jahre Erfahrung auf höchstem Niveau",
          ]}
        />
      </SplitBlock>
    </PageShell>
  );
}
