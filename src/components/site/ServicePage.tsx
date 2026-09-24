import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section, SECTION_Y } from "./content";
import { Eyebrow, PillLink } from "./Pill";
import { SmartImage } from "./SmartImage";
import { StoryCard } from "./References";
import { SnapRow } from "./SnapRow";
import { stories } from "@/lib/stories";
import { members } from "@/lib/team";
import { contactFormLink, type ContactTopic } from "@/lib/contact-topics";
import { cn } from "@/lib/utils";

/*
 * The modules every service page is built from, in page order: offer
 * cards → process beside a photo → the people → stories → closing CTA.
 * One set, so a visitor moving between Physio, Personal Training and the rest
 * recognises the same page shape each time.
 */

const EASE_PREMIUM = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

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
 * Stations as a timeline, oldest on the left. On desktop a soft wave runs
 * behind the row — one smooth curve through a dot per station, alternating
 * high and low — so the career reads as a path rather than four boxes in a
 * line. It fades out at both ends and stays in the background: a hairline
 * stroke at low opacity. Stacked below lg, where a wave has no width to swing
 * in, it becomes a quiet vertical rail.
 */
export function CareerTimeline({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  /** Oldest first. */
  items: readonly { name: string; period: string; detail: string }[];
}) {
  // Dot heights on the 120-unit-tall wave; the path below passes through
  // exactly these points at each column's centre.
  const dotY = [30, 90, 30, 90];
  return (
    <Section eyebrow={eyebrow} title={title}>
      <div className="relative">
        {/* The wave: stretched to the row's width (`preserveAspectRatio`),
            with a non-scaling stroke so the hairline stays a hairline. */}
        <svg
          aria-hidden
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-[120px] w-full lg:block"
        >
          <defs>
            <linearGradient id="career-wave" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
              <stop offset="0.12" style={{ stopColor: "var(--primary)", stopOpacity: 0.45 }} />
              <stop offset="0.88" style={{ stopColor: "var(--primary)", stopOpacity: 0.45 }} />
              <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d="M0 60 C60 40 90 30 125 30 C210 30 290 90 375 90 C460 90 540 30 625 30 C710 30 790 90 875 90 C920 90 960 75 1000 60"
            fill="none"
            stroke="url(#career-wave)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="relative grid grid-cols-1 gap-8 border-l border-border pl-8 lg:grid-cols-4 lg:gap-6 lg:border-l-0 lg:pl-0">
          {items.map((c, i) => (
            <li key={c.name} className="relative flex flex-col lg:items-center lg:text-center">
              {/* Desktop: the dot sits on the wave at this column's height. */}
              <div className="relative hidden h-[120px] w-full lg:block" aria-hidden>
                <span
                  className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background"
                  style={{ top: dotY[i % dotY.length] }}
                />
              </div>
              {/* Stacked: the dot sits on the rail. */}
              <span
                aria-hidden
                className="absolute -left-8 top-[0.4em] size-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background lg:hidden"
              />
              <span className="text-sm text-primary">{c.period}</span>
              <span className="font-display mt-1 text-[24px] leading-[1.2] text-foreground lg:text-[28px]">
                {c.name}
              </span>
              <span className="mt-1.5 max-w-[240px] text-sm font-light text-muted-foreground">
                {c.detail}
              </span>
            </li>
          ))}
        </ol>
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
