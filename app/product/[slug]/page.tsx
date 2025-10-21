import { getProductsBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductsBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p>{product.description}</p>
      <p>{formatPrice(product.price)}</p>
    </div>
  );
}
