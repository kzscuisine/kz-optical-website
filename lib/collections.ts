export type Collection = { slug: string; title: string; brands: string[]; blurb: string };

export const collections: Collection[] = [
  { slug: "superflex", title: "Superflex", brands: ["Superflex"], blurb: "Lightweight, flexible frames for every day." },
  { slug: "superflex-kids", title: "Superflex Kids", brands: ["Superflex Kids"], blurb: "Durable, flexible frames made for kids." },
  { slug: "superflex-titan", title: "Superflex Titan", brands: ["Superflex Titan"], blurb: "Ultra-light titanium frames with Superflex flexibility." },
  { slug: "nano", title: "Nano Vista", brands: ["Nano Glow", "Nano Indestructible", "Nano Baby"], blurb: "Colourful, flexible eyewear for younger wearers." },
  { slug: "nano-glow", title: "Nano Glow", brands: ["Nano Glow"], blurb: "Nano frames with a glow." },
  { slug: "nano-indestructible", title: "Nano Indestructible", brands: ["Nano Indestructible"], blurb: "Built for active kids." },
  { slug: "nano-baby", title: "Nano Baby", brands: ["Nano Baby"], blurb: "Soft, comfortable frames for little ones." },
  { slug: "one-true-pair", title: "One True Pair", brands: ["One True Pair"], blurb: "Contemporary eyewear with distinctive everyday style." },
  { slug: "stepper", title: "Stepper", brands: ["Stepper"], blurb: "Clean lines and considered frame design." },
];

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

// Collections shown as top-level cards (Nano's three lines sit together under "Nano Vista").
export const mainCollections = collections.filter((c) => !["nano-glow", "nano-indestructible", "nano-baby"].includes(c.slug));

export function collectionForBrand(brand: string): Collection {
  const sub = collections.find((c) => c.brands.length === 1 && c.brands[0] === brand);
  return sub ?? collections[0];
}
