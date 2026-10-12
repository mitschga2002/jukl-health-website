import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { Eyebrow, PillLink } from "./Pill";
import { ClubVideo } from "./ClubVideo";
import { clubs } from "@/lib/clubs";
import { cn } from "@/lib/utils";
import { SECTION_Y } from "./rhythm";
import { NotchFrame } from "./NotchFrame";

const services = [
  {
    title: "Personal- & Athletik­training",
    body: "Eins-zu-eins Betreuung, individuelle Biomechanik und Optimierung der physischen Leistungsfähigkeit.",
    tags: ["1 : 1", "Personal Training", "Athletik"],
    to: "/personaltraining",
    image: "/img/training-banner-1588.webp",
    imageAlt: "Personal Training mit Battle Ropes bei JuklHealth",
    imagePosition: "object-[center_15%]",
  },
  {
    title: "Physio­therapie",
    body: "Klinische Physiotherapie: Ursache finden, gezielt behandeln, zurück in schmerzfreie Bewegung.",
    tags: ["Physiotherapie", "Diagnostik"],
    to: "/physiotherapie",
    image: "/img/physio-behandlung-1600.webp",
    imageAlt: "Physiotherapeut bei der Behandlung am Knie",
    imagePosition: "object-[30%_center]",
  },
  {
    title: "Strength Club Abo",
    body: "160 m², 24/7-Zugang, exklusives Trainingsambiente. Exklusiv auf 100 Mitglieder begrenzt – inklusive Betreuungssystem über ein ganzes Jahr.",
    tags: ["24/7", "Membership"],
    to: "/strength-club",
    image: "/img/strength-club-1824.webp",
    imageAlt: "Trainingsfläche im Strength Club Dornbirn",
  },
  {
    title: "Rehabili­tation & Verletzungs­prävention",
    body: "Trainingstherapie als aktives Aufbautraining – für die sichere Rückkehr und nachhaltige Prävention.",
    tags: ["Trainingstherapie", "Prävention"],
    to: "/trainingstherapie",
    image: "/img/analysen-hero-1446.webp",
    imageAlt: "Bewegungsanalyse zur Verletzungsprävention",
    imagePosition: "object-[center_20%]",
  },
  {
    title: "Individuelle Trainings­planung & Periodisierung",
    body: "Evidenzbasierte, strukturierte Programmierungen, die exakt zu deinem Status quo passen.",
    tags: ["Programming", "Periodisierung"],
    to: "/trainingsplanung",
    image: "/img/tp-planung-1600.webp",
    imageAlt: "Trainingsplanung am Tablet gemeinsam mit dem Athleten",
    imagePosition: "object-[center_20%]",
  },
  {
    title: "Körper- & Leistungs­analysen",
    body: "Datengestützte Leistungs-, Stoffwechsel- und Bewegungsanalysen als objektiver Status quo.",
    tags: ["Stoffwechsel", "Screening", "Gesundheitscoaching"],
    to: "/analysen",
    image: "/img/leistungsanalyse-1217.webp",
    imageAlt: "Leistungsdiagnostik mit Atemmaske auf dem Ergometer",
    imagePosition: "object-[center_30%]",
  },
  {
    title: "Gruppen­training",
    body: "Strukturierte Kleingruppen mit individueller Korrektur und konsequenter Intensität.",
    tags: ["Kleingruppe", "Functional"],
    to: "/gruppentraining",
    image: "/img/gruppentraining-1032.webp",
    imageAlt: "Gruppentraining bei JuklHealth",
    imagePosition: "object-[center_45%]",
  },
] as const;

/* Hover borrows the Standorte timing, not its colour: on the dark slab the
   green already lives in the arrow button, so the row lifts with a neutral
   wash and hairline instead. The wash is its own layer rather than a
   `hover:bg-*` swap so it sits *on* the elevated surface instead of replacing
   it, and the photo zooms inside a fixed frame — the notch is a mask on the
   frame, so scaling the <img> instead of the wrapper would drag the cut-out
   away from the arrow button. */
const EASE_PREMIUM = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

