"use client";

import React from "react";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/account", "/pb-console", "/admin"];

/**
 * Site chrome (the floating pill nav, age gate, cart drawer) is hidden on /account
 * pages (which have their own dedicated top bar) and on the Payload admin panel,
 * which is a completely separate app shell that should never show our storefront
 * nav on top of it. `children` is already-rendered output from the server layout —
 * we're only deciding here whether to show it, not re-fetching or re-rendering it.
 */
export default function HeaderVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) return null;
  return <>{children}</>;
}
