# Antenna product page

- [x] Add 29CLH4959 page using existing PDF specifications and enquiry links.
- [x] Link catalogue, register route and add metadata/sitemap entry.
- [x] Verify catalogue navigation, PDF, enquiry and desktop/mobile layout.

# Customer acquisition and payments

- [x] Connect user's own Shopify store xzqtz8-pn (created under sourav90.gupta@gmail.com) — connected 2026-11-08; earlier replacement stores disconnected.
- [x] Re-import and verify catalogue prices on the connected store — 74 products recreated at approved InfiniteIOT INR prices; RUT200 verified at ₹8,631 on /product/teltonika-rut200; unavailable until stock is set.
- [x] Display live Shopify prices on matching Teltonika catalogue models and link to on-site purchase pages — exact model matching and unavailable inventory rules tested; desktop/mobile navigation verified.
- [ ] Prepare first ad campaign — waiting on goal, audience, market and language choices.
- [x] Check payment-provider eligibility and existing payment/Cloud setup — external Supabase blocks built-in Stripe/Paddle; no existing payment code found.
- [x] Enable Shopify for antenna/networking orders — store claimed and trial started; external Supabase preserved.
- [x] Verify real Shopify shop API and empty-cart drawer on desktop/phone — no products exist, so add-to-cart and payment completion cannot yet be tested.
- [x] Research InfiniteIOT prices — 75 public model prices in INR found; Shopify currency confirmed INR. Tax treatment, exact regional SKUs and uConnect stock are not verified.
- [x] Import approved Teltonika prices — 74 exact catalogue matches created in Shopify; all INR prices read back and verified, inventory tracked with overselling denied. RUTM31 excluded because it is not in the verified technical catalogue.
- [x] Confirm Shopify inventory updated — on 2026-11-09 the current xzqtz8-pn Storefront API returns 74 products, 50 available for sale; RUT200 at ₹8,631 successfully adds to a real cart. Exact quantities are not exposed by the Storefront API.
- [ ] Verify regional order SKUs and international shipping markets — exact regional SKUs unverified; checkout currently offers India only.
- [ ] Verify GST added at checkout — blocked on 2026-11-09 because current Shopify checkout says “This store isn’t set up to receive orders yet” before showing delivery or tax fields.
- [x] Test real add-to-cart and checkout opening — RUT200 at ₹8,631 reaches Shopify checkout in a new tab.
- [ ] Complete test payment — on 2026-11-09 the current store's Shopify-returned checkout opens in a new tab with channel=online_store but says “This store isn’t set up to receive orders yet”; owner must finish Shopify store/checkout setup before GST and test-payment checks can proceed. No order was placed or card charged.