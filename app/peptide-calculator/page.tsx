"use client";

import React, { useMemo, useState } from "react";
import { Calculator, FlaskConical, Syringe } from "lucide-react";
import Footer from "@/components/Footer";

export default function PeptideCalculatorPage() {
  const [vialAmountMg, setVialAmountMg] = useState("5");
  const [bacWaterMl, setBacWaterMl] = useState("2");
  const [desiredDoseMcg, setDesiredDoseMcg] = useState("250");

  const result = useMemo(() => {
    const vial = parseFloat(vialAmountMg);
    const water = parseFloat(bacWaterMl);
    const dose = parseFloat(desiredDoseMcg);

    if (!vial || !water || !dose || vial <= 0 || water <= 0 || dose <= 0) {
      return null;
    }

    const concentrationMcgPerMl = (vial * 1000) / water;
    const doseVolumeMl = dose / concentrationMcgPerMl;
    const insulinUnits = doseVolumeMl * 100; // 100 units = 1mL on a standard insulin syringe

    return {
      concentrationMcgPerMl,
      doseVolumeMl,
      insulinUnits,
    };
  }, [vialAmountMg, bacWaterMl, desiredDoseMcg]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-gray-200 overflow-hidden pt-40 pb-16 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
            Research Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2]">
            Peptide <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Calculator</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto">
            Calculate reconstitution concentration and syringe draw volume for research peptide preparations.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <FlaskConical className="w-5 h-5 text-indigo-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Reconstitution</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Peptide amount in vial (mg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={vialAmountMg}
                  onChange={(e) => setVialAmountMg(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Bacteriostatic water added (mL)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={bacWaterMl}
                  onChange={(e) => setBacWaterMl(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Desired dose (mcg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={desiredDoseMcg}
                  onChange={(e) => setDesiredDoseMcg(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Syringe className="w-5 h-5 text-indigo-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Draw Volume</h2>
            </div>

            {result ? (
              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Concentration</p>
                  <p className="text-2xl font-light text-white">
                    {result.concentrationMcgPerMl.toFixed(1)} <span className="text-sm text-gray-500">mcg/mL</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Volume to draw</p>
                  <p className="text-2xl font-light text-white">
                    {result.doseVolumeMl.toFixed(3)} <span className="text-sm text-gray-500">mL</span>
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Insulin syringe reading</p>
                  <p className="text-4xl font-michroma text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {result.insulinUnits.toFixed(1)} <span className="text-lg text-gray-500 font-sans">units</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-2">Based on a standard 100-unit (1mL) insulin syringe.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center py-8">
                <p className="text-gray-500 text-sm flex flex-col items-center gap-3">
                  <Calculator className="w-8 h-8 text-gray-700" strokeWidth={1} />
                  Enter valid values to calculate draw volume.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="max-w-3xl mx-auto text-center text-xs text-gray-600 mt-10 leading-relaxed">
          This calculator is provided for laboratory research reference only. All products are for research use only and are not
          intended for human or animal consumption.
        </p>
      </section>

      <Footer />
    </main>
  );
}
