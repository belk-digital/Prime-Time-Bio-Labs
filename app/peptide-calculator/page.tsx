"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Calculator,
  Droplets,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Scale,
  Sparkles,
  Info,
} from "lucide-react";
import { CalculatorHero } from "@/components/calculator/CalculatorHero";
import { CalculatorsHub } from "@/components/calculator/CalculatorsHub";
import { FadeUp } from "@/components/calculator/FadeUp";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const PEPTIDE_CALCULATOR_FAQS = [
  {
    question: "What is peptide reconstitution?",
    answer:
      "Peptide reconstitution is dissolving a lyophilized peptide powder in a measured volume of diluent to make a solution of known concentration. The vial's peptide mass is fixed by the manufacturer. You choose the volume of liquid you add, and those two numbers together determine the strength of the finished solution in mg/mL.",
  },
  {
    question: "How do you calculate peptide concentration?",
    answer:
      "Divide the peptide mass printed on the vial by the diluent volume you added. A 10 mg vial in 2 mL of bacteriostatic water gives 10 ÷ 2, which is 5 mg/mL. To express the same result in micrograms, multiply by 1,000, giving 5,000 mcg/mL. The calculator on this page runs both steps.",
  },
  {
    question: "How much bacteriostatic water do I add to a 5 mg vial?",
    answer:
      "There is no single correct volume, because the volume you choose is what sets the concentration. Adding 1 mL to a 5 mg vial gives 5 mg/mL. Adding 2 mL gives 2.5 mg/mL. Adding 3 mL gives roughly 1.67 mg/mL. Larger volumes produce lower concentrations and physically larger sample volumes to measure.",
  },
  {
    question: "How much bacteriostatic water do I add to a 10 mg vial?",
    answer:
      "Again, the volume is your decision and it determines the result. One milliliter gives 10 mg/mL, two milliliters give 5 mg/mL, and three milliliters give 3.33 mg/mL. Choose based on the measuring equipment you have. Lower concentrations mean bigger volumes, which most pipettes and graduated devices read more reliably.",
  },
  {
    question: "Does adding more water change the concentration?",
    answer:
      "Yes, and this catches people out. The peptide mass in the vial never changes, so adding diluent spreads that same mass across more liquid and lowers the concentration. A 5 mg vial at 2 mL sits at 2.5 mg/mL. Add another milliliter and it drops to roughly 1.67 mg/mL, so any earlier calculation is void.",
  },
  {
    question: "How long does a reconstituted peptide last?",
    answer:
      "Around 28 days at 2 °C to 8 °C is the working reference for a peptide reconstituted in bacteriostatic water. Sterile water gives a shorter window, since it has no preservative. Actual stability depends on the peptide sequence, how often the vial is opened, and how consistently it stays cold between uses.",
  },
  {
    question: "Can you freeze reconstituted peptides?",
    answer:
      "Generally avoid it for solutions made with bacteriostatic water. Freezing and thawing forms ice crystals that unfold and aggregate peptide, and repeated cycles compound the damage. If a solution must be held beyond its refrigerated window, split it into single-use aliquots first and thaw each one only once.",
  },
  {
    question: "Bacteriostatic water or sterile water, which should I use?",
    answer:
      "Bacteriostatic water suits any vial that will be entered more than once. Its 0.9 percent benzyl alcohol suppresses bacterial growth between uses. Sterile water contains no preservative, so it fits single-use preparations and peptides known to react badly with benzyl alcohol. For most multi-day laboratory work, bacteriostatic water is the standard choice.",
  },
  {
    question: "Why should you not shake peptides?",
    answer:
      "Shaking forces the solution against the air-water interface and creates foam. Peptides unfold at that interface, then clump together, and aggregated peptide does not return to its original state. Swirl the vial gently or roll it between your palms and leave it to dissolve on its own; patience costs nothing here.",
  },
  {
    question: "What does mg/mL mean?",
    answer:
      "Milligrams per milliliter states how much peptide mass sits in each milliliter of solution. A vial at 2.5 mg/mL contains 2.5 milligrams of peptide in every milliliter of liquid present. Because it is a ratio describing the whole solution, the figure holds for any portion you measure out of the vial.",
  },
  {
    question: "How do I convert 200 mcg to mg?",
    answer:
      "Divide by 1,000, so 200 mcg equals 0.2 mg. Going the other direction, multiply milligrams by 1,000 to get micrograms, which makes 0.2 mg equal to 200 mcg. Mixing these two units is a thousand-fold error, so write the unit alongside every number you record.",
  },
  {
    question: "Does this calculator tell me how much to use?",
    answer:
      "No, and that is intentional: this tool performs concentration math only, converting a vial mass and a diluent volume into mg/mL and mcg/mL. It produces no dose figures, volumes to measure out for any purpose, or usage guidance. All products and calculations here are for laboratory research use only.",
  },
];

