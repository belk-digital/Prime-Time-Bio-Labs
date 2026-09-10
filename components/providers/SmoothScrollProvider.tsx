"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

const DISABLED_PREFIXES = ["/pb-console", "/admin"];

/**
 * Lenis takes over native scrolling and manages its own virtual scroll height for
 * smooth-scroll effects on the storefront. The Payload admin panel is a completely
 * separate app nested inside this same root layout — it manages its own layout/scroll
 * containers, and Lenis's virtual height doesn't track Payload's dynamic content
 * (forms, modals, sidebar), which caused pages there to stop scrolling before the
 * real bottom. Never run Lenis on admin routes.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (DISABLED_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
