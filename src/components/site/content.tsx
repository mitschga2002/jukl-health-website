import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { Eyebrow, PillLink } from "./Pill";
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";
import { NotchFrame } from "./NotchFrame";

/* The subpages are built from these blocks, and they speak the homepage's
   language: rounded cards on the content line, no hairline rules between
   sections, display type at fixed sizes on a 1.25 leading, and the dark
   `surface` slab whenever a module has to carry weight. The one structural
   rule the homepage keeps is that vertical rhythm comes from spacing, never
   from a border — so nothing here draws a divider. */

/* Vertical rhythm. A subpage stacks far more modules than the homepage does —
   analysen runs six in a row — so each one contributes less than a homepage
   module: two adjacent sections come to 80px on a phone and 128px on desktop,
   instead of the homepage's 128px / 192px. The homepage can afford the wider
   figure because its big padding is mostly card interior — the dark slab, the
   ticker — so the eye reads it as one block's breathing room. A subpage sets
   short flat modules side by side, where the same figure reads as a hole. */
export const SECTION_Y = "py-10 lg:py-16";

/** Section padding, shared so every module stacks on the same rhythm. */
const SECTION_STACK = `flex flex-col gap-10 ${SECTION_Y} lg:gap-16`;

export function PageShell({
  children,
  seamlessFooter = false,
}: {
  children: ReactNode;
  /** Set when the page's last module is itself the dark surface, so the footer
   *  drops its own rounded top edge and the two read as one block. */
  seamlessFooter?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter seamless={seamlessFooter} />
    </div>
  );
}

/**
 * The header of every subpage. Three shapes — text only, text beside a photo,
 * text above a full-width band — all drawn as one copy block plus a rounded
 * photo card, so a subpage opens the way the homepage does.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  ratio = "tall",
  image,
  imageAlt,
  imagePosition = "center",
  objectPosition,
  banner = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  ratio?: "tall" | "wide" | "natural";
  image?: string;
  imageAlt?: string;
  imagePosition?:
    | "center"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  objectPosition?: string;
  /** Full-width image band under the text instead of a side panel. Keeps the
   *  photo's entire width visible, so wide group shots are never cut at the edges. */
  banner?: boolean;
}) {
  const positionCls = {
    center: "object-center",
    left: "object-left",
    right: "object-right",
    top: "object-top",
    bottom: "object-bottom",
    "top-right": "object-right-top",
    "top-left": "object-left-top",
    "bottom-right": "object-right-bottom",
    "bottom-left": "object-left-bottom",
  }[imagePosition];

  const copy = (
    <div className="flex flex-col gap-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display max-w-[720px] hyphens-auto text-balance text-[40px] leading-[1.25] sm:text-[52px] lg:text-[56px]">
        {title}
      </h1>
      {intro ? (
        <p className="max-w-[600px] text-pretty pt-2 text-base font-light leading-[1.45] text-muted-foreground lg:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );

  if (banner && image) {
    return (
      <header className="jh-container jh-gutter">
        <div className={SECTION_STACK}>
          {copy}
          {/* Measured off the team photo: wall lettering 19-31%, head tops 40%,
              eye line 49%. A window starting between 19% and 31% slices the
              lettering, so 3:1 at 65% clears it at 32% and lands the heads in
              the upper third. Below lg the band is too tall for that window to
              fit, so 16:9 bottom-aligned trims just the ceiling. */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-card bg-muted",
              // `natural` lets the photo set its own height, so a wide group
              // shot is shown whole instead of cropped to a band.
              ratio !== "natural" && "aspect-video lg:aspect-[3/1]",
            )}
          >
            <SmartImage
              src={image}
              alt={imageAlt ?? title}
              priority
              sizes="(min-width: 1400px) 1400px, 100vw"
              className={cn(
                ratio === "natural"
                  ? "block h-auto w-full"
                  : "absolute inset-0 size-full object-cover object-bottom lg:object-[center_65%]",
              )}
            />
          </div>
        </div>
      </header>
    );
  }

  if (!image) {
    return (
      <header className="jh-container jh-gutter">
        <div className={SECTION_STACK}>{copy}</div>
      </header>
    );
  }

  return (
    <header className="jh-container jh-gutter">
      <div
        className={cn(
          "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16",
          SECTION_Y,
        )}
      >
        {copy}
        {/* `natural` drops the fixed window: the photo keeps its own ratio and
            is shown whole, which is what a wide group shot needs. The other
            ratios crop to a portrait or landscape window on purpose. */}
        <div
          className={cn(
            "relative overflow-hidden rounded-card bg-muted",
            ratio === "tall" && "min-h-[260px] sm:min-h-[380px] lg:min-h-[520px]",
            ratio === "wide" && "min-h-[200px] sm:min-h-[280px] lg:min-h-[300px]",
          )}
        >
          <SmartImage
            src={image}
            alt={imageAlt ?? title}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              ratio === "natural"
                ? "block h-auto w-full"
                : cn("absolute inset-0 size-full object-cover", positionCls),
            )}
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      </div>
    </header>
  );
}

