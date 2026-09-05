"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  FileText,
  Handshake,
  Heart,
  HelpCircle,
  Mail,
  Menu,
  Newspaper,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CartTriggerButton from "@/components/cart/CartTriggerButton";
import SearchOverlay from "@/components/nav/SearchOverlay";
import AnnouncementBar from "@/components/nav/AnnouncementBar";
import { formatUsd } from "@/lib/types/shop";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Research", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export const NAV_LINK_UNDERLINE_CLASS =
  "relative hover:text-white transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

// The mobile drawer surfaces every site route, not just the handful of desktop nav links —
// there's room for a full list there, so nothing should require digging through the footer.
const MOBILE_LINKS = [
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Blog / Research", href: "/blog", icon: Newspaper },
  { label: "About Us", href: "/about-us", icon: User },
  { label: "Affiliates", href: "/affiliates", icon: Handshake },
  { label: "Peptide Calculator", href: "/peptide-calculator", icon: Calculator },
  { label: "Certificates of Analysis", href: "/certificates", icon: FileText },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Contact", href: "/contact-us", icon: Mail },
];

export interface NavCategoryProduct {
  name: string;
  slug: string;
  image: string | null;
  price: number;
}

export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  products: NavCategoryProduct[];
}

interface SiteNavProps {
  categories?: NavCategory[];
  wishlistCount?: number;
  wishlistProductIds?: string[];
}

export default function SiteNav({
  categories = [],
  wishlistCount = 0,
}: SiteNavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session, status } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setIsShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (isHome) {
        if (currentScrollY > heroHeight) {
          setIsVisible(currentScrollY <= lastScrollY.current);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleShopEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsShopOpen(true);
  };

  const handleShopLeave = () => {
    closeTimer.current = setTimeout(() => setIsShopOpen(false), 150);
  };

  // Non-home pages have no dark hero image behind them, so the nav always renders
  // in its compact/opaque "scrolled" style there instead of the large transparent one.
  const compact = isScrolled || !isHome;
  const announcementActive = isHome && showAnnouncement;

  // Auth pages render their own full-screen split layout with no site chrome.
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  return (
    <>
      {announcementActive && (
        <AnnouncementBar onDismiss={() => setShowAnnouncement(false)} />
      )}

      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-center
        ${announcementActive ? "top-9" : "top-0"}
        ${isVisible ? "translate-y-0" : "-translate-y-[150%]"}
        ${compact ? "py-4" : "py-0"}`}
      >
        <nav
          ref={navRef}
          onMouseLeave={handleShopLeave}
          className={`relative flex items-center justify-between transition-all duration-500 ${
            compact
              ? "w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] bg-[#0a0a0a]/70 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-2 shadow-2xl"
              : "w-full px-4 py-6 md:px-8 lg:px-12 border-b border-white/5 bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center">
            <img
              src="/primtime-biolabs-logo.svg"
              alt="Primetime Biolabs"
              className={`w-auto transition-all duration-500 ${compact ? "h-10 md:h-12" : "h-16 md:h-24"}`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
            <div
              className="relative"
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
            >
              <Link
                href="/shop"
                className={`flex items-center gap-1.5 ${NAV_LINK_UNDERLINE_CLASS}`}
              >
                Categories
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>
            </div>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={NAV_LINK_UNDERLINE_CLASS}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {status === "authenticated" ? (
              <Link
                href="/account"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                {session.user?.firstName || "Account"}
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-sm font-medium text-gray-300 relative hover:text-white transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Login
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden xl:block text-gray-300 hover:text-white transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account/wishlist"
              className="relative hidden md:block text-gray-300 hover:text-white transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white leading-none">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>
            <CartTriggerButton />
            <div className="hidden md:block">
              <Link
                href="/shop"
                className="px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-md backdrop-blur-sm transition-all"
              >
                Shop Now
              </Link>
            </div>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mega Menu */}
          {isShopOpen && (
            <div
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
              className="hidden lg:block absolute left-0 right-0 top-full mt-3 z-40"
            >
              <div className="bg-black border border-white/10 rounded-2xl shadow-2xl p-5">
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Categories coming soon.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto no-scrollbar">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="bg-white/[0.02] border border-white/10 rounded-xl p-4"
                      >
                        <Link
                          href={`/shop?category=${category.slug}`}
                          className="block text-xs font-michroma uppercase tracking-wide text-white hover:text-indigo-300 transition-colors mb-4"
                        >
                          {category.name}
                        </Link>
                        <div className="flex flex-col gap-4">
                          {category.products.length === 0 ? (
                            <span className="text-xs text-gray-600">No products yet</span>
                          ) : (
                            category.products.map((product) => (
                              <Link
                                key={product.slug}
                                href={`/product/${product.slug}`}
                                className="flex items-center gap-3 group"
                              >
                                <div className="w-14 h-14 shrink-0 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden p-1">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={product.image || "/product-retatrutide.png"}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-300 group-hover:text-white transition-colors truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-gray-500">{formatUsd(product.price)}</p>
                                </div>
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    View All Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile drawer backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer panel — slides in from the right */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-black border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-end px-6 py-5 border-b border-white/10 shrink-0">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 flex flex-col gap-1">
          {MOBILE_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 flex items-center gap-3 text-base font-medium text-gray-300 hover:text-white border-b border-white/5 transition-colors"
              >
                <Icon className="w-4 h-4 shrink-0 text-gray-500" />
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/account/wishlist"
            className="py-3 flex items-center justify-between text-base font-medium text-gray-300 hover:text-white border-b border-white/5 transition-colors"
          >
            <span className="flex items-center gap-3">
              <Heart className="w-4 h-4 shrink-0 text-gray-500" /> Wishlist
            </span>
            {wishlistCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>
          {status === "authenticated" ? (
            <>
              <Link href="/account" className="py-3 flex items-center gap-3 text-base font-medium text-gray-300 hover:text-white border-b border-white/5 transition-colors">
                <User className="w-4 h-4 shrink-0 text-gray-500" /> Account
              </Link>
              <button
                onClick={() => signOut()}
                className="py-3 text-left text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="py-3 flex items-center gap-3 text-base font-medium text-gray-300 hover:text-white transition-colors">
              <User className="w-4 h-4 shrink-0 text-gray-500" /> Login
            </Link>
          )}
        </div>

        <div className="px-6 py-6 border-t border-white/10 shrink-0">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-md transition-all"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}
