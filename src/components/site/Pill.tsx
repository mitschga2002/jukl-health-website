import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* The design has exactly one button shape — a 100px pill — in five finishes,
   picked by the surface it sits on. `solid` carries the arrow in a filled
   circle; the outline finishes carry it bare; `quiet` drops the border. */
const pillVariants = cva(
  "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full text-base transition-colors duration-300 ease-out",
  {
    variants: {
      variant: {
        solid:
          "gap-2.5 bg-primary py-1 pl-4 pr-1 text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.25)] hover:bg-primary-hover",
        /* The outline finishes wash rather than invert: a full fill swaps both
           surface and ink at once, which reads as a state change instead of a
           hover. The tint keeps the label and border exactly where they were.
           Only the on-photo finish keeps a cast shadow, and a soft one — it is
           the single case where the pill has to hold its own against an image.
           On a flat surface the same shadow reads as grime under the hairline. */
        outlineOnPhoto:
          "gap-2.5 border border-white px-4 py-2 text-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] hover:bg-white/15",
        outlineOnDark:
          "gap-2.5 border border-surface-foreground px-6 py-2 text-surface-foreground hover:bg-surface-foreground/10",
        outlineOnLight:
          "gap-2.5 border border-foreground px-6 py-2 text-foreground hover:bg-foreground/5",
        quiet: "gap-2.5 py-[13.5px] text-primary hover:text-primary-hover",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

/* Every pill's arrow lifts off along its own axis on hover — 2px, quick, no
   glide. `PillLink` is its own hover target, so it names its group; `PillStatic`
   has no link of its own and takes the cue from whichever card wraps it. */
const arrowMotion =
  "transition-transform duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none";

type PillVariant = NonNullable<VariantProps<typeof pillVariants>["variant"]>;

/** Shared body of every pill, so the three element flavours cannot drift. */
function PillBody({
  variant,
  arrow,
  children,
}: {
  variant: PillVariant;
  arrow: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* `grow` only bites when the pill is stretched (e.g. `w-full` in the
          mobile menu or on the contact form): the label then centres in the
          free space and the arrow stays pinned to the right edge instead of
          floating mid-button. */}
      <span className="grow text-center">{children}</span>
      {!arrow ? null : variant === "solid" ? (
        <span className="flex shrink-0 items-center justify-center rounded-full bg-background p-2.5">
          <ArrowUpRight
            className={cn(
              "size-4 text-foreground",
              arrowMotion,
              "group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </span>
      ) : (
        <ArrowUpRight
          className={cn(
            "size-4 shrink-0",
            arrowMotion,
            "group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5",
          )}
          strokeWidth={2}
          aria-hidden
        />
      )}
    </>
  );
}

type PillBaseProps = {
  variant?: PillVariant;
  children: React.ReactNode;
  className?: string;
  /** Off for actions that stay on the page — a form submit, a consent button. */
  arrow?: boolean;
};

type PillProps = PillBaseProps & {
  to: string;
  hash?: string;
  /** Router search params, e.g. the trainer preselected from the team page. */
  search?: Record<string, unknown>;
  onClick?: () => void;
};

export function PillLink({
  to,
  hash,
  search,
  children,
  variant = "solid",
  arrow = true,
  className,
  onClick,
}: PillProps) {
  return (
    <Link
      to={to}
      hash={hash}
      search={search}
      onClick={onClick}
      className={cn("group/pill", pillVariants({ variant }), className)}
    >
      <PillBody variant={variant} arrow={arrow}>
        {children}
      </PillBody>
    </Link>
  );
}

/** Same pill for destinations the router does not own — mailto:, tel:, external. */
export function PillAnchor({
  href,
  target,
  rel,
  children,
  variant = "solid",
  arrow = true,
  className,
}: PillBaseProps & { href: string; target?: string; rel?: string }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("group/pill", pillVariants({ variant }), className)}
    >
      <PillBody variant={variant} arrow={arrow}>
        {children}
      </PillBody>
    </a>
  );
}

/** Same pill for actions rather than navigation — form submit, consent gate. */
export function PillButton({
  children,
  variant = "solid",
  arrow = false,
  className,
  ...rest
}: PillBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "group/pill cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
        pillVariants({ variant }),
        className,
      )}
    >
      <PillBody variant={variant} arrow={arrow}>
        {children}
      </PillBody>
    </button>
  );
}

/**
 * The same pill rendered as a span, for when an ancestor is already the link —
 * nesting an <a> inside an <a> is invalid, and the club cards are clickable as
 * a whole.
 */
export function PillStatic({
  children,
  variant = "quiet",
  arrow = true,
  className,
}: VariantProps<typeof pillVariants> & {
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <span className={cn(pillVariants({ variant }), className)}>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          className={cn(
            "size-5 shrink-0",
            arrowMotion,
            "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          )}
          strokeWidth={2}
          aria-hidden
        />
      ) : null}
    </span>
  );
}

/** Small caps label that opens every section in the design. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-base font-light uppercase leading-tight tracking-wider text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
