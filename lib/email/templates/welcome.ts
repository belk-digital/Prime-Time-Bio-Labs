import { emailLayout, SITE_URL } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generateWelcomeEmail(firstName: string): { subject: string; html: string } {
  const subject = "Welcome to Prime Time Bio Labs!";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:20px;font-weight:bold;color:#0a0a0a;">Welcome${firstName ? `, ${escapeHtml(firstName)}` : ""}.</p>
      <p style="margin:0 0 12px 0;">
        Your account is ready. You now have access to research-grade peptides with full
        third-party Certificates of Analysis, order tracking, and your saved addresses — all
        in one place.
      </p>
      <p style="margin:0;">Thanks for choosing Prime Time Bio Labs for your research needs.</p>
    `,
    button: { label: "Start Shopping", href: `${SITE_URL}/shop` },
  });
  return { subject, html };
}
