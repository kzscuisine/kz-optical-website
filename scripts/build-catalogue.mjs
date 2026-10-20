// KZ Optical: builds the full catalogue from the WestGroupe CSV and the photo folder.
// Usage:  node scripts/build-catalogue.mjs "<path to WestGroupe CSV>" "<folder with the extracted photos>"
// Output: lib/catalogue.generated.json and public/frames/<brand>/<model>-<colour>.jpg
import fs from "fs";
import path from "path";

const [csvPath, photoDir] = process.argv.slice(2);
if (!csvPath || !photoDir) {
  console.error('Usage: node scripts/build-catalogue.mjs "<csv>" "<photo folder>"');
  process.exit(1);
}

const BRANDS = {
  "Superflex Collection": "Superflex",
  "Superflex Kids Collection": "Superflex Kids",
  "Superflex Titan": "Superflex Titan",
  "Nano Glow": "Nano Glow",
  "Nano Indestructible": "Nano Indestructible",
  "Nano Baby": "Nano Baby",
  "One True Pair": "One True Pair",
  "Stepper": "Stepper",
  "Stepper Eyewear": "Stepper",
};
const KIDS = new Set(["Superflex Kids", "Nano Glow", "Nano Indestructible", "Nano Baby"]);

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const title = (s) => String(s).trim().replace(/\s+/g, " ");

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const text = fs.readFileSync(csvPath).toString("latin1").replace(/^﻿/, "");
const [head, ...body] = parseCsv(text);
const rows = body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));

// index photos (case-insensitive) from the extracted folder
const photos = new Map();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.jpe?g$/i.test(e.name)) photos.set(e.name.toLowerCase(), p);
  }
})(photoDir);
console.log(`CSV rows: ${rows.length}   Photos found: ${photos.size}`);

let sharp = null;
try { sharp = (await import("sharp")).default; } catch { console.log("Note: 'sharp' not available, photos will be copied at original size."); }

const products = new Map();
const unknownBrands = new Set();
for (const r of rows) {
  const brand = BRANDS[r.Brand];
  if (!brand) { unknownBrands.add(r.Brand); continue; }
  const id = `${slug(brand)}-${slug(r.Model)}`;
  let p = products.get(id);
  if (!p) {
    p = {
      id, brand, brandSlug: slug(brand), model: r.Model,
      name: /^(SF|SFK|SA|SI|OTP)/i.test(r.Model) ? `${brand} ${r.Model}` : `${brand} ${title(r.Model)}`,
      audience: KIDS.has(brand) ? "Kids" : "Adult",
      gender: title(r.Gender || "").toLowerCase(),
      material: r.Material, titanium: false, image: null, _colours: new Map(),
    };
    products.set(id, p);
  }
  if (/titanium/i.test(r.Material)) p.titanium = true;
  const ckey = `${r.Color_code}|${r.Color_desc_EN}`;
  let c = p._colours.get(ckey);
  if (!c) {
    c = { code: r.Color_code, name: title(r.Color_desc_EN), image: null, files: [], sizes: [] };
    p._colours.set(ckey, c);
  }
  c.files.push(r.Image_right_angle);
  const label = `${r.Lens}-${r.Bridge}-${r.Temple}`;
  if (!c.sizes.some((s) => s.label === label)) c.sizes.push({ sku: r.SKU, label });
}

const outDir = path.resolve("public/frames");
let made = 0, missing = 0;
for (const p of products.values()) {
  p.colours = [];
  for (const c of p._colours.values()) {
    const file = c.files.map((f) => photos.get(f.toLowerCase())).find(Boolean);
    if (file) {
      const rel = `frames/${p.brandSlug}/${slug(p.model)}-${slug(c.code || c.name)}.jpg`;
      const dest = path.join("public", rel);
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        if (sharp) await sharp(file).resize({ width: 700, withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true }).toFile(dest);
        else fs.copyFileSync(file, dest);
        made++;
      }
      c.image = "/" + rel;
    } else missing++;
    p.colours.push({ code: c.code, name: c.name, image: c.image, sizes: c.sizes });
  }
  p.image = p.colours.find((c) => c.image)?.image ?? null;
  delete p._colours;
}

const list = [...products.values()].sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model, "en", { numeric: true }));
fs.writeFileSync("lib/catalogue.generated.json", JSON.stringify(list));
const per = {};
for (const p of list) per[p.brand] = (per[p.brand] || 0) + 1;
console.log("Models per brand:", per);
console.log(`Photos written: ${made}   Colours without a photo: ${missing}`);
if (unknownBrands.size) console.log("Skipped brands:", [...unknownBrands]);
console.log(`Wrote lib/catalogue.generated.json (${list.length} models)`);
