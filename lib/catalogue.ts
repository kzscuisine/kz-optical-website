import data from "./catalogue.generated.json";

export type Size = { sku: string; label: string };
export type Colour = { code: string; name: string; image: string | null; sizes: Size[] };
export type Product = {
  id: string; brand: string; brandSlug: string; model: string; name: string;
  audience: string; gender: string; material: string; titanium: boolean;
  image: string | null; colours: Colour[];
};

export const catalogue = data as unknown as Product[];
const byId = new Map(catalogue.map((p) => [p.id, p]));

export function findProduct(id: string): Product | undefined {
  return byId.get(id);
}

export function findSku(product: Product, sku: string) {
  for (const colour of product.colours) {
    const size = colour.sizes.find((s) => s.sku === sku);
    if (size) return { colour, size };
  }
  return undefined;
}

export const PLACEHOLDER_IMAGE = "/catalogue-frames/superflex-image-pending.svg";
