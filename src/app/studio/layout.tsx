"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronsLeft, ChevronsRight, Settings, Shield } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SIDEBAR_ITEMS } from "@/components/studio/sidebar-items";
import { cn } from "@/lib/utils";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-surface-0 text-text-primary">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-default bg-surface-1 px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b1b33] text-white">
            <Shield className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base font-bold tracking-tight">CyberSutra</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary" />
          </button>

          <button
            type="button"
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <Settings className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>

          <ThemeToggle className="h-9 w-9" />

          <button
            type="button"
            aria-label="Account"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
          >
            MC
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div
          className={cn(
            "flex min-h-0 shrink-0 flex-col border-r border-border-default bg-surface-1 transition-[width] duration-200",
            collapsed ? "w-12" : "w-64"
          )}
        >
          <nav
            aria-label="Studio sections"
            className={cn(
              "grid min-h-0 flex-1 [grid-template-rows:repeat(20,minmax(0,1fr))] overflow-hidden p-1.5",
              collapsed && "justify-items-center"
            )}
          >
            {SIDEBAR_ITEMS.map(({ label, slug, icon: Icon }) => {
              const href = `/studio${slug ? `/${slug}` : ""}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  title={collapsed ? label : undefined}
                  className={cn(
                    "flex min-h-0 items-center gap-2 rounded-md text-left text-[11.5px] font-medium leading-tight transition-colors duration-150",
                    collapsed ? "w-9 justify-center px-0" : "w-full px-2.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                  )}
                >
                  <Icon className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                  {collapsed ? null : <span className="truncate">{label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="shrink-0 border-t border-border-default p-1.5">
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className={cn(
                "flex h-8 items-center gap-2 rounded-md text-text-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                collapsed ? "w-9 justify-center px-0" : "w-full px-2.5"
              )}
            >
              {collapsed ? (
                <ChevronsRight className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
              ) : (
                <>
                  <ChevronsLeft className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                  <span className="truncate text-[11.5px] font-medium">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