/**
 * A titled block of copy. `alt` swaps it onto the dark slab the homepage uses
 * for its Performance Club module — a rounded card on the wider edge line, not
 * a full-bleed colour band.
 */
export function Section({
  eyebrow,
  title,
  children,
  action,
  compact = false,
  alt,
  seamless = false,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  /** A pill beside the heading, the way the homepage sections carry theirs. */
  action?: ReactNode;
  /** For a page that is one continuous document — the legal pages run nine of
   *  these in a row — where the full module rhythm would read as nine separate
   *  pages instead of one text with headings. */
  compact?: boolean;
  alt?: boolean;
  /** `alt` only. The last module on a thin page: the slab runs full bleed,
   *  rounds its top edge alone and lets `<PageShell seamlessFooter>` carry the
   *  same surface down into the footer — otherwise a dark card and the dark
   *  footer sit a gap apart with a stripe of background caught between them. */
  seamless?: boolean;
}) {
  const heading =
    eyebrow || title ? (
      <div className="flex flex-col gap-3">
        {eyebrow ? (
          <Eyebrow className={alt ? "text-surface-muted-foreground" : ""}>{eyebrow}</Eyebrow>
        ) : null}
        {title ? (
          <h2
            className={cn(
              "font-display max-w-[900px] text-balance text-[32px] leading-[1.25] lg:text-[48px]",
              alt && "text-surface-foreground",
            )}
          >
            {title}
          </h2>
        ) : null}
      </div>
    ) : null;

  const header =
    heading || action ? (
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-8">
        <div className="lg:w-[1088px] lg:max-w-[65%]">{heading}</div>
        {action ? <div className="flex flex-1 justify-start lg:justify-end">{action}</div> : null}
      </div>
    ) : null;

  const body = (
    <div
      className={cn(
        "space-y-6 text-base leading-[1.6] lg:text-lg",
        alt ? "text-surface-foreground/80" : "text-muted-foreground",
      )}
    >
      {children}
    </div>
  );

  if (alt && seamless) {
    return (
      <section className="mt-5 rounded-t-card bg-surface">
        <div className="jh-container jh-gutter">
          <div className="flex flex-col gap-8 pb-24 pt-12 lg:gap-10 lg:pb-32 lg:pt-24">
            {header}
            {body}
          </div>
        </div>
      </section>
    );
  }

  if (alt) {
    return (
      <section className="jh-container jh-edge">
        <div className="flex flex-col gap-8 rounded-card bg-surface px-4 py-12 lg:gap-10 lg:px-8 lg:py-24">
          {header}
          {body}
        </div>
      </section>
    );
  }

  return (
    <section className="jh-container jh-gutter">
      <div
        className={cn(
          "flex flex-col",
          compact ? "gap-4 py-6 lg:gap-5 lg:py-8" : cn("gap-8 lg:gap-10", SECTION_Y),
        )}
      >
        {header}
        {body}
      </div>
    </section>
  );
}

/**
 * A feature list kept deliberately quiet: no box, no fill, just rows parted by
 * a hairline. The page already carries the bordered slabs and the cards, so the
 * list earns its structure from rhythm and the green marker alone.
 */
export function BulletList({
  items,
  title,
  alt,
}: {
  items: string[];
  title?: string;
  /** Inside a `<Section alt>`: `border` is a light-theme token and all but
   *  disappears on the slab, so the hairlines take the surface's own ink. */
  alt?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {title ? (
        <h3
          className={cn(
            "font-display text-[22px] leading-[1.25]",
            alt ? "text-surface-foreground" : "text-foreground",
          )}
        >
          {title}
        </h3>
      ) : null}
      <ul
        className={cn(
          "max-w-[760px] divide-y",
          alt ? "divide-surface-foreground/15" : "divide-border",
        )}
      >
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-start gap-3 py-3 text-base font-light leading-[1.45]",
              alt && "text-surface-foreground",
            )}
          >
            <span className="shrink-0 text-primary" aria-hidden>
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The one CTA of a subpage section. Same pill as the homepage, so a visitor
    meets one button shape across the whole site. */
