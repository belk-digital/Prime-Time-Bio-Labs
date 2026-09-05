import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Primetime Biolabs",
  description: "Get in touch with the Primetime Biolabs team for questions about our research peptides, orders, or partnerships.",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-gray-200 overflow-hidden pt-40 pb-24 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Talk</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light mb-10">
              Questions about an order, a custom synthesis request, or a partnership opportunity? Send us a message and our team will respond promptly.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">support@primetimebiolabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">Available upon request</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">United States</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md p-8 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
