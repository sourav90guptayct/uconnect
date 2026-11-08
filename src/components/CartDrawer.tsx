import { useEffect, useState } from 'react';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { checkoutUrl, formatMoney } from '@/lib/shopify';
export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cart, busy, error, update, remove, sync } = useCartStore();
  useEffect(() => { if (open) void sync(); }, [open, sync]);
  return <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="outline" size="icon" aria-label={`Shopping cart, ${cart?.totalQuantity || 0} items`} title="Shopping cart" className="relative"><ShoppingCart className="h-4 w-4" />{Boolean(cart?.totalQuantity) && <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full text-xs min-w-5 h-5 flex items-center justify-center">{cart?.totalQuantity}</span>}</Button></SheetTrigger>
    <SheetContent className="flex flex-col w-full sm:max-w-lg"><SheetHeader><SheetTitle>Shopping cart</SheetTitle><SheetDescription>{cart?.totalQuantity || 0} items</SheetDescription></SheetHeader>
      {error && <p role="alert" className="text-destructive text-sm mt-4">{error}</p>}
      <div className="flex-1 overflow-y-auto mt-6">{cart?.totalQuantity ? cart.lines.nodes.map(line => <div key={line.id} className="border-b border-border py-5 flex gap-4">
        {line.merchandise.product.featuredImage && <img src={line.merchandise.product.featuredImage.url} alt="" className="w-16 h-16 object-contain bg-muted rounded-md" />}
        <div className="min-w-0 flex-1"><h3 className="font-semibold break-words">{line.merchandise.product.title}</h3><p className="text-sm text-muted-foreground">{line.merchandise.title !== 'Default Title' ? line.merchandise.title : ''}</p><p className="my-2">{formatMoney(line.merchandise.price)}</p><div className="flex items-center gap-3"><Button variant="outline" size="icon" disabled={busy} aria-label="Decrease quantity" onClick={() => void update(line.id, line.quantity - 1)}><Minus className="h-4 w-4" /></Button><span>{line.quantity}</span><Button variant="outline" size="icon" disabled={busy} aria-label="Increase quantity" onClick={() => void update(line.id, line.quantity + 1)}><Plus className="h-4 w-4" /></Button><Button variant="ghost" size="icon" disabled={busy} aria-label={`Remove ${line.merchandise.product.title}`} onClick={() => void remove(line.id)}><Trash2 className="h-4 w-4" /></Button></div></div></div>) : <p className="text-muted-foreground">Your cart is empty.</p>}</div>
      {Boolean(cart?.totalQuantity) && <div className="border-t border-border pt-5 space-y-4"><div className="flex justify-between"><span>Subtotal</span><strong>{cart && formatMoney(cart.cost.subtotalAmount)}</strong></div><p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p><Button variant="cta" className="w-full" disabled={busy || !cart?.checkoutUrl} onClick={() => { if (cart?.checkoutUrl) window.open(checkoutUrl(cart.checkoutUrl), '_blank', 'noopener,noreferrer'); }}>Checkout with Shopify</Button></div>}
    </SheetContent></Sheet>;
}