import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Eyebrow, PillAnchor } from "./Pill";
import { cn } from "@/lib/utils";

/**
 * The standort, drawn as a map in the site's own colours with the address
 * overlaid on it.
 *
 * Leaflet against plain OpenStreetMap tiles, rather than the
 * `openstreetmap.org/export/embed.html` frame this replaces. Same tiles, but
 * that frame was a whole OSM page in miniature and brought OSM's own controls
 * with it — the share and donate buttons, the "View Larger Map" bar — none of
 * which belong on a club's contact section, and none of which could be styled
 * or removed from outside an iframe. Drawing the tiles ourselves leaves only
 * the map.
 *
 * Two providers on purpose. The map loads on arrival, unasked, so it comes
 * from OpenStreetMap: no cookies, no advertising business behind the tiles.
 * Routing is what the visitor opts into by clicking, and there Google is the
 * better tool and the one already on their phone.
 *
 * The two are addressed differently on purpose — see `lat`/`lon` against
 * `destination` below.
 */

/** Close enough to read the street names around the door. */
const ZOOM = 16;

export function LocationMap({
  name,
  lines,
  lat,
  lon,
  destination,
  className,
}: {
  /** The club, named — the address alone does not say which one this is. */
  name: string;
  /** The postal address, one line per line, as it would be written on post. */
  lines: readonly string[];
  /** Where the pin goes. From OpenStreetMap's own geocoder, so it sits on the
   *  point OSM holds for the building. */
  lat: number;
  lon: number;
  /** Where Google is asked to route to, as an address — deliberately not the
   *  coordinates above. Handed a bare lat/lon, Google answers with whichever
   *  business it has registered nearest that point and labels the whole route
   *  with it: Bildgasse 10 came out as an estate agent's office. The street
   *  address routes to the street address. */
  destination: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

  useEffect(() => {
    let map: LeafletMap | undefined;
    let cancelled = false;

    // Leaflet reaches for `window` as it initialises, so it is pulled in here
    // rather than at module scope — this component is server-rendered like
    // every other one, and the map simply arrives at hydration. The dark card
    // underneath is what holds the space until it does.
    void import("leaflet").then((L) => {
      if (cancelled || !host.current) return;

      map = L.map(host.current, {
        center: [lat, lon],
        zoom: ZOOM,
        // The map sits mid-page. Taking the wheel would trap anyone scrolling
        // past it; dragging and the +/− control still move the map.
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        // ODbL requires the credit, and it is the one piece of OSM's own
        // furniture that stays.
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>-Mitwirkende',
      }).addTo(map);

      L.marker([lat, lon], {
        icon: L.divIcon({
          className: "jh-pin",
          html: '<span class="jh-pin-ring"></span><span class="jh-pin-dot"></span>',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
        keyboard: false,
        interactive: false,
      }).addTo(map);

      setTimeout(() => map?.invalidateSize(), 0);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lon]);

  return (
    <div
      /* `isolate` is load-bearing. Leaflet stacks its panes from 400 and its
         controls at 800, and the overlay above them at 900 — all of which
         outrank the sticky nav's z-50 and painted straight over it on scroll.
         `relative` alone does not contain them: it positions the box without
         opening a stacking context. `isolation: isolate` opens one, so those
         numbers only ever compete with each other inside this card. */
      className={cn(
        "relative isolate aspect-video w-full overflow-hidden rounded-card bg-surface",
        className,
      )}
    >
      <div
        ref={host}
        className="jh-map absolute inset-0"
        aria-label={`Karte: ${name}, ${lines.join(", ")}`}
        role="application"
      />

      {/* The address sits on the map rather than under it — the same move the
          homepage carousel makes with its "Athletes are made here" card, and
          the reason the map can be the whole module instead of a picture with
          a caption. The wrapper stays click-through so the map underneath is
          still draggable everywhere the card is not.

          The z-index is not decoration: Leaflet stacks its panes from 400 and
          its control container at 800, so an overlay left at `auto` is painted
          over the moment the map finishes initialising — visible until
          hydration, gone after it. 900 clears the lot. */}
      <div className="pointer-events-none absolute inset-0 z-[900] flex items-end p-3 lg:p-4">
        <div className="pointer-events-auto flex max-w-[16rem] flex-col gap-3 rounded-card bg-surface/95 p-4 lg:p-5">
          <div className="flex flex-col gap-1">
            <Eyebrow className="text-xs text-surface-muted-foreground">{name}</Eyebrow>
            <address className="text-sm not-italic leading-[1.4] text-surface-foreground">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div className="flex">
            <PillAnchor
              href={directions}
              target="_blank"
              rel="noreferrer"
              variant="outlineOnDark"
              className="min-h-9 px-4 py-1.5 text-sm"
            >
              Route planen
            </PillAnchor>
          </div>
        </div>
      </div>
    </div>
  );
}
