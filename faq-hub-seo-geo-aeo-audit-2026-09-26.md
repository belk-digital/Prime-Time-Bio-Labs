# PrimeTime BioLabs FAQ Hub — SEO / GEO / AEO Technical & Content Audit

**Audit Date:** 2026-09-26  
**Audited Route:** `/faq`  
**Audited Files:** `app/faq/page.tsx`, `components/faq/FaqHubClient.tsx`, `lib/faqHubData.ts`  
**Scope:** 50 Approved Questions + 5 Reference Assets across 7 Categories (55 `###` Headings Total)

---

## 1. Verdict

**The local FAQ hub implementation is SEO-, GEO-, and AEO-ready at the structural, architectural, and schema code level; public release readiness remains capped strictly by the 23 outstanding owner-fact content gaps and the partial status of the Trust and Payments categories.**

---

## 2. Findings Table

| Check | Area | Status | Detail |
| :--- | :--- | :---: | :--- |
| **2.1 Metadata** | SEO | **PASS** | Title tag (`Frequently Asked Questions \| Primetime BioLabs`, 46 chars) and meta description (132 chars) meet exact mechanical length caps. OpenGraph (`og:site_name = Prime Time Bio Labs`, `og:type = website`, `og:image = 1200x630`) and Twitter card tags are fully populated (`app/faq/page.tsx:6-40`). |
| **2.2 Heading Hierarchy** | SEO | **PASS** | Exactly 1 `<h1>` in hero section, 7 category `<h2>` sections rendered in strict order (Trust → Payments → Shipping → Quality → Storage → Returns → Legality), and exactly 55 `<h3>` headings (50 questions + 5 reference assets). |
| **2.3 Internal Linking** | SEO | **PASS** | All 7 jump-anchors (`#trust-and-legitimacy`, `#ordering-and-payments`, etc.) and the `#storage-reference` jump link are active. Contextual internal links (`/contact-us`, `/military-discount`, `/refund-policy`, `/shipping-policy`, `/certificates`) use descriptive anchor text. |
| **2.4 Breadcrumbs** | SEO | **WARN** | `BreadcrumbList` schema is complete in JSON-LD (`Home` → `FAQ`), but visual UI utilizes a top pill badge (`Support & Research Hub`) rather than a traditional clickable HTML breadcrumb navigation trail (`app/faq/page.tsx:72-88`). |
| **2.5 Content Depth** | SEO / Content | **PASS** | Total page length is ~10,650 words (fitting the target range of 8,000–12,000 words). Legality (~3,400 words), Quality (~2,300 words), Storage (~1,850 words), and Shipping (~1,700 words) provide extensive topical depth. |
| **2.6 Duplicate Risk** | SEO | **WARN** | The 50 hub answers substantially expand and supersede the legacy 12 homepage/FAQ questions. Upon publishing, legacy duplicate FAQ components across the site should cross-link to `/faq` to avoid self-cannibalization. |
| **2.7 Crawlability & SSR** | SEO | **PASS** | Server-side rendering generates all 50 questions, answers, tables, and stage assets directly in initial HTML. Jump anchor IDs match in-page link hrefs exactly. |
| **3.1 Quotable Direct Answers** | GEO | **PASS** | All 14 audited sample answers lead with a 45–60 word self-contained direct answer paragraph engineered for generative search engine extraction and citation. |
| **3.2 Self-Containment** | GEO | **PASS** | Answers avoid dangling pronouns or cross-question dependency. Key entities (`PrimeTime BioLabs`, `HPLC`, `BPC-157`, `21 CFR 216.23`) are explicitly named in the lead block of each answer. |
| **3.3 Factual Grounding** | GEO | **PASS** | Claims are attributed to published site policies, official testing standards, or primary government sources (FDA Federal Register notices, docket numbers, and PCAC minutes in Legality). |
| **3.4 Contradiction Scan** | GEO | **PASS** | Figures and policies align across prose and assets: 1–3 business days dispatch, 14-day return for unopened product / 7-day for damaged product, −20°C storage for lyophilised vials, and 2–8°C for reconstituted solutions. |
| **3.5 No-Go Compliance** | Safety / Legal | **PASS** | **100% Compliant.** Zero human dosing, injection, administration, cycling, or therapeutic claims exist. Research Use Only disclaimers and 21+ eligibility are reinforced throughout. |
| **4.1 Question Headings** | AEO | **PASS** | All 50 question headings are framed as natural language buyer queries (`What is...`, `How do I...`, `Are your...`, `Can I...`) optimized for voice and conversational query matching. |
| **4.2 Schema Entity Parity** | AEO | **PASS** | Exactly 1 `FAQPage` entity with exactly 50 `Question` entities. Every `Question.name` matches its visible `<h3>` character-for-character, and `acceptedAnswer.text` contains plain text without HTML, markdown, or bracket syntax. |
| **4.3 Answer Directness** | AEO | **PASS** | First sentences deliver instant direct answers (e.g., "Yes, and there are three separate routes...", "Store unopened lyophilised vials at −20°C...", "No. PrimeTime BioLabs requires every buyer to be 21 or older..."). |
| **4.4 Featured Snippet Formatting** | AEO | **PASS** | Content structures (step-by-step stages, analytical rows, dated timelines, and concise introductory definitions) match the preferred structural formats for Google Featured Snippets and Perplexity/Claude/ChatGPT citations. |

