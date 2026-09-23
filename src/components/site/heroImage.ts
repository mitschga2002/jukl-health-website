import variantsMap from "@/assets/image-variants.json";

/* The hero is the page's LCP element, so it is the one image that does not go
   through `SmartImage`. Two things need a `<picture>` that `<img>` cannot do:
   pick the phone crop or the desktop crop by media query, so that a phone
   never pays for the desktop file, and offer AVIF ahead of WebP, which halves
   the bytes on the crop that matters most. */
export const HERO_DESKTOP = "/img/hero-club-2560.webp";
export const HERO_MOBILE = "/img/hero-club-mobile-1920.webp";

/* Below this the phone crop is used; it is the `lg` breakpoint, and it has to
   be repeated as a raw media query because `<source media>` is not styled by
   Tailwind. */
export const DESKTOP_MEDIA = "(min-width: 1024px)";

/* `object-cover` normally scales the photo to the viewport's width, but the
   hero is 98dvh tall, so in a window that is tall relative to the photo's
   ratio it is the height that drives the scale and the photo is drawn wider
   than the viewport. On a phone that is always the case: the landscape photo
   is scaled to the hero's height and painted roughly 1.3 x (98dvh + 40px)
   wide, about three times the phone's width. Left at `100vw` the browser
   would size its request to the viewport and pick a variant around half the
   resolution it actually paints. */
export const DESKTOP_SIZES = "max(100vw, 160vh)";
export const MOBILE_SIZES = "max(100vw, 130vh)";

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
    media: "(max-width: 1023.98px)",
    imageSrcSet: srcSet(HERO[HERO_MOBILE].avif!),
    imageSizes: MOBILE_SIZES,
    fetchPriority: "high",
  },
];
