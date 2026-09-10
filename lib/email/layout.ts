import { escapeHtml } from "./escapeHtml";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";
const BRAND_NAME = "Prime Time Bio Labs";
const ACCENT = "#4f46e5"; // indigo-600, matches the site's accent color
const ADMIN_EMAIL = process.env.SUPPORT_EMAIL || "support@primetimebiolabs.com";

export type EmailButton = { label: string; href: string };

/**
 * Wraps email body HTML in the site's shared branded chrome (header, footer,
 * research-use disclaimer). Every generator in lib/email/templates builds on this
 * so every outbound email reads as one consistent system.
 */
export function emailLayout(opts: {
  title: string;
  bodyHtml: string;
  button?: EmailButton;
}): string {
  const { title, bodyHtml, button } = opts;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ececec;">
            <tr>
              <td style="background-color:#0a0a0a;padding:28px 32px;">
                <span style="color:#ffffff;font-size:16px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">
                  ${escapeHtml(BRAND_NAME)}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 24px 32px;color:#1f1f1f;font-size:15px;line-height:1.6;">
                ${bodyHtml}
                ${
                  button
                    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px 0;">
                    <tr>
                      <td style="border-radius:999px;background-color:${ACCENT};">
                        <a href="${escapeHtml(button.href)}" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
                          ${escapeHtml(button.label)}
                        </a>
                      </td>
                    </tr>
                  </table>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px 32px;border-top:1px solid #ececec;color:#8a8a8a;font-size:11px;line-height:1.6;">
                <p style="margin:0 0 8px 0;">
                  <strong>Research Use Only:</strong> Products sold by ${escapeHtml(BRAND_NAME)} are intended
                  strictly for laboratory and in-vitro research use by qualified professionals. They are not
                  drugs, dietary supplements, or cosmetics, and are not intended for human or animal
                  consumption, diagnostic, or therapeutic use of any kind.
                </p>
                <p style="margin:0;">
                  Questions? <a href="mailto:support@primetimebiolabs.com" style="color:#8a8a8a;">support@primetimebiolabs.com</a>
                  &middot; <a href="${SITE_URL}" style="color:#8a8a8a;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export { SITE_URL, BRAND_NAME, ACCENT, ADMIN_EMAIL };
