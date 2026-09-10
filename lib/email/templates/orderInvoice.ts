import { emailLayout, SITE_URL } from "../layout";
import { escapeHtml } from "../escapeHtml";

type OrderItem = {
  product?: { name?: string } | string | number | null;
  variantTitle?: string | null;
  price?: number | null;
  quantity?: number | null;
};

type OrderLike = {
  id: string | number;
  orderNumber?: string | null;
  items?: OrderItem[] | null;
  subtotal?: number | null;
  discountTotal?: number | null;
  shippingTotal?: number | null;
  feeTotal?: number | null;
  total?: number | null;
  shippingAddress?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  } | null;
  paymentMethod?: string | null;
};

export type OrderEmailNotice =
  | { kind: "confirmation" }
  | { kind: "shipped"; trackingLink?: string | null }
  | { kind: "refunded" }
  | { kind: "cancelled" }
  | { kind: "payment_failed" }
  | { kind: "custom_note"; note: string };

const money = (n: number | null | undefined) => `$${Number(n || 0).toFixed(2)}`;

function noticeCopy(notice: OrderEmailNotice, orderNumber: string): { headline: string; body: string } {
  switch (notice.kind) {
    case "confirmation":
      return {
        headline: "Order confirmed",
        body: `Thanks for your order — we've received it and it's being prepared for shipment. Here's your receipt for order #${escapeHtml(orderNumber)}.`,
      };
    case "shipped":
      return {
        headline: "Your order has shipped!",
        body: notice.trackingLink
          ? `Order #${escapeHtml(orderNumber)} is on its way. <a href="${escapeHtml(notice.trackingLink)}" style="color:#4f46e5;">Track your shipment here</a>.`
          : `Order #${escapeHtml(orderNumber)} is on its way.`,
      };
    case "refunded":
      return {
        headline: "Your order has been refunded",
        body: `Order #${escapeHtml(orderNumber)} has been refunded. Please allow a few business days for the funds to appear, depending on your payment method.`,
      };
    case "cancelled":
      return {
        headline: "Your order has been cancelled",
        body: `Order #${escapeHtml(orderNumber)} has been cancelled. If you weren't expecting this, please reach out to support.`,
      };
    case "payment_failed":
      return {
        headline: "Your order payment failed",
        body: `We couldn't process payment for order #${escapeHtml(orderNumber)}, so it's been cancelled. Feel free to try again or reach out if you need help.`,
      };
    case "custom_note":
      return {
        headline: `Update regarding your order #${orderNumber}`,
        body: escapeHtml(notice.note).replace(/\n/g, "<br />"),
      };
  }
}

export function generateOrderEmail(order: OrderLike, notice: OrderEmailNotice): { subject: string; html: string } {
  const orderNumber = String(order.orderNumber || order.id);
  const { headline, body } = noticeCopy(notice, orderNumber);

  const subjectByKind: Record<OrderEmailNotice["kind"], string> = {
    confirmation: `Order Confirmation #${orderNumber}`,
    shipped: `Your Order #${orderNumber} has shipped!`,
    refunded: `Your Order #${orderNumber} has been refunded`,
    cancelled: `Your Order #${orderNumber} has been cancelled`,
    payment_failed: `Your Order #${orderNumber} payment failed`,
    custom_note: `Update regarding your Order #${orderNumber}`,
  };
  const subject = notice.kind === "confirmation" ? `Order Confirmation #${orderNumber}` : subjectByKind[notice.kind];

  const items = order.items ?? [];
  const itemsHtml = items
    .map((item) => {
      const name =
        typeof item.product === "object" && item.product !== null
          ? item.product.name
          : item.variantTitle || "Item";
      const lineTotal = (item.price || 0) * (item.quantity || 1);
      return `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
            <span style="display:block;font-weight:bold;color:#0a0a0a;">${escapeHtml(name)}</span>
            ${item.variantTitle ? `<span style="display:block;font-size:12px;color:#8a8a8a;">${escapeHtml(item.variantTitle)}</span>` : ""}
            <span style="display:block;font-size:12px;color:#8a8a8a;">Qty ${escapeHtml(item.quantity || 1)}</span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right;white-space:nowrap;color:#0a0a0a;">
            ${money(lineTotal)}
          </td>
        </tr>`;
    })
    .join("");

  const addr = order.shippingAddress;
  const addressHtml = addr?.line1
    ? `
      <p style="margin:16px 0 4px 0;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#8a8a8a;">Shipping Address</p>
      <p style="margin:0;font-size:13px;color:#4a4a4a;line-height:1.5;">
        ${escapeHtml(addr.line1)}<br />
        ${addr.line2 ? `${escapeHtml(addr.line2)}<br />` : ""}
        ${escapeHtml(addr.city)}, ${escapeHtml(addr.state)} ${escapeHtml(addr.postalCode)}<br />
        ${escapeHtml(addr.country)}
      </p>`
    : "";

  const html = emailLayout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px 0;font-size:20px;font-weight:bold;color:#0a0a0a;">${escapeHtml(headline)}</p>
      <p style="margin:0 0 20px 0;">${body}</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
        ${itemsHtml}
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;margin-top:12px;color:#4a4a4a;">
        <tr><td style="padding:3px 0;">Subtotal</td><td style="padding:3px 0;text-align:right;">${money(order.subtotal)}</td></tr>
        ${order.discountTotal ? `<tr><td style="padding:3px 0;">Discount</td><td style="padding:3px 0;text-align:right;">-${money(order.discountTotal)}</td></tr>` : ""}
        <tr><td style="padding:3px 0;">Shipping</td><td style="padding:3px 0;text-align:right;">${order.shippingTotal ? money(order.shippingTotal) : "Free"}</td></tr>
        ${order.feeTotal ? `<tr><td style="padding:3px 0;">Fees</td><td style="padding:3px 0;text-align:right;">${money(order.feeTotal)}</td></tr>` : ""}
        <tr>
          <td style="padding:10px 0 0 0;border-top:1px solid #ececec;font-weight:bold;color:#0a0a0a;">Total</td>
          <td style="padding:10px 0 0 0;border-top:1px solid #ececec;text-align:right;font-weight:bold;color:#0a0a0a;">${money(order.total)}</td>
        </tr>
      </table>

      ${addressHtml}
    `,
    button: { label: "View Order", href: `${SITE_URL}/order-confirmation/${order.id}` },
  });

  return { subject, html };
}
