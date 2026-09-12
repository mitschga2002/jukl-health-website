import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  BulletList,
  CTAButton,
} from "@/components/site/content";

export const Route = createFileRoute("/outdoor-training")({
  head: () => ({
    meta: [
      { title: "Outdoor Training — JuklHealth" },
      {
        name: "description",
        content: "Bewegungsqualität an der frischen Luft. Mobilität, Stabilität, Kraft und Ausdauer in einem Trainingsaufbau.",
      },
      { property: "og:title", content: "Outdoor Training — JuklHealth" },
      { property: "og:description", content: "Training an der frischen Luft." },
    ],
  }),
  component: Outdoor,
});

function Outdoor() {
  return (
    <PageShell>
      <PageHero
        eyebrow="OUTDOOR"
        title="Outdoor Training"
        intro="Bei uns steht Bewegungsqualität im Fokus. An der frischen Luft bringen wir Körper und Geist in Einklang."
      />

      <Section eyebrow="KONZEPT" title="Mobility · Stability · Strength · Endurance">
        <p>
          Das Outdoor Training bietet dir die Möglichkeit, an der frischen Luft Körper und
          Geist in Einklang zu bringen. In unserem spezifischen Trainingsaufbau verbinden
          wir Mobilität, Stabilität, Kraft und Ausdauer und bringen dich deinen persönlichen
          Zielen näher.
        </p>
        <p>
          Die Intensität jeder Übung bestimmst du selbst — für deinen individuellen
          Lernfortschritt und die richtige Bewegungsausführung sind wir zuständig. Wir
          arbeiten präventiv und nachhaltig, sodass du in deinem Alltag davon profitierst.
        </p>
      </Section>

      <Section eyebrow="BENEFITS" title="Was dich erwartet">
        <BulletList
          items={[
            "100 % Leidenschaft",
            "Spaß & Motivation",
            "Professionalität",
            "Individuelles Training für die Gruppe",
            "Verletzungsprävention & Rehabilitation",
            "Nachhaltige Ergebnisse",
            "Bessere körperliche Leistungsfähigkeit",
            "Fettreduktion · Muskelaufbau",
            "Verbesserte Körperhaltung",
            "Weniger Beschwerden im Alltag und Sport",
            "Herz-Kreislauf-Prophylaxe",
          ]}
        />
        <p className="mt-10 text-muted-foreground">
          Sorge vor und reduziere bzw. vermeide gemeinsam mit uns zukünftige Arzt- oder
          Krankenhausbesuche. Wir wissen, wie es funktioniert. Sichere dir deinen Platz —
          begrenzte Teilnehmerzahl.
        </p>
        <CTAButton to="/kontakt">Platz sichern</CTAButton>
      </Section>
    </PageShell>
  );
}
