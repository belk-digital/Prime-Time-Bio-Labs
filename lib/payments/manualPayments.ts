/**
 * Customer-facing instructions for the manual (QR) payment methods. `recipient` is the text
 * handle shown next to the QR (some email clients block images) — fill these in; the QR and
 * amount/memo instructions are shown regardless, and the recipient line is hidden while blank.
 */
export type ManualPaymentMethod = "zelle" | "venmo" | "cashapp";

export const MANUAL_PAYMENT_INFO: Record<
  ManualPaymentMethod,
  { label: string; qrPath: string; recipient: string }
> = {
  zelle: { label: "Zelle", qrPath: "/payments/zelle.jpeg", recipient: "" },
  venmo: { label: "Venmo", qrPath: "/payments/venmo.jpeg", recipient: "" },
  cashapp: { label: "Cash App", qrPath: "/payments/cashapp.jpeg", recipient: "" },
};

export function getManualPaymentInfo(method?: string | null) {
  return method && method in MANUAL_PAYMENT_INFO
    ? MANUAL_PAYMENT_INFO[method as ManualPaymentMethod]
    : null;
}
