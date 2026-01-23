export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p>This website is a demo project. We care about your data.</p>

      <h2 className="font-semibold">1. Hosting</h2>
      <p>
        Our website is hosted on <strong>Vercel</strong>. When you visit this
        site, Vercel may collect server logs including your IP address for
        security purposes.
      </p>

      <h2 className="font-semibold">2. Local Storage</h2>
      <p>
        We use the browser's Local Storage to save your shopping cart items.
        This data stays on your device and is not sent to our servers.
      </p>

      <h2 className="font-semibold">3. Third Party Services</h2>
      <p>
        If you use the checkout (demo), data may be processed by providers like
        Stripe (in Test Mode). No real payment data is stored or processed.
      </p>
    </main>
  );
}
