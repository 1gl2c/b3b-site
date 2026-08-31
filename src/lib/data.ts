export interface CollectionTab {
  slug: string;
  label: string;
  /** Condensed label for the mobile pill row, where the full label overflows. */
  shortLabel?: string;
}

// slug "" is the /collections root (View All). "new-in" filters on Product.isNew.
// Every other slug must match a Product.collection value in src/data/products.ts.
export const collectionTabs: CollectionTab[] = [
  { slug: "", label: "View All", shortLabel: "All" },
  { slug: "new-in", label: "New In", shortLabel: "New" },
  { slug: "backpacks", label: "Backpacks", shortLabel: "Backpacks" },
  { slug: "crossbody-shoulder", label: "Crossbody and Shoulder Bags", shortLabel: "Crossbody" },
  { slug: "bumbags", label: "Bumbags", shortLabel: "Bumbags" },
  { slug: "totes", label: "Totes and Handbags", shortLabel: "Totes" },
  { slug: "gym-travel", label: "Gym and Travel", shortLabel: "Gym & Travel" },
  { slug: "accessories", label: "Accessories", shortLabel: "Accessories" },
];

export interface CollectionHero {
  image: string;
  /**
   * Horizontal focal point (e.g. "75%") for object-position at mobile/tablet
   * widths. The source photography is wider than every container down to
   * desktop's 21:9, so cover-crop only ever cuts width, never height —
   * vertical position is irrelevant. Ignored at ≥1024px, where the crop is
   * negligible (~99% of width visible) and stays centered.
   */
  objectPositionX: string;
  textColor: "light" | "dark";
  title: string;
  /** Middle tier — italic serif, between title and body. Only View All / New In use this. */
  subtitle?: string;
  body: string;
}

// Keyed by the same slugs as collectionTabs. A slug with no entry here (e.g.
// "gym-travel") renders no hero at all — not a broken image, not an empty band.
export const collectionHeroes: Record<string, CollectionHero> = {
  "": {
    image: "/heroes/camp-07-rooftop.webp",
    objectPositionX: "62%",
    textColor: "light",
    title: "Bo's 3 Bags",
    subtitle: "A lifetime in fashion. A collection of his own.",
    body: "Made in small numbers by Bo.",
  },
  "new-in": {
    image: "/heroes/camp-07-rooftop.webp",
    objectPositionX: "62%",
    textColor: "light",
    title: "Bo's 3 Bags",
    subtitle: "A lifetime in fashion. A collection of his own.",
    body: "Made in small numbers by Bo.",
  },
  backpacks: {
    image: "/heroes/camp-01-backpacks.webp",
    objectPositionX: "75%",
    textColor: "light",
    title: "Backpacks",
    body: "Built to be carried every day and to look better for it. Structured leather, hardware that holds, and a silhouette that stays honest whether the bag is full or empty.",
  },
  "crossbody-shoulder": {
    image: "/heroes/camp-03-crossbody.webp",
    objectPositionX: "70%",
    textColor: "light",
    title: "Crossbody and Shoulder Bags",
    body: "Worn close, worn constantly. Slim bodies and long straps for the days you need your hands and nothing else.",
  },
  bumbags: {
    image: "/heroes/camp-02-bumbags.webp",
    objectPositionX: "62%",
    textColor: "light",
    title: "Bumbags",
    body: "Across the chest or at the waist. Small enough to forget you're wearing it, built well enough that you won't.",
  },
  totes: {
    image: "/heroes/camp-05-totes.webp",
    objectPositionX: "66%",
    textColor: "dark",
    title: "Totes and Handbags",
    body: "Open, deep, and unstructured by design. Hand-cut panels that no two pieces share.",
  },
  accessories: {
    image: "/heroes/camp-07-rooftop.webp",
    objectPositionX: "62%",
    textColor: "light",
    title: "Accessories",
    body: "The smaller pieces. Same leather, same hand, same standard.",
  },
};

/**
 * Ordered image set for the View All (`""`) collection banner slideshow —
 * desktop tree only. camp-07-rooftop leads (matches the homepage hero);
 * camp-06-all is intentionally omitted, camp-07 replaced it.
 */
