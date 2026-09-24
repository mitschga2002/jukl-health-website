import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { HERO_PRELOAD_LINKS } from "@/components/site/heroImage";
import { DisciplineTicker } from "@/components/site/DisciplineTicker";
import { Credibility } from "@/components/site/Credibility";
import { ReferencesTeaser } from "@/components/site/References";
import { LocationsBlock, SystemBlock, ProfisportBlock } from "@/components/site/ContentSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JuklHealth Clubs - Training & Physio in Dornbirn & Widnau" },
      {
        name: "description",
        content:
          "Das JuklHealth System: Performance Training, Athletik Coaching und klinische Physiotherapie – ein Trainingssystem, mehrere Standorte in Dornbirn und Widnau. Resultate, keine Hoffnungen.",
      },
      { property: "og:title", content: "Jukl Health Clubs" },
      {
        property: "og:description",
        content: "Ready to upgrade yourself? Performance Training & Physio in Dornbirn und Widnau.",
      },
      { property: "og:url", content: "https://juklhealth.com/" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/" }, ...HERO_PRELOAD_LINKS],
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
      <SiteNav overlay />
      <main>
        <Hero />
        <DisciplineTicker />
        {/* What → claim → proof → where → who: the offer, then the pro-sport
            claim with the client stories right under it as its evidence, and
            the clubs only once the visitor is interested. The team slab stays
            last, running seamlessly into the footer. */}
        <SystemBlock />
        <ProfisportBlock />
        <ReferencesTeaser />
        <LocationsBlock />
        <Credibility />
      </main>
      <SiteFooter seamless />
    </div>
  );
}
