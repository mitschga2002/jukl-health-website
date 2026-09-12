const disciplines = [
  "Personal Training",
  "Athletiktraining",
  "Gruppentraining",
  "Webinare",
  "Analysen",
  "Physiotherapie",
  "Trainingstherapie",
  "Performance Club",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex gap-10 items-center px-5 shrink-0" aria-hidden={ariaHidden || undefined}>
      {disciplines.map((d) => (
        <div key={d} className="flex gap-10 items-center">
          <span className="text-xs uppercase tracking-[0.28em] text-primary-foreground whitespace-nowrap">
            {d}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 shrink-0"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}

export function DisciplineTicker() {
  // Render enough copies so the -50% marquee translate fills even ultra-wide screens.
  return (
    <section
      aria-label="Trainingsdisziplinen"
      className="bg-primary py-5 overflow-hidden whitespace-nowrap"
    >
      <div className="flex animate-ticker w-max">
        <Track />
        <Track ariaHidden />
        <Track ariaHidden />
        <Track ariaHidden />
      </div>
    </section>
  );
}
