import { useState } from "react";

import logoBlack from "@/assets/jukl-wordmark-black-384.webp";
import { cn } from "@/lib/utils";

const EASE_PREMIUM = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * A course card's picture. Without a cover, or when the one the app names
 * does not load, the slot shows a quiet brand placeholder instead of a grey
 * block or a broken-image glyph, so the grid stays even and calm.
 */
export function AcademyCourseCover({
  src,
  position,
}: {
  src: string | null;
  position: string | null;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted-foreground/[0.08] to-primary/[0.08]">
      {showImage ? (
        <img
          src={src!}
          alt=""
          loading="lazy"
          decoding="async"
          // The CDN only serves listed sites; sending no referrer at all keeps a
          // staging or preview host from turning every cover into a broken image.
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={cn(
            "size-full object-cover transition-transform group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none",
            EASE_PREMIUM,
          )}
          style={{ objectPosition: position ?? "center" }}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src={logoBlack}
            alt=""
            width={384}
            height={82}
            className="h-5 w-auto opacity-[0.18] lg:h-6"
            aria-hidden
          />
        </span>
      )}
    </div>
  );
}
