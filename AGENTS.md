# SEO metadata

- Mark route-overridable static and prerendered head tags as Helmet-managed (`data-rh="true"`) so hydration replaces fallback metadata rather than creating conflicting duplicates.

- Keep dedicated ConnectLH model specifications in shared data consumed by the catalogue and model page to avoid conflicting product values.
- Register dedicated product routes explicitly alongside generic product landing routes, with matching prerender metadata and static sitemap entries for discovery.

- Shopify is the source of purchasable product prices and stock; retain the technical catalogue separately and never invent sellable products or prices.
- Use Storefront API 2026-10 cart mutations and persist server-returned carts in Zustand; checkout uses only Shopify-returned URLs with channel=online_store in a new tab.
- Keep empty shop and dynamic purchase pages noindexed until sellable inventory and public content are ready.