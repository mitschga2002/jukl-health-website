import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
