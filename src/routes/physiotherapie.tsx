import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  CTAButton,
  SplitBlock,
} from "@/components/site/content";

const physio = "/img/physiotherapie-1460.webp";

export const Route = createFileRoute("/physiotherapie")({
  head: () => ({
    meta: [
      { title: "Physiotherapie Dornbirn – JuklHealth" },
      {
        name: "description",
        content:
          "Klinische Physiotherapie in Dornbirn. Ursache finden, gezielt behandeln, aktiv zurück in schmerzfreie Bewegung.",
      },
      { property: "og:title", content: "Physiotherapie – JuklHealth" },
      { property: "og:description", content: "Klinische Physiotherapie in Dornbirn." },
    ],
  }),
  component: Physio,
});

function Physio() {
  return (
    <PageShell>
      <PageHero
        eyebrow="PHYSIO"
        title="Physiotherapie"
        intro="Schneller zurück in schmerzfreie Bewegung: individuelle Physiotherapie mit aktivem Training. Ursache finden, gezielt behandeln, sicher zurück."
        image={physio}
      />

      <Section eyebrow="ABLAUF" title="Wie wir vorgehen">
        <BulletList
          items={[
            "Anamnese & Sichtung Befunde",
            "Physiotherapeutische Diagnostik",
            "Manuelle Techniken & aktive Mobilisation",
            "Individuelle Rehaplanung",
            "Return to Sport / Play – Testungen",
          ]}
        />
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>

      <SplitBlock
        reverse
        eyebrow="WOFÜR"
        title="Indikationen"
        imageLabel="Physiotherapie Dornbirn"
        image={physio}
      >
        <BulletList
          items={[
            "Akute & chronische Schmerzen (Rücken, Schulter, Knie, Hüfte)",
            "Verletzungen & Return-to-Sport",
            "Haltungsprobleme & Dysbalancen",
            "Prävention & Leistungsoptimierung",
          ]}
        />
      </SplitBlock>
    </PageShell>
  );
}
