import { emailLayout } from "../layout";
import { escapeHtml } from "../escapeHtml";

export function generatePasswordChangedEmail(): { subject: string; html: string } {
  const subject = "Your password has been changed";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:18px;font-weight:bold;color:#0a0a0a;">Password changed</p>
      <p style="margin:0;">
        The password on your Prime Time Bio Labs account was just changed. If this was you,
        no further action is needed. If you didn't make this change, please contact us
        immediately at support@primetimebiolabs.com.
      </p>
    `,
  });
  return { subject, html };
}

export function generateAdminPasswordChangedEmail(email: string): { subject: string; html: string } {
  const subject = "Security Alert: User Password Changed";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0;">The account <strong>${escapeHtml(email)}</strong> just changed its password via account settings.</p>
    `,
  });
  return { subject, html };
}

export function generateAdminPasswordResetEmail(email: string): { subject: string; html: string } {
  const subject = "Security Alert: User Password Reset";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0;">The account <strong>${escapeHtml(email)}</strong> just reset its password via the forgot-password flow.</p>
    `,
  });
  return { subject, html };
}

export function generateGoogleLinkedEmail(): { subject: string; html: string } {
  const subject = "A new sign-in method was added to your account";
  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:18px;font-weight:bold;color:#0a0a0a;">Google sign-in linked</p>
      <p style="margin:0;">
        Your Google account was just linked to your Prime Time Bio Labs account, allowing you
        to sign in with either your password or Google going forward. If you didn't do this,
        please contact us immediately at support@primetimebiolabs.com.
      </p>
    `,
  });
  return { subject, html };
}
