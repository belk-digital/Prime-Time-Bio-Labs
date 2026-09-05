"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
        eyebrow="Welcome back"
        title="Sign in to your account"
        subtitle="Access your orders, addresses, and research portal anytime."
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/register"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="font-inter flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="font-inter block text-sm font-medium text-gray-700 mb-2">
              Your email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-inter w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="font-inter block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="/forgot-password" className="font-inter text-xs text-gray-500 hover:text-black transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-inter w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-2 text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In
              </>
            ) : (
              "Get Started"
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="font-inter text-xs text-gray-400 uppercase tracking-widest">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <GoogleSignInButton />
    </AuthShell>
  );
}
