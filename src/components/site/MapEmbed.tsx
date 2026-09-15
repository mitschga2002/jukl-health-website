import { useState } from "react";
import { PillButton } from "./Pill";

const MAPS_SRC = "https://www.google.com/maps?q=Bildgasse+10,+6850+Dornbirn,+Austria&output=embed";

/**
 * Click-to-load Google Maps ("Zwei-Klick-Lösung").
 *
 * Embedding the iframe directly contacts Google and sets cookies before the
 * visitor has consented, which needs a consent banner under GDPR/TTDSG. By
 * loading the frame only after an explicit click, the visitor consents in the
 * moment, and no data reaches Google until they do.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-card border border-border">
        <iframe
          title="JuklHealth Standort Bildgasse 10, Dornbirn"
          src={MAPS_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="grid aspect-video w-full place-items-center rounded-card border border-border bg-muted p-6">
      <div className="text-center max-w-sm">
        <div className="font-display text-lg mb-2">Google Maps</div>
        <p className="text-sm text-muted-foreground mb-5">
          Beim Laden der Karte werden Daten an Google übertragen. Details in unserer{" "}
          <a
            href="/datenschutz"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary transition-colors duration-300 ease-out"
          >
            Datenschutzerklärung
          </a>
          .
        </p>
        <PillButton type="button" onClick={() => setLoaded(true)} className="px-6">
          Karte laden
        </PillButton>
        <p className="text-[11px] text-muted-foreground mt-4">Bildgasse 10 · A-6850 Dornbirn</p>
      </div>
    </div>
  );
}
