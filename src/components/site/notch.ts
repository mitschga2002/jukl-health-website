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
 */
export type NotchCorner = "tr" | "tl" | "br";

/** Fillet radius. Fixed at the value measured off the Figma export. */
const FILLET = 20;

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
  const W = w + f;
  const H = h + f;

  // Traced for the top-right corner, then mirrored for the others. Sweep flags
  // read in screen space (y down): 1 turns clockwise.
  //   (0,0)         where the cut meets the photo's top edge
  //   arc f         concave fillet down to the bite's left edge
  //   line          down the bite's left edge
  //   arc r         the bite's rounded inner corner, bulging into the bite
  //   line          along the bite's bottom edge
  //   arc f         concave fillet out to the photo's right edge
  const d = [
    "M0,0",
    `A${f},${f} 0 0 1 ${f},${f}`,
    `L${f},${h - r}`,
    `A${r},${r} 0 0 0 ${f + r},${h}`,
    `L${W - f},${h}`,
    `A${f},${f} 0 0 1 ${W},${H}`,
    `L${W},0`,
    "Z",
  ].join("");

  const transform = {
    tr: "",
    tl: `scale(-1,1) translate(${-W},0)`,
    br: `scale(1,-1) translate(0,${-H})`,
  }[corner];

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<path d="${d}" fill="#000"${transform ? ` transform="${transform}"` : ""}/>` +
    `</svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** Where the cut sits, matching the corner the shape was built for. */
export function notchPosition(corner: NotchCorner): string {
  return { tr: "right top", tl: "left top", br: "right bottom" }[corner];
}

/** Size of the mask tile: the bite plus the fillet bleed on two sides. */
export function notchSize(w: number, h: number): string {
  return `${w + FILLET}px ${h + FILLET}px`;
}

/**
 * The inline custom properties a notched element needs. Pass `lg` to change the
 * cut at the `lg` breakpoint — the stylesheet falls back to the base values
 * when the `-lg` ones are absent.
 */
export function notchStyle(
  corner: NotchCorner,
  base: { w: number; h: number; r: number },
  lg?: { w: number; h: number; r: number },
): React.CSSProperties {
  return {
    "--notch-svg": notchMask(corner, base.w, base.h, base.r),
    "--notch-size": notchSize(base.w, base.h),
    "--notch-pos": notchPosition(corner),
    ...(lg
      ? {
          "--notch-svg-lg": notchMask(corner, lg.w, lg.h, lg.r),
          "--notch-size-lg": notchSize(lg.w, lg.h),
        }
      : {}),
  } as React.CSSProperties;
}
