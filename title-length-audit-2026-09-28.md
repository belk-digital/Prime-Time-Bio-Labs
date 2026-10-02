# READ-ONLY Audit: Page Titles Over 60 Characters

**Date:** 2026-09-28  
**Audit Scope:** Every route's rendered `<title>` across static pages, dynamic route templates (`/product/[slug]`, `/blog/[slug]`), and root layout defaults.

---

## 1. Verdict

A total of **7 rendered page titles exceed the 60-character search-engine display threshold**, comprising **2 static page titles** (`/` and `/affiliates`) and **5 dynamic blog post titles** rendered via the `/blog/[slug]` template. The longest offending title found is `"Understanding the Role of GLP-1 Agonists in Metabolic Research | Primetime Biolabs"` at **82 characters** (22 characters over limit). The over-60 issue is heavily concentrated in the dynamic blog route due to long informational headline strings being concatenated with a 20-character brand suffix (`" | Primetime Biolabs"`), while product pages remain universally under 60 characters (the longest product title renders at 53 characters).

---

## 2. Evidence

### Root Layout Default & Template Trace

- **File:** [`app/layout.tsx:32-36`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/layout.tsx#L32-L36)
- **Code:**
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
- **Analysis:** The root layout defines a static string default (`"PrimeTime BioLabs"`, 17 characters). It does **not** define a title template pattern (e.g. `%s | PrimeTime BioLabs`). Pages and sub-routes without explicit `metadata` exports inherit this 17-character default directly.

---

### Over-60 Titles Table

| Page / Route | Exact Current Title | Character Count | Characters Over 60 | Title Source |
| :--- | :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | `"Research Peptides \| ≥99% Purity, COA Verified \| PrimeTime BioLabs"` | **65** | +5 | Static Metadata (`app/page.tsx:15`) |
| **`/affiliates`** | `"Peptide Affiliate Program \| 10% Commission \| PrimeTime BioLabs"` | **62** | +2 | Static Metadata (`app/affiliates/page.tsx:32`) |
| **`/blog/understanding-the-role-of-glp-1-agonists-in-metabolic-research`** | `"Understanding the Role of GLP-1 Agonists in Metabolic Research \| Primetime Biolabs"` | **82** | +22 | Dynamic Template (`app/blog/[slug]/page.tsx:67`) |
| **`/blog/breakthroughs-in-peptide-synthesis`** | `"Breakthroughs in Peptide Synthesis for Next-Gen Therapeutics \| Primetime Biolabs"` | **80** | +20 | Dynamic Template (`app/blog/[slug]/page.tsx:67`) |
| **`/blog/peptide-stability-storage-best-practices`** | `"Best Practices for Maintaining Peptide Stability in Storage \| Primetime Biolabs"` | **79** | +19 | Dynamic Template (`app/blog/[slug]/page.tsx:67`) |
| **`/blog/how-to-read-a-peptide-certificate-of-analysis`** | `"How to Read a Peptide Certificate of Analysis \| Primetime Biolabs"` | **65** | +5 | Dynamic Template (`app/blog/[slug]/page.tsx:67`) |
| **`/blog/how-to-choose-a-research-peptide-supplier`** | `"How to Choose a Research Peptide Supplier \| Primetime Biolabs"` | **61** | +1 | Dynamic Template (`app/blog/[slug]/page.tsx:67`) |

---

### Dynamic Route Analysis & At-Risk Templates

#### 1. Blog Post Route: `/blog/[slug]`
- **Pattern:** ``${post.title} | Primetime Biolabs`` ([`app/blog/[slug]/page.tsx:67`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/blog/%5Bslug%5D/page.tsx#L67))
- **Static suffix overhead:** `" | Primetime Biolabs"` = **20 characters**.
- **Maximum post title length before exceeding 60:** **40 characters**.
- **Findings:** Because scientific and technical blog post titles in this domain routinely exceed 40 characters (e.g. 41 to 62 characters), **83.3% of current seeded/active blog posts (5 of 6) exceed 60 characters**.
- **Top 5 Longest Rendered Dynamic Titles:**
  1. `"Understanding the Role of GLP-1 Agonists in Metabolic Research | Primetime Biolabs"` — **82 chars** (post title = 62 chars)
  2. `"Breakthroughs in Peptide Synthesis for Next-Gen Therapeutics | Primetime Biolabs"` — **80 chars** (post title = 60 chars)
  3. `"Best Practices for Maintaining Peptide Stability in Storage | Primetime Biolabs"` — **79 chars** (post title = 59 chars)
  4. `"How to Read a Peptide Certificate of Analysis | Primetime Biolabs"` — **65 chars** (post title = 45 chars)
  5. `"How to Choose a Research Peptide Supplier | Primetime Biolabs"` — **61 chars** (post title = 41 chars)

#### 2. Product Route: `/product/[slug]`
- **Pattern:** ``product.seoTitle || `${cardProduct.name} | PrimeTime BioLabs``` ([`app/product/[slug]/page.tsx:149`](file:///c:/Users/ADIL%20RAZA%20KHAN/OneDrive/Desktop/Prime-Time-Bio-Labs/app/product/%5Bslug%5D/page.tsx#L149))
- **Static suffix overhead:** `" | PrimeTime BioLabs"` = **20 characters**.
- **Maximum product name length before exceeding 60:** **40 characters**.
- **Longest real product name:** `"Metabolic X (Reta x Cangri) 10 mg"` (33 characters).
- **Longest rendered product title:** `"Metabolic X (Reta x Cangri) 10 mg | PrimeTime BioLabs"` — **53 characters** (Clean, 7 characters below limit).
- **Findings:** All 25 current seeded product titles are clean and well under 60 characters (range: 29 to 53 characters).

---

### Clean Count Summary

- **Total routes/pages evaluated at or under 60 characters:** **64 titles**
  - **14 static metadata routes:**
    - `/about-us` (57 chars)
    - `/peptide-calculator` (53 chars)
    - `/military-discount` (49 chars)
    - `/faq` (46 chars)
    - `/certificates` (44 chars)
    - `/shop` (44 chars)
    - `/medical-disclaimer` (38 chars)
    - `/terms-and-conditions` (38 chars)
    - `/shipping-policy` (35 chars)
    - `/privacy-policy` (34 chars)
    - `/blog` index (33 chars)
    - `/refund-policy` (33 chars)
    - `/contact-us` (30 chars)
    - Root layout default (17 chars)
  - **25 dynamic product pages:** All range between 29 and 53 characters.
  - **1 dynamic blog post:** `"Solid-Phase Peptide Synthesis Explained | Primetime Biolabs"` (59 chars).
  - **24 pages/subroutes inheriting root default (`"PrimeTime BioLabs"`):** e.g., `/account/*`, `/affiliates/dashboard/*`, `/login`, `/register`, `/checkout`, `/order-confirmation/*`.

---

## 3. Shortening Directions (Unapplied)

1. **Homepage (`/`):**
   - *Current (65 chars):* `"Research Peptides | ≥99% Purity, COA Verified | PrimeTime BioLabs"`
   - *Direction:* Remove the middle secondary clause or shorten the purity descriptor to fit within 60 chars.

2. **Affiliates (`/affiliates`):**
   - *Current (62 chars):* `"Peptide Affiliate Program | 10% Commission | PrimeTime BioLabs"`
   - *Direction:* Shorten the descriptor or drop the middle commission callout before the brand pipe.

3. **Blog Post — GLP-1 Agonists (`/blog/glp-1-agonists-metabolic-research`):**
   - *Current (82 chars):* `"Understanding the Role of GLP-1 Agonists in Metabolic Research | Primetime Biolabs"`
   - *Direction:* Condense the article title phrasing (e.g. eliminate introductory filler like "Understanding the Role of") or implement a custom `seoTitle` field.

4. **Blog Post — Peptide Synthesis (`/blog/breakthroughs-in-peptide-synthesis`):**
   - *Current (80 chars):* `"Breakthroughs in Peptide Synthesis for Next-Gen Therapeutics | Primetime Biolabs"`
   - *Direction:* Condense the topic title (e.g. shorten "for Next-Gen Therapeutics") or support a concise SEO title override.

5. **Blog Post — Peptide Stability (`/blog/peptide-stability-storage-best-practices`):**
   - *Current (79 chars):* `"Best Practices for Maintaining Peptide Stability in Storage | Primetime Biolabs"`
   - *Direction:* Shorten the lead phrase (e.g. drop "for Maintaining") or trim the trailing subject terms.

6. **Blog Post — Reading COA (`/blog/how-to-read-a-peptide-certificate-of-analysis`):**
   - *Current (65 chars):* `"How to Read a Peptide Certificate of Analysis | Primetime Biolabs"`
   - *Direction:* Abbreviate "Certificate of Analysis" to "COA" or streamline the title stem.

7. **Blog Post — Choosing Supplier (`/blog/how-to-choose-a-research-peptide-supplier`):**
   - *Current (61 chars):* `"How to Choose a Research Peptide Supplier | Primetime Biolabs"`
   - *Direction:* Trim by a single character (e.g. omit "Research" or adjust phrasing) to bring under the 60-character ceiling.

---

## 4. Consistency Notes

1. **Brand Name Casing & Spacing Inconsistencies:**
   - `"PrimeTime BioLabs"` — Used across homepage, `/affiliates`, `/about-us`, `/blog`, `/certificates`, `/peptide-calculator`, legal policy pages, and `/product/[slug]`.
   - `"Primetime Biolabs"` / `"Primetime BioLabs"` — Used in `/blog/[slug]`, `/faq`, `/contact-us`.
   - `"Prime Time Bio Labs"` (spaced) — Used in `/shop` and `/military-discount`.
2. **Dynamic Blog vs Product SEO Override Fields:**
   - Product dynamic metadata respects `product.seoTitle` before falling back to `${cardProduct.name} | PrimeTime BioLabs`.
   - Blog dynamic metadata currently interpolates `${post.title} | Primetime Biolabs` directly without checking for an explicit `post.seoTitle` field.

---

## 5. Open Questions

1. **CMS-Managed SEO Titles:** If editors create blog posts or products with custom `seoTitle` inputs directly in the Payload admin panel at runtime, are there character-count validation rules in the Payload schema to prevent titles exceeding 60 characters?
2. **Brand Suffix Standardization:** Should the site-wide title template consistently append `" | PrimeTime BioLabs"` (19 chars) vs a shorter alternative if longer titles require maximum character budget?