export function CTAButton({
  to,
  search,
  hash,
  children,
}: {
  to: string;
  /** Router search params, e.g. the contact form's preselected topic. */
  search?: Record<string, unknown>;
  hash?: string;
  children: ReactNode;
}) {
  return (
    <PillLink to={to} search={search} hash={hash} className="mt-8">
      {children}
    </PillLink>
  );
}

export function ImagePlaceholder({
  label,
  className = "",
  ratio = "video",
  image,
  focus = "center",
}: {
  label: string;
  className?: string;
  ratio?: "video" | "square" | "tall";
  image?: string;
  focus?: "center" | "top" | "upper";
}) {
  const ratioCls =
    ratio === "square" ? "aspect-square" : ratio === "tall" ? "aspect-[3/4]" : "aspect-video";
  const focusCls =
    focus === "top"
      ? "object-[center_20%]"
      : focus === "upper"
        ? "object-[center_35%]"
        : "object-center";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card bg-muted text-foreground/40",
        ratioCls,
        className,
      )}
    >
      {image ? (
        <SmartImage
          src={image}
          alt={label}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn("absolute inset-0 size-full object-cover", focusCls)}
        />
      ) : (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <div className="font-display px-6 text-center text-xl tracking-tight opacity-50 lg:text-2xl">
              {label}
            </div>
          </div>
          <Eyebrow className="absolute left-5 top-5 text-xs text-primary">Bild folgt</Eyebrow>
        </>
      )}
    </div>
  );
}

