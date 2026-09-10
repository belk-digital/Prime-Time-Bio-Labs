import { emailLayout } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateContactFormEmail(args: {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}): { subject: string; html: string } {
  const subject = `[Contact Form] ${args.subject || "New message"}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 12px 0;font-size:16px;font-weight:bold;color:#0a0a0a;">New contact form submission</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;margin-bottom:16px;">
        <tr><td style="padding:4px 0;color:#8a8a8a;width:100px;">From</td><td style="padding:4px 0;">${escapeHtml(args.name || "N/A")} &lt;${escapeHtml(args.email)}&gt;</td></tr>
        ${args.subject ? `<tr><td style="padding:4px 0;color:#8a8a8a;">Subject</td><td style="padding:4px 0;">${escapeHtml(args.subject)}</td></tr>` : ""}
      </table>
      <p style="margin:0;white-space:pre-wrap;border-top:1px solid #ececec;padding-top:12px;">${escapeHtml(args.message)}</p>
    `,
  });
  return { subject, html };
}
