"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * The global floating pill nav is hidden on /account pages, which have their
 * own dedicated top bar (see AccountTopBar) instead. `children` is the
 * already-rendered SiteHeader output from the server layout — we're only
 * deciding here whether to show it, not re-fetching or re-rendering it.
 */
export default function HeaderVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/account")) return null;
  return <>{children}</>;
}
