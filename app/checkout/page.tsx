"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart/store";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  // Zustand's `persist` middleware only attaches `.persist` once it detects a real
  // `window`/localStorage, which isn't available during Next's server render pass — so this
  // must never be read synchronously during the initial render, only after mount.
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(useCartStore.persist?.hasHydrated() ?? true);
    const unsub = useCartStore.persist?.onFinishHydration(() => setHasHydrated(true));
    return unsub;
  }, []);

  useEffect(() => {
    if (hasHydrated && items.length === 0) {
      router.replace("/shop");
    }
  }, [hasHydrated, items.length, router]);

  if (!hasHydrated) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  if (items.length === 0) {
    return null;
  }

  return <CheckoutClient />;
}
