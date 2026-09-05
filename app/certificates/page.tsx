import Link from "next/link";
import { FileCheck2, FlaskConical, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Certificates of Analysis | Primetime Biolabs",
  description: "Every batch we produce is independently tested. Find batch-specific Certificates of Analysis (COA) on each product page.",
};

const steps = [
  {
    icon: FlaskConical,
    title: "Independent Testing",
    description: "Every production batch is sent to a third-party lab for HPLC and mass spectrometry analysis.",
  },
  {
    icon: FileCheck2,
    title: "Batch-Specific COAs",
    description: "Each product page lists the exact batch number, purity percentage, and analysis date, with the COA document available to download.",
  },
  {
    icon: ShieldCheck,
    title: "Full Transparency",
    description: "We believe researchers deserve full visibility into what they're purchasing &mdash; no exceptions.",
  },
];

export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-gray-200 overflow-hidden pt-40 pb-24 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
            Quality & Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
            Certificates Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Analysis</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
            Every peptide we produce is verified for purity and identity by an independent testing laboratory. Batch-specific COAs are available directly on each product&apos;s page.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-50 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-michroma uppercase tracking-wide text-gray-900 mb-3 text-sm">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 leading-relaxed mb-8">
            Looking for a specific batch&apos;s Certificate of Analysis? Visit the product page in our shop &mdash; the batch number, purity percentage, and COA download are listed alongside each product&apos;s details.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse The Shop
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
