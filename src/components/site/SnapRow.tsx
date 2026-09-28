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

  // The card the track rests on. Kept so a relayout can put it back: iOS
  // Safari re-snaps a mandatory track whenever its size changes (photos and
  // fonts arriving, hydration) and may pick a different card, so the row
  // would open on the second story.
  const indexRef = useRef(0);

  // Exact scroll offset that snaps card `i` to the start, clamped to the
  // track's range. Stepping by a measured card width instead drifts (the
  // basis is a fractional %, offsetWidth rounds), and on iOS the drift makes a
  // smooth scroll overshoot the start and bare the bleed as white space.
  const offsetOf = useCallback((el: HTMLElement, i: number) => {
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return 0;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const left =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - pad;
    return Math.min(Math.max(0, Math.round(left)), el.scrollWidth - el.clientWidth);
  }, []);

  const nearestIndex = useCallback(
    (el: HTMLElement) => {
      let best = 0;
      for (let i = 1; i < el.children.length; i++) {
        if (
          Math.abs(offsetOf(el, i) - el.scrollLeft) < Math.abs(offsetOf(el, best) - el.scrollLeft)
        )
          best = i;
      }
      return best;
    },
    [offsetOf],
  );

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setView({
      size: el.clientWidth / el.scrollWidth,
      pos: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  const onScroll = () => {
    const el = trackRef.current;
    if (el) indexRef.current = nearestIndex(el);
    sync();
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const realign = () => {
      el.scrollTo({ left: offsetOf(el, indexRef.current), behavior: "instant" });
      sync();
    };
    realign();
    const ro = new ResizeObserver(realign);
    ro.observe(el);
    return () => ro.disconnect();
  }, [offsetOf, sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.min(Math.max(0, nearestIndex(el) + dir), el.children.length - 1);
    indexRef.current = i;
    el.scrollTo({ left: offsetOf(el, i), behavior: "smooth" });
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
        onScroll={onScroll}
        // Sideways swipes stay native (the page's smooth scroll would eat
        // them); vertical wheel over the row still scrolls the page.
        data-lenis-prevent-horizontal
        aria-roledescription={carousel ? "Karussell" : undefined}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory overscroll-x-contain scroll-px-4 gap-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:gap-5 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden",
          !carousel && "lg:grid lg:overflow-visible",
          !carousel && (items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"),
        )}
      >
        {items.map((it) => (
          <div
            key={it.key}
            className={cn(
              "flex min-w-0 shrink-0 basis-[95%] snap-start flex-col sm:basis-[60%]",
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
