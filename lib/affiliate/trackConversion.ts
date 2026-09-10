import type { Payload } from "payload";
import { sendTrackedEmail } from "@/lib/email/sendTrackedEmail";
import { generateAdminAffiliateConversionEmail } from "@/lib/email/templates/affiliate";
import { ADMIN_EMAIL } from "@/lib/email/layout";

/**
 * Simplified affiliate attribution: if the coupon applied at checkout is a given
 * affiliate's own referral coupon, record a conversion and notify the admin.
 *
 * This intentionally does not implement click/cookie-based attribution (no
 * AffiliateClicks tracking exists yet) — coupon-code attribution alone covers the
 * common case where a customer used the affiliate's code, which is enough to
 * drive the "New Affiliate Sale!" notification email requested here.
 */
export async function trackAffiliateConversion(args: {
  payload: Payload;
  orderId: string | number;
  orderSubtotal: number;
  orderDiscount: number;
  couponCode?: string | null;
  customerEmail?: string | null;
  customerUserId?: string | number | null;
}): Promise<void> {
  const { payload, orderId, orderSubtotal, orderDiscount, couponCode } = args;
  if (!couponCode) return;

  const affiliateResult = await payload.find({
    collection: "affiliates",
    where: { couponCode: { equals: couponCode }, status: { equals: "approved" } },
    limit: 1,
    overrideAccess: true,
  });
  const affiliate = affiliateResult.docs?.[0];
  if (!affiliate) return;

  const selfReferral =
    !!args.customerUserId && String(affiliate.user) === String(args.customerUserId);

  const eligibleSubtotal = Math.max(0, orderSubtotal - orderDiscount);
  const rate = typeof affiliate.commissionRate === "number" ? affiliate.commissionRate : 10;
  const commissionAmount = selfReferral ? 0 : Math.round(eligibleSubtotal * (rate / 100) * 100) / 100;

  await payload.create({
    collection: "affiliate-conversions",
    data: {
      affiliate: affiliate.id,
      order: orderId,
      customer: args.customerUserId || undefined,
      customerEmail: args.customerEmail || undefined,
      attributionSource: "coupon_code",
      couponCodeUsed: couponCode,
      orderSubtotal,
      orderDiscount,
      eligibleSubtotal,
      commissionRate: rate,
      commissionAmount,
      status: selfReferral ? "voided" : "pending",
      selfReferralDetected: selfReferral,
    } as any,
    overrideAccess: true,
  });

  await payload
    .update({
      collection: "affiliates",
      id: affiliate.id,
      data: {
        totalConversions: (affiliate.totalConversions || 0) + 1,
        totalRevenue: (affiliate.totalRevenue || 0) + (selfReferral ? 0 : eligibleSubtotal),
        totalCommissionPending: (affiliate.totalCommissionPending || 0) + commissionAmount,
      },
      overrideAccess: true,
    })
    .catch((err) => console.error("Failed to update affiliate stats:", err));

  const orderDoc = await payload.findByID({ collection: "orders", id: orderId, overrideAccess: true }).catch(() => null);
  const adminNotice = generateAdminAffiliateConversionEmail({
    affiliateName: affiliate.displayName || `Affiliate #${affiliate.id}`,
    orderNumber: String(orderDoc?.orderNumber || orderId),
    commissionAmount,
    voided: selfReferral,
  });
  void sendTrackedEmail({ to: ADMIN_EMAIL, subject: adminNotice.subject, html: adminNotice.html });
}
