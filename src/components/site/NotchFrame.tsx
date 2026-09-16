import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { notchStyle, type NotchSpec } from "./notch";

type NotchFrameProps = ComponentPropsWithoutRef<"div"> & {
  /** The cut. See `notch.ts` for how a bite is measured. */
  notch: NotchSpec;
  /** A second cut in another corner, stamped out of the same mask. */
  notch2?: NotchSpec;
};

/**
 * A rounded photo frame with a notch cut out of it.
 *
 * Give the frame its size (`aspect-*`, `h-*`, `w-*`); the children fill it.
 * Three elements do three jobs, and they are separate on purpose:
 *
 *   frame  — sizes, rounds and clips. Clipping is a geometric operation with
 *            no raster of its own, so it is the one edge that can coincide with
 *            the photo's without leaving a seam.
 *   mask   — carries `.jh-notch`, overhanging the frame by the notch bleed so
 *            that the photo's antialiased edge rows sit inside the mask rather
 *            than on its boundary (see `BLEED` in `notch.ts`).
 *   photo  — the children, inset back to the frame's own box.
 *
 * Both cuts of the carousel live in this one mask; a mask nested inside a mask
 * resolves its own edges and brings the hairline back.
 */
export function NotchFrame({ notch, notch2, className, children, ...rest }: NotchFrameProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-image", className)} {...rest}>
      <div className="jh-notch" style={notchStyle(notch, notch2)}>
        <div className="jh-notch-photo">{children}</div>
      </div>
    </div>
  );
}
