import { SmartImage } from "./SmartImage";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  ratio = "tall",
  image,
  imageAlt,
  imagePosition = "center",
  objectPosition,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  ratio?: "tall" | "wide";
  image?: string;
  imageAlt?: string;
  imagePosition?: "center" | "left" | "right" | "top" | "bottom" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  objectPosition?: string;
}) {
  const positionCls = {
    center: "object-center",
    left: "object-left",
    right: "object-right",
    top: "object-top",
    bottom: "object-bottom",
    "top-right": "object-right-top",
    "top-left": "object-left-top",
    "bottom-right": "object-right-bottom",
    "bottom-left": "object-left-bottom",
  }[imagePosition];

  return (
    <section className="border-b border-foreground/10">
      <div className="grid w-full lg:grid-cols-2">
        <div className="px-6 lg:px-12 py-16 lg:py-24 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-6 block">
            {eyebrow}
          </span>
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight leading-[1.02] text-balance">
            {title}
            </h1>
          {intro ? (
            <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-xl text-pretty">
              {intro}
            </p>
          ) : null}
        </div>
        <div
          className={`bg-muted text-foreground/40 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-foreground/10 ${
            ratio === "tall"
              ? "min-h-[260px] sm:min-h-[380px] lg:min-h-[560px]"
              : "min-h-[200px] sm:min-h-[280px] lg:min-h-[300px]"
          }`}
        >
          {image ? (
            <SmartImage
              src={image}
              alt={imageAlt ?? title}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`absolute inset-0 w-full h-full object-cover ${positionCls}`}
              style={objectPosition ? { objectPosition } : undefined}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center px-8">
                <div className="text-[11px] uppercase tracking-[0.28em] text-primary mb-3">
                  Bild folgt
                </div>
                <div className="font-display text-3xl lg:text-4xl tracking-tight opacity-40">
                  JuklHealth
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  alt,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      className={`px-6 lg:px-12 py-20 lg:py-28 border-b border-foreground/10 ${
        alt ? "bg-foreground text-background" : ""
      }`}
    >
      <div className="jh-container max-w-6xl">
        {eyebrow ? (
          <span className="text-xs uppercase tracking-[0.22em] text-primary mb-4 block">
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h2 className="font-display text-3xl lg:text-5xl tracking-tight mb-10 leading-[1.05] text-balance">
            {title}
          </h2>
        ) : null}
        <div className="prose-content space-y-6 text-base lg:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3 mt-6">
      {items.map((i) => (
        <li key={i} className="flex gap-3 items-start text-base">
          <span className="text-primary mt-1.5 text-xs">●</span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function CTAButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-block mt-8 bg-primary text-primary-foreground px-8 py-4 font-display text-sm hover:bg-primary-hover"
    >
      {children}
    </Link>
  );
}

export function ImagePlaceholder({
  label,
  className = "",
  ratio = "video",
  image,
  focus = "center",
}: {
  label: string;
  className?: string;
  ratio?: "video" | "square" | "tall";
  image?: string;
  focus?: "center" | "top" | "upper";
}) {
  const ratioCls =
    ratio === "square" ? "aspect-square" : ratio === "tall" ? "aspect-[3/4]" : "aspect-video";
  const focusCls =
    focus === "top"
      ? "object-[center_20%]"
      : focus === "upper"
        ? "object-[center_35%]"
        : "object-center";
  return (
    <div
      className={`relative ${ratioCls} bg-muted text-foreground/40 overflow-hidden border border-foreground/10 ${className}`}
    >
      {image ? (
        <SmartImage
          src={image}
          alt={label}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`absolute inset-0 w-full h-full object-cover ${focusCls}`}
        />
      ) : (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <div className="font-display text-xl lg:text-2xl tracking-tight text-center px-6 opacity-50">
              {label}
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] uppercase tracking-[0.22em] text-primary">
            Bild folgt
          </div>
        </>
      )}
    </div>
  );
}


export function SplitBlock({
  eyebrow,
  title,
  children,
  imageLabel,
  image,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  imageLabel: string;
  image?: string;
  reverse?: boolean;
}) {
  if (!image) {
    return (
      <section className="border-b border-foreground/10">
        <div className="jh-container px-6 lg:px-12 py-16 lg:py-24 flex flex-col items-center text-center">
          {eyebrow ? (
            <span className="text-xs uppercase tracking-[0.22em] text-primary mb-4 block">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="font-display text-3xl lg:text-5xl mb-6 tracking-tight leading-[1.05] max-w-3xl">
            {title}
          </h2>
          <div className="space-y-4 text-base lg:text-lg leading-relaxed max-w-3xl">
            {children}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="border-b border-foreground/10">
      <div className="grid w-full lg:grid-cols-2 gap-0">
        <div
          className={`px-6 lg:px-12 py-16 lg:py-24 flex flex-col justify-center ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          {eyebrow ? (
            <span className="text-xs uppercase tracking-[0.22em] text-primary mb-4 block">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="font-display text-3xl lg:text-5xl mb-6 tracking-tight leading-[1.05]">
            {title}
          </h2>
          <div className="space-y-4 text-base lg:text-lg leading-relaxed">{children}</div>
        </div>
        <div className={`relative min-h-[240px] sm:min-h-[320px] lg:min-h-0 ${reverse ? "lg:order-1" : ""}`}>
          <div className="lg:absolute lg:inset-0 aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-full">
            <ImagePlaceholder
              label={imageLabel}
              ratio="square"
              className="h-full !aspect-auto"
              image={image}
              focus="upper"
            />
          </div>
        </div>


      </div>
    </section>
  );
}

export function Testimonial({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="border border-foreground/10 p-8 lg:p-10 bg-background h-full flex flex-col justify-between">
      <blockquote className="font-display text-xl lg:text-2xl leading-snug tracking-tight mb-8 text-balance">
        „{quote}“
      </blockquote>
      <figcaption className="flex items-center gap-4 border-t border-foreground/10 pt-5">
        <div className="w-12 h-12 bg-primary text-primary-foreground grid place-items-center font-display text-lg rounded-full">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-display text-sm">{name}</div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
            {role}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="border-y border-foreground/10">
      <div className="jh-container grid grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <div
            key={s.label}
            className="px-6 py-8 border-r last:border-r-0 border-foreground/10"
          >
            <div className="font-display text-4xl lg:text-5xl text-primary tracking-tight">
              {s.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] mt-2 text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
