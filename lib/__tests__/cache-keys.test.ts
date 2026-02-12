import { createProductsCacheKey, createProductsTags } from "../cache-keys";

describe("createProductsCacheKey", () => {
  it("returns base key with no params", () => {
    expect(createProductsCacheKey({})).toBe("products");
  });

  it("includes category slug", () => {
    expect(createProductsCacheKey({ categorySlug: "shoes" })).toBe(
      "products-category-shoes"
    );
  });

  it("includes search term", () => {
    expect(createProductsCacheKey({ search: "red" })).toBe(
      "products-search-red"
    );
  });

  it("includes all params in order", () => {
    const key = createProductsCacheKey({
      categorySlug: "shoes",
      search: "red",
      page: 2,
      limit: 10,
      sort: "price-asc",
    });
    expect(key).toBe(
      "products-category-shoes-search-red-page-2-limit-10-sort-price-asc"
    );
  });
});

describe("createProductsTags", () => {
  it("returns base tag with no params", () => {
    expect(createProductsTags({})).toEqual(["products"]);
  });

  it("includes category and search tags", () => {
    expect(
      createProductsTags({ categorySlug: "shoes", search: "red" })
    ).toEqual(["products", "category-shoes", "search-red"]);
  });
});
