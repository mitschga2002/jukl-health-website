import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/product-page/$slug")({
  head: ({ params }) => {
    const title = params.slug.replace(/-/g, " ");
    const url = `https://juklhealth.com/product-page/${params.slug}`;
    const description = `${title} im JuklHealth Shop – Performance-Ausrüstung, Kleidung und Ergänzungen für Training, Regeneration und Alltag. Details, Größen und Bestellung.`;
    return {
      meta: [
        { title: `${title} – Shop | JuklHealth` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} – JuklHealth Shop` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: title,
            description,
            url,
            brand: { "@type": "Brand", name: "JuklHealth" },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const title = slug.replace(/-/g, " ");
  return (
    <PlaceholderPage
      eyebrow="PRODUKT"
      title={title}
      description="Produktdetails folgen — Größen, Material und Bestellmöglichkeit werden hier verfügbar sein."
    />
  );
}
