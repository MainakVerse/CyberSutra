"use client";

import * as React from "react";
import {
  AlertTriangle,
  ChevronDown,
  Search,
  Plus,
  Shield,
  Zap,
  FolderKey,
  Terminal,
  Mail,
  Bell,
  Laptop,
  Server,
  Cpu,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Severity = "Critical" | "High" | "Medium" | "Low";

const SEVERITY_CLASS: Record<Severity, string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-warning/10 text-warning",
  Medium: "bg-info/10 text-info",
  Low: "bg-text-secondary/10 text-text-secondary",
};

const DETAILS: Array<{ label: string; value: React.ReactNode }> = [
  { label: "Incident ID", value: "INC-2026-0918-0042" },
  { label: "Detected", value: "8 Sep 2026, 10:24 AM (IST)" },
  { label: "Last Updated", value: "8 Sep 2026, 2:27 PM (IST)" },
  { label: "Duration", value: "4h 3m" },
  { label: "Affected Assets", value: "12 endpoints, 3 servers" },
  { label: "Attack Vector", value: "Phishing (Initial Access)" },
  { label: "Threat Actor", value: "Unknown (Likely Ransomware Group)" },
];

const MITRE_TTPS = ["T1566", "T1021", "T1486"];

const AFFECTED_ASSETS: Array<{
  name: string;
  meta: string;
  status: "Infected" | "Suspicious" | "Investigating" | "At Risk";
  icon: React.ElementType;
}> = [
  { name: "FIN-WS-023", meta: "Windows 11", status: "Infected", icon: Laptop },
  { name: "HR-SRV-01", meta: "Windows Server", status: "Infected", icon: Server },
  { name: "DEV-LT-441", meta: "Windows 11", status: "Suspicious", icon: Laptop },
  { name: "APP-SRV-03", meta: "Linux", status: "Investigating", icon: Cpu },
  { name: "DB-SRV-02", meta: "Windows Server", status: "At Risk", icon: Server },
];

const ASSET_STATUS_CLASS: Record<string, string> = {
  Infected: "text-error",
  Suspicious: "text-warning",
  Investigating: "text-info",
  "At Risk": "text-warning",
};

const ASSET_STATUS_DOT: Record<string, string> = {
  Infected: "bg-error",
  Suspicious: "bg-warning",
  Investigating: "bg-info",
  "At Risk": "bg-warning",
};

const INCIDENT_TABS = [
  "Timeline",
  "Investigation",
  "Evidence (24)",
  "Containment",
  "Eradication",
  "Recovery",
  "Post-Incident",
];

const PHASE_CLASS: Record<string, string> = {
  Containment: "bg-error/10 text-error",
  Detection: "bg-info/10 text-info",
  Execution: "bg-warning/10 text-warning",
  "Credential Access": "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  "Initial Access": "bg-success/10 text-success",
};

const PHASE_DOT: Record<string, string> = {
  Containment: "bg-error",
  Detection: "bg-info",
  Execution: "bg-warning",
  "Credential Access": "bg-[#8b5cf6]",
  "Initial Access": "bg-success",
};

const TIMELINE: Array<{
  time: string;
  ago: string;
  title: string;
  desc: string;
  source: string;
  phase: keyof typeof PHASE_CLASS;
  icon: React.ElementType;
  iconClass: string;
}> = [
  {
    time: "2:27 PM",
    ago: "4 min ago",
    title: "Containment action initiated",
    desc: "Network isolation applied to FIN-WS-023, HR-WS-087 and 10 other endpoints.",
    source: "SOAR",
    phase: "Containment",
    icon: Shield,
    iconClass: "bg-error/10 text-error",
  },
  {
    time: "2:14 PM",
    ago: "17 min ago",
    title: "Lateral movement detected",
    desc: "Suspicious SMB activity from FIN-WS-023 to APP-SRV-03.",
    source: "EDR",
    phase: "Detection",
    icon: Zap,
    iconClass: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  },
  {
    time: "1:52 PM",
    ago: "39 min ago",
    title: "Mass file encryption activity",
    desc: "High volume of file modification with .locked extension.",
    source: "Endpoint",
    phase: "Execution",
    icon: FolderKey,
    iconClass: "bg-warning/10 text-warning",
  },
  {
    time: "1:34 PM",
    ago: "57 min ago",
    title: "Suspicious PowerShell execution",
    desc: "Encoded command executed by user j.smith.",
    source: "SIEM",
    phase: "Execution",
    icon: Terminal,
    iconClass: "bg-info/10 text-info",
  },
  {
    time: "12:11 PM",
    ago: "2h 20m ago",
    title: "Credential access attempt",
    desc: "Possible LSASS memory access detected.",
    source: "EDR",
    phase: "Credential Access",
    icon: Zap,
    iconClass: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  },
  {
    time: "11:42 AM",
    ago: "2h 49m ago",
    title: "Phishing email delivered",
    desc: "User j.smith received a suspicious email with attachment.",
    source: "Email Gateway",
    phase: "Initial Access",
    icon: Mail,
    iconClass: "bg-success/10 text-success",
  },
  {
    time: "10:24 AM",
    ago: "4h 3m ago",
    title: "Alert triggered",
    desc: "Ransomware behavior detected on FIN-WS-023.",
    source: "SIEM",
    phase: "Detection",
    icon: Bell,
    iconClass: "bg-info/10 text-info",
  },
];

