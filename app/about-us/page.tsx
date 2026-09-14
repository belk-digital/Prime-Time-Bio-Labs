import Link from "next/link";
import { ArrowUpRight, CheckCircle2, FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import AboutValuesSection from "@/components/about/AboutValuesSection";
import AboutPageAnimator from "@/components/about/AboutPageAnimator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
const TITLE = "About PrimeTime BioLabs | USA Peptide Synthesis & Testing";
const DESCRIPTION =
  "Inside the US facility behind PrimeTime BioLabs: solid-phase synthesis, independent HPLC and MS verification, and a Certificate of Analysis on every batch. RUO.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about-us` },
  openGraph: {
    title: TITLE,
    description:
      "A US-based synthesis facility, independent HPLC and mass spectrometry verification, and a Certificate of Analysis on every batch. For laboratory research use only.",
    url: `${SITE_URL}/about-us`,
    siteName: "PrimeTime BioLabs",
    type: "website",
    images: [{ url: `${SITE_URL}/cta-banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/cta-banner.png`],
  },
};

const labStandards = [
  "US-based synthesis facility, documented and standardised workflows",
  "Analytical HPLC and mass spectrometry instrumentation",
  "Preparative chromatography for purification",
  "Climate-controlled storage and cold-chain outbound logistics",
  "Full batch chain-of-custody documentation, retained and retrievable",
];

const processSteps = [
  {
    number: "01",
    title: "Sequence Design & Sourcing",
    description:
      "Each batch starts with a documented target sequence and verified raw materials — amino acid lots, supplier and intake date, logged before synthesis begins.",
  },
  {
    number: "02",
    title: "Solid-Phase Synthesis",
    description:
      "We build each compound by solid-phase peptide synthesis (SPPS), anchoring the chain to a resin support so excess reagents wash away between coupling cycles.",
  },
  {
    number: "03",
    title: "Purification & Independent Analysis",
    description:
      "After purification by preparative chromatography, an independent laboratory runs HPLC to quantify purity and mass spectrometry to confirm identity — never our own bench.",
  },
  {
    number: "04",
    title: "Certificate of Analysis & Fulfillment",
    description:
      "Material that clears analysis is lyophilised, sealed and labelled with its batch number, then ships with its matching Certificate of Analysis in cold-chain packaging.",
  },
];

const purposeFeatures = [
  {
    icon: FlaskConical,
    title: "Reproducible by Design",
    description: "Solid-phase synthesis with documented run parameters, so the same sequence reaches the same specification every time.",
  },
  {
    icon: Sparkles,
    title: "Direct Lab Partnership",
    description: "Custom sequence, purity threshold and quantity requests come back as a real quotation, not a form response.",
  },
  {
    icon: ShieldCheck,
    title: "Independently Verified",
    description: "Release testing goes to an independent laboratory, not our own bench, on every batch we ship.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
        "United States supplier of research-grade peptides produced by solid-phase peptide synthesis and verified by independent HPLC and mass spectrometry analysis, with a Certificate of Analysis on every batch. For laboratory research use only.",
      email: "support@primetimebiolabs.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@primetimebiolabs.com",
        areaServed: "US",
        availableLanguage: "English",
      },
    },
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about-us#webpage`,
      url: `${SITE_URL}/about-us`,
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
      breadcrumb: { "@id": `${SITE_URL}/about-us#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/about-us#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about-us` },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/about-us#process`,
      name: "How PrimeTime BioLabs produces a batch of research peptides",
      description:
        "The four-stage process every PrimeTime BioLabs research peptide batch follows, from documented sequence design through to Certificate of Analysis and fulfilment.",
      step: processSteps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.description,
      })),
    },
  ],
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutPageAnimator>
      {/* Header */}
      <section className="px-6 md:px-12 lg:px-24 pb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="about-fade font-inter text-xs md:text-sm font-bold tracking-widest text-indigo-600 uppercase mb-3">
            Pioneering the future of peptide synthesis
          </p>
          <h1 className="about-fade text-4xl md:text-5xl font-michroma font-bold text-gray-900 leading-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PrimeTime BioLabs</span>
          </h1>
          <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed mb-8">
            PrimeTime BioLabs is a United States research peptide supplier. We produce research-grade peptides by
            solid-phase peptide synthesis in a US facility, then send every batch to an independent laboratory for
            HPLC purity analysis and mass spectrometry identity confirmation. Each vial ships with the Certificate
            of Analysis for its batch. We supply for in-vitro laboratory research only.
          </p>
          <div className="about-fade flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="font-inter inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Browse the Catalogue
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/certificates"
              className="font-inter inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              See Our Certificates of Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-24">
        <div className="about-fade w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto rounded-3xl overflow-hidden">
          <img
            src="/about-image.jpg"
            alt="PrimeTime BioLabs research facility"
            className="w-full h-[280px] md:h-[420px] object-cover"
          />
        </div>
      </section>

      {/* Purpose */}
      <section className="relative bg-black pt-24 overflow-hidden">
        <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: feature list */}
          <div className="about-stagger flex flex-col gap-5 pb-10 lg:pb-24 order-2 lg:order-1">
            {purposeFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="about-stagger-item border border-white/10 bg-white/[0.02] rounded-2xl p-6 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-inter font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="font-inter text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Right: heading + image */}
          <div className="relative min-h-[420px] lg:min-h-full order-1 lg:order-2">
            <h2 className="about-fade text-2xl md:text-3xl font-michroma font-bold text-white mb-3">Our Purpose</h2>
            <p className="about-fade font-inter text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Focused on precision and accountability, we turn rigorous science into research materials labs can
              trust.
            </p>
            <img
              src="/gloves-holding-vial.png"
              alt="Researcher handling a research peptide vial"
              className="about-fade absolute bottom-0 -right-4 md:-right-8 lg:-right-12 w-[85%] md:w-[75%] h-[300px] md:h-[380px] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <AboutValuesSection />

      {/* Inside our laboratory */}
      <section className="bg-gray-50 py-24">
        <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="about-fade text-2xl md:text-3xl font-michroma font-bold text-gray-900 mb-4">
              Inside Our Laboratory
            </h2>
            <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed mb-4">
              PrimeTime BioLabs operates a United States synthesis facility purpose-built for research-grade
              peptide production. Every workflow, from raw material intake to final packaging, follows a
              documented and standardised procedure, so a batch produced this quarter runs the same route as one
              produced last year.
            </p>
            <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed mb-4">
              Our analytical chemists verify each compound by HPLC and mass spectrometry before release. Every
              batch also carries a chain-of-custody record linking the raw material lot, the synthesis run and
              the final vial count to a single batch number — the same number that appears on your{" "}
              <Link href="/certificates" className="text-indigo-600 font-medium hover:underline">
                Certificate of Analysis
              </Link>
              .
            </p>
            <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              Finished vials are stored and shipped using temperature-controlled cold-chain logistics, so material
              stays stable from our lab to yours.
            </p>
            <ul className="about-stagger grid grid-cols-1 sm:grid-cols-2 gap-3">
              {labStandards.map((standard) => (
                <li key={standard} className="about-stagger-item font-inter flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  {standard}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-fade order-1 lg:order-2 rounded-3xl overflow-hidden">
            <img
              src="/cta-banner.png"
              alt="Analytical chemists at the PrimeTime BioLabs US peptide synthesis facility"
              className="w-full h-[280px] md:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our process */}
      <section className="py-24">
        <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="about-fade text-2xl md:text-3xl font-michroma font-bold text-gray-900 mb-4">
              From Sequence to Certificate: How Every Batch Is Made
            </h2>
            <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed">
              Every peptide we release follows the same four stages. The sequence is fixed, the checkpoints are
              fixed, and nothing skips ahead — here is what happens between a target sequence and a vial on your
              bench.
            </p>
          </div>

          <div className="about-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {processSteps.map((step) => (
              <div key={step.number} className="about-stagger-item border border-gray-200 rounded-2xl p-6">
                <span className="text-3xl font-michroma font-bold text-indigo-100 block mb-4">{step.number}</span>
                <h3 className="font-inter font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="font-inter text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="about-fade rounded-3xl overflow-hidden">
            <img
              src="/shop-banner-image.png"
              alt="Research-grade peptide vials produced at PrimeTime BioLabs"
              className="w-full h-[240px] md:h-[360px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Compliance note */}
      <section className="bg-black text-gray-400 py-16 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="about-fade font-inter text-sm leading-relaxed">
            <span className="font-bold text-gray-300 uppercase tracking-wider mr-2">Research Use Only:</span>
            Products supplied by PrimeTime BioLabs are intended strictly for laboratory and in-vitro research by
            qualified professionals. They are not drugs, dietary supplements or cosmetics. They are not intended
            for human or animal consumption, and they are not for diagnostic, therapeutic or preventive use of
            any kind. No statement on this site has been evaluated by the Food and Drug Administration.
          </p>
        </div>
      </section>
      </AboutPageAnimator>

      <Footer />
    </main>
  );
}
