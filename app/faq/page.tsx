import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FAQ | Primetime Biolabs",
  description: "Answers to common questions about our research peptides, testing standards, shipping, and policies.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-gray-200 overflow-hidden pt-40 pb-16 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
            Support
          </div>
          <h1 className="text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2]">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Questions</span>
          </h1>
        </div>
      </section>

      <FAQSection hideHeading />

      <Footer />
    </main>
  );
}
