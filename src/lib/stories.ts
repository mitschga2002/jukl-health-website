/* Client stories for /referenzen and the homepage teaser. */

export const CATEGORIES = ["Profisport", "Vereine", "Privatpersonen", "Unternehmen"] as const;
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

/* Add a story here. Order is display order, on /referenzen and in the
   homepage carousel: the strongest photos lead and the categories alternate,
   so the first cards show the range. Stories without a photo or with a small
   one sit further back. Photos go through `image-variants.json` like every
   other image on the site. */
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
    name: "Alexander Konzett",
    role: "Privatperson",
    quote:
      "Ich genieße das professionelle Training in der Gruppe. Mir gefällt die ganzheitliche Art — die gute Betreuung sorgt dafür, dass ich die Übungen richtig mache.",
    highlight: "Mir gefällt die ganzheitliche Art",
    category: "Privatpersonen",
    image: "/img/alexander-konzett-1200.webp",
    imagePosition: "object-top",
  },
  {
    name: "Urs Bühler",
    role: "Unternehmer aus Uzwil",
    quote:
      "Always keep moving – in diesem Sinne herzlichen Dank für deine Geduld und das vielseitige Training. Mit Humor und Einfühlungsvermögen an die Bedürfnisse des Kunden gut angepasst. Weiterhin viel Erfolg!",
    highlight: "Mit Humor und Einfühlungsvermögen",
    category: "Unternehmen",
    image: "/img/urs-buehler-640.webp",
    imagePosition: "object-top",
  },
  {
    name: "Daniel Ratz-Michal",
    role: "Volleyballprofi · TSV Hartberg",
    quote:
      "Schon beim ersten Besuch wusste ich: Mit diesem Team möchte ich arbeiten. Ich wurde freundlich und respektvoll empfangen und habe mich sofort so wohlgefühlt, als wäre ich schon oft da gewesen. Die Zusammenarbeit ist wie in einer Familie: Man hat Spaß miteinander und bekommt gleichzeitig eine super Therapie und ein richtig gutes Training. Ich habe mich auf jede Einheit gefreut, weil dort nur coole Leute sind, die dir helfen wollen und es auch tun. Gekommen bin ich mit Knieschmerzen. Heute bin ich schmerzfrei und meine Performance hat sich gesteigert. Ich komme auf jeden Fall wieder.",
    highlight: "Heute bin ich schmerzfrei",
    category: "Profisport",
    image: "/img/daniel-ratz-michal-1200.webp",
    imagePosition: "object-top",
  },
  {
    name: "Selina Madlener",
    role: "Privatperson",
    quote:
      "Nach jahrelangen Rückenschmerzen war ich nach wenigen Trainingseinheiten schmerzfrei. Julian hat ein unglaubliches Gespür für den Körper. Best Trainer ever!",
    highlight: "nach wenigen Trainingseinheiten schmerzfrei",
    category: "Privatpersonen",
    image: "/img/selina-madlener-1200.webp",
    imagePosition: "object-top",
  },
  {
    name: "Matheus Favali",
    role: "Fußballprofi · ehem. FC Dornbirn",
    quote:
      "I would like to thank you for the training sessions we did together. They helped me a lot in continuing my work and I experienced significant improvement. As a result of the training, a good portion of the inflammation stopped and I was able to return to training and playing without pain.",
    highlight: "return to training and playing without pain",
    category: "Profisport",
    image: "/img/matheus-favali-1092.webp",
    imagePosition: "object-top",
  },
  {
    name: "Tom Zimmerschied",
    role: "Fußballprofi · SV Elversberg",
    quote:
      "Das Training mit Julian war immer abwechslungsreich und hat mich mental und körperlich extrem schnell weitergebracht. Vor allem im Bereich Schnelligkeit konnte ich mich durch sein Training verbessern.",
    highlight: "mental und körperlich extrem schnell weitergebracht",
    category: "Profisport",
    image: "/img/tom-zimmerschied-878.webp",
    imagePosition: "object-top",
  },
  {
    name: "Beate Schuster",
    role: "Unternehmerin aus Schlins",
    quote:
      "Ehrlich, authentisch, motivierend. Durch seine sympathische, offene, humorvolle und optimistische Persönlichkeit bringt das Training mit Julian nicht nur tolle Erfolge, sondern macht auch mega viel Spaß.",
    highlight: "Ehrlich, authentisch, motivierend.",
    category: "Unternehmen",
    image: "/img/beate-schuster-900.webp",
    imagePosition: "object-top",
  },
  {
    name: "Leonie Salzgeber",
    role: "Abwehrspielerin · Keiser University USA",
    quote:
      "Mit seinem Wissen und seiner Motivation gestaltete Julian jede Einheit sehr herausfordernd und abwechslungsreich. Mit seiner individuellen Betreuung konnte ich schnell Veränderungen bemerken und meinen Traum mit dem Wechsel nach Amerika verwirklichen.",
    highlight: "meinen Traum mit dem Wechsel nach Amerika verwirklichen",
    category: "Profisport",
    image: "/img/leonie-salzgeber-636.webp",
    imagePosition: "object-top",
  },
  {
    name: "Ina Ludwig",
    role: "Privatperson",
    quote:
      "Julian setzt sich mit mir und meiner Krankheit auseinander und wendet speziell auf mich angepasste Trainingsmethoden an. Vielfältig und mit viel Spaß.",
    highlight: "speziell auf mich angepasste Trainingsmethoden",
    category: "Privatpersonen",
    image: "/img/ina-ludwig-484.webp",
    imagePosition: "object-top",
  },
  {
    name: "Jayden Makwaya",
    role: "Fußballer · SC Freiburg & ÖFB-Nachwuchs",
    quote:
      "Durch das genaue Screening im Performance Club in Dornbirn wurde genau auf meinen Ist-Zustand eingegangen. Mir wurden viele Dinge aufgezeigt, die ich noch verbessern konnte. Wir arbeiten individuell an diesen Themen. Das Training hat mich weitergebracht. Ich fühle mich schneller, stärker, athletischer und stabiler. Somit hat es mich sehr gut auf meine neue Aufgabe beim SC Freiburg vorbereitet. Schade, dass wir vorerst nicht mehr zusammen trainieren können. Bis bald.",
    highlight: "schneller, stärker, athletischer und stabiler",
    category: "Profisport",
    image: "/img/jayden-makwaya-1100.webp",
    imagePosition: "object-top",
  },
  {
    name: "Andreas Genser",
    role: "Finanzvorstand · FC Dornbirn",
    quote:
      "Der Verein FC Dornbirn bedankt sich bei Julian für seinen Einsatz in den gemeinsamen zweieinhalb Jahren. Als Athletiktrainer war er stark am Ausbau professioneller Strukturen innerhalb der Mannschaft beteiligt.",
    highlight: "Ausbau professioneller Strukturen innerhalb der Mannschaft",
    category: "Vereine",
    image: "/img/andreas-genser-372.webp",
    imagePosition: "object-top",
  },
  {
    name: "Samuel Oum Gouet",
    role: "Fußballprofi · ehem. KV Mechelen",
    quote:
      "The work with Julian was very professional, also it was done with joy and good humor. We managed to combine pleasure and work: The positive results you can see by my transfer to KV Mechelen and the debut in the Cameroon national team.",
    highlight: "We managed to combine pleasure and work",
    category: "Profisport",
    image: "/img/samuel-oum-gouet-576.webp",
    imagePosition: "object-top",
  },
  {
    name: "Angelina Natter",
    role: "Privatperson",
    quote:
      "Durch das maßgeschneiderte Training mit den vielen Inputs hat sich meine Lebensqualität nachhaltig verbessert. Viel mehr als ein Coach.",
    highlight: "Viel mehr als ein Coach.",
    category: "Privatpersonen",
    image: "/img/angelina-natter-388.webp",
  },
  {
    name: "Dario Clasadonte",
    role: "Mittelfeld · FC St. Gallen",
    quote:
      "Top motivierter Athletiktrainer mit ausgeprägtem Fachwissen. Athletisch wie konditionell konnte ich enorm zulegen.",
    highlight: "Athletisch wie konditionell konnte ich enorm zulegen.",
    category: "Profisport",
    image: "/img/dario-clasadonte-544.webp",
  },
  {
    name: "Thomas Wiedemann",
    role: "Unternehmer aus Dornbirn",
    quote:
      "Als Jugendlicher achtete ich, wie so viele andere auch, nicht genug auf die richtige Ausführung von sportlichen Bewegungen. Wenn’s mal wo zwickte, dann bin ich das zumeist übergangen. Mit dem Älterwerden lassen sich auftretende Beschwerden dann aber leider nicht mehr so leicht übergehen. Mit diagnostiziertem doppeltem Bandscheibenvorfall hatte ich schon das persönliche Gespräch mit dem Chefchirurgen vom Krankenhaus. Der hat mir mit Vehemenz prophezeit, dass ich in Kürze bei ihm am Operationstisch landen würde. Glücklicherweise habe ich einige Tage später Julian Kleinheinz kennengelernt, als ich ihm beim Training mit einer bunt gemischten Gruppe zusah. Schon beim nächsten Training war ich auch dabei und schon beim übernächsten Training war ich nahezu beschwerdefrei! Nunmehr trainiere ich schon einige Jahre regelmäßig bei Julian und mit meinen Anfang 50 fühle ich mich körperlich besser, als ich mich mit 30 noch fühlte. Ich will die regelmäßigen Trainingseinheiten nicht mehr missen. Das Training in der Gruppe ist jedes Mal ein Erlebnis, Julian und seine Mannen sind top ausgebildet und jedem nur zu empfehlen.",
    highlight: "beim übernächsten Training war ich nahezu beschwerdefrei",
    category: "Unternehmen",
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
    name: "Sandro Wolfinger",
    role: "Fußballer · ehem. Nationalspieler Liechtenstein",
    quote:
      "Seit über einem Jahr hatte ich immense muskuläre Probleme an der gesamten hinteren Kette, von Hamstrings bis Gesäß, und konnte im letzten Halbjahr kein einziges Spiel bestreiten. Die mittlerweile chronischen Entzündungen sprachen auf keine Therapie an, bis ich bei Julian über zwei Monate ein komplettes muskuläres Aufbautraining absolviert habe. Nun bin ich komplett beschwerdefrei, fitter denn je und nutze die Übungen von Julian, um mich in Sachen Stabilität, Schnellkraft und Kraftausdauer weiter zu verbessern. Danke Julian!",
    highlight: "komplett beschwerdefrei, fitter denn je",
    category: "Profisport",
  },
  {
    name: "Anes Omerovic",
    role: "Fußballprofi · ehem. First Vienna FC & UEFA Conference League",
    quote:
      "Durch die Arbeit mit Julian konnte ich mich in sämtlichen körperlichen Bereichen verbessern und verdanke ihm, dass ich seit einigen Jahren keine gröberen Muskelverletzungen hatte. Zudem ist Julian auch ein guter Freund geworden, mit dem ich mich abseits des Trainings sehr gut verstehe. One dream – Champions League.",
    highlight: "seit einigen Jahren keine gröberen Muskelverletzungen",
    category: "Profisport",
    image: "/img/anes-omerovic-427.webp",
    imagePosition: "object-top",
  },
  {
    name: "Dr. Martin von Sontagh",
    role: "Zahnarzt aus Lustenau",
    quote:
      "Ich trainiere im Performance Club, weil das Training gezielt auf mich zugeschnitten ist. Da ich nur einmal pro Woche Zeit habe, muss es noch besser durchgeplant sein, damit es wirklich etwas bewirkt. Es macht mir sehr viel Spaß, dort zu trainieren, und selbst wenn ich mal nicht motiviert bin, ist immer jemand da, der mich zum Training motiviert. Die Ausrüstung und das Equipment sind super und unterscheiden sich sehr von gewöhnlichen Fitnessstudios, da alles sehr funktionell aufgebaut ist.",
    highlight: "das Training gezielt auf mich zugeschnitten",
    category: "Unternehmen",
  },
  {
    name: "Yago Gomez",
    role: "Fußballprofi · FC Vaduz",
    quote:
      "Das Training mit Julian begleitet mich schon seit einem Jahr. Die Trainings sind intensiv, aber machen auch mega Spaß und die Fortschritte sind spürbar. Ich empfinde eine bessere Körperbeherrschung und habe dadurch mehr Sicherheit im Spiel.",
    highlight: "mehr Sicherheit im Spiel",
    category: "Profisport",
    image: "/img/yago-gomez-432.webp",
    imagePosition: "object-top",
  },
];
