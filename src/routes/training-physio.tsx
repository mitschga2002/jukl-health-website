import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, BulletList } from "@/components/site/content";

export const Route = createFileRoute("/training-physio")({
  head: () => ({
    meta: [
      { title: "Training & Physio – JuklHealth" },
      {
        name: "description",
        content:
          "Personal Training, Gruppen-, Athletiktraining, Physiotherapie und Trainingstherapie: alle Leistungen im Überblick.",
      },
      { property: "og:title", content: "Training & Physio – JuklHealth" },
      {
        property: "og:description",
        content: "Wissenschaftliches Training kombiniert mit klinischer Physiotherapie.",
      },
      { property: "og:url", content: "https://juklhealth.com/training-physio" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/training-physio" }],
  }),
  component: TrainingPhysio,
});

const services = [
  {
    to: "/personaltraining",
    label: "Personal Training",
    num: "01",
    desc: "1:1 Betreuung mit voller Aufmerksamkeit.",
  },
  {
    to: "/gruppentraining",
    label: "Gruppentraining",
    num: "02",
    desc: "Kleine Gruppen, gemeinsamer Antrieb.",
  },
  {
    to: "/athletiktraining",
    label: "Athletiktraining",
    num: "03",
    desc: "Periodisierte Athletik für Mannschaften.",
  },
  {
    to: "/physiotherapie",
    label: "Physiotherapie",
    num: "04",
    desc: "Ursache finden, schmerzfrei werden.",
  },
  {
    to: "/trainingstherapie",
    label: "Trainingstherapie",
    num: "05",
    desc: "Aktives Aufbautraining nach Verletzungen.",
  },
] as const;

function TrainingPhysio() {
  return (
    <PageShell>
      <PageHero
        eyebrow="LEISTUNGEN"
        title="Training & Physio"
        intro="Von der Diagnose bis zur Performance: ein durchgängiges System aus Trainingswissenschaft und klinischer Physiotherapie."
      />

      <Section eyebrow="ÜBERSICHT" title="Alle Trainingsformate">
        <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 not-prose">
          {services.map((s) => (
            <Link key={s.to + s.label} to={s.to} className="bg-background p-8 hover:bg-muted group">
              <div className="font-mono text-[11px] text-primary mb-3">[ {s.num} ]</div>
              <div className="font-display text-2xl mb-2 group-hover:text-primary">{s.label}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-primary">
                → entdecken
              </div>
            </Link>
          ))}
          {/* CTA card so the grid does not leave an empty cell. */}
          <Link
            to="/kontakt"
            className="bg-primary text-primary-foreground p-8 flex flex-col justify-between hover:bg-primary-hover"
          >
            <div>
              <div className="font-mono text-[11px] mb-3 opacity-80">[ 06 ]</div>
              <div className="font-display text-2xl mb-2">Nicht das Richtige dabei?</div>
              <div className="text-sm opacity-90">
                Schreib uns – wir stellen dir ein individuelles Erstgespräch zusammen.
              </div>
            </div>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-widest">
              → Erstgespräch vereinbaren
            </div>
          </Link>
        </div>
      </Section>

      <Section eyebrow="WAS DU BEKOMMST" title="Wissenschaft + Praxis">
        <BulletList
          items={[
            "Functional Movement Screen als Basis",
            "Anamnese, Zielklärung, klare Maßnahmen",
            "Periodisierter Trainingsplan",
            "Vor- und Nachbereitung jeder Einheit",
            "Verknüpfung mit Leistungs- und Stoffwechselanalyse",
            "Re-Checks und Plananpassungen",
          ]}
        />
      </Section>
    </PageShell>
  );
}
