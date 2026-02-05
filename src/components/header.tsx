"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

/* ------------------------------------------------
 * Types
 * ------------------------------------------------ */
type DropdownItem = { name: string; href: string };
type NavItem = {
  name: string;
  href: string;
  comingSoon?: boolean;
  dropdown?: DropdownItem[];
};

/* ------------------------------------------------
 * Small utility: normalize path to compare active route
 * - This ensures trailing slashes or query strings don't break matching.
 * ------------------------------------------------ */
function normalizePath(path?: string | null) {
  if (!path) return "/";
  try {
    const url = new URL(path, "https://dummy.local");
    let p = url.pathname;
    if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    // path may already be a pathname
    let p = path;
    if (p.includes("?")) p = p.split("?")[0];
    if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  }
}

/* ------------------------------------------------
 * Reusable NavLink with hover/active underline animation
 * - Uses a pseudo underline div absolutely positioned at bottom.
 * - Active: underline visible (full width)
 * - Hover/Focus-visible: animate underline from 0 → 100%
 * - Also marks aria-current="page" for a11y when active.
 * ------------------------------------------------ */
function NavLink({
  href,
  isActive,
  children,
  className = "",
  onClick,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        "relative inline-flex items-center gap-1",
        "text-sm font-medium whitespace-nowrap",
        "transition-colors hover:text-brand-primary focus-visible:text-brand-primary",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 rounded-[3px]",
        className,
      ].join(" ")}
    >
      {/* Text content */}
      <span>{children}</span>

      {/* Animated underline: uses absolute div at bottom */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute left-0 -bottom-[6px] h-[2px] rounded-full",
          "bg-[#007F5F]",
          "transition-all duration-200 ease-out",
          // idle width 0; hover/active width 100%
          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
        ].join(" ")}
      />
    </Link>
  );
}

/* ------------------------------------------------
 * Tablet (md–lg) dropdown via portal (fixed menu)
 * - Renders outside the scroll container so it's not clipped by overflow-x
 * - Positions below the tapped anchor using getBoundingClientRect
 * ------------------------------------------------ */
type TabletDropdownPortalProps = {
  open: boolean;
  anchorRect: DOMRect | null;
  items: DropdownItem[];
  onClose: () => void;
};

