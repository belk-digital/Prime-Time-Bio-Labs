import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { BadgePercent, Clock, DollarSign, LineChart, LogIn } from "lucide-react";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";
import { getAffiliateForUser } from "@/lib/affiliate/getAffiliateForUser";
import type { AffiliateSettings } from "@/lib/types/affiliate";
import ApplyForm from "@/components/affiliates/ApplyForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Affiliate Program | Primetime Biolabs",
  description: "Partner with Primetime Biolabs and earn commission promoting research-grade peptides.",
};

export const dynamic = "force-dynamic";

async function getAffiliateSettings(): Promise<AffiliateSettings> {
  const fallback: AffiliateSettings = {
    defaultCommissionRate: 10,
    defaultCommissionType: "percentage",
    defaultCookieDurationDays: 30,
    defaultPendingPeriodDays: 14,
    defaultMinimumPayoutThreshold: 50,
    defaultCommissionOn: "subtotal_after_coupon",
  };
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: "affiliate-settings" });
    return (settings as unknown as AffiliateSettings) ?? fallback;
  } catch (err) {
    console.error("Failed to load affiliate settings:", err);
    return fallback;
  }
}

export default async function AffiliatesPage() {
  const [user, settings] = await Promise.all([getPayloadUser(), getAffiliateSettings()]);
  const affiliate = user ? await getAffiliateForUser(user.id) : null;

  const commissionLabel =
    settings.defaultCommissionType === "percentage"
      ? `${settings.defaultCommissionRate}%`
      : `$${settings.defaultCommissionRate}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-gray-200 overflow-hidden pt-40 pb-24 px-6 md:px-12 lg:px-24">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded uppercase">
            Affiliate Program
          </div>
          <h1 className="text-4xl md:text-6xl font-michroma uppercase font-bold tracking-wider text-white leading-[1.2] mb-6">
            Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Primetime</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
            Earn commission introducing researchers and labs to the highest purity peptides on the market. Apply below to get your own referral link and coupon code.
          </p>
        </div>

        {/* Stat cards */}
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center backdrop-blur-md">
            <BadgePercent className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <div className="text-3xl font-michroma font-bold text-white mb-1">{commissionLabel}</div>
            <p className="text-xs uppercase tracking-widest text-gray-400">Commission Rate</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center backdrop-blur-md">
            <Clock className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <div className="text-3xl font-michroma font-bold text-white mb-1">{settings.defaultCookieDurationDays}d</div>
            <p className="text-xs uppercase tracking-widest text-gray-400">Cookie Duration</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center backdrop-blur-md">
            <DollarSign className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <div className="text-3xl font-michroma font-bold text-white mb-1">${settings.defaultMinimumPayoutThreshold}</div>
            <p className="text-xs uppercase tracking-widest text-gray-400">Minimum Payout</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-20">
          <div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4 font-michroma">1</div>
            <h3 className="font-michroma uppercase tracking-wide text-gray-900 mb-2">Apply</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Submit your application below with a bit about your audience and promotion plans.</p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4 font-michroma">2</div>
            <h3 className="font-michroma uppercase tracking-wide text-gray-900 mb-2">Share</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Once approved, share your unique referral link or coupon code with your audience.</p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4 font-michroma">3</div>
            <h3 className="font-michroma uppercase tracking-wide text-gray-900 mb-2">Earn</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Track clicks and conversions in your dashboard and get paid once you hit the payout threshold.</p>
          </div>
        </div>

        {/* Apply / status panel */}
        <div className="max-w-xl mx-auto">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
            {!user && (
              <div className="text-center">
                <LogIn className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <h2 className="text-xl font-michroma uppercase tracking-wider text-white mb-3">Log In To Apply</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Create a free account or log in to submit your affiliate application.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/login?callbackUrl=/affiliates"
                    className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register?callbackUrl=/affiliates"
                    className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}

            {user && affiliate && (
              <div className="text-center">
                <LineChart className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <h2 className="text-xl font-michroma uppercase tracking-wider text-white mb-3">
                  {affiliate.status === "approved" ? "You're an Affiliate" : "Application Status"}
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  {affiliate.status === "approved" &&
                    "Head to your dashboard to grab your referral link and track your earnings."}
                  {affiliate.status === "pending" && "Your affiliate account is awaiting approval."}
                  {affiliate.status === "suspended" && "Your affiliate account is currently suspended. Contact support for details."}
                  {affiliate.status === "rejected" && "Your affiliate account was not approved at this time."}
                </p>
                {affiliate.status === "approved" && (
                  <Link
                    href="/affiliates/dashboard"
                    className="inline-block px-6 py-3 text-sm font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors"
                  >
                    Go To Dashboard
                  </Link>
                )}
              </div>
            )}

            {user && !affiliate && (
              <>
                <h2 className="text-xl font-michroma uppercase tracking-wider text-white mb-6 text-center">
                  Apply To Become An Affiliate
                </h2>
                <ApplyForm />
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
