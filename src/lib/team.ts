/* The team, shared by /team and the trainer modules on the service pages, so
   a new portrait or role is changed in one place. */

export type Member = {
  name: string;
  slug: string;
  role: string;
  quote: string;
  learnMore?: string;
  reverse?: boolean;
  image?: string;
  /** One verbatim line from `quote`, for the compact trainer cards on the
   *  service pages. */
  short?: string;
};

export const members: Member[] = [
  {
    name: "Julian Kleinheinz, BSc",
    slug: "julian-kleinheinz",
    short: "Ich habe den Drang jeden Tag etwas Neues zu lernen.",
    image: "/img/julian-portrait-1460.webp",
    role: "Sportwissenschaftler · Personal Trainer · Athletiktrainer · Gruppentrainer · Gesundheitscoach",
    quote:
      "Ich habe den Drang jeden Tag etwas Neues zu lernen. Dadurch bin ich in einem stetigen Lern- und Verbesserungsprozess und immer dabei, mein Wissen und meinen Körper auf eine andere, unbekannte Art zu fordern und weiterzuentwickeln. Meine Philosophie besteht darin, in jeder Disziplin etwas zu lernen und Bewegungsabläufe sowie motorische Grundeigenschaften auf eine selbstentwickelte Art erfolgreich zu schulen.",
    learnMore: "/meine-person",
  },
  {
    name: "Florian Winder",
    slug: "florian-winder",
    short:
      "(Kraft-)Training ist meine Leidenschaft, und genau dieses Wissen möchte ich weitergeben.",
    image: "/img/florian-winder-1460.webp",
    role: "Physiotherapeut · Athletiktrainer · Personal- & Gruppentrainer",
    quote:
      "Mein Ziel ist es, dich Schritt für Schritt zurück in deinen Sport und deinen Alltag zu begleiten. Durch eine klar strukturierte Rehabilitation entwickeln wir gemeinsam den schnellsten und sichersten Weg zu deinem Comeback. (Kraft-)Training ist meine Leidenschaft, und genau dieses Wissen möchte ich weitergeben. Denn Training bedeutet weit mehr als nur körperliche Anstrengung.",
    reverse: true,
  },
  {
    name: "Caroline Fritsch",
    slug: "caroline-fritsch",
    short:
      "Kein Training ist wie das andere, jeder Mensch, jedes Ziel, jede Einheit ist einzigartig.",
    image: "/img/caroline-fritsch-1387.webp",
    role: "Personal Trainer · Coach",
    quote:
      "Sport begleitet mich, seit ich denken kann. Aus dieser Leidenschaft ist der Wunsch entstanden, Menschen zu zeigen, wie viel Freude, Stärke und Energie in Bewegung steckt. Kein Training ist wie das andere, jeder Mensch, jedes Ziel, jede Einheit ist einzigartig.",
  },
  {
    name: "Biljana Kleinheinz, MMSc",
    slug: "biljana-kleinheinz",
    image: "/img/biljana-kleinheinz-1458.webp",
    role: "Coach · Marketing",
    reverse: true,
    quote:
      "Mein Antrieb, täglich Neues über Menschen, ihre Gedanken und Emotionen zu lernen, hält mich in einem stetigen Lern- und Entwicklungsprozess. Mit Einfühlungsvermögen und wissenschaftlich fundierten mentalen Methoden helfe ich, innere Hürden zu überwinden.",
  },
  {
    name: "Amin Elghazzali, B.A.",
    slug: "amin-elghazzali",
    image: "/img/amin-elghazzali-1460.webp",
    role: "Brand Manager · Marketing",
    quote:
      "Mein Antrieb ist es, Menschen über Bilder, Geschichten und Begegnungen besser zu verstehen. Mit Aufmerksamkeit, Ehrlichkeit und einem offenen Blick versuche ich Inhalte zu schaffen, die nicht nur konsumiert, sondern gefühlt werden.",
  },
];
