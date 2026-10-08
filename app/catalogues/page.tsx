export default function CataloguesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold">Explore Our Eyewear Collections</h1>
      <p className="my-6">Browse frame styles, colours and sizes from our eyewear collections. Availability and pricing are subject to confirmation.</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <a href="/catalogues/otp.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">One True Pair (OTP)</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/nano-glow.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Nano Glow</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/nano-baby.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Nano Baby</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/nano-indestructible.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Nano Indestructible</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/superflex.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Superflex</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/superflex-kids.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Superflex Kids</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="https://www.westgroupe.com/CA/catalog/index?brandName=superflex%20titan" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Superflex Titan</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/stepper.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Stepper</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
        <a href="/catalogues/stepper-sts.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-6 shadow-sm hover:shadow-md"><h2 className="text-xl font-semibold">Stepper STS</h2><p className="mt-3 text-sm">View frame catalogue →</p></a>
      </div>
    </main>
  );
}

