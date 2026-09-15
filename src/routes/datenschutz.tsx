import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – JuklHealth" },
      {
        name: "description",
        content:
          "Datenschutzerklärung von Juklhealth. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
      },
      { property: "og:title", content: "Datenschutz – JuklHealth" },
      { property: "og:description", content: "Datenschutzerklärung gemäß DSGVO." },
      { name: "robots", content: "index, follow" },
      { property: "og:url", content: "https://juklhealth.com/datenschutz" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/datenschutz" }],
  }),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <PageShell>
      <PageHero
        eyebrow="RECHTLICHES"
        title="Datenschutzerklärung"
        intro="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
      />

      <Section compact eyebrow="ÜBERBLICK" title="Einleitung">
        <p>
          Wir haben diese Datenschutzerklärung verfasst, um Ihnen gemäß den Vorgaben der
          Datenschutz-Grundverordnung (EU) 2016/679 und anwendbaren nationalen Gesetzen zu erklären,
          welche personenbezogenen Daten wir als Verantwortliche verarbeiten, zukünftig verarbeiten
          werden und welche rechtmäßigen Möglichkeiten Sie haben.
        </p>
      </Section>

      <Section compact eyebrow="VERANTWORTLICH" title="Kontaktdaten">
        <p>
          <strong>JUKLHEALTH</strong>
          <br />
          Julian Kleinheinz
          <br />
          Bildgasse 10, 6850 Dornbirn, Österreich
          <br />
          E-Mail:{" "}
          <a
            className="underline hover:text-primary transition-colors duration-300 ease-out"
            href="mailto:julian@juklhealth.com"
          >
            julian@juklhealth.com
          </a>
        </p>
      </Section>

      <Section compact eyebrow="RECHTSGRUNDLAGEN" title="Rechtsgrundlagen der Verarbeitung">
        <p>
          Wir verarbeiten Ihre Daten nur, wenn mindestens eine der folgenden Bedingungen zutrifft:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO) – Sie haben uns Ihre
            Einwilligung gegeben, Daten zu einem bestimmten Zweck zu verarbeiten (z.&nbsp;B.
            Kontaktformular).
          </li>
          <li>
            <strong>Vertrag</strong> (Art. 6 Abs. 1 lit. b DSGVO) – zur Erfüllung eines Vertrags
            oder vorvertraglicher Verpflichtungen.
          </li>
          <li>
            <strong>Rechtliche Verpflichtung</strong> (Art. 6 Abs. 1 lit. c DSGVO) – z.&nbsp;B.
            Aufbewahrung von Rechnungen.
          </li>
          <li>
            <strong>Berechtigte Interessen</strong> (Art. 6 Abs. 1 lit. f DSGVO) – zum sicheren und
            wirtschaftlich effizienten Betrieb unserer Website.
          </li>
        </ul>
      </Section>

      <Section compact eyebrow="SPEICHERDAUER" title="Speicherdauer">
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für die Bereitstellung unserer
          Dienstleistungen unbedingt notwendig ist. Sollten Sie die Löschung Ihrer Daten wünschen
          oder die Einwilligung widerrufen, werden die Daten so rasch wie möglich gelöscht – soweit
          keine gesetzliche Aufbewahrungspflicht besteht.
        </p>
      </Section>

      <Section compact eyebrow="IHRE RECHTE" title="Rechte laut DSGVO">
        <ul className="list-disc pl-6 space-y-2">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Bei Verstößen können Sie sich an die österreichische Datenschutzbehörde wenden:{" "}
          <a
            className="underline hover:text-primary transition-colors duration-300 ease-out"
            href="https://www.dsb.gv.at/"
            target="_blank"
            rel="noreferrer"
          >
            dsb.gv.at
          </a>
          .
        </p>
      </Section>

      <Section compact eyebrow="SICHERHEIT" title="TLS-Verschlüsselung">
        <p>
          Wir verwenden HTTPS, um Daten abhörsicher im Internet zu übertragen. Die Verwendung
          erkennen Sie am Schlosssymbol in Ihrem Browser sowie am Schema <code>https://</code>.
        </p>
      </Section>

      <Section compact eyebrow="KOMMUNIKATION" title="Kontaktformular & E-Mail">
        <p>
          Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, werden die von Ihnen
          übermittelten Daten (Name, E-Mail-Adresse, ggf. Telefonnummer und Ihre Nachricht) auf
          unserem Server gespeichert und zur Bearbeitung Ihrer Anfrage verwendet. Die Daten werden
          gelöscht, sobald der Geschäftsfall beendet wurde und gesetzliche Aufbewahrungsfristen
          abgelaufen sind.
        </p>
      </Section>

      <Section compact eyebrow="COOKIES" title="Cookies">
        <p>
          Diese Website verwendet nur technisch notwendige Cookies für den Betrieb der Seite. Es
          werden keine Tracking- oder Marketing-Cookies ohne Ihre ausdrückliche Einwilligung
          gesetzt.
        </p>
      </Section>

      <Section compact eyebrow="EINGEBETTETE INHALTE" title="Google Maps">
        <p>
          Auf unserer Kontaktseite kann eine Google-Maps-Karte angezeigt werden. Die Karte wird
          nicht automatisch geladen: Sie sehen zunächst nur einen Platzhalter mit einem Hinweis.
          Erst wenn Sie auf „Karte laden“ klicken, wird die Karte von Google nachgeladen.
        </p>
        <p>
          Bis zu diesem Klick werden keine Daten an Google übertragen. Mit dem Klick werden Daten
          (u.&nbsp;a. Ihre IP-Adresse) an Google übertragen; Anbieter ist Google Ireland Limited,
          Gordon House, Barrow Street, Dublin 4, Irland. Rechtsgrundlage ist Ihre Einwilligung nach
          Art. 6 Abs. 1 lit. a DSGVO, die Sie durch das Anklicken der Schaltfläche erteilen. Sie
          können diese Einwilligung jederzeit widerrufen, indem Sie die Seite neu laden, ohne die
          Karte zu aktivieren.
        </p>
      </Section>
    </PageShell>
  );
}
