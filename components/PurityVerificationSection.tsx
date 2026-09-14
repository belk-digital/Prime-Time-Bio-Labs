"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COA_CONTENTS = [
  "Product name and peptide sequence",
  "Batch or lot number",
  "Molecular formula and theoretical molecular weight",
  "HPLC purity result, with chromatogram",
  "MS identity result, with observed mass",
  "Appearance, solubility and salt form",
  "Testing laboratory, analyst and date of analysis",
];

const SPEC_TABLE: Array<[string, string]> = [
  ["Minimum HPLC purity", "≥99% (main peak, % total area)"],
  ["Identity confirmation", "Mass spectrometry, observed vs theoretical mass"],
  ["Testing party", "Independent third-party laboratory"],
  ["COA coverage", "Every batch, every product"],
  ["COA contents", "Purity %, chromatogram, batch number, MS result, analyst, date"],
  ["Physical form", "Lyophilised powder, sealed vial"],
  ["Country of synthesis", "United States"],
  ["Shipping", "Insulated, coolant-packed, expedited"],
  ["Intended use", "In-vitro laboratory research only (RUO)"],
  ["Custom synthesis", "Available on request — sequence, purity and quantity to specification"],
];

export default function PurityVerificationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pv-block",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="pv-block mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-michroma font-bold uppercase tracking-wider mb-6">
            How We Verify Every Batch <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">to ≥99% Purity</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Purity claims mean nothing without the chromatogram behind them. Every production batch goes to an
            independent analytical laboratory before it reaches inventory, and the results travel with the
            product. If a batch does not clear ≥99%, it does not ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="pv-block">
            <h3 className="text-lg font-michroma uppercase tracking-wider text-gray-900 mb-3">
              HPLC Purity Analysis
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              High-performance liquid chromatography separates the target peptide from synthesis by-products,
              truncated sequences and residual reagents. The area of the main peak, as a percentage of total peak
              area, gives the purity figure that appears on the Certificate of Analysis — chromatogram included,
              so you can inspect peak shape and impurity profile rather than trust a single number.
            </p>
          </div>
          <div className="pv-block">
            <h3 className="text-lg font-michroma uppercase tracking-wider text-gray-900 mb-3">
              Mass Spectrometry Identity Confirmation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              HPLC tells you how pure the sample is; mass spectrometry tells you what it actually is. The
              instrument measures molecular mass and compares it against the theoretical mass calculated from the
              sequence. When observed and theoretical masses agree within tolerance, identity holds — a batch
              that clears both tests carries documented purity and documented identity.
            </p>
          </div>
          <div className="pv-block">
            <h3 className="text-lg font-michroma uppercase tracking-wider text-gray-900 mb-3">
              What a Certificate of Analysis Shows
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Every COA we issue is a single-page document tied to one batch. It records:
            </p>
            <ul className="space-y-1.5">
              {COA_CONTENTS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pv-block text-center mb-10">
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Sample Certificates of Analysis
          </Link>
        </div>

        <div className="pv-block">
          <h3 className="text-xl md:text-2xl font-michroma uppercase tracking-wider text-gray-900 mb-6 text-center">
            Our Testing Standard at a Glance
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100/70">
                  <th scope="col" className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-gray-500">
                    Specification
                  </th>
                  <th scope="col" className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-gray-500">
                    PrimeTime BioLabs Standard
                  </th>
                </tr>
              </thead>
              <tbody>
                {SPEC_TABLE.map(([spec, value], i) => (
                  <tr key={spec} className={i % 2 === 1 ? "bg-gray-50" : undefined}>
                    <th scope="row" className="px-5 py-3 font-semibold text-gray-900 align-top whitespace-nowrap">
                      {spec}
                    </th>
                    <td className="px-5 py-3 text-gray-600 align-top">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
