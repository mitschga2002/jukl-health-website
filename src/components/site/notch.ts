/**
 * The notch cut, as a single mask shape.
 *
 * Where a control overlaps a photo — the arrow button on a service row, the
 * "Athletes are made here" label, the carousel timeline, the "10+ Jahre" badge
 * — the photo is stamped out around it rather than the control sitting on top.
 * Reconstructed from the Figma export of a service row (368x207):
 *
 *   bite         = the control inflated by a 10px gap
 *   inner corner = control radius + gap, centred on the control's centre
 *   fillets      = 20px arcs tangent to that circle and to the photo's edge,
 *                  which is what keeps the cut from reading as a crop
 *
 * This used to be assembled from five gradient layers composited with
 * `mask-composite`. The geometry was exact, but each `subtract` leaves a little
 * rounding error along the layer boundaries, and with two of them the photo
 * ended up fractionally transparent in a 1px band tracing the bite's raw
 * rectangle — the page bled through it as a pale hairline, most visible against
 * a dark photo, and with a hard corner where the cut is actually rounded.
 *
 * Describing the whole cut as one path removes the compositing entirely: one
 * shape, one subtract, nothing to accumulate.
 *
 * The mask is applied by `<NotchFrame>`, never to the photo element itself —
 * see `BLEED` for why.
 */
export type NotchCorner = "tr" | "tl" | "br";

/** Fillet radius. Fixed at the value measured off the Figma export. */
const FILLET = 20;

/**
 * How far the masked element overhangs the photo, in px.
 *
 * A photo's edge almost never lands on a device pixel row — fractional layout
 * heights and browser zoom (1.75x was enough) see to that — so its last row is
 * antialiased: part photo, part whatever is behind. When the mask ends on the
 * same row, Chromium resolves the two edges independently, and in the bite the
 * mask comes out fractionally open exactly where the photo is fractionally
 * present. A 1px line of photo survives along the edge, tracing the bottom of
 * the cut.
 *
 * So the mask surface is not the photo. `<NotchFrame>` masks an element that
 * extends `BLEED` past the photo on every side, and the shape below extends the
 * bite the same distance past the photo's edge. The photo's soft last row then
 * sits well inside the mask, on rows that are entirely bite, and the frame's
 * overflow clip trims the overhang. Two pixels covers the widest antialiased
 * edge any zoom level produces.
 */
const BLEED = 2;

/**
 * Builds a `url("data:image/svg+xml,…")` mask image for one corner.
 *
 * @param corner which corner of the photo the control sits in
 * @param w      bite width  = control width + gap
 * @param h      bite height = control height + gap
 * @param r      bite inner corner radius = control radius + gap
 */
export function notchMask(corner: NotchCorner, w: number, h: number, r: number): string {
  const f = FILLET;
  const b = BLEED;
  const W = w + f;
  const H = h + f;
  const TW = W + b;
  const TH = H + b;

  // Traced for the top-right corner, then mirrored for the others. The photo's
  // top edge sits at y = b and its right edge at x = W, so the fillets stay
  // tangent to them exactly as designed; the last three points carry the shape
  // out past both, across the bleed.
  //   (0,b)  where the cut meets the photo's top edge
  //   arc f  concave fillet down to the bite's left edge
  //   line   down the bite's left edge
  //   arc r  the bite's rounded inner corner, bulging into the bite
  //   line   along the bite's bottom edge
  //   arc f  concave fillet out to the photo's right edge
  //   then   out to TW, up to y = 0, and back along the top
  const d = [
    `M0,${b}`,
    `A${f},${f} 0 0 1 ${f},${f + b}`,
    `L${f},${h - r + b}`,
    `A${r},${r} 0 0 0 ${f + r},${h + b}`,
    `L${W - f},${h + b}`,
    `A${f},${f} 0 0 1 ${W},${H + b}`,
    `L${TW},${H + b}`,
    `L${TW},0`,
    "L0,0",
    "Z",
  ].join("");

  const transform = {
    tr: "",
    tl: `scale(-1,1) translate(${-TW},0)`,
    br: `scale(1,-1) translate(0,${-TH})`,
  }[corner];

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}" viewBox="0 0 ${TW} ${TH}">` +
    `<path d="${d}" fill="#000"${transform ? ` transform="${transform}"` : ""}/>` +
    `</svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Where the cut sits on the masked element. The element already overhangs the
 * photo by `BLEED`, so the tile's own bleed lands on that overhang when the
 * tile is flush with the corner.
 */
export function notchPosition(corner: NotchCorner): string {
  return { tr: "right top", tl: "left top", br: "right bottom" }[corner];
}

/** Size of the mask tile: the bite, the fillet on two sides, and the bleed. */
export function notchSize(w: number, h: number): string {
  return `${w + FILLET + BLEED}px ${h + FILLET + BLEED}px`;
}

type Bite = { w: number; h: number; r: number };

/**
 * One cut. Pass `lg` to change the bite at the `lg` breakpoint — the
 * stylesheet falls back to the base values when the `-lg` ones are absent.
 */
export type NotchSpec = { corner: NotchCorner; base: Bite; lg?: Bite };

function notchVars(prefix: string, { corner, base, lg }: NotchSpec): Record<string, string> {
  return {
    [`${prefix}-svg`]: notchMask(corner, base.w, base.h, base.r),
    [`${prefix}-size`]: notchSize(base.w, base.h),
    [`${prefix}-pos`]: notchPosition(corner),
    ...(lg
      ? {
          [`${prefix}-svg-lg`]: notchMask(corner, lg.w, lg.h, lg.r),
          [`${prefix}-size-lg`]: notchSize(lg.w, lg.h),
        }
      : {}),
  };
}

/**
 * The inline custom properties `.jh-notch` reads. A second cut, when given,
 * goes into the same mask as another layer — two nested masked elements would
 * each resolve their own edges and bring the hairline back.
 */
export function notchStyle(first: NotchSpec, second?: NotchSpec): React.CSSProperties {
  return {
    "--notch-bleed": `${BLEED}px`,
    ...notchVars("--notch", first),
    ...(second ? notchVars("--notch2", second) : {}),
  } as React.CSSProperties;
}
