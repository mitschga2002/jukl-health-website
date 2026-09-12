import { SmartImage } from "./SmartImage";
import { Link } from "@tanstack/react-router";

const julianPortrait = "/img/julian-portrait-1460.webp";

export function Credibility() {
  return (
    <section className="bg-foreground text-background py-24 px-6 lg:px-12">
      <div className="jh-container grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24">
        <div className="relative">
          <SmartImage
            src={julianPortrait}
            alt="Julian Kleinheinz — Sportwissenschaftler & Gesundheitscoach"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full aspect-[4/3] sm:aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-10 lg:p-12 hidden lg:block">
            <div className="font-display text-5xl leading-none tracking-tight">10+</div>
            <div className="text-[11px] mt-3 uppercase tracking-[0.22em]">Jahre Erfahrung</div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-6 block">
            Das Team
          </span>
          <h2 className="font-display text-4xl lg:text-6xl mb-8 tracking-tight leading-[1.05]">
            Expertise aus Sportwissenschaft und Physiotherapie.
          </h2>
          <div className="space-y-6 text-background/70 max-w-lg">
            <p>
              Geleitet von Experten aus den Bereichen Sportwissenschaft und Physiotherapie, bietet
              der JuklHealth Performance Club eine ruhige, klinische Umgebung für nachhaltige
              Entwicklung.
            </p>
            <p>
              Wir arbeiten mit evidenzbasierten Methoden und modernem Equipment, um Ihre Ziele
              präzise und sicher zu erreichen.
            </p>
            <Link
              to="/team"
              className="inline-flex items-center gap-4 text-background font-medium uppercase tracking-[0.18em] text-xs group"
            >
              Das Team entdecken
              <span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
