import Link from "next/link";
import { mainCollections } from "../../lib/collections";
import { catalogue } from "../../lib/catalogue";

export default function CataloguesPage() {
  return (
    <main className="page">
      <div className="pagehead">
        <small>KZ OPTICAL COLLECTIONS</small>
        <h1>Explore our eyewear collections</h1>
        <p>Browse styles from our featured brands and find frames that suit you. Availability is confirmed before your order is fulfilled.</p>
      </div>
      <div className="info">
        {mainCollections.map((c) => {
          const n = catalogue.filter((p) => c.brands.includes(p.brand)).length;
          return (
            <article key={c.slug}>
              <h2>{c.title}</h2>
              <p>{c.blurb}</p>
              <p>{n} models</p>
              <Link className="dark" href={`/collections/${c.slug}`}>Explore collection →</Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
