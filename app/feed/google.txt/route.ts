import { catalogue } from "../../../lib/catalogue";
import { framePrice } from "../../../lib/pricing";

export const dynamic = "force-static";

const BASE = "https://kzoptical.ca";
const KIDS = ["Superflex Kids", "Nano Glow", "Nano Indestructible", "Nano Baby"];

function clean(v: unknown) {
  return String(v ?? "").replace(/[\t\r\n]+/g, " ").trim();
}

export async function GET() {
  const header = [
    "id", "title", "description", "link", "image_link", "availability", "price",
    "brand", "condition", "identifier_exists", "item_group_id", "google_product_category",
    "color", "age_group", "gender",
  ];
  const rows: string[] = [header.join("\t")];

  for (const p of catalogue) {
    const price = framePrice(p);
    if (price === null) continue;
    const kids = KIDS.includes(p.brand);
    const g = String(p.gender ?? "").toLowerCase();
    const gender = kids ? "unisex" : ["male", "female", "unisex"].includes(g) ? g : "unisex";
    for (const c of p.colours) {
      if (!c.image) continue;
      const title = clean(`${p.brand} ${p.model} ${c.name} prescription glasses`).slice(0, 150);
      const description = clean(
        `${p.name} in ${c.name}. Complete prescription eyeglasses with single vision lenses and hard coat included. Free shipping in British Columbia.`
      );
      rows.push([
        clean(`${p.id}-${c.code}`),
        title,
        description,
        `${BASE}/product/${encodeURIComponent(p.id)}`,
        c.image.startsWith("http") ? c.image : BASE + c.image,
        "in stock",
        `${price.toFixed(2)} CAD`,
        clean(p.brand),
        "new",
        "no",
        clean(p.id),
        "1380",
        clean(c.name),
        kids ? "kids" : "adult",
        gender,
      ].join("\t"));
    }
  }

  return new Response(rows.join("\n"), {
    headers: {
      "Content-Type": "text/tab-separated-values; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
