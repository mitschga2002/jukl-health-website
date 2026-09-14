import { SmartImage } from "./SmartImage";
import { Link } from "@tanstack/react-router";

const pcHero = "/img/pc-hero-1386.webp";
const profisport = "/img/strength-club-1824.webp";

export function PerformanceClubBlock() {
  return (
    <section className="border-b border-foreground/10">
      <div className="jh-container grid grid-cols-1 lg:grid-cols-2">
        <div className="relative bg-muted min-h-[260px] sm:min-h-[380px] lg:min-h-[640px]">
          <SmartImage
            src={pcHero}
            alt="JuklHealth Performance Club"
            className="absolute inset-0 w-full h-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center jh-gutter py-20">
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-6">
            Performance Club
          </span>
          <h2 className="font-display text-4xl lg:text-6xl tracking-tight leading-[1.05]">
            Athletes are <span className="text-primary">made</span> here.
          </h2>
          <p className="mt-8 max-w-lg text-muted-foreground">
            Willkommen im JuklHealth Performance Club, inmitten von Dornbirn. Funktionelles
            Training, erstklassige Physiotherapie und ein Team aus Trainern, Sportwissenschaftlern
            und Physiotherapeuten.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            <li>· Personal- & Athletiktraining</li>
            <li>· Gruppentraining</li>
            <li>· Individuelle Trainingsplanung</li>
            <li>· Rehabilitation & Verletzungsprävention</li>
            <li>· Mikronährstoff- und Körperanalysen</li>
          </ul>
          <div className="mt-10">
            <Link
              to="/performance-club"
              className="inline-block border border-foreground px-7 py-4 font-display text-sm hover:bg-foreground hover:text-background"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProfisportBlock() {
  return (
    <section className="border-b border-foreground/10">
      <div className="jh-container grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center jh-gutter py-20 order-2 lg:order-1">
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-6">Profisport</span>
          <h2 className="font-display text-4xl lg:text-6xl tracking-tight leading-[1.05]">
            Trainiere wie die <span className="text-primary">Besten</span>.
          </h2>
          <p className="mt-8 max-w-lg text-muted-foreground">
            Deine Erfolgsgeschichte beginnt hier. Wir begleiten Leistungssportler, ambitionierte
            Sportler und Profis auf ihrem Weg. Dein Erfolg ist unser Fokus.
          </p>
          <div className="mt-10">
            <Link
              to="/athletiktraining"
              className="inline-block border border-foreground px-7 py-4 font-display text-sm hover:bg-foreground hover:text-background"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
        <div className="relative bg-muted min-h-[260px] sm:min-h-[380px] lg:min-h-[640px] order-1 lg:order-2">
          <SmartImage
            src={profisport}
            alt="Profisport Training"
            className="absolute inset-0 w-full h-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
