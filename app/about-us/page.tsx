import Link from "next/link";
import { ArrowUpRight, CheckCircle2, FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import AboutValuesSection from "@/components/about/AboutValuesSection";
import AboutPageAnimator from "@/components/about/AboutPageAnimator";

export const metadata = {
  title: "About Us | Primetime Biolabs",
  description:
    "Learn about Primetime Biolabs' mission to deliver the highest purity research peptides through rigorous quality control and state-of-the-art synthesis.",
};

const labStandards = [
  "cGMP-Aligned Facility",
  "HPLC & Mass Spectrometry Instrumentation",
  "Climate-Controlled Cold-Chain Storage",
  "Full Batch Chain-of-Custody Documentation",
];

const processSteps = [
  {
    number: "01",
    title: "Sequence Design & Sourcing",
    description:
      "Every research peptide begins with verified raw materials and a documented sequence, sourced and logged before synthesis ever starts.",
  },
  {
    number: "02",
    title: "Solid-Phase Synthesis",
    description:
      "Our lab uses solid-phase peptide synthesis (SPPS) to build each compound with precise, reproducible amino acid coupling.",
  },
  {
    number: "03",
    title: "Purification & Analytical Testing",
    description:
      "Batches are purified and independently verified via HPLC and mass spectrometry to confirm purity, identity, and concentration.",
  },
  {
    number: "04",
    title: "Certificate of Analysis & Fulfillment",
    description:
      "Every vial ships with a matching Certificate of Analysis and is packed using temperature-controlled logistics for research use.",
  },
];

const purposeFeatures = [
  {
    icon: FlaskConical,
    title: "Research-Driven Approach",
    description: "Every formulation is grounded in rigorous laboratory science, not shortcuts.",
  },
  {
    icon: Sparkles,
    title: "Custom Synthesis",
    description: "Tailoring peptide sequences and batch sizes to fit each lab's exact needs.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising QC",
    description: "Third-party verified purity on every single batch we release.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "About Primetime Biolabs",
      description:
        "Learn about Primetime Biolabs' USA-based research peptide laboratory, our synthesis process, and our quality control standards.",
    },
    {
      "@type": "Organization",
      name: "Primetime Biolabs",
      description:
        "USA-based supplier of research-use-only synthetic peptides for laboratory research, verified by HPLC and mass spectrometry testing.",
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
          <h1 className="about-fade text-4xl md:text-5xl font-michroma font-bold text-gray-900 leading-tight mb-6">
            Pioneering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">peptide synthesis</span>
          </h1>
          <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed mb-8">
            We are dedicated to pushing the boundaries of scientific research by providing the highest purity,
            precision-engineered peptides available on the market.
          </p>
          <Link
            href="/shop"
            className="about-fade font-inter inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Shop Now
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-24">
        <div className="about-fade w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto rounded-3xl overflow-hidden">
          <img
            src="/about-image.jpg"
            alt="Primetime Biolabs research facility"
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
              Primetime Biolabs operates a USA-based synthesis facility purpose-built for research-grade peptide
              production. Every workflow, from raw material intake to final packaging, is documented and
              standardized so results are reproducible across every batch.
            </p>
            <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              Our analytical chemists verify each compound with HPLC and mass spectrometry before it&apos;s cleared
              for release, and finished vials are stored and shipped using temperature-controlled cold-chain
              logistics to preserve peptide stability from our lab to yours.
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
              alt="Inside the Primetime Biolabs research laboratory"
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
              From Sequence to Certificate: Our Process
            </h2>
            <p className="about-fade font-inter text-gray-500 text-sm md:text-base leading-relaxed">
              Every peptide we release follows the same four-stage process, engineered so research labs can trust
              the purity and documentation behind every vial.
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
              alt="Research-grade peptide vials produced at Primetime Biolabs"
              className="w-full h-[240px] md:h-[360px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Compliance note */}
      <section className="bg-black text-gray-400 py-16 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="about-fade font-inter text-sm leading-relaxed">
            All products sold by Primetime Biolabs are intended strictly for laboratory research and in-vitro use only. They are not intended for human consumption, diagnostic, or therapeutic use.
          </p>
        </div>
      </section>
      </AboutPageAnimator>

      <Footer />
    </main>
  );
}
