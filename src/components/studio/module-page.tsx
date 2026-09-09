"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type ModuleTab = {
  label: string;
  icon: LucideIcon;
};

function ModuleDropdown({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: ModuleTab[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const ActiveIcon = tabs[activeTab].icon;

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-9 items-center gap-2 rounded-lg border border-border-default bg-surface-1 px-3 text-[12.5px] font-medium text-text-primary transition-colors duration-150 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <ActiveIcon className="h-3.5 w-3.5 shrink-0 text-brand-primary" aria-hidden="true" />
        <span className="max-w-[180px] truncate">{tabs[activeTab].label}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform duration-150", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full z-20 mt-1.5 max-h-[70vh] w-[280px] overflow-y-auto rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg"
        >
          {tabs.map(({ label, icon: Icon }, i) => {
            const isActive = i === activeTab;
            return (
              <button
                key={label}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(i);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[12.5px] font-medium transition-colors duration-150",
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="flex-1 truncate">{label}</span>
                {isActive ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function ModulePage({
  tabs,
  emptyTitle,
  emptyDescription,
  renderContent,
  renderHeaderLeft,
  renderHeaderRight,
}: {
  tabs: ModuleTab[];
  emptyTitle: string;
  emptyDescription: string;
  renderContent?: (activeTab: number) => React.ReactNode | null;
  renderHeaderLeft?: (activeTab: number) => React.ReactNode | null;
  renderHeaderRight?: (activeTab: number) => React.ReactNode | null;
}) {
  const [activeTab, setActiveTab] = React.useState(0);
  const customContent = renderContent?.(activeTab);
  const headerLeft = renderHeaderLeft?.(activeTab);
  const headerRight = renderHeaderRight?.(activeTab);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative z-30 flex shrink-0 items-center justify-center border-b border-border-default px-6 py-4">
        {headerLeft ? (
          <div className="absolute left-6 top-1/2 -translate-y-1/2">{headerLeft}</div>
        ) : null}
        <h1 className="text-[16px] font-bold tracking-tight text-text-primary">
          {tabs[activeTab].label}
        </h1>
        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {headerRight}
          <ModuleDropdown tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {customContent ? (
        <div className="flex flex-1 flex-col overflow-hidden">{customContent}</div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-6">
          <EmptyStateIllustration />
          <div className="text-center">
            <p className="text-[15px] font-bold text-text-primary">{emptyTitle}</p>
            <p className="mt-1 text-[13px] text-text-secondary">{emptyDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyStateIllustration() {
  return (
    <svg width="88" height="70" viewBox="0 0 88 70" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="86" height="60" rx="6" className="fill-surface-1 stroke-border-default" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="1.5" className="fill-border-default" />
      <circle cx="14.5" cy="9" r="1.5" className="fill-border-default" />
      <circle cx="20" cy="9" r="1.5" className="fill-border-default" />
      <line x1="1" y1="15" x2="87" y2="15" className="stroke-border-default" strokeWidth="1.5" />
      <circle cx="60" cy="46" r="20" className="stroke-teal-400/25" strokeWidth="1.5" />
      <circle cx="60" cy="46" r="13" className="stroke-teal-400/40" strokeWidth="1.5" />
      <circle cx="60" cy="46" r="6" className="stroke-teal-400/70" strokeWidth="1.5" />
      <circle cx="60" cy="46" r="1.6" className="fill-teal-400" />
      <line x1="70" y1="36" x2="61.3" y2="44.7" className="stroke-teal-400" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
