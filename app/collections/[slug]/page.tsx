import { notFound } from "next/navigation";
import Link from "next/link";
import { catalogue, PLACEHOLDER_IMAGE } from "../../../lib/catalogue";
import { collections, collectionBySlug } from "../../../lib/collections";
import { framePrice } from "../../../lib/pricing";
import { money } from "../../../lib/store-config";

const brandPhotos: Record<string, string[]> = {
  "Nano Glow": [
    "/westgroupe/02-glow-fanboy-nao317-20-fangame-nao303-19-pixel-nao307-16.jpg",
    "/westgroupe/03-glow-sprite-nao306-07-camper-nao304-23.jpg",
  ],
  "Nano Indestructible": [
    "/westgroupe/04-indestructible-loading-3-0-nao327-01-02.jpg",
    "/westgroupe/05-indestructible-meta-3-0-nao341-04.jpg",
  ],
  "Nano Baby": [
    "/westgroupe/01-bunny-3-0-nao400-05.jpg",
    "/westgroupe/06-little-chick-3-0-nao405-01.jpg",
  ],
};

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) return notFound();
  const sections = collection.brands.map((brand) => ({ brand, items: catalogue.filter((p) => p.brand === brand) }));
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <main className="page">
      <Link className="back" href="/eyeglasses">← All eyeglasses</Link>
      <div className="pagehead">
        <small>KZ OPTICAL · FRAME COLLECTION</small>
        <h1>{collection.title}</h1>
        <p>{collection.blurb} Explore {total} models. Select a frame to choose colour, size and prescription lenses.</p>
      </div>
      {sections.map(({ brand, items }) => (
        <section key={brand}>
          {collection.brands.length > 1 && <h2 className="sectionTitle">{brand}</h2>}
          {brandPhotos[brand] && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, margin: "0 0 28px" }}>
              {brandPhotos[brand].map((src) => (
                <img key={src} src={src} alt={brand + " eyewear"} style={{ width: "100%", height: 340, objectFit: "cover" }} />
              ))}
            </div>
          )}
          <div className="shopGrid">
            {items.map((p) => {
              const price = framePrice(p);
              return (
                <article className="shopCard" key={p.id}>
                  <Link href={"/product/" + p.id}>
                    <img src={p.image || PLACEHOLDER_IMAGE} alt={p.name} loading="lazy"
                      style={{ objectFit: "contain", height: 240, padding: 12, background: "#fff" }} />
                    <div>
                      <small>{p.brand}</small>
                      <h3>{p.model}</h3>
                      <p>{p.colours.length} colour{p.colours.length === 1 ? "" : "s"}</p>
                      <div className="cardPrice">
                        <small>Complete pair from</small>
                        <b>{price === null ? "" : money(price)}</b>
                      </div>
                      <span className="textLink">View frame →</span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}
      <p className="fine" style={{ marginTop: 30 }}>Colours and sizes are catalogue listings, not confirmation of current stock.</p>
    </main>
  );
}
