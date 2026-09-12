import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/event-details/$slug")({
  head: ({ params }) => {
    const title = params.slug.replace(/-/g, " ");
    const url = `https://juklhealth.com/event-details/${params.slug}`;
    const description = `${title} – Vortrag und Webinar bei JuklHealth in Dornbirn. Termine, Inhalte und Anmeldung rund um Training, Gesundheit und Performance.`;
    return {
      meta: [
        { name: "robots", content: "noindex, nofollow" },
        { title: `${title} – Vorträge | JuklHealth` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} – JuklHealth Vortrag` },
        { property: "og:description", content: description },
        { property: "og:type", content: "event" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: title,
            description,
            url,
            organizer: {
              "@type": "Organization",
              name: "JuklHealth Performance Club",
              url: "https://juklhealth.com",
            },
          }),
        },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { slug } = Route.useParams();
  const title = slug.replace(/-/g, " ");
  return (
    <PlaceholderPage
      eyebrow="VORTRAG"
      title={title}
      description="Details zu diesem Vortrag werden geladen. Alle Termine und Inhalte folgen in Kürze."
    />
  );
}
