import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { getPayloadUser } from "@/lib/auth/getPayloadUser";
import {
  Package,
  MapPin,
  Settings,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountOverviewPage() {
  const user = await getPayloadUser();
  if (!user) redirect("/login");

  const payload = await getPayload({ config });

  const [ordersResult, wishlistsResult, addressesResult] = await Promise.all([
    payload.find({
      collection: "orders",
      where: { owner: { equals: user.id } },
      sort: "-createdAt",
      limit: 3,
      overrideAccess: true,
    }),
    payload.find({
      collection: "wishlists",
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    }),
    payload.find({
      collection: "addresses",
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    }),
  ]);

  const orders = ordersResult.docs as any[];
  const ordersPlaced = ordersResult.totalDocs;
  const wishlistCount = (wishlistsResult.docs[0] as any)?.items?.length || 0;
  const addressCount = addressesResult.totalDocs;
  const hbPoints = user.hbPoints || 0;
  const userName = user.firstName || user.email.split("@")[0];

  const stats = [
    { label: "Orders Placed", value: ordersPlaced },
    { label: "HB Points", value: hbPoints },
    { label: "Saved Addresses", value: addressCount },
    { label: "Wishlist Items", value: wishlistCount },
  ];

  const quickLinks = [
    { href: "/account/orders", label: "View Orders", icon: Package },
    { href: "/account/addresses", label: "Manage Addresses", icon: MapPin },
    { href: "/account/settings", label: "Edit Settings", icon: Settings },
    { href: "/account/wishlist", label: "View Wishlist", icon: Heart },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Welcome back
        </p>
        <h1 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-white">
          {userName}
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl font-light text-sm md:text-base">
          Manage your orders, addresses, and account preferences from your
          research portal dashboard.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.04] transition-colors"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              {stat.label}
            </p>
            <p className="text-2xl md:text-3xl font-light text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Recent Orders
            </h2>
            <Link
              href="/account/orders"
              className="text-xs font-medium uppercase tracking-widest text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="flex flex-col divide-y divide-white/5">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.orderNumber || order.id}`}
                  className="flex items-center justify-between py-4 group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                      #{order.orderNumber || order.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300">
                      ${Number(order.total || 0).toFixed(2)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/10 rounded-2xl">
              <Package className="w-6 h-6 text-gray-600 mb-3" />
              <p className="text-sm font-medium text-white">
                No orders yet
              </p>
              <p className="text-xs text-gray-500 mt-1 max-w-[220px] font-light">
                When you place an order, it will show up here.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-3">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