const RESPONDERS: Array<{
  name: string;
  role: string;
  initials: string;
  status: "Online" | "In a call" | "Away" | "Offline";
}> = [
  { name: "Alex Shah", role: "Incident Commander", initials: "AS", status: "Online" },
  { name: "Priya Mehta", role: "SOC Analyst", initials: "PM", status: "Online" },
  { name: "Rohan Kulkarni", role: "Threat Hunter", initials: "RK", status: "Online" },
  { name: "Neha Iyer", role: "IR Specialist", initials: "NI", status: "In a call" },
  { name: "Vikram Rao", role: "IT Operations", initials: "VR", status: "Away" },
  { name: "Ananya Singh", role: "Legal & Compliance", initials: "AS", status: "Offline" },
];

const RESPONDER_STATUS_DOT: Record<string, string> = {
  Online: "bg-success",
  "In a call": "bg-warning",
  Away: "bg-warning",
  Offline: "bg-text-secondary/40",
};

type TaskPriority = "High" | "Medium";

const TASKS: Array<{ label: string; who: string; when: string; priority: TaskPriority; done: boolean }> = [
  { label: "Isolate affected endpoints", who: "Rohan Kulkarni", when: "2:27 PM", priority: "High", done: true },
  { label: "Collect memory dump", who: "Priya Mehta", when: "2:15 PM", priority: "High", done: true },
  { label: "Block malicious indicators", who: "Vikram Rao", when: "1:48 PM", priority: "High", done: false },
  { label: "Review email logs", who: "Neha Iyer", when: "1:20 PM", priority: "Medium", done: false },
  { label: "Identify data exfiltration", who: "Priya Mehta", when: "12:40 PM", priority: "Medium", done: false },
];

const TASK_PRIORITY_CLASS: Record<TaskPriority, string> = {
  High: "bg-error/10 text-error",
  Medium: "bg-warning/10 text-warning",
};

const COMMS: Array<{ name: string; initials: string; time: string; message: string }> = [
  { name: "Priya Mehta", initials: "PM", time: "2:20 PM", message: "Containment in progress. Monitoring for further spread." },
  { name: "Vikram Rao", initials: "VR", time: "1:48 PM", message: "Firewall rules updated to block C2 IPs." },
];

function SectionCard({
  title,
  right,
  children,
  className,
  collapsed,
  onToggle,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  const collapsible = onToggle !== undefined;
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1",
        collapsed ? "flex-none" : className
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-3.5 py-2.5">
        {collapsible ? (
          <button
            type="button"
            onClick={onToggle}
            className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
            aria-expanded={!collapsed}
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform duration-150",
                collapsed && "-rotate-90"
              )}
              aria-hidden="true"
            />
            <h2 className="truncate text-[12px] font-bold text-text-primary">{title}</h2>
          </button>
        ) : (
          <h2 className="text-[12px] font-bold text-text-primary">{title}</h2>
        )}
        {right}
      </div>
      {collapsed ? null : <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-[10px] font-bold text-brand-primary">
      {initials}
    </span>
  );
}

export function IncidentCommanderHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 items-center gap-1.5 rounded-lg bg-error/10 px-3 text-[12px] font-semibold text-error">
        <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse" />
        1 Active Critical Incident
      </span>
    </div>
  );
}

const LEFT_SECTIONS = ["details", "assets"] as const;
type LeftSection = (typeof LEFT_SECTIONS)[number];

const RIGHT_SECTIONS = ["responders", "tasks", "comms"] as const;
type RightSection = (typeof RIGHT_SECTIONS)[number];

