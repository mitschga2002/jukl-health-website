/** The catalog answered but holds no published course yet: a quiet note in
 *  the grid's place, in the muted card the course cards will take later. */
export function AcademyEmptyCard() {
  return (
    <div className="flex flex-col gap-2 rounded-card bg-muted p-6 lg:p-8">
      <p className="font-display text-[20px] leading-[1.25] text-foreground">
        Die ersten Kurse sind in Arbeit.
      </p>
      <p className="max-w-[560px] text-base font-light leading-[1.5] text-muted-foreground">
        Sobald sie fertig sind, findest du sie hier und in der App.
      </p>
    </div>
  );
}
