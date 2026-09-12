import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — JuklHealth × House of Clubs" },
      {
        name: "description",
        content:
          "JuklHealth Sportbekleidung in Kooperation mit Nike — Herren, Damen und Accessoires bei House of Clubs.",
      },
      { property: "og:title", content: "Shop — JuklHealth" },
      { property: "og:description", content: "JuklHealth Sportbekleidung." },
    ],
  }),
  component: Shop,
});

const products = [
  {
    cat: "Herren",
    items: [
      { name: "Nike Trainingsshirt", color: "Schwarz", price: "€ 21,00", href: "https://www.houseofclubs.at/juklhealth/Herren/JUKLhealth-Nike-Trainingsshirt-Schwarz-Herren.html" },
      { name: "Nike Polo-Shirt", color: "Weiß", price: "€ 35,40", href: "https://www.houseofclubs.at/juklhealth/Herren/JUKLhealth-Nike-Polo-Shirt-Weiss-Herren.html" },
      { name: "Nike Trainingssweater", color: "Schwarz", price: "€ 37,00", href: "https://www.houseofclubs.at/juklhealth/Herren/JUKLhealth-Nike-Trainingssweater-Schwarz-Herren.html" },
    ],
    overview: "https://www.houseofclubs.at/juklhealth/Herren/",
  },
  {
    cat: "Damen",
    items: [
      { name: "Nike Trainingsshirt", color: "Schwarz", price: "€ 21,00", href: "https://www.houseofclubs.at/juklhealth/Damen/" },
      { name: "Nike Polo-Shirt", color: "Weiß", price: "€ 35,40", href: "https://www.houseofclubs.at/juklhealth/Damen/" },
      { name: "Nike Trainingssweater", color: "Schwarz", price: "€ 37,00", href: "https://www.houseofclubs.at/juklhealth/Damen/" },
    ],
    overview: "https://www.houseofclubs.at/juklhealth/Damen/",
  },
  {
    cat: "Accessoires",
    items: [
      { name: "Nike Trainingscap", color: "Schwarz", price: "€ 25,00", href: "https://www.houseofclubs.at/juklhealth/Accessoires/" },
      { name: "Nike Sportbeutel", color: "Schwarz", price: "€ 18,00", href: "https://www.houseofclubs.at/juklhealth/Accessoires/" },
      { name: "Nike Trinkflasche", color: "Schwarz", price: "€ 12,00", href: "https://www.houseofclubs.at/juklhealth/Accessoires/" },
    ],
    overview: "https://www.houseofclubs.at/juklhealth/Accessoires/",
  },
];

function Shop() {
  return (
    <PageShell>
      <PageHero
        eyebrow="MERCH × NIKE"
        title="Sportbekleidung"
        intro="JuklHealth × Nike. Produziert und ausgeliefert über unseren Partner House of Clubs."
      />

      {products.map((cat) => (
        <Section key={cat.cat} eyebrow={cat.cat.toUpperCase()} title={`${cat.cat} Kollektion`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
            {cat.items.map((p) => (
              <a
                key={p.name + p.color}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="border border-foreground/10 hover:border-primary transition-colors group"
              >
                <div className="aspect-square bg-foreground text-background relative">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="font-display text-2xl uppercase opacity-25">
                      {cat.cat}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest">
                    IMG · placeholder
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-display text-lg uppercase mb-1">{p.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                    {p.color}
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-display text-xl">{p.price}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary group-hover:underline">
                      kaufen →
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-2">
                    inkl. MwSt. | zzgl. Versand
                  </div>
                </div>
              </a>
            ))}
          </div>
          <a
            href={cat.overview}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            → Gesamte {cat.cat}bekleidung ansehen
          </a>
        </Section>
      ))}
    </PageShell>
  );
}
