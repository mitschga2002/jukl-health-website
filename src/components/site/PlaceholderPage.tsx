import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
}

export function PlaceholderPage({ eyebrow, title, description }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1 px-6 lg:px-12 py-24 lg:py-40 max-w-5xl">
        <span className="text-xs uppercase tracking-[0.22em] text-primary mb-6 block">
          {eyebrow}
        </span>
        <h1 className="font-display text-5xl lg:text-7xl tracking-tight leading-[1.02] mb-10 text-balance">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-pretty">{description}</p>
        <div className="mt-16 inline-flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-foreground/60">
          <span className="w-12 h-px bg-primary" />
          In Arbeit — bald verfügbar
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
