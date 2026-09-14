"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Droplets,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { CalculatorHero } from "@/components/calculator/CalculatorHero";
import { CalculatorsHub } from "@/components/calculator/CalculatorsHub";
import { FadeUp } from "@/components/calculator/FadeUp";
import { motion } from "framer-motion";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const PEPTIDE_CALCULATOR_FAQS = [
  {
    question: "How much bacteriostatic water should I use to reconstitute a peptide?",
    answer:
      "Two to three millilitres suits most vials. More diluent lowers the concentration and raises the volume you draw, which improves measurement precision. Less diluent concentrates the solution and makes small measurement errors proportionally larger. Enter both values into the calculator above to see the effect.",
  },
  {
    question: "What is the peptide reconstitution formula?",
    answer:
      "Divide the target quantity in micrograms by the total peptide in the vial in micrograms, then multiply by the diluent volume in millilitres. The result is the volume to draw. For a 5 mg vial in 2 mL, drawing 250 mcg: (250 ÷ 5,000) × 2 = 0.1 mL.",
  },
  {
    question: "What is the difference between bacteriostatic and sterile water?",
    answer:
      "Bacteriostatic water contains 0.9% benzyl alcohol, which suppresses bacterial growth and allows a vial to be drawn from repeatedly. Sterile water contains no preservative, so it suits single-use preparation only. Using sterile water in a multi-use vial lets contamination grow.",
  },
  {
    question: "Why should you never shake a reconstituted peptide vial?",
    answer:
      "Shaking applies shear force and introduces foaming, and both damage peptide structure. The resulting degradation shows up as reduced purity in any subsequent analysis. Swirl the vial gently instead, and allow several minutes for a larger vial to dissolve fully.",
  },
  {
    question: "How long does a reconstituted peptide last?",
    answer:
      "Refrigerated at 4°C and kept away from light, reconstituted research peptides typically hold for 20 to 30 days. That range is indicative rather than universal, because stability depends heavily on the sequence, the solvent and how often the vial has been handled.",
  },
  {
    question: "Can you freeze a reconstituted peptide?",
    answer:
      "No. Freezing forms ice crystals that disrupt peptide structure, and thawing does not reverse the damage. Refrigerate reconstituted solution at 4°C instead. Lyophilised powder, by contrast, freezes at −20°C without issue and stores that way for years.",
  },
  {
    question: "How many units is 0.1 mL on a U-100 syringe?",
    answer:
      "Ten. A U-100 scale divides one millilitre into 100 graduations, so 0.1 mL reads as 10, 0.25 mL as 25 and 0.5 mL as 50. A U-40 scale divides the same millilitre into 40 graduations, so the same numbered mark holds 2.5 times as much. Check the scale printed on the barrel.",
  },
  {
    question: "Are these products intended for human consumption?",
    answer:
      "No. PrimeTime BioLabs supplies every product strictly for laboratory and in-vitro research by qualified professionals. These compounds are not drugs, dietary supplements or cosmetics. They are not intended for human or animal consumption, and they are not for diagnostic or therapeutic use of any kind. This calculator performs dilution arithmetic for laboratory preparation only.",
  },
];

