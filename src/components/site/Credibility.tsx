import { SmartImage } from "./SmartImage";
import { Eyebrow, PillLink } from "./Pill";
import { NotchFrame } from "./NotchFrame";
import { cn } from "@/lib/utils";
import { MODULE_TOP } from "./rhythm";

const julianPortrait = "/img/julian-portrait-1460.webp";

/**
 * The dark team slab. It is the last light-on-dark module before the footer,
 * so it owns the rounded top edge and the footer below it runs seamlessly
 * (`<SiteFooter seamless />`) out of the same surface colour.
 */
export function Credibility() {
  return (
    <section className={cn(MODULE_TOP, "rounded-t-card bg-surface")}>
      <div className="jh-container jh-gutter">
        <div className="grid grid-cols-1 gap-12 pb-8 pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-24">
          <div className="relative">
            <NotchFrame
              className="aspect-[776/484] w-full"
              notch={{
                corner: "tr",
                base: { w: 150, h: 94, r: 34 },
                lg: { w: 231, h: 114, r: 34 },
              }}
            >
              <SmartImage
                src={julianPortrait}
                alt="Julian Kleinheinz — Sportwissenschaftler & Gesundheitscoach"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="size-full object-cover object-top"
              />
            </NotchFrame>
            <div className="absolute right-0 top-0 flex h-[84px] w-[140px] flex-col items-center justify-center gap-1 rounded-card bg-primary p-2.5 lg:h-[104px] lg:w-[221px]">
              <p className="font-display text-[32px] leading-[1.25] text-primary-foreground lg:text-[42px]">
                10+
              </p>
              <p className="text-sm leading-[1.25] text-primary-foreground/80 lg:text-base">
                Jahre Erfahrung
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:px-16">
            <div className="flex flex-col gap-3">
              <Eyebrow className="text-surface-muted-foreground">Das Team</Eyebrow>
              <h2 className="font-display text-[32px] leading-[1.25] text-surface-foreground lg:text-[48px]">
                Expertise aus Sportwissenschaft und Physiotherapie.
              </h2>
            </div>
            <div className="flex flex-col gap-4 text-base leading-[1.45] text-surface-foreground/80">
              <p>
                Geleitet von Experten aus den Bereichen Sportwissenschaft und Physiotherapie, bietet
                das JuklHealth System an jedem Standort eine ruhige, klinische Umgebung für
                nachhaltige Entwicklung.
              </p>
              <p>
                Wir arbeiten mit evidenzbasierten Methoden und modernem Equipment, um Ihre Ziele
                präzise und sicher zu erreichen.
              </p>
            </div>
            <div className="flex pt-4">
              <PillLink to="/team" variant="outlineOnDark">
                Das Team entdecken
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
