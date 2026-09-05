"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";

type ActionResult = { success: true } | { success: false; error: string };

export async function updateProfile(formData: FormData): Promise<ActionResult> {
  try {
    const user = await getPayloadUser();
    if (!user) return { success: false, error: "You must be signed in." };

    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const acceptsMarketing = formData.get("acceptsMarketing") === "on";
    const orderSmsUpdates = formData.get("orderSmsUpdates") === "on";

    const payload = await getPayload({ config });

    await payload.update({
      collection: "users",
      id: user.id,
      data: {
        firstName,
        lastName,
        phone,
        acceptsMarketing,
        orderSmsUpdates,
      },
      overrideAccess: true,
    });

    revalidatePath("/account/settings");
    revalidatePath("/account");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Something went wrong. Please try again.",
    };
  }
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
): Promise<ActionResult> {
  try {
    const user = await getPayloadUser();
    if (!user) return { success: false, error: "You must be signed in." };

    if (!currentPassword || !newPassword) {
      return { success: false, error: "Please fill in both password fields." };
    }
    if (newPassword.length < 8) {
      return {
        success: false,
        error: "New password must be at least 8 characters.",
      };
    }

    const payload = await getPayload({ config });

    try {
      await payload.login({
        collection: "users",
        data: { email: user.email, password: currentPassword },
        overrideAccess: true,
      });
    } catch {
      return { success: false, error: "Current password is incorrect." };
    }

    await payload.update({
      collection: "users",
      id: user.id,
      data: { password: newPassword },
      overrideAccess: true,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Something went wrong. Please try again.",
    };
  }
}
