import variantsMap from "@/assets/image-variants.json";

/* The hero is the page's LCP element, so it is the one image that does not go
   through `SmartImage`. Two things need a `<picture>` that `<img>` cannot do:
   pick a crop by media query, so that a phone never pays for the desktop file,
   and offer AVIF ahead of WebP, which halves the bytes on the crop that
   matters most.

   There are three crops of the one frame, because no single one survives the
   whole range. The hero box is 98dvh tall and full width, so its shape swings
   from about 0.49 wide/tall on an upright phone to about 0.74 on an upright
   tablet to well over 1 on anything landscape, and `object-cover` cuts off
   whichever axis overflows. A crop cut for the phone loses the subjects' heads
   off the top of a tablet; the landscape crop that survives a tablet is, on a
   phone, scaled to the hero's height and painted about three times the screen
   width, so two thirds of every byte is thrown away. */
export const HERO_DESKTOP = "/img/hero-club-2560.webp";
export const HERO_TABLET = "/img/hero-club-tablet-1920.webp";
export const HERO_PHONE = "/img/hero-club-phone-768.webp";

/* `lg`, repeated as a raw media query because `<source media>` is not styled
   by Tailwind. */
export const DESKTOP_MEDIA = "(min-width: 1024px)";

/* Everything that is not an upright phone: tablets below `lg`, and any
   viewport in landscape, including a phone turned on its side, where the hero
   box is wider than it is tall. `<source>` is first-match-wins and the desktop
   pair is listed above this one, so the width test only has to exclude phones
   from below. */
export const TABLET_MEDIA = "(min-width: 768px), (orientation: landscape)";

/* `object-cover` normally scales the photo to the viewport's width, but the
   hero is 98dvh tall, so in a box that is tall relative to the photo's ratio
   it is the height that drives the scale and the photo is drawn wider than
   the viewport. Both landscape crops are in that position for the boxes they
   serve, so their `sizes` has to describe the painted width — roughly
   (98dvh + 40px) x the photo's ratio — rather than the viewport.

   The phone crop is cut to the hero's own shape (768 x 1482, about 0.52
   against a box of about 0.49), so there the viewport does drive the scale
   and a plain `100vw` is both honest and the cheapest thing to ask for. */
export const DESKTOP_SIZES = "max(100vw, 160vh)";
export const TABLET_SIZES = "max(100vw, 130vh)";
export const PHONE_SIZES = "100vw";

type Variant = { url: string; width: number };
type HeroEntry = { width: number; height: number; variants: Variant[]; avif?: Variant[] };

export const HERO = variantsMap as unknown as Record<string, HeroEntry>;

export const srcSet = (list: Variant[]) => list.map((v) => `${v.url} ${v.width}w`).join(", ");

/**
 * `<picture>` hides the winning source from React, so React emits no image
 * preload for the hero the way it does for a bare `<img>` — and the hero is
 * the LCP element, so it needs one. These go in the homepage route's `head`.
 * Only AVIF is preloaded: a browser that cannot decode it skips the hint
 * because of `type` and simply loads the WebP from the markup, rather than
 * fetching one file here and a second one from `<picture>`.
 *
 * The three `media` values have to partition the viewport exactly the way the
 * `<source>` list does, or a browser preloads one crop and then paints
 * another.
 */
export const HERO_PRELOAD_LINKS: Array<React.LinkHTMLAttributes<HTMLLinkElement>> = [
  {
    rel: "preload",
    as: "image",
    type: "image/avif",
    media: DESKTOP_MEDIA,
    imageSrcSet: srcSet(HERO[HERO_DESKTOP].avif!),
    imageSizes: DESKTOP_SIZES,
    fetchPriority: "high",
  },
  {
    rel: "preload",
    as: "image",
    type: "image/avif",
    media: `(max-width: 1023.98px) and (min-width: 768px), (max-width: 1023.98px) and (orientation: landscape)`,
    imageSrcSet: srcSet(HERO[HERO_TABLET].avif!),
    imageSizes: TABLET_SIZES,
    fetchPriority: "high",
  },
  {
    rel: "preload",
    as: "image",
    type: "image/avif",
    media: "(max-width: 767.98px) and (orientation: portrait)",
    imageSrcSet: srcSet(HERO[HERO_PHONE].avif!),
    imageSizes: PHONE_SIZES,
    fetchPriority: "high",
  },
];
