/**
 * Single source for the studio's public contact data. The footer, the contact
 * page and the Impressum all render these, so a move or a new mailbox is a
 * one-line change here instead of a hunt through the routes.
 */
export const SITE = {
  name: "JuklHealth",
  legalName: "Juklhealth OG",
  address: {
    street: "Bildgasse 10",
    zip: "6850",
    city: "Dornbirn",
    country: "Österreich",
    /** Two-line form used wherever the address is set as a block. */
    lines: ["Bildgasse 10", "A-6850 Dornbirn"],
    /** One-line form for meta descriptions and map destinations. */
    inline: "Bildgasse 10, 6850 Dornbirn, Österreich",
  },
  emails: {
    primary: "julian@juklhealth.com",
    all: ["julian@juklhealth.com", "florian@juklhealth.com"],
  },
  instagram: {
    handle: "@juklhealth_clubs",
    url: "https://www.instagram.com/juklhealth_clubs/",
  },
} as const;