function ServiceRow({ service, index }: { service: (typeof services)[number]; index: number }) {
  return (
    <Link
      to={service.to}
      className={cn(
        "group relative grid grid-cols-1 gap-6 rounded-card bg-surface-elevated p-6 transition-shadow xl:grid-cols-12 xl:items-start xl:gap-8 xl:px-6 xl:py-10",
        EASE_PREMIUM,
        "hover:inset-ring-1 hover:inset-ring-surface-foreground/20",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-card bg-surface-foreground/5 opacity-0 transition-opacity group-hover:opacity-100",
          EASE_PREMIUM,
        )}
      />

      <p
        className={cn(
          "relative text-base font-light uppercase leading-[1.25] tracking-[0.05em] text-[#d4d4d4] transition-colors group-hover:text-surface-foreground xl:col-span-2",
          EASE_PREMIUM,
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </p>

      <h3 className="font-display relative text-[28px] leading-[1.25] text-surface-foreground lg:text-[40px] xl:col-span-4">
        {service.title}
      </h3>

      <div className="relative flex flex-col gap-6 xl:col-span-3">
        <p className="max-w-[372px] text-base font-light leading-[1.3] text-surface-foreground/90">
          {service.body}
        </p>
        <div className="flex max-w-[372px] flex-wrap items-center gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-image bg-surface-foreground/10 p-2 text-xs font-light uppercase leading-[1.25] text-surface-foreground/90 transition-colors group-hover:bg-surface-foreground/20",
                EASE_PREMIUM,
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative xl:col-span-3">
        <NotchFrame
          className="h-[200px] w-full xl:ml-auto xl:h-[207px] xl:max-w-[368px]"
          notch={{ corner: "tr", base: { w: 50, h: 50, r: 30 } }}
        >
          <SmartImage
            src={service.image}
            alt={service.imageAlt}
            /* Not `100vw`: the row nests inside jh-edge, the slab's own
               padding and the card's padding, which take 112px off the
               viewport below lg and 160px from lg up. Left at 100vw the
               browser sizes its request to the whole screen and picks a rung
               too big for a 300px frame. */
            sizes="(min-width: 1280px) 368px, (min-width: 1024px) calc(100vw - 160px), calc(100vw - 112px)"
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none",
              "imagePosition" in service ? service.imagePosition : undefined,
            )}
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
    </Link>
  );
}

