# READ-ONLY Audit: Missing Canonical/Social Tags & Missing Image Alt Text

**Date:** 2026-09-28  
**Audit Scope:**
1. **Canonical & Social Tags:** `/blog` (index), `/certificates`, and all Policy/Legal pages (`/terms-and-conditions`, `/privacy-policy`, `/shipping-policy`, `/refund-policy`, `/medical-disclaimer`, `/military-discount`, `/about-us`, `/contact-us`, `/affiliates`, `/faq`).
2. **Image Alt Text Inventory:** Product images (cards, detail gallery, related products, cart drawers, search/nav dropdowns) and Blog images (hero, cards, inline content).

---

## 1. Verdict

Out of the 12 scoped pages audited, **7 pages completely lack canonical URL tags** (`/blog`, `/certificates`, `/terms-and-conditions`, `/privacy-policy`, `/shipping-policy`, `/refund-policy`, `/medical-disclaimer`), and **7 pages lack all OpenGraph and Twitter card metadata** (inheriting only the global site title and description with no page-level tags or preview cards). Two additional pages (`/contact-us` and `/faq`) define canonical and OpenGraph tags using hardcoded absolute string literals rather than the centralized `siteUrl` helper, and `/military-discount` omits Twitter cards and OG image tags. In the alt text audit across 21 distinct image rendering sites in product and blog surfaces, **19 rendering sites provide meaningful, data-driven or descriptive alt attributes**, while **2 product-related image sites carry empty `alt=""` attributes without contextual descriptions** (specifically the image thumbnail selector buttons on the product detail page and the order history item thumbnails in the user account dashboard).

---

## 2. Evidence

### Part A — Metadata & Tag Trace per Page

