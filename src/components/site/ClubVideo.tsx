import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A muted, looping club walk-through that plays only while it is on screen
 * (at least a quarter of it), its tab is in front, and it is `active`.
 * Nothing is downloaded until it first plays (`preload="none"` plus the
 * poster), and with reduced motion it never starts: the poster stands in.
 */
export function ClubVideo({
  src,
  poster,
  label,
  active = true,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  /** Set false to hold the video on its current frame, e.g. while another
   *  club is in focus. */
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(video);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    // The observer does not fire when the tab goes to the background.
    const syncTab = () => setTabHidden(document.hidden);
    syncTab();
    document.addEventListener("visibilitychange", syncTab);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", syncTab);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (visible && active && !reduced && !tabHidden) {
      // React does not reliably reflect `muted` to the property, and browsers
      // only allow play() without a gesture on a muted video.
      video.muted = true;
      // Autoplay can still be refused (e.g. power saving); the poster stays.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [visible, active, reduced, tabHidden]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className={cn("size-full object-cover", className)}
    />
  );
}
