import { notFound } from "next/navigation";
import Link from "next/link";
import { catalogue, findProduct } from "../../../lib/catalogue";
import { collectionForBrand } from "../../../lib/collections";
import FrameOrder from "../../../components/frame-order";

export function generateStaticParams() {
  return catalogue.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return notFound();
  const collection = collectionForBrand(product.brand);
  return (
    <main className="page">
      <Link className="back" href={`/collections/${collection.slug}`}>← Back to {collection.title}</Link>
      <FrameOrder product={product} />
    </main>
  );
}
