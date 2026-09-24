import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BulletList, Section } from "./content";
import { LocationMap } from "./LocationMap";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

/*
 * Modules for the club pages. They sit beside the service modules in
 * `ServicePage` (offer cards, stories, closing CTA) and follow the same page
 * shape: hero (with the key facts) → what it looks like → what you can do
 * there → how to get there → stories → CTA.
 */

const EASE_PREMIUM = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * A bento of club photos: one large frame and up to four smaller ones beside
 * it on desktop, a two-column grid on smaller screens.
 */
export function ClubGallery({
  eyebrow,
  title,
  images,
}: {
  eyebrow: string;
  title: string;
  images: readonly { src: string; alt: string; position?: string }[];
}) {
  const [lead, ...rest] = images;
  if (!lead) return null;
  return (
    <Section eyebrow={eyebrow} title={title}>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
        <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-card bg-muted lg:row-span-2 lg:aspect-auto">
          <SmartImage
            src={lead.src}
            alt={lead.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn("absolute inset-0 size-full object-cover", lead.position)}
          />
        </div>
        {rest.slice(0, 4).map((img) => (
          <div
            key={img.src}
            className="relative aspect-[4/3] overflow-hidden rounded-card bg-muted"
          >
            <SmartImage
              src={img.src}
              alt={img.alt}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={cn("absolute inset-0 size-full object-cover", img.position)}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Address as heading, practical notes beside the map. */
export function ClubLocation({
  title,
  notes,
  map,
}: {
  title: string;
  notes: string[];
  map: Parameters<typeof LocationMap>[0];
}) {
  return (
    <Section eyebrow="STANDORT" title={title}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
        <BulletList title="Gut zu wissen" items={notes} />
        <LocationMap {...map} />
      </div>
    </Section>
  );
}

export type ClubCard = {
  name: string;
  area: string;
  address: string;
  image: string;
  imageAlt: string;
  points: readonly string[];
  link: Pick<LinkProps, "to">;
};

/** The clubs overview: one photo card per club, facts under the name. */
export function ClubCards({ items }: { items: readonly ClubCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
      {items.map((c) => (
        <Link
          key={c.name}
          {...c.link}
          className="group flex flex-col overflow-hidden rounded-card bg-muted"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <SmartImage
              src={c.image}
              alt={c.imageAlt}
              sizes="(min-width: 768px) 33vw, 100vw"
              className={cn(
                "size-full object-cover transition-transform group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none",
                EASE_PREMIUM,
              )}
            />
            <span className="absolute left-4 top-4 rounded-image bg-background/85 px-2.5 py-1.5 text-xs uppercase tracking-[0.05em] text-foreground backdrop-blur-md">
              {c.area}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[24px] leading-[1.25] text-foreground lg:text-[28px]">
                  {c.name}
                </h3>
                <p className="text-sm font-light text-muted-foreground">{c.address}</p>
              </div>
              <ArrowUpRight
                className="mt-1 size-5 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-primary"
                aria-hidden
              />
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
          </div>
        </Link>
      ))}
    </div>
  );
}
