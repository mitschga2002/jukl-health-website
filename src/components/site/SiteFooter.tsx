import { Link } from "@tanstack/react-router";
import logoWhite from "@/assets/jukl-wordmark-white.png";
import { PillLink } from "./Pill";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

const sitemap = [
  {
    heading: "Clubs",
    links: [
      { to: "/clubs", label: "Übersicht" },
      { to: "/performance-club", label: "Performance Club" },
      { to: "/strength-club", label: "Strength Club" },
      { to: "/training-club-widnau", label: "Training Club Widnau" },
    ],
  },
  {
    heading: "Angebot",
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
      { to: "/analysen", hash: "fms", label: "Bewegungsanalyse" },
      { to: "/analysen", hash: "stoffwechsel", label: "Stoffwechselanalyse" },
      { to: "/analysen", hash: "leistung", label: "Leistungsanalyse" },
      { to: "/analysen", hash: "physio", label: "Physioanalyse" },
      { to: "/analysen", hash: "coaching", label: "Gesundheitscoaching" },
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

/**
 * `seamless` is for pages whose last module is already the dark surface (the
 * homepage team slab): the footer then drops its own rounded top edge and the
 * two read as one block, exactly as the design draws them.
 */
export function SiteFooter({ seamless = false }: { seamless?: boolean }) {
  return (
    <footer className={cn("bg-surface", !seamless && "mt-16 rounded-t-card lg:mt-24")}>
      <div className="jh-container jh-gutter">
        <div className="pb-8 pt-16 lg:pt-24">
          <div className="grid grid-cols-1 gap-8 min-[380px]:grid-cols-2 xl:grid-cols-12 xl:gap-8">
            <div className="flex flex-col items-start gap-8 min-[380px]:col-span-2 xl:col-span-4">
              <Link
                to="/"
                className="flex shrink-0 items-center"
                aria-label="JuklHealth Startseite"
              >
                <img
                  src={logoWhite}
                  alt="JuklHealth"
                  width={1552}
                  height={303}
                  loading="lazy"
                  decoding="async"
                  className="h-[34px] w-auto lg:h-[41px]"
                />
              </Link>
              <address className="flex flex-col gap-1 text-base not-italic leading-[1.25] text-surface-foreground/80">
                {SITE.address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <a
                  href={`mailto:${SITE.emails.primary}`}
                  className="mt-2 transition-colors duration-300 ease-out hover:text-surface-foreground"
                >
                  {SITE.emails.primary}
                </a>
              </address>
              <PillLink to="/kontakt">Jetzt kontaktieren</PillLink>
            </div>

            {sitemap.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3 xl:col-span-2">
                <div className="pb-2">
                  <h2 className="text-base uppercase leading-[1.25] tracking-[0.05em] text-primary">
                    {col.heading}
                  </h2>
                </div>
                {col.links.map((l) => {
                  const hash = "hash" in l ? l.hash : undefined;
                  return (
                    <Link
                      key={l.to + (hash ?? "") + l.label}
                      to={l.to}
                      hash={hash}
                      className="text-base leading-[1.25] text-surface-foreground/80 hover:text-surface-foreground"
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-surface-foreground/15 pt-6 lg:mt-14">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-base leading-[1.25] text-surface-muted-foreground">
                © {new Date().getFullYear()} JuklHealth Performance Club · Dornbirn, AT
              </p>
              <div className="flex flex-wrap gap-6 text-base uppercase leading-[1.25] tracking-[0.05em] text-surface-muted-foreground lg:gap-8">
                <Link to="/impressum" className="text-sm hover:text-surface-foreground">
                  Impressum
                </Link>
                <Link to="/datenschutz" className="text-sm hover:text-surface-foreground">
                  Datenschutz
                </Link>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:text-surface-foreground"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
