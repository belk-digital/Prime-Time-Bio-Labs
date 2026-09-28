# Read-Only Audit: Double-Slash URLs in Canonicals, Schema, OpenGraph, and Sitemap

Date of Audit: 2026-09-28  
Audit Scope: Static code analysis of base URL handling, canonical link tags, structured data (JSON-LD), OpenGraph tags, XML sitemap generation, and URL normalization across the codebase.

---

## 1. Verdict

**Root Cause:** The double-slash defect is caused by un-sanitized, duplicated local `SITE_URL` constant definitions across individual page and layout files (e.g. [`app/product/[slug]/page.tsx:13`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L13)) which read `process.env.NEXT_PUBLIC_SITE_URL` without stripping any trailing slash before interpolating it with leading-slash path strings (e.g. `${SITE_URL}/product/${slug}` at [`app/product/[slug]/page.tsx:125`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L125) and `${SITE_URL}/#organization` at [`app/page.tsx:55`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L55)).

---

## 2. Evidence

### 2.1 Base URL Configuration
Environment variables and helper definitions across the repository:

1. **Local Environment (`.env.local` / `.env`):**
   - [`.env.local`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/.env.local):
     ```env
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ```
   - In production environments (Vercel / hosting environment variables), `NEXT_PUBLIC_SITE_URL` is set with a trailing slash: `https://www.primetimebiolabs.com/`.

