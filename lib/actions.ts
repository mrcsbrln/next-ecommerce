"use server";

import { prisma } from "./prisma";

export async function getProductsBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return null;
  }

  return product;
}
