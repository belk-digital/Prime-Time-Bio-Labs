import { emailLayout, SITE_URL } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateMilitaryAdminEmail(args: {
  fullName: string;
  email: string;
  branch: string;
  approveUrl: string;
  rejectUrl: string;
}): { subject: string; html: string } {
  const subject = `[Military Discount] Verification Request: ${args.fullName}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 12px 0;">
        <strong>${escapeHtml(args.fullName)}</strong> (${escapeHtml(args.email)}) has requested a military
        discount as a member of the <strong>${escapeHtml(args.branch)}</strong>.
      </p>
      <p style="margin:0 0 20px 0;">
        Their ID photo is attached for manual verification — it is not stored anywhere else.
        Click one of the links below to approve or reject this request (valid for 7 days).
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 4px 0;">
        <tr>
          <td style="border-radius:999px;background-color:#16a34a;padding:0;">
            <a href="${escapeHtml(args.approveUrl)}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Approve</a>
          </td>
          <td style="width:12px;"></td>
          <td style="border-radius:999px;background-color:#dc2626;padding:0;">
            <a href="${escapeHtml(args.rejectUrl)}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Reject</a>
          </td>
        </tr>
      </table>
    `,
  });
  return { subject, html };
}

export function generateMilitaryApprovedEmail(couponCode: string): { subject: string; html: string } {
  const subject = "Military Discount Verified - Here is your code!";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:20px;font-weight:bold;color:#0a0a0a;">You're verified. Thank you for your service.</p>
      <p style="margin:0 0 20px 0;">
        Your military discount request has been approved. Use the code below at checkout for
        30% off your order.
      </p>
      <p style="margin:0;text-align:center;padding:16px;background-color:#f5f5f5;border-radius:8px;font-size:22px;font-weight:bold;letter-spacing:2px;color:#0a0a0a;">
        ${escapeHtml(couponCode)}
      </p>
    `,
    button: { label: "Shop Now", href: `${SITE_URL}/shop` },
  });
  return { subject, html };
}

export function generateMilitaryRejectedEmail(): { subject: string; html: string } {
  const subject = "Update on your Military Discount Request";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:18px;font-weight:bold;color:#0a0a0a;">We couldn't verify your request</p>
      <p style="margin:0;">
        We weren't able to verify your military discount request with the information provided.
        If you believe this is an error, please reply to this email or contact us at
        support@primetimebiolabs.com and we'll take another look.
      </p>
    `,
  });
  return { subject, html };
}
