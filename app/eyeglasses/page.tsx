import Link from "next/link";
import { mainCollections } from "../../lib/collections";
import { catalogue } from "../../lib/catalogue";
import { framePrice } from "../../lib/pricing";
import { money } from "../../lib/store-config";

const photos: Record<string, string> = {
  "superflex": "/westgroupe/13-sf-662-s312-nov-2024-sf-674-s401-sept.jpg",
  "superflex-kids": "/westgroupe/15-sfk-334-s209-sfk-335-s303-june.jpg",
  "superflex-titan": "/westgroupe/11-sf-1188t-m102-may-sf-1187t-m107-mar.jpg",
  "nano": "/westgroupe/05-indestructible-meta-3-0-nao341-04.jpg",
  "one-true-pair": "/westgroupe/09-otp-221-mar-otp-223-mar.jpg",
  "stepper": "/westgroupe/19-stepper-origin-si-20165-f200.jpg",
};

export default function Eyeglasses() {
  return (
    <main className="page">
      <div className="pagehead">
        <small>SHOP EYEGLASSES</small>
        <h1>Complete Prescription Eyeglasses from $99</h1>
        <div className="completePairOffer">
          <strong>COMPLETE PAIR INCLUDED</strong>
          <span>Frame + Single-Vision Lenses ±3.00 + Standard HC Coating</span>
          <small>FREE SHIPPING IN BC &nbsp; • &nbsp; Lens &amp; coating upgrades available &nbsp; • &nbsp; Delivery in 7–10 business days</small>
        </div>
      </div>
      <div className="shopGrid">
        {mainCollections.map((c) => {
          const items = catalogue.filter((p) => c.brands.includes(p.brand));
          const prices = items.map((p) => framePrice(p)).filter((x): x is number => x !== null);
          const from = prices.length ? Math.min(...prices) : null;
          return (
            <article className="shopCard" key={c.slug}>
              <Link href={`/collections/${c.slug}`}>
                <img src={photos[c.slug]} alt={c.title} />
                <div>
                  <small>{items.length} models</small>
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                  <div className="cardPrice">
                    <small>Complete pair from</small>
                    <b>{from === null ? "" : money(from)}</b>
                  </div>
                  <span className="textLink">Explore collection →</span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
