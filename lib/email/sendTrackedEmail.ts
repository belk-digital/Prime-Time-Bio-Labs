import { getPayload } from "payload";
import config from "@payload-config";

const CC_ALL_EMAILS = "main.belkdigital@gmail.com";

export type TrackedEmailArgs = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  bcc?: string | string[];
  attachments?: Array<{ filename: string; content: Buffer | string }>;
};

/**
 * Every outbound transactional email should go through here rather than calling
 * payload.sendEmail() directly — it guarantees a row in the `email-logs` collection
 * for every attempt (sent or failed) so support/admin can audit what actually went out.
 */
export async function sendTrackedEmail(args: TrackedEmailArgs): Promise<{ success: boolean }> {
  const payload = await getPayload({ config });
  const to = Array.isArray(args.to) ? args.to.join(", ") : args.to;

  try {
    // Connection-level failures (e.g. ECONNRESET during TLS to api.resend.com) happen before the
    // request reaches Resend, so retrying is safe and won't double-send.
    const MAX_ATTEMPTS = 3;
    for (let attempt = 1; ; attempt++) {
      try {
        await payload.sendEmail({
          to: args.to,
          from: args.from,
          replyTo: args.replyTo,
          cc: CC_ALL_EMAILS,
          bcc: args.bcc,
          subject: args.subject,
          html: args.html,
          attachments: args.attachments,
        });
        break;
      } catch (err) {
        const isNetworkError = err instanceof TypeError && /fetch failed/i.test(err.message);
        if (!isNetworkError || attempt >= MAX_ATTEMPTS) throw err;
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
      }
    }

    await payload
      .create({
        collection: "email-logs",
        data: {
          to,
          subject: args.subject,
          body: { html: args.html },
          sentAt: new Date().toISOString(),
          status: "sent",
        },
        overrideAccess: true,
      })
      .catch((err) => console.error("Failed to write email-logs entry:", err));

    return { success: true };
  } catch (err) {
    console.error(`Failed to send email "${args.subject}" to ${to}:`, err);

    await payload
      .create({
        collection: "email-logs",
        data: {
          to,
          subject: args.subject,
          body: { html: args.html, error: err instanceof Error ? err.message : String(err) },
          sentAt: new Date().toISOString(),
          status: "failed",
        },
        overrideAccess: true,
      })
      .catch((logErr) => console.error("Failed to write email-logs entry:", logErr));

    return { success: false };
  }
}
