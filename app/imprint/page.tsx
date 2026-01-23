export default function Imprint() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Legal Notice (Impressum)</h1>
      <p className="mb-4 text-sm text-gray-600">
        Required according to § 5 DDG (German Digital Services Act).
      </p>

      <section className="space-y-2">
        <p>
          <strong>Operator:</strong> Marcus Hartmann
        </p>
        <p>
          <strong>Address:</strong> Liegnitzer Str. 16, 10999 Berlin
        </p>
        <p>
          <strong>Contact:</strong> info@marcus-hartmann.net
        </p>
      </section>

      <section className="mt-8 border-t pt-4 italic text-gray-500">
        <p>
          <strong>Disclaimer:</strong> This website is a non-commercial
          portfolio project for demonstration purposes only. No real
          transactions are processed, and no contracts are concluded.
        </p>
      </section>
    </main>
  );
}
