"use client";

import * as React from "react";
import {
  Bell,
  Settings,
  Shield,
  Sparkles,
  Radar,
  Fingerprint,
  Crosshair,
  Code2,
  Network,
  Laptop,
  Gauge,
  KeyRound,
  DatabaseBackup,
  Workflow,
  BrainCircuit,
  Microscope,
  ClipboardList,
  ScrollText,
  GraduationCap,
  FlaskConical,
  Building2,
  Cloud,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AiCopilotPanel } from "@/components/studio/ai-copilot-panel";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { label: "AI Copilot", icon: Sparkles },
  { label: "Threat Operations (SOC)", icon: Radar },
  { label: "Threat Intelligence", icon: Fingerprint },
  { label: "Detection Engineering", icon: Crosshair },
  { label: "Offensive & Validation", icon: Crosshair },
  { label: "Application Security (AppSec)", icon: Code2 },
  { label: "Endpoint, Network & Cloud", icon: Network },
  { label: "Endpoint & Device Management", icon: Laptop },
  { label: "Exposure & Posture Management", icon: Gauge },
  { label: "Identity & Zero Trust", icon: KeyRound },
  { label: "Data Protection & Resilience", icon: DatabaseBackup },
  { label: "Automation & Response", icon: Workflow },
  { label: "AI Security & Governance", icon: BrainCircuit },
  { label: "Forensics & Engineering", icon: Microscope },
  { label: "GRC & Risk", icon: ClipboardList },
  { label: "Compliance & Privacy", icon: ScrollText },
  { label: "Advisory & Awareness", icon: GraduationCap },
  { label: "Emerging & Specialized", icon: FlaskConical },
  { label: "MSP & Business", icon: Building2 },
  { label: "Platform & DevOps", icon: Cloud },
] as const;

export default function StudioPage() {
  const [active, setActive] = React.useState<string>(SIDEBAR_ITEMS[0].label);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-surface-0 text-text-primary">
      {/* Top navbar */}
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

      {/* Body: sidebar + empty content */}
      <div className="flex min-h-0 flex-1">
        <nav
          aria-label="Studio sections"
          className="grid min-h-0 w-64 shrink-0 [grid-template-rows:repeat(20,minmax(0,1fr))] overflow-hidden border-r border-border-default bg-surface-1 p-1.5"
        >
          {SIDEBAR_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActive(label)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-0 items-center gap-2 rounded-md px-2.5 text-left text-[11.5px] font-medium leading-tight transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                )}
              >
                <Icon className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        <main className="flex-1 overflow-hidden">
          {active === "AI Copilot" ? <AiCopilotPanel /> : null}
        </main>
      </div>
    </div>
  );
}
