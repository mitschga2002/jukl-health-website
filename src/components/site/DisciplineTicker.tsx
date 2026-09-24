const disciplines = [
  "Performance Club",
  "Personal Training",
  "Athletiktraining",
  "Gruppentraining",
  "Webinare",
  "Analysen",
  "Physiotherapie",
  "Trainingstherapie",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pl-10" aria-hidden={ariaHidden || undefined}>
      {disciplines.map((d) => (
        <div key={d} className="flex shrink-0 items-center gap-10">
          <span className="whitespace-nowrap text-xl leading-[1.25] text-foreground">{d}</span>
          <span className="font-light leading-[1.25] text-foreground/50" aria-hidden>
            •
          </span>
        </div>
      ))}
    </div>
  );
}

export function DisciplineTicker() {
  // Render enough copies so the -50% marquee translate fills even ultra-wide screens.
  return (
    // Tighter below than the site rhythm: the ruled band already reads as a
    // break, and the full gap left it floating between hero and slab.
    <section
      aria-label="Trainingsdisziplinen"
      className="mb-4 mt-10 overflow-hidden whitespace-nowrap border-y border-border py-8 lg:mb-8 lg:mt-16"
    >
      <div className="flex w-max animate-ticker">
        <Track />
        <Track ariaHidden />
        <Track ariaHidden />
        <Track ariaHidden />
      </div>
    </section>
  );
}
