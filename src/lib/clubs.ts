import type { ClubCard } from "@/components/site/ClubPage";

/* The three clubs as cards, shared by /clubs and the homepage's Standorte
   block so the two always show the same photos and facts. */
export const clubs: ClubCard[] = [
  {
    name: "Performance Club",
    area: "140 m²",
    address: ["Bildgasse 10, 3. Stock", "A-6850 Dornbirn"],
    image: "/img/pc-hero-1386.webp",
    imageAlt: "Trainingsfläche im Performance Club Dornbirn",
    points: [
      "Personal Training & Athletik",
      "Kleingruppenkurse: HYROX · Mobility · Strength · Burn",
      "Physio & Trainingstherapie",
    ],
    link: { to: "/performance-club" },
  },
  {
    name: "Strength Club",
    area: "160 m²",
    address: ["Bildgasse 10, Erdgeschoss", "A-6850 Dornbirn"],
    image: "/img/strength-club-1824.webp",
    imageAlt: "Trainingsfläche im Strength Club Dornbirn",
    points: ["24/7 Zugang", "Max. 100 Mitglieder", "1 Jahr Betreuungssystem"],
    link: { to: "/strength-club" },
  },
  {
    name: "Training Club Widnau",
    area: "50 m²",
    address: ["Schützenstrasse 13", "CH-9443 Widnau"],
    image: "/img/widnau-club-1080.webp",
    imageAlt: "Trainingsfläche im Training Club Widnau",
    points: ["1:1 Personal Training", "Athletik & Trainingstherapie", "Privates Ambiente"],
    link: { to: "/training-club-widnau" },
  },
];
