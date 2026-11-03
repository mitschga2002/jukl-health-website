import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { academyCatalogQuery } from "@/lib/academy";
import { pageTitle } from "@/lib/site";
import { AcademyBundleCards } from "@/components/site/AcademyBundleCards";
import { AcademyCourseCards } from "@/components/site/AcademyCourseCards";
import { AcademyEmptyCard } from "@/components/site/AcademyEmptyCard";
import { PageShell, Section } from "@/components/site/content";
import { PillAnchor } from "@/components/site/Pill";

const INTRO =
  "Online-Kurse aus dem JuklHealth System rund um Sport, Training, Ernährung und Gesundheit. Lernen, wann und wo du willst – in deinem Tempo.";

const DESCRIPTION =
  "Online-Kurse der JuklHealth Academy rund um Sport, Training, Ernährung und Gesundheit. Lernen, wann und wo du willst – in deinem Tempo.";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: pageTitle("Academy") },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: pageTitle("Academy") },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://juklhealth.com/academy" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/academy" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(academyCatalogQuery()),
  component: Academy,
});

function Academy() {
  const { data } = useSuspenseQuery(academyCatalogQuery());
  const catalog = data.ok ? data.catalog : null;
  const appUrl = catalog?.organization.url ?? "https://app.juklhealth.com/kurse/jukl-health";

  return (
    <PageShell seamlessFooter={!!catalog && catalog.bundles.length > 0}>
      {catalog ? (
        <>
          {/* No PageHero: its heading and the first section's said the same thing twice,
              so the course section opens the page and carries the intro itself. */}
          <Section
            eyebrow="ACADEMY"
            title="Wissen, das du mitnimmst."
            action={
              catalog.courses.length > 0 ? (
                <PillAnchor href={appUrl} target="_blank" rel="noopener" variant="outlineOnLight">
                  Alle Kurse in der App
                </PillAnchor>
              ) : undefined
            }
          >
            {/* The website's own words, not the app catalog's intro: that one is written for the app page. */}
            <p className="max-w-[640px] text-base font-light leading-[1.5] text-muted-foreground">
              {INTRO}
            </p>
            {catalog.courses.length > 0 ? (
              <AcademyCourseCards items={catalog.courses} />
            ) : (
              <AcademyEmptyCard />
            )}
          </Section>

          {catalog.bundles.length > 0 ? (
            <Section
              alt
              seamless
              eyebrow="BUNDLES"
              title="Mehrere Kurse, ein Preis"
              action={
                <PillAnchor href={appUrl} target="_blank" rel="noopener" variant="outlineOnDark">
                  Zu den Bundles
                </PillAnchor>
              }
            >
              <AcademyBundleCards items={catalog.bundles} />
            </Section>
          ) : null}
        </>
      ) : (
        <Section eyebrow="ACADEMY" title="Wissen, das du mitnimmst.">
          <div className="flex max-w-[640px] flex-col items-start gap-5">
            <p className="text-base font-light leading-[1.5] text-muted-foreground">
              {data.ok === false && data.reason === "unconfigured"
                ? "Die Kursliste ist auf dieser Website noch nicht eingerichtet. Du findest alle Kurse direkt in der App."
                : "Die Kursliste konnte gerade nicht geladen werden. Du findest alle Kurse direkt in der App."}
            </p>
            {/* Every way into the app opens beside the website, so the visitor keeps their place here. */}
            <PillAnchor href={appUrl} target="_blank" rel="noopener">
              Zur Academy in der App
            </PillAnchor>
          </div>
        </Section>
      )}
    </PageShell>
  );
}