export function SystemBlock() {
  return (
    <section className={cn("jh-container jh-edge", SECTION_Y)}>
      <div className="flex flex-col gap-10 rounded-card bg-surface px-4 py-16 lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-8">
          <div className="flex flex-col gap-3 lg:w-[1088px] lg:max-w-[65%]">
            <Eyebrow className="text-surface-muted-foreground">JuklHealth System</Eyebrow>
            <h2 className="font-display text-[28px] leading-[1.25] text-surface-foreground lg:text-[42px]">
              Ein Trainingssystem, mehrere Standorte. Funktionelles Training, erstklassige
              Physiotherapie und interdisziplinäre Expertise aus Sportwissenschaft und Therapie – in
              Dornbirn und Widnau.
            </h2>
          </div>
          <div className="flex flex-1 justify-start lg:justify-end">
            <PillLink to="/training-physio" variant="outlineOnDark">
              Angebot entdecken
            </PillLink>
          </div>
        </div>

        <div className="jh-stagger flex flex-col gap-8">
          {services.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* The clubs on the homepage: on desktop one media frame stays pinned on the
   left while the three clubs scroll past on the right, and the frame fades to
   whichever club crosses the middle of the viewport — so only one video ever
   plays. Below lg there is no room for a pinned column; each club then
   carries its own frame above its text, and plays only while on screen. */
export function LocationsBlock() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // A one-pixel band across the middle of the viewport: the club crossing
    // it is the one in focus.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const el of itemRefs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="jh-container jh-gutter">
      <div className={cn("flex flex-col gap-10 lg:gap-16", SECTION_Y)}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-8">
          <div className="flex flex-col gap-3 lg:w-[1088px] lg:max-w-[65%]">
            <Eyebrow>Standorte</Eyebrow>
            <h2 className="font-display text-[32px] leading-[1.25] text-foreground lg:text-[48px]">
              Drei Clubs. Ein System.
            </h2>
          </div>
          <div className="flex flex-1 justify-start lg:justify-end">
            <PillLink to="/kontakt">Termin vereinbaren</PillLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-[12vh] mx-auto aspect-[3/4] h-[min(76vh,720px)] overflow-hidden rounded-card bg-muted">
              {clubs.map((c, i) => (
                <div
                  key={c.name}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ClubMedia club={c} active={i === active} sizes="40vw" />
                </div>
              ))}
              <span className="absolute left-4 top-4 rounded-image bg-background/85 px-2.5 py-1.5 text-xs uppercase tracking-[0.05em] text-foreground backdrop-blur-md">
                {clubs[active].name}
              </span>
              <span className="absolute bottom-4 right-4 rounded-image bg-background/85 px-2.5 py-1.5 text-xs tabular-nums tracking-[0.05em] text-foreground backdrop-blur-md">
                {String(active + 1).padStart(2, "0")} / {String(clubs.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <ol className="flex flex-col gap-16 lg:gap-0">
            {clubs.map((c, i) => (
              <li
                key={c.name}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className={cn(
                  "flex flex-col gap-6 lg:min-h-[72vh] lg:justify-center lg:transition-opacity lg:duration-500 motion-reduce:transition-none",
                  i === active ? "lg:opacity-100" : "lg:opacity-35",
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-muted lg:hidden">
                  <ClubMedia club={c} sizes="100vw" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.05em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {c.area}
                  </span>
                  <h3 className="font-display text-[28px] leading-[1.25] text-foreground lg:text-[40px]">
                    {c.name}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground">
                    {c.address.join(" · ")}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 border-t border-border pt-4">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-3 text-base font-light leading-[1.45]">
                      <span className="shrink-0 text-primary" aria-hidden>
                        →
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex">
                  <PillLink to={c.link.to ?? "/clubs"} variant="outlineOnLight">
                    {c.name} entdecken
                  </PillLink>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** A club's video where it has one, its photo otherwise. */
function ClubMedia({
  club,
  active = true,
  sizes,
}: {
  club: (typeof clubs)[number];
  active?: boolean;
  sizes: string;
}) {
  return club.video ? (
    <ClubVideo
      src={club.video.src}
      poster={club.video.poster}
      label={club.imageAlt}
      active={active}
    />
  ) : (
    <SmartImage
      src={club.image}
      alt={club.imageAlt}
      sizes={sizes}
      className="size-full object-cover"
    />
  );
}

/* Athletes at work, for the "Trainiere wie die Besten" claim. The clubs have
   their own photos in the Standorte block right below, so they are not
   repeated here. */
const profisportSlides = [
  { src: "/img/ath-testing-1600.webp", alt: "Athlet beim Y-Balance-Test im Performance Club" },
  { src: "/img/tp-saison-1600.webp", alt: "Athlet beim Sprint auf der Trainingsfläche" },
  { src: "/img/pc-agility-1600.webp", alt: "Koordinationstraining mit Coach" },
];

const SLIDE_MS = 3200;

export function ProfisportBlock() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setSlide((s) => (s + 1) % profisportSlides.length), []);

  // Tracked as state rather than read inline, because the timeline below has to
  // agree with it: if nothing is advancing, nothing should appear to be
  // counting down either.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The progress bar IS the timer — `next` runs off its animationend, below.
  // A separate interval would be a second clock: hovering pauses the bar where
  // it stands but can only cancel and restart an interval, so on release the
  // bar would finish early and then sit full waiting for the slide to catch up.
  // One clock means pausing the animation pauses the advance, exactly.

  return (
    <section className="jh-container jh-gutter">
      <div className={cn("grid grid-cols-1 gap-16 lg:grid-cols-2", SECTION_Y)}>
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>Profisport</Eyebrow>
            <h2 className="font-display text-[32px] leading-[1.25] text-foreground lg:text-[48px]">
              <span className="block">Trainiere wie</span>
              <span>die </span>
              <span className="italic text-primary">Besten</span>
              <span>.</span>
            </h2>
          </div>
          <p className="max-w-[450px] text-base leading-[1.45] text-foreground">
            Deine Erfolgsgeschichte beginnt hier. Wir begleiten Leistungssportler, ambitionierte
            Sportler und Profis auf ihrem Weg. Dein Erfolg ist unser Fokus.
          </p>
          <div className="flex pt-4">
            <PillLink to="/training-physio" variant="outlineOnLight">
              Mehr erfahren
            </PillLink>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Both cuts — the label's top-left and the timeline's bottom-right —
              come out of the one mask; see NotchFrame for why not two. */}
          <NotchFrame
            className="aspect-[776/484] w-full"
            notch={{
              corner: "br",
              base: { w: 118, h: 50, r: 30 },
              lg: { w: 166, h: 50, r: 30 },
            }}
            notch2={{
              corner: "tl",
              base: { w: 160, h: 90, r: 34 },
              lg: { w: 182, h: 102, r: 34 },
            }}
          >
            <div
              className="relative size-full bg-background"
              aria-roledescription="Karussell"
              aria-label="Athleten im Training"
            >
              {profisportSlides.map((s, i) => (
                <SmartImage
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  aria-hidden={i !== slide}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
                    i === slide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </NotchFrame>

          <div className="absolute left-0 top-0 flex h-[80px] w-[150px] flex-col justify-center rounded-card bg-surface px-3 lg:h-[92px] lg:w-[172px] lg:px-4">
            <p className="whitespace-nowrap text-xl font-light leading-[1.25] text-surface-foreground lg:text-2xl">
              Athletes are
            </p>
            <p className="whitespace-nowrap text-xl leading-[1.25] text-surface-foreground lg:text-2xl">
              <span className="font-bold italic text-primary">made</span> here.
            </p>
          </div>

          {/* The timeline is the whole control: one segment per slide, each a
              button, with the active one filling across the photo's dwell time.
              Prev/next arrows would only duplicate what a click on a segment
              already does. The 40px row keeps the tap target comfortable even
              though the bar itself is 3px. */}
          <div className="absolute bottom-0 right-0 flex h-10 items-center gap-1.5">
            {profisportSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Bild ${i + 1} von ${profisportSlides.length} anzeigen`}
                aria-current={i === slide}
                className="group/seg flex h-10 w-8 cursor-pointer items-center lg:w-12"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-foreground/20 transition-colors group-hover/seg:bg-foreground/35">
                  {/* Both states drive the same property. Tailwind's
                      `scale-x-*` compiles to `scale`, which would multiply
                      against the keyframes' `transform` and pin the bar at
                      zero width. */}
                  <span
                    key={`${i}-${slide}`}
                    onAnimationEnd={i === slide ? next : undefined}
                    className="block h-full origin-left rounded-full bg-foreground"
                    style={
                      i === slide && !reduced
                        ? {
                            animation: `jh-carousel-fill ${SLIDE_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }
                        : {
                            transform: `scaleX(${i < slide || (i === slide && reduced) ? 1 : 0})`,
                          }
                    }
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
