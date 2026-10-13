import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A looping walk-through that plays muted while it is on screen (at least a
 * quarter of it), its tab is in front, and it is `active`. Nothing is
 * downloaded until it first plays (`preload="none"` plus the poster), and
 * with reduced motion it does not start on its own: the poster stands in.
 *
 * A play/pause button (and, with `sound`, a mute toggle) sits in the bottom
 * left corner, shown only on hover or keyboard focus. Touch screens have no
 * hover, so there a tap on the video shows them for a few seconds, the way
 * phone video players do; while hidden they cannot be tapped by accident. A
 * video the viewer paused stays paused when it scrolls back into view.
 *
 * A poster is fetched with the page even under `preload="none"`, so a video
 * far down the page sets `lazyPoster` to hold it back until it is within
 * `POSTER_MARGIN` of the viewport — early enough that it is painted before it
 * scrolls in. Not for a video in the first screen: there the poster is what
 * paints first.
 */
/** How long a tap keeps the controls up on touch screens. */
const REVEAL_MS = 3000;
/** How far ahead of the viewport a lazy poster starts loading. */
const POSTER_MARGIN = "1000px";

export function ClubVideo({
  src,
  poster,
  label,
  active = true,
  sound = false,
  lazyPoster = false,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  /** Set false to hold the video on its current frame, e.g. while another
   *  club is in focus. */
  active?: boolean;
  /** The clip has an audio track worth hearing: adds a mute toggle. It still
   *  starts muted, as browsers only autoplay muted video. */
  sound?: boolean;
  /** Below the fold: fetch the poster only as the video nears the viewport. */
  lazyPoster?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [posterNear, setPosterNear] = useState(!lazyPoster);
  const [reduced, setReduced] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  // null: the viewer has not touched the button, so autoplay decides.
  const [wantsPlay, setWantsPlay] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const pointerType = useRef("mouse");
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  /** Shows the controls on touch and (re)starts the countdown to hide them. */
  const reveal = () => {
    clearTimeout(hideTimer.current);
    setRevealed(true);
    hideTimer.current = setTimeout(() => setRevealed(false), REVEAL_MS);
  };
  useEffect(() => () => clearTimeout(hideTimer.current), []);

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
    if (!video || posterNear) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPosterNear(true);
      },
      { rootMargin: POSTER_MARGIN },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [posterNear]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not reliably reflect `muted` to the property, and browsers
    // only allow play() without a gesture on a muted video.
    video.muted = muted;
    const wanted = wantsPlay ?? !reduced;
    if (visible && active && !tabHidden && wanted) {
      // Autoplay can still be refused (e.g. power saving); the poster stays.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [visible, active, reduced, tabHidden, wantsPlay, muted]);

  const button =
    "flex size-7 items-center justify-center rounded-image bg-background/85 text-foreground backdrop-blur-md transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div
      className={cn("group/video relative size-full", className)}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      // A click rather than pointerup: by the time it fires the tap has been
      // hit-tested, so the buttons it reveals cannot catch the same tap.
      onClick={(e) => {
        if (pointerType.current === "mouse") return;
        if ((e.target as Element).closest("button")) {
          reveal();
        } else if (revealed) {
          clearTimeout(hideTimer.current);
          setRevealed(false);
        } else {
          reveal();
        }
      }}
    >
      <video
        ref={ref}
        src={src}
        poster={posterNear ? poster : undefined}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="size-full object-cover"
      />
      <div
        className={cn(
          "absolute bottom-3 left-3 flex gap-1.5 transition-opacity duration-300 has-focus-visible:opacity-100 group-hover/video:opacity-100 motion-reduce:transition-none",
          revealed ? "opacity-100" : "opacity-0 [@media(hover:none)]:pointer-events-none",
        )}
      >
        <button
          type="button"
          className={button}
          aria-label={playing ? "Video pausieren" : "Video abspielen"}
          onClick={() => setWantsPlay(!playing)}
        >
          {playing ? (
            <Pause className="size-3.5" aria-hidden />
          ) : (
            <Play className="size-3.5" aria-hidden />
          )}
        </button>
        {sound ? (
          <button
            type="button"
            className={button}
            aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
            aria-pressed={!muted}
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <VolumeX className="size-3.5" aria-hidden />
            ) : (
              <Volume2 className="size-3.5" aria-hidden />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