export function IncidentCommander() {
  const [activeIncidentTab, setActiveIncidentTab] = React.useState(0);
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [openLeft, setOpenLeft] = React.useState<LeftSection | null>("details");
  const [openRight, setOpenRight] = React.useState<RightSection | null>("tasks");

  const toggleLeft = (section: LeftSection) =>
    setOpenLeft((cur) => (cur === section ? null : section));
  const toggleRight = (section: RightSection) =>
    setOpenRight((cur) => (cur === section ? null : section));

  return (
    <div className="grid h-full grid-cols-[240px_1fr_260px] gap-3 overflow-hidden bg-surface-0 p-3">
      {/* Left column */}
      <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <SectionCard
          title="Incident Details"
          right={<button className="text-[11px] font-medium text-brand-primary hover:underline">Edit</button>}
          collapsed={openLeft !== "details"}
          onToggle={() => toggleLeft("details")}
        >
          <div className="flex flex-col gap-2.5 px-3.5 py-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-bold leading-snug text-text-primary">Ransomware behavior detected</p>
              <span className={cn("shrink-0 rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold", SEVERITY_CLASS.Critical)}>
                Critical
              </span>
            </div>
            <p className="text-[11px] leading-snug text-text-secondary">
              Multiple endpoints showing encryption activity and suspicious lateral movement.
            </p>

            <div className="mt-1 flex flex-col gap-2 border-t border-border-default pt-2.5">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex items-start justify-between gap-2 text-[11px]">
                  <span className="shrink-0 text-text-secondary">{d.label}</span>
                  <span className="text-right font-medium text-text-primary">{d.value}</span>
                </div>
              ))}
              <div className="flex items-start justify-between gap-2 text-[11px]">
                <span className="shrink-0 text-text-secondary">MITRE TTPs</span>
                <div className="flex flex-wrap justify-end gap-1">
                  {MITRE_TTPS.map((t) => (
                    <span key={t} className="rounded border border-border-default bg-surface-2 px-1.5 py-0.5 text-[9.5px] font-medium text-text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start justify-between gap-2 text-[11px]">
                <span className="shrink-0 text-text-secondary">Data Sensitivity</span>
                <span className="font-medium text-warning">High</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-[11px]">
                <span className="shrink-0 text-text-secondary">Business Impact</span>
                <span className="text-right font-medium text-text-primary">Operational disruption</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Affected Assets (15)"
          right={<button className="text-[11px] font-medium text-brand-primary hover:underline">View all</button>}
          className="flex-1"
          collapsed={openLeft !== "assets"}
          onToggle={() => toggleLeft("assets")}
        >
          <div className="flex flex-col divide-y divide-border-default px-3.5">
            {AFFECTED_ASSETS.map((a) => (
              <div key={a.name} className="flex items-center gap-2.5 py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-secondary">
                  <a.icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] font-semibold text-text-primary">{a.name}</p>
                  <p className="truncate text-[10px] text-text-secondary">{a.meta}</p>
                </div>
                <span className={cn("flex items-center gap-1 text-[10px] font-medium", ASSET_STATUS_CLASS[a.status])}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", ASSET_STATUS_DOT[a.status])} />
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Center column */}
      <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <div className="flex shrink-0 items-center justify-between gap-3 rounded-xl border border-error/30 bg-error/5 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-error" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-bold text-error">Critical Incident</p>
              <p className="text-[11px] text-text-secondary">Active ransomware behavior detected across multiple endpoints. Containment in progress.</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <div className="text-right">
              <p className="text-[9.5px] font-medium text-text-secondary">Incident Status</p>
              <button className="mt-0.5 flex items-center gap-1 rounded-md bg-error/10 px-2 py-0.5 text-[11px] font-semibold text-error">
                Containment
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-[9.5px] font-medium text-text-secondary">Severity</p>
              <button className="mt-0.5 flex items-center gap-1 rounded-md bg-error/10 px-2 py-0.5 text-[11px] font-semibold text-error">
                Critical
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-3 pt-2.5">
            {INCIDENT_TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveIncidentTab(i)}
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 px-2.5 pb-2.5 text-[11.5px] font-medium transition-colors duration-150",
                  activeIncidentTab === i
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-2 px-4 py-2.5">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex h-7 flex-1 max-w-[220px] items-center gap-1.5 rounded-md border border-border-default bg-surface-2 px-2">
                <Search className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
                <input
                  placeholder="Search timeline..."
                  className="h-full w-full bg-transparent text-[11px] text-text-primary placeholder:text-text-secondary focus:outline-none"
                />
              </div>
              <button className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
                All Events
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
              <button className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
                All Sources
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[10.5px] font-medium text-text-secondary">Show Automation</span>
              <button
                type="button"
                onClick={() => setAutoRefresh((v) => !v)}
                role="switch"
                aria-checked={autoRefresh}
                className={cn(
                  "relative shrink-0 rounded-full transition-colors duration-150",
                  autoRefresh ? "bg-brand-primary" : "bg-surface-3"
                )}
                style={{ height: 18, width: 32 }}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-surface-1 shadow-sm transition-transform duration-150",
                    autoRefresh ? "translate-x-3.5" : "translate-x-0"
                  )}
                />
              </button>
              <button className="flex h-7 items-center gap-1 rounded-md bg-brand-primary px-2.5 text-[11px] font-semibold text-white hover:bg-brand-primary-hover">
                <Plus className="h-3 w-3" aria-hidden="true" />
                Add Event
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-2">
            <div className="flex shrink-0 items-center justify-between pb-2">
              <h3 className="text-[12px] font-bold text-text-primary">Incident Timeline</h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10.5px] text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Auto-refresh
                </span>
                <button className="flex h-6 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-1.5 text-[10.5px] font-medium text-text-secondary hover:bg-surface-2">
                  Newest first
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto pl-1 pr-1">
              <div className="absolute bottom-2 left-[19px] top-1 w-px bg-border-default" aria-hidden="true" />
              <div className="flex flex-col gap-4">
                {TIMELINE.map((ev, i) => (
                  <div key={i} className="relative flex gap-3">
                    <span className={cn("relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full", ev.iconClass)}>
                      <ev.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 pb-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[12px] font-semibold text-text-primary">{ev.title}</p>
                        <span className="shrink-0 text-[10.5px] font-medium text-text-secondary">{ev.time}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-snug text-text-secondary">{ev.desc}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[10px] text-text-secondary">{ev.source}</span>
                        <span className={cn("rounded px-1.5 py-0.5 text-[9.5px] font-semibold", PHASE_CLASS[ev.phase])}>
                          {ev.phase}
                        </span>
                        <span className="text-[10px] text-text-secondary">{ev.ago}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-2 flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-default py-2 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add timeline event
            </button>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <SectionCard
          title="Responders (6)"
          right={<button className="text-[11px] font-medium text-brand-primary hover:underline">Manage</button>}
          collapsed={openRight !== "responders"}
          onToggle={() => toggleRight("responders")}
        >
          <div className="flex flex-col divide-y divide-border-default px-3.5">
            {RESPONDERS.map((r) => (
              <div key={r.name + r.role} className="flex items-center gap-2.5 py-2.5">
                <Avatar initials={r.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] font-semibold text-text-primary">{r.name}</p>
                  <p className="truncate text-[10px] text-text-secondary">{r.role}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-text-secondary">
                  <span className={cn("h-1.5 w-1.5 rounded-full", RESPONDER_STATUS_DOT[r.status])} />
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Tasks (8)"
          right={<button className="text-[11px] font-medium text-brand-primary hover:underline">Add Task</button>}
          className="flex-1"
          collapsed={openRight !== "tasks"}
          onToggle={() => toggleRight("tasks")}
        >
          <div className="flex flex-col gap-2.5 px-3.5 py-2.5">
            {TASKS.map((t) => (
              <label key={t.label} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  defaultChecked={t.done}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-border-default accent-brand-primary"
                />
                <div className="min-w-0 flex-1">
                  <p className={cn("text-[11.5px] font-medium leading-snug", t.done ? "text-text-secondary line-through" : "text-text-primary")}>
                    {t.label}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="truncate text-[10px] text-text-secondary">{t.who} · {t.when}</span>
                    <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[9.5px] font-semibold", TASK_PRIORITY_CLASS[t.priority])}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              </label>
            ))}
            <button className="mt-1 text-left text-[11px] font-medium text-brand-primary hover:underline">
              View all tasks →
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="Communications"
          right={<button className="text-[11px] font-medium text-brand-primary hover:underline">Open in Comms</button>}
          collapsed={openRight !== "comms"}
          onToggle={() => toggleRight("comms")}
        >
          <div className="flex flex-col gap-3 px-3.5 py-2.5">
            {COMMS.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <Avatar initials={c.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[11px] font-semibold text-brand-primary">{c.name}</span>
                    <span className="shrink-0 text-[10px] text-text-secondary">{c.time}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-snug text-text-secondary">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