2. **Central Helper ([`lib/getBaseUrl.ts:5`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/getBaseUrl.ts#L5)):**
   ```typescript
   export async function getBaseUrl(): Promise<string> {
     if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
     try {
       const headersList = await headers();
       const host = headersList.get("host");
       const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
       if (host) return `${protocol}://${host}`.replace(/\/+$/, "");
     } catch {
       // headers() unavailable (e.g. outside a request context)
     }
     return "https://www.primetimebiolabs.com";
   }
   ```
   *Note: While `getBaseUrl` strips trailing slashes via `.replace(/\/+$/, "")`, it is an async server function used only in select dynamic server routes/actions, and NOT imported into static or metadata configurations.*

3. **Scattered In-File Constants (Lacking Trailing-Slash Stripping):**
   - [`app/page.tsx:12`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L12):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     ```
   - [`app/product/[slug]/page.tsx:13`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L13):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     ```
   - [`app/shop/page.tsx:10`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/shop/page.tsx#L10):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     ```
   - [`app/about-us/page.tsx:7`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/about-us/page.tsx#L7):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     ```
   - [`app/affiliates/page.tsx:30-31`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/affiliates/page.tsx#L30-L31):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     const PAGE_URL = `${SITE_URL}/affiliates`;
     ```
   - [`app/military-discount/page.tsx:6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/military-discount/page.tsx#L6):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     ```
   - [`app/peptide-calculator/layout.tsx:3,7`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/peptide-calculator/layout.tsx#L3-L7):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     const PAGE_URL = `${SITE_URL}/peptide-calculator`;
     ```
   - [`lib/email/layout.ts:3`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/email/layout.ts#L3):
     ```typescript
     const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
     ```

4. **Patched In-File Constants (Containing Trailing-Slash Stripping):**
   - [`app/sitemap.ts:5`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L5):
     ```typescript
     const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com").replace(/\/+$/, "");
     ```
   - [`app/robots.ts:3`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/robots.ts#L3):
     ```typescript
     const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com").replace(/\/+$/, "");
     ```
   - [`app/blog/[slug]/page.tsx:39`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L39):
     ```typescript
     const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com").replace(/\/+$/, "");
     ```

---

### 2.2 Canonical Generation (3 Page Types Traced)

#### Page Type 1: Homepage ([`app/page.tsx:21-24`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L21-L24))
```typescript
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
```
- **Expression:** `SITE_URL`
- **Result:** Emits `https://www.primetimebiolabs.com/` (Clean if trailing slash is intended on root; does not produce double slashes on root itself, but produces double slashes for root-linked assets like `${SITE_URL}/cta-banner.png` -> `https://www.primetimebiolabs.com//cta-banner.png`).

#### Page Type 2: Product Page ([`app/product/[slug]/page.tsx:125-130`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L125-L130))
```typescript
  const url = `${SITE_URL}/product/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
```
- **Expression:** `${SITE_URL}/product/${slug}` where `SITE_URL` = `https://www.primetimebiolabs.com/`
- **Result:** Emits `https://www.primetimebiolabs.com//product/bpc-157-10-mg` (Double slash defect present).

#### Page Type 3: Policy / Legal Pages & Other Static Pages
- **About Us Page ([`app/about-us/page.tsx:15`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/about-us/page.tsx#L15)):**
  ```typescript
  alternates: { canonical: `${SITE_URL}/about-us` },
  ```
  - **Expression:** `${SITE_URL}/about-us`
  - **Result:** Emits `https://www.primetimebiolabs.com//about-us` (Double slash defect present).
- **Terms and Conditions ([`app/terms-and-conditions/page.tsx:3-6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/terms-and-conditions/page.tsx#L3-L6)):**
  ```typescript
  export const metadata = {
    title: "Terms & Conditions | Primetime Biolabs",
    description: "The terms and conditions governing your use of the Primetime Biolabs website and purchase of our research products.",
  };
  ```
  - **Expression:** Omitted (no explicit canonical tag defined).
- **FAQ Page ([`app/faq/page.tsx:10-12`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/faq/page.tsx#L10-L12)):**
  ```typescript
  alternates: {
    canonical: "https://www.primetimebiolabs.com/faq",
  },
  ```
  - **Expression:** Hardcoded string literal (Clean).

---

### 2.3 Organization Schema Generation

Found in [`app/page.tsx:52-65`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L52-L65):
```typescript
function buildJsonLdGraph(products: ShopMockProduct[]) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "PrimeTime BioLabs",
    alternateName: "Primetime Biolabs",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/primtime-biolabs-logo.svg`,
    },
    description:
      "Supplier of research-grade peptides tested by independent HPLC and mass spectrometry analysis to a minimum of 99% purity, with a Certificate of Analysis on every batch. For laboratory research use only.",
    email: "support@primetimebiolabs.com",
```
- **Expression for `@id`:** `${SITE_URL}/#organization`
- **Result:** When `SITE_URL` is `https://www.primetimebiolabs.com/`, the `@id` evaluates to `https://www.primetimebiolabs.com//#organization`.
- **Expression for `logo.url`:** `${SITE_URL}/primtime-biolabs-logo.svg`
- **Result:** Evaluates to `https://www.primetimebiolabs.com//primtime-biolabs-logo.svg`.

In addition, Product Offer schema in [`app/product/[slug]/page.tsx:25-32`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L25-L32):
```typescript
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "USD",
```
- **Expression:** `${SITE_URL}/product/${product.slug}`
- **Result:** Emits `https://www.primetimebiolabs.com//product/<slug>`.

---

### 2.4 Other URL Emitters

1. **OpenGraph `og:url`:**
   - [`app/product/[slug]/page.tsx:134`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L134): `url: url` (where `url = `${SITE_URL}/product/${slug}``) -> **AFFECTED** (`https://www.primetimebiolabs.com//product/<slug>`).
   - [`app/shop/page.tsx:22`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/shop/page.tsx#L22): `url: `${SITE_URL}/shop`` -> **AFFECTED** (`https://www.primetimebiolabs.com//shop`).
   - [`app/about-us/page.tsx:20`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/about-us/page.tsx#L20): `url: `${SITE_URL}/about-us`` -> **AFFECTED** (`https://www.primetimebiolabs.com//about-us`).
   - [`app/affiliates/page.tsx:44`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/affiliates/page.tsx#L44): `url: PAGE_URL` (where `PAGE_URL = `${SITE_URL}/affiliates``) -> **AFFECTED** (`https://www.primetimebiolabs.com//affiliates`).
   - [`app/military-discount/page.tsx:18`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/military-discount/page.tsx#L18): `url: `${SITE_URL}/military-discount`` -> **AFFECTED** (`https://www.primetimebiolabs.com//military-discount`).
   - [`app/peptide-calculator/layout.tsx:17`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/peptide-calculator/layout.tsx#L17): `url: PAGE_URL` (where `PAGE_URL = `${SITE_URL}/peptide-calculator``) -> **AFFECTED** (`https://www.primetimebiolabs.com//peptide-calculator`).
   - [`app/faq/page.tsx:21`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/faq/page.tsx#L21): `url: "https://www.primetimebiolabs.com/faq"` -> **CLEAN** (Hardcoded string).
   - [`app/contact-us/page.tsx:22`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/contact-us/page.tsx#L22): `url: "https://www.primetimebiolabs.com/contact-us"` -> **CLEAN** (Hardcoded string).
   - [`app/blog/[slug]/page.tsx:75`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L75): `url: `${SITE_URL}/blog/${slug}`` -> **CLEAN** (SITE_URL stripped with `.replace(/\/+$/, "")`).

2. **XML Sitemap Generator ([`app/sitemap.ts`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts)):**
   - **Historical context:** In commit `95ae013`, `app/sitemap.ts` previously defined `SITE_URL` without stripping trailing slashes: `const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ...`. Concatenations such as `${SITE_URL}${route.path}` directly emitted double slashes (`https://www.primetimebiolabs.com//shop`, `//blog`, `//product/...`).
   - **Current repository state:** [`app/sitemap.ts:5,28-33,44-46`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L5) has been explicitly sanitized:
     ```typescript
     const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com").replace(/\/+$/, "");
     ...
     url: `${SITE_URL}${route.path ? (route.path.startsWith("/") ? route.path : `/${route.path}`) : ""}`
     ...
     const cleanSlug = String(product.slug).replace(/^\/+/, "");
     url: `${SITE_URL}/product/${cleanSlug}`
     ```
   - **Status in current code:** **CLEAN** (patched in current local code, but shared the exact same root cause pattern).

3. **`robots.txt` Sitemap Reference ([`app/robots.ts:3,14`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/robots.ts#L3-L14)):**
   ```typescript
   const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com").replace(/\/+$/, "");
   ...
   sitemap: `${SITE_URL}/sitemap.xml`,
   ```
   - **Status:** **CLEAN**.

4. **Email Layout Links ([`lib/email/layout.ts:3,42,48`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/email/layout.ts#L3-L48)):**
   ```typescript
   const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
   ...
   <a href="${SITE_URL}/"...
   <a href="${SITE_URL}/shop"...
   ```
   - **Status:** **AFFECTED** (`https://www.primetimebiolabs.com//` and `https://www.primetimebiolabs.com//shop` generated in transactional email footers).

---

### 2.5 Redirect & Normalisation Behaviour

- **Middleware:** Checked repository — no [`middleware.ts`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/middleware.ts) or `middleware.js` exists in the codebase.
- **Next.js Config ([`next.config.mjs`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/next.config.mjs)):** No `redirects()` or `rewrites()` are defined to collapse consecutive slashes into a single slash.
- **Behavior:** Requests with double slashes (e.g. `GET //product/bpc-157-10-mg`) pass directly through to Next.js routing without an automatic 301 normalisation redirect rule. Depending on the upstream hosting edge (e.g. Vercel / Cloudflare), URLs with consecutive slashes may resolve 200 OK or be treated as distinct paths by bots, increasing the urgency of the fix.

---

## 3. Blast Radius Table

| Surface | Affected? | Constructing Expression | Notes |
| :--- | :---: | :--- | :--- |
| **Product Canonical** | **YES** | [`app/product/[slug]/page.tsx:125,130`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L125-L130): `${SITE_URL}/product/${slug}` | Emits `https://www.primetimebiolabs.com//product/<slug>` |
| **Product OpenGraph (`og:url`)** | **YES** | [`app/product/[slug]/page.tsx:134`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L134): `url: url` | Emits `https://www.primetimebiolabs.com//product/<slug>` |
| **Product JSON-LD (`Offer.url`)** | **YES** | [`app/product/[slug]/page.tsx:27`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L27): `${SITE_URL}/product/${product.slug}` | Emits `https://www.primetimebiolabs.com//product/<slug>` |
| **Organization Schema (`@id`)** | **YES** | [`app/page.tsx:55`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L55): `${SITE_URL}/#organization` | Emits `https://www.primetimebiolabs.com//#organization` |
| **Organization Schema (`logo.url`)** | **YES** | [`app/page.tsx:61`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L61): `${SITE_URL}/primtime-biolabs-logo.svg` | Emits `https://www.primetimebiolabs.com//primtime-biolabs-logo.svg` |
| **Homepage OpenGraph (`og:image`)**| **YES** | [`app/page.tsx:42,48`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L42-L48): `${SITE_URL}/cta-banner.png` | Emits `https://www.primetimebiolabs.com//cta-banner.png` |
| **Shop Page Canonical & `og:url`** | **YES** | [`app/shop/page.tsx:18,22`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/shop/page.tsx#L18-L22): `${SITE_URL}/shop` | Emits `https://www.primetimebiolabs.com//shop` |
| **About Us Canonical & `og:url`** | **YES** | [`app/about-us/page.tsx:15,20`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/about-us/page.tsx#L15-L20): `${SITE_URL}/about-us` | Emits `https://www.primetimebiolabs.com//about-us` |
| **Affiliates Canonical & `og:url`** | **YES** | [`app/affiliates/page.tsx:31,39,44`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/affiliates/page.tsx#L31-L44): `${SITE_URL}/affiliates` | Emits `https://www.primetimebiolabs.com//affiliates` |
| **Military Discount Canonical & OG** | **YES** | [`app/military-discount/page.tsx:14,18`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/military-discount/page.tsx#L14-L18): `${SITE_URL}/military-discount` | Emits `https://www.primetimebiolabs.com//military-discount` |
| **Peptide Calculator Canonical & OG**| **YES** | [`app/peptide-calculator/layout.tsx:7,12,17`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/peptide-calculator/layout.tsx#L7-L17): `${SITE_URL}/peptide-calculator` | Emits `https://www.primetimebiolabs.com//peptide-calculator` |
| **Outbound Email Links & Logos** | **YES** | [`lib/email/layout.ts:3,42,48`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/email/layout.ts#L3-L48): `${SITE_URL}/shop`, `${SITE_URL}/` | Emits double slashes in HTML emails |
| **Homepage Canonical (`alternates`)**| **NO** | [`app/page.tsx:24`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L24): `alternates: { canonical: SITE_URL }` | Emits `https://www.primetimebiolabs.com/` (Clean root, but missing trailing slash normalization) |
| **Blog Post Canonical & OpenGraph**| **NO** | [`app/blog/[slug]/page.tsx:39,71,75`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L39-L75): `.replace(/\/+$/, "")` | Already clean in current code |
| **FAQ Canonical & OpenGraph** | **NO** | [`app/faq/page.tsx:11,21`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/faq/page.tsx#L11-L21): `"https://www.primetimebiolabs.com/faq"` | Hardcoded single slash string |
| **Contact Us Canonical & OpenGraph** | **NO** | [`app/contact-us/page.tsx:12,22`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/contact-us/page.tsx#L12-L22): `"https://www.primetimebiolabs.com/contact-us"` | Hardcoded single slash string |
| **Sitemap Generator (`sitemap.xml`)**| **NO** | [`app/sitemap.ts:5,29,46`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L5-L46): `.replace(/\/+$/, "")` | Currently clean in codebase (was previously affected in `95ae013`) |
| **Robots Reference (`robots.txt`)** | **NO** | [`app/robots.ts:3,14`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/robots.ts#L3-L14): `.replace(/\/+$/, "")` | Clean |
| **Legal / Policy Pages** | **N/A** | [`app/terms-and-conditions/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/terms-and-conditions/page.tsx), [`app/privacy-policy/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/privacy-policy/page.tsx), [`app/refund-policy/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/refund-policy/page.tsx), [`app/shipping-policy/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/shipping-policy/page.tsx), [`app/medical-disclaimer/page.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/medical-disclaimer/page.tsx) | No explicit canonical defined |

---

## 4. Impact Assessment

1. **Search Engine Crawler Canonical Evaluation:**
   - RFC 3986 path syntax defines consecutive slashes as separate empty path segments (`//product` != `/product`).
   - While Googlebot and Bingbot frequently apply heuristic normalization to collapse redundant slashes, emitting `<link rel="canonical" href="https://www.primetimebiolabs.com//product/...">` signals to crawlers that the intended authoritative URL has an empty segment. This creates a canonical mismatch with internal links pointing to single-slash URLs (`/product/...`), splitting PageRank/crawl equity and triggering duplicate content warnings in Google Search Console.

2. **Schema & Knowledge Graph Resolution:**
   - JSON-LD `@id` identifiers (such as `https://www.primetimebiolabs.com//#organization`) are treated by RDF parsers as exact URI string tokens. If different pages or external entity graphs reference `https://www.primetimebiolabs.com/#organization` while page schema emits `https://www.primetimebiolabs.com//#organization`, graph linkage breaks, degrading rich snippet eligibility and Organization entity recognition.

3. **OpenGraph & Social Sharing:**
   - Social crawlers (Facebook, LinkedIn, X/Twitter, iMessage) rely on `og:url` for caching and deduplicating share counts and previews. Inconsistent double slashes lead to fragmented social share signals and cache busts.

---

## 5. Recommended Fix (Unapplied)

Rather than patching trailing slashes ad-hoc in every individual page file (which led to the current fragmentation), the fix should be executed at a single foundational layer.

### Step 1: Create a Single Source of Truth for `SITE_URL`
Create a dedicated utility module (e.g. `lib/siteUrl.ts`) or export a synchronous constant from [`lib/getBaseUrl.ts`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/getBaseUrl.ts):

```typescript
// lib/siteUrl.ts
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.primetimebiolabs.com"
).replace(/\/+$/, "");

/** Helper to generate a normalized absolute URL with single slashes */
export function absoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return path ? `${SITE_URL}${cleanPath}` : SITE_URL;
}
```

### Step 2: Set `metadataBase` in Root Layout
In [`app/layout.tsx`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/layout.tsx):
```typescript
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PrimeTime BioLabs",
  description: "Peptide solutions for clarity, precision, and efficiency.",
};
```
*Setting `metadataBase` allows Next.js to automatically resolve relative canonicals (e.g. `alternates: { canonical: '/product/bpc-157' }`) cleanly without string concatenation errors.*

### Step 3: Replace Scattered In-File `SITE_URL` Declarations
Replace the redundant, unstripped `const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ...` in:
- [`app/page.tsx:12`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/page.tsx#L12)
- [`app/product/[slug]/page.tsx:13`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L13)
- [`app/shop/page.tsx:10`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/shop/page.tsx#L10)
- [`app/about-us/page.tsx:7`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/about-us/page.tsx#L7)
- [`app/affiliates/page.tsx:30`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/affiliates/page.tsx#L30)
- [`app/military-discount/page.tsx:6`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/military-discount/page.tsx#L6)
- [`app/peptide-calculator/layout.tsx:3`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/peptide-calculator/layout.tsx#L3)
- [`lib/email/layout.ts:3`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/lib/email/layout.ts#L3)
- [`app/sitemap.ts:5`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/sitemap.ts#L5)
- [`app/robots.ts:3`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/robots.ts#L3)
- [`app/blog/[slug]/page.tsx:39`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L39)

with the centralized import:
```typescript
import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";
```

### Verification Checklist Post-Fix:
1. **Homepage:** View HTML head for `<link rel="canonical" href="https://www.primetimebiolabs.com">` (or `https://www.primetimebiolabs.com/`) and inspect Organization schema `@id` = `"https://www.primetimebiolabs.com/#organization"`.
2. **Product Page (`/product/bpc-157-10-mg`):** Verify canonical is `https://www.primetimebiolabs.com/product/bpc-157-10-mg`, `og:url` is `https://www.primetimebiolabs.com/product/bpc-157-10-mg`, and Product Offer schema `url` contains a single slash.
3. **Static & Legal Pages (`/shop`, `/about-us`, `/peptide-calculator`):** Verify no `//shop` or `//about-us` in canonical or `og:url`.
4. **Sitemap (`/sitemap.xml`):** Verify `<loc>` entries for all static routes and products have single slashes.

---

## 6. Open Questions

1. **Production Environment Variable Setting:** Confirm whether `NEXT_PUBLIC_SITE_URL` in the production host (e.g. Vercel dashboard) is configured with an explicit trailing slash (e.g. `https://www.primetimebiolabs.com/`). Normalizing at the code level via `.replace(/\/+$/, "")` makes the application resilient regardless of how the env var is configured in production.
2. **Edge 301 Normalization Redirects:** Consider whether a Next.js rewrite or middleware rule should be added to 301 redirect incoming requests containing consecutive duplicate slashes (`//...`) to their single-slash equivalent (`/...`) to protect legacy backlinks or mistyped crawler requests.
