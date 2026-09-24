import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { Eyebrow, PillLink } from "./Pill";
import { cn } from "@/lib/utils";
import { SECTION_Y } from "./rhythm";
import { stories, type Story } from "@/lib/stories";
import { SnapRow } from "./SnapRow";

/* Client stories: the data and the tiles, shared by /referenzen (full grid)
   and the homepage teaser (carousel), so a story added once shows up in both. */

const EASE_PREMIUM = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

/** The lead card's footprint. `h-full` lets it stretch to the tallest story
 *  card in its grid row. */
const TILE = "relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-card p-6 lg:p-8";

export function LeadCard() {
  return (
    <div className={cn(TILE, "justify-between bg-primary text-primary-foreground")}>
      <Eyebrow className="text-primary-foreground/80">JuklHealth System</Eyebrow>
      <div className="flex flex-col gap-4">
        <p className="font-display text-[72px] font-bold leading-none lg:text-[88px]">10k+</p>
        <p className="font-display text-[28px] leading-[1.2] lg:text-[32px]">
          zufriedene JuklHealth Kunden – und jeder mit einem eigenen Ziel.
        </p>
        <p className="max-w-[320px] text-base font-light leading-[1.45] text-primary-foreground/85">
          Vom Profifußball bis zum schmerzfreien Alltag: So viele Menschen haben wir mit dem
          JuklHealth System schon begleitet.
        </p>
      </div>
    </div>
  );
}

/** Past this many characters the full quote is clamped with a toggle. */
const LONG_QUOTE = 140;

/*
 * The photo is the card's background again, not a band above the text: a
 * band plus quote made every card very tall. What keeps the photo readable
 * now is how little text sits on it — a short verbatim highlight, the full
 * quote clamped to four lines, and the name. The gradient is heavy only in
 * the lower half where that text sits, so the face stays clear.
 *
 * "Weiterlesen" does not grow the card — that shifted the whole row. The full
 * quote opens as a panel laid over this card instead, same size, scrolling
 * inside itself if a quote is ever longer than the card.
 */
export function StoryCard({ story }: { story: Story }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const long = story.quote.length > LONG_QUOTE;

  // Keyboard users land on the close button when the panel opens and back on
  // "Weiterlesen" when it closes, instead of on a control that just vanished.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) openRef.current?.focus();
    wasOpen.current = open;
  }, [open]);
  const quoteId = `quote-${story.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <figure className="group relative flex h-full min-h-[480px] flex-col justify-between overflow-hidden rounded-card bg-surface p-6 text-surface-foreground lg:min-h-[540px] lg:p-8">
      {story.image ? (
        <>
          <SmartImage
            src={story.image}
            alt={story.name}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
            className={cn(
              "absolute inset-0 size-full object-cover transition-transform group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none",
              story.imagePosition ?? "object-center",
              EASE_PREMIUM,
            )}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-45% to-black/0"
          />
        </>
      ) : (
        /* No photo: a faint green glow keeps the dark card from reading as an
           empty slot next to the photo cards. */
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
        />
      )}

      <div className="relative">
        <span className="rounded-image bg-black/35 px-2.5 py-1.5 text-xs font-light uppercase tracking-[0.05em] text-white/90 backdrop-blur-md">
          {story.category}
        </span>
      </div>

      <div className="relative flex flex-col gap-4">
        <span className="font-display text-[48px] leading-[0.5] text-primary" aria-hidden>
          „
        </span>
        {story.highlight && (
          <p className="font-display text-balance text-[24px] leading-[1.25] lg:text-[26px]">
            {story.highlight}
          </p>
        )}
        <div className="flex flex-col items-start gap-2">
          <blockquote
            className={cn(
              "text-base font-light leading-[1.5] text-surface-foreground/80",
              long && "line-clamp-4",
            )}
          >
            {story.quote}
          </blockquote>
          {long && (
            <button
              ref={openRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls={quoteId}
              className="text-sm text-primary transition-colors duration-300 ease-out hover:text-surface-foreground"
            >
              Weiterlesen
            </button>
          )}
        </div>
        <figcaption className="flex flex-col gap-1 border-t border-surface-foreground/20 pt-4">
          <span className="text-base leading-[1.25]">{story.name}</span>
          <span className="text-xs font-light uppercase tracking-[0.05em] text-surface-foreground/60">
            {story.role}
          </span>
        </figcaption>
      </div>

      {long && (
        <div
          id={quoteId}
          role="region"
          aria-label={`Zitat von ${story.name}`}
          aria-hidden={!open}
          inert={!open}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          className={cn(
            "absolute inset-0 z-10 flex flex-col gap-5 overflow-y-auto bg-surface/95 p-6 backdrop-blur-sm transition-opacity duration-300 ease-out lg:p-8",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-[48px] leading-[0.5] text-primary" aria-hidden>
              „
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zitat schließen"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-surface-foreground/30 text-surface-foreground transition-colors duration-300 ease-out hover:border-surface-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <p className="text-base font-light leading-[1.6] text-surface-foreground lg:text-[17px]">
            {story.quote}
          </p>
          <div className="mt-auto flex flex-col gap-1 border-t border-surface-foreground/20 pt-4">
            <span className="text-base leading-[1.25]">{story.name}</span>
            <span className="text-xs font-light uppercase tracking-[0.05em] text-surface-foreground/60">
              {story.role}
            </span>
          </div>
        </div>
      )}
    </figure>
  );
}

/**
 * Homepage teaser: the same tiles as /referenzen on the site's shared slider,
 * kept a carousel on desktop too since it holds more stories than fit.
 */
export function ReferencesTeaser() {
  return (
    <section className="jh-container jh-gutter">
      <div className={cn("flex flex-col gap-10 lg:gap-12", SECTION_Y)}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>Referenzen</Eyebrow>
            <h2 className="font-display text-[32px] leading-[1.25] text-foreground lg:text-[48px]">
              Was unsere Klienten sagen
            </h2>
          </div>
          <div className="flex">
            <PillLink to="/referenzen" variant="outlineOnLight">
              Alle Referenzen
            </PillLink>
          </div>
        </div>

        <SnapRow
          carousel
          tone="light"
          label="Referenz"
          items={stories.map((story) => ({
            key: story.name,
            node: <StoryCard story={story} />,
          }))}
        />
      </div>
    </section>
  );
}
