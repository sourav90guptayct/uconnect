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
- [ ] Verify GST added at checkout — confirmed again on 2026-11-10: GST disappears after Kolkata, West Bengal 700001 address entry and is absent on the confirmed test order. Subtotal ₹8,631 plus shipping ₹379 totals ₹9,010; owner must review India tax registration/settings.
- [x] Test real add-to-cart and checkout opening — RUT200 at ₹8,631 reaches Shopify checkout in a new tab.
- [x] Complete test payment — 2026-11-10 verified product → cart drawer → Shopify checkout → Kolkata shipping ₹379 → documented Razorpay Visa test card → demo bank Success → Shopify “Your order is confirmed”, confirmation #V47GA89AH, total ₹9,010. Test payment only; no real card used. Owner should not fulfil this test order; GST remains blocked separately.