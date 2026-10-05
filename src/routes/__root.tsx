import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { PillAnchor, PillButton, PillLink } from "@/components/site/Pill";
/* Imported for its side effect, not for a URL: this puts the stylesheet into
   the root route's chunk, so the build manifest owns it. That is what lets
   `server.build.inlineCss` in vite.config.ts ship it as an inline <style> in
   the SSR response instead of a render-blocking <link>. */
import "../styles.css";
/* The hashed URLs of the two font files the first paint needs. Imported rather
   than hard-coded because the build fingerprints them; Vite emits one asset per
   file, so these resolve to the very URLs the inlined @font-face rules point
   at, and the preload is a hint for a request the browser makes anyway. */
import interLatinUrl from "../assets/fonts/inter-200-700-latin.woff2?url";
import interItalicLatinUrl from "../assets/fonts/inter-italic-700-latin.woff2?url";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "Jukl Health Clubs",
  image: "https://juklhealth.com/og-image.jpg",
  url: "https://juklhealth.com",
  telephone: "+43-660-0000000",
  email: "julian@juklhealth.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bildgasse 10",
    addressLocality: "Dornbirn",
    postalCode: "6850",
    addressCountry: "AT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.4125,
    longitude: 9.7417,
  },
  areaServed: ["Dornbirn", "Vorarlberg", "Rheintal", "Widnau"],
  sameAs: ["https://www.instagram.com/juklhealth_clubs/"],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <p className="font-display text-[64px] leading-[1.25] text-primary">404</p>
        <h1 className="font-display text-[28px] leading-[1.25] text-foreground">
          Seite nicht gefunden
        </h1>
        <p className="text-base font-light leading-[1.45] text-muted-foreground">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="pt-2">
          <PillLink to="/">Zur Startseite</PillLink>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="font-display text-[28px] leading-[1.25] text-foreground">
          Diese Seite konnte nicht geladen werden
        </h1>
        <p className="text-base font-light leading-[1.45] text-muted-foreground">
          Bitte versuche es erneut oder kehre zur Startseite zurück.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <PillButton
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-6"
          >
            Erneut versuchen
          </PillButton>
          <PillAnchor href="/" variant="outlineOnLight">
            Startseite
          </PillAnchor>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#008c00" },
      { title: "JuklHealth Clubs - Training & Physio in Dornbirn & Widnau" },
      {
        name: "description",
        content:
          "Das JuklHealth System: Performance Training, Athletik Coaching und klinische Physiotherapie an mehreren Standorten in Dornbirn und Widnau. Wissenschaftlich fundiert, individuell betreut, messbare Resultate.",
      },
      { name: "author", content: "JuklHealth" },
      { name: "apple-mobile-web-app-title", content: "JUKL Health" },
      { property: "og:title", content: "Jukl Health Clubs" },
      {
        property: "og:description",
        content:
          "Ein Trainingssystem, mehrere Standorte: Performance Training und Physiotherapie auf höchstem Niveau in Dornbirn und Widnau.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_AT" },
      { property: "og:url", content: "https://juklhealth.com" },
      { property: "og:image", content: "https://juklhealth.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Trainerin und Trainer beim Athletiktraining in einem JuklHealth Club",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://juklhealth.com/og-image.jpg" },
      { name: "twitter:title", content: "Jukl Health Clubs" },
      {
        name: "twitter:description",
        content:
          "Ein Trainingssystem, mehrere Standorte: Performance Training und Physiotherapie auf höchstem Niveau in Dornbirn und Widnau.",
      },
    ],
    links: [
      /* Inter is discovered late without these. The stylesheet is inlined into
         the SSR response, so the @font-face rules arrive with the document —
         but a browser only fetches a face once it has laid out text that needs
         it, which is after the whole body is parsed. That put both files a
         round trip behind the document; Lighthouse measured the critical path
         at 839 ms with the fonts as its tail. Preloading moves the request to
         head-parse time, alongside the body download.

         Only the latin subsets are hinted: the copy is German, which lives
         entirely in U+0000-00FF, so the latin-ext files stay lazy and are
         never fetched in practice. `crossOrigin` is required even though the
         fonts are same-origin — fonts are always fetched in CORS mode, and a
         preload whose mode does not match the real request is downloaded
         twice.

         These land ahead of the homepage's hero-image preload in the emitted
         head no matter where they are written: React hoists font preloads
         above image preloads by design. That is why the two files were
         instanced down to the weights the site actually uses (see
         assets/fonts/fonts.css) — at 107 KB together they now share the first
         round trip with an LCP photo of about the same size instead of
         crowding it out. */
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: interLatinUrl,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: interItalicLatinUrl,
        crossOrigin: "anonymous",
      },
      { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* Lenis eases the wheel by animating the scroll position itself, frame by
   frame, towards a target. Its own `stopInertiaOnNavigate` did not catch
   router navigations reliably, so that glide carried on through a page change:
   the router reset the new page to the top and on the very next frame Lenis
   pulled it back to the old page's offset. Tied to the router instead: the
   glide stops the moment a navigation starts, and once the router has placed
   the new page (top, hash target or restored position) Lenis adopts that.

   Hash targets get one correction first. The router scrolls them into view
   with their rendered box, but every `main section` below the fold still sits
   at the start of its scroll reveal (styles.css: translated down by 2.5rem),
   so the form on /kontakt#anfrage was measured 40px too low, and once the
   section had risen into place it sat that much higher than its scroll
   margin, under the nav. Measured from layout instead, which ignores
   transforms. A hash on the same page gets the glide back that the CSS
   `scroll-behavior: smooth` used to give (Lenis takes over the animation
   from native scrolling, so the router's instant jump is undone first). */
function LenisRouterSync() {
  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    // An immediate scroll to where the page already is: sets Lenis' target to
    // the real position and stops its animation, without moving anything.
    const settle = () => lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    let leftAt = 0;
    const stopGlide = router.subscribe("onBeforeNavigate", () => {
      leftAt = window.scrollY;
      settle();
    });
    const adopt = router.subscribe("onRendered", (event) => {
      // Measure the new page first, or the scroll is clamped to the old one's
      // height (a back navigation to far down a longer page).
      lenis.resize();
      const target = hashScrollTarget(event.toLocation.hash);
      if (target === undefined) {
        settle();
      } else if (event.pathChanged) {
        window.scrollTo({ top: target, behavior: "instant" });
        settle();
      } else {
        window.scrollTo({ top: leftAt, behavior: "instant" });
        settle();
        lenis.scrollTo(target);
      }
    });
    return () => {
      stopGlide();
      adopt();
    };
  }, [router, lenis]);

  return null;
}

/** The scroll position that puts the hash target's scroll-margin edge at the
    top of the viewport, taken from layout rather than from the rendered (and
    possibly transformed) box. `undefined` unless the router has just scrolled
    the element there: on a back/forward navigation it restores the previous
    position instead, and that must stand. */
function hashScrollTarget(hash: string | undefined): number | undefined {
  const id = (hash ?? "").replace(/^#/, "");
  if (!id) return undefined;
  const el = document.getElementById(id);
  if (!el) return undefined;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (Math.abs(el.getBoundingClientRect().top - margin) > 1) return undefined;
  let top = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    top += n.offsetTop;
  }
  return Math.max(0, top - margin);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Eased wheel and trackpad scrolling, a touch slower than native. Touch
          stays native (Lenis' default), and reduced motion turns it off. */}
      <ReactLenis root options={{ lerp: 0.08, stopInertiaOnNavigate: true }} />
      <LenisRouterSync />
      <Outlet />
    </QueryClientProvider>
  );
}
