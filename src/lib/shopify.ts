const endpoint = "https://uconnect-05wzz-zgrzgt1q.myshopify.com/api/2026-10/graphql.json";
const storefrontToken = "c7461c029bc5e0f40cd06b37b96c4766";

export interface ShopVariant { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; }
export interface ShopProduct { id: string; handle: string; title: string; description: string; images: { nodes: { url: string; altText: string | null }[] }; variants: { nodes: ShopVariant[] }; }
export interface ShopCart { id: string; checkoutUrl: string; totalQuantity: number; cost: { subtotalAmount: { amount: string; currencyCode: string } }; lines: { nodes: { id: string; quantity: number; merchandise: ShopVariant & { product: { title: string; featuredImage: { url: string } | null } } }[] }; }

export async function storefrontApiRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": storefrontToken }, body: JSON.stringify({ query, variables }) });
  if (!response.ok) throw new Error(response.status === 402 ? "Shopify billing needs attention before shopping is available." : "Shopping is temporarily unavailable. Please try again.");
  const result = await response.json();
  if (result.errors?.length) throw new Error("Shopify could not complete this request. Please try again.");
  return result.data as T;
}
const productFields = `id handle title description images(first: 5) { nodes { url altText } } variants(first: 100) { nodes { id title availableForSale price { amount currencyCode } } }`;
export const fetchShopProducts = () => storefrontApiRequest<{ products: { nodes: ShopProduct[] } }>(`query { products(first: 100) { nodes { ${productFields} } } }`);
export const fetchShopProduct = (handle: string) => storefrontApiRequest<{ product: ShopProduct | null }>(`query($handle: String!) { product(handle: $handle) { ${productFields} } }`, { handle });
const cartFields = `id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } } lines(first: 100) { nodes { id quantity merchandise { ... on ProductVariant { id title availableForSale price { amount currencyCode } product { title featuredImage { url } } } } } }`;
export const fetchShopCart = (id: string) => storefrontApiRequest<{ cart: ShopCart | null }>(`query($id: ID!) { cart(id: $id) { ${cartFields} } }`, { id });
export async function mutateShopCart(operation: "cartCreate" | "cartLinesAdd" | "cartLinesUpdate" | "cartLinesRemove", variables: Record<string, unknown>): Promise<ShopCart> {
  const definitions = { cartCreate: '$input: CartInput!', cartLinesAdd: '$cartId: ID!, $lines: [CartLineInput!]!', cartLinesUpdate: '$cartId: ID!, $lines: [CartLineUpdateInput!]!', cartLinesRemove: '$cartId: ID!, $lineIds: [ID!]!' };
  const args = operation === 'cartCreate' ? 'input: $input' : operation === 'cartLinesRemove' ? 'cartId: $cartId, lineIds: $lineIds' : 'cartId: $cartId, lines: $lines';
  const data = await storefrontApiRequest<Record<string, { cart: ShopCart | null; userErrors: { message: string }[] }>>(`mutation(${definitions[operation]}) { ${operation}(${args}) { cart { ${cartFields} } userErrors { message } } }`, variables);
  const result = data[operation];
  if (result?.userErrors.length) throw new Error(result.userErrors.map(e => e.message).join(' '));
  if (!result?.cart) throw new Error('Cart not found. Please add your items again.');
  return result.cart;
}
export function checkoutUrl(url: string) { const parsed = new URL(url); parsed.searchParams.set('channel', 'online_store'); return parsed.toString(); }
export function formatMoney(price: { amount: string; currencyCode: string }) { return new Intl.NumberFormat('en', { style: 'currency', currency: price.currencyCode }).format(Number(price.amount)); }