import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { Eyebrow, PillLink } from "./Pill";
import { cn } from "@/lib/utils";
import { stories, type Story } from "@/lib/stories";

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
const LONG_QUOTE = 180;

/*
 * Photo and quote no longer share one surface. Over a full-bleed photo every
 * extra line of quote buried more of the picture, so the photo gets its own
 * band on top and the quote sits beneath it on the dark card — any length
 * reads, and the face stays in frame. The card leads with a short verbatim
 * highlight; the full quote follows in body type, clamped once it gets long.
 */
export function StoryCard({ story }: { story: Story }) {
  const [open, setOpen] = useState(false);
  const long = story.quote.length > LONG_QUOTE;
  const quoteId = `quote-${story.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const chip = (
    <span className="rounded-image bg-surface/70 px-2.5 py-1.5 text-xs font-light uppercase tracking-[0.05em] text-surface-foreground/90 backdrop-blur-md">
      {story.category}
    </span>
  );

  return (
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface text-surface-foreground">
      {story.image ? (
        <div className="relative aspect-[5/4] overflow-hidden">
          <SmartImage
            src={story.image}
            alt={story.name}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
            className={cn(
              "h-full w-full object-cover transition-transform group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none",
              story.imagePosition ?? "object-center",
              EASE_PREMIUM,
            )}
          />
          {/* A short fade into the card so the band ends in the surface
              colour instead of on a hard photo edge. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent"
          />
          <div className="absolute left-4 top-4 lg:left-6 lg:top-6">{chip}</div>
        </div>
      ) : (
        <>
          {/* No photo: a faint green glow in the corner keeps the card from
              reading as an empty slot next to the photo cards. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative px-6 pt-6 lg:px-8 lg:pt-8">{chip}</div>
        </>
      )}

      <div className="relative flex flex-1 flex-col gap-5 p-6 lg:p-8">
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
            id={quoteId}
            className={cn(
              "text-base font-light leading-[1.5] text-surface-foreground/75",
              long && !open && "line-clamp-5",
            )}
          >
            {story.quote}
          </blockquote>
          {long && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={quoteId}
              className="text-sm text-primary transition-colors duration-300 ease-out hover:text-surface-foreground"
            >
              {open ? "Weniger anzeigen" : "Weiterlesen"}
            </button>
          )}
        </div>
        <figcaption className="mt-auto flex flex-col gap-1 border-t border-surface-foreground/15 pt-5">
          <span className="text-base leading-[1.25]">{story.name}</span>
          <span className="text-xs font-light uppercase tracking-[0.05em] text-surface-foreground/60">
            {story.role}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * Homepage teaser: the same tiles as /referenzen, on a horizontal scroll-snap
 * track. Native scrolling does the carousel work — swipe on touch, trackpad
 * on desktop — and the arrows only nudge it one tile at a time, greying out
 * at either end.
 */
export function ReferencesTeaser() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const tile = el?.firstElementChild as HTMLElement | null;
    if (!el || !tile) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (tile.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border border-border text-foreground transition-colors duration-300 ease-out hover:border-foreground disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="jh-container jh-gutter">
      <div className="flex flex-col gap-10 py-16 lg:gap-12 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>Referenzen</Eyebrow>
            <h2 className="font-display text-[32px] leading-[1.25] text-foreground lg:text-[48px]">
              Was unsere Klienten sagen
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={arrow}
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Vorherige Referenz"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              className={arrow}
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Nächste Referenz"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <PillLink to="/referenzen" variant="outlineOnLight" className="ml-2">
              Alle Referenzen
            </PillLink>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={sync}
          aria-roledescription="Karussell"
          aria-label="Referenzen"
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((story) => (
            <div
              key={story.name}
              className="shrink-0 basis-[85%] snap-start sm:basis-[calc((100%-16px)/2)] lg:basis-[calc((100%-40px)/3)]"
            >
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
