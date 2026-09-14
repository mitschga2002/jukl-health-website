import { Link } from "@tanstack/react-router";
import { SmartImage } from "./SmartImage";

const heroAthlete = "/img/hero-athlete-1385.webp";

export function Hero() {
  return (
    <header className="relative border-b border-foreground/10">
      <div className="jh-container grid lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center min-w-0 jh-gutter py-16 lg:py-20 order-2 lg:order-1">
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-8">
            Ein System · Training · Physio · Analyse
          </span>
          <h1 className="font-display text-5xl lg:text-7xl leading-[1.02] tracking-tight text-balance hyphens-auto break-words">
            Wissenschaftlich fundiertes <span className="text-primary">Training und Therapie.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-muted-foreground text-pretty">
            Das JuklHealth System verbindet klinische Physiotherapie mit individuell abgestimmtem
            Training – in einem ruhigen, exklusiven Setting in Dornbirn. Plus Trainingsmöglichkeiten
            24/7, Leistungs- und Bewegungsanalyse.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/kontakt"
              className="inline-block bg-primary text-primary-foreground px-7 py-4 font-display text-sm hover:bg-primary-hover"
            >
              Termin vereinbaren
            </Link>
            <Link
              to="/performance-club"
              className="inline-block border border-foreground px-7 py-4 font-display text-sm hover:bg-foreground hover:text-background"
            >
              Performance Club entdecken
            </Link>
          </div>
        </div>

        <div className="relative w-full min-w-0 h-[40vh] min-h-[240px] sm:h-[55vh] lg:h-auto lg:min-h-[560px] order-1 lg:order-2 bg-muted">
          <SmartImage
            src={heroAthlete}
            alt="Athlet beim Training im JuklHealth Performance Club"
            className="w-full h-full object-cover object-[20%_center]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
    </header>
  );
}
