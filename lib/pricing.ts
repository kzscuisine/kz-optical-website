// KZ Optical frame pricing.
// Formula: WestGroupe brochure package price + $47 profit + $10 shipping (shipping is never shown to customers).
// Brochure base package = Standard single vision, Orma, HC coating, frame included for Superflex / Superflex Kids.
export const pricing = {
  basePackage: 42,
  profit: 47,
  shipping: 10,
};

// Brochure "frame upgrade" amounts added to the base package.
export const brandUpgrade: Record<string, number> = {
  "Superflex": 0,
  "Superflex Kids": 0,
  "Superflex Titan": 26,
  "Nano Glow": 32,
  "Nano Indestructible": 32,
  "Nano Baby": 32,
  "One True Pair": 32,
  "Stepper": 32,
};
export const stepperTitaniumUpgrade = 95;

export function framePrice(p: { brand: string; titanium?: boolean }): number | null {
  let upgrade = brandUpgrade[p.brand];
  if (upgrade === undefined) return null;
  if (p.brand === "Stepper" && p.titanium) upgrade = stepperTitaniumUpgrade;
  return pricing.basePackage + upgrade + pricing.profit + pricing.shipping;
}
