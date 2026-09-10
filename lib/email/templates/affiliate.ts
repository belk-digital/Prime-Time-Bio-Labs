import { emailLayout, SITE_URL } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateAffiliateWelcomeEmail(args: {
  displayName: string;
  referralSlug: string;
  couponCode: string;
}): { subject: string; html: string } {
  const subject = "Welcome to the Partner Program!";
  const referralLink = `${SITE_URL}/?ref=${encodeURIComponent(args.referralSlug)}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:20px;font-weight:bold;color:#0a0a0a;">Welcome aboard, ${escapeHtml(args.displayName)}!</p>
      <p style="margin:0 0 16px 0;">
        Your affiliate application has been approved. You now have a personal referral link
        and coupon code your audience can use for a discount, while you earn commission on
        every sale.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;margin-bottom:12px;">
        <tr><td style="padding:6px 0;color:#8a8a8a;width:130px;">Referral Link</td><td style="padding:6px 0;word-break:break-all;">${escapeHtml(referralLink)}</td></tr>
        <tr><td style="padding:6px 0;color:#8a8a8a;">Coupon Code</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(args.couponCode)}</td></tr>
      </table>
      <p style="margin:0;">Track clicks, conversions, and payouts anytime from your affiliate dashboard.</p>
    `,
    button: { label: "Go to Affiliate Dashboard", href: `${SITE_URL}/affiliates/dashboard` },
  });
  return { subject, html };
}

export function generateAdminAffiliateApplicationEmail(displayName: string): { subject: string; html: string } {
  const subject = `New Affiliate Registered: ${displayName}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `<p style="margin:0;"><strong>${escapeHtml(displayName)}</strong>'s affiliate application was just approved and their profile/coupon were auto-created.</p>`,
  });
  return { subject, html };
}

export function generateAdminAffiliateConversionEmail(args: {
  affiliateName: string;
  orderNumber: string;
  commissionAmount: number;
  voided?: boolean;
}): { subject: string; html: string } {
  const subject = `New Affiliate Sale! ${args.affiliateName} made a conversion`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 12px 0;">
        <strong>${escapeHtml(args.affiliateName)}</strong> just referred order
        <strong>#${escapeHtml(args.orderNumber)}</strong>.
      </p>
      <p style="margin:0;">
        Commission: <strong>${args.voided ? "$0.00 (voided — self-referral)" : `$${args.commissionAmount.toFixed(2)}`}</strong>
      </p>
    `,
  });
  return { subject, html };
}

export function generateAdminPayoutRequestEmail(args: {
  affiliateName: string;
  amount: number;
  payoutMethod: string;
  payoutDetails: string;
}): { subject: string; html: string } {
  const subject = `[Payout Request] $${args.amount.toFixed(2)} from ${args.affiliateName}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
        <tr><td style="padding:4px 0;color:#8a8a8a;width:130px;">Affiliate</td><td style="padding:4px 0;">${escapeHtml(args.affiliateName)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a8a8a;">Amount</td><td style="padding:4px 0;font-weight:bold;">$${args.amount.toFixed(2)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a8a8a;">Method</td><td style="padding:4px 0;">${escapeHtml(args.payoutMethod)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a8a8a;">Details</td><td style="padding:4px 0;">${escapeHtml(args.payoutDetails)}</td></tr>
      </table>
    `,
  });
  return { subject, html };
}
