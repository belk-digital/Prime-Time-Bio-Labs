import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: React.ReactNode;
}

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthShellProps) {
  return (
    <main className="h-screen w-full overflow-hidden bg-white flex flex-col md:flex-row">
      {/* Left: image panel, inset as a rounded floating card */}
      <div className="relative hidden md:block md:w-1/2 h-full p-5">
        <div className="relative w-full h-full rounded-[32px] overflow-hidden">
          <img
            src="/cta-banner.png"
            alt="Primetime Biolabs research facility"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          <div className="relative z-10 h-full flex flex-col items-start justify-between p-10">
            <img src="/primtime-biolabs-logo.svg" alt="Primetime Biolabs" className="h-16 w-auto brightness-0 invert" />
            <div>
              <p className="font-inter text-white/70 text-sm font-medium mb-2">Research made simple</p>
              <h2 className="text-white text-3xl font-michroma uppercase font-bold leading-tight tracking-wide">
                Access your research portal for clarity and precision
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto p-8 sm:p-12 flex flex-col justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-inter font-medium text-gray-500 hover:text-black transition-colors mb-8 w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        <Link href="/" className="inline-block mb-6">
          <img src="/primtime-biolabs-logo.svg" alt="Primetime Biolabs" className="h-8 w-auto brightness-0" />
        </Link>

        <p className="font-inter text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{eyebrow}</p>
        <h1 className="text-3xl font-michroma font-bold text-gray-900 mb-2">{title}</h1>
        <p className="font-inter text-gray-500 text-sm mb-8">{subtitle}</p>

        {children}

        <p className="font-inter text-center text-sm text-gray-500 mt-8">
          {footerText}{" "}
          <Link href={footerLinkHref} className="text-black font-semibold hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </main>
  );
}