/** Copy beside a photo — the Credibility module's shape, on a light surface. */
export function SplitBlock({
  eyebrow,
  title,
  children,
  imageLabel,
  image,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  imageLabel: string;
  image?: string;
  reverse?: boolean;
}) {
  const copy = (
    <div className={cn("flex flex-col justify-center gap-6", reverse && "lg:order-2")}>
      <div className="flex flex-col gap-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="font-display max-w-[560px] text-balance text-[32px] leading-[1.25] lg:text-[42px]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-base font-light leading-[1.6] text-muted-foreground lg:text-lg">
        {children}
      </div>
    </div>
  );

  if (!image) {
    return (
      <section className="jh-container jh-gutter">
        <div className={SECTION_Y}>{copy}</div>
      </section>
    );
  }

  return (
    <section className="jh-container jh-gutter">
      <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16", SECTION_Y)}>
        {copy}
        <div className={cn(reverse && "lg:order-1")}>
          <ImagePlaceholder
            label={imageLabel}
            image={image}
            focus="upper"
            className="aspect-[4/3] sm:aspect-[4/5] lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}

export type Quote = {
  quote: string;
  name: string;
  role: string;
  /** Photo of the person quoted. Falls back to their initial when absent. */
  image?: string;
};

/**
 * Quotes get the dark slab rather than a row of light cards — the same surface
 * the homepage gives its team module, so the page changes key for them. The
 * oversized green quote mark is the only ornament; everything else is type.
 */
export function QuoteSlab({
  eyebrow,
  title,
  quotes,
  seamless = false,
}: {
  eyebrow: string;
  title: string;
  quotes: readonly Quote[];
  /** Last module on the page: the slab runs full bleed, rounds only its top
   *  edge and lets `<PageShell seamlessFooter>` continue the same surface. */
  seamless?: boolean;
}) {
  const body = (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-surface-muted-foreground">{eyebrow}</Eyebrow>
        <h2 className="font-display max-w-[900px] text-balance text-[32px] leading-[1.25] text-surface-foreground lg:text-[48px]">
          {title}
        </h2>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-10 lg:gap-12",
          quotes.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        )}
      >
        {quotes.map((q) => (
          <figure key={q.name} className="flex flex-col gap-5">
            <span className="font-display text-[56px] leading-[0.6] text-primary" aria-hidden>
              „
            </span>
            <blockquote className="font-display flex-1 text-balance text-[20px] leading-[1.4] text-surface-foreground lg:text-[24px]">
              {q.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-4 border-t border-surface-foreground/15 pt-5">
              {q.image ? (
                <img
                  src={q.image}
                  alt={q.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="size-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="font-display grid size-12 shrink-0 place-items-center rounded-full bg-primary text-lg text-primary-foreground">
                  {q.name.charAt(0)}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <div className="text-base leading-[1.25] text-surface-foreground">{q.name}</div>
                <Eyebrow className="text-xs text-surface-muted-foreground">{q.role}</Eyebrow>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );

  // One surface all the way into the footer, no rule and no tonal step between
  // them — the quotes just take enough room below themselves that the footer
  // reads as the next thing rather than as their continuation.
  if (seamless) {
    return (
      <section className="mt-5 rounded-t-card bg-surface">
        <div className="jh-container jh-gutter">
          <div className="flex flex-col gap-10 pb-24 pt-12 lg:gap-16 lg:pb-32 lg:pt-24">{body}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="jh-container jh-edge">
      <div className="flex flex-col gap-10 rounded-card bg-surface px-4 py-12 lg:gap-16 lg:px-8 lg:py-24">
        {body}
      </div>
    </section>
  );
}

/**
 * Two or three topics side by side, each a card of its own. For the case where
 * the page would otherwise stack near-identical blocks — same shape, same list,
 * different audience — and the repetition is what makes it read as filler.
 */
export function TopicCards({
  items,
  alt,
}: {
  items: readonly {
    eyebrow: string;
    title: string;
    points: readonly string[];
    note?: string;
  }[];
  /** Inside a `<Section alt>`: the cards take the homepage's elevated step on
   *  the dark slab instead of the light `muted` fill. */
  alt?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "flex flex-col gap-5 rounded-card p-6 lg:p-10",
            alt ? "bg-surface-elevated text-surface-foreground" : "bg-muted",
          )}
        >
          <div className="flex flex-col gap-3">
            <Eyebrow className={alt ? "text-surface-muted-foreground" : ""}>{item.eyebrow}</Eyebrow>
            <h3 className="font-display text-balance text-[24px] leading-[1.25] lg:text-[30px]">
              {item.title}
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {item.points.map((p) => (
              <li key={p} className="flex gap-3 text-base font-light leading-[1.45]">
                <span className="shrink-0 text-primary" aria-hidden>
                  →
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {item.note ? (
            <p
              className={cn(
                "mt-auto pt-2 text-sm",
                alt ? "text-surface-foreground/70" : "text-muted-foreground",
              )}
            >
              {item.note}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * A numbered sequence on the dark slab — the homepage's Performance Club rows
 * with the photo and the link taken away: number, step, one elevated card each.
 * For an `Ablauf`, where a bulleted list states the steps but not that they are
 * in order.
 */
export function StepList({ steps }: { steps: readonly string[] }) {
  /* An Ablauf of ten steps at the same scale as one of five would run the slab
     to nine hundred pixels of near-identical cards. Past six the type steps
     down and the list breaks into two columns on desktop, where there is width
     going spare either way.

     A column-flowed grid, not CSS `columns`. Both read downwards — 01-05 on the
     left, 06-10 on the right — but `columns` balances the two by height and
     leaves the cards landing wherever their own text ends, so a one-line step
     opposite a two-line one puts every card below it out of step with its
     neighbour. Fixing the row count instead lines the two columns up, and
     `1fr` rows make every row the height of the tallest card in it.

     The row count is data-dependent, so it arrives as a custom property rather
     than a class Tailwind would have to generate per length; it is only read
     inside the `lg` rule, so below that the inline value is set but unused and
     the list is a plain stack. */
  const long = steps.length > 6;
  const rows = Math.ceil(steps.length / 2);

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        long &&
          "lg:grid lg:auto-cols-fr lg:grid-flow-col lg:[grid-template-rows:repeat(var(--step-rows),minmax(0,1fr))]",
      )}
      style={long ? ({ "--step-rows": rows } as CSSProperties) : undefined}
    >
      {steps.map((step, i) => (
        <div
          key={step}
          className={cn(
            "flex items-baseline rounded-card bg-surface-elevated",
            long ? "gap-4 p-5 lg:gap-6 lg:px-6 lg:py-5" : "gap-5 p-6 lg:gap-10 lg:px-10 lg:py-8",
          )}
        >
          {/* Same neutral figure the homepage rows number themselves with. */}
          <span
            className={cn(
              "font-display shrink-0 leading-[1.25] text-[#d4d4d4]",
              long ? "text-[17px] lg:text-[20px]" : "text-[20px] lg:text-[26px]",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p
            className={cn(
              "font-display text-balance leading-[1.3] text-surface-foreground",
              long ? "text-[17px] lg:text-[21px]" : "text-[20px] lg:text-[28px]",
            )}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

/** The stack the listing rows sit in, on the same rhythm as any other module. */
export function Listing({ children }: { children: ReactNode }) {
  return (
    <div className="jh-container jh-edge">
      <div className={cn("flex flex-col gap-8", SECTION_Y)}>{children}</div>
    </div>
  );
}

/* Same slow ease the homepage rows use. */
const EASE_PREMIUM = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * The homepage's Performance Club row, in light: number, title, copy and photo
 * across one card, with the arrow button stamped out of the photo's top-right
 * corner instead of a CTA sitting under the copy. The whole row is the link, so
 * the hover answers across the card the way the homepage rows do.
 */
export function ListingRow({
  index,
  to,
  search,
  hash,
  title,
  image,
  imageAlt,
  children,
}: {
  index: number;
  to: string;
  /** Router search params, e.g. the contact form's preselected topic. */
  search?: Record<string, unknown>;
  hash?: string;
  title: string;
  image?: string;
  imageAlt?: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      search={search}
      hash={hash}
      className={cn(
        "group relative grid grid-cols-1 gap-6 rounded-card bg-muted p-6 transition-shadow xl:grid-cols-12 xl:items-start xl:gap-8 xl:p-10",
        EASE_PREMIUM,
        "hover:inset-ring-1 hover:inset-ring-foreground/15",
      )}
    >
      {/* Its own layer rather than a `hover:bg-*` swap, so the wash sits on the
          muted card instead of replacing it. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-card bg-foreground/[0.04] opacity-0 transition-opacity group-hover:opacity-100",
          EASE_PREMIUM,
        )}
      />

      <Eyebrow
        className={cn(
          "relative transition-colors group-hover:text-foreground xl:col-span-1",
          EASE_PREMIUM,
        )}
      >
        {String(index).padStart(2, "0")}
      </Eyebrow>
      <h2 className="font-display relative text-balance text-[28px] leading-[1.25] lg:text-[36px] xl:col-span-3">
        {title}
      </h2>
      <div className="relative flex flex-col gap-4 text-base font-light leading-[1.6] text-muted-foreground xl:col-span-5">
        {children}
      </div>
      {image ? (
        <div className="relative xl:col-span-3">
          {/* The notch is a mask on the frame, so the <img> is what scales —
              scaling the frame would drag the cut-out off the arrow button. */}
          <NotchFrame
            className="aspect-[4/3] w-full xl:aspect-[3/4]"
            notch={{ corner: "tr", base: { w: 50, h: 50, r: 30 } }}
          >
            <SmartImage
              src={image}
              alt={imageAlt ?? title}
              sizes="(min-width: 1280px) 380px, 100vw"
              className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </NotchFrame>
          <span
            className={cn(
              "absolute right-0 top-0 flex items-center justify-center rounded-full bg-background p-2.5 transition-colors group-hover:bg-primary",
              EASE_PREMIUM,
            )}
          >
            <ArrowUpRight
              className={cn(
                "size-5 text-foreground transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-foreground motion-reduce:transform-none motion-reduce:transition-none",
                EASE_PREMIUM,
              )}
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </div>
      ) : null}
    </Link>
  );
}

/** Four figures in one connected slab, the way the Standorte cards join up. */
export function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section className="jh-container jh-gutter">
      <div className={SECTION_Y}>
        <div className="grid grid-cols-2 rounded-card border border-border lg:grid-cols-4">
          {items.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col gap-2 border-border p-8",
                // Hairlines between cells only, so the card keeps a clean outline:
                // every cell draws its right edge except the last of each row.
                i % 2 === 0 && "border-r",
                i < 2 && "border-b lg:border-b-0",
                "lg:border-r lg:last:border-r-0",
              )}
            >
              <div className="font-display text-[32px] leading-[1.25] text-primary lg:text-[42px]">
                {s.value}
              </div>
              <Eyebrow className="text-xs">{s.label}</Eyebrow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
