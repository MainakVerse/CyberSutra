"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PlatformMenu } from "@/components/layout/platform-menu";
import { SolutionsMenu } from "@/components/layout/solutions-menu";
import { ResourcesMenu } from "@/components/layout/resources-menu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Platform", href: "#capabilities" },
  { label: "Solutions", href: "#roles" },
  { label: "Resources", href: "#faq" },
  { label: "Company", href: "#compliance" },
];

const DROPDOWN_LABELS = new Set(["Platform", "Solutions", "Resources"]);

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-border-default bg-surface-1/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface-1/70"
          : "border-border-default bg-surface-1"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
      >
        <Link
          href="#top"
          className="flex items-center gap-2.5 rounded-md text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b1b33] text-white">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">CyberSutra</span>
            <span className="mt-1 font-mono text-[10px] font-medium uppercase tracking-wider text-text-secondary">
              Secure today. Stronger tomorrow.
            </span>
          </span>
        </Link>

        <ul ref={navRef} className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            if (!DROPDOWN_LABELS.has(link.label)) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex h-11 items-center gap-1 rounded-lg px-4 text-sm font-medium text-text-primary transition-colors duration-200 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                  >
                    {link.label}
                    {link.label !== "Company" ? (
                      <ChevronDown className="h-4 w-4 text-text-secondary" aria-hidden="true" />
                    ) : null}
                  </Link>
                </li>
              );
            }

            const isOpen = openMenu === link.label;

            return (
              <li key={link.href} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu((current) => (current === link.label ? null : link.label))}
                  aria-expanded={isOpen}
                  className="flex h-11 items-center gap-1 rounded-lg px-4 text-sm font-medium text-text-primary transition-colors duration-200 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-text-secondary transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isOpen ? (
                  <div className="fixed left-1/2 top-20 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1600px] -translate-x-1/2">
                    {link.label === "Platform" ? (
                      <SolutionsMenu onNavigate={() => setOpenMenu(null)} />
                    ) : link.label === "Resources" ? (
                      <ResourcesMenu onNavigate={() => setOpenMenu(null)} />
                    ) : (
                      <PlatformMenu onNavigate={() => setOpenMenu(null)} />
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" size="default" className="border-none">
            Sign in
          </Button>
          <Button variant="primary" size="default" className="bg-[#0b1b33] hover:bg-[#132a52]">
            Request a demo
            <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Navigation menu">
              <div className="flex items-center gap-2 pr-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b1b33] text-white">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-base font-semibold tracking-tight text-text-primary">
                  CyberSutra
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-text-primary transition-colors duration-200 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between rounded-lg border border-border-default px-3 py-2">
                <span className="text-sm font-medium text-text-primary">Theme</span>
                <ThemeToggle />
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <Button variant="ghost" size="lg" className="w-full">
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#0b1b33] hover:bg-[#132a52]"
                >
                  Request a demo
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
