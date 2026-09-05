"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, Filter } from "lucide-react";

export interface OrderListItem {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  paid: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  fulfilled: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  shipped: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  refunded: "bg-red-500/10 text-red-300 border-red-500/20",
  cancelled: "bg-red-500/10 text-red-300 border-red-500/20",
};

export function OrdersClient({ orders }: { orders: OrderListItem[] }) {
  const [filter, setFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const statuses = useMemo(() => {
    const set = new Set(orders.map((o) => o.status));
    return Array.from(set);
  }, [orders]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-white">
            Orders
          </h1>
          <p className="text-gray-400 mt-3 max-w-lg text-sm font-light">
            Track and review every order you&apos;ve placed with us.
          </p>
        </div>

        {statuses.length > 0 && (
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-4 py-2">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest text-white focus:outline-none"
            >
              <option value="all" className="bg-[#0b0b0b]">
                All
              </option>
              {statuses.map((s) => (
                <option key={s} value={s} className="bg-[#0b0b0b]">
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="flex flex-col divide-y divide-white/5">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 gap-3 hover:bg-white/[0.02] -mx-4 px-4 rounded-2xl transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {order.date}
                  </span>
                  <span className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
                    #{order.id}
                  </span>
                </div>
                <span
                  className={`w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    STATUS_STYLES[order.status] ||
                    "bg-white/5 text-gray-300 border-white/10"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-lg font-light text-white">
                    ${order.total.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {order.itemCount} item{order.itemCount === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white/[0.02] border border-white/10 rounded-2xl">
          <Package className="w-10 h-10 text-gray-600 mb-5" strokeWidth={1} />
          <h2 className="text-xl font-michroma uppercase tracking-wider text-white mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 font-light max-w-sm mb-8 text-sm">
            Once you place an order it will appear here for easy tracking.
          </p>
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
