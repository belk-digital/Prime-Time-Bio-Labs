import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";
import { ArrowLeft, Package, MapPin, Truck, Receipt } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  paid: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  fulfilled: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  shipped: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  refunded: "bg-red-500/10 text-red-300 border-red-500/20",
  cancelled: "bg-red-500/10 text-red-300 border-red-500/20",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getPayloadUser();
  if (!user) redirect(`/login?redirect=/account/orders/${id}`);

  const payload = await getPayload({ config });

  let order: any = null;
  try {
    const { docs } = await payload.find({
      collection: "orders",
      where: { orderNumber: { equals: id } },
      depth: 2,
      overrideAccess: true,
    });

    if (docs.length > 0) {
      order = docs[0];
    } else {
      const numericId = Number(id);
      order = await payload.findByID({
        collection: "orders",
        id: Number.isNaN(numericId) ? id : numericId,
        depth: 2,
        overrideAccess: true,
      });
    }
  } catch {
    return notFound();
  }

  if (!order) return notFound();

  const ownerId =
    typeof order.owner === "object" && order.owner !== null
      ? order.owner.id
      : order.owner;
  if (String(ownerId) !== String(user.id) && order.guestEmail !== user.email) {
    return notFound();
  }

  const items: any[] = Array.isArray(order.items) ? order.items : [];
  const shippingAddress = order.shippingAddress;
  const billingAddress = order.billingAddress;

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
        <Link
          href="/account/orders"
          className="w-fit flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Orders
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-michroma uppercase font-bold tracking-wider text-white">
              Order #{order.orderNumber || order.id}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Placed on {formattedDate}
            </p>
          </div>
          <span
            className={`w-fit px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
              STATUS_STYLES[order.status] ||
              "bg-white/5 text-gray-300 border-white/10"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col gap-8 flex-1 w-full">
          {order.trackingLink ? (
            <div className="bg-emerald-500/[0.06] border border-emerald-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">
                    Track your package
                  </h2>
                  <p className="text-xs text-emerald-300/70 mt-1">
                    Your order is on its way.
                  </p>
                </div>
              </div>
              <a
                href={order.trackingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
              >
                Track Package
              </a>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-dashed border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Tracking pending
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  A tracking link will appear here once your order ships.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-5 border-b border-white/10 pb-4">
              Items
            </h2>
            <div className="flex flex-col gap-5">
              {items.length > 0 ? (
                items.map((item, idx) => {
                  const product =
                    typeof item.product === "object" && item.product !== null
                      ? item.product
                      : null;
                  const title = product?.name || item.variantTitle || "Product";
                  const price = Number(item.price || 0);
                  const quantity = Number(item.quantity || 1);
                  return (
                    <div
                      key={item.id || idx}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {title}
                        </span>
                        {item.variantTitle && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                            {item.variantTitle}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 mt-1">
                          Qty {quantity}
                        </span>
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
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-[320px] shrink-0">
          {shippingAddress?.line1 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white border-b border-white/10 pb-4">
                <MapPin className="w-4 h-4" />
                <h2 className="text-xs font-bold uppercase tracking-widest">
                  Shipping Address
                </h2>
              </div>
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <span>{shippingAddress.line1}</span>
                {shippingAddress.line2 && <span>{shippingAddress.line2}</span>}
                <span>
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.postalCode}
                </span>
                <span>{shippingAddress.country}</span>
              </div>
            </div>
          )}

          {billingAddress?.line1 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white border-b border-white/10 pb-4">
                <Receipt className="w-4 h-4" />
                <h2 className="text-xs font-bold uppercase tracking-widest">
                  Billing Address
                </h2>
              </div>
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <span>{billingAddress.line1}</span>
                {billingAddress.line2 && <span>{billingAddress.line2}</span>}
                <span>
                  {billingAddress.city}, {billingAddress.state}{" "}
                  {billingAddress.postalCode}
                </span>
                <span>{billingAddress.country}</span>
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
              <span>
                {order.shippingTotal
                  ? `$${Number(order.shippingTotal).toFixed(2)}`
                  : "Free"}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Tax</span>
              <span>${Number(order.taxTotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 mt-1 border-t border-white/10 text-white font-medium">
              <span className="text-sm">Total</span>
              <span className="text-2xl font-light">
                ${Number(order.total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
