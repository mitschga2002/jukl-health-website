import { ArrowUpRight } from "lucide-react";

import type { AcademyCourse } from "@/lib/academy.functions";
import { AcademyCourseCover } from "@/components/site/AcademyCourseCover";

/**
 * The app's course cards in the website's clothes: cover, title, tagline and
 * the facts a visitor decides on. The whole card opens the course in the app,
 * where previews, access and payment live.
 */
export function AcademyCourseCards({ items }: { items: readonly AcademyCourse[] }) {
  return (
    <div className="jh-stagger grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {items.map((course) => {
        const facts = [
          course.duration,
          course.chapters > 0
            ? `${course.chapters} ${course.chapters === 1 ? "Kapitel" : "Kapitel"}`
            : null,
          course.experts[0]?.name ?? null,
        ].filter(Boolean);

        return (
          <a
            key={course.slug}
            href={course.url}
            className="group flex flex-col overflow-hidden rounded-card bg-muted"
          >
            <AcademyCourseCover src={course.coverImageUrl} position={course.coverImagePosition} />
            <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[24px] leading-[1.25] text-foreground lg:text-[28px]">
                  {course.title}
                </h3>
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-primary"
                  aria-hidden
                />
              </div>
              {course.subtitle ? (
                <p className="text-base font-light leading-[1.5] text-muted-foreground">
                  {course.subtitle}
                </p>
              ) : null}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-3 text-sm text-muted-foreground">
                <span>{facts.join(" · ")}</span>
                {course.price ? (
                  <span className="font-medium text-foreground">{course.price}</span>
                ) : null}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
