import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – JuklHealth" },
      {
        name: "description",
        content:
          "Impressum · Juklhealth · Julian Kleinheinz · Bildgasse 10, 6850 Dornbirn, Österreich.",
      },
      { property: "og:title", content: "Impressum – JuklHealth" },
      { property: "og:description", content: "Rechtliche Informationen zu Juklhealth." },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <PageShell>
      <PageHero
        eyebrow="RECHTLICHES"
        title="Impressum"
        intro="Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch, §63 Gewerbeordnung und Offenlegungspflicht laut §25 Mediengesetz."
      />

      <Section eyebrow="ANGABEN" title="Juklhealth OG">
        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-base not-prose">
          <Row k="Inhaber">Julian Kleinheinz, BSc & Florian Winder, BSc</Row>
          <Row k="Firma">Juklhealth OG</Row>
          <Row k="Adresse">Bildgasse 10, 6850 Dornbirn, Österreich</Row>
          <Row k="Unternehmensgegenstand">Fitness und Gesundheit</Row>
          <Row k="UID-Nummer">ATU73735835</Row>
          <Row k="E-Mail">
            <a className="underline hover:text-primary" href="mailto:julian@juklhealth.com">
              julian@juklhealth.com
            </a>
            <br />
            <a className="underline hover:text-primary" href="mailto:florian@juklhealth.com">
              florian@juklhealth.com
            </a>
          </Row>
          <Row k="Mitglied bei">WKO</Row>
          <Row k="Berufsrecht">
            Gewerbeordnung:{" "}
            <a
              className="underline hover:text-primary"
              href="https://www.ris.bka.gv.at/"
              target="_blank"
              rel="noreferrer"
            >
              ris.bka.gv.at
            </a>
          </Row>
          <Row k="Aufsichtsbehörde">Bezirkshauptmannschaft Dornbirn</Row>
          <Row k="Berufsbezeichnung">
            Erstellung von Trainingskonzepten für gesundheitsbewusste Personen · Personaltrainer · Athletiktrainer
          </Row>
          <Row k="Verleihungsstaat">Österreich</Row>
        </dl>
      </Section>

      <Section eyebrow="HAFTUNG" title="Haftung für Inhalte">
        <p>
          Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns, korrekte und aktuelle
          Informationen bereitzustellen. Leider können wir keine Haftung für die Korrektheit aller Inhalte
          übernehmen, speziell für jene, die seitens Dritter bereitgestellt wurden.
        </p>
        <p>
          Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitten wir Sie, uns umgehend zu
          kontaktieren.
        </p>
      </Section>

      <Section eyebrow="HAFTUNG" title="Haftung für Links">
        <p>
          Unsere Webseite enthält Links zu anderen Webseiten, für deren Inhalt wir nicht verantwortlich sind.
          Haftung für verlinkte Websites besteht laut § 17 ECG für uns nicht, da wir keine Kenntnis
          rechtswidriger Tätigkeiten hatten und haben. Wenn Ihnen rechtswidrige Links auffallen, bitten wir
          Sie, uns zu kontaktieren.
        </p>
      </Section>

      <Section eyebrow="URHEBERRECHT" title="Urheberrechtshinweis">
        <p>
          Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht. Falls
          notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte unserer Seite rechtlich
          verfolgen.
        </p>
      </Section>
    </PageShell>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-widest text-primary">{k}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}
