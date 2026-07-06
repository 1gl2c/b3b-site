export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number | null;
  stripePaymentLink: string | null;
  image: string;
  images: string[];
  description: string;
  specs: string[];
  status: "available" | "made-to-order" | "coming-soon";
}

export const products: Product[] = [
  // ─── Expected best sellers first ───────────────────────────────────────────
  {
    // TODO: front + side angles coming in next shoot
    slug: "black-leather-backpack",
    name: "Black Leather Backpack",
    category: "Backpack",
    price: null,
    stripePaymentLink: null,
    image: "/products/black-leather-backpack.jpg",
    images: [
      "/products/black-leather-backpack.jpg",
      "/products/black-leather-backpack-2.jpg",
    ],
    description:
      "Full-grain black leather backpack with padded shoulder straps and a carry handle — built for daily use and built to last. Crafted by Bo with the same precision as every piece in the collection.",
    specs: [
      "Full-grain leather shell",
      "Padded leather shoulder straps",
      "Top carry handle",
      "Solid metal hardware",
      "Debossed B3B logo",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "gym-duffle-bag",
    name: "Gym Duffle Bag",
    category: "Duffle",
    price: null,
    stripePaymentLink: null,
    image: "/products/gym-duffle.jpg",
    images: ["/products/gym-duffle.jpg"],
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

  // ─── Rest of collection ─────────────────────────────────────────────────────
  {
    slug: "shopping-bag",
    name: "Shopping Bag",
    category: "Tote",
    price: null,
    stripePaymentLink: null,
    image: "/products/shopping-bag.jpg",
    images: ["/products/shopping-bag.jpg"],
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
    slug: "leather-cross-body-saddle-bag",
    name: "Leather Cross Body Saddle Bag",
    category: "Crossbody",
    price: null,
    stripePaymentLink: null,
    image: "/products/crossbody-saddle.jpg",
    images: ["/products/crossbody-saddle.jpg"],
    description:
      "Designed for movement. This full-grain leather crossbody saddle bag sits clean against the body, carries what matters, and arrives in leather that only gets better with every mile.",
    specs: [
      "Full-grain leather",
      "Adjustable crossbody strap",
      "Front flap + magnetic snap closure",
      "Interior card slots + zip pocket",
      "Solid metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "belt-bag",
    name: "Belt Bag",
    category: "Belt Bag",
    price: null,
    stripePaymentLink: null,
    image: "/products/belt-bag.jpg",
    images: ["/products/belt-bag.jpg"],
    description:
      "Precision-cut in full-grain leather — minimal exterior, thoughtful interior. Built for the person who moves with intention and carries only what they need.",
    specs: [
      "Full-grain leather",
      "Polyester lining",
      "Adjustable leather belt strap",
      "Metal zip top closure",
      "Two interior slip pockets",
      "Solid metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "cylinder-hand-bag",
    name: "Cylinder Hand Bag",
    category: "Handbag",
    price: null,
    stripePaymentLink: null,
    image: "/products/cylinder-hand-bag.jpg",
    images: ["/products/cylinder-hand-bag.jpg"],
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
    name: "Flat Back Pack",
    category: "Backpack",
    price: null,
    stripePaymentLink: null,
    image: "/products/flat-backpack.jpg",
    images: ["/products/flat-backpack.jpg"],
    description:
      "Bo's statement backpack — a full-grain leather piece built for those who carry more than belongings. Structured, purposeful, and crafted to improve with every year of use.",
    specs: [
      "Full-grain leather shell",
      "Polyester lining",
      "Top zip + magnetic clasp closure",
      "Padded leather shoulder straps",
      "Laptop sleeve + interior patch pocket",
      "Solid metal hardware throughout",
      "Debossed B3B logo",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "saddle-bag",
    name: "Saddle Bag",
    category: "Crossbody",
    price: null,
    stripePaymentLink: null,
    image: "/products/saddle-bag.jpg",
    images: ["/products/saddle-bag.jpg"],
    description:
      "A classic silhouette reinterpreted in full-grain leather. The Saddle Bag carries the heritage of equestrian craft forward — clean lines, refined hardware, and a leather that patinas beautifully over time.",
    specs: [
      "Full-grain leather",
      "Adjustable shoulder strap",
      "Flap closure with metal hardware",
      "Interior organization pockets",
      "Solid metal hardware",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "drawcord-back-pack",
    name: "Drawcord Back Pack",
    category: "Backpack",
    price: null,
    stripePaymentLink: null,
    image: "/products/drawcord-backpack.jpg",
    images: [
      "/products/drawcord-backpack.jpg",
      "/products/drawcord-backpack-2.jpg",
      "/products/drawcord-backpack-3.jpg",
    ],
    description:
      "The everyday carry — a premium leather drawstring backpack that collapses flat and expands to carry everything. Simple form, extraordinary material. Leather drawcord, metal eyelets, cotton canvas lining.",
    specs: [
      "Full-grain leather",
      "Cotton canvas lining",
      "Leather drawcord closure",
      "Leather top carry loop",
      "Solid metal eyelets",
      "Made in USA, imported hides",
    ],
    status: "made-to-order",
  },
  {
    slug: "sling-bag",
    name: "Sling Bag",
    category: "Sling",
    price: null,
    stripePaymentLink: null,
    image: "/products/sling-bag.jpg",
    images: [
      "/products/sling-bag.jpg",
      "/products/sling-bag-2.jpg",
      "/products/sling-bag-interior.jpg",
    ],
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
    // TODO: placeholder name — confirm with Bo
    slug: "compact-sling-black",
    name: "Compact Sling — Black",
    category: "Sling",
    price: null,
    stripePaymentLink: null,
    image: "/products/compact-sling-black.jpg",
    images: [
      "/products/compact-sling-black.jpg",
      "/products/compact-sling-black-2.jpg",
      "/products/compact-sling-black-3.jpg",
      "/products/compact-sling-black-4.jpg",
    ],
    description:
      "Full-grain black leather sling pack with a front zip pocket, top carry handle, and wide padded leather strap. Built to carry what matters — clean enough to wear with anything.",
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
  {
    // TODO: placeholder name — confirm with Bo
    slug: "compact-sling-brown",
    name: "Compact Sling — Brown",
    category: "Sling",
    price: null,
    stripePaymentLink: null,
    image: "/products/compact-sling-brown.jpg",
    images: [
      "/products/compact-sling-brown.jpg",
      "/products/compact-sling-brown-2.jpg",
    ],
    description:
      "Full-grain chocolate brown leather sling pack with a front zip pocket, top carry handle, and wide padded leather strap. Built to carry what matters — clean enough to wear with anything.",
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
  {
    slug: "cap",
    name: "Cap",
    category: "Accessory",
    price: null,
    stripePaymentLink: null,
    image: "/products/cap.jpg",
    images: ["/products/cap.jpg"],
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
