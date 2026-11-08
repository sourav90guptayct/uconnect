import type { ShopProduct } from "./shopify";

// Match full model names: regional and PoE variants must not inherit another model's price.
export function findTeltonikaProduct(model: string, products: ShopProduct[]) {
  return products.find(product => product.title.replace(/^Teltonika\s+/i, "").trim().toUpperCase() === model.trim().toUpperCase());
}