import { emailLayout, emailHeading, emailCard, emailCallout, emailRows } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateContactFormEmail(args: {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}): { subject: string; html: string } {
  const subject = `[Contact Form] ${args.subject || "New message"}`;
  const rows: Array<[string, string]> = [["From", `${escapeHtml(args.name || "N/A")} &lt;${escapeHtml(args.email)}&gt;`]];
  if (args.subject) rows.push(["Subject", escapeHtml(args.subject)]);
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      ${emailHeading("New contact form submission")}
      ${emailCard(emailRows(rows), 24)}
      ${emailCallout(`<p style="margin:0;font-size:15px;color:#2A2A2A;line-height:1.6;white-space:pre-wrap;">${escapeHtml(args.message)}</p>`)}
    `,
  });
  return { subject, html };
}
