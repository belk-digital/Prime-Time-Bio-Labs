"use server";

import { getPayload } from "payload";
import config from "@payload-config";

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
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email) {
    return { success: false, error: "Please provide your email address." };
  }
  if (!message) {
    return { success: false, error: "Please enter a message." };
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-messages",
      data: {
        name: name || undefined,
        email,
        subject: subject || undefined,
        message,
      },
      overrideAccess: true,
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to submit contact message:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
