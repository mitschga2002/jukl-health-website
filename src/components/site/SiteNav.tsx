import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoBlack from "@/assets/jukl-logo-black.png";

const mainLinks = [
  { to: "/team", label: "Team" },
  { to: "/meine-person", label: "Über uns" },
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
  { to: "/physiotherapie", label: "Physiotherapie" },
  { to: "/personaltraining", label: "Personal Training" },
  { to: "/gruppentraining", label: "Gruppentraining" },
  { to: "/athletiktraining", label: "Athletiktraining" },
  { to: "/trainingstherapie", label: "Trainingstherapie" },
] as const;

// Order mirrors the order the sections appear on /analysen.
const analysenLinks = [
  { to: "/analysen", label: "Übersicht" },
  { to: "/analysen", hash: "fms", label: "Bewegungsanalyse" },
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
    <div className="relative group">
      <button className="hover:text-primary uppercase text-sm">
        {label} <span className="text-primary">↓</span>
      </button>
      <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-background border border-foreground/10 shadow-lg py-2 min-w-[240px]">
          {items.map((i) => (
            <Link
              key={i.to + (i.hash ?? "") + i.label}
              to={i.to}
              hash={i.hash}
              className={`block px-5 py-2.5 text-sm font-semibold hover:bg-muted hover:text-primary ${
                isActive(i.to, i.hash) ? "text-primary" : ""
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
      <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-3">{label}</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.to + (i.hash ?? "") + i.label}>
            <Link
              to={i.to}
              hash={i.hash}
              onClick={onNavigate}
              className={`block py-2 text-sm font-semibold hover:text-primary ${
                isActive(i.to, i.hash) ? "text-primary" : ""
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

export function SiteNav() {
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
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
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
    <nav className="sticky top-0 z-50 bg-background border-b border-foreground/10">
      <div className="jh-container jh-gutter py-3 flex justify-between items-center gap-4">
        <Link
          to="/"
          className="flex items-center shrink-0"
          aria-label="JuklHealth Startseite"
          onClick={close}
        >
          <img
            src={logoBlack}
            alt="JuklHealth"
            width={640}
            height={368}
            className="h-12 lg:h-14 w-auto"
          />
        </Link>
        <div className="hidden lg:flex gap-7 text-sm font-semibold items-center">
          <Dropdown label="Clubs" items={clubLinks} />
          <Dropdown label="Training / Physio" items={trainingLinks} />
          <Dropdown label="Analysen" items={analysenLinks} />
          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary uppercase"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop only: below lg the same CTA sits inside the menu overlay. */}
          <Link
            to="/kontakt"
            className="hidden lg:inline-block bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-primary-hover"
            onClick={close}
          >
            Jetzt kontaktieren
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="lg:hidden fixed inset-0 z-50 bg-background flex flex-col overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-label="Hauptmenü"
        >
          <div className="flex items-center justify-between px-6 py-3 border-b border-foreground/10 shrink-0">
            <Link
              to="/"
              className="flex items-center"
              aria-label="JuklHealth Startseite"
              onClick={close}
            >
              <img
                src={logoBlack}
                alt="JuklHealth"
                width={640}
                height={368}
                className="h-12 w-auto"
              />
            </Link>
            <button
              type="button"
              className="p-2 -mr-2 text-foreground"
              aria-label="Menü schließen"
              onClick={close}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
            <div className="space-y-6">
              <MobileGroup label="Clubs" items={clubLinks} onNavigate={close} />
              <div className="border-t border-foreground/10 pt-6">
                <MobileGroup label="Training / Physio" items={trainingLinks} onNavigate={close} />
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <MobileGroup label="Analysen" items={analysenLinks} onNavigate={close} />
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <ul className="space-y-1">
                  {mainLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        onClick={close}
                        className="block py-2 text-sm font-semibold hover:text-primary"
                        activeProps={{ className: "text-primary" }}
                        activeOptions={{ exact: true }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/kontakt"
                onClick={close}
                className="block text-center bg-primary text-primary-foreground px-5 py-3 text-sm font-bold uppercase tracking-wider hover:bg-primary-hover"
              >
                Jetzt kontaktieren
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