export default function PeptideCalculatorPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen relative overflow-x-clip">
      {/* HERO */}
      <CalculatorHero />

      {/* CALCULATORS HUB */}
      <div className="relative z-20 -mt-12 sm:-mt-24">
        <div id="calculators-hub" className="scroll-mt-32">
          <CalculatorsHub />
        </div>
      </div>

      {/* Page-level disclaimer, directly beneath the calculator output */}
      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto -mt-8 sm:-mt-12 mb-8">
        <p className="font-inter text-center text-[11px] md:text-xs text-gray-400 leading-relaxed max-w-3xl mx-auto">
          This calculator performs dilution arithmetic for laboratory preparation. It returns concentration and
          volume, and it makes no recommendation regarding any use of any compound. Products supplied by PrimeTime
          BioLabs are intended strictly for laboratory and in-vitro research by qualified professionals. They are
          not drugs, dietary supplements or cosmetics, and they are not intended for human or animal consumption,
          or for diagnostic, therapeutic or preventive use of any kind.
        </p>
      </div>

      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto flex flex-col gap-32 md:gap-48 pb-32">
        {/* 01 — THE COST OF BAD MATH */}
        <section className="relative">
          <div className="absolute -top-20 -left-10 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            01
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-red-100">
                  <AlertTriangle className="w-4 h-4" /> The Risk
                </div>
                <h2 className="font-michroma text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 uppercase leading-[1.05] mb-6">
                  Precision is
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">
                    Non-Negotiable.
                  </span>
                </h2>
                <p className="font-inter text-lg text-gray-500 font-light leading-relaxed mb-8">
                  Whether you are working with a 2mg or 10mg vial, guessing your math leads to ruined protocols,
                  wasted resources, and inaccurate research data.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-black/10 to-transparent mb-8" />
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <TrendingDown className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                      <h4 className="font-inter font-bold text-gray-900 uppercase tracking-tight">Wasted Peptides</h4>
                      <p className="font-inter text-sm text-gray-500 mt-1">Over-diluting drops the working concentration far below what a study design needs.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
                    <div>
                      <h4 className="font-inter font-bold text-gray-900 uppercase tracking-tight">Data Integrity</h4>
                      <p className="font-inter text-sm text-gray-500 mt-1">Inconsistent measurement between preparations ruins long-term observational data.</p>
                    </div>
                  </li>
                </ul>
              </FadeUp>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8">
              <FadeUp delay={0.2}>
                <div className="relative w-full aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
                  <img
                    src="/gloves-holding-vial.png"
                    alt="Peptide vial preparation"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/40">
                    <h3 className="font-michroma font-bold text-xl text-gray-900 uppercase mb-2">The Solution? Automation.</h3>
                    <p className="font-inter text-sm text-gray-600">
                      Our calculator removes human error entirely. Input your variables, get exact syringe units instantly.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 02 — RECONSTITUTION PROCESS */}
        <section className="relative">
          <div className="absolute -top-20 right-0 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            02
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <FadeUp>
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-michroma font-bold text-xl uppercase text-gray-900">Step 1: Prep</h3>
                    <span className="text-indigo-600/20 font-black text-5xl">01</span>
                  </div>
                  <p className="font-inter text-gray-500 mb-6">
                    Wipe the rubber stoppers of both the peptide vial and bacteriostatic water with an alcohol swab.
                    Wait 30 seconds for it to dry completely — the wait is not optional. Alcohol needs contact time
                    to work, and piercing a wet stopper carries residue straight into the vial.
                  </p>
                  <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center text-gray-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-transform duration-500 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-michroma font-bold text-xl uppercase">Step 2: Transfer</h3>
                    <span className="text-white/10 font-black text-5xl">02</span>
                  </div>
                  <p className="font-inter text-white/60 mb-6">
                    Draw the exact amount of bacteriostatic water. Inject it into the peptide vial slowly, aiming for
                    the glass wall, not the powder directly — directing the stream at the lyophilised cake drives
                    mechanical stress through the peptide chain, while running it down the wall lets the solvent
                    reach the powder gently.
                  </p>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Droplets className="w-5 h-5" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-michroma font-bold text-xl uppercase text-gray-900">Step 3: Dissolve</h3>
                    <span className="text-indigo-600/20 font-black text-5xl">03</span>
                  </div>
                  <p className="font-inter text-gray-500 mb-6">
                    Do not shake. Gently swirl the vial in a circular motion until the powder is completely dissolved
                    and the liquid is perfectly clear. Shaking introduces shear force and foaming that degrade
                    peptide structure — full dissolution can take several minutes with a larger vial, so let it
                    take them. If the solution stays cloudy after prolonged gentle swirling, stop and contact us
                    with the batch number rather than proceeding.
                  </p>
                  <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center text-gray-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="lg:sticky lg:top-32 h-fit order-1 lg:order-2">
              <FadeUp>
                <h2 className="font-inter text-sm uppercase tracking-[0.2em] text-indigo-600 mb-6 font-bold flex items-center gap-3">
                  <span className="w-8 h-px bg-indigo-600" />
                  Reconstitution Guide
                </h2>
                <h2 className="font-michroma text-4xl md:text-6xl font-bold text-gray-900 uppercase leading-[1.05] mb-8">
                  The Perfect
                  <br />
                  Mix.
                </h2>
                <p className="font-inter text-lg text-gray-500 font-light leading-relaxed mb-10">
                  Peptides are delicate amino acid chains. Rough handling during the reconstitution process can break
                  these bonds, rendering the compound useless.
                </p>

                <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                  <h4 className="font-inter font-bold uppercase tracking-widest text-xs text-gray-400 mb-6">
                    Variables Required
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="font-inter font-bold text-gray-900">Vial Size</span>
                      <span className="font-inter text-gray-400 ml-auto">Total mg</span>
                    </li>
                    <li className="flex items-center gap-4 border-t border-black/5 pt-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="font-inter font-bold text-gray-900">BAC Water</span>
                      <span className="font-inter text-gray-400 ml-auto">Volume (mL)</span>
                    </li>
                    <li className="flex items-center gap-4 border-t border-black/5 pt-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="font-inter font-bold text-gray-900">Target Quantity</span>
                      <span className="font-inter text-gray-400 ml-auto">Per aliquot, mcg/mg</span>
                    </li>
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 03 — READING A U-100 SYRINGE */}
        <section className="relative">
          <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="absolute -top-10 -left-6 md:-top-20 md:-left-10 text-[200px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
              03
            </div>

            <FadeUp className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Reading a U-100 Syringe
                </h2>
                <p className="font-inter text-gray-500 text-lg">
                  The most common mistake is confusing &quot;Units&quot; with &quot;mL&quot; or &quot;mg&quot;. A
                  standard U-100 insulin syringe holds 1mL of liquid, which is divided into 100 units.
                </p>
              </div>

              <div className="w-full max-w-4xl mx-auto mb-16">
                <div className="relative h-24 md:h-32 bg-[#FAFAFA] border-2 border-black/10 rounded-full overflow-hidden flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "10%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-indigo-600/80 to-indigo-600 flex items-center justify-end pr-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]"
                  >
                    <span className="text-white font-black text-xl hidden sm:block">10 U</span>
                  </motion.div>

                  <div className="absolute inset-0 flex justify-between px-[5%] items-end pb-2">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((unit) => (
                      <div key={unit} className="flex flex-col items-center gap-1">
                        <div className="w-px h-6 bg-black/20" />
                        <span className="font-inter text-[10px] font-bold text-gray-400 hidden md:block">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="font-inter flex justify-between mt-6 text-sm font-bold uppercase tracking-widest text-gray-400 px-[5%]">
                  <span>0 Units (0mL)</span>
                  <span>100 Units (1mL)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { ml: "0.1mL", unit: "10 Units" },
                  { ml: "0.25mL", unit: "25 Units" },
                  { ml: "0.5mL", unit: "50 Units" },
                  { ml: "1.0mL", unit: "100 Units" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAFAFA] border border-black/5 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="font-michroma text-2xl font-bold text-gray-900 mb-1">{item.ml}</div>
                    <div className="font-inter text-xs font-bold text-indigo-600 uppercase tracking-widest">
                      Equals {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 04 — THE MATHEMATICS OF RECONSTITUTION */}
        <section className="relative">
          <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="absolute -top-10 -right-6 md:-top-20 md:-right-10 text-[200px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
              04
            </div>

            <FadeUp className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  The Reconstitution Formula
                </h2>
                <p className="font-inter text-gray-500 text-lg">
                  Understanding the formula behind the calculator is critical. It allows you to verify your math and
                  ensure complete measurement accuracy.
                </p>
              </div>

              <div className="bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full text-center md:text-left">
                  <h3 className="font-inter font-bold uppercase tracking-widest text-indigo-600 text-sm mb-4">
                    The Universal Formula
                  </h3>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 font-mono text-base md:text-xl font-bold text-gray-900 flex flex-wrap items-center justify-center md:justify-start gap-y-2">
                    <span className="text-indigo-600 mr-1">(</span>Target Quantity{" "}
                    <span className="text-gray-400 text-sm mx-2 italic">in mcg</span>
                    <span className="text-indigo-600 mx-1">/</span> Total Peptide{" "}
                    <span className="text-gray-400 text-sm mx-2 italic">in mcg</span>
                    <span className="text-indigo-600 ml-1">)</span> <span className="mx-3 text-gray-400">×</span>{" "}
                    Volume <span className="text-gray-400 text-sm mx-2 italic">in mL</span>{" "}
                    <span className="mx-3 text-gray-400">=</span> Draw
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mx-auto">
                  <Calculator className="w-8 h-8 text-indigo-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-black/5">
                  <h4 className="font-inter font-bold text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600" /> Example Scenario
                  </h4>
                  <ul className="font-inter space-y-4 text-gray-600">
                    <li className="flex justify-between border-b border-black/5 pb-2">
                      <strong>Vial Size:</strong> <span>5mg (5,000mcg)</span>
                    </li>
                    <li className="flex justify-between border-b border-black/5 pb-2">
                      <strong>BAC Water Added:</strong> <span>2mL</span>
                    </li>
                    <li className="flex justify-between">
                      <strong>Target Quantity:</strong> <span>250mcg per aliquot</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-8 rounded-[2rem] text-white">
                  <h4 className="font-inter font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" /> The Calculation
                  </h4>
                  <p className="font-mono text-white/80 mb-6 text-lg">
                    (250 ÷ 5,000) × 2mL = <span className="font-bold text-white">0.1mL</span>
                  </p>
                  <div className="bg-white/10 p-5 rounded-xl text-center">
                    <span className="font-inter text-xs uppercase tracking-widest text-white/60 block mb-1">
                      Final Syringe Draw
                    </span>
                    <span className="font-michroma font-bold text-2xl text-indigo-400">10 Units</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-8 md:p-10">
                <h4 className="font-inter font-bold text-gray-900 uppercase tracking-tight mb-3 text-sm">
                  Why the Volume Changes the Answer
                </h4>
                <p className="font-inter text-gray-500 leading-relaxed">
                  The quantity of peptide in the vial is fixed. Adding more diluent does not add or remove peptide
                  — it spreads the same quantity across a larger volume, so the concentration falls and the volume
                  you draw rises. That matters for measurement precision: a very concentrated solution means
                  drawing a tiny volume, where small measurement errors become large proportional errors.
                  Over-diluting wastes vial capacity. Two to three millilitres per vial suits most working ranges.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 05 — DILUTION GUIDELINES */}
        <section className="relative">
          <div className="absolute -top-20 -left-10 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            05
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Dilution Reference Table
                </h2>
                <p className="font-inter text-gray-500 text-lg max-w-3xl mx-auto">
                  Five common vial-and-diluent combinations, each showing the resulting concentration and the
                  volume containing 250 mcg. All figures below are verified against the formula in the previous
                  section.
                </p>
              </div>

              <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-black/5 shadow-xl overflow-x-auto">
                <table className="w-full text-left min-w-[600px] font-inter">
                  <thead>
                    <tr className="border-b-2 border-black/10">
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Vial Size</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">BAC Water Volume</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Resulting Concentration</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Example: 250mcg Dose</th>
                    </tr>
                  </thead>
                  <tbody className="text-base font-medium">
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-6 px-4 text-gray-900 font-bold text-xl">2mg</td>
                      <td className="py-6 px-4 text-gray-500">1mL</td>
                      <td className="py-6 px-4 text-gray-500">2mg per mL</td>
                      <td className="py-6 px-4 font-bold text-indigo-600">12.5 Units (0.125mL)</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-6 px-4 text-gray-900 font-bold text-xl">5mg</td>
                      <td className="py-6 px-4 text-gray-500">2mL</td>
                      <td className="py-6 px-4 text-gray-500">2.5mg per mL</td>
                      <td className="py-6 px-4 font-bold text-indigo-600">10 Units (0.1mL)</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-6 px-4 text-gray-900 font-bold text-xl">10mg</td>
                      <td className="py-6 px-4 text-gray-500">2mL</td>
                      <td className="py-6 px-4 text-gray-500">5mg per mL</td>
                      <td className="py-6 px-4 font-bold text-indigo-600">5 Units (0.05mL)</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-6 px-4 text-gray-900 font-bold text-xl">10mg</td>
                      <td className="py-6 px-4 text-gray-500">3mL</td>
                      <td className="py-6 px-4 text-gray-500">3.33mg per mL</td>
                      <td className="py-6 px-4 font-bold text-indigo-600">7.5 Units (0.075mL)</td>
                    </tr>
                    <tr className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-6 px-4 text-gray-900 font-bold text-xl">30mg</td>
                      <td className="py-6 px-4 text-gray-500">3mL</td>
                      <td className="py-6 px-4 text-gray-500">10mg per mL</td>
                      <td className="py-6 px-4 font-bold text-indigo-600">2.5 Units (0.025mL)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-inter text-gray-500 text-sm max-w-3xl mx-auto mt-6 text-center">
                Notice the last row. At 10 mg/mL, 250 mcg occupies 0.025 mL — two and a half graduations. Precision
                at that scale is poor. More diluent would measure better.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 06 — STORAGE MASTERCLASS */}
        <section className="relative">
          <div className="absolute -top-20 right-0 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            06
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Storing Peptides Before and After Reconstitution
                </h2>
                <p className="font-inter text-gray-500 text-lg max-w-2xl mx-auto">
                  Lyophilised powder and reconstituted solution behave very differently. The figures below are
                  typical ranges for research peptides, not guarantees for any specific compound — confirm against
                  your own stability data and the compound&apos;s Certificate of Analysis.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              <FadeUp>
                <div className="bg-white rounded-[3rem] p-10 md:p-12 border border-black/5 shadow-xl h-full hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center mb-8 text-gray-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-michroma text-3xl font-bold text-gray-900 uppercase mb-4">
                    Lyophilized
                    <br />
                    <span className="text-xl text-gray-400 tracking-widest">Powder</span>
                  </h3>
                  <p className="font-inter text-gray-600 mb-8 font-light">
                    In their dry, freeze-dried state, peptides are highly stable and can last for extended periods.
                  </p>
                  <ul className="font-inter space-y-4 font-medium">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Room Temp: ~30-60 Days
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Refrigerated (4°C): ~2-3 Years
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Frozen (-20°C): ~3-5 Years
                    </li>
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-zinc-900 rounded-[3rem] p-10 md:p-12 border border-white/5 shadow-2xl h-full text-white hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 text-white/80">
                    <Droplets className="w-8 h-8" />
                  </div>
                  <h3 className="font-michroma text-3xl font-bold text-white uppercase mb-4">
                    Reconstituted
                    <br />
                    <span className="text-xl text-white/40 tracking-widest">Liquid</span>
                  </h3>
                  <p className="font-inter text-white/60 mb-8 font-light">
                    Once mixed with bacteriostatic water, ice crystal formation and repeated handling become the
                    real risks. Freezing a reconstituted vial disrupts peptide structure irreversibly.
                  </p>
                  <ul className="font-inter space-y-4 font-medium text-white/90">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Refrigerated (4°C): ~20-30 Days
                    </li>
                    <li className="flex items-center gap-3 text-red-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Never Freeze After Mixing!
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Keep away from direct light.
                    </li>
                  </ul>
                  <p className="font-inter text-white/40 text-xs leading-relaxed mt-6 pt-6 border-t border-white/10">
                    Record the reconstitution date on the label. Stability varies by sequence, so confirm these
                    ranges against your own data and the compound&apos;s{" "}
                    <Link href="/certificates" className="text-white/70 underline hover:text-white transition-colors">
                      Certificate of Analysis
                    </Link>
                    .
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 07 — THE 3 FATAL MISTAKES */}
        <section className="relative">
          <div className="absolute -top-20 -left-10 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            07
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Three Handling Errors That Ruin a Vial
                </h2>
                <p className="font-inter text-gray-500 text-lg max-w-2xl mx-auto">
                  Peptides are notoriously fragile. Avoid these three common errors that ruin research compounds.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-xl mb-3">Shaking the Vial</h3>
                  <p className="font-inter text-gray-600">
                    Peptide chains are held together by bonds that shear under mechanical stress. Vigorous shaking
                    foams the solution and damages structure, which shows up as reduced purity on any subsequent
                    analysis. Swirl gently instead, and allow the time it takes.
                  </p>
                </div>
                <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-xl mb-3">Freezing Liquid</h3>
                  <p className="font-inter text-gray-600">
                    Freezing a reconstituted vial forms ice crystals that disrupt peptide structure, and the damage
                    does not reverse on thawing. Refrigerate at 4°C instead. Lyophilised powder freezes without
                    issue — solution does not.
                  </p>
                </div>
                <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-xl mb-3">The Wrong Diluent</h3>
                  <p className="font-inter text-gray-600">
                    Sterile water contains no preservative, so a multi-use vial reconstituted with it becomes a
                    growth medium. Bacteriostatic water contains 0.9% benzyl alcohol, which suppresses bacterial
                    growth over the working life of the vial. Check the label before you draw.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 08 — SYRINGE TYPES */}
        <section className="relative">
          <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="absolute -top-10 -right-6 md:-top-20 md:-right-10 text-[200px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
              08
            </div>

            <FadeUp className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                    <span className="text-indigo-600">U-100</span> vs U-40:
                    <br />
                    Why the Scale Matters
                  </h2>
                  <p className="font-inter text-gray-500 text-lg mb-8">
                    Not all syringes are created equal. Reading the wrong graduation scale is the single biggest
                    source of measurement error in reconstitution.
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-inter font-bold text-gray-900 uppercase">U-100 Syringes (Standard)</h4>
                        <p className="font-inter text-gray-500 text-sm mt-1">
                          Holds 100 graduations per 1mL. This calculator returns U-100 graduations, the scale used
                          throughout this page.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-1">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-inter font-bold text-gray-900 uppercase">U-40 Syringes</h4>
                        <p className="font-inter text-gray-500 text-sm mt-1">
                          Holds 40 graduations per 1mL. Read this calculator&apos;s U-100 result on a U-40 barrel and
                          you will measure 2.5x the intended volume, because each U-40 graduation holds 2.5 times
                          as much. Check the scale printed on the barrel before you measure anything.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] p-6 sm:p-8 rounded-[2rem] border border-black/5 text-center relative z-10">
                  <h4 className="font-inter font-bold text-gray-900 uppercase tracking-widest text-sm mb-8">
                    Visual Difference
                  </h4>

                  <div className="font-inter text-left font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-2 pl-4">
                    U-100 (0.5mL Volume)
                  </div>
                  <div className="relative h-12 sm:h-16 bg-white border-2 border-black/10 rounded-full overflow-hidden flex items-center mb-6">
                    <div className="w-1/2 h-full bg-green-500/20 border-r-2 border-green-500 flex items-center justify-end pr-4">
                      <span className="font-inter font-bold text-green-700 text-sm sm:text-base">50 Units</span>
                    </div>
                  </div>

                  <div className="font-inter text-left font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-2 pl-4 mt-6">
                    U-40 (0.5mL Volume)
                  </div>
                  <div className="relative h-12 sm:h-16 bg-white border-2 border-black/10 rounded-full overflow-hidden flex items-center">
                    <div className="w-2/5 h-full bg-red-500/20 border-r-2 border-red-500 flex items-center justify-end pr-4">
                      <span className="font-inter font-bold text-red-700 text-sm sm:text-base">20 Units</span>
                    </div>
                  </div>

                  <p className="font-inter text-[10px] sm:text-xs text-gray-400 mt-8 font-bold uppercase tracking-widest leading-relaxed">
                    Notice how 0.5mL is 50 units on U-100, but only 20 units on U-40.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 09 — SCIENCE OF DEGRADATION */}
        <section className="relative">
          <div className="relative z-10 bg-gray-900 rounded-[3rem] p-8 md:p-16 shadow-2xl text-white overflow-hidden">
            <div className="absolute -top-10 -left-6 md:-top-20 md:-left-10 text-[200px] md:text-[350px] font-black text-white/[0.03] tracking-tighter leading-none pointer-events-none select-none z-0">
              09
            </div>

            <FadeUp className="relative z-10">
              <div className="text-center mb-16 md:mb-20 relative z-20">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-white uppercase mb-6">
                  What Actually Drives Peptide Degradation
                </h2>
                <p className="font-inter text-white/60 text-lg max-w-2xl mx-auto">
                  Reconstituted peptides degrade over time, but no single decay curve applies across compounds.
                  Rate depends on the sequence, the solvent, the temperature, the light exposure and the number of
                  times the vial has been handled. Five factors do most of the work.
                </p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {[
                    { title: "Temperature", desc: "The dominant variable", sub: "Refrigerate reconstituted vials; never leave them at ambient", dot: "bg-red-500", border: "border-red-500/30" },
                    { title: "Freeze-Thaw Cycles", desc: "Each cycle damages structure", sub: "Do not freeze reconstituted solution at all", dot: "bg-amber-500", border: "border-amber-500/30" },
                    { title: "Light Exposure", desc: "Affects sensitive residues", sub: "Store in the original vial, in the dark", dot: "bg-lime-500", border: "border-lime-500/30" },
                    { title: "Oxidation", desc: "Residues oxidise on air contact", sub: "Minimise headspace and repeated stopper punctures", dot: "bg-blue-400", border: "border-blue-400/30" },
                    { title: "Sequence Composition", desc: "Some sequences are far more stable", sub: "Treat published ranges as indicative; confirm against your own data", dot: "bg-indigo-400", border: "border-indigo-400/30" },
                  ].map((point, idx) => (
                    <div key={idx} className="flex flex-col items-center group">
                      <div
                        className={`w-14 h-14 rounded-full bg-gray-900 border-[4px] ${point.border} flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110 shadow-2xl`}
                      >
                        <div className={`w-4 h-4 rounded-full ${point.dot} shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
                      </div>
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-[2rem] text-center w-full h-full shadow-2xl hover:bg-white/10 transition-colors">
                        <h4 className="font-michroma font-bold text-xl text-white mb-2">{point.title}</h4>
                        <div className="font-inter font-bold uppercase tracking-widest text-xs mb-3 text-white/50">
                          {point.desc}
                        </div>
                        <div className="w-full h-px bg-white/10 my-4" />
                        <p className="font-inter text-white/50 text-xs leading-relaxed">
                          {point.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-inter text-white/50 text-sm max-w-3xl mx-auto mt-12 text-center leading-relaxed">
                Because stability is sequence-specific, the practical approach is to date the vial at
                reconstitution, keep handling to a minimum, and generate your own stability data if your study
                design depends on it. A published curve is a starting assumption, not a measurement.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 10 — GLOSSARY */}
        <section className="relative">
          <div className="absolute -top-20 right-0 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            10
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Reconstitution Glossary
                </h2>
                <p className="font-inter text-gray-500 text-lg max-w-2xl mx-auto">
                  Master the terminology of peptide research to ensure complete accuracy in your protocols.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { term: "Lyophilised", def: "Freeze-dried. Water is removed under vacuum from a frozen solution, leaving a dry cake that stores far longer than solution." },
                  { term: "Bacteriostatic Water", def: "Sterile water containing 0.9% benzyl alcohol, which suppresses bacterial growth and allows a reconstituted vial to be drawn from more than once." },
                  { term: "Sterile Water", def: "Sterile water with no preservative. Suitable for single-use preparation only, since nothing inhibits growth after the stopper is first pierced." },
                  { term: "Working Concentration", def: "The quantity of peptide per unit volume after reconstitution, usually expressed in mg/mL or mcg/mL. This is what the calculator returns." },
                  { term: "Aliquot", def: "A measured portion drawn from a larger volume of solution." },
                  { term: "mg vs mcg", def: "1 milligram (mg) equals 1,000 micrograms (mcg). This conversion causes more errors than any other." },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-[2rem] border border-black/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
                  >
                    <h4 className="font-inter font-bold text-indigo-600 uppercase tracking-widest text-sm mb-4">
                      {item.term}
                    </h4>
                    <p className="font-inter text-gray-600 font-medium leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <FAQSection
        title={
          <>
            Peptide Reconstitution <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">FAQs</span>
          </>
        }
        subtitle="Answers to the questions researchers actually ask about reconstitution, storage and measurement."
        faqs={PEPTIDE_CALCULATOR_FAQS}
      />

      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto py-16 text-center">
        <p className="font-inter text-gray-500 text-sm md:text-base">
          Every peptide in our catalogue arrives as lyophilised powder with the Certificate of Analysis for its
          batch.{" "}
          <Link href="/shop" className="text-indigo-600 font-bold hover:underline">
            Shop research peptides
          </Link>{" "}
          or{" "}
          <Link href="/certificates" className="text-indigo-600 font-bold hover:underline">
            view Certificates of Analysis
          </Link>
          .
        </p>
      </div>

      <Footer />
    </main>
  );
}
