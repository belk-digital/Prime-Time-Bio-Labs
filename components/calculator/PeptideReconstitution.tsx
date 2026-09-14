"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { FadeUp } from "@/components/calculator/FadeUp";
import { DynamicInput, DynamicSelect } from "@/components/calculator/DynamicFields";

type SyringeVolume = 0.3 | 0.5 | 1.0;
type MassUnit = "mg" | "mcg";

export function PeptideReconstitution() {
  const [peptideAmount, setPeptideAmount] = useState("5");
  const [waterMl, setWaterMl] = useState("2");
  const [desiredDose, setDesiredDose] = useState("250");
  const [doseUnit, setDoseUnit] = useState<MassUnit>("mcg");
  const [syringeVolume, setSyringeVolume] = useState<SyringeVolume>(1.0);

  const vAmt = parseFloat(peptideAmount) || 0;
  const wMl = parseFloat(waterMl) || 0;
  const dAmt = parseFloat(desiredDose) || 0;

  const totalPeptideMcg = vAmt * 1000;
  const targetDoseMcg = doseUnit === "mg" ? dAmt * 1000 : dAmt;

  const isValid = totalPeptideMcg > 0 && wMl > 0 && targetDoseMcg > 0;
  let concentrationStr = "—";
  let volumePerDoseStr = "—";
  let tickMarksStr = "0";
  let errorMsg = "";
  let fillPercentage = 0;
  const maxUnits = syringeVolume * 100;

  if (isValid) {
    const concentration = totalPeptideMcg / wMl;
    concentrationStr = `${concentration.toLocaleString(undefined, { maximumFractionDigits: 1 })} mcg/mL`;

    const volumePerDose = targetDoseMcg / concentration;
    volumePerDoseStr = `${volumePerDose.toLocaleString(undefined, { maximumFractionDigits: 3 })}mL`;

    const tickMarks = volumePerDose * 100;
    tickMarksStr = tickMarks.toLocaleString(undefined, { maximumFractionDigits: 1 });

    if (volumePerDose > syringeVolume) {
      errorMsg = `Dose exceeds syringe capacity (${volumePerDose.toFixed(2)}mL > ${syringeVolume}mL)`;
      tickMarksStr = "ERR";
      fillPercentage = 100;
    } else {
      fillPercentage = (tickMarks / maxUnits) * 100;
    }
  }

  const getSyringeTicks = () => {
    const steps = syringeVolume === 1.0 ? 10 : 5;
    const ticks: number[] = [];
    for (let i = maxUnits; i >= 0; i -= steps) ticks.push(i);
    return ticks;
  };

  return (
    <section className="w-full rounded-3xl bg-white p-4 sm:p-6 md:p-12 lg:p-16 border border-black/5 shadow-[0_20px_60px_rgb(0,0,0,0.05)] relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-20">
      {/* Left: Conversational Form */}
      <div className="flex-1 flex flex-col justify-center">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="font-inter text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Reconstitution Configurator
            </h2>
            <button
              type="button"
              onClick={() => {
                setPeptideAmount("5");
                setWaterMl("2");
                setDesiredDose("250");
                setSyringeVolume(1.0);
              }}
              className="w-8 h-8 rounded-full border border-black/10 hover:bg-black/5 flex items-center justify-center text-gray-400 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="font-inter text-2xl sm:text-3xl md:text-[2.5rem] font-light text-gray-900 tracking-tight leading-[1.7]">
            I have a <DynamicInput value={peptideAmount} onChange={setPeptideAmount} /> mg vial of research
            peptide. I will reconstitute it with <DynamicInput value={waterMl} onChange={setWaterMl} /> mL of
            bacteriostatic water. I need <DynamicInput value={desiredDose} onChange={setDesiredDose} minWidth={3} />
            <DynamicSelect
              value={doseUnit}
              onChange={(v) => setDoseUnit(v as MassUnit)}
              options={[
                { label: "mcg", value: "mcg" },
                { label: "mg", value: "mg" },
              ]}
            />{" "}
            per aliquot, measured on a
            <DynamicSelect
              value={syringeVolume}
              onChange={(v) => setSyringeVolume(parseFloat(v) as SyringeVolume)}
              options={[
                { label: "1.0mL", value: 1.0 },
                { label: "0.5mL", value: 0.5 },
                { label: "0.3mL", value: 0.3 },
              ]}
            />{" "}
            graduated syringe.
          </div>
        </FadeUp>
      </div>

      {/* Right: Result + Syringe */}
      <div className="w-full lg:w-[450px] shrink-0 flex flex-col gap-6">
        <FadeUp delay={0.2} className="h-full">
          <div className="bg-[#FAFAFA] rounded-2xl border border-black/5 p-8 md:p-10 flex flex-col items-center justify-between text-center h-full shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] min-h-[400px] relative">
            <div className="w-full text-center pb-6 border-b border-black/5">
              <div className="font-inter text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">
                Working Concentration
              </div>
              <div className="font-inter text-2xl font-bold text-gray-900">{concentrationStr}</div>
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-12 my-8">
              <div className="flex flex-col items-center">
                <h3 className="font-inter font-bold uppercase tracking-[0.2em] text-gray-400 text-[10px] mb-4">
                  Volume to Draw
                </h3>
                {errorMsg ? (
                  <div className="font-inter text-red-500 font-bold mb-4 text-sm max-w-[180px]">{errorMsg}</div>
                ) : (
                  <div className="relative w-full flex flex-col items-center">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={tickMarksStr}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-michroma text-5xl md:text-6xl text-indigo-600 tracking-tighter leading-none drop-shadow-sm mb-2"
                      >
                        {tickMarksStr}
                      </motion.div>
                    </AnimatePresence>
                    <div className="font-inter text-xs font-bold uppercase tracking-widest text-gray-400">
                      Units <span className="font-medium">({volumePerDoseStr})</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Syringe visualization */}
              <div className="relative h-[200px] w-12 flex justify-center shrink-0 mt-8 md:mt-0">
                <div className="absolute right-full mr-2 top-0 bottom-0 flex flex-col justify-between py-1 pointer-events-none text-right z-30">
                  {getSyringeTicks().map((tick, i) => (
                    <span
                      key={i}
                      className={`font-inter text-[10px] font-bold leading-none tracking-tighter ${
                        tick % (syringeVolume === 1.0 ? 20 : 10) === 0 ? "text-gray-400" : "text-transparent"
                      }`}
                    >
                      {tick}
                    </span>
                  ))}
                </div>

                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-[85%] z-20 flex flex-col items-center justify-end"
                  animate={{ bottom: `${fillPercentage}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  style={{ height: "120%" }}
                >
                  <div className="w-2 flex-1 bg-gradient-to-r from-zinc-200 to-zinc-300 border-x border-zinc-400 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-zinc-300 border border-zinc-400 rounded-sm shadow-sm" />
                  </div>
                  <div className="w-full h-3 bg-[#222] rounded-b-sm rounded-t-[1px] border-b-2 border-black flex flex-col items-center justify-evenly py-[1px] shadow-sm">
                    <div className="w-full h-px bg-white/10" />
                    <div className="w-full h-px bg-white/10" />
                  </div>
                </motion.div>

                <div className="w-full h-full border-2 border-black/10 relative bg-white/40 backdrop-blur-sm overflow-hidden flex flex-col justify-end z-20 rounded-t-sm shadow-sm">
                  <motion.div
                    className={`w-full ${errorMsg ? "bg-red-500/80" : "bg-indigo-600/90"} relative z-30 border-t border-white/40`}
                    initial={{ height: 0 }}
                    animate={{ height: `${fillPercentage}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    style={{ originY: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent mix-blend-overlay" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none z-50">
                    {getSyringeTicks().map((tick, i) => {
                      const isMajor = tick % (syringeVolume === 1.0 ? 20 : 10) === 0;
                      const isMid = tick % (syringeVolume === 1.0 ? 10 : 5) === 0;
                      let width = "w-[30%]";
                      if (isMajor) width = "w-[80%]";
                      else if (isMid) width = "w-[50%]";
                      return (
                        <div key={i} className="flex items-center gap-1 w-full">
                          <div className={`h-px bg-black/30 ${width}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="absolute top-full flex flex-col items-center z-20">
                  <div className="w-4 h-2 bg-orange-400 rounded-b-sm border-x border-b border-orange-500 z-10 shadow-sm" />
                  <div className="w-0.5 h-8 bg-zinc-300 relative z-0" />
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-black/5 pt-6 mt-auto">
              <p className="font-inter text-[11px] text-gray-400 leading-relaxed">
                This calculator performs dilution arithmetic only. It returns concentration and volume for
                laboratory preparation, and makes no recommendation about any use of the compound.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
