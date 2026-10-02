"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { sendTrackedEmail } from "@/lib/email/sendTrackedEmail";
import { generateContactFormEmail } from "@/lib/email/templates/contactForm";
import { ADMIN_EMAIL } from "@/lib/email/layout";

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const orderNumber = String(formData.get("orderNumber") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email) {
    return { success: false, error: "Please provide your email address." };
  }
  if (!message) {
    return { success: false, error: "Please enter a message." };
  }

  const formattedSubject = subject
    ? orderNumber
      ? `${subject} (Order #${orderNumber})`
      : subject
    : orderNumber
    ? `Order #${orderNumber}`
    : undefined;

  const formattedMessage = orderNumber
    ? `Order Number: ${orderNumber}\n\n${message}`
    : message;

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-messages",
      data: {
        name: name || undefined,
        email,
        subject: formattedSubject,
        message: formattedMessage,
      },
      overrideAccess: true,
    });

    const adminNotice = generateContactFormEmail({
      name,
      email,
      subject: formattedSubject,
      message: formattedMessage,
    });

    void sendTrackedEmail({
      to: ADMIN_EMAIL,
      subject: adminNotice.subject,
      html: adminNotice.html,
      replyTo: email,
    });

    return { success: true };
  } catch (err) {
    console.error("Failed to submit contact message:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
