"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import Stripe from "stripe";
import { FREE_SHIPPING_THRESHOLD, DEFAULT_COUNTRY } from "@/lib/shipping/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ShippingMethodOption = {
  method: string;
  price: number;
  estimatedDays?: number | null;
  isInternational?: boolean | null;
};

export type ProcessingFeeOption = {
  id: string;
  name: string;
  amount: number;
  type: "fixed_amount" | "percentage";
  isOptional: boolean;
};

export type CouponVerification =
  | { valid: true; code: string; discount: number; freeShipping: boolean; type: string }
  | { valid: false; message: string };

export type AddressInput = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CheckoutItemInput = {
  productId: string | number;
  variantSku?: string;
  variantTitle?: string;
  quantity: number;
  priceSnapshot: number;
  productSnapshot?: unknown;
};

export type PaymentMethodOption = "stripe" | "zelle" | "amex" | "circoflows" | "stripe_link";

export type CreateOrderInput = {
  items: CheckoutItemInput[];
  shippingAddress: AddressInput;
  billingAddress: AddressInput;
  shippingMethod: { method: string; price: number };
  couponCode?: string | null;
  selectedFeeIds?: string[];
  paymentMethod: PaymentMethodOption;
  guestEmail?: string | null;
  userId?: string | number | null;
  customerFirstName?: string;
  customerLastName?: string;
  customerPhone?: string;
};

// ---------------------------------------------------------------------------
// Shipping
// ---------------------------------------------------------------------------

const FALLBACK_DOMESTIC_METHODS: ShippingMethodOption[] = [
  { method: "Standard Shipping", price: 25, estimatedDays: 5, isInternational: false },
  { method: "Express Shipping", price: 50, estimatedDays: 2, isInternational: false },
];

const FALLBACK_INTERNATIONAL_METHOD: ShippingMethodOption = {
  method: "International Shipping",
  price: 50,
  estimatedDays: 14,
  isInternational: true,
};

export async function getShippingMethods(
  country: string,
  subtotal: number
): Promise<ShippingMethodOption[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "shippingzones",
    limit: 1,
    overrideAccess: true,
  });

  const zone = docs[0] as any;
  const rawMethods: any[] = Array.isArray(zone?.methods) && zone.methods.length > 0 ? zone.methods : [];

  const allMethods = rawMethods.length > 0
    ? rawMethods.map((m) => ({
        method: String(m.method),
        price: Number(m.price) || 0,
        estimatedDays: m.estimatedDays ?? null,
        isInternational: !!m.isInternational,
        minOrderAmount: typeof m.minOrderAmount === "number" ? m.minOrderAmount : null,
      }))
    : [
        ...FALLBACK_DOMESTIC_METHODS.map((m) => ({ ...m, minOrderAmount: null })),
        { ...FALLBACK_INTERNATIONAL_METHOD, minOrderAmount: null },
      ];

  // International: a single method entirely replaces the domestic set and ignores
  // minOrderAmount / free-shipping-threshold rules.
  if (country && country !== DEFAULT_COUNTRY) {
    const intl = allMethods.find((m) => m.isInternational);
    const resolved = intl ?? FALLBACK_INTERNATIONAL_METHOD;
    return [
      {
        method: resolved.method,
        price: resolved.price,
        estimatedDays: resolved.estimatedDays,
        isInternational: true,
      },
    ];
  }

  const domestic = allMethods.filter((m) => !m.isInternational);
  const visible = domestic.filter((m) => !m.minOrderAmount || subtotal >= m.minOrderAmount);
  const pool = visible.length > 0 ? visible : domestic;

  if (pool.length === 0) {
    return [FALLBACK_DOMESTIC_METHODS[0]];
  }

  // Waive the price of the cheapest ("standard") domestic method once the free
  // shipping subtotal threshold has been met.
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    const cheapest = pool.reduce((a, b) => (b.price < a.price ? b : a), pool[0]);
    return pool.map((m) => ({
      method: m.method,
      price: m.method === cheapest.method ? 0 : m.price,
      estimatedDays: m.estimatedDays,
      isInternational: m.isInternational,
    }));
  }

  return pool.map((m) => ({
    method: m.method,
    price: m.price,
    estimatedDays: m.estimatedDays,
    isInternational: m.isInternational,
  }));
}

