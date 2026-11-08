import { test, expect } from "bun:test";
import { findTeltonikaProduct } from "../src/lib/teltonikaShop";
import type { ShopProduct } from "../src/lib/shopify";

const products: ShopProduct[] = [{ id: "rut951", handle: "teltonika-rut951", title: "Teltonika RUT951", description: "", images: { nodes: [] }, variants: { nodes: [{ id: "variant", title: "Default Title", availableForSale: false, price: { amount: "25893.00", currencyCode: "INR" } }] } }];
test("approved RUT951 base price is INR 25893", () => {
  expect(findTeltonikaProduct("RUT951", products)?.variants.nodes[0]?.price).toEqual({ amount: "25893.00", currencyCode: "INR" });
});
test("unconfirmed stock remains unavailable", () => {
  expect(findTeltonikaProduct("RUT951", products)?.variants.nodes[0]?.availableForSale).toBe(false);
});
test("PoE model does not inherit the standard model price", () => {
  expect(findTeltonikaProduct("RUT951 PoE+", products)).toBeUndefined();
});