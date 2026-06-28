This is a large, multi-week scope. Rather than try to do everything in a single turn (which would produce shallow, half-broken changes across 30+ files), I'll execute it in clearly scoped phases. You approve the plan, then I ship phase by phase and you review between.

Key note up front: some items in your brief are **already done** on this site. I'll skip or only polish those rather than rebuild:

- `react-helmet-async` + per-route `<SEO>` component — already shipping unique title/description/canonical/OG on /, /about, /products, /support, etc.
- `robots.txt` + `sitemap.xml` — already present, AI-bot friendly.
- Microsoft Clarity (`xcco76ew5s`) — already integrated and verified.
- Tawk.to live chat — already integrated. (You asked to remove the WhatsApp floating button last turn — confirm if you now want it back per section 8, or keep Tawk.to only.)
- Brand stats — memory locks these to **Founded 2017, 200+ Tier-1 engineers, 10,000+ Links deployed, 30+ projects, 15+ active customers**. Your brief says "50+ clients / 1000+ deployments / 2000+ placements." **I'll keep the memory-locked numbers** unless you explicitly tell me to overwrite them — they came from your deck.
- Contact details — memory locks the site to **email-only** (no phone, no office address). Your brief asks for phone, office address, and a map embed on /contact. **I'll keep email-only** unless you explicitly override.

## Phases

### Phase 1 — SEO completeness (fast, high-impact)
- Add `<SEO>` to every remaining route missing it: /services, /careers, /clients, /networks, /managed-services, /infra-installation, /resource-management, /products (already has, verify).
- Add JSON-LD: sitewide **Organization** in `index.html`, **Product** schema generated per ConnectLH product on /products, **BreadcrumbList** on inner pages, **FAQPage** on home (4–6 real B2B FAQs).
- Regenerate `sitemap.xml` to include every public route.
- Verify all canonicals self-reference (no homepage drift).

### Phase 2 — Per-page OG images
- Generate 6 branded 1200×630 webp OG images (home, services, products, about, careers, contact) using the existing navy/orange theme. Wire each into its page's `<SEO image>`.

### Phase 3 — Design system tightening
The site already has a navy/orange enterprise theme, Space Grotesk + Plus Jakarta Sans, and a global type scale. Gaps to close:
- Audit `src/index.css` tokens; remove any hardcoded `text-white`/`bg-[#…]` in components and replace with semantic tokens.
- Standardize button, card, stat-counter, logo-wall, CTA-band variants so every section uses the same primitives.
- Tighten spacing/section rhythm to a single scale.

### Phase 4 — Performance & a11y pass
- Convert remaining hero/product JPGs to webp where not already; add explicit width/height; `loading="lazy"` on below-the-fold images.
- Preload LCP hero image and primary font; `font-display: swap`.
- A11y sweep: alt text, aria-labels on icon-only buttons, focus-visible, contrast check on accent on navy.
- Run Lighthouse via Playwright and report scores.

### Phase 5 — Conversion polish
- Confirm WhatsApp floating button decision (currently removed). If you want it back, re-add alongside Tawk.to.
- Add a "Get a Quote" primary CTA consistently in header, hero, and footer (already partially there — make it uniform).
- Add `[GA4_ID]` slot in `index.html` ready to fill in.

### Phase 6 — Insights/blog (optional, biggest lift)
- New `/insights` route with list + post template (MDX or Supabase-backed — your call).
- Seed 2–3 placeholder posts on FTTH, RF cables, PoE.
- Only worth doing if you'll actually publish content. Skip if not.

## Explicitly NOT doing
- **SSR/SSG / pre-rendering.** This is a Vite SPA on Lovable hosting. Real SSG would require migrating off Vite SPA to Next.js or adding a prerender service at deploy — that's a platform migration, not a content edit, and it's outside what I can ship inside this project. Googlebot already executes the JS and indexes the per-route `<SEO>` tags correctly; the gap is only for non-JS social scrapers (LinkedIn/Slack/Facebook) on deep links. Mitigation: the sitewide `og:*` in `index.html` already covers them with brand-level previews. If true per-route social previews are critical, that's a separate platform conversation.
- **Renaming or restructuring routes.** Existing /services, /careers, /clients, /networks, etc. stay — they're indexed.
- **Fabricated content.** No invented testimonials, certifications, or client names.

## Questions before I start

1. **Numbers**: keep memory-locked deck stats (200+ engineers, 10,000+ Links, 30+ projects, 15+ customers) or overwrite with brief's (50+ clients, 1000+ deployments, 2000+ placements)?
2. **Contact details**: keep email-only per memory, or override and add phone + office address + map on /contact?
3. **WhatsApp button**: keep removed, or re-add per section 8?
4. **Blog (Phase 6)**: include or skip?
5. **Scope today**: ship Phase 1 (SEO completeness) first and review, or batch Phases 1–4 in one go?