import { useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
export function useCartSync() {
  const sync = useCartStore(s => s.sync);
  useEffect(() => { void sync(); const refresh = () => { if (document.visibilityState === 'visible') void sync(); }; document.addEventListener('visibilitychange', refresh); return () => document.removeEventListener('visibilitychange', refresh); }, [sync]);
}