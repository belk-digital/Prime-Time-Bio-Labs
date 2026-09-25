import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FaqHubClient from "@/components/faq/FaqHubClient";
import { ALL_VISIBLE_FAQS } from "@/lib/faqHubData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Primetime BioLabs",
  description:
    "Answers on research peptide purity and COAs, shipping and tracking, payments, storage, returns, and legality from PrimeTime BioLabs.",
  alternates: {
    canonical: "https://www.primetimebiolabs.com/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Frequently Asked Questions | Primetime BioLabs",
    description:
      "Answers on research peptide purity and COAs, shipping and tracking, payments, storage, returns, and legality from PrimeTime BioLabs.",
    url: "https://www.primetimebiolabs.com/faq",
    siteName: "Prime Time Bio Labs",
    type: "website",
    images: [
      {
        url: "https://www.primetimebiolabs.com/cta-banner.png",
        width: 1200,
        height: 630,
        alt: "Frequently Asked Questions | Primetime BioLabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Primetime BioLabs",
    description:
      "Answers on research peptide purity and COAs, shipping and tracking, payments, storage, returns, and legality from PrimeTime BioLabs.",
    images: ["https://www.primetimebiolabs.com/cta-banner.png"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.primetimebiolabs.com/#organization",
      "name": "PrimeTime BioLabs",
      "alternateName": "Primetime Biolabs",
      "url": "https://www.primetimebiolabs.com/",
      "email": "support@primetimebiolabs.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.primetimebiolabs.com/#website",
      "url": "https://www.primetimebiolabs.com/",
      "name": "PrimeTime BioLabs",
      "publisher": {
        "@id": "https://www.primetimebiolabs.com/#organization",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.primetimebiolabs.com/faq#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.primetimebiolabs.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "FAQ",
          "item": "https://www.primetimebiolabs.com/faq",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.primetimebiolabs.com/faq#webpage",
      "isPartOf": {
        "@id": "https://www.primetimebiolabs.com/#website",
      },
      "name": "Frequently Asked Questions | Primetime BioLabs",
      "description":
        "Answers on research peptide purity and COAs, shipping and tracking, payments, storage, returns, and legality from PrimeTime BioLabs.",
      "inLanguage": "en-US",
      "mainEntity": ALL_VISIBLE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.plainAnswer,
        },
      })),
    },
  ],
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 md:pt-44 pb-12 md:pb-16 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase font-michroma">
            Support &amp; Research Hub
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.15]">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-400">
              Questions
            </span>
          </h1>

          <p className="font-inter text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Everything below answers a question a real buyer has asked about ordering research peptides from PrimeTime BioLabs. The answers cover purity testing and Certificates of Analysis, how orders ship, and what happens when one goes missing. Storage temperatures and shelf life come next, along with payment and refund mechanics and where US regulation stands after the 2026 compounding decisions. Every product listed on this site is supplied for laboratory and in-vitro research use only.
          </p>
        </div>
      </section>

      {/* Interactive FAQ Hub Client */}
      <FaqHubClient />

      <Footer />
    </main>
  );
}
