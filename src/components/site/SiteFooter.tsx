import { Link } from "@tanstack/react-router";
import logoWhite from "@/assets/jukl-logo-white.png";

const sitemap = [
  {
    heading: "Clubs",
    links: [
      { to: "/clubs", label: "Clubs Übersicht" },
      { to: "/performance-club", label: "Performance Club" },
      { to: "/training-club-widnau", label: "Training Club Widnau" },
      { to: "/raeumlichkeiten", label: "Räumlichkeiten" },
    ],
  },
  {
    heading: "Training",
    links: [
      { to: "/training-physio", label: "Übersicht" },
      { to: "/personaltraining", label: "Personal Training" },
      { to: "/gruppentraining", label: "Gruppentraining" },
      { to: "/athletiktraining", label: "Athletiktraining" },
      { to: "/physiotherapie", label: "Physiotherapie" },
      { to: "/trainingstherapie", label: "Trainingstherapie" },
    ],
  },
  {
    heading: "Analysen",
    links: [
      { to: "/analysen", label: "Übersicht" },
      { to: "/analysen", hash: "leistung", label: "Leistungsanalyse" },
      { to: "/analysen", hash: "stoffwechsel", label: "Stoffwechselanalyse" },
      { to: "/analysen", hash: "fms", label: "Bewegungsanalyse" },
    ],
  },
  {
    heading: "Mehr",
    links: [
      { to: "/team", label: "Team" },
      { to: "/meine-person", label: "Über uns" },
      { to: "/vortraege", label: "Vorträge" },
      { to: "/kontakt", label: "Kontakt" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-12 px-6 lg:px-12">
      <div className="jh-container">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <img src={logoWhite} alt="JuklHealth" loading="lazy" decoding="async" className="h-11 w-auto mb-6" />
            <Link
              to="/kontakt"
              className="inline-block bg-primary text-primary-foreground px-7 py-3 font-display text-sm hover:bg-primary-hover"
            >
              Jetzt kontaktieren
            </Link>
          </div>
          {sitemap.map((col) => (
            <div key={col.heading}>
              <h5 className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
                {col.heading}
              </h5>
              <ul className="space-y-2">
                {col.links.map((l) => {
                  const hash = "hash" in l ? l.hash : undefined;
                  return (
                    <li key={l.to + (hash ?? "") + l.label}>
                      <Link
                        to={l.to}
                        hash={hash}
                        className="text-sm text-background/70 hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between text-[11px] uppercase tracking-[0.18em] text-background/50 gap-4 border-t border-background/15 pt-6">
          <div>© {new Date().getFullYear()} JuklHealth Performance Club · Dornbirn, AT</div>
          <div className="flex gap-8">
            <Link to="/impressum" className="hover:text-primary">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-primary">Datenschutz</Link>
            <a
              href="https://www.instagram.com/juklhealth_clubs/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
