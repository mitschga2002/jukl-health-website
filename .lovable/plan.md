# Bilder einfügen und bestehende ersetzen

## Ziel
Alle vom Nutzer hochgeladenen Bilder anhand ihrer Dateinamen korrekt auf der Website platzieren oder bestehende Bilder ersetzen.

## Ablauf

1. **Warten auf Uploads**
   - Nutzer meldet, wenn alle Bilder hochgeladen sind.

2. **Dateinamen analysieren**
   - Hochgeladene Bilder im Chat ansehen.
   - Dateinamen als Hinweis auf Seite/Section verwenden (z.B. `hero-startseite.jpg`, `team-julian.jpg`, `leistung-physio.jpg`).

3. **Mapping erstellen und bestätigen**
   - Tabelle: Dateiname → aktuelle Bildquelle (falls vorhanden) → Zielseite/Section.
   - Falls ein Name mehrdeutig ist oder kein passender Platz gefunden wird, kurz nachfragen.

4. **Bilder in Assets umwandeln**
   - Hochgeladene Bilder mit `lovable-assets` ins CDN hochladen und `.asset.json`-Pointer anlegen.
   - Alte, nicht mehr benötigte Asset-Pointer von ersetzten Bildern löschen.

5. **Code anpassen**
   - Bestehende `<img>`-/CSS-/`import`-Referenzen auf die neuen Asset-URLs umbiegen.
   - Neue Bilder dort einfügen, wo der Dateiname es nahelegt.

6. **Prüfen**
   - Build laufen lassen.
   - Preview auf betroffenen Seiten kurz kontrollieren.

## Offene Punkte
- Aktuell liegen noch keine Bildanhänge vor.
- Nutzer sagt Bescheid, sobald alle Bilder hochgeladen sind.