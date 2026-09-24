import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
/* The 384px rung, not the 624px master: the nav draws the wordmark 22px tall
   (26px from `lg`), so 384px still covers a 3x screen, and this is an eager,
   above-the-fold image competing with the hero for the first bytes. */
import logoBlack from "@/assets/jukl-wordmark-black-384.webp";
import { PillLink } from "./Pill";
import { cn } from "@/lib/utils";

const mainLinks = [{ to: "/referenzen", label: "Referenzen" }] as const;

const aboutLinks = [
  { to: "/team", label: "Team" },
  { to: "/julian-kleinheinz", label: "Julian Kleinheinz" },
  { to: "/vortraege", label: "Vorträge" },
] as const;

const clubLinks = [
  { to: "/clubs", label: "Übersicht" },
  { to: "/performance-club", label: "Performance Club" },
  { to: "/strength-club", label: "Strength Club" },
  { to: "/training-club-widnau", label: "Training Club Widnau" },
] as const;

const trainingLinks = [
  { to: "/training-physio", label: "Übersicht" },
  { to: "/personaltraining", label: "Personal Training" },
  { to: "/physiotherapie", label: "Physiotherapie" },
  { to: "/athletiktraining", label: "Athletiktraining" },
  { to: "/trainingsplanung", label: "Trainingsplanung" },
  { to: "/trainingstherapie", label: "Trainingstherapie" },
  { to: "/gruppentraining", label: "Gruppentraining" },
] as const;

// Order mirrors the order the sections appear on /analysen.
const analysenLinks = [
  { to: "/analysen", label: "Übersicht" },
  { to: "/analysen", hash: "fms", label: "Bewegungsanalyse" },
  { to: "/analysen", hash: "performance-screening", label: "Performance Screening" },
  { to: "/analysen", hash: "stoffwechsel", label: "Stoffwechselanalyse" },
  { to: "/analysen", hash: "leistung", label: "Leistungsanalyse" },
  { to: "/analysen", hash: "physio", label: "Physioanalyse" },
  { to: "/analysen", hash: "coaching", label: "Gesundheitscoaching" },
] as const;

function useActiveMatcher() {
  const { pathname, hash } = useRouterState({ select: (s) => s.location });
  return (to: string, itemHash?: string) => {
    if (pathname !== to) return false;
    const current = (hash ?? "").replace(/^#/, "");
    const target = itemHash ?? "";
    return current === target;
  };
}

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; hash?: string; label: string }>;
}) {
  const isActive = useActiveMatcher();
  return (
    <div className="group relative">
      <button className="flex items-center gap-0.5 text-base text-muted-foreground hover:text-foreground">
        {label}
        <ChevronDown
          className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-180 motion-reduce:transform-none motion-reduce:transition-none"
          aria-hidden
        />
      </button>
      <div className="invisible absolute left-0 top-full pt-6 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[240px] overflow-hidden rounded-image border border-border bg-background/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          {items.map((i) => (
            <Link
              key={i.to + (i.hash ?? "") + i.label}
              to={i.to}
              hash={i.hash}
              className={`block px-5 py-2.5 text-base hover:bg-foreground/[0.04] hover:text-foreground ${
                isActive(i.to, i.hash) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; hash?: string; label: string }>;
  onNavigate: () => void;
}) {
  const isActive = useActiveMatcher();
  return (
    <div>
      <div className="mb-3 text-xs uppercase tracking-[0.05em] text-primary">{label}</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.to + (i.hash ?? "") + i.label}>
            <Link
              to={i.to}
              hash={i.hash}
              onClick={onNavigate}
              className={`block py-2 text-base hover:text-foreground ${
                isActive(i.to, i.hash) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The design draws the nav as a floating glass bar rather than a full-width
 * header. On the homepage it sits *on top of* the hero photo, so `overlay`
 * collapses the bar out of the document flow (`h-0`) and lets it overhang the
 * section below; every other page keeps it in flow with a margin above.
 */
export function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock the page behind the overlay. `overflow: hidden` on <body> alone is not
  // enough on iOS Safari, which still drags the document under the menu, so the
  // body is pinned at its current offset and the scroll position is restored on
  // close.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { body } = document;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // The overlay is mobile only (`lg:hidden`). Past the lg breakpoint it stops
  // rendering while `open` stays true, which would leave the scroll lock on a
  // page with no visible control to release it — so close it on the way up.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 64rem)");
    if (mq.matches) {
      setOpen(false);
      return;
    }
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  // aria-modal only tells assistive tech the rest of the page is inert; keyboard
  // focus has to be moved into the panel and kept there by hand.
  useEffect(() => {
    if (!open) return;
    const opener = toggleRef.current;
    const focusables = () =>
      [
        opener,
        ...Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
        ),
      ].filter((el): el is HTMLElement => el != null);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <nav
      className={cn(
        "sticky jh-container top-2 z-50 lg:top-4",
        overlay ? "h-0" : "mb-2 mt-2 lg:mt-4",
      )}
    >
      <div className="jh-edge relative z-50">
        <div className="relative rounded-image shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          {/* The bar's frosted surface lives on its own layer rather than on
              the bar element, so the bar does not become a Backdrop Root and
              the dropdown nested inside it can still blur the page behind it. */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-image bg-background/80 backdrop-blur-xl"
          />
          <div className="relative flex items-center justify-between gap-4 px-4 py-3">
            <Link
              to="/"
              className="flex shrink-0 items-center"
              aria-label="JuklHealth Startseite"
              onClick={close}
            >
              <img
                src={logoBlack}
                alt="JuklHealth"
                width={384}
                height={82}
                className="h-[22px] w-auto lg:h-[26px]"
              />
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              <Dropdown label="Clubs" items={clubLinks} />
              <Dropdown label="Angebot" items={trainingLinks} />
              <Dropdown label="Analysen" items={analysenLinks} />
              {mainLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-base text-muted-foreground hover:text-foreground"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              ))}
              <Dropdown label="Über uns" items={aboutLinks} />
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {/* Desktop only: below lg the same CTA sits inside the menu overlay. */}
              <PillLink to="/kontakt" className="hidden lg:inline-flex" onClick={close}>
                Jetzt kontaktieren
              </PillLink>
              <button
                ref={toggleRef}
                type="button"
                className="-mr-1 p-2 text-foreground lg:hidden"
                aria-label={open ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overscroll-none bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Hauptmenü"
        >
          {/* No header of its own: the sheet opens *under* the floating bar,
              which keeps the logo and swaps the burger for the close icon.
              `pt-20` clears the bar (8px offset + ~46px tall). */}
          <div className="jh-container flex-1 overflow-y-auto overscroll-contain px-8 pb-12 pt-24">
            <div className="space-y-6">
              <MobileGroup label="Clubs" items={clubLinks} onNavigate={close} />
              <div className="border-t border-border pt-6">
                <MobileGroup label="Angebot" items={trainingLinks} onNavigate={close} />
              </div>
              <div className="border-t border-border pt-6">
                <MobileGroup label="Analysen" items={analysenLinks} onNavigate={close} />
              </div>

              <div className="border-t border-border pt-6">
                <ul className="space-y-1">
                  {mainLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        onClick={close}
                        className="block py-2 text-base text-muted-foreground hover:text-foreground"
                        activeProps={{ className: "text-primary" }}
                        activeOptions={{ exact: true }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border pt-6">
                <MobileGroup label="Über uns" items={aboutLinks} onNavigate={close} />
              </div>

              <PillLink to="/kontakt" className="w-full" onClick={close}>
                Jetzt kontaktieren
              </PillLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
