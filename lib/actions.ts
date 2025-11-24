"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

interface GetProductsParams {
  query?: string;
  slug?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export async function getProducts({
  query,
  slug,
  sort,
  page = 1,
  pageSize = 3,
}: GetProductsParams) {
  const where: Prisma.ProductWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (slug) {
    where.category = {
      slug,
    };
  }

  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const skip = pageSize ? (page - 1) * pageSize : undefined;
  const take = pageSize ? pageSize : undefined;

  return await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take,
  });
}

export async function getProductsBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    return null;
  }

  return product;
}
