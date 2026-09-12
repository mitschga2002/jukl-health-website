import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  CTAButton,
  SplitBlock,
} from "@/components/site/content";

export const Route = createFileRoute("/mikronaehrstoffanalyse")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Mikronährstoffanalyse — JuklHealth" },
      {
        name: "description",
        content:
          "Labor-basierte Mikronährstoffanalyse mit Medicross. Ermittle deinen feinstofflichen Bedarf und gleiche Mängel aus.",
      },
      { property: "og:title", content: "Mikronährstoffanalyse — JuklHealth" },
      { property: "og:description", content: "Labor-basierte Mikronährstoffanalyse." },
    ],
  }),
  component: Mikro,
});

function Mikro() {
  return (
    <PageShell>
      <PageHero
        eyebrow="LABOR"
        title="Mikronährstoff-Analyse"
        intro="Müdigkeit, Kopfschmerzen, Haut- oder Haarprobleme, nachlassende Leistung? Mit der Analyse machst du sichtbar, was dir fehlt."
      />

      <Section eyebrow="VORGEHEN" title="Mikronährstoffanalyse">
        <p>
          In unserem Fachlabor wird dein feinstofflicher Bedarf an Mikronährstoffen und anderen
          Biomolekülen umfassend gemessen und ermittelt. Die Auswertungen sind einfach und
          verständlich aufgebaut — du weißt sofort, bei welchen Stoffen Bedarf besteht und bei
          welchen nicht.
        </p>
        <p>
          Ganz gleich, welche Nährstoffe dir fehlen — mit den Ergebnissen kannst du Maßnahmen
          ergreifen, Mängel ausgleichen, dein Wohlbefinden und deine Leistung steigern.
        </p>
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>

      <SplitBlock
        eyebrow="SYMPTOME"
        title="Häufige Anzeichen von Nährstoffmängeln"
        imageLabel="Labor · Medicross"
      >
        <BulletList
          items={[
            "Gewichts- & Hautprobleme",
            "Schlafstörungen",
            "Verdauungsprobleme",
            "Müdigkeit & Kopfschmerzen",
            "Konzentrationsstörungen",
            "Stimmungsschwankungen, Ängste, Depression",
            "Rheumatische & neurologische Erkrankungen",
            "Allergien & Unverträglichkeiten",
            "Stoffwechselprobleme (Eiweiß, Fett, KH)",
            "Libidostörungen",
          ]}
        />
      </SplitBlock>
    </PageShell>
  );
}
