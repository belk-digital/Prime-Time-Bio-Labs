"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Settings,
  Heart,
  LogOut,
} from "lucide-react";

export const ACCOUNT_NAV_ITEMS = [
  { href: "/account", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/account/orders", label: "Orders", icon: Package, exact: false },
  { href: "/account/addresses", label: "Addresses", icon: MapPin, exact: false },
  { href: "/account/settings", label: "Settings", icon: Settings, exact: false },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart, exact: false },
] as const;

export function isNavItemActive(
  pathname: string,
  href: string,
  exact: boolean
) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface AccountSidebarProps {
  userName: string;
  userEmail: string;
}

export function AccountSidebar({ userName, userEmail }: AccountSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)] sticky top-24 md:top-28 border-r border-white/10 bg-[#0b0b0b] px-5 py-8">
      <Link href="/" className="mb-10 block">
        <img
          src="/primtime-biolabs-logo.svg"
          alt="Primetime Biolabs"
          className="h-9 w-auto"
        />
      </Link>

      <div className="mb-8 px-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
          Signed in as
        </p>
        <p className="text-sm font-medium text-white truncate">{userName}</p>
        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {ACCOUNT_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(pathname, item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wide transition-all ${
                active
                  ? "bg-indigo-600/20 border border-indigo-500/40 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "border border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wide text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent transition-all"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        Sign Out
      </button>
    </aside>
  );
}
