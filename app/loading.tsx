import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p>Showing 5 products</p>
      <ProductsSkeleton />
    </main>
  );
}
