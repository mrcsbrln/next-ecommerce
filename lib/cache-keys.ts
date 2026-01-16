export function createProductsCacheKey(params: {
  categorySlug?: string;
  search?: string;
  page?: string;
  limit?: number;
  sort?: string;
}) {
  const { categorySlug, search, page, limit, sort } = params;
  const keyParts = ["products"];

  if (categorySlug) {
    keyParts.push(`category:${categorySlug}`);
  }

  if (search) {
    keyParts.push(`search:${search}`);
  }

  if (page) {
    keyParts.push(`page:${page}`);
  }

  if (limit) {
    keyParts.push(`limit:${limit}`);
  }

  if (sort) {
    keyParts.push(`sort:${sort}`);
  }

  return keyParts.join(":");
}

export function createProductsTagKey(params: {
  categorySlug?: string;
  search?: string;
}) {
  const { categorySlug, search } = params;
  const tags = ["products"];

  if (categorySlug) {
    tags.push(`category:${categorySlug}`);
  }

  if (search) {
    tags.push(`search:${search}`);
  }

  return tags;
}
