import { createFileRoute } from "@tanstack/react-router";
import { contactFormLink } from "@/lib/contact-topics";
import {
  PageShell,
  PageHero,
  Section,
  CTAButton,
  ImagePlaceholder,
  SECTION_Y,
} from "@/components/site/content";
import { Eyebrow, PillAnchor, PillLink } from "@/components/site/Pill";
import { cn } from "@/lib/utils";
import { members, type Member } from "@/lib/team";

const teamBanner = "/img/team-banner-1824.webp";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team – JuklHealth Clubs" },
      {
        name: "description",
        content:
          "Das Team von JuklHealth: Sportwissenschaft, Physiotherapie, Coaching, Personal Training und Marketing – ein Team, ein System, mehrere Standorte.",
      },
      { property: "og:title", content: "Team – JuklHealth" },
      {
        property: "og:description",
        content: "Sportwissenschaft, Physiotherapie und Coaching aus einer Hand.",
      },
      { property: "og:url", content: "https://juklhealth.com/team" },
    ],
    links: [{ rel: "canonical", href: "https://juklhealth.com/team" }],
  }),
  component: Team,
});

function MemberBlock({ m }: { m: Member }) {
  const copy = (
    <div className={cn("flex flex-col justify-center gap-6", m.image && m.reverse && "lg:order-1")}>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-balance text-[32px] leading-[1.25] lg:text-[42px]">
          {m.name}
        </h2>
        <Eyebrow className="text-xs text-primary">{m.role}</Eyebrow>
      </div>
      <p className="max-w-[560px] text-base font-light leading-[1.6] text-muted-foreground lg:text-lg">
        „{m.quote}"
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <PillLink to="/kontakt" search={{ trainer: m.name }}>
          Termin vereinbaren
        </PillLink>
        {m.learnMore ? (
          <PillAnchor href={m.learnMore} variant="outlineOnLight">
            Mehr erfahren
          </PillAnchor>
        ) : null}
      </div>
    </div>
  );

  if (!m.image) {
    return (
      <section className="jh-container jh-gutter">
        <div className={SECTION_Y}>{copy}</div>
      </section>
    );
  }

  return (
    <section className="jh-container jh-gutter">
      <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16", SECTION_Y)}>
        <div className={m.reverse ? "lg:order-2" : ""}>
          <ImagePlaceholder label={m.name} ratio="square" image={m.image} />
        </div>
        {copy}
      </div>
    </section>
  );
}

function Team() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Unsere Vision"
        title="Unser Team – Experten für Performance & Gesundheit"
        intro="Freude verspüren und Lebensqualität steigern. Das ist unser Antrieb, als Team aus Sportwissenschaft, Physiotherapie, Coaching und Marketing."
        image={teamBanner}
        imageAlt="Das Team von JuklHealth"
        banner
      />

      {members.map((m) => (
        <MemberBlock key={m.slug} m={m} />
      ))}

      <Section eyebrow="Karriere" title="Werde Teil des Teams.">
        <p>
          Du brennst für Bewegung, Sportwissenschaft oder Physiotherapie? Schreib uns – wir freuen
          uns über initiative Bewerbungen.
        </p>
        <CTAButton {...contactFormLink("Bewerbung")}>Bewerben</CTAButton>
      </Section>
    </PageShell>
  );
}
