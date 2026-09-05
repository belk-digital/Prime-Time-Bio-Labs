"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Unable to process request. Please try again.");
      } else {
        setMessage(data?.message || "If an account exists for that email, a reset link has been sent.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <img
              src="/primtime-biolabs-logo.svg"
              alt="Primetime Biolabs"
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-michroma uppercase font-bold tracking-wider mb-2">
            Reset <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Password</span>
          </h1>
          <p className="text-gray-400 text-sm font-light">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md p-8 shadow-2xl">
          {message ? (
            <div className="flex items-start gap-3 px-4 py-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-2 text-sm font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Remembered your password?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <Footer />
    </main>
  );
}
