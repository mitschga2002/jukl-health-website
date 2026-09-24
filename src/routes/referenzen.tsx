import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/content";
import { PillLink } from "@/components/site/Pill";
import { cn } from "@/lib/utils";
import { LeadCard, StoryCard } from "@/components/site/References";
import { CATEGORIES, stories, type Category } from "@/lib/stories";

export const Route = createFileRoute("/referenzen")({
  head: () => ({
    meta: [
      { title: "Referenzen – Was unsere Klienten sagen | JuklHealth" },
      {
        name: "description",
        content:
          "Stimmen von Profisportler:innen, Freizeitsportler:innen und Menschen mit gesundheitlichen Zielen, die mit dem JuklHealth System trainieren.",
      },
      { property: "og:title", content: "Referenzen – JuklHealth" },
      { property: "og:description", content: "Was unsere Klienten sagen." },
      { property: "og:url", content: "https://juklhealth.com/referenzen" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/referenzen" }],
  }),
  component: Referenzen,
});

function Referenzen() {
  const [filter, setFilter] = useState<Category | null>(null);
  const visible = filter ? stories.filter((s) => s.category === filter) : stories;
  const filters: { label: string; value: Category | null }[] = [
    { label: "Alle", value: null },
    ...CATEGORIES.filter((c) => stories.some((s) => s.category === c)).map((c) => ({
      label: c,
      value: c,
    })),
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="REFERENZEN"
        title="Was unsere Klienten sagen"
        intro="Profisportler, Freizeitsportler und Menschen mit gesundheitlichen Zielen – ein System, viele Geschichten."
      />

      <Section
        eyebrow="STORIES"
        title="Resultate, keine Hoffnungen"
        action={<PillLink to="/kontakt">Termin vereinbaren</PillLink>}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Nach Bereich filtern">
            {filters.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors duration-300 ease-out",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <LeadCard />
            {visible.map((story) => (
              <StoryCard key={story.name} story={story} />
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
