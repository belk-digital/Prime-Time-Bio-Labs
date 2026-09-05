"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Lock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "This reset link is invalid or has expired.");
        setIsSubmitting(false);
        return;
      }

      setMessage("Your password has been reset successfully. Redirecting to sign in…");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
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
            New <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Password</span>
          </h1>
          <p className="text-gray-400 text-sm font-light">
            Choose a new password for your account.
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
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                    placeholder="••••••••"
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
                    Resetting
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>

      <Footer />
    </main>
  );
}