// ---------------------------------------------------------------------------
// Processing fees
// ---------------------------------------------------------------------------

export async function getActiveProcessingFees(): Promise<ProcessingFeeOption[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "processing-fees",
    where: { isActive: { equals: true } },
    limit: 100,
    overrideAccess: true,
  });

  return (docs as any[]).map((fee) => ({
    id: String(fee.id),
    name: String(fee.name),
    amount: Number(fee.amount) || 0,
    type: fee.type === "percentage" ? "percentage" : "fixed_amount",
    isOptional: !!fee.isOptional,
  }));
}

// ---------------------------------------------------------------------------
// Coupons
// ---------------------------------------------------------------------------

export async function verifyCoupon(code: string, subtotal: number): Promise<CouponVerification> {
  const normalized = (code || "").trim().toUpperCase();
  if (!normalized) {
    return { valid: false, message: "Please enter a coupon code." };
  }

  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "coupons",
    where: { code: { equals: normalized } },
    limit: 1,
    overrideAccess: true,
  });

  const coupon = docs[0] as any;
  if (!coupon) {
    return { valid: false, message: "Invalid coupon code." };
  }
  if (!coupon.isActive) {
    return { valid: false, message: "This coupon is no longer active." };
  }
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
    return { valid: false, message: "This coupon has expired." };
  }
  if (typeof coupon.minSpend === "number" && coupon.minSpend > 0 && subtotal < coupon.minSpend) {
    return {
      valid: false,
      message: `This coupon requires a minimum order of $${coupon.minSpend.toFixed(2)}.`,
    };
  }
  if (
    typeof coupon.usageLimit === "number" &&
    coupon.usageLimit > 0 &&
    (Number(coupon.usageCount) || 0) >= coupon.usageLimit
  ) {
    return { valid: false, message: "This coupon has reached its usage limit." };
  }

  const freeShipping = !!coupon.freeShipping || coupon.type === "free_shipping";
  let discount = 0;

  switch (coupon.type) {
    case "percentage":
      discount = (subtotal * (Number(coupon.value) || 0)) / 100;
      break;
    case "fixed_amount":
      discount = Number(coupon.value) || 0;
      break;
    case "store_credit":
      discount = Number(coupon.remainingBalance ?? coupon.storeCreditAmount) || 0;
      break;
    default:
      discount = 0;
  }

  discount = Math.max(0, Math.min(discount, subtotal));

  return { valid: true, code: normalized, discount, freeShipping, type: String(coupon.type) };
}

// ---------------------------------------------------------------------------
// Order creation
// ---------------------------------------------------------------------------

async function getNextOrderNumber(payload: Awaited<ReturnType<typeof getPayload>>): Promise<string> {
  const COUNTER_ID = 1;

  try {
    const existing: any = await payload.findByID({
      collection: "order_counters",
      id: COUNTER_ID,
      overrideAccess: true,
    });
    const next = (Number(existing?.counter) || 0) + 1;
    await payload.update({
      collection: "order_counters",
      id: COUNTER_ID,
      data: { counter: next },
      overrideAccess: true,
    });
    return String(7000 + next);
  } catch {
    // No counter doc yet — best-effort create. Not fully race-safe, acceptable
    // for this simplified implementation.
    try {
      await payload.create({
        collection: "order_counters",
        data: { id: COUNTER_ID, counter: 1 },
        overrideAccess: true,
      });
    } catch {
      // Ignore — another concurrent request may have created it first.
    }
    return String(7000 + 1);
  }
}

