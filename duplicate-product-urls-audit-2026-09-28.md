# Read-Only Audit: Duplicate Product URLs and Wrong-Variant Sitemap Entries

Date of Audit: 2026-09-28  
Audit Scope: Static code analysis of product data definitions, route resolution logic in `app/product/[slug]/page.tsx`, multi-variant configurations in `lib/shopCardProduct.ts`, canonical emission, XML sitemap generation in `app/sitemap.ts`, internal link distribution, and redirect infrastructure.

---

## 1. Verdicts

- **Root Cause (a) — Duplicate Product URLs (`/product/bpc-157` and `/product/bpc-157-10-mg`):**  
  In [`app/product/[slug]/page.tsx:90-105`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L90-L105), `getProductBySlug` implements an unconstrained prefix/contains fallback query (`slug like "${slug}%"`, `slug contains "${slug}"`, `name contains "${searchName}"`) that allows clean/short slugs without dosage suffixes (e.g. `bpc-157`) to resolve the database's dosage-suffixed documents (e.g. `bpc-157-10-mg`), while the page metadata generator ([`app/product/[slug]/page.tsx:124-130`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L124-L130)) dynamically emits whatever raw slug was requested as its own canonical URL, causing both URL variants to resolve 200 OK and self-canonicalize.

- **Root Cause (b) — Wrong-Variant Sitemap Entries (`mots-c-10-mg`, `retatrutide-10-mg`, `tesamorelin-10-mg`, `tirzepatide-10-mg`):**  
  In [`app/product/[slug]/page.tsx:54-79`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L54-L79), whenever any slug matching a multi-variant product name is requested, `getMultiVariantConfig` intercepts the request and runs an unordered database query with broad keyword matching (`slug: { like: "${kw}%" }`, `name: { like: "${kw}%" }`) and `limit: 1`, non-deterministically returning the 30 mg / 20 mg document instead of matching the specific 10 mg variant slug, which then populates the page's SEO title, metadata, Certificate of Analysis (COA), and structured schema with the wrong variant's data.

---

## 2. Evidence

### 2.1 Product Data Inventory & Variant Schema

