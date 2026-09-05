import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { CheckCircle2, Clock, Package } from "lucide-react";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const MANUAL_PAYMENT_METHODS = new Set(["zelle", "amex", "circoflows", "stripe_link"]);

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const payload = await getPayload({ config });

  let order: any = null;
  try {
    const numericId = Number(id);
    order = await payload.findByID({
      collection: "orders",
      id: Number.isNaN(numericId) ? id : numericId,
      depth: 1,
      overrideAccess: true,
    });
  } catch {
    return notFound();
  }

  if (!order) return notFound();

  const items: any[] = Array.isArray(order.items) ? order.items : [];
  const shippingAddress = order.shippingAddress;
  const isPendingManualPayment =
    MANUAL_PAYMENT_METHODS.has(order.paymentMethod) && order.paymentStatus === "unpaid";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-12 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-4xl font-michroma uppercase font-bold tracking-wider">
            Order Confirmed
          </h1>
          <p className="text-sm text-gray-400">
            Order{" "}
            <span className="text-white font-medium">#{order.orderNumber || order.id}</span> has
            been received.
          </p>
        </div>

        {isPendingManualPayment && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-amber-300 uppercase tracking-widest">
                Payment Pending Confirmation
              </h2>
              <p className="text-xs text-amber-300/70 mt-2 leading-relaxed">
                {order.paymentMethod === "zelle" &&
                  "We've reserved your order. Please complete your Zelle payment for the total amount below and our team will confirm receipt shortly."}
                {order.paymentMethod === "amex" &&
                  "We've reserved your order. Our team will reach out with instructions to complete your American Express payment."}
                {order.paymentMethod === "circoflows" &&
                  "Your order has been created and is awaiting confirmation from CircoFlows. We'll update your order status once payment clears."}
                {order.paymentMethod === "stripe_link" &&
                  "A secure payment link has been generated for this order. Please check your email to complete payment."}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-5 border-b border-white/10 pb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Items
          </h2>
          <div className="flex flex-col gap-5">
            {items.length > 0 ? (
              items.map((item, idx) => {
                const product =
                  typeof item.product === "object" && item.product !== null ? item.product : null;
                const title = product?.name || item.variantTitle || "Product";
                const price = Number(item.price || 0);
                const quantity = Number(item.quantity || 1);
                return (
                  <div key={item.id || idx} className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{title}</span>
                      {item.variantTitle && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                          {item.variantTitle}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 mt-1">Qty {quantity}</span>
                    </div>
                    <span className="text-sm font-light text-white shrink-0">
                      ${(price * quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No items recorded.</p>
            )}
          </div>
        </div>

        {shippingAddress?.line1 && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-4">
              Shipping Address
            </h2>
            <div className="flex flex-col gap-1 text-sm text-gray-400">
              <span>{shippingAddress.line1}</span>
              {shippingAddress.line2 && <span>{shippingAddress.line2}</span>}
              <span>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
              </span>
              <span>{shippingAddress.country}</span>
            </div>
          </div>
        )}

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-1">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span>${Number(order.subtotal || 0).toFixed(2)}</span>
          </div>
          {!!order.discountTotal && (
            <div className="flex justify-between text-sm text-emerald-400">
              <span>Discount</span>
              <span>-${Number(order.discountTotal).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-400">
            <span>Shipping</span>
            <span>{order.shippingTotal ? `$${Number(order.shippingTotal).toFixed(2)}` : "Free"}</span>
          </div>
          {!!order.feeTotal && (
            <div className="flex justify-between text-sm text-gray-400">
              <span>Fees</span>
              <span>${Number(order.feeTotal).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 mt-1 border-t border-white/10 text-white font-medium">
            <span className="text-sm">Total</span>
            <span className="text-2xl font-light">${Number(order.total || 0).toFixed(2)}</span>
          </div>
        </div>

        <Link
          href="/shop"
          className="w-fit mx-auto px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      <Footer />
    </div>
  );
}
