import { notFound } from "next/navigation";
import Link from "next/link";
import { catalogue, PLACEHOLDER_IMAGE } from "../../../lib/catalogue";
import { collections, collectionBySlug } from "../../../lib/collections";
import { framePrice } from "../../../lib/pricing";
import { money } from "../../../lib/store-config";

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
