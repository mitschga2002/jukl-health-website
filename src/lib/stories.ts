/* Client stories for /referenzen and the homepage teaser. */

export const CATEGORIES = ["Profisport", "Freizeitsport", "Gesundheit"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Story = {
  name: string;
  /** Club, sport or "Privatperson" — the line under the name. */
  role: string;
  quote: string;
  /** The line the card leads with. Always a verbatim excerpt of `quote` —
   *  it is set as the person's words, so it must not be a paraphrase. */
  highlight?: string;
  category: Category;
  /** Photo of the person quoted. Only ever their own photo: a named quote over
   *  somebody else's picture reads as theirs. Without one the card drops the
   *  photo band and opens straight on the quote. */
  image?: string;
  imagePosition?: string;
};

/* Add a story here. Order is display order; photos go through
   `image-variants.json` like every other image on the site. */
export const stories: Story[] = [
  {
    name: "Noah Bischof",
    role: "Fußballprofi · ehem. SK Rapid Wien",
    quote:
      "Fachlich auf einem extrem hohen Niveau, sehr professionell und jede Behandlung sowie jedes Training wird individuell auf einen abgestimmt. Gerade bei meiner schweren Verletzung wusste ich, dass ich mit Julian und Florian genau die richtigen Leute an meiner Seite habe, die mich stärker und fitter zurück auf den Platz bringen.",
    highlight: "stärker und fitter zurück auf den Platz",
    category: "Profisport",
    image: "/img/noah-bischof-1200.webp",
    imagePosition: "object-top",
  },
  {
    name: "Sebastian Santin",
    role: "Fußballer · ehem. WSG Tirol & FC Vaduz",
    quote:
      "Ich arbeite schon seit über 6 Jahren mit Julian zusammen. Wir haben dank seinem Fachwissen meine Stärken weiter ausbauen können und an meinen Schwächen gearbeitet, sodass ich über die Jahre verletzungsfrei geblieben bin und stetig mein Niveau anheben konnte. Julian und sein Team geben dir auch ein Wissen mit auf den Weg, von dem man vor jedem Training und Spiel profitieren kann, um top auf den Punkt vorbereitet zu sein.",
    highlight: "über die Jahre verletzungsfrei geblieben",
    category: "Profisport",
    image: "/img/sebastian-santin-476.webp",
    imagePosition: "object-top",
  },
  {
    name: "Dario Clasadonte",
    role: "Mittelfeld · FC St. Gallen",
    quote:
      "Top motivierter Athletiktrainer mit ausgeprägtem Fachwissen. Athletisch wie konditionell konnte ich enorm zulegen.",
    highlight: "Athletisch wie konditionell konnte ich enorm zulegen.",
    category: "Profisport",
  },
  {
    name: "Selina Madlener",
    role: "Privatperson",
    quote:
      "Nach jahrelangen Rückenschmerzen war ich nach wenigen Trainingseinheiten schmerzfrei. Julian hat ein unglaubliches Gespür für den Körper. Best Trainer ever!",
    highlight: "nach wenigen Trainingseinheiten schmerzfrei",
    category: "Gesundheit",
  },
  {
    name: "Alexander Konzett",
    role: "Privatperson",
    quote:
      "Ich genieße das professionelle Training in der Gruppe. Mir gefällt die ganzheitliche Art — die gute Betreuung sorgt dafür, dass ich die Übungen richtig mache.",
    highlight: "Mir gefällt die ganzheitliche Art",
    category: "Freizeitsport",
  },
  {
    name: "Ina Ludwig",
    role: "Privatperson",
    quote:
      "Julian setzt sich mit mir und meiner Krankheit auseinander und wendet speziell auf mich angepasste Trainingsmethoden an. Vielfältig und mit viel Spaß.",
    highlight: "speziell auf mich angepasste Trainingsmethoden",
    category: "Gesundheit",
  },
  {
    name: "Angelina Natter",
    role: "Privatperson",
    quote:
      "Durch das maßgeschneiderte Training mit den vielen Inputs hat sich meine Lebensqualität nachhaltig verbessert. Viel mehr als ein Coach.",
    highlight: "Viel mehr als ein Coach.",
    category: "Freizeitsport",
  },
];
