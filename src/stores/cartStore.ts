import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchShopCart, mutateShopCart, type ShopCart } from '@/lib/shopify';

interface CartState { cart: ShopCart | null; busy: boolean; error: string | null; add: (variantId: string, quantity: number) => Promise<void>; update: (lineId: string, quantity: number) => Promise<void>; remove: (lineId: string) => Promise<void>; sync: () => Promise<void>; }
export const useCartStore = create<CartState>()(persist((set, get) => {
  const execute = async (action: () => Promise<ShopCart>) => {
    if (get().busy) return;
    set({ busy: true, error: null });
    try { set({ cart: await action() }); }
    catch (e) { const message = e instanceof Error ? e.message : 'Unable to update your cart.'; set({ error: message }); if (/cart not found|does not exist/i.test(message)) set({ cart: null }); }
    finally { set({ busy: false }); }
  };
  return {
    cart: null, busy: false, error: null,
    add: (variantId, quantity) => execute(async () => {
      const cart = get().cart;
      const line = cart?.lines.nodes.find(l => l.merchandise.id === variantId);
      if (!cart) return mutateShopCart('cartCreate', { input: { lines: [{ merchandiseId: variantId, quantity }] } });
      if (line) return mutateShopCart('cartLinesUpdate', { cartId: cart.id, lines: [{ id: line.id, quantity: line.quantity + quantity }] });
      return mutateShopCart('cartLinesAdd', { cartId: cart.id, lines: [{ merchandiseId: variantId, quantity }] });
    }),
    update: (lineId, quantity) => { if (quantity <= 0) return get().remove(lineId); return execute(async () => { const cart = get().cart; if (!cart) throw new Error('Cart not found.'); return mutateShopCart('cartLinesUpdate', { cartId: cart.id, lines: [{ id: lineId, quantity }] }); }); },
    remove: (lineId) => execute(async () => { const cart = get().cart; if (!cart) throw new Error('Cart not found.'); return mutateShopCart('cartLinesRemove', { cartId: cart.id, lineIds: [lineId] }); }),
    sync: async () => { const cart = get().cart; if (!cart || get().busy) return; set({ busy: true, error: null }); try { const data = await fetchShopCart(cart.id); set({ cart: data.cart?.totalQuantity ? data.cart : null }); } catch (e) { set({ error: e instanceof Error ? e.message : 'Unable to refresh cart.' }); } finally { set({ busy: false }); } },
  };
}, { name: 'uconnect-shopify-cart', partialize: state => ({ cart: state.cart }) }));