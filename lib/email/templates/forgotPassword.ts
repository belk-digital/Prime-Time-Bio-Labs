import { emailLayout, SITE_URL } from "../layout";

export function generateForgotPasswordEmail(token: string): { subject: string; html: string } {
  const subject = "Reset Your Password - Prime Time Bio Labs";
  const resetUrl = `${SITE_URL}/reset-password/${token}`;
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:20px;font-weight:bold;color:#0a0a0a;">Reset your password</p>
      <p style="margin:0 0 12px 0;">
        We received a request to reset the password on your Prime Time Bio Labs account.
        Click the button below to choose a new password. This link expires in 1 hour.
      </p>
      <p style="margin:0;color:#8a8a8a;font-size:13px;">
        If you didn't request this, you can safely ignore this email — your password will not be changed.
      </p>
    `,
    button: { label: "Reset Password", href: resetUrl },
  });
  return { subject, html };
}