export const collectionBannerSlides: { image: string; objectPositionX: string }[] = [
  { image: "/heroes/camp-07-rooftop.webp", objectPositionX: "62%" },
  { image: "/heroes/camp-01-backpacks.webp", objectPositionX: "75%" },
  { image: "/heroes/camp-03-crossbody.webp", objectPositionX: "70%" },
  { image: "/heroes/camp-02-bumbags.webp", objectPositionX: "62%" },
  { image: "/heroes/camp-05-totes.webp", objectPositionX: "66%" },
];

export const reviews = [
  {
    text: "The leather quality is unlike anything I've seen at this price point. This bag is going to last me a decade.",
    name: "Marcus T.",
    location: "Los Angeles",
  },
  {
    text: "You can feel the experience behind every detail. The hardware, the stitching — this isn't mass produced.",
    name: "Diane R.",
    location: "New York",
  },
  {
    text: "I've bought bags at twice this price that don't feel half as intentional. B3B is something different.",
    name: "James K.",
    location: "Miami",
  },
];

export const siteValues = [
  { num: "01", title: "Craftsmanship", body: "Every stitch, edge, and finish reflects a lifetime of practice." },
  { num: "02", title: "Full-grain leather", body: "Top layer of the hide. The strongest, most beautiful cut available." },
  { num: "03", title: "Limited production", body: "Each run is finite. When it's gone, it's gone." },
  { num: "04", title: "Built to last", body: "B3B pieces age with you and get better every year of use." },
];

export const timelineItems = [
  {
    era: "The Past",
    title: "Where it began.",
    body: 'Bo\'s path began in a college classroom and was first stitched into a gym bag marked "Open Champ." From streetwear to runway, from boxing rings to boardrooms — decades spent mastering denim, leather, and construction for the world\'s most demanding clients.',
  },
  {
    era: "The Present",
    title: "Building under his own name.",
    body: "B3B launches as the culmination of everything Bo has learned. Italian calfskin. Imported hides. Metal hardware. Debossed signature leather. Each product a direct expression of 35 years spent knowing exactly what makes something last.",
  },
  {
    era: "The Future",
    title: "A legacy built to pass down.",
    body: "B3B is a family brand. Built to grow across generations — from the founder to the next chapter, from one city to global recognition. The goal is not trends. It is permanence.",
  },
];

export const brandValues = [
  { num: "01", title: "Craftsmanship", body: "Every stitch, edge, and finish executed with the precision of a lifetime's practice." },
  { num: "02", title: "Authenticity", body: "The founder's decades of experience remain visible in every product B3B makes." },
  { num: "03", title: "Excellence", body: "No shortcuts in materials, design, or construction. Ever." },
  { num: "04", title: "Innovation", body: "Creating unique concepts rather than copying. B3B does not follow trends — it creates objects that transcend them." },
  { num: "05", title: "Legacy", body: "Build something that lasts beyond one generation. That is the only goal that matters." },
  { num: "06", title: "Functionality", body: "Luxury products should be useful, not just beautiful. B3B pieces earn their place every day." },
];

export const marketingAngles = [
  {
    title: "Legacy-Driven Design",
    quote: "Carry more than a bag. Carry a story.",
    body: "Decades of experience and quiet impact in fashion — visible in every seam, every cut, every piece we make.",
  },
  {
    title: "Self-Expression Without Noise",
    quote: "Not everyone needs to speak loudly — some express themselves through what they wear.",
    body: "B3B speaks to the quiet power of those who know the difference between fashion and quality.",
  },
  {
    title: "Global DNA",
    quote: "International by instinct. Designed to blend in — and stand out.",
    body: "Global fashion sensibilities with universal appeal. B3B is designed for people who move through the world.",
  },
  {
    title: "From the Ring to the Runway",
    quote: "Born in the gym. Built for everywhere.",
    body: "Athletic and street heritage runs through B3B's DNA. The discipline of a fighter. The eye of a designer.",
  },
];
