// Lens choices offered by KZ Optical (Orma lenses). Amounts are added to the frame's complete-pair price
// and come from the WestGroupe February 2026 brochure (differences from the Standard SV HC package).
export type Coating = { id: string; name: string; price: number };
export type LensType = { id: string; name: string; price: number; description: string; coatings: Coating[] };

export const lensTypes: LensType[] = [
  {
    id: "single-vision",
    name: "Standard Single Vision",
    price: 0,
    description: "One prescription across the lens for distance or near vision.",
    coatings: [
      { id: "hc", name: "Standard HC (included)", price: 0 },
      { id: "hmc-ec", name: "HMC EC", price: 17 },
      { id: "crizal-easy-pro", name: "Crizal Easy Pro", price: 49 },
    ],
  },
  {
    id: "progressive",
    name: "Progressive DS One",
    price: 39,
    description: "Multiple viewing ranges in one lens without a visible segment line.",
    coatings: [
      { id: "hc", name: "Standard HC (included)", price: 0 },
      { id: "hmc-ec", name: "HMC EC", price: 19 },
      { id: "crizal-easy-pro", name: "Crizal Easy Pro", price: 61 },
    ],
  },
  {
    id: "bifocal",
    name: "ST28 Bifocal",
    price: 49,
    description: "Two distinct viewing powers in one lens.",
    coatings: [
      { id: "standard", name: "Standard (included)", price: 0 },
      { id: "crizal-ec-uv", name: "Crizal EC UV", price: 15 },
    ],
  },
];