#### Root Layout Defaults (`app/layout.tsx:21-27`)
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PrimeTime BioLabs",
  description: "Peptide solutions for clarity, precision, and efficiency.",
  icons: {
    icon: "/favicon.ico",
  },
};
```
*Inheritance analysis:* When a subpage specifies only `title` and `description`, Next.js falls back to the root layout. Because the root layout does **not** define root `openGraph`, `twitter`, or `alternates.canonical`, any child page without explicit metadata emits **no canonical tag**, **no OpenGraph tags** (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), and **no Twitter card tags** (`twitter:card`, `twitter:title`, `twitter:image`).

---

#### Audit of Scoped Pages

1. **`/blog` (Blog Index)** — [`app/blog/page.tsx:15-19`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/page.tsx#L15-L19)
   - **Canonical:** Missing. No `alternates.canonical` emitted.
   - **OpenGraph:** Missing (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`).
   - **Twitter:** Missing (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
   - **Inheritance:** Emits only local `title` and `description`:
     ```tsx
     export const metadata: Metadata = {
       title: "Articles & Research | PrimeTime BioLabs",
       description:
         "Explore the latest insights, research summaries, and scientific analysis on peptide science.",
     };
     ```

2. **`/certificates` (Certificates of Analysis)** — [`app/certificates/page.tsx:12-15`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/certificates/page.tsx#L12-L15)
   - **Canonical:** Missing. No `alternates.canonical` emitted.
   - **OpenGraph:** Missing.
   - **Twitter:** Missing.
   - **Inheritance:** Emits only local `title` and `description`:
     ```tsx
     export const metadata = {
       title: "Certificates of Analysis (COA) | Primetime BioLabs",
       description: "View and verify third-party analytical testing and purity reports for all Primetime BioLabs research peptides.",
     };
     ```

3. **`/terms-and-conditions`** — [`app/terms-and-conditions/page.tsx:3-6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/terms-and-conditions/page.tsx#L3-L6)
   - **Canonical:** Missing.
   - **OpenGraph:** Missing.
   - **Twitter:** Missing.
   - **Code:**
     ```tsx
     export const metadata = {
       title: "Terms and Conditions | Primetime BioLabs",
       description: "Terms and conditions for purchasing and using Primetime BioLabs research products.",
     };
     ```

4. **`/privacy-policy`** — [`app/privacy-policy/page.tsx:3-6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/privacy-policy/page.tsx#L3-L6)
   - **Canonical:** Missing.
   - **OpenGraph:** Missing.
   - **Twitter:** Missing.
   - **Code:**
     ```tsx
     export const metadata = {
       title: "Privacy Policy | Primetime BioLabs",
       description: "How Primetime BioLabs collects, uses, and protects your personal and transactional information.",
     };
     ```

5. **`/shipping-policy`** — [`app/shipping-policy/page.tsx:3-6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/shipping-policy/page.tsx#L3-L6)
   - **Canonical:** Missing.
   - **OpenGraph:** Missing.
   - **Twitter:** Missing.
   - **Code:**
     ```tsx
     export const metadata = {
       title: "Shipping Policy | Primetime BioLabs",
       description: "Information about our shipping rates, cold-pack handling, domestic delivery timelines, and discreet packaging.",
     };
     ```

6. **`/refund-policy`** — [`app/refund-policy/page.tsx:3-6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/refund-policy/page.tsx#L3-L6)
   - **Canonical:** Missing.
   - **OpenGraph:** Missing.
   - **Twitter:** Missing.
   - **Code:**
     ```tsx
     export const metadata = {
       title: "Refund Policy | Primetime BioLabs",
       description: "Information regarding our replacement and refund procedures for damaged or incorrect research shipments.",
     };
     ```

7. **`/medical-disclaimer`** — [`app/medical-disclaimer/page.tsx:3-6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/medical-disclaimer/page.tsx#L3-L6)
   - **Canonical:** Missing.
   - **OpenGraph:** Missing.
   - **Twitter:** Missing.
   - **Code:**
     ```tsx
     export const metadata = {
       title: "Medical & Research Disclaimer | Primetime BioLabs",
       description: "Important regulatory and laboratory-use disclaimer for all Primetime BioLabs chemical compounds and peptides.",
     };
     ```

8. **`/military-discount`** — [`app/military-discount/page.tsx:11-22`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/military-discount/page.tsx#L11-L22)
   - **Canonical:** Present (`alternates: { canonical: `${siteUrl}/military-discount` }` at line 14). Absolute, single-slashed, built from `siteUrl`.
   - **OpenGraph:** Present (`title`, `description`, `url`, `siteName`, `type: "website"` at lines 16-21). Lacks `images`.
   - **Twitter:** Missing (`twitter:card` not declared).
   - **Code:**
     ```tsx
     export const metadata: Metadata = {
       title: "Military & First Responder Discount | PrimeTime BioLabs",
       description: "PrimeTime BioLabs is proud to offer an exclusive discount to active military, veterans, and first responders.",
       alternates: {
         canonical: `${siteUrl}/military-discount`,
       },
       openGraph: {
         title: "Military & First Responder Discount | PrimeTime BioLabs",
         description: "Exclusive discount program for active military, veterans, and first responders.",
         url: `${siteUrl}/military-discount`,
         siteName: "PrimeTime BioLabs",
         type: "website",
       },
     };
     ```

9. **`/about-us`** — [`app/about-us/page.tsx:12-30`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/about-us/page.tsx#L12-L30)
   - **Canonical:** Present (`${siteUrl}/about-us` at line 15). Absolute, single-slashed, built from `siteUrl`.
   - **OpenGraph:** Present (`title`, `description`, `url`, `siteName`, `images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "PrimeTime BioLabs" }]`, `type: "website"` at lines 17-25).
   - **Twitter:** Present (`card: "summary_large_image"`, `title`, `description`, `images` at lines 26-30).

10. **`/contact-us`** — [`app/contact-us/page.tsx:7-25`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/contact-us/page.tsx#L7-L25)
    - **Canonical:** Present (`https://www.primetimebiolabs.com/contact-us` at line 10), but **hardcoded** rather than referencing `siteUrl`.
    - **OpenGraph:** Present (`title`, `description`, `url`, `siteName`, `type: "website"` at lines 12-24). Lacks `images`.
    - **Twitter:** Missing (`twitter:card` not declared).

11. **`/affiliates`** — [`app/affiliates/page.tsx:36-55`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/affiliates/page.tsx#L36-L55)
    - **Canonical:** Present (`${siteUrl}/affiliates` at line 39). Built from `siteUrl`.
    - **OpenGraph:** Present (`title`, `description`, `url`, `siteName`, `images`, `type: "website"` at lines 41-49).
    - **Twitter:** Present (`card: "summary_large_image"`, `title`, `description`, `images` at lines 50-54).

12. **`/faq`** — [`app/faq/page.tsx:6-40`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/faq/page.tsx#L6-L40)
    - **Canonical:** Present (`https://www.primetimebiolabs.com/faq` at line 9), but **hardcoded** rather than referencing `siteUrl`.
    - **OpenGraph:** Present (`title`, `description`, `url`, `siteName`, `images`, `type: "website"` at lines 11-20).
    - **Twitter:** Present (`card: "summary_large_image"`, `title`, `description`, `images` at lines 21-25).

#### Policy/Legal Page Layout Architecture
- Note: Policy pages use `components/legal/LegalPageLayout.tsx` as a standard React layout component wrapper (e.g. `<LegalPageLayout title="...">...</LegalPageLayout>`), **not** a Next.js App Router route segment `layout.tsx`.
- In Next.js App Router, `metadata` exports are recognized in `layout.tsx` or `page.tsx` server components. Because `LegalPageLayout.tsx` is a client/presentation component, metadata declarations must be defined on each page's `page.tsx` file (or a route-group layout created if grouped).

---

### Gap Table (Part A Summary)

| Page | Canonical Tag | OpenGraph Tags | Twitter Card | Inherits from Root? | Fix Location |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/blog`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/blog/page.tsx` |
| **`/certificates`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/certificates/page.tsx` |
| **`/terms-and-conditions`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/terms-and-conditions/page.tsx` |
| **`/privacy-policy`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/privacy-policy/page.tsx` |
| **`/shipping-policy`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/shipping-policy/page.tsx` |
| **`/refund-policy`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/refund-policy/page.tsx` |
| **`/medical-disclaimer`** | ❌ Missing | ❌ Missing | ❌ Missing | Yes (title/desc only) | `app/medical-disclaimer/page.tsx` |
| **`/military-discount`** | ✅ `${siteUrl}/military-discount` | ⚠️ Missing `og:image` | ❌ Missing | Partial | `app/military-discount/page.tsx` |
| **`/about-us`** | ✅ `${siteUrl}/about-us` | ✅ Full (`title`, `desc`, `image`, `url`) | ✅ `summary_large_image` | No (fully defined) | Complete |
| **`/contact-us`** | ⚠️ Hardcoded URL string | ⚠️ Missing `og:image` | ❌ Missing | Partial | `app/contact-us/page.tsx` |
| **`/affiliates`** | ✅ `${siteUrl}/affiliates` | ✅ Full (`title`, `desc`, `image`, `url`) | ✅ `summary_large_image` | No (fully defined) | Complete |
| **`/faq`** | ⚠️ Hardcoded URL string | ✅ Full (`title`, `desc`, `image`, `url`) | ✅ `summary_large_image` | No (fully defined) | `app/faq/page.tsx` (switch to `siteUrl`) |

---

### Part B — Alt-Text Inventory

#### 1. Product Surfaces

| File & Line | Image Source / Context | Current `alt` Expression | Classification | Fix / Note |
| :--- | :--- | :--- | :--- | :--- |
| [`components/shop/ShopProductCard.tsx:43`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/shop/ShopProductCard.tsx#L43) | Shop catalog grid card | `alt={product.name}` | **Meaningful** | Data-driven (e.g. "BPC-157 10mg") |
| [`components/shop/ProductCard.tsx:119`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/shop/ProductCard.tsx#L119) | Shop product card with dosage selection | `alt={product.name}` | **Meaningful** | Data-driven (product title) |
| [`components/product/ProductClient.tsx:193`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/product/ProductClient.tsx#L193) | Main product hero display | `alt={cardProduct.name}` | **Meaningful** | Data-driven (selected product/variant) |
| [`components/product/ProductClient.tsx:213`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/product/ProductClient.tsx#L213) | Product detail thumbnail selector buttons | `alt=""` | ❌ **Missing/Empty** | Should be `${cardProduct.name} - Thumbnail ${idx + 1}` |
| [`components/cart/CartDrawer.tsx:88`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/cart/CartDrawer.tsx#L88) | Cart drawer line item thumbnail | `alt={line.product.name}` | **Meaningful** | Data-driven (line item title) |
| [`components/nav/SearchOverlay.tsx:135`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/nav/SearchOverlay.tsx#L135) | Search overlay result thumbnail | `alt={product.name}` | **Meaningful** | Data-driven (search product title) |
| [`components/nav/SiteNav.tsx:302`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/nav/SiteNav.tsx#L302) | Header dropdown product preview | `alt={product.name}` | **Meaningful** | Data-driven (nav product title) |
| [`app/certificates/page.tsx:117`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/certificates/page.tsx#L117) | COA certificate product card | `alt={card.name}` | **Meaningful** | Data-driven (tested peptide name) |
| [`app/blog/[slug]/page.tsx:339`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L339) | Blog related product card | `alt={product.name}` | **Meaningful** | Data-driven (product title) |
| [`components/account/WishlistClient.tsx:68`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/account/WishlistClient.tsx#L68) | Account wishlist item thumbnail | `alt={item.name}` | **Meaningful** | Data-driven (wishlist item title) |
| [`app/account/page.tsx:265`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/account/page.tsx#L265) | Account recent order item thumbnail | `alt=""` | ❌ **Missing/Empty** | Should be `alt={item.title \|\| "Purchased product"}` |
| [`app/account/orders/[id]/page.tsx:216`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/account/orders/%5Bid%5D/page.tsx#L216) | Order detail line item thumbnail | `alt={title}` | **Meaningful** | Data-driven (order line item name) |
| [`components/CategoriesSection.tsx:99`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/CategoriesSection.tsx#L99) | Home product category cards | `alt={category.name}` | **Meaningful** | Data-driven (category name) |
| [`components/HomeClient.tsx:144`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/HomeClient.tsx#L144) | Homepage hero featured product | `alt="Retatrutide GLP-3RTA 10mg"` | **Meaningful** | Hardcoded specific product description |

#### 2. Blog Surfaces

| File & Line | Image Source / Context | Current `alt` Expression | Classification | Fix / Note |
| :--- | :--- | :--- | :--- | :--- |
| [`app/blog/page.tsx:49`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/page.tsx#L49) | Blog index hero banner | `alt="Primetime Biolabs research and peptide synthesis"` | **Meaningful** | Descriptive hardcoded string |
| [`app/blog/page.tsx:97`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/page.tsx#L97) | Blog index featured article card | `alt={featuredPost.title}` | **Meaningful** | Data-driven article title |
| [`app/blog/page.tsx:139`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/page.tsx#L139) | Blog index standard article cards | `alt={post.title}` | **Meaningful** | Data-driven article title |
| [`components/BlogSection.tsx:77`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/BlogSection.tsx#L77) | Homepage blog section preview cards | `alt={post.title}` | **Meaningful** | Data-driven article title |
| [`app/blog/[slug]/page.tsx:183`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L183) | Blog post hero cover image | `alt={post.title}` | **Meaningful** | Data-driven article title |
| [`app/blog/[slug]/page.tsx:265`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L265) | In-content dynamic article illustrations | `alt={`${post.title} - Illustration ${i + 1}`}` | **Meaningful** | Data-driven contextual description |

#### 3. Decorative / Structural Brand Images (Informational Reference)

| File & Line | Context | Current `alt` | Classification |
| :--- | :--- | :--- | :--- |
| [`components/Footer.tsx:105`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/Footer.tsx#L105) | Footer brand logo | `alt="Primetime Biolabs"` | Brand / Informational |
| [`components/auth/AuthShell.tsx:29,37,59`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/auth/AuthShell.tsx#L29) | Auth header logo & hero illustration | `alt="Primetime BioLabs"` / `alt="Laboratory research vials"` | Brand / Descriptive |
| [`components/calculator/CalculatorHero.tsx:37`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/calculator/CalculatorHero.tsx#L37) | Calculator hero background illustration | `alt="Primetime Biolabs precision peptide handling"` | Decorative / Contextual |

---

### Inventory Counts by Classification

- **Meaningful Alt Text:** 19 sites (90.5%)
- **Missing / Empty Alt Text (`alt=""` on content/interactive items):** 2 sites (9.5%)
  1. [`components/product/ProductClient.tsx:213`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/components/product/ProductClient.tsx#L213)
  2. [`app/account/page.tsx:265`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/account/page.tsx#L265)
- **Placeholder Alt Text (e.g. generic "image", "photo"):** 0 sites (0%)

---

## 3. Impact Assessment

### 1. Missing Canonical Tags
- **Search Engine Indexing & URL Consolidation:** Without an explicit canonical link header or meta tag on `/blog`, `/certificates`, and legal pages, search crawlers (Google, Bing) rely solely on internal linking heuristics. When query parameters (e.g., UTM tracking, pagination, session tokens, or trailing slash variations) are encountered, search engines may index duplicate variations or split link equity, causing weaker rank consolidation.
- **Protocol & Subdomain Signals:** Absence of canonical tags prevents crawlers from receiving strong authoritative signals regarding the preferred protocol (`https://`) and host (`www.primetimebiolabs.com`).

### 2. Missing OpenGraph & Twitter Cards
- **Social Sharing & Link Unfurls:** When links to `/blog`, `/certificates`, or legal/policy pages are shared across social platforms (Twitter/X, LinkedIn, Facebook, Slack, iMessage, Discord), scrapers fall back to unstructured page parsing. 
- **Preview Degradation:** Without explicit `og:image`, `og:title`, and `twitter:card`, link unfurls display missing thumbnails, broken preview cards, or generic unformatted text, reducing click-through rates and perceived brand credibility.

### 3. Missing Alt Text on Thumbnails
- **Accessibility (WCAG 2.1 Level A):** Screen reader users navigating the product gallery thumbnail buttons encounter empty accessible names for interactive elements (`<button><img alt="" /></button>`), making it difficult to understand which variant or thumbnail angle is being selected.
- **Image Search Discovery:** Search engines use thumbnail alt text as contextual signals for image search indexing; missing alt text misses ranking opportunities for secondary product images.

---

## 4. Recommended Fix Plan (Unapplied)

### Step 1: Standardize Tag Infrastructure across All Scoped Pages

Import `siteUrl` from `@/lib/siteUrl` in each page and emit structured `canonical`, `openGraph`, and `twitter` metadata.

1. **`app/blog/page.tsx`:**
   ```tsx
   import { siteUrl } from "@/lib/siteUrl";

   export const metadata: Metadata = {
     title: "Articles & Research | PrimeTime BioLabs",
     description: "Explore the latest insights, research summaries, and scientific analysis on peptide science.",
     alternates: {
       canonical: `${siteUrl}/blog`,
     },
     openGraph: {
       title: "Articles & Research | PrimeTime BioLabs",
       description: "Explore the latest insights, research summaries, and scientific analysis on peptide science.",
       url: `${siteUrl}/blog`,
       siteName: "PrimeTime BioLabs",
       images: [
         {
           url: "/og-image.jpg", // or dedicated blog banner
           width: 1200,
           height: 630,
           alt: "PrimeTime BioLabs Research & Articles",
         },
       ],
       type: "website",
     },
     twitter: {
       card: "summary_large_image",
       title: "Articles & Research | PrimeTime BioLabs",
       description: "Explore the latest insights, research summaries, and scientific analysis on peptide science.",
       images: ["/og-image.jpg"],
     },
   };
   ```

2. **`app/certificates/page.tsx`:**
   Add `alternates: { canonical: `${siteUrl}/certificates` }`, `openGraph`, and `twitter: { card: "summary_large_image", ... }` referencing `siteUrl`.

3. **Policy & Legal Pages (`app/terms-and-conditions/page.tsx`, `app/privacy-policy/page.tsx`, `app/shipping-policy/page.tsx`, `app/refund-policy/page.tsx`, `app/medical-disclaimer/page.tsx`):**
   Add matching `alternates: { canonical: `${siteUrl}/<slug>` }`, `openGraph`, and `twitter` metadata blocks in each individual `page.tsx` file.

4. **Clean up hardcoded strings:**
   In [`app/contact-us/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/contact-us/page.tsx#L7) and [`app/faq/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/faq/page.tsx#L6), replace hardcoded string URLs (`"https://www.primetimebiolabs.com/..."`) with `${siteUrl}/contact-us` and `${siteUrl}/faq`. Add missing `twitter` and `og:image` blocks to `contact-us` and `military-discount`.

5. **`app/blog/[slug]/page.tsx`:**
   In [`app/blog/[slug]/page.tsx:40`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L40), replace local inline `const SITE_URL = ...` with imported `siteUrl` from `@/lib/siteUrl` to eliminate duplicate definitions.

---

### Step 2: Fix Alt Text Gaps

1. **`components/product/ProductClient.tsx:213`:**
   Update thumbnail selector button `<img>` tag:
   ```tsx
   - <img src={imgSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
   + <img src={imgSrc} alt={`${cardProduct.name} - View ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
   ```

2. **`app/account/page.tsx:265`:**
   Update order history thumbnail:
   ```tsx
   - <img src={imageUrl} alt="" className="w-full h-full object-cover" />
   + <img src={imageUrl} alt={item.title || "Ordered item thumbnail"} className="w-full h-full object-cover" />
   ```

---

### Step 3: Verification Checkpoints (Post-Fix)

- Inspect `<head>` tags on rendered routes (`/blog`, `/certificates`, `/terms-and-conditions`, `/privacy-policy`, etc.) to confirm `<link rel="canonical" href="https://www.primetimebiolabs.com/...">` is emitted with exactly one slash.
- Validate `og:url`, `og:image`, `twitter:card`, and `twitter:title` tags using social validation tools (e.g. Twitter Card Validator, Facebook Sharing Debugger).
- Run an automated DOM query or accessibility audit checking that no `<img>` inside interactive product buttons has an empty or absent `alt` property.

---

## 5. Open Questions

1. **CMS Rich Text Images:** Dynamic blog body content managed through Lexical / Payload CMS JSON fields may contain embedded images added by editors. When rendered dynamically in the blog viewer, does the CMS serializer enforce `alt` text validation at authoring time?
2. **Dedicated Social Preview Assets:** Should policy pages share the global `/og-image.jpg` asset, or should dedicated 1200x630 branded banners be generated for key utility pages (e.g. `/certificates` and `/blog`)?
