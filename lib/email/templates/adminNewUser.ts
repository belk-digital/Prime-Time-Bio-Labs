import { emailLayout } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateAdminNewUserEmail(args: {
  firstName?: string;
  lastName?: string;
  email: string;
  authProvider?: string;
}): { subject: string; html: string } {
  const name = [args.firstName, args.lastName].filter(Boolean).join(" ") || "(no name provided)";
  const subject = `New User Registration: ${name}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 12px 0;font-size:16px;font-weight:bold;color:#0a0a0a;">New account created</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
        <tr><td style="padding:4px 0;color:#8a8a8a;width:120px;">Name</td><td style="padding:4px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a8a8a;">Email</td><td style="padding:4px 0;">${escapeHtml(args.email)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a8a8a;">Sign-up method</td><td style="padding:4px 0;">${escapeHtml(args.authProvider || "credentials")}</td></tr>
      </table>
    `,
  });
  return { subject, html };
}