Products in this codebase are seeded into Payload CMS via [`scripts/seed.ts:163-189`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/scripts/seed.ts#L163-L189) with auto-generated slugs created by the collection hook [`collections/Products.ts:19-30`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/collections/Products.ts#L19-L30). Multi-variant client bundling is configured in [`lib/shopCardProduct.ts:52-135`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/shopCardProduct.ts#L52-L135).

| # | Database Product Name | Database Slug (`product.slug`) | Multi-Variant Config? | Client Card Slug (`toShopCardProduct`) | Available Dosages | Default Dosage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Retatrutide 10 mg | `retatrutide-10-mg` | `retatrutide` | `glp-3rta` | 10mg, 30mg | 10mg |
| 2 | Retatrutide 30 mg | `retatrutide-30-mg` | `retatrutide` | `glp-3rta` | 10mg, 30mg | 10mg |
| 3 | Tirzepatide 10 mg | `tirzepatide-10-mg` | `tirzepatide` | `glp-1trz` | 10mg, 30mg | 10mg |
| 4 | Tirzepatide 30 mg | `tirzepatide-30-mg` | `tirzepatide` | `glp-1trz` | 10mg, 30mg | 10mg |
| 5 | Semaglutide 10 mg | `semaglutide-10-mg` | None | `semaglutide` | 10mg | 10mg |
| 6 | Metabolic X (Reta x Cangri) 10 mg | `metabolic-x-reta-x-cangri-10-mg` | None | `metabolic-x-reta-x-cangri` | 10mg | 10mg |
| 7 | BPC-157 10 mg | `bpc-157-10-mg` | None | `bpc-157` | 10mg | 10mg |
| 8 | TB-500 10 mg | `tb-500-10-mg` | None | `tb-500` | 10mg | 10mg |
| 9 | KPV 10 mg | `kpv-10-mg` | None | `kpv` | 10mg | 10mg |
| 10 | Wolverine 20 mg | `wolverine-20-mg` | None | `wolverine` | 20mg | 20mg |
| 11 | Tesamorelin 10 mg | `tesamorelin-10-mg` | `tesamorelin` | `tesamorelin` | 10mg, 20mg | 10mg |
| 12 | Tesamorelin 20 mg | `tesamorelin-20-mg` | `tesamorelin` | `tesamorelin` | 10mg, 20mg | 10mg |
| 13 | Mots C 10 mg | `mots-c-10-mg` | `mots-c` | `mots-c` | 10mg, 20mg | 10mg |
| 14 | Mots C 20 mg | `mots-c-20-mg` | `mots-c` | `mots-c` | 10mg, 20mg | 10mg |
| 15 | IGF1-LR3 1 mg | `igf1-lr3-1-mg` | None | `igf1-lr3` | 1mg | 1mg |
| 16 | Semax 10 mg | `semax-10-mg` | None | `semax` | 10mg | 10mg |
| 17 | DSIP 10 mg | `dsip-10-mg` | None | `dsip` | 10mg | 10mg |
| 18 | PT-141 10 mg | `pt-141-10-mg` | None | `pt-141` | 10mg | 10mg |
| 19 | Epitalon 10 mg | `epitalon-10-mg` | None | `epitalon` | 10mg | 10mg |
| 20 | NAD+ 500 mg | `nad-500-mg` | None | `nad` | 500mg | 500mg |
| 21 | Thymosin 5 mg | `thymosin-5-mg` | None | `thymosin` | 5mg | 5mg |
| 22 | GHKCU 50 mg | `ghkcu-50-mg` | None | `ghkcu` | 50mg | 50mg |
| 23 | AHKCU 50 mg | `ahkcu-50-mg` | None | `ahkcu` | 50mg | 50mg |
| 24 | GLOW 70 mg | `glow-70-mg` | None | `glow` | 70mg | 70mg |
| 25 | KLOW 80 mg | `klow-80-mg` | None | `klow` | 80mg | 80mg |

---

### 2.2 Route Resolution Mechanism

In [`app/product/[slug]/page.tsx:52-106`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L52-L106):

```typescript
const getProductBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config });
  const mvConfig = getMultiVariantConfig(slug);

  if (mvConfig) {
    const keywordConditions = (mvConfig.dbKeywords || [mvConfig.name, mvConfig.slug]).flatMap(
      (kw) => [
        { slug: { equals: kw } },
        { slug: { like: `${kw}%` } },
        { name: { like: `${kw}%` } },
        { name: { equals: kw } },
      ]
    );

    const result = await payload.find({
      collection: "products",
      where: {
        or: [
          { slug: { equals: slug } },
          { slug: { equals: mvConfig.slug } },
          ...keywordConditions,
        ],
      } as any,
      depth: 2,
      limit: 1,
    });
    if (result.docs?.[0]) return result.docs[0] as unknown as ShopProduct;
  }

  // 1. Exact match by slug
  let result = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });
  if (result.docs?.[0]) return result.docs[0] as unknown as ShopProduct;

  // 2. Prefix or contains match (e.g. clean slug "bpc-157" matches "bpc-157-10-mg")
  const searchName = slug.replace(/-/g, " ");
  result = await payload.find({
    collection: "products",
    where: {
      or: [
        { slug: { like: `${slug}%` } },
        { slug: { contains: slug } },
        { name: { contains: searchName } },
      ],
    } as any,
    depth: 2,
    limit: 1,
  });

  return (result.docs?.[0] ?? null) as unknown as ShopProduct | null;
});
```

#### How Resolution Works:
1. **Fuzzy Fallback Permissiveness:**
   - When requested with `/product/bpc-157`:
     - Step 1 exact match fails (database has `bpc-157-10-mg`).
     - Step 2 matches `slug: { like: "bpc-157%" }` $\rightarrow$ resolves `BPC-157 10 mg` document.
   - When requested with `/product/bpc-157-10-mg`:
     - Step 1 exact match succeeds $\rightarrow$ resolves `BPC-157 10 mg` document.
2. **Partial Name / Typo Resolvability:**
   - Because Step 2 checks `{ slug: { like: `${slug}%` } }` and `{ slug: { contains: slug } }`, URLs like `/product/bpc`, `/product/157`, `/product/tb`, `/product/sem`, `/product/wolver` all resolve 200 OK and return the corresponding product.

---

### 2.3 Canonical Tags per Variant

In [`app/product/[slug]/page.tsx:108-145`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L108-L145):

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | PrimeTime BioLabs" };
  }

  const title = product.seoTitle || `${product.name} | PrimeTime BioLabs`;
  const description =
    product.seoDescription || product.description || "Research peptide for laboratory use.";
  const imageUrl = getProductPrimaryImageUrl(product);
  const url = `${siteUrl}/product/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Prime Time Bio Labs",
      type: "website",
      images: [{ url: imageUrl }],
    },
...
```

