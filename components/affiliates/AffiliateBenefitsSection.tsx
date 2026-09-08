import { Activity, CheckCircle2, DollarSign, Link2, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
    topRightText: "BUILT-IN\nCUSTOMER DISCOUNT",
    titleMain: "HIGH",
    titleMainColor: "text-indigo-600 text-4xl mb-1",
    titleSub: "CONVERSION RATES",
    description:
      "The discount your referred customers get gives your audience an immediate reason to buy, improving conversion on every link you share.",
    badges: ["LOW FRICTION", "EASY SHARE", "BUILT TO CONVERT"],
  },
  {
    icon: <DollarSign className="w-8 h-8 text-indigo-500" />,
    topRightText: "PAID ON EVERY\nQUALIFYING SALE",
    titleMain: "COMPETITIVE",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "COMMISSION RATE",
    description:
      "One of the more competitive commission structures in the research-chemical affiliate space, with no cap on total earnings.",
    badges: ["NO EARNINGS CAP", "MONTHLY PAYOUTS", "SCALES WITH YOU"],
  },
  {
    icon: <Link2 className="w-8 h-8 text-indigo-500" />,
    topRightText: "LINK + DISCOUNT\nCODE",
    titleMain: "DUAL",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "TRACKING SYSTEM",
    description:
      "Both your referral link and your personal discount code are tracked independently, so you're credited no matter which one a customer uses.",
    badges: ["LINK TRACKING", "CODE TRACKING", "NEVER MISS A SALE"],
  },
  {
    icon: <Activity className="w-8 h-8 text-indigo-500" />,
    topRightText: "LIVE AFFILIATE\nDASHBOARD",
    titleMain: "REAL-TIME",
    titleMainColor: "text-gray-900 text-2xl mb-1",
    titleSub: "PERFORMANCE DATA",
    description:
      "Monitor clicks, conversions, and pending commissions as they happen from your dashboard, instead of waiting on a periodic report.",
    badges: ["LIVE CLICKS", "CONVERSION RATE", "PENDING EARNINGS"],
  },
];

export default function AffiliateBenefitsSection() {
  return (
    <section className="bg-gray-50 py-24 px-4 md:px-8 lg:px-12">
      <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] mx-auto">
        <h2 className="about-fade text-3xl md:text-4xl font-michroma font-bold text-gray-900 tracking-wider uppercase text-center mb-16">
          Why Partner With Us
        </h2>

        <div className="about-stagger grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="about-stagger-item bg-white p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-black/5 flex flex-col h-full justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-50 rounded-xl">{feature.icon}</div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase whitespace-pre-line leading-tight block">
                    {feature.topRightText}
                  </span>
                </div>
              </div>

              <div className="mb-4 mt-auto">
                <h3 className={`font-bold tracking-tight ${feature.titleMainColor}`}>{feature.titleMain}</h3>
                <h4 className="text-lg font-semibold text-gray-800 tracking-wide leading-tight">{feature.titleSub}</h4>
                <div className="w-10 h-0.5 bg-indigo-500/30 mt-4 rounded-full" />
              </div>

              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-6">{feature.description}</p>

              <div className="flex flex-wrap gap-1 mt-auto">
                {feature.badges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-1 bg-gray-50 px-1.5 py-1 rounded-md border border-gray-100">
                    <CheckCircle2 className="w-[10px] h-[10px] text-indigo-400" />
                    <span className="text-[8px] font-bold text-gray-500 tracking-wider uppercase">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
