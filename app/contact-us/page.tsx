import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Primetime Biolabs",
  description: "Get in touch with the Primetime Biolabs team for questions about our research peptides, orders, or partnerships.",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <div className="pt-28 md:pt-36 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="relative text-gray-200 overflow-hidden rounded-[2rem] md:rounded-[3rem] pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 lg:px-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/cta-banner.png"
              alt="Primetime Biolabs research facility"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Localized scrim so the heading stays legible without darkening the whole photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
              Let&apos;s Talk
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed font-light">
              Questions about an order, a custom synthesis request, or a partnership opportunity? Send us a
              message and our team will respond promptly.
            </p>
          </div>
        </section>
      </div>

      {/* Contact info + form */}
      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="font-michroma uppercase text-2xl md:text-3xl font-bold tracking-wider text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="font-inter text-gray-500 leading-relaxed mb-10">
              Our research and support team is here to help with orders, custom synthesis requests, and
              partnership inquiries.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-inter text-sm text-gray-400">Email</p>
                  <p className="font-inter text-gray-900 font-medium">support@primetimebiolabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-inter text-sm text-gray-400">Phone</p>
                  <p className="font-inter text-gray-900 font-medium">Available upon request</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-inter text-sm text-gray-400">Location</p>
                  <p className="font-inter text-gray-900 font-medium">United States</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <FAQSection />

      <Footer />
    </main>
  );
}
