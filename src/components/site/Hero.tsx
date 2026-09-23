import { SmartImage } from "./SmartImage";
import { PillLink } from "./Pill";
import {
  DESKTOP_MEDIA,
  DESKTOP_SIZES,
  HERO,
  HERO_DESKTOP,
  HERO_PHONE,
  HERO_TABLET,
  PHONE_SIZES,
  TABLET_MEDIA,
  TABLET_SIZES,
  srcSet,
} from "./heroImage";

/* Three member portraits, drawn as overlapping 48px discs followed by a "200+"
   counter disc. */
const members = [
  { src: "/img/member-1-96.webp", alt: "" },
  { src: "/img/member-2-96.webp", alt: "" },
  { src: "/img/member-3-96.webp", alt: "" },
];

/**
 * The hero photo runs full bleed — flush to the top and to both edges of the
 * viewport, rounded only along its bottom edge — so it reads as the page's
 * masthead rather than as a card. The nav floats over it, and the copy inside
 * still lands on the shared content line via `jh-container jh-gutter`.
 */
export function Hero() {
  return (
    <header className="relative flex min-h-[98dvh] w-full flex-col overflow-hidden rounded-b-card">
      {/* On a phone the photo is drawn 40px taller than the hero and hung 40px
          above it, which lifts the two faces into the band between the floating
          nav and the eyebrow pill; without the lift they sit exactly behind the
          pill and the headline. Because the photo is scaled to the hero's
          height there, `object-position` cannot do it. From `lg` up the desktop
          crop fills the hero flush instead.

          `<source>` is first-match-wins, so the three crops are listed widest
          box first: desktop, then everything that is not an upright phone
          (tablets below `lg`, and anything in landscape), then the upright
          phone as the fallback on the `<img>` itself. See `heroImage.ts` for
          why one crop cannot serve all three. */}
      <picture>
        <source
          media={DESKTOP_MEDIA}
          type="image/avif"
          srcSet={srcSet(HERO[HERO_DESKTOP].avif!)}
          sizes={DESKTOP_SIZES}
        />
        <source
          media={DESKTOP_MEDIA}
          type="image/webp"
          srcSet={srcSet(HERO[HERO_DESKTOP].variants)}
          sizes={DESKTOP_SIZES}
        />
        <source
          media={TABLET_MEDIA}
          type="image/avif"
          srcSet={srcSet(HERO[HERO_TABLET].avif!)}
          sizes={TABLET_SIZES}
        />
        <source
          media={TABLET_MEDIA}
          type="image/webp"
          srcSet={srcSet(HERO[HERO_TABLET].variants)}
          sizes={TABLET_SIZES}
        />
        <source type="image/avif" srcSet={srcSet(HERO[HERO_PHONE].avif!)} sizes={PHONE_SIZES} />
        <img
          src={HERO_PHONE}
          srcSet={srcSet(HERO[HERO_PHONE].variants)}
          sizes={PHONE_SIZES}
          alt="Trainer und Athletin beim Training im JuklHealth Performance Club"
          width={HERO[HERO_PHONE].width}
          height={HERO[HERO_PHONE].height}
          className="absolute inset-x-0 -top-10 h-[calc(100%+2.5rem)] w-full object-cover lg:top-0 lg:h-full"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.2)_100%)] lg:bg-[linear-gradient(to_left,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_57.6%,rgba(0,0,0,0.5)_68.8%,rgba(0,0,0,0.8)_100%)]"
      />

      <div className="jh-container jh-gutter relative flex flex-1 flex-col justify-between gap-10 pb-6 pt-28 lg:pe-6 lg:pt-[91px]">
        {/* Spacer: keeps the copy block optically centred between the nav
            and the member badge, the way the design distributes them. */}
        <div aria-hidden />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-3">
            {/* Frosted light pill, not a dark one: #fafaf8 at 18% over a 12px
                backdrop blur, hairline #fafaf8 border at 15%, and a soft cast
                shadow below it. */}
            <span className="rounded-card border border-background/15 bg-background/18 px-3.5 py-1 text-xs font-light uppercase leading-[1.25] tracking-[0.05em] text-background shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-[12px]">
              Ein System · Training · Physio · Analyse
            </span>
            <h1 className="font-display max-w-[620px] text-[40px] leading-[1.25] text-background sm:text-[52px] lg:text-[64px]">
              <span className="block font-extralight">Wissenschaft­lich fundier­tes</span>
              <span className="block font-bold italic">Training und Therapie.</span>
            </h1>
          </div>

          <p className="max-w-[570px] text-base font-light leading-[1.45] text-background/90">
            Das JuklHealth System verbindet klinische Physiotherapie mit individuell abgestimmtem
            Training – in einem ruhigen, exklusiven Setting in Dornbirn. Plus Trainingsmöglichkeiten
            24/7, Leistungs- und Bewegungsanalyse.
          </p>

          <div className="flex flex-wrap items-stretch gap-4">
            <PillLink to="/kontakt">Termin vereinbaren</PillLink>
            <PillLink to="/performance-club" variant="outlineOnPhoto" arrow={false}>
              Performance Club entdecken
            </PillLink>
          </div>
        </div>

        <div className="flex items-center justify-start lg:justify-end">
          <div className="flex items-center rounded-full border border-white/20 bg-white/80 px-4 py-2 backdrop-blur-xl gap-4">
            <div className="flex shrink-0 items-center">
              {members.map((m) => (
                <img
                  key={m.src}
                  src={m.src}
                  alt={m.alt}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                  className="-mr-4 size-12 rounded-full border-2 border-white object-cover"
                />
              ))}
              <span className="flex size-12 items-center justify-center rounded-full border-2 border-white bg-[#e7e7e7] text-xs font-light text-foreground">
                200+
              </span>
            </div>
            <p className="text-xs font-light leading-[1.25] text-foreground">
              zufriedene JUKL
              <br />
              Health Mitglieder
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