#### Emission Table for 3 Product Examples:

| Product | Requested URL Form | HTTP Status | Emitted Canonical (`<link rel="canonical">`) | Self-Canonicalizing? |
| :--- | :--- | :---: | :--- | :---: |
| **BPC-157** | `/product/bpc-157` | 200 | `https://www.primetimebiolabs.com/product/bpc-157` | **YES** |
| **BPC-157** | `/product/bpc-157-10-mg` | 200 | `https://www.primetimebiolabs.com/product/bpc-157-10-mg` | **YES** |
| **Retatrutide** | `/product/glp-3rta` | 200 | `https://www.primetimebiolabs.com/product/glp-3rta` | **YES** |
| **Retatrutide** | `/product/retatrutide` | 200 | `https://www.primetimebiolabs.com/product/retatrutide` | **YES** |
| **Retatrutide** | `/product/retatrutide-10-mg` | 200 | `https://www.primetimebiolabs.com/product/retatrutide-10-mg` | **YES** |
| **Retatrutide** | `/product/retatrutide-30-mg` | 200 | `https://www.primetimebiolabs.com/product/retatrutide-30-mg` | **YES** |
| **Tesamorelin** | `/product/tesamorelin` | 200 | `https://www.primetimebiolabs.com/product/tesamorelin` | **YES** |
| **Tesamorelin** | `/product/tesamorelin-10-mg` | 200 | `https://www.primetimebiolabs.com/product/tesamorelin-10-mg` | **YES** |
| **Tesamorelin** | `/product/tesamorelin-20-mg` | 200 | `https://www.primetimebiolabs.com/product/tesamorelin-20-mg` | **YES** |

**Finding:** Neither URL form points to the other. Both URL forms **self-canonicalize**, which declares to crawlers that both URLs are independent, authoritative pages with duplicate content.

---

### 2.4 Wrong-Variant Trace for the 4 Multi-Variant Sitemap URLs

The 4 reported sitemap entries:
1. `/product/retatrutide-10-mg`
2. `/product/tirzepatide-10-mg`
3. `/product/tesamorelin-10-mg`
4. `/product/mots-c-10-mg`

#### Layer-by-Layer Execution Flow:

1. **Sitemap Generation Layer ([`app/sitemap.ts:36-51`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L36-L51)):**
   - Iterates through all documents in collection `products`.
   - Emits an entry for both the 10 mg document (`retatrutide-10-mg`) and the 30 mg document (`retatrutide-30-mg`).
