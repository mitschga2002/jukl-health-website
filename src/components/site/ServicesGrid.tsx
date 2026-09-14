import { Link } from "@tanstack/react-router";

const services = [
  {
    title: "Personal Training",
    body: "Eins-zu-eins Betreuung mit Fokus auf individuelle Biomechanik und klare Zielsetzung.",
    to: "/personaltraining",
  },
  {
    title: "Athletiktraining",
    body: "Optimierung der körperlichen Leistungsfähigkeit für Profi- und Hobbysportler.",
    to: "/athletiktraining",
  },
  {
    title: "Gruppentraining",
    body: "Strukturierte Kleingruppen mit individueller Korrektur und maximaler Intensität.",
    to: "/gruppentraining",
  },
  {
    title: "Physiotherapie",
    body: "Klinische Expertise zur Rehabilitation und Prävention von Verletzungen.",
    to: "/physiotherapie",
  },
  {
    title: "Strength Club Abo",
    body: "160 m², 24/7-Zugang, exklusives Trainingsambiente. Exklusiv auf 100 Mitglieder begrenzt – inklusive Betreuungssystem über ein ganzes Jahr.",
    to: "/performance-club",
  },
  {
    title: "Leistungsanalysen",
    body: "Datengestützte Tests zur Bestimmung deines aktuellen Status quo.",
    to: "/analysen",
  },
] as const;

export function ServicesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="jh-container jh-gutter">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-4 block">
            Unsere Leistungen
          </span>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight max-w-2xl">
            Eine Methodik. Sechs Wege zu deinem Ziel.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {services.map((s) => (
            <Link
              key={s.to + s.title}
              to={s.to}
              className="group bg-background p-10 flex flex-col justify-between hover:bg-muted"
            >
              <h3 className="font-display text-2xl tracking-tight mb-4 md:mb-6 leading-tight group-hover:text-primary">
                {s.title}
              </h3>
              <div>
                <p className="text-sm text-muted-foreground mb-4 md:mb-6">{s.body}</p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                  Mehr erfahren
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
