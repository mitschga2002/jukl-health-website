import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eyebrow, PillStatic } from "./Pill";
import { cn } from "@/lib/utils";

export type ConnectedCard = {
  to: string;
  title: string;
  /** Small caps line under the title — a size, a duration, a category. */
  meta?: string;
  /** One dense line, set a little heavier: an address, an opening time. */
  detail?: string;
  /** A sentence of description. */
  body?: string;
  points?: readonly string[];
  action?: string;
  /** The card that closes a slab — an offer rather than a destination. Marked
   *  by a green heading alone; everything else matches its neighbours. */
  accent?: boolean;
};

/**
 * The Standorte slab: cards joined into one bordered block, with a single green
 * panel that glides to whichever card is hovered rather than a highlight living
 * on each card.
 *
 * The panel is inset by -1px and sized +2px so its ring covers the slab's own
 * grey border instead of sitting inside it — otherwise the rounded ends stay
 * grey while the straight edges turn green. That also rules out
 * `overflow-hidden`, so the panel has to round its own corners.
 */
export function ConnectedCards({
  items,
  columns = 3,
}: {
  items: readonly ConnectedCard[];
  /** Columns from `lg` up. Below that the slab is always a single stack. */
  columns?: 2 | 3;
}) {
  const [active, setActive] = useState<number | null>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  // `corners` rides along with the geometry so the panel keeps its rounded end
  // through the fade-out. Deriving them from `active` instead squared them the
  // instant the pointer left, while the opacity was still transitioning — a
  // half-second flash of a sharp-cornered green frame.
  const [highlight, setHighlight] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    corners: string;
  } | null>(null);

  // Measure from the card itself rather than assuming equal columns: the slab
  // is two or three across on desktop but stacked, with unequal heights, below
  // that. The last measurement is kept when the pointer leaves so the panel
  // fades out where it stands instead of snapping back to the first card.
  //
  // Which corners to round is read off the same geometry — a card flush with
  // the slab's left and top edge owns the top-left radius — so it stays right
  // for one column, one full row, or several rows, with no breakpoint to track.
  useLayoutEffect(() => {
    if (active === null) return;
    const el = cardRefs.current[active];
    const slab = slabRef.current;
    if (!el || !slab) return;
    const measure = () => {
      const r = "var(--radius-card)";
      const atLeft = el.offsetLeft <= 1;
      const atTop = el.offsetTop <= 1;
      // `client*`, not `offset*`: a card's offsetLeft/Top is measured from the
      // slab's padding edge, so its far edge lands 1px short of the slab's
      // *outer* size on each side. Comparing against offsetWidth/Height made
      // every right and bottom edge miss, and only the top-left corner rounded.
      const atRight = el.offsetLeft + el.offsetWidth >= slab.clientWidth - 1;
      const atBottom = el.offsetTop + el.offsetHeight >= slab.clientHeight - 1;
      setHighlight({
        x: el.offsetLeft,
        y: el.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
        corners: [
          atTop && atLeft ? r : "0",
          atTop && atRight ? r : "0",
          atBottom && atRight ? r : "0",
          atBottom && atLeft ? r : "0",
        ].join(" "),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(slab);
    return () => ro.disconnect();
  }, [active]);

  // The hairlines between cards, minus the ones that would sit on the slab's
  // own outline. Computed rather than done with `last:` so a slab of two full
  // rows separates its rows as well as its columns.
  const lastRowStart = Math.floor((items.length - 1) / columns) * columns;

  return (
    <div
      ref={slabRef}
      className={cn(
        "relative grid grid-cols-1 rounded-card border border-border",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
      onMouseLeave={() => setActive(null)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 bg-primary/5 shadow-[inset_0_0_0_1px_var(--color-primary)] transition-[transform,width,height,opacity,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: highlight ? highlight.w + 2 : 0,
          height: highlight ? highlight.h + 2 : 0,
          transform: `translate(${(highlight?.x ?? 0) - 1}px, ${(highlight?.y ?? 0) - 1}px)`,
          borderRadius: highlight?.corners,
          opacity: active === null ? 0 : 1,
        }}
      />
      {items.map((item, i) => (
        <Link
          key={item.to + item.title}
          to={item.to}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          className={cn(
            "group relative z-10 flex flex-col gap-3 border-border p-8 lg:p-10",
            "border-b last:border-b-0",
            i >= lastRowStart ? "lg:border-b-0" : "lg:border-b",
            (i + 1) % columns === 0 ? "lg:border-r-0" : "lg:border-r",
          )}
        >
          <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
          <h3
            className={cn(
              "font-display text-[28px] leading-[1.25] lg:text-[36px]",
              item.accent ? "text-primary" : "text-[#1f2937]",
            )}
          >
            {item.title}
          </h3>
          {item.meta ? (
            <p className="text-base font-light uppercase leading-[1.3] text-muted-foreground">
              {item.meta}
            </p>
          ) : null}
          {item.detail ? (
            <p className="text-base font-medium leading-[1.3] text-muted-foreground">
              {item.detail}
            </p>
          ) : null}
          {item.body ? (
            <p className="text-base font-light leading-[1.45] text-muted-foreground">{item.body}</p>
          ) : null}
          {item.points?.length ? (
            <ul className="px-2 py-1">
              {item.points.map((p) => (
                <li key={p} className="flex gap-2 text-base leading-[1.75] text-muted-foreground">
                  <span className="text-primary" aria-hidden>
                    →
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-auto pt-2">
            <PillStatic className="group-hover:text-primary-hover">
              {item.action ?? "Entdecken"}
            </PillStatic>
          </div>
        </Link>
      ))}
    </div>
  );
}
