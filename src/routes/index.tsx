import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { DisciplineTicker } from "@/components/site/DisciplineTicker";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { Credibility } from "@/components/site/Credibility";
import { PerformanceClubBlock, ProfisportBlock } from "@/components/site/ContentSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JuklHealth Clubs - Training & Physio Dornbirn" },
      {
        name: "description",
        content:
          "Performance Training, Athletik Coaching und klinische Physiotherapie in Dornbirn. Resultate, keine Hoffnungen.",
      },
      { property: "og:title", content: "Jukl Health Clubs" },
      {
        property: "og:description",
        content: "Ready to upgrade yourself? Performance Training & Physio in Dornbirn.",
      },
      { property: "og:url", content: "https://juklhealth.com/" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Jukl Health Clubs",
          url: "https://juklhealth.com",
          logo: "https://juklhealth.com/favicon.svg",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Bildgasse 10",
            addressLocality: "Dornbirn",
            postalCode: "6850",
            addressCountry: "AT",
          },
          sameAs: ["https://www.instagram.com/juklhealth_clubs/"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <DisciplineTicker />
        <PerformanceClubBlock />
        <ServicesGrid />
        <ProfisportBlock />
        <Credibility />
      </main>
      <SiteFooter />
    </div>
  );
}
