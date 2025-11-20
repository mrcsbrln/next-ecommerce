import Breadcrumbs from "@/components/breadcrumbs";
import ProductCard from "@/app/ProductCard";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { Suspense } from "react";
import ProductsSkeleton from "@/app/ProductsSkeleton";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySideBar } from "@/components/category-sidebar";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

async function Products({ slug, sort }: { slug: string; sort?: string }) {
  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    ...(orderBy ? { orderBy } : {}),
    take: 18,
  });

  await sleep(1000); //Simulate a delay for loading

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No products found</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: category.name,
      href: `/search/${category.slug}`,
    },
  ];

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex gap-3 text-sm mb-8">
        <Link href={`/search/${slug}`}>Latest</Link>
        <Link href={`/search/${slug}?sort=price-asc`}>Price: Low to High</Link>
        <Link href={`/search/${slug}?sort=price-desc`}>Price: High to Low</Link>
      </div>

      <div className="flex gap-4">
        <Suspense fallback={<div className="w-[125px]">Loading...</div>}>
          <CategorySideBar />
        </Suspense>
        <div className="flex-1">
          <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
            <Products slug={slug} sort={sort} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
