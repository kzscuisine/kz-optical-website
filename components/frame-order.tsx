"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-context";
import { lensTypes } from "../lib/lens-config";
import { framePrice } from "../lib/pricing";
import { PLACEHOLDER_IMAGE, type Product } from "../lib/catalogue";
import { money } from "../lib/store-config";

export default function FrameOrder({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const [colourIdx, setColourIdx] = useState(0);
  const [sizeLabel, setSizeLabel] = useState("");
  const [lensId, setLensId] = useState(lensTypes[0].id);
  const [coatingId, setCoatingId] = useState(lensTypes[0].coatings[0].id);
  const [rx, setRx] = useState("upload-later");

  const colour = product.colours[colourIdx];
  const size = colour.sizes.find((s) => s.label === sizeLabel) ?? colour.sizes[0];
  const lens = lensTypes.find((l) => l.id === lensId)!;
  const coating = lens.coatings.find((c) => c.id === coatingId) ?? lens.coatings[0];
  const base = framePrice(product);
  const total = base === null ? null : base + lens.price + coating.price;
  const image = colour.image || product.image || PLACEHOLDER_IMAGE;

  function chooseLens(id: string) {
    setLensId(id);
    setCoatingId(lensTypes.find((l) => l.id === id)!.coatings[0].id);
  }

  function addItem() {
    if (total === null) return;
    add({
      key: crypto.randomUUID(),
      productId: product.id,
      sku: size.sku,
      name: `${product.name} — ${colour.name}`,
      brand: product.brand,
      model: `${product.model} / ${colour.name} / ${size.label}`,
      image,
      lens: lens.name,
      upgrade: coating.name,
      prescriptionMethod: rx,
      qty: 1,
      unitPrice: total,
    });
    router.push("/cart");
  }

  return (
    <div className="productDetail">
      <div>
        <img className="detailImage" src={image} alt={`${product.name} ${colour.name}`}
          style={{ width: "100%", maxWidth: 750, objectFit: "contain", background: "#fff" }} />
        <p className="fine">Photograph shows the selected colour. Colours and sizes are subject to stock confirmation.</p>
      </div>
      <div>
        <small>{product.brand}</small>
        <h1>{product.name}</h1>
        <p className="model">{product.model} · {product.audience}</p>

        <div className="orderPanel">
          <label>Frame colour
            <select value={colourIdx} onChange={(e) => { setColourIdx(Number(e.target.value)); setSizeLabel(""); }}>
              {product.colours.map((c, i) => <option key={c.code + c.name} value={i}>{c.name}</option>)}
            </select>
          </label>
          <label>Frame size (lens – bridge – temple, mm)
            <select value={size.label} onChange={(e) => setSizeLabel(e.target.value)}>
              {colour.sizes.map((s) => <option key={s.sku} value={s.label}>{s.label}</option>)}
            </select>
          </label>
          <label>Lens type
            <select value={lensId} onChange={(e) => chooseLens(e.target.value)}>
              {lensTypes.map((l) => <option key={l.id} value={l.id}>{l.name}{l.price ? ` — +${money(l.price)}` : " — Included"}</option>)}
            </select>
          </label>
          <p className="fine">{lens.description}</p>
          <label>Lens coating
            <select value={coating.id} onChange={(e) => setCoatingId(e.target.value)}>
              {lens.coatings.map((c) => <option key={c.id} value={c.id}>{c.name}{c.price ? ` — +${money(c.price)}` : ""}</option>)}
            </select>
          </label>
          <fieldset><legend>Prescription</legend>
            <label className="radio"><input type="radio" checked={rx === "upload-later"} onChange={() => setRx("upload-later")} /> Provide/upload prescription after ordering</label>
            <label className="radio"><input type="radio" checked={rx === "enter"} onChange={() => setRx("enter")} /> Enter prescription details during checkout</label>
          </fieldset>
          <div className="priceBox"><span>Complete pair</span><b>{total === null ? "Unavailable" : money(total)}</b></div>
          <button className="dark button" onClick={addItem} disabled={total === null}>Add to Cart</button>
          <p className="fine">Free shipping within British Columbia. Prices in CAD. Availability is confirmed before your order is fulfilled.</p>
        </div>
      </div>
    </div>
  );
}
