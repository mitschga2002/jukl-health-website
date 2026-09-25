import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A row of cards that is a plain grid from lg up and, below that, a swipeable
 * scroll-snap track: the next card peeks in, and a progress bar plus arrows
 * make it read as scrollable on a tablet, where there is no scrollbar and no
 * swipe hint. `tone` matches the controls to the surface the row sits on.
 * Used by every sliding row on the site, so they all behave the same.
 */
export function SnapRow({
  items,
  tone,
  label,
  carousel = false,
}: {
  items: readonly { key: string; node: ReactNode }[];
  tone: "light" | "dark";
  /** Names one item, for the arrows' labels ("Vorherige …"). */
  label: string;
  /** Stay a track on desktop too, three cards in view (the homepage's
   *  reference carousel, which holds more cards than fit). */
  carousel?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Visible share of the track and how far it has scrolled, both 0–1. They
  // drive the progress bar; `fits` hides the controls when nothing scrolls
  // (always from lg up, where the row is a grid).
  const [view, setView] = useState({ size: 1, pos: 0 });
  const fits = view.size >= 0.999;

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setView({
      size: el.clientWidth / el.scrollWidth,
      pos: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const dark = tone === "dark";
  const arrow = cn(
    "grid size-11 place-items-center rounded-full border transition-colors duration-300 ease-out disabled:pointer-events-none disabled:opacity-30",
    dark
      ? "border-surface-foreground/30 text-surface-foreground hover:border-surface-foreground"
      : "border-border text-foreground hover:border-foreground",
  );

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={trackRef}
        onScroll={sync}
        aria-roledescription={carousel ? "Karussell" : undefined}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:gap-5 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden",
          !carousel && "lg:grid lg:overflow-visible",
          !carousel && (items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"),
        )}
      >
        {items.map((it) => (
          <div
            key={it.key}
            className={cn(
              "flex min-w-0 shrink-0 basis-[95%] snap-start flex-col sm:basis-[44%]",
              carousel ? "lg:basis-[calc((100%-40px)/3)]" : "lg:basis-auto",
            )}
          >
            {it.node}
          </div>
        ))}
      </div>
      {!fits && (
        <div className={cn("flex items-center gap-4", !carousel && "lg:hidden")}>
          <div
            className={cn(
              "relative h-[3px] flex-1 overflow-hidden rounded-full",
              dark ? "bg-surface-foreground/15" : "bg-foreground/15",
            )}
          >
            {/* No CSS transition: the bar follows the track's own scroll events,
                which already animate during a smooth scroll. Easing on top of
                them makes the thumb trail behind the cards. `transform` in
                thumb-widths keeps it off layout. */}
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full will-change-transform",
                dark ? "bg-surface-foreground" : "bg-foreground",
              )}
              style={{
                width: `${view.size * 100}%`,
                transform: `translateX(${(view.pos * (1 - view.size) * 100) / view.size}%)`,
              }}
            />
          </div>
          <button
            type="button"
            className={arrow}
            onClick={() => step(-1)}
            disabled={view.pos <= 0.01}
            aria-label={`Vorherige ${label}`}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => step(1)}
            disabled={view.pos >= 0.99}
            aria-label={`Nächste ${label}`}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