export async function createPayloadOrder(
  input: CreateOrderInput
): Promise<{ orderId: string; orderNumber: string; total: number }> {
  const payload = await getPayload({ config });

  const subtotal = input.items.reduce(
    (sum, item) => sum + item.priceSnapshot * item.quantity,
    0
  );

  let discountTotal = 0;
  let freeShipping = false;

  if (input.couponCode) {
    const verification = await verifyCoupon(input.couponCode, subtotal);
    if (verification.valid) {
      discountTotal = verification.discount;
      freeShipping = verification.freeShipping;
    }
  }

  const subtotalAfterDiscount = Math.max(0, subtotal - discountTotal);
  const shippingTotal = freeShipping ? 0 : Math.max(0, Number(input.shippingMethod?.price) || 0);

  const activeFees = await getActiveProcessingFees();
  const appliedFees: Array<{
    feeId: string;
    feeName: string;
    amount: number;
    feeType: "fixed_amount" | "percentage";
    percentage: number | null;
  }> = [];
  let feeTotal = 0;

  for (const fee of activeFees) {
    const shouldApply = !fee.isOptional || (input.selectedFeeIds ?? []).includes(fee.id);
    if (!shouldApply) continue;
    const amount = fee.type === "percentage" ? subtotalAfterDiscount * (fee.amount / 100) : fee.amount;
    feeTotal += amount;
    appliedFees.push({
      feeId: fee.id,
      feeName: fee.name,
      amount,
      feeType: fee.type,
      percentage: fee.type === "percentage" ? fee.amount : null,
    });
  }

  const taxTotal = 0;
  const total = Math.max(0, subtotalAfterDiscount + shippingTotal + feeTotal + taxTotal);

  const orderNumber = await getNextOrderNumber(payload);

  const orderItems = input.items.map((item) => ({
    product: item.productId,
    variantTitle: item.variantTitle,
    variant: item.variantSku,
    price: item.priceSnapshot,
    quantity: item.quantity,
    productSnapshot: item.productSnapshot ?? null,
  }));

  const isGuest = !input.userId;

  const order: any = await payload.create({
    collection: "orders",
    data: {
      orderNumber,
      owner: isGuest ? undefined : input.userId,
      guestEmail: isGuest ? input.guestEmail || undefined : undefined,
      customerFirstName: input.customerFirstName,
      customerLastName: input.customerLastName,
      customerPhone: input.customerPhone,
      items: orderItems,
      shippingAddress: input.shippingAddress,
      billingAddress: input.billingAddress,
      status: "pending",
      paymentStatus: "unpaid",
      fulfillmentStatus: "unfulfilled",
      subtotal,
      discountTotal,
      shippingTotal,
      taxTotal,
      feeTotal,
      total,
      appliedFees,
      shippingMethod: input.shippingMethod?.method,
      paymentMethod: input.paymentMethod,
      couponCode: input.couponCode || undefined,
      orderSource: "web",
      isFinalized: false,
    } as any,
    overrideAccess: true,
  });

  return { orderId: String(order.id), orderNumber, total };
}

// ---------------------------------------------------------------------------
// Stripe
// ---------------------------------------------------------------------------

function getStripeClient(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "");
}

export async function createPaymentIntent(
  amountCents: number,
  orderId: string
): Promise<{ clientSecret: string | null }> {
  const stripe = getStripeClient();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.max(50, Math.round(amountCents)),
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: { orderId },
  });

  return { clientSecret: paymentIntent.client_secret };
}

export async function syncPaymentStatus(
  paymentIntentId: string,
  orderId: string
): Promise<{ success: boolean; status?: string }> {
  const stripe = getStripeClient();

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === "succeeded") {
    const payload = await getPayload({ config });
    await payload.update({
      collection: "orders",
      id: (isNaN(Number(orderId)) ? orderId : Number(orderId)) as any,
      data: { paymentStatus: "captured", status: "paid", isFinalized: true } as any,
      overrideAccess: true,
    });
    return { success: true, status: paymentIntent.status };
  }

  return { success: false, status: paymentIntent.status };
}
