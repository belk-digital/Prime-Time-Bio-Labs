import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page not found | PrimeTime BioLabs",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-36 pb-24">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">Error 404</p>
        <h1 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-gray-900 mb-4">
          Page not found
        </h1>
        <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed mb-10">
          The page you're looking for doesn't exist or has moved. Browse our catalog or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center transition-colors"
          >
            Shop peptides
          </Link>
          <Link
            href="/"
            className="h-12 px-8 rounded-full border border-black/15 hover:bg-gray-100 text-gray-900 text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