---

## 3. Content Gaps vs. Code Defects

### A. Code & Architecture Status (Code Defects = 0)
- **Zero code-level defects:** The Next.js page, client component, TypeScript interfaces, Tailwind styling, and JSON-LD schema build cleanly with 0 lint errors, 0 type errors, and 0 runtime warnings.
- **Zero marker leaks:** `0` instances of `[OWNER FACT NEEDED` or `[IMPLEMENTER` in visible page markup or schema.
- **Valid HTML Comments:** All 23 editorial flags are safely preserved inside `<!-- OWNER FACT NEEDED: ... -->` comments for review.

### B. Known Content Gaps (Awaiting Site Owner Input)
1. **Trust and Legitimacy:** Only 1 approved question currently active; 9–11 questions and the vendor-verification checklist asset are parked awaiting owner facts on laboratory facility credentials and testing partnerships.
2. **Ordering and Payments:** Only 1 approved question currently active; 7–9 questions are parked awaiting payment processing methods, cryptocurrency options, and checkout mechanics.
3. **Shipping Timeframes & Carrier Names:** Carriers and transit windows remain deferred to checkout generation rather than published ranges.
4. **Lost Package Resolution Policy:** Stage 8 of "How an order moves" and Shipping Q7 lack a concrete day-threshold for lost shipment re-shipment or refund.
5. **Named Third-Party Testing Laboratory:** Certificates currently list "Verified Third-Party Laboratory"; naming the accredited analytical partner remains the primary available trust upgrade.
6. **Reconstituted Stability Window:** Product page guidance cites 2–8°C storage, but duration is deferred to owner confirmation.
7. **RMA Turnaround & Restocking Fee:** Return timeline stages 2, 3, 4, and 5 have fee amounts and turnaround days awaiting owner sign-off.

---

## 4. Prioritized Recommendations for Future Publish

1. **Owner Fact Resolution:** Settle the 23 flagged questions (especially named laboratory partner, lost shipment policy, and RMA turnaround) to convert staging comments into authoritative copy.
2. **Complete Trust & Payments Categories:** Expand Trust (to 10–12 questions) and Payments (to 8–10 questions) once commercial facts land to elevate the page from 5.5 to 7 full categories.
3. **Add Visible Breadcrumbs (UI Enhancement):** In addition to the existing JSON-LD breadcrumb schema, consider rendering a subtle visual breadcrumb trail (`Home / FAQ`) above the H1 for user navigation parity.
4. **Post-Launch Canonical Consolidation:** Redirect or retire the legacy 12-question static FAQ list and point all footer/nav links exclusively to `/faq`.
