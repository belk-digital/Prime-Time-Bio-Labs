import type { Metadata } from "next";
import { Mail, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Primetime BioLabs",
  description:
    "Get in touch with the Primetime Biolabs team for questions about our research peptides, orders, or partnerships.",
  alternates: {
    canonical: "https://www.primetimebiolabs.com/contact-us",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | Primetime BioLabs",
    description:
      "Get in touch with the Primetime Biolabs team for questions about our research peptides, orders, or partnerships.",
    url: "https://www.primetimebiolabs.com/contact-us",
    siteName: "Prime Time Bio Labs",
    type: "website",
  },
};

const CONTACT_FAQS = [
  {
    question: "What is the fastest way to reach PrimeTime BioLabs support?",
    answer:
      "Email support@primetimebiolabs.com. That address is the only published contact channel, and it reaches the support team directly. Including your order number and product name in the first message gets you a useful answer sooner.",
  },
  {
    question: "Where do I send institutional or bulk-order quote requests?",
    answer:
      "Send them to support@primetimebiolabs.com with the word \"quote\" in the subject line. Include the compounds, the quantity you need, and your timeline. Procurement teams and university labs all use this same address.",
  },
  {
    question: "How do I ask about custom peptide synthesis or technical questions?",
    answer:
      "Write to support@primetimebiolabs.com with the compound details. Give the name, the sequence if you have it, and the scale you need. A short note about your research application helps the team answer precisely.",
  },
  {
    question: "Should I include my order number when I contact support?",
    answer:
      "Yes, whenever your question involves an existing order. The contact form has an optional order-number field for exactly this purpose. Without it, the team has to ask before it can look anything up.",
  },
  {
    question: "Where is PrimeTime BioLabs located?",
    answer:
      "PrimeTime BioLabs operates in the United States. We do not publish a street or mailing address, so please send all correspondence to support@primetimebiolabs.com.",
  },
  {
    question: "Is there a phone number I can call?",
    answer:
      "No. PrimeTime BioLabs does not publish a phone number, and support is handled by email at support@primetimebiolabs.com. Written inquiries also give both sides a record of order numbers and compound details.",
  },
  {
    question: "How do I request a compound that is not listed on the site?",
    answer:
      "Send the request to support@primetimebiolabs.com with the compound name and the sequence if you have it. Add the quantity and the scale you need, plus your timeline. Custom synthesis inquiries use the same address as everything else.",
  },
  {
    question: "Can I contact PrimeTime BioLabs if I am under 21?",
    answer:
      "No. The site runs a 21 or older age verification gate, and that gate covers the whole site including this contact page. Access and support are limited to visitors who meet the age requirement.",
  },
  {
    question: "Who do I contact about a shipping or delivery problem?",
    answer:
      "Use the order and account support route at support@primetimebiolabs.com. Put your order number in the message, or in the optional order-number field on the form. Describe what arrived and what you expected, in a line or two.",
  },
  {
    question: "Can support tell me how to use a research peptide?",
    answer:
      "No. PrimeTime BioLabs supplies research peptides for laboratory research use only, so the team cannot give dosing, administration, or protocol guidance. Questions about product specifications and documentation are welcome at support@primetimebiolabs.com.",
  },
  {
    question: "Should I use the contact form or email support directly?",
    answer:
      "Either one works, and both reach the same support team. Use the form when you want guided fields, or write to support@primetimebiolabs.com when your message is long. Compound lists and detailed quote requests are usually easier by email.",
  },
  {
    question: "What should I put in the subject line of my email?",
    answer:
      "Name the topic, and add your order number if you have one. A subject like \"Order 1234 shipping question\" works better than a subject like \"Question\". Clear subject lines reach the right desk on the first pass.",
  },
];

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
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "@id": "https://www.primetimebiolabs.com/contact-us#support",
          "contactType": "customer support",
          "email": "support@primetimebiolabs.com",
          "areaServed": "US",
          "availableLanguage": "English",
        },
        {
          "@type": "ContactPoint",
          "@id": "https://www.primetimebiolabs.com/contact-us#sales",
          "contactType": "sales",
          "name": "Institutional and bulk quotes",
          "email": "support@primetimebiolabs.com",
          "areaServed": "US",
          "availableLanguage": "English",
        },
        {
          "@type": "ContactPoint",
          "@id": "https://www.primetimebiolabs.com/contact-us#technical",
          "contactType": "technical support",
          "name": "Custom synthesis and technical inquiries",
          "email": "support@primetimebiolabs.com",
          "areaServed": "US",
          "availableLanguage": "English",
        },
      ],
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
      "@type": "ContactPage",
      "@id": "https://www.primetimebiolabs.com/contact-us#webpage",
      "url": "https://www.primetimebiolabs.com/contact-us",
      "name": "Contact Us | Primetime BioLabs",
      "description":
        "Get in touch with the Primetime Biolabs team for questions about our research peptides, orders, or partnerships.",
      "isPartOf": {
        "@id": "https://www.primetimebiolabs.com/#website",
      },
      "about": {
        "@id": "https://www.primetimebiolabs.com/#organization",
      },
      "mainEntity": {
        "@id": "https://www.primetimebiolabs.com/#organization",
      },
      "significantLink": "mailto:support@primetimebiolabs.com",
      "breadcrumb": {
        "@id": "https://www.primetimebiolabs.com/contact-us#breadcrumb",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.primetimebiolabs.com/contact-us#breadcrumb",
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
          "name": "Contact Us",
          "item": "https://www.primetimebiolabs.com/contact-us",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.primetimebiolabs.com/contact-us#faq",
      "isPartOf": {
        "@id": "https://www.primetimebiolabs.com/contact-us#webpage",
      },
      "inLanguage": "en-US",
      "mainEntity": CONTACT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ],
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero */}
      <div className="pt-28 md:pt-36 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="relative text-gray-200 overflow-hidden rounded-[2rem] md:rounded-[3rem] pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 lg:px-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/cta-banner.png"
              alt="PrimeTime BioLabs research facility"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Localized scrim so the heading stays legible without darkening the whole photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
              Let&apos;s Talk
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
              Contact PrimeTime BioLabs
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed font-light">
              PrimeTime BioLabs is a United States research peptide company, and support runs through email. Write to{" "}
              <a
                href="mailto:support@primetimebiolabs.com"
                className="text-indigo-400 hover:text-indigo-300 underline font-normal transition-colors"
              >
                support@primetimebiolabs.com
              </a>{" "}
              with any question about an order, a quote, or a product. Every inquiry reaches the same team, so send it once and include the details listed below.
            </p>
          </div>
        </section>
      </div>

      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] max-w-7xl mx-auto py-16 md:py-24 space-y-16 md:space-y-24">
        
        {/* Section 1 (How to reach us) & Section 4 (Send us a message) Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Section 1 & Section 3 */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Section 1: How to reach us */}
            <section className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-8 shadow-sm">
              <h2 className="font-michroma uppercase text-xl md:text-2xl font-bold tracking-wider text-gray-900 mb-4">
                How to reach us
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-8">
                Here are the contact facts in full, with nothing held back.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/80">
                  <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-inter text-xs font-bold uppercase tracking-widest text-gray-500 mb-0.5">Email</p>
                    <a
                      href="mailto:support@primetimebiolabs.com"
                      className="font-inter text-base text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                    >
                      support@primetimebiolabs.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-inter text-xs font-bold uppercase tracking-widest text-gray-500 mb-0.5">Location</p>
                    <p className="font-inter text-base text-gray-900 font-semibold">United States</p>
                  </div>
                </div>
              </div>

              <p className="font-inter text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-6">
                Email is the only channel we publish. Anything sent to that address reaches a real person on the support team.
              </p>
            </section>

            {/* Section 3: Help us answer faster */}
            <section className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-8 shadow-sm">
              <h2 className="font-michroma uppercase text-xl md:text-2xl font-bold tracking-wider text-gray-900 mb-4">
                Help us answer faster
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-6">
                Give us enough to answer on the first reply. A good message includes:
              </p>

              <ul className="space-y-3.5 mb-6">
                <li className="flex items-start gap-3 text-gray-800 font-inter text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Your order number, if the question involves an order</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 font-inter text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>The product name, written exactly as it appears on the site</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 font-inter text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>A one-line summary of what you need</span>
                </li>
              </ul>

              <p className="font-inter text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-6">
                Short messages with those three items get resolved quickly. Long messages without them usually need a follow-up question first.
              </p>
            </section>

          </div>

          {/* Right Column: Section 4 (Send us a message) */}
          <div className="lg:col-span-7">
            <section className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm">
              <h2 className="font-michroma uppercase text-2xl md:text-3xl font-bold tracking-wider text-gray-900 mb-4">
                Send us a message
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-8">
                Fill in the form below and the message goes straight to the support desk. There is an optional order-number field near the top, so use it any time your question touches an existing order. Skip that field for quotes, technical questions, and anything else unrelated to a purchase.
              </p>

              <ContactForm />
            </section>
          </div>

        </div>

        {/* Section 2: What do you need help with */}
        <section className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mb-10">
            <h2 className="font-michroma uppercase text-2xl md:text-3xl font-bold tracking-wider text-gray-900 mb-4">
              What do you need help with
            </h2>
            <p className="font-inter text-gray-600 text-base leading-relaxed">
              Three kinds of inquiry come in most often. Pick the one that matches yours and send the details it asks for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Route 1 */}
            <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-400/50 hover:shadow-md transition-all">
              <div>
                <h3 className="font-michroma uppercase text-base md:text-lg font-bold text-gray-900 mb-3">
                  Order and account support
                </h3>
                <p className="font-inter text-sm text-gray-600 leading-relaxed mb-6">
                  Use this route for order status, account trouble, and shipping questions. Include your order number if you have one. That single detail saves a full round of back and forth.
                </p>
              </div>
              <a
                href="mailto:support@primetimebiolabs.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 font-inter pt-4 border-t border-gray-200/60"
              >
                support@primetimebiolabs.com
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Route 2 */}
            <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-400/50 hover:shadow-md transition-all">
              <div>
                <h3 className="font-michroma uppercase text-base md:text-lg font-bold text-gray-900 mb-3">
                  Institutional and bulk quotes
                </h3>
                <p className="font-inter text-sm text-gray-600 leading-relaxed mb-6">
                  Procurement teams, university labs, and volume buyers should start here. Tell us which compounds you need, the quantity, and the timeline you are working against. Quotes come back faster when those three pieces arrive together.
                </p>
              </div>
              <a
                href="mailto:support@primetimebiolabs.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 font-inter pt-4 border-t border-gray-200/60"
              >
                support@primetimebiolabs.com
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Route 3 */}
            <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-400/50 hover:shadow-md transition-all">
              <div>
                <h3 className="font-michroma uppercase text-base md:text-lg font-bold text-gray-900 mb-3">
                  Custom synthesis and technical inquiries
                </h3>
                <p className="font-inter text-sm text-gray-600 leading-relaxed mb-6">
                  Technical questions about a compound belong in this route, along with custom synthesis requests. Send the compound name, the sequence if you have it, and the scale you need. A line about your intended research application helps us route the question correctly.
                </p>
              </div>
              <a
                href="mailto:support@primetimebiolabs.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 font-inter pt-4 border-t border-gray-200/60"
              >
                support@primetimebiolabs.com
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          <p className="font-inter text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-6">
            All three routes go to support@primetimebiolabs.com. What changes is the information you include.
          </p>
        </section>

        {/* Section 5: When you'll hear back */}
        <section className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl">
            <h2 className="font-michroma uppercase text-2xl md:text-3xl font-bold tracking-wider text-gray-900 mb-6">
              When you&apos;ll hear back
            </h2>
            <div className="space-y-4 font-inter text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                Send your message and the team will respond promptly.
              </p>
              <p className="text-sm md:text-base text-gray-600">
                If a reply has not arrived, send a follow-up email to{" "}
                <a
                  href="mailto:support@primetimebiolabs.com"
                  className="text-indigo-600 hover:text-indigo-700 underline font-medium transition-colors"
                >
                  support@primetimebiolabs.com
                </a>
                . Keep the original subject line so the two messages thread together. Add your order number again if the question involves an order.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Research use only */}
        <section className="bg-white border border-black/5 rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm">
          <h2 className="font-michroma uppercase text-lg md:text-xl font-bold tracking-wider text-gray-900 mb-4">
            Research use only
          </h2>
          <p className="font-inter text-sm md:text-base text-gray-600 leading-relaxed">
            PrimeTime BioLabs products are research peptides intended for laboratory research use only. They are not for human or veterinary use. The site also verifies that every visitor is 21 or older before granting access.
          </p>
        </section>

      </div>

      {/* Section 6: Contact questions (Brand Dark FAQ Component with all 12 FAQs) */}
      <FAQSection
        title={
          <>
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Questions</span>
          </>
        }
        subtitle="Common questions about getting in touch with the PrimeTime BioLabs support and research teams."
        faqs={CONTACT_FAQS}
      />

      <Footer />
    </main>
  );
}