function TabletDropdownPortal({
  open,
  anchorRect,
  items,
  onClose,
}: TabletDropdownPortalProps) {
  // Close on ESC / resize / scroll anywhere
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onResize = () => onClose();
    const onScroll = () => onClose();
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, onClose]);

  if (!open || !anchorRect) return null;

  const SPACING = 8;
  const MENU_W = 256; // Tailwind w-64
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;

  const top = anchorRect.bottom + SPACING;
  let left = anchorRect.left;
  if (left + MENU_W > vw - SPACING) {
    left = Math.max(SPACING, vw - MENU_W - SPACING);
  }

  return createPortal(
    <>
      {/* Backdrop to catch outside taps (transparent) */}
      <div className="fixed inset-0 z-[9999]" onClick={onClose} aria-hidden="true" />
      {/* The dropdown menu */}
      <div
        role="menu"
        aria-label="Tablet dropdown"
        className="fixed z-[10000] bg-white border rounded-md shadow-lg w-64 py-2"
        style={{ top, left }}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((it) => (
          <Link
            key={it.name}
            href={it.href}
            className={[
              "group block px-4 py-2 text-sm transition-colors whitespace-nowrap",
              "hover:text-brand-primary",
              "relative",
            ].join(" ")}
            onClick={onClose}
          >
            {it.name}
            {/* Hover underline inside portal items */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 right-4 bottom-1 h-[2px] bg-current rounded-full w-0 opacity-0 transition-all duration-200 ease-out group-hover:w-[calc(100%-2rem)] group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </>,
    document.body
  );
}

/* ------------------------------------------------
 * Mobile full-screen overlay (unchanged, with logo fix)
 * ------------------------------------------------ */
function MobileNavOverlay({
  navigation,
  onClose,
}: {
  navigation: NavItem[];
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="
        fixed inset-0 z-[9998]
        bg-background
        flex flex-col
        md:hidden
      "
      role="dialog"
      aria-modal="true"
    >
      <div className="h-14 flex items-center justify-between px-2 border-b">
        {/* Logo (no stretch) */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={onClose}
          aria-label="xTechs Renewables – Home"
        >
          <div className="relative h-8 w-[104px]">
            <Image
              src="/xlogo.webp"
              alt="" /* decorative image */
              fill
              sizes="(min-width:768px) 104px, 104px"
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <span className="sr-only">xTechs Renewables – Home</span>
        </Link>

        <button className="shrink-0" onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="
          flex-1 overflow-y-auto
          px-4 pt-4
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
        style={{ WebkitOverflowScrolling: "touch" as any }}
      >
        <nav className="space-y-4" aria-label="Mobile">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="flex items-center justify-between text-sm font-medium hover:text-brand-primary transition-colors"
                onClick={onClose}
              >
                <span>{item.name}</span>
                {item.comingSoon && (
                  <span className="text-xs bg-brand-secondary-light/20 text-brand-secondary px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </Link>

              {item.dropdown && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="block text-sm text-gray-600 hover:text-brand-primary transition-colors"
                      onClick={onClose}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 space-y-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/contact-us" onClick={onClose}>
                Get a quote
              </Link>
            </Button>
            <Button size="sm" className="w-full" asChild>
              <Link href="/contact-us" onClick={onClose}>
                Request call back
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------------------------
 * Header
 * ------------------------------------------------ */
export function Header() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* Desktop (xl+) hover dropdown handlers */
  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(itemName);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemName: string) => {
    if (e.key === "Escape") {
      setActiveDropdown(null);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveDropdown(activeDropdown === itemName ? null : itemName);
    }
  };

  /* Tablet (md–lg) tap dropdown state */
  const [mdDropdownOpen, setMdDropdownOpen] = useState(false);
  const [mdDropdownItems, setMdDropdownItems] = useState<DropdownItem[] | null>(
    null
  );
  const [mdAnchorRect, setMdAnchorRect] = useState<DOMRect | null>(null);
  const mdAnchorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onDocClick = () => {
      if (!mdDropdownOpen) return;
      setMdDropdownOpen(false);
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [mdDropdownOpen]);

  const openMdDropdown = (
    e: React.MouseEvent<HTMLAnchorElement>,
    items: DropdownItem[]
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    // If the same anchor is tapped again while open, navigate to its href (optional UX)
    if (mdDropdownOpen && mdAnchorRef.current === target) {
      const href = target.getAttribute("href");
      if (href) window.location.href = href;
      return;
    }

    setMdAnchorRect(rect);
    setMdDropdownItems(items);
    mdAnchorRef.current = target;
    setMdDropdownOpen(true);
  };

  /* Navigation data */
  const navigation: NavItem[] = [
    {
      name: "PV & Battery",
      href: "/pv-battery",
      dropdown: [
        { name: "Residential", href: "/pv-battery/residential" },
        { name: "Commercial (For Business)", href: "/pv-battery/commercial-for-business" },
        { name: "Off-Grid", href: "/pv-battery/off-grid" },
        { name: "Builders", href: "/pv-battery/builders" },
        { name: "Battery Storage", href: "/battery" },
        { name: "EV Chargers", href: "/ev-chargers" },
      ],
    },
    {
      name: "SolarFold",
      href: "/solarfold",
      dropdown: [
        { name: "For Military", href: "/solarfold/military" },
        { name: "For Mining", href: "/solarfold/mining" },
        { name: "For Communities", href: "/solarfold/communities" },
        { name: "For Emergency Power", href: "/solarfold/emergency-power" },
        { name: "For Event Power", href: "/solarfold/event-power" },
        { name: "For Short-Term Projects", href: "/solarfold/short-term-projects" },
        { name: "For Long-Term Projects", href: "/solarfold/long-term-projects" },
      ],
    },
    { name: "X-Classes", href: "/x-classes" },
    { name: "Amber VPP", href: "/amber-electric" },
    { name: "X-Vrything Platform", href: "/x-vrthing", comingSoon: true },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Helper to calculate "active" for top-level items:
  // - exact match OR current path starts with item.href (for sections with subroutes)
  const isItemActive = (href: string) => {
    const base = normalizePath(href);
    const curr = currentPath;
    if (base === "/") return curr === "/";
    return curr === base || curr.startsWith(base + "/");
  };

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* Logo (no stretch) */}
            <Link
              href="/"
              className="flex items-center space-x-2"
              aria-label="xTechs Renewables – Home"
            >
              <div className="relative h-8 w-[104px]">
                <Image
                  src="/xlogo.webp"
                  alt="" /* decorative image */
                  fill
                  sizes="(min-width:768px) 104px, 104px"
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
              <span className="sr-only">xTechs Renewables – Home</span>
            </Link>

            {/* Small placeholder while hydrating */}
            <div className="hidden md:flex xl:hidden items-center">
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-2 md:px-4">
        {/* 3 columns: Logo | Scrollable Nav | CTAs */}
        <div className="flex h-14 md:h-16 items-center justify-between gap-2">
          {/* Logo - no stretch */}
          <Link
            href="/"
            className="flex items-center space-x-2 shrink-0"
            aria-label="xTechs Renewables – Home"
          >
            <div className="relative h-8 w-[104px] xl:w-[120px]">
              <Image
                src="/xlogo.webp"
                alt="" /* decorative image */
                fill
                sizes="(min-width:1280px) 120px, 104px"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <span className="sr-only">xTechs Renewables – Home</span>
          </Link>

          {/* ======= MD–LG: horizontal scrollable nav (iPad) ======= */}
          <div className="hidden md:block xl:hidden flex-1 min-w-0 mx-2">
            <div
              className="-mx-2 px-2 overflow-x-auto scrollbar-hidden"
              style={{ WebkitOverflowScrolling: "touch" as any }}
            >
              <nav
                className="flex items-center gap-4 md:gap-5 whitespace-nowrap min-w-max"
                aria-label="Primary"
              >
                {navigation.map((item) => {
                  const shortName =
                    item.name === "X-Vrything Platform" ? "X‑Vrything" : item.name;

                  // Item WITHOUT dropdown: animated NavLink
                  if (!item.dropdown) {
                    return (
                      <div key={item.name} className="group relative">
                        <NavLink
                          href={item.href}
                          isActive={isItemActive(item.href)}
                          className="text-[13.5px]"
                        >
                          {shortName}
                        </NavLink>
                      </div>
                    );
                  }

                  // Item WITH dropdown: tap to open portal dropdown
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      ref={mdAnchorRef}
                      className={[
                        "group relative inline-flex items-center gap-1 text-[13.5px] font-medium",
                        "hover:text-brand-primary transition-colors cursor-pointer",
                      ].join(" ")}
                      onClick={(e) => openMdDropdown(e, item.dropdown!)}
                      onTouchEnd={(e) => openMdDropdown(e as any, item.dropdown!)}
                      aria-haspopup="menu"
                      aria-expanded={mdDropdownOpen}
                    >
                      <span>{shortName}</span>
                      {/* Optional: show small chevron
                      <ChevronDown className="h-3.5 w-3.5" /> */}
                      {/* Hover underline for the anchor itself */}
                      <span
                        aria-hidden="true"
                        className={[
                          "pointer-events-none absolute left-0 -bottom-[6px] h-[2px] rounded-full",
                          "bg-current transition-all duration-200 ease-out",
                          isItemActive(item.href)
                            ? "w-full opacity-100"
                            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                        ].join(" ")}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tablet dropdown rendered via portal (md–lg only) */}
          <div className="md:block xl:hidden">
            <TabletDropdownPortal
              open={mdDropdownOpen}
              anchorRect={mdAnchorRect}
              items={mdDropdownItems || []}
              onClose={() => setMdDropdownOpen(false)}
            />
          </div>

          {/* ======= XL+: full desktop nav with hover dropdown ======= */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Desktop">
            {navigation.map((item) => {
              const activeTop = isItemActive(item.href);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  {/* Top-level nav label with animated underline */}
                  <div className="group relative">
                    <NavLink
                      href={item.href}
                      isActive={activeTop}
                      className="text-sm"
                      onClick={(e) => {
                        // Optional: if top has dropdown, you can prevent navigation and open dropdown on click
                        // e.preventDefault();
                      }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {item.name}
                        {item.comingSoon && (
                          <span className="text-xs bg-brand-secondary-light/20 text-brand-secondary px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                        {item.dropdown && <ChevronDown className="h-4 w-4" />}
                      </span>
                    </NavLink>
                  </div>

                  {/* Hover dropdown (desktop) */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg py-2 z-50"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={() => handleMouseLeave()}
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      {item.dropdown.map((dropdownItem) => {
                        const ddActive = isItemActive(dropdownItem.href);
                        return (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className={[
                              "group relative block px-4 py-2 text-sm transition-colors whitespace-nowrap",
                              "hover:text-brand-primary",
                              ddActive ? "text-brand-primary" : "text-foreground",
                            ].join(" ")}
                          >
                            {dropdownItem.name}
                            {/* Hover/active underline inside dropdown */}
                            <span
                              aria-hidden="true"
                              className={[
                                "pointer-events-none absolute left-4 right-4 bottom-1 h-[2px] bg-current rounded-full",
                                "transition-all duration-200 ease-out",
                                ddActive
                                  ? "w-[calc(100%-2rem)] opacity-100"
                                  : "w-0 opacity-0 group-hover:w-[calc(100%-2rem)] group-hover:opacity-100",
                              ].join(" ")}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTAs: both visible on iPad (compact), full size on desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* iPad compact CTAs */}
            <div className="md:flex xl:hidden items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs px-3" asChild>
                <Link href="/contact">Get a quote</Link>
              </Button>
              <Button size="sm" className="text-xs px-3" asChild>
                <Link href="/contact">Request call back</Link>
              </Button>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Get a quote</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/contact">Request call back</Link>
              </Button>
            </div>
          </div>

          {/* Burger: mobile only */}
          <button
            className="md:hidden shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <MobileNavOverlay navigation={navigation} onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
}
