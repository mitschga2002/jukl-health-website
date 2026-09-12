import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  CTAButton,
} from "@/components/site/content";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Clubs — Performance, Strength & Training Club | JuklHealth" },
      {
        name: "description",
        content:
          "Performance Club Dornbirn, Strength Club Dornbirn und Training Club Widnau — drei Standorte, ein System.",
      },
      { property: "og:title", content: "Clubs — JuklHealth" },
      { property: "og:description", content: "Unsere Performance Clubs in Dornbirn & Widnau." },
    ],
  }),
  component: Clubs,
});

const clubs = [
  {
    name: "Performance Club Dornbirn",
    area: "140 m²",
    address: "Bildgasse 10, 3. Stock · A-6850 Dornbirn",
    points: [
      "Personal Training & Athletik",
      "Kurse in Kleingruppen",
      "Mobility · Movement · Strength · Burn",
      "Nur mit Terminvereinbarung",
    ],
    to: "/performance-club",
  },
  {
    name: "Strength Club Dornbirn",
    area: "160 m²",
    address: "Bildgasse 10, Erdgeschoss · A-6850 Dornbirn",
    points: [
      "24 h / 7 Tage Zugang",
      "Max. 100 Mitglieder",
      "1 Jahr Betreuungssystem",
      "Exklusives Trainingsambiente",
    ],
    to: "/strength-club",
  },
  {
    name: "Training Club Widnau (CH)",
    area: "50 m²",
    address: "Schützenstrasse 13 · CH-9443 Widnau",
    points: [
      "1:1 Personal Training",
      "Trainingstherapie",
      "Privates Ambiente",
      "15 Jahre Erfahrung",
    ],
    to: "/training-club-widnau",
  },
];

function Clubs() {
  return (
    <PageShell>
      <PageHero
        eyebrow="STANDORTE"
        title="Drei Clubs. Ein System."
        intro="Performance, Strength und Training Club — entwickelt, um dich auf das nächste Level zu bringen."
      />

      <Section eyebrow="ÜBERSICHT" title="Wähle deinen Club">
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 not-prose border border-foreground/10">
          {clubs.map((c, i) => (
            <Link
              key={c.name}
              to={c.to}
              className="bg-background p-8 flex flex-col hover:bg-foreground hover:text-background transition-colors group"
            >
              <div className="font-mono text-[10px] text-primary mb-4">
                [ 0{i + 1} ]
              </div>
              <h3 className="font-display text-2xl uppercase mb-2 leading-tight">
                {c.name}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
                {c.area}
              </div>
              <p className="text-sm mb-6 group-hover:text-background/80">{c.address}</p>
              <ul className="space-y-1 text-sm mb-6">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto font-mono text-[10px] uppercase tracking-widest text-primary">
                → entdecken
              </div>
            </Link>
          ))}
        </div>
        <CTAButton to="/kontakt">Termin vereinbaren</CTAButton>
      </Section>
    </PageShell>
  );
}
