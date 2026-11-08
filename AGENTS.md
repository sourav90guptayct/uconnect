# SEO metadata

- Mark route-overridable static and prerendered head tags as Helmet-managed (`data-rh="true"`) so hydration replaces fallback metadata rather than creating conflicting duplicates.

- Keep dedicated ConnectLH model specifications in shared data consumed by the catalogue and model page to avoid conflicting product values.
- Register dedicated product routes explicitly alongside generic product landing routes, with matching prerender metadata and static sitemap entries for discovery.