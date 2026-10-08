import Link from "next/link";
import { lensOptions, lensUpgrades } from "../../lib/store-config";

export default function Lenses() {
  return (
    <main className="page narrow">
      <div className="pagehead">
        <small>YOUR GUIDE TO PRESCRIPTION LENSES</small>
        <h1>Understanding Your Lens Options</h1>
        <p>
          Choosing the right lenses is an important part of creating comfortable,
          clear vision. Explore the options below before selecting your frames.
        </p>
        <p>
          KZ Optical offers prescription lenses as part of complete eyewear orders.
          We do not sell lenses separately. Available options and applicable
          prices are displayed when you configure your eyeglasses.
        </p>
      </div>

      <h2 className="sectionTitle">Types of prescription lenses</h2>

      <div className="info">
        {lensOptions.map((option) => (
          <article key={option.id}>
            <h3>{option.name}</h3>
            <p>{option.description}</p>
          </article>
        ))}
      </div>

      <h2 className="sectionTitle">Lens coatings and upgrades</h2>

      <div className="info">
        {lensUpgrades.map((upgrade) => (
          <article key={upgrade.id}>
            <h3>{upgrade.name}</h3>
            <p>
              Available as an optional lens enhancement when selecting
              your prescription eyewear.
            </p>
          </article>
        ))}
      </div>

      <div className="pagehead">
        <h2>Ready to choose your eyewear?</h2>
        <p>
          Browse our frames, select your preferred lens options,
          and review the total price before checkout.
        </p>
        <Link className="dark" href="/eyeglasses">
          Explore Eyeglasses
        </Link>
      </div>
    </main>
  );
}