const COMMON_VIAL_SIZES = [
  { vial: "2 mg", volume: "1 mL", concentration: "2 mg/mL (2,000 mcg/mL)" },
  { vial: "2 mg", volume: "2 mL", concentration: "1 mg/mL (1,000 mcg/mL)" },
  { vial: "2 mg", volume: "3 mL", concentration: "0.67 mg/mL (667 mcg/mL)" },
  { vial: "3 mg", volume: "1 mL", concentration: "3 mg/mL (3,000 mcg/mL)" },
  { vial: "3 mg", volume: "2 mL", concentration: "1.5 mg/mL (1,500 mcg/mL)" },
  { vial: "3 mg", volume: "3 mL", concentration: "1 mg/mL (1,000 mcg/mL)" },
  { vial: "5 mg", volume: "1 mL", concentration: "5 mg/mL (5,000 mcg/mL)" },
  { vial: "5 mg", volume: "2 mL", concentration: "2.5 mg/mL (2,500 mcg/mL)" },
  { vial: "5 mg", volume: "3 mL", concentration: "1.67 mg/mL (1,667 mcg/mL)" },
  { vial: "10 mg", volume: "1 mL", concentration: "10 mg/mL (10,000 mcg/mL)" },
  { vial: "10 mg", volume: "2 mL", concentration: "5 mg/mL (5,000 mcg/mL)" },
  { vial: "10 mg", volume: "3 mL", concentration: "3.33 mg/mL (3,333 mcg/mL)" },
  { vial: "15 mg", volume: "1 mL", concentration: "15 mg/mL (15,000 mcg/mL)" },
  { vial: "15 mg", volume: "2 mL", concentration: "7.5 mg/mL (7,500 mcg/mL)" },
  { vial: "15 mg", volume: "3 mL", concentration: "5 mg/mL (5,000 mcg/mL)" },
  { vial: "30 mg", volume: "1 mL", concentration: "30 mg/mL (30,000 mcg/mL)" },
  { vial: "30 mg", volume: "2 mL", concentration: "15 mg/mL (15,000 mcg/mL)" },
  { vial: "30 mg", volume: "3 mL", concentration: "10 mg/mL (10,000 mcg/mL)" },
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

      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto flex flex-col gap-32 md:gap-48 pb-32">
        {/* 01 — ONE DECIMAL DECIDES EVERY NUMBER THAT FOLLOWS */}
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
                  One decimal decides every number that follows
                </h2>
                <p className="font-inter text-lg text-gray-500 font-light leading-relaxed mb-8">
                  Reconstitution is where a vial gets its number. Every measurement you take from that vial afterward inherits it.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-black/10 to-transparent mb-8" />
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <TrendingDown className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                      <h3 className="font-inter font-bold text-gray-900 uppercase tracking-tight">Decimals Compound</h3>
                      <p className="font-inter text-sm text-gray-500 mt-1">
                        A misplaced decimal does not stay in one place. Write 0.5 mL where you meant 5 mL and the concentration is ten times off, silently, for the life of the vial. Each sample you measure out carries that error forward. So does every dilution you prepare from it, and every figure you write in the log.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
                    <div>
                      <h3 className="font-inter font-bold text-gray-900 uppercase tracking-tight">Unit Precision</h3>
                      <p className="font-inter text-sm text-gray-500 mt-1">
                        Mixing up milligrams and micrograms is worse. That mistake is off by a factor of 1,000.
                      </p>
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
                    <p className="font-michroma font-bold text-xl text-gray-900 uppercase mb-2">Good Practice</p>
                    <p className="font-inter text-sm text-gray-600">
                      Good practice here is unglamorous. Read the <Link href="/shop" className="text-indigo-600 font-semibold hover:underline">vial label</Link>, not your memory of it. Measure the diluent volume with a calibrated device. Run the calculation, then check it against the batch <Link href="/certificates" className="text-indigo-600 font-semibold hover:underline">Certificate of Analysis</Link> before anything goes on paper.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 02 — HOW TO RECONSTITUTE PEPTIDES IN THREE STEPS */}
        <section className="relative">
          <div className="absolute -top-20 right-0 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            02
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <FadeUp>
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-michroma font-bold text-xl uppercase text-gray-900">Step 1. Prep</h3>
                    <span className="text-indigo-600/20 font-black text-5xl">01</span>
                  </div>
                  <p className="font-inter text-gray-500 mb-6">
                    Let both the vial and the diluent sit until they reach room temperature. Wipe both stoppers with an alcohol swab and let them dry. Work on a clean, uncluttered surface with the calculation already done and written down. Knowing your target concentration before you open anything removes the guesswork later.
                  </p>
                  <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center text-gray-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-transform duration-500 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-michroma font-bold text-xl uppercase">Step 2. Transfer</h3>
                    <span className="text-white/10 font-black text-5xl">02</span>
                  </div>
                  <p className="font-inter text-white/60 mb-6">
                    Measure your chosen diluent volume accurately, then angle the vial and run the liquid slowly down the inside glass wall. A slow transfer matters, since a fast stream aimed straight at the powder drives shear and starts foaming, and both damage peptide structure. Keep the vial upright once the transfer is complete.
                  </p>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Droplets className="w-5 h-5" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-michroma font-bold text-xl uppercase text-gray-900">Step 3. Dissolve</h3>
                    <span className="text-indigo-600/20 font-black text-5xl">03</span>
                  </div>
                  <p className="font-inter text-gray-500 mb-6">
                    Swirl the vial gently, or roll it between your palms. Then wait for the powder to dissolve on its own. Most lyophilized peptides need only a few minutes, and some need longer. Shaking is the one thing to avoid completely. If the solution stays cloudy or leaves visible particles after it has had time to settle, treat the vial as compromised.
                  </p>
                  <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center text-gray-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="lg:sticky lg:top-32 h-fit order-1 lg:order-2">
              <FadeUp>
                <div className="font-inter text-sm uppercase tracking-[0.2em] text-indigo-600 mb-6 font-bold flex items-center gap-3">
                  <span className="w-8 h-px bg-indigo-600" />
                  Reconstitution Guide
                </div>
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase leading-[1.05] mb-8">
                  How to reconstitute peptides in three steps
                </h2>
                
                <div className="bg-indigo-50/50 p-6 md:p-8 rounded-[2rem] border border-indigo-100 mb-8">
                  <h3 className="font-inter font-bold uppercase tracking-widest text-xs text-indigo-600 mb-3">
                    TL;DR
                  </h3>
                  <p className="font-inter text-sm md:text-base text-gray-700 leading-relaxed">
                    Bring the vial and diluent to room temperature. Measure your chosen volume of <Link href="/shop" className="text-indigo-600 font-semibold hover:underline">bacteriostatic water</Link> into a sterile syringe or pipette. Transfer it slowly down the inside wall of the vial, letting it run onto the powder rather than jetting into it. Swirl gently, never shake, and leave it to dissolve on its own. Label the vial with the concentration and date, then store it cold.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                  <h3 className="font-inter font-bold uppercase tracking-widest text-xs text-gray-400 mb-4">
                    Choosing your water volume
                  </h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed mb-4">
                    Your diluent volume is a measuring decision. The vial mass is fixed, so volume is the only lever you have over concentration.
                  </p>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed mb-4">
                    More diluent gives a lower concentration. Each portion you measure out is physically larger, which makes it easier to measure accurately with ordinary lab equipment. Less diluent gives a higher concentration and smaller sample volumes, which saves space but demands finer measuring precision.
                  </p>
                  <p className="font-inter text-sm text-gray-500 font-medium leading-relaxed">
                    Neither option is correct in isolation. Pick the one that matches the measuring equipment you actually have and the volumes it reads reliably.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 03 — MILLIGRAMS, MICROGRAMS AND MILLILITERS ARE NOT INTERCHANGEABLE */}
        <section className="relative">
          <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="absolute -top-10 -left-6 md:-top-20 md:-left-10 text-[200px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
              03
            </div>

            <FadeUp className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Milligrams, micrograms and milliliters are not interchangeable
                </h2>
                <p className="font-inter text-gray-500 text-lg">
                  Three units do the work on this page, and two of them measure the same thing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-[#FAFAFA] border border-black/5 p-8 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-michroma font-bold text-lg mb-6">
                    mg
                  </div>
                  <h3 className="font-michroma text-xl font-bold text-gray-900 uppercase mb-3">Milligram (mg)</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    Milligram (mg) measures mass, the amount of peptide sitting in the vial. It is the number printed on the label.
                  </p>
                </div>

                <div className="bg-[#FAFAFA] border border-black/5 p-8 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-michroma font-bold text-lg mb-6">
                    mcg
                  </div>
                  <h3 className="font-michroma text-xl font-bold text-gray-900 uppercase mb-3">Microgram (mcg)</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    Microgram (mcg) also measures mass, just on a smaller scale. One milligram equals 1,000 micrograms. A 5 mg vial holds 5,000 mcg of peptide.
                  </p>
                </div>

                <div className="bg-[#FAFAFA] border border-black/5 p-8 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-michroma font-bold text-lg mb-6">
                    mL
                  </div>
                  <h3 className="font-michroma text-xl font-bold text-gray-900 uppercase mb-3">Milliliter (mL)</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    Milliliter (mL) measures volume, the amount of liquid. It describes the diluent you add and the solution you end up with. Volume tells you nothing about how much peptide is present on its own.
                  </p>
                </div>
              </div>

              <div className="max-w-4xl mx-auto bg-amber-50/60 border border-amber-200/70 p-6 md:p-8 rounded-[2rem]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-inter font-bold text-gray-900 uppercase text-sm tracking-wide mb-2">
                      The Factor of 1,000
                    </h3>
                    <p className="font-inter text-sm text-gray-700 leading-relaxed">
                      The mg and mcg confusion is the expensive one. Both measure mass, both start with the letter m, and they differ by a factor of 1,000. A number written as 250 is meaningless without its unit attached. Write the unit every time, on every label and in every log line, and the error has nowhere to hide.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 04 — THE MATH BEHIND EVERY RESULT ON THIS PAGE */}
        <section className="relative">
          <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="absolute -top-10 -right-6 md:-top-20 md:-right-10 text-[200px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
              04
            </div>

            <FadeUp className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  The math behind every result on this page
                </h2>
                <p className="font-inter text-gray-500 text-lg">
                  Define the terms first, then the formula reads itself.
                </p>
              </div>

              {/* Defined Terms */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-black/5 text-center">
                  <span className="font-inter text-xs uppercase font-bold text-indigo-600 tracking-wider block mb-2">Peptide Mass</span>
                  <p className="font-inter text-sm text-gray-600">The milligram figure printed on the vial (mg).</p>
                </div>
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-black/5 text-center">
                  <span className="font-inter text-xs uppercase font-bold text-indigo-600 tracking-wider block mb-2">Diluent Volume</span>
                  <p className="font-inter text-sm text-gray-600">The liquid volume you add (mL).</p>
                </div>
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-black/5 text-center">
                  <span className="font-inter text-xs uppercase font-bold text-indigo-600 tracking-wider block mb-2">Concentration</span>
                  <p className="font-inter text-sm text-gray-600">Peptide mass divided by diluent volume.</p>
                </div>
              </div>

              {/* Form One & Form Two */}
              <div className="bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-8 md:p-12 mb-12 flex flex-col gap-6">
                <div>
                  <h3 className="font-inter font-bold uppercase tracking-widest text-indigo-600 text-xs mb-3">
                    Form One
                  </h3>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 font-mono text-sm md:text-lg font-bold text-gray-900">
                    Concentration (mg/mL) = peptide mass in vial (mg) ÷ diluent volume (mL)
                  </div>
                </div>

                <div>
                  <h3 className="font-inter font-bold uppercase tracking-widest text-indigo-600 text-xs mb-3">
                    Form Two
                  </h3>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 font-mono text-sm md:text-lg font-bold text-gray-900">
                    Concentration (mcg/mL) = concentration (mg/mL) × 1,000
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-[2rem] border border-black/5">
                  <h3 className="font-inter font-bold text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600" /> Worked example
                  </h3>
                  <p className="font-inter text-sm text-gray-600 mb-4">
                    A 10 mg vial reconstituted with 3 mL of bacteriostatic water:
                  </p>
                  <div className="font-mono text-sm bg-[#FAFAFA] p-4 rounded-xl border border-black/5 text-gray-800 space-y-2">
                    <div>10 mg ÷ 3 mL = 3.33 mg/mL</div>
                    <div>3.33 mg/mL × 1,000 = 3,333 mcg/mL <span className="text-gray-400 text-xs">(carried from the unrounded 3.3333)</span></div>
                  </div>
                </div>

                <div className="bg-gray-900 p-8 rounded-[2rem] text-white">
                  <h3 className="font-inter font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" /> The canonical case
                  </h3>
                  <p className="font-inter text-sm text-white/70 mb-4">
                    A 5 mg vial reconstituted with 2 mL:
                  </p>
                  <div className="font-mono text-sm bg-white/10 p-4 rounded-xl text-white space-y-2">
                    <div>5 mg ÷ 2 mL = 2.5 mg/mL, which is 2,500 mcg/mL</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-8 md:p-10">
                <h3 className="font-inter font-bold text-gray-900 uppercase tracking-tight mb-3 text-sm">
                  Verify it yourself
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed mb-4">
                  Both forms are one operation each, so you can check any result the calculator gives you on paper in about ten seconds. Divide the label mass by the volume you added. Multiply by 1,000 for micrograms. If your figure and the tool&apos;s figure disagree, one of the two inputs was entered wrong.
                </p>
                <p className="font-inter text-gray-500 text-xs leading-relaxed border-t border-black/5 pt-4 mb-3">
                  A note on rounding: some divisions do not resolve cleanly, and 10 ÷ 3 is one of them. Values here are rounded to two decimal places for mg/mL and to the nearest whole number for mcg/mL.
                </p>
                <p className="font-inter text-gray-500 text-xs leading-relaxed border-t border-black/5 pt-3">
                  Every concentration figure on this page — all 18 table rows, the worked examples, and the calculator output — is computed from the two formulas above. Milligram values are rounded to two decimals, microgram values to whole numbers. The worked examples are cross-checked against the table.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 05 — COMMON VIAL SIZES AND WHAT EACH DILUENT VOLUME GIVES YOU */}
        <section className="relative">
          <div className="absolute -top-20 -left-10 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            05
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Common vial sizes and what each diluent volume gives you
                </h2>
                <p className="font-inter text-gray-500 text-lg max-w-3xl mx-auto mb-4">
                  Use this reconstitution chart to look up the concentration for common <Link href="/shop" className="text-indigo-600 font-semibold hover:underline">vial sizes</Link> and diluent combinations.
                </p>
                <p className="font-inter text-sm text-gray-400 max-w-2xl mx-auto">
                  <strong className="text-gray-700">How to read this table:</strong> Find your vial size in the first column, then the diluent volume you plan to add. The third column is the concentration of the finished solution. These are calculated figures for the stated inputs, not recommendations.
                </p>
              </div>

              <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-black/5 shadow-xl overflow-x-auto">
                <table className="w-full text-left min-w-[500px] font-inter">
                  <thead>
                    <tr className="border-b-2 border-black/10">
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Vial size</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Diluent volume</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Concentration</th>
                    </tr>
                  </thead>
                  <tbody className="text-base font-medium">
                    {COMMON_VIAL_SIZES.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-black/5 hover:bg-[#FAFAFA] transition-colors ${
                          idx === COMMON_VIAL_SIZES.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="py-4 px-4 text-gray-900 font-bold">{row.vial}</td>
                        <td className="py-4 px-4 text-gray-500">{row.volume}</td>
                        <td className="py-4 px-4 font-bold text-indigo-600">{row.concentration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-inter text-gray-500 text-xs max-w-3xl mx-auto mt-6 text-center">
                Three values are rounded from repeating decimals: 0.67, 1.67 and 3.33 mg/mL. The calculator carries the full precision.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 06 — COLD, DARK AND DATED, BEFORE AND AFTER MIXING */}
        <section className="relative">
          <div className="absolute -top-20 right-0 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            06
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Cold, dark and dated, before and after mixing
                </h2>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-16">
              <FadeUp>
                <div className="bg-white rounded-[3rem] p-10 md:p-12 border border-black/5 shadow-xl h-full hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center mb-8 text-gray-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-michroma text-2xl font-bold text-gray-900 uppercase mb-4">
                    Lyophilized powder (unopened)
                  </h3>
                  <ul className="font-inter space-y-4 text-gray-600 leading-relaxed text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span>Store sealed vials at 2 °C to 8 °C for routine holding. For long-term storage, keep them at -20 °C or colder.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span>Keep vials in their original carton or another opaque container. Light and moisture both degrade dry peptide, and a dry cake will pull water out of humid air through a punctured stopper.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span>Dry peptide is far more stable than peptide in solution. A properly stored, sealed lyophilized vial holds its integrity for months to years, where the same material in water is measured in weeks.</span>
                    </li>
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-zinc-900 rounded-[3rem] p-10 md:p-12 border border-white/5 shadow-2xl h-full text-white hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 text-white/80">
                    <Droplets className="w-8 h-8" />
                  </div>
                  <h3 className="font-michroma text-2xl font-bold text-white uppercase mb-4">
                    Reconstituted solution
                  </h3>
                  <ul className="font-inter space-y-4 text-white/80 leading-relaxed text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <span>Store at 2 °C to 8 °C immediately after mixing. Return the vial to the refrigerator between every use.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <span>Label the vial at the moment you reconstitute it, with the concentration and the date. An unlabeled vial in a shared fridge is an unusable vial.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <span>Keep it out of light and away from the refrigerator door, where the temperature swings most.</span>
                    </li>
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* Side by side comparison table */}
            <FadeUp delay={0.3}>
              <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 border border-black/5 shadow-xl overflow-x-auto">
                <h3 className="font-michroma text-xl font-bold text-gray-900 uppercase mb-6">
                  Side by side
                </h3>
                <table className="w-full text-left min-w-[600px] font-inter">
                  <thead>
                    <tr className="border-b-2 border-black/10">
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400 w-1/4">Property</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400 w-3/8">Lyophilized (dry)</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400 w-3/8">Reconstituted (in solution)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-bold">Storage temperature</td>
                      <td className="py-4 px-4 text-gray-600">2 °C to 8 °C routine, -20 °C or below long term</td>
                      <td className="py-4 px-4 text-gray-600">2 °C to 8 °C</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-bold">Typical stability window</td>
                      <td className="py-4 px-4 text-gray-600">Months to years, sealed and dry</td>
                      <td className="py-4 px-4 text-gray-600">Around 28 days at 2 °C to 8 °C in bacteriostatic water</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-bold">Light exposure</td>
                      <td className="py-4 px-4 text-gray-600">Keep dark</td>
                      <td className="py-4 px-4 text-gray-600">Keep dark</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-bold">Freezing</td>
                      <td className="py-4 px-4 text-gray-600">Suitable, and standard for long holding</td>
                      <td className="py-4 px-4 text-gray-600">Avoid for bacteriostatic water solutions</td>
                    </tr>
                    <tr className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 px-4 text-gray-900 font-bold">Main risk</td>
                      <td className="py-4 px-4 text-gray-600">Moisture ingress through the stopper</td>
                      <td className="py-4 px-4 text-gray-600">Microbial growth, aggregation, freeze-thaw damage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-inter text-gray-500 text-xs max-w-4xl mx-auto mt-6 text-center leading-relaxed">
                Stability windows vary by peptide sequence, diluent and handling. Treat the 28-day figure as a working reference for bacteriostatic water at refrigeration temperature, not a guarantee for every compound.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 07 — FIVE MISTAKES THAT RUIN A VIAL */}
        <section className="relative">
          <div className="absolute -top-20 -left-10 text-[250px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
            07
          </div>

          <div className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-6">
                  Five mistakes that ruin a vial
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-lg mb-3">Shaking it</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    Vigorous shaking forces peptide against the air-water interface and drives foaming. Both unfold peptide structure and push it toward aggregation. Swirl gently, then let time do the rest.
                  </p>
                </div>

                <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-lg mb-3">Jetting the diluent onto the powder</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    A fast stream aimed straight at the cake applies shear exactly where the material is most fragile. Run the liquid down the vial wall so it reaches the powder gently.
                  </p>
                </div>

                <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-lg mb-3">Topping up a vial that has already been reconstituted</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    Adding more diluent later changes the concentration of everything left in the vial. Your original figure is now wrong, and so is every record derived from it. If you need a lower concentration, prepare it as a separate dilution and label it separately.
                  </p>
                </div>

                <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-lg mb-3">Leaving it on the bench</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    Room temperature is the enemy of a reconstituted vial. Warmth accelerates hydrolysis and oxidation, and every hour out of the fridge is subtracted from the vial&apos;s usable life.
                  </p>
                </div>

                <div className="bg-purple-50 p-8 rounded-[2rem] border border-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-michroma font-bold text-gray-900 uppercase text-lg mb-3">Skipping the label</h3>
                  <p className="font-inter text-sm text-gray-600 leading-relaxed">
                    The concentration lives in your head for about a day. Write the mg/mL figure and the date on the vial before it goes anywhere. An unlabeled solution cannot be verified, so it should not be used.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 08 — WHAT MG/ML ACTUALLY TELLS YOU */}
        <section className="relative">
          <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="absolute -top-10 -right-6 md:-top-20 md:-right-10 text-[200px] md:text-[350px] font-black text-black/[0.02] tracking-tighter leading-none pointer-events-none select-none z-0">
              08
            </div>

            <FadeUp className="relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-gray-900 uppercase mb-8 text-center">
                  What mg/mL actually tells you
                </h2>

                <div className="bg-[#FAFAFA] border border-black/5 p-8 md:p-10 rounded-[2.5rem] mb-10">
                  <p className="font-inter text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    Concentration expressed as mg/mL is the mass of peptide contained in each milliliter of finished solution. A vial at 2.5 mg/mL holds 2.5 milligrams of peptide in every milliliter present. The figure describes the solution itself, so it holds true for any portion you measure out.
                  </p>
                  <p className="font-inter text-gray-700 text-base md:text-lg leading-relaxed">
                    One property surprises people: concentration does not change when you remove solution from the vial. Take out half and the remaining liquid is still 2.5 mg/mL, because mass and volume fall together. Concentration only moves when you alter the mass or the volume, and after reconstitution the only realistic way to move it is adding more diluent.
                  </p>
                </div>

                {/* Visual Difference Card */}
                <div className="bg-[#FAFAFA] p-6 sm:p-8 rounded-[2rem] border border-black/5 text-center relative z-10 mb-10">
                  <h3 className="font-inter font-bold text-gray-900 uppercase tracking-widest text-sm mb-8">
                    Visual Difference
                  </h3>

                  {/* Bar 1: 5 mg + 1 mL = 5 mg/mL (100%) */}
                  <div className="font-inter text-left font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-2 pl-4">
                    5 mg vial + 1 mL
                  </div>
                  <div
                    className="relative h-12 sm:h-16 bg-white border-2 border-black/10 rounded-full overflow-hidden flex items-center mb-6"
                    role="img"
                    aria-label="5 mg vial with 1 mL diluent yields 5 mg/mL concentration (100% relative scale)"
                  >
                    <div className="w-full h-full bg-indigo-600/20 border-r-2 border-indigo-600 flex items-center justify-end pr-4">
                      <span className="font-inter font-bold text-indigo-700 text-xs sm:text-base">5 mg/mL</span>
                    </div>
                  </div>

                  {/* Bar 2: 5 mg + 2 mL = 2.5 mg/mL (50%) */}
                  <div className="font-inter text-left font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-2 pl-4">
                    5 mg vial + 2 mL
                  </div>
                  <div
                    className="relative h-12 sm:h-16 bg-white border-2 border-black/10 rounded-full overflow-hidden flex items-center mb-6"
                    role="img"
                    aria-label="5 mg vial with 2 mL diluent yields 2.5 mg/mL concentration (50% relative scale)"
                  >
                    <div className="w-1/2 h-full bg-indigo-600/20 border-r-2 border-indigo-600 flex items-center justify-end pr-4">
                      <span className="font-inter font-bold text-indigo-700 text-xs sm:text-base">2.5 mg/mL</span>
                    </div>
                  </div>

                  {/* Bar 3: 5 mg + 3 mL = 1.67 mg/mL (33.33%) */}
                  <div className="font-inter text-left font-bold text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-2 pl-4">
                    5 mg vial + 3 mL
                  </div>
                  <div
                    className="relative h-12 sm:h-16 bg-white border-2 border-black/10 rounded-full overflow-hidden flex items-center"
                    role="img"
                    aria-label="5 mg vial with 3 mL diluent yields 1.67 mg/mL concentration (33% relative scale)"
                  >
                    <div className="w-[33.33%] h-full bg-indigo-600/20 border-r-2 border-indigo-600 flex items-center justify-end pr-3 sm:pr-4">
                      <span className="font-inter font-bold text-indigo-700 text-xs sm:text-base whitespace-nowrap">1.67 mg/mL</span>
                    </div>
                  </div>

                  <p className="font-inter text-[10px] sm:text-xs text-gray-400 mt-8 font-bold uppercase tracking-widest leading-relaxed">
                    Notice how the same 5 mg vial reads 5 mg/mL at 1 mL, but only 1.67 mg/mL at 3 mL.
                  </p>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 p-8 md:p-10 rounded-[2.5rem] mb-10">
                  <h3 className="font-michroma text-xl font-bold text-gray-900 uppercase mb-4">
                    Switching to mcg/mL
                  </h3>
                  <p className="font-inter text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                    Small concentrations are awkward to read in milligrams, so micrograms are often clearer. The conversion is one multiplication:
                  </p>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-200/50 font-mono text-sm md:text-base font-bold text-gray-900 mb-6">
                    Concentration (mcg/mL) = concentration (mg/mL) × 1,000
                  </div>
                  <h4 className="font-inter font-bold uppercase tracking-widest text-xs text-indigo-600 mb-2">
                    Worked micro-example
                  </h4>
                  <p className="font-inter text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                    A 2 mg vial in 3 mL of diluent gives 0.67 mg/mL once rounded. Carry the unrounded figure through the multiplication and it becomes 667 mcg/mL. Same solution, same measurement, different unit. Reading 667 is less error-prone than reading 0.67, which is the whole reason the second unit exists.
                  </p>
                  <p className="font-inter text-sm text-gray-600">
                    Going the other way, divide by 1,000. So 200 mcg/mL is 0.2 mg/mL.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 09 — WHAT ACTUALLY BREAKS A PEPTIDE DOWN */}
        <section className="relative">
          <div className="relative z-10 bg-gray-900 rounded-[3rem] p-8 md:p-16 shadow-2xl text-white overflow-hidden">
            <div className="absolute -top-10 -left-6 md:-top-20 md:-left-10 text-[200px] md:text-[350px] font-black text-white/[0.03] tracking-tighter leading-none pointer-events-none select-none z-0">
              09
            </div>

            <FadeUp className="relative z-10">
              <div className="text-center mb-16 md:mb-20 relative z-20">
                <h2 className="font-michroma text-4xl md:text-5xl font-bold text-white uppercase mb-6">
                  What actually breaks a peptide down
                </h2>
                <p className="font-inter text-white/60 text-lg max-w-2xl mx-auto">
                  Peptides degrade through chemistry, not through age alone. Five factors drive nearly all of it.
                </p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {[
                    {
                      title: "Temperature",
                      desc: "Heat accelerates hydrolysis",
                      sub: "Heat accelerates hydrolysis, the reaction that cleaves the peptide bond. Every degree above refrigeration shortens the usable life of a solution, and the effect compounds with time at temperature.",
                      dot: "bg-red-500",
                      border: "border-red-500/30",
                    },
                    {
                      title: "Freeze-thaw cycling",
                      desc: "Ice crystal formation",
                      sub: "Ice crystal formation concentrates solutes and creates new interfaces, both of which unfold and aggregate peptide. One freeze and one thaw is survivable for many sequences. Repeated cycling is not, which is why single-use aliquots exist.",
                      dot: "bg-amber-500",
                      border: "border-amber-500/30",
                    },
                    {
                      title: "Light",
                      desc: "Photo-oxidation",
                      sub: "Ultraviolet and visible light excite aromatic residues, tryptophan and tyrosine in particular, and set off photo-oxidation. Clear glass on an open shelf is the worst case.",
                      dot: "bg-lime-500",
                      border: "border-lime-500/30",
                    },
                    {
                      title: "Oxidation",
                      desc: "Air contact reactions",
                      sub: "Methionine and cysteine residues react readily with dissolved oxygen and trace metals. Headspace air in a part-used vial is a continuous oxygen supply, and each entry replenishes it.",
                      dot: "bg-blue-400",
                      border: "border-blue-400/30",
                    },
                    {
                      title: "Sequence itself",
                      desc: "Chemical fragility",
                      sub: "Some peptides are simply more fragile. Asparagine and glutamine deamidate, aspartate-glycine pairs undergo isomerization, and free cysteines form unwanted disulfide bridges. Two compounds stored side by side under identical conditions can hold up very differently.",
                      dot: "bg-indigo-400",
                      border: "border-indigo-400/30",
                    },
                  ].map((point, idx) => (
                    <div key={idx} className="flex flex-col items-center group">
                      <div
                        className={`w-14 h-14 rounded-full bg-gray-900 border-[4px] ${point.border} flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110 shadow-2xl`}
                      >
                        <div className={`w-4 h-4 rounded-full ${point.dot} shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
                      </div>
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-[2rem] text-center w-full h-full shadow-2xl hover:bg-white/10 transition-colors">
                        <h3 className="font-michroma font-bold text-xl text-white mb-2">{point.title}</h3>
                        <div className="font-inter font-bold uppercase tracking-widest text-xs mb-3 text-white/50">
                          {point.desc}
                        </div>
                        <div className="w-full h-px bg-white/10 my-4" />
                        <p className="font-inter text-white/70 text-xs leading-relaxed">
                          {point.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  Glossary
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    term: "Reconstitution",
                    def: "Reconstitution is the process of dissolving a lyophilized peptide powder in a liquid diluent to form a solution. The peptide mass in the vial does not change. The volume of diluent you add sets the concentration. Once dissolved, the material is handled and recorded as a solution with a known mass per milliliter.",
                  },
                  {
                    term: "Lyophilized",
                    def: "Lyophilized means freeze dried: the material is frozen, then water is drawn off under vacuum, leaving a dry cake or powder in the vial. Removing water slows the reactions that break peptides apart. A sealed lyophilized vial therefore stays stable far longer than the same peptide sitting in solution.",
                  },
                  {
                    term: "Diluent",
                    def: "A diluent is the liquid added to a lyophilized vial to dissolve its contents, usually bacteriostatic water or sterile water in peptide work. The diluent contributes volume, not peptide mass. Its measured volume is the denominator in every concentration calculation you run on that vial, which makes measuring it accurately essential.",
                  },
                  {
                    term: "Concentration",
                    def: "Concentration is the amount of peptide present per unit volume of solution, written as mass over volume in mg/mL or mcg/mL. It is a ratio, so it stays constant across the vial. Concentration changes only when the peptide mass or the liquid volume changes, not when solution is removed.",
                  },
                  {
                    term: "Bacteriostatic water",
                    def: "Bacteriostatic water is sterile water containing 0.9 percent benzyl alcohol, a preservative that suppresses bacterial growth. The preservative allows a sealed vial to be entered more than once without the contamination risk of plain water. Laboratories choose it when a reconstituted peptide will be sampled repeatedly across days or weeks.",
                  },
                  {
                    term: "Sterile water",
                    def: "Sterile water is purified water with no preservative added. Because it carries no bacteriostatic agent, a vial reconstituted with it has no defense against microbial growth once the stopper has been entered. It suits single-use preparations and peptides known to be incompatible with benzyl alcohol.",
                  },
                  {
                    term: "Aliquot",
                    def: "An aliquot is a measured portion taken from a larger volume of solution and stored separately. Splitting a reconstituted vial into aliquots lets you work from one small portion while the rest stays sealed. That limits how often the main stock is opened, warmed, or exposed to light and oxygen.",
                  },
                  {
                    term: "Working concentration",
                    def: "Working concentration is the mg/mL figure a vial holds after reconstitution, the number every later measurement from that vial depends on. It is fixed at the moment you add the diluent. Recording it on the vial label, alongside the date, is what makes the solution traceable afterward.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-[2rem] border border-black/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
                  >
                    <h3 className="font-inter font-bold text-indigo-600 uppercase tracking-widest text-sm mb-4">
                      {item.term}
                    </h3>
                    <p className="font-inter text-gray-600 font-medium text-xs leading-relaxed">{item.def}</p>
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
