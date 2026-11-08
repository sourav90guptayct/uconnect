import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { fetchShopProducts, fetchShopProduct, formatMoney, type ShopProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { useCartSync } from '@/hooks/useCartSync';

function ProductPurchase({ product }: { product: ShopProduct }) {
  const [selected, setSelected] = useState(product.variants.nodes[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const { add, busy, error } = useCartStore();
  const variant = product.variants.nodes.find(v => v.id === selected);
  const [added, setAdded] = useState(false);
  return <div className="mt-5 space-y-4">{product.variants.nodes.length > 1 && <select aria-label="Product variant" className="border border-border bg-background text-foreground rounded-md p-3 w-full" value={selected} onChange={e => { setSelected(e.target.value); setAdded(false); }}>{product.variants.nodes.map(v => <option key={v.id} value={v.id}>{v.title}</option>)}</select>}
    {variant && <p className="text-xl font-semibold">{formatMoney(variant.price)}</p>}
    <div className="flex flex-wrap gap-3"><input aria-label="Quantity" type="number" min="1" step="1" className="w-20 border border-border rounded-md px-3 bg-background text-foreground" value={quantity} onChange={e => setQuantity(Math.max(1, Math.floor(Number(e.target.value) || 1)))} /><Button variant="cta" disabled={busy || !variant?.availableForSale} onClick={async () => { if (!variant) return; await add(variant.id, quantity); setAdded(!useCartStore.getState().error); }}>{busy ? 'Adding…' : variant?.availableForSale ? 'Add to cart' : 'Unavailable'}</Button></div>{added && <p role="status" className="text-sm text-muted-foreground">Added to your cart.</p>}{error && <p role="alert" className="text-sm text-destructive">{error}</p>}</div>;
}
export default function Shop() {
  useCartSync();
  const { handle } = useParams();
  const query = useQuery({ queryKey: ['shop', handle], queryFn: async () => handle ? [(await fetchShopProduct(handle)).product].filter((p): p is ShopProduct => Boolean(p)) : (await fetchShopProducts()).products.nodes });
  const products = query.data || [];
  return <div className="min-h-screen bg-background"><SEO title={handle && products[0] ? `${products[0].title} | uConnect shop` : 'Shop networking products | uConnect Technologies'} description="Browse products available to order from uConnect Technologies." path={handle ? `/product/${handle}` : '/shop'} noindex /><Header /><main className="container mx-auto px-4 py-12 lg:py-16"><p className="text-sm uppercase tracking-widest text-accent mb-4">uConnect Technologies</p><h1 className="display-headline text-4xl sm:text-5xl text-foreground">{handle && products[0] ? products[0].title : 'Shop networking products'}</h1><Button asChild variant="outline" className="my-6"><Link to={handle ? '/shop' : '/products'}>{handle ? 'All shop products' : 'Explore the full catalogue'}</Link></Button>
    {query.isLoading ? <p role="status">Loading products…</p> : query.isError ? <div role="alert"><p className="text-destructive">{query.error.message}</p><Button variant="outline" className="mt-4" onClick={() => void query.refetch()}>Try again</Button></div> : !products.length ? <p className="text-muted-foreground">No products found.</p> : <div className={handle ? 'space-y-8' : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'}>{products.map(product => <article key={product.id} className={handle ? 'grid md:grid-cols-2 gap-8' : 'border border-border bg-card rounded-md p-5'}>
      <Link to={`/product/${product.handle}`} className="block aspect-square bg-muted rounded-md p-5">{product.images.nodes[0] && <img src={product.images.nodes[0].url} alt={product.images.nodes[0].altText || product.title} className="w-full h-full object-contain" />}</Link><div>{!handle && <h2 className="text-xl font-semibold mt-5"><Link to={`/product/${product.handle}`}>{product.title}</Link></h2>}<p className="text-muted-foreground mt-4 whitespace-pre-line">{product.description}</p><ProductPurchase product={product} /></div></article>)}</div>}
  </main><Footer /></div>;
}