2. **Multi-Variant Detection Layer ([`lib/shopCardProduct.ts:137-145`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/shopCardProduct.ts#L137-L145)):**
   - When a request hits `/product/retatrutide-10-mg`, `norm = "retatrutide10mg"`.
   - `norm.includes("retatrutide")` evaluates to `true`.
   - Returns `MULTI_VARIANT_PRODUCTS.retatrutide`.
3. **Database Query Layer ([`app/product/[slug]/page.tsx:56-78`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L56-L78)):**
   - `dbKeywords` is `["Retatrutide", "retatrutide"]`.
   - Builds conditions: `{ name: { like: "Retatrutide%" } }`, `{ slug: { like: "retatrutide%" } }`.
   - Runs `payload.find({ where: { or: [...] }, limit: 1 })` **with no `sort` specification**.
   - Both `retatrutide-10-mg` and `retatrutide-30-mg` match the query.
   - Because `retatrutide-30-mg` was created later in the seed script ([`scripts/seed.ts:165`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/scripts/seed.ts#L165)), Payload's default sorting returns the **30 mg document** (`docs[0]`).
4. **Metadata & Rendering Layer ([`app/product/[slug]/page.tsx:121-125`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L121-L125) and [`components/product/ProductClient.tsx:61`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/product/ProductClient.tsx#L61)):**
   - `product` prop is populated with the **30 mg / 20 mg** document.
   - Page `<title>` becomes `"Buy Retatrutide 30 mg | Research Peptides – Prime Time Bio Labs"`.
   - COA file & download link rendered in the UI is for the 30 mg / 20 mg batch (`product.coaFile`).
   - JSON-LD structured data emits SKU `RETA-30MG` and Price `$99.99`.
   - Meanwhile, the URL in the browser remains `/product/retatrutide-10-mg`.

---

### 2.5 Internal Link Census

Census of internal product links across application templates and components:

| Component / Surface | File & Line | Link Construction Pattern | Slug Form Emitted | Count / Frequency |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage Best Sellers** | [`components/shop/ShopProductCard.tsx:33,64`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/shop/ShopProductCard.tsx#L33-L64) | `<Link href={`/product/${product.slug}`}>` | **Short-form** (via `toShopCardProduct`) | 4 products rendered |
| **Shop Page Catalog** | [`components/shop/ShopProductCard.tsx:33,64`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/shop/ShopProductCard.tsx#L33-L64) | `<Link href={`/product/${product.slug}`}>` | **Short-form** (via `toShopCardProduct`) | 21 products rendered |
| **Homepage Hero Banner** | [`components/HomeClient.tsx:136`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/HomeClient.tsx#L136) | `<Link href="/product/glp-3rta">` | **Short-form** (`glp-3rta`) | 1 static link |
| **Site Navigation Menu** | [`components/nav/SiteNav.tsx:295`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/nav/SiteNav.tsx#L295) | `<Link href={`/product/${product.slug}`}>` | **Long-form** (raw DB `product.slug`) | Up to 36 dropdown links |
| **Search Overlay** | [`components/nav/SearchOverlay.tsx:126`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/nav/SearchOverlay.tsx#L126) | `<Link href={`/product/${product.slug}`}>` | **Long-form** (raw DB `product.slug`) | Dynamic search results |
| **Certificates of Analysis Hub** | [`app/certificates/page.tsx:111,122`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/certificates/page.tsx#L111-L122) | `<Link href={`/product/${product.slug}`}>` | **Long-form** (raw DB `product.slug`) | 8 COA product cards |
| **Blog Related Products** | [`app/blog/[slug]/page.tsx:331`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L331) | `<Link href={`/product/${product.slug}`}>` | **Long-form** (raw DB `product.slug`) | Dynamic related items |
| **Wishlist & Account** | [`components/account/WishlistClient.tsx:79,98`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/account/WishlistClient.tsx#L79-L98) | `<Link href={`/product/${item.slug}`}>` | **Mixed** (depends on add source) | Dynamic |

**Tally Summary:**
- Primary discovery surfaces (Homepage & Shop Grid) use **Short-form slugs** (`/product/bpc-157`, `/product/glp-3rta`).
- Secondary navigation (SiteNav, Search, COA Hub, Blog) use **Long-form slugs** (`/product/bpc-157-10-mg`, `/product/retatrutide-10-mg`).
- This internal link split actively feeds search engine crawlers both URL forms simultaneously.

---

### 2.6 Sitemap Output Audit

Inspecting [`app/sitemap.ts:36-54`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L36-L54):

```typescript
const products = await payload.find({
  collection: "products",
  where: { and: [{ status: { equals: "active" } }, { isVisible: { equals: true } }] },
  limit: 1000,
  depth: 0,
});
for (const product of products.docs) {
  if (!product.slug) continue;
  const cleanSlug = String(product.slug).replace(/^\/+/, "");
  entries.push({
    url: `${SITE_URL}/product/${cleanSlug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });
}
```

#### Sitemap Emission Analysis (25 Product URLs):
1. `https://www.primetimebiolabs.com/product/retatrutide-10-mg` $\rightarrow$ **FLAG: Wrong-Variant Mismatch & Duplicate** (renders 30 mg data)
2. `https://www.primetimebiolabs.com/product/retatrutide-30-mg` $\rightarrow$ **FLAG: Duplicate Entity** (same product as 10 mg)
3. `https://www.primetimebiolabs.com/product/tirzepatide-10-mg` $\rightarrow$ **FLAG: Wrong-Variant Mismatch & Duplicate** (renders 30 mg data)
4. `https://www.primetimebiolabs.com/product/tirzepatide-30-mg` $\rightarrow$ **FLAG: Duplicate Entity** (same product as 10 mg)
5. `https://www.primetimebiolabs.com/product/semaglutide-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form** (Shop links point to `/product/semaglutide`)
6. `https://www.primetimebiolabs.com/product/metabolic-x-reta-x-cangri-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form** (Shop links to `/product/metabolic-x-reta-x-cangri`)
7. `https://www.primetimebiolabs.com/product/bpc-157-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form** (Shop links to `/product/bpc-157`)
8. `https://www.primetimebiolabs.com/product/tb-500-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form** (Shop links to `/product/tb-500`)
9. `https://www.primetimebiolabs.com/product/kpv-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
10. `https://www.primetimebiolabs.com/product/wolverine-20-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
11. `https://www.primetimebiolabs.com/product/tesamorelin-10-mg` $\rightarrow$ **FLAG: Wrong-Variant Mismatch & Duplicate** (renders 20 mg data)
12. `https://www.primetimebiolabs.com/product/tesamorelin-20-mg` $\rightarrow$ **FLAG: Duplicate Entity**
13. `https://www.primetimebiolabs.com/product/mots-c-10-mg` $\rightarrow$ **FLAG: Wrong-Variant Mismatch & Duplicate** (renders 20 mg data)
14. `https://www.primetimebiolabs.com/product/mots-c-20-mg` $\rightarrow$ **FLAG: Duplicate Entity**
15. `https://www.primetimebiolabs.com/product/igf1-lr3-1-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
16. `https://www.primetimebiolabs.com/product/semax-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
17. `https://www.primetimebiolabs.com/product/dsip-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
18. `https://www.primetimebiolabs.com/product/pt-141-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
19. `https://www.primetimebiolabs.com/product/epitalon-10-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
20. `https://www.primetimebiolabs.com/product/nad-500-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
21. `https://www.primetimebiolabs.com/product/thymosin-5-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
22. `https://www.primetimebiolabs.com/product/ghkcu-50-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
23. `https://www.primetimebiolabs.com/product/ahkcu-50-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
24. `https://www.primetimebiolabs.com/product/glow-70-mg` $\rightarrow$ **FLAG: Non-Canonical Form**
25. `https://www.primetimebiolabs.com/product/klow-80-mg` $\rightarrow$ **FLAG: Non-Canonical Form**

- **Double-Slash Verification:** **CLEAN (0 double slashes).** All URLs emit single slashes `${SITE_URL}/product/${cleanSlug}` with sanitized `SITE_URL`.

---

### 2.7 Existing Redirect Infrastructure

- **`middleware.ts`:** Does not exist in the codebase.
- **`next.config.mjs`:** Contains security headers only; no `redirects()` or `rewrites()` configured.
- **Redirect Behavior Note:** Next.js `next.config.js` `redirects()` with `permanent: true` emits an **HTTP 308 Permanent Redirect** (which preserves POST method), whereas standard SEO consolidation best practice prefers **HTTP 301 Moved Permanently**. To emit a true 301, Next.js requires either a `middleware.ts` response (`NextResponse.redirect(url, 301)`) or explicit route redirects (`redirect(url)` defaults to 307 temporary, `permanentRedirect(url)` emits 308).

---

## 3. Duplicate-Content Exposure Assessment

1. **Self-Canonicalization Hazard:**
   - Because canonical tags dynamically mirror `params.slug`, visiting `/product/bpc-157` outputs canonical `https://www.primetimebiolabs.com/product/bpc-157`, while visiting `/product/bpc-157-10-mg` outputs canonical `https://www.primetimebiolabs.com/product/bpc-157-10-mg`.
   - **Worst-case scenario:** The site is explicitly instructing Googlebot and other crawlers that both URLs are distinct canonical destinations, preventing automatic canonical consolidation.
2. **Crawl Budget & Index Cannibalization:**
   - 25 product documents in the sitemap vs 21 unique commercial products in the shop.
   - Internal links from the Shop catalog point to short slugs, while the XML sitemap and Nav dropdown point to long slugs.
   - Search engines crawl both sets of URLs, creating index competition between `/product/bpc-157` and `/product/bpc-157-10-mg`, diluting backlink equity and keyword ranking power.
3. **Mismatched Metadata on Multi-Variant Pages:**
   - A user clicking a search result for `mots-c-10-mg` lands on a page with `<title>Buy Mots C 20 mg...</title>`, COA for 20 mg, and price for 20 mg. This produces a bounce-rate penalty and search intent mismatch.

---

## 4. Canonical Recommendation

### Recommendation: **Short-Form Clean Slugs (e.g. `/product/bpc-157`, `/product/retatrutide` or `/product/glp-3rta`) should survive as the Single Canonical Standard.**

#### Grounds:
1. **User Experience & Multi-Variant Architecture:** The product page UI (`ProductClient.tsx`) already renders interactive dosage selector buttons (`10mg`, `20mg`, `30mg`) on a single page. Having separate URLs per dosage variant when the page dynamically toggles variants is anti-pattern.
2. **Shop Catalog Consistency:** The main catalog grid (`/shop`), category filters, and homepage Best Sellers already use `toShopCardProduct`, which generates short clean slugs.
3. **SEO Authority Consolidation:** Brand searches and keyword queries (e.g. "Buy BPC-157 peptide", "Retatrutide research peptide") naturally target the root compound name rather than arbitrary package dosages.

---

## 5. Recommended Fix Plan (Unapplied)

### Step 1: Enforce Strict Route Resolution & Canonical Assignment
In [`app/product/[slug]/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx):
- Map the incoming `slug` to its canonical slug (using `toCleanSlug` or `mvConfig.slug`).
- If the incoming requested `slug` is a legacy/long-form variant (e.g. `bpc-157-10-mg`, `retatrutide-30-mg`), issue a **301 redirect** to the canonical clean slug (e.g. `bpc-157`, `glp-3rta`).
- Ensure `generateMetadata` always generates `alternates: { canonical: `${siteUrl}/product/${canonicalSlug}` }`.

### Step 2: Fix Multi-Variant Document Lookup
In [`app/product/[slug]/page.tsx:54-78`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L54-L78):
- For multi-variant products, sort the database query deterministically by default dosage (e.g. `10 mg` first) or match `mvConfig.defaultDosage` so that the default COA, title, and initial state accurately represent the base product.

### Step 3: Update Sitemap Generator
In [`app/sitemap.ts:36-54`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L36-L54):
- Deduplicate products by canonical slug (e.g. using `toShopCardProducts` logic) so the sitemap emits exactly 21 canonical product URLs with zero variant duplicates.

### Step 4: Align All Internal Navigation Links
Update [`components/nav/SiteHeader.tsx:48`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/nav/SiteHeader.tsx#L48), [`app/certificates/page.tsx:111`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/certificates/page.tsx#L111), and [`app/blog/[slug]/page.tsx:331`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L331) to use `toCleanSlug(product.slug)` or `cardProduct.slug` instead of raw `product.slug`.

### Step 5: Implement 301 Edge Normalization
Introduce [`middleware.ts`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/middleware.ts) to intercept any requests to dosage-suffixed product URLs (`/product/*-10-mg`, `/product/*-20-mg`, etc.) and redirect them with HTTP 301 to the canonical clean URLs.

---

## 6. Open Questions

1. **Google Search Console Indexation State:**  
   Are both `/product/bpc-157` and `/product/bpc-157-10-mg` currently indexed in Google Search Console? (Checking GSC URL Inspection will reveal which variant Googlebot currently prefers).
2. **Multi-Variant Naming Convention Preference:**  
   For the 4 multi-variant peptides, confirm brand preference between compound names vs SKU names:
   - Retatrutide: `/product/retatrutide` vs `/product/glp-3rta`
   - Tirzepatide: `/product/tirzepatide` vs `/product/glp-1trz`
   - Tesamorelin: `/product/tesamorelin`
   - MOTS-c: `/product/mots-c`
