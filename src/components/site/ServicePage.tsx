import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SECTION_Y } from "./content";
import { Eyebrow, PillLink } from "./Pill";
import { SmartImage } from "./SmartImage";
import { StoryCard } from "./References";
import { stories } from "@/lib/stories";
import { members } from "@/lib/team";
import { contactFormLink, type ContactTopic } from "@/lib/contact-topics";
import { cn } from "@/lib/utils";

/*
 * The modules every service page is built from, in page order: pillars →
 * offer cards → process beside a photo → the people → stories → closing CTA.
 * One set, so a visitor moving between Physio, Personal Training and the rest
 * recognises the same page shape each time.
 */

const EASE_PREMIUM = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Four short claims under the hero: scanned before booking, not read. No
 * cards and no frame — hairlines between the claims, and the green number
 * as the only accent.
 * Carries its own bottom padding like every light module.
 */
export function Pillars({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <section className="jh-container jh-gutter pb-10 lg:pb-16">
      {/* Hairlines only *between* claims: a column rule on desktop, a row
          rule when they stack — never one in front of the first. */}
      <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {items.map((p, i) => (
          <div
            key={p.title}
            className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="font-display text-balance text-[22px] leading-[1.25] text-foreground">
              {p.title}
            </h2>
            <p className="text-base font-light leading-[1.5] text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export type OfferCard = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  /** Spread into `<Link>`: a route, or `contactFormLink(...)` for a card
   *  that has no page of its own. */
  link: Pick<LinkProps, "to" | "search" | "hash">;
};

/** Photo cards for what the service covers, three across. */
export function OfferCards({
  eyebrow,
  title,
  action,
  items,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  items: readonly OfferCard[];
}) {
  return (
    <Section eyebrow={eyebrow} title={title} action={action}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
        {items.map((s) => (
          <Link
            key={s.title}
            {...s.link}
            className="group flex flex-col overflow-hidden rounded-card bg-muted"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <SmartImage
                src={s.image}
                alt={s.imageAlt}
                sizes="(min-width: 768px) 33vw, 100vw"
                className={cn(
                  "size-full object-cover transition-transform group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none",
                  s.imagePosition ?? "object-center",
                  EASE_PREMIUM,
                )}
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[24px] leading-[1.25] text-foreground lg:text-[28px]">
                  {s.title}
                </h3>
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-primary"
                  aria-hidden
                />
              </div>
              <p className="text-base font-light leading-[1.5] text-muted-foreground">{s.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/** The Ablauf as a numbered list beside a portrait-format photo. */
export function ProcessSplit({
  id,
  eyebrow = "ABLAUF",
  title,
  image,
  imageAlt,
  imagePosition = "object-center",
  steps,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  steps: readonly { title: string; body: string }[];
}) {
  return (
    <section id={id} className="jh-container jh-gutter scroll-mt-24">
      <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16", SECTION_Y)}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-muted lg:aspect-auto">
          <SmartImage
            src={image}
            alt={imageAlt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn("absolute inset-0 size-full object-cover", imagePosition)}
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-display text-balance text-[32px] leading-[1.25] lg:text-[42px]">
              {title}
            </h2>
          </div>
          <ol className="flex flex-col">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-6 border-t border-border py-6 last:border-b lg:gap-8"
              >
                <span className="font-display shrink-0 text-[22px] leading-[1.25] text-primary lg:text-[26px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[22px] leading-[1.25] text-foreground lg:text-[24px]">
                    {step.title}
                  </h3>
                  <p className="text-base font-light leading-[1.5] text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function member(slug: string) {
  const m = members.find((x) => x.slug === slug);
  if (!m) throw new Error(`Unknown team member: ${slug}`);
  return m;
}

/** Contact link that opens the form on the right topic with the person set. */
function bookWith(topic: ContactTopic, name: string) {
  return { ...contactFormLink(topic), search: { topic, trainer: name } } as const;
}

/**
 * One practitioner on the dark slab, portrait beside name, role and a line in
 * their own words — for a service one person carries (Physio: Florian).
 */
export function ExpertSlab({
  slug,
  eyebrow,
  quote,
  topic,
  bookLabel,
}: {
  slug: string;
  eyebrow: string;
  /** Verbatim from the person; defaults to their `short` line. */
  quote?: string;
  topic: ContactTopic;
  bookLabel: string;
}) {
  const m = member(slug);
  return (
    <section className={cn("jh-container jh-edge", SECTION_Y)}>
      <div className="grid grid-cols-1 gap-10 rounded-card bg-surface p-4 lg:grid-cols-12 lg:gap-16 lg:p-8">
        {m.image && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-image lg:col-span-5">
            <SmartImage
              src={m.image}
              alt={m.name}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-8 px-2 pb-8 lg:col-span-7 lg:px-0 lg:py-12 lg:pr-8">
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-surface-muted-foreground">{eyebrow}</Eyebrow>
            <h2 className="font-display text-[32px] leading-[1.25] text-surface-foreground lg:text-[48px]">
              {m.name}
            </h2>
            <p className="text-xs font-light uppercase tracking-[0.05em] text-surface-foreground/60">
              {m.role}
            </p>
          </div>
          <blockquote className="flex flex-col gap-4">
            <span className="font-display text-[48px] leading-[0.5] text-primary" aria-hidden>
              „
            </span>
            <p className="font-display text-balance text-[20px] leading-[1.45] text-surface-foreground lg:text-[24px]">
              {quote ?? m.short ?? m.quote}
            </p>
          </blockquote>
          <div className="flex flex-wrap gap-3">
            <PillLink {...bookWith(topic, m.name)} variant="outlineOnDark">
              {bookLabel}
            </PillLink>
            <PillLink to="/team" variant="quiet">
              Zum ganzen Team
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A row of cards that is a plain grid from lg up and, below that, a swipeable
 * scroll-snap track: the next card peeks in, and a progress bar plus arrows
 * make it read as scrollable on a tablet, where there is no scrollbar and no
 * swipe hint. `tone` matches the controls to the surface the row sits on.
 */
function SnapRow({
  items,
  tone,
  label,
}: {
  items: readonly { key: string; node: ReactNode }[];
  tone: "light" | "dark";
  /** Names one item, for the arrows' labels ("Vorheriger …"). */
  label: string;
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
        className={cn(
          "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:gap-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden",
          items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        )}
      >
        {items.map((it) => (
          <div
            key={it.key}
            className="flex min-w-0 shrink-0 basis-[85%] snap-start flex-col sm:basis-[44%] lg:basis-auto"
          >
            {it.node}
          </div>
        ))}
      </div>
      {!fits && (
        <div className="flex items-center gap-4 lg:hidden">
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

/**
 * Several practitioners side by side on the dark slab — the team behind a
 * service. Visitors do not pick a person here (the studio assigns the coach),
 * so there is one enquiry pill for the whole module, not one per card.
 */
export function ExpertGrid({
  eyebrow,
  title,
  slugs,
  topic,
}: {
  eyebrow: string;
  title: string;
  slugs: readonly string[];
  topic: ContactTopic;
}) {
  return (
    <Section
      alt
      eyebrow={eyebrow}
      title={title}
      action={
        <PillLink {...contactFormLink(topic)} variant="outlineOnDark">
          Jetzt anfragen
        </PillLink>
      }
    >
      <SnapRow
        tone="dark"
        label="Person"
        items={slugs.map(member).map((m) => ({
          key: m.slug,
          node: (
            <div className="group flex h-full flex-col overflow-hidden rounded-card bg-surface-elevated">
              {m.image && (
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SmartImage
                    src={m.image}
                    alt={m.name}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={cn(
                      "size-full object-cover object-top transition-transform group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none",
                      EASE_PREMIUM,
                    )}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[26px] leading-[1.25] text-surface-foreground">
                    {m.name}
                  </h3>
                  <p className="text-xs font-light uppercase leading-[1.5] tracking-[0.05em] text-surface-foreground/60">
                    {m.role}
                  </p>
                </div>
                {m.short && (
                  <p className="text-base font-light leading-[1.5] text-surface-foreground/80">
                    „{m.short}“
                  </p>
                )}
              </div>
            </div>
          ),
        }))}
      />
    </Section>
  );
}

/** Client stories picked by name, so reordering the reference list cannot
 *  swap an unrelated quote onto a service page. */
export function StoriesSection({ title, names }: { title: string; names: readonly string[] }) {
  const picked = names
    .map((n) => stories.find((s) => s.name === n))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <Section
      eyebrow="STIMMEN"
      title={title}
      action={
        <PillLink to="/referenzen" variant="outlineOnLight">
          Alle Referenzen
        </PillLink>
      }
    >
      <SnapRow
        tone="light"
        label="Stimme"
        items={picked.map((story) => ({
          key: story.name,
          node: <StoryCard story={story} />,
        }))}
      />
    </Section>
  );
}

/** Last module: the dark slab running on into the footer. Needs
 *  `<PageShell seamlessFooter>`. */
export function ClosingCta({
  title,
  body,
  topic,
  label = "Termin vereinbaren",
}: {
  title: string;
  body: string;
  topic: ContactTopic;
  label?: string;
}) {
  return (
    <Section
      alt
      seamless
      eyebrow="TERMIN"
      title={title}
      action={
        <PillLink {...contactFormLink(topic)} variant="outlineOnDark">
          {label}
        </PillLink>
      }
    >
      <p className="max-w-[640px]">{body}</p>
    </Section>
  );
}

/**
 * Where the team has worked, as a quiet row of names. Text rather than club
 * crests: logos need each club's permission, a name only needs to be true.
 */
export function CredentialStrip({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly { name: string; detail: string }[];
}) {
  return (
    <Section eyebrow={eyebrow} title={title}>
      <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-1.5 border-b border-border py-6 sm:pr-6 lg:border-b-0 lg:py-8"
          >
            <span className="font-display text-[26px] leading-[1.2] text-foreground lg:text-[30px]">
              {c.name}
            </span>
            <span className="text-sm font-light text-muted-foreground">{c.detail}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * Fixed classes a visitor signs up for, on the dark slab: four across on
 * desktop, the name set large because it is what people recognise from the
 * schedule. Each card leads to the same enquiry form, on the class's topic.
 */
export function CourseGrid({
  eyebrow,
  title,
  intro,
  topic,
  items,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  topic: ContactTopic;
  items: readonly { name: string; body: string; tags: readonly string[] }[];
}) {
  return (
    <Section
      alt
      eyebrow={eyebrow}
      title={title}
      action={
        <PillLink {...contactFormLink(topic)} variant="outlineOnDark">
          Zum Kurs anmelden
        </PillLink>
      }
    >
      {intro ? <p className="max-w-[640px]">{intro}</p> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {items.map((c, i) => (
          <div
            key={c.name}
            className="relative flex flex-col gap-5 overflow-hidden rounded-card bg-surface-elevated p-6 lg:p-8"
          >
            <span className="font-display text-[20px] leading-none text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[34px] font-bold uppercase leading-none tracking-tight text-surface-foreground lg:text-[38px]">
              {c.name}
            </h3>
            <p className="text-base font-light leading-[1.5] text-surface-foreground/80">
              {c.body}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-image bg-surface-foreground/10 p-2 text-xs font-light uppercase leading-[1.25] text-surface-foreground/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
