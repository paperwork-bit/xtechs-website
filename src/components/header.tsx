"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

type DropdownItem = { name: string; href: string };
type NavItem = {
  name: string;
  href: string;
  comingSoon?: boolean;
  dropdown?: DropdownItem[];
};

/* ===== Mobile Overlay rendered via Portal (full-screen) ===== */
function MobileNavOverlay({
  navigation,
  onClose,
}: {
  navigation: NavItem[];
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  // Khóa scroll nền khi mở
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
      {/* TopBar trong overlay */}
      <div className="h-14 flex items-center justify-between px-2 border-b">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={onClose}
        >
          <Image
            src="/xlogo.webp"
            alt="xTechs Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
            unoptimized
          />
        </Link>
        <button
          className="shrink-0"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="
          flex-1 overflow-y-auto
          px-4 pt-4
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
        // Momentum scroll 
        style={{ WebkitOverflowScrolling: "touch" as any }}
      >
        <nav className="space-y-4">
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

/* ===================== Header ===================== */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/xlogo.webp"
                alt="xTechs Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
                unoptimized
              />
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm">Get a quote</Button>
              <Button size="sm">Request call back</Button>
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
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/xlogo.webp"
              alt="xTechs Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={() => item.dropdown && handleMouseLeave()}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-sm font-medium hover:text-brand-primary transition-colors"
                  onKeyDown={(e) => item.dropdown && handleKeyDown(e, item.name)}
                  tabIndex={0}
                >
                  <span>{item.name}</span>
                  {item.comingSoon && (
                    <span className="text-xs bg-brand-secondary-light/20 text-brand-secondary px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown desktop */}
                {item.dropdown && activeDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg py-2 z-50"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Get a quote</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact">Request call back</Link>
            </Button>
          </div>

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
        <MobileNavOverlay
          navigation={navigation}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}