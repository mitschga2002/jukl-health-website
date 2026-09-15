import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { PillAnchor, PillButton, PillLink } from "@/components/site/Pill";
import appCss from "../styles.css?url";

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
      { title: "JuklHealth Clubs - Training & Physio Dornbirn" },
      {
        name: "description",
        content:
          "Performance Training, Athletik Coaching und klinische Physiotherapie in Dornbirn. Wissenschaftlich fundiert, individuell betreut, messbare Resultate.",
      },
      { name: "author", content: "JuklHealth" },
      { name: "apple-mobile-web-app-title", content: "JUKL Health" },
      { property: "og:title", content: "Jukl Health Clubs" },
      {
        property: "og:description",
        content: "Performance Training und Physiotherapie auf höchstem Niveau in Dornbirn.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_AT" },
      { property: "og:url", content: "https://juklhealth.com" },
      { property: "og:image", content: "https://juklhealth.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Trainerin und Trainer beim Athletiktraining im JuklHealth Performance Club",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://juklhealth.com/og-image.jpg" },
      { name: "twitter:title", content: "Jukl Health Clubs" },
      {
        name: "twitter:description",
        content: "Performance Training und Physiotherapie auf höchstem Niveau in Dornbirn.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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
