"use client";

import React, { useActionState, useRef, useState } from "react";
import { CheckCircle2, Lock, Upload, ShieldCheck } from "lucide-react";
import { submitMilitaryDiscountRequest, type MilitaryDiscountFormState } from "@/app/military-discount/actions";

const BRANCHES = ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Space Force", "Other"];

const initialState: MilitaryDiscountFormState = { success: false };

export default function MilitaryDiscountSection() {
  const [state, formAction, isPending] = useActionState(submitMilitaryDiscountRequest, initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left: Image */}
          <div className="w-full lg:w-[45%] relative rounded-[24px] md:rounded-[32px] overflow-hidden min-h-[420px] md:min-h-[550px] shadow-md group order-2 lg:order-1">
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 bg-white/90 backdrop-blur-md px-5 py-2.5 md:px-6 md:py-3 rounded-2xl shadow-sm">
              <span className="font-inter text-gray-900 font-bold text-sm tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> Honoring Our Heroes
              </span>
            </div>

            <img
              src="/military_us_flag.jpg"
              alt="Military and veteran researcher discount at Primetime Biolabs"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

            {/* Privacy notice */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-20 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-5 md:p-6 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-indigo-50 p-2.5 rounded-full text-indigo-600 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-inter text-gray-900 font-bold text-sm tracking-[0.1em] uppercase mb-1">
                    Your Privacy, Protected
                  </h3>
                  <p className="font-inter text-gray-600 text-xs leading-relaxed">
                    ID photos are reviewed once for verification, then{" "}
                    <span className="font-bold text-gray-900">permanently deleted</span>. We never store or share
                    your identification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content + Form */}
          <div className="w-full lg:w-[55%] flex flex-col py-4 lg:py-0 lg:pl-8 order-1 lg:order-2">
            <div className="mb-8">
              <span className="font-inter text-indigo-600 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                Serve With Honor. Research With Us.
              </span>
              <h2 className="font-michroma text-3xl md:text-4xl lg:text-5xl uppercase font-bold leading-[1.15] tracking-wider mb-6 text-gray-900">
                Military and Veteran Research Discount
              </h2>
              <p className="font-inter text-gray-500 text-base md:text-lg leading-relaxed w-full lg:max-w-[85%]">
                Active-duty service members, veterans and their immediate family qualify for a standing discount on every research peptide in our catalogue. Upload a photo of your military or veteran identification, and we&apos;ll email your discount code within one to two business days. The code applies to your account rather than a single order, so you never need to re-verify on repeat purchases.
              </p>
              <h3 className="font-inter text-lg md:text-xl uppercase tracking-wider text-gray-900 mt-8 mb-2">
                How We Handle Your ID Photo
              </h3>
              <p className="font-inter text-gray-500 text-sm md:text-base leading-relaxed w-full lg:max-w-[85%]">
                A human reviewer checks your identification photo once, then deletes it permanently from our systems. We do not store it, we do not archive it, and we never share it with a third party. We keep one thing only: a flag on your account recording that verification succeeded.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 w-full mt-auto">
              {state.success ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="font-inter text-xl md:text-2xl uppercase tracking-wider text-gray-900 mb-4">
                    Request Submitted
                  </h3>
                  <p className="font-inter text-gray-500 text-sm leading-relaxed mb-2 max-w-sm">
                    Thank you for your service. Our team will verify your ID and email your discount code within
                    1&ndash;2 business days.
                  </p>
                </div>
              ) : (
                <form
                  action={(formData) => {
                    if (selectedFile) formData.set("idPhoto", selectedFile);
                    formAction(formData);
                  }}
                  className="flex flex-col gap-5"
                >
                  <h3 className="font-inter text-xl md:text-2xl uppercase tracking-wider text-gray-900 mb-1">
                    Verify Your Service
                  </h3>

                  {state.error && (
                    <div className="font-inter px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                      {state.error}
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="font-inter text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Jane Doe"
                      className="font-inter w-full bg-gray-50 rounded-2xl px-5 py-4 outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-black/5 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-inter text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@example.com"
                      className="font-inter w-full bg-gray-50 rounded-2xl px-5 py-4 outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400 border border-black/5 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="branch" className="font-inter text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Service Branch
                    </label>
                    <select
                      required
                      name="branch"
                      id="branch"
                      defaultValue=""
                      className="font-inter w-full bg-gray-50 rounded-2xl px-5 py-4 outline-none text-sm font-medium text-gray-900 border border-black/5 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors appearance-none"
                    >
                      <option value="" disabled>
                        Select your branch
                      </option>
                      {BRANCHES.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Military ID Photo
                    </label>
                    <div className="relative flex items-center justify-between bg-gray-50 border border-black/5 rounded-2xl px-5 py-3">
                      <span className="font-inter text-sm text-gray-400 truncate max-w-[180px]">
                        {selectedFile ? (
                          <span className="text-gray-900 font-medium">{selectedFile.name}</span>
                        ) : (
                          "Max 8MB (Secure)"
                        )}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedFile(e.target.files[0]);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="font-inter bg-white border border-black/10 shadow-sm text-gray-900 hover:text-indigo-600 hover:border-indigo-200 transition-all rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="font-inter mt-2 w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl transition-colors shadow-[0_8px_20px_rgba(79,70,229,0.25)]"
                  >
                    {isPending ? "Submitting..." : "Submit for Verification"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
