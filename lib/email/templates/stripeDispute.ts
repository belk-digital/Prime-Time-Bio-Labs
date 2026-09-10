import { emailLayout } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateStripeDisputeEmail(args: {
  chargeId: string;
  amount: number;
  reason?: string;
}): { subject: string; html: string } {
  const subject = `⚠️ Stripe dispute opened — charge ${args.chargeId}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:18px;font-weight:bold;color:#b91c1c;">A chargeback/dispute was opened</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
        <tr><td style="padding:4px 0;color:#8a8a8a;width:100px;">Charge</td><td style="padding:4px 0;">${escapeHtml(args.chargeId)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a8a8a;">Amount</td><td style="padding:4px 0;">$${args.amount.toFixed(2)}</td></tr>
        ${args.reason ? `<tr><td style="padding:4px 0;color:#8a8a8a;">Reason</td><td style="padding:4px 0;">${escapeHtml(args.reason)}</td></tr>` : ""}
      </table>
      <p style="margin:16px 0 0 0;">Review and respond to this dispute in the Stripe Dashboard before the deadline.</p>
    `,
    button: { label: "Open Stripe Dashboard", href: "https://dashboard.stripe.com/disputes" },
  });
  return { subject, html };
}
