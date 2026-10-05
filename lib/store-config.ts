export const storeConfig = {
  currency: "CAD",
  framePrice: null as number | null,
  shippingFlatRate: null as number | null,
  freeShippingThreshold: null as number | null,
  taxNote: "Taxes are calculated/finalized according to the business setup before launch.",
  inventoryMode: "availability-on-confirmation" as const,
  contactEmail: "",
  businessName: "KZ Optical",
  region: "British Columbia, Canada",
};
export const lensOptions = [
  {id:"single-vision", name:"Single Vision", price:null as number|null, description:"One prescription across the lens for distance or near vision."},
  {id:"progressive", name:"Progressive DS One", price:39, description:"Multiple viewing ranges in one lens without a visible segment line."},
  {id:"bifocal", name:"ST28 Bifocal", price:49, description:"Two distinct viewing powers in one lens."},
];
export const lensUpgrades = [
  {id:"standard", name:"Standard / HC", price:null as number|null},
  {id:"hmc-ec", name:"HMC EC", price:19},
  {id:"crizal-easy-pro", name:"Crizal Easy Pro", price:61},
  {id:"crizal-ec-uv", name:"Crizal EC UV", price:15},
];
export function money(v:number|null){return v===null ? "Included" : new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}).format(v)}

export const framePrices = {
  superflexAdult: 99,
  superflexKids: 99,
  oneTruePair: 131,
  nanoVista: 131,
  stepper: 131,
};

export function getFramePrice(product: { brand: string; audience?: string }) {
  if (product.brand === "Superflex Kids" || (product.brand === "Superflex" && product.audience === "Kids")) return framePrices.superflexKids;
  if (product.brand === "Superflex") return framePrices.superflexAdult;
  if (product.brand === "One True Pair") return framePrices.oneTruePair;
  if (product.brand === "Nano Vista") return framePrices.nanoVista;
  if (product.brand === "Stepper") return framePrices.stepper;
  return null;
}








