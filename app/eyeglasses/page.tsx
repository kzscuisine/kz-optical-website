import Link from "next/link";
import { products } from "../../lib/products";
import { money, getFramePrice } from "../../lib/store-config";

const priority = ["Superflex", "Superflex Kids", "Nano Vista", "One True Pair", "Stepper"];

export default function Eyeglasses() {
  const sorted = [...products].sort(
    (a, b) => priority.indexOf(a.brand) - priority.indexOf(b.brand)
  );

  return (
    <main className="page">
      <div className="pagehead">
        <small>SHOP EYEGLASSES</small>

        <h1>Complete Prescription Eyeglasses from $99</h1>

        <div className="completePairOffer">
          <strong>COMPLETE PAIR INCLUDED</strong>
          <span>
            Frame + Single-Vision Lenses ±3.00 + Standard HC Coating
          </span>
          <small>
            FREE SHIPPING &nbsp; • &nbsp; Lens &amp; coating upgrades available
            &nbsp; • &nbsp; Delivery in 7–10 business days
          </small>
        </div>
      </div>

      <div className="shopGrid">
        {sorted.map((p) => (
          <article className="shopCard" key={p.id}>
            <Link href={"/product/" + p.id}>
              <img src={p.image} alt={p.name} />

              <div>
                <small>{p.brand}</small>
                <h3>{p.name}</h3>
                <p>
                  {p.model} · {p.audience}
                </p>

                <div className="cardPrice">
                  <small>Complete pair from</small>
                  <b>{money(getFramePrice(p))}</b>
                  <small>Frame + prescription lenses included</small>
                </div>

                <span className="textLink">View Details</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}




