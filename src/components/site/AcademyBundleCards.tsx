import { ArrowUpRight } from "lucide-react";

import type { AcademyBundle } from "@/lib/academy.functions";
import { formatEuro, formatMinutes } from "@/lib/academy";

/** Bundles on the dark slab: several courses for one price, the saving spelled out. */
export function AcademyBundleCards({ items }: { items: readonly AcademyBundle[] }) {
  return (
    <div className="jh-stagger grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
      {items.map((bundle) => (
        <a
          key={bundle.slug}
          href={bundle.url}
          className="group relative flex flex-col gap-5 overflow-hidden rounded-card bg-surface-elevated p-6 lg:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-display text-[20px] leading-none text-primary">
                {bundle.courseCount} Kurse · {formatMinutes(bundle.totalMinutes)}
              </span>
              <h3 className="font-display text-[30px] font-bold uppercase leading-none tracking-tight text-surface-foreground lg:text-[34px]">
                {bundle.title}
              </h3>
            </div>
            <ArrowUpRight
              className="mt-1 size-5 shrink-0 text-surface-foreground/40 transition-colors duration-300 group-hover:text-primary"
              aria-hidden
            />
          </div>
          {bundle.tagline ? (
            <p className="text-base font-light leading-[1.5] text-surface-foreground/80">
              {bundle.tagline}
            </p>
          ) : null}
          <ul className="flex flex-wrap gap-1.5">
            {bundle.courses.map((course) => (
              <li
                key={course.slug}
                className="rounded-image bg-surface-foreground/10 p-2 text-xs font-light uppercase leading-[1.25] text-surface-foreground/90"
              >
                {course.title}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-2">
            <span className="font-display text-[24px] leading-none text-surface-foreground">
              {formatEuro(bundle.priceCents)}
            </span>
            {bundle.savingsPercent > 0 ? (
              <>
                <span className="text-sm text-surface-foreground/60 line-through">
                  {formatEuro(bundle.regularPriceCents)}
                </span>
                <span className="text-sm text-primary">{bundle.savingsPercent} % gespart</span>
              </>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}
