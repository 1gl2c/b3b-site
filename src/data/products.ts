export interface Product {
  slug: string;
  name: string;
  category: string;
  code: string;
  collection: string;
  isNew?: boolean;
  price: number | null;
  stripePaymentLink: string | null;
  image: string;
  images: string[];
  /** Grid/collections-card imagery. Kept separate from `image`/`images` (PDP + search) on purpose. */
  card: {
    primary: string;
    /** Convention-based path — {code}-model.png. May not exist yet; ProductCard falls back to {code}-a2.png on load error. */
    hover: string;
    gallery: string[];
  };
  description: string;
  specs: string[];
  status: "available" | "made-to-order" | "coming-soon";
}

function buildCard(code: string, gallery: string[]) {
  return {
    primary: gallery.find((g) => g.includes(`${code}-a1`)) ?? gallery[0],
    hover: `/products/${code}/${code}-model.png`,
    gallery,
  };
}

export const products: Product[] = [
  // ─── Expected best sellers first ───────────────────────────────────────────
  {
    slug: "gym-duffle-bag",
    name: "Gym Bag",
    category: "Duffle",
    code: "gym",
    collection: "gym-travel",
    price: null,
    stripePaymentLink: null,
    image: "/products/gym/gym-a1.png",
    images: [
      "/products/gym/gym-a1.png",
      "/products/gym/gym-a2.png",
      "/products/gym/gym-a3.png",
      "/products/gym/gym-model.png",
    ],
    card: buildCard("gym", [
      "/products/gym/gym-a1.png",
      "/products/gym/gym-a2.png",
      "/products/gym/gym-a3.png",
      "/products/gym/gym-model.png",
    ]),
    description:
      "Leather bag with drawcord closure, adjustable leather logo-webbing strap. Metal hardware and metal feet on the bottom. Outside zip pocket. Named for the very first bag Bo ever made — built to carry everything, built to last.",
    specs: [
      "Calfskin leather, 100% leather shell",
      "Polyester lining",
      "19.25\" W × 22\" H × 38.5\" circumference",
      "Two top handles, 8\" drop",
      "Adjustable, removable shoulder strap",
      "Drawcord closure",
      "Interior leather patch pocket",
      "Outside zip pocket",
      "Metal hardware + bottom feet studs",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },

  // ─── Production run — 20 units ──────────────────────────────────────────────
  // TODO: 20 production units made — may become "available" / "Ready to Ship"
  //       instead of made-to-order once fulfillment is confirmed with Bo.
  {
    slug: "sling-bag-black",
    name: "Sling Bag — Black",
    category: "Sling",
    code: "slb",
    collection: "crossbody-shoulder",
    price: null,
    stripePaymentLink: null,
    image: "/products/slb/slb-a1.png",
    images: [
      "/products/slb/slb-a1.png",
      "/products/slb/slb-a2.png",
      "/products/slb/slb-a3.png",
    ],
    card: buildCard("slb", [
      "/products/slb/slb-a1.png",
      "/products/slb/slb-a2.png",
      "/products/slb/slb-a3.png",
    ]),
    description:
      "Full-grain black leather sling pack. Front zip pocket with debossed B3B logo, wide padded leather adjustable strap, top carry handle, and a side zip-around main compartment. Worn across the body — carries what matters, gets out of the way.",
    specs: [
      "Full-grain leather shell",
      "Front zip pocket with debossed B3B logo",
      "Wide padded leather adjustable strap",
      "Top carry handle",
      "Side zip-around main compartment",
      "Padded back panel",
      "Gunmetal hardware throughout",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },

  // ─── Rest of collection ─────────────────────────────────────────────────────
  {
    slug: "shopping-bag",
    name: "Tote",
    category: "Tote",
    code: "tot",
    collection: "totes",
    price: null,
    stripePaymentLink: null,
    image: "/products/tot/tot-a1.png",
    images: [
      "/products/tot/tot-a1.png",
      "/products/tot/tot-a2.png",
      "/products/tot/tot-a3.png",
      "/products/tot/tot-a4.png",
      "/products/tot/tot-model.png",
    ],
    card: buildCard("tot", [
      "/products/tot/tot-a1.png",
      "/products/tot/tot-a2.png",
      "/products/tot/tot-a3.png",
      "/products/tot/tot-a4.png",
      "/products/tot/tot-model.png",
    ]),
    description:
      "Full-grain leather shopping bag with a structured silhouette and generous interior. Debossed B3B logo, solid metal hardware, and a construction built to carry everything you need — and last for decades doing it.",
    specs: [
      "Full-grain leather shell",
      "Solid metal hardware",
      "Debossed B3B logo",
      "Fully lined interior",
      "Top zip closure",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "belt-bag",
    name: "Bum Bag — Red & Black",
    category: "Bum Bag",
    code: "bum",
    collection: "bumbags",
    price: null,
    stripePaymentLink: null,
    image: "/products/bum/bum-a1.png",
    images: [
      "/products/bum/bum-a1.png",
      "/products/bum/bum-a2.png",
      "/products/bum/bum-a3.png",
      "/products/bum/bum-a4.png",
      "/products/bum/bum-model.png",
    ],
    card: buildCard("bum", [
      "/products/bum/bum-a1.png",
      "/products/bum/bum-a2.png",
      "/products/bum/bum-a3.png",
      "/products/bum/bum-a4.png",
      "/products/bum/bum-model.png",
    ]),
    description:
      "Precision-cut in full-grain leather — minimal exterior, thoughtful interior. Built for the person who moves with intention and carries only what they need.",
    specs: [
      "Full-grain leather",
      "Polyester lining",
      "Adjustable webbing waist strap",
      "Metal zip top closure",
      "Two interior slip pockets",
      "Solid metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "cylinder-hand-bag",
    name: "Cylinder Handbag",
    category: "Handbag",
    code: "cyl",
    collection: "totes",
    isNew: true,
    price: null,
    stripePaymentLink: null,
    image: "/products/cyl/cyl-a1.png",
    images: [
      "/products/cyl/cyl-a1.png",
      "/products/cyl/cyl-a2.png",
      "/products/cyl/cyl-a3.png",
      "/products/cyl/cyl-a4.png",
      "/products/cyl/cyl-model.png",
    ],
    card: buildCard("cyl", [
      "/products/cyl/cyl-a1.png",
      "/products/cyl/cyl-a2.png",
      "/products/cyl/cyl-a3.png",
      "/products/cyl/cyl-a4.png",
      "/products/cyl/cyl-model.png",
    ]),
    description:
      "A cylindrical form in premium full-grain leather — architectural, unmistakable, and built to become a collector's piece. The Cylinder Hand Bag redefines what a handbag can be.",
    specs: [
      "Full-grain leather shell",
      "Suede interior lining",
      "Magnetic snap + drawstring closure",
      "Detachable crossbody strap",
      "Antique gold metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "flat-back-pack",
    name: "Flat Backpack",
    category: "Backpack",
    code: "flb",
    collection: "backpacks",
    isNew: true,
    price: null,
    stripePaymentLink: null,
    image: "/products/flb/flb-a1.png",
    images: [
      "/products/flb/flb-a1.png",
      "/products/flb/flb-a2.png",
      "/products/flb/flb-a3.png",
      "/products/flb/flb-a4.png",
    ],
    card: buildCard("flb", [
      "/products/flb/flb-a1.png",
      "/products/flb/flb-a2.png",
      "/products/flb/flb-a3.png",
      "/products/flb/flb-a4.png",
    ]),
    description:
      "Bo's statement backpack — a full-grain leather piece built for those who carry more than belongings. Structured, purposeful, and crafted to improve with every year of use.",
    specs: [
      "Full-grain leather shell",
      "Polyester lining",
      "Antique brass snap closures",
      "Padded rolled-leather top handle",
      "Webbing shoulder straps",
      "Laptop sleeve + interior patch pocket",
      "Solid metal hardware throughout",
      "Debossed B3B logo",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "drawcord-backpack",
    name: "Drawcord Backpack — Black",
    category: "Backpack",
    code: "dcb",
    collection: "backpacks",
    price: null,
    stripePaymentLink: null,
    image: "/products/dcb/dcb-a1.png",
    images: [
      "/products/dcb/dcb-a1.png",
      "/products/dcb/dcb-a2.png",
      "/products/dcb/dcb-a3.png",
      "/products/dcb/dcb-a4.png",
      "/products/dcb/dcb-model.png",
    ],
    card: buildCard("dcb", [
      "/products/dcb/dcb-a1.png",
      "/products/dcb/dcb-a2.png",
      "/products/dcb/dcb-a3.png",
      "/products/dcb/dcb-a4.png",
      "/products/dcb/dcb-model.png",
    ]),
    description:
      "Full-grain black leather backpack with flap closure, red leather drawcord, front zip pocket, padded shoulder straps, and a top carry handle. The B3B graffiti logo debossed on the flap — an everyday carry that improves with use.",
    specs: [
      "Full-grain leather shell",
      "Red leather drawcord closure",
      "Flap + magnetic clasp closure",
      "Front zip pocket",
      "Padded leather shoulder straps",
      "Top carry handle",
      "Debossed B3B graffiti logo",
      "Solid metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "drawcord-backpack-red",
    name: "Drawcord Backpack — Red",
    category: "Backpack",
    code: "dcr",
    collection: "backpacks",
    price: null,
    stripePaymentLink: null,
    image: "/products/dcr/dcr-a1.png",
    images: [
      "/products/dcr/dcr-a1.png",
      "/products/dcr/dcr-a2.png",
    ],
    card: buildCard("dcr", [
      "/products/dcr/dcr-a1.png",
      "/products/dcr/dcr-a2.png",
    ]),
    description:
      "Full-grain brick-red leather backpack with flap closure, black leather drawcord, front zip pocket, padded shoulder straps, and a top carry handle. The B3B graffiti logo debossed on the flap — the inverse colorway of the Drawcord Backpack, the same everyday carry that improves with use.",
    specs: [
      "Full-grain brick-red leather shell",
      "Black leather drawcord closure",
      "Flap + magnetic clasp closure",
      "Front zip pocket",
      "Padded leather shoulder straps",
      "Top carry handle",
      "Debossed B3B graffiti logo",
      "Solid metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "sling-bag",
    name: "Crossbody Sling Bag",
    category: "Crossbody Sling",
    code: "cbs",
    collection: "crossbody-shoulder",
    price: null,
    stripePaymentLink: null,
    image: "/products/cbs/cbs-a1.png",
    images: [
      "/products/cbs/cbs-a1.png",
      "/products/cbs/cbs-a2.png",
      "/products/cbs/cbs-a3.png",
      "/products/cbs/cbs-a4.png",
      "/products/cbs/cbs-model.png",
    ],
    card: buildCard("cbs", [
      "/products/cbs/cbs-a1.png",
      "/products/cbs/cbs-a2.png",
      "/products/cbs/cbs-a3.png",
      "/products/cbs/cbs-a4.png",
      "/products/cbs/cbs-model.png",
    ]),
    description:
      "All leather, front zipper pocket, leather adjustable strap, carry handle, inside zipper pocket. 100% cotton lining. A clean, functional design that wears as well with a suit as it does on the street.",
    specs: [
      "100% leather exterior",
      "100% cotton lining",
      "Front zipper pocket",
      "Inside zipper pocket",
      "Leather adjustable strap",
      "Top carry handle",
      "Metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "cap",
    name: "Cap",
    category: "Accessory",
    code: "cap",
    collection: "accessories",
    price: null,
    stripePaymentLink: null,
    image: "/products/cap/cap-a1.png",
    images: [
      "/products/cap/cap-a1.png",
      "/products/cap/cap-a2.png",
      "/products/cap/cap-a3.png",
      "/products/cap/cap-model.png",
    ],
    card: buildCard("cap", [
      "/products/cap/cap-a1.png",
      "/products/cap/cap-a2.png",
      "/products/cap/cap-a3.png",
      "/products/cap/cap-model.png",
    ]),
    description:
      "The B3B cap. Premium construction, debossed logo, built to the same standard as every piece in the collection. An everyday essential from a craftsman who doesn't do shortcuts.",
    specs: [
      "Premium construction",
      "Debossed B3B logo",
      "Adjustable fit",
      "One size",
    ],
    status: "made-to-order",
  },
];
