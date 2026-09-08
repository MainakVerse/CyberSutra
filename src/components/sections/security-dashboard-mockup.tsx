import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronDown,
  Cog,
  FileBarChart,
  FileCheck2,
  Laptop2,
  LayoutGrid,
  ListChecks,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Workflow,
} from "lucide-react";

type SidebarItem = {
  icon: typeof LayoutGrid;
  label: string;
  active?: boolean;
};

const SIDEBAR: SidebarItem[] = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: AlertTriangle, label: "Threats" },
  { icon: ShieldAlert, label: "Incidents" },
  { icon: Laptop2, label: "Assets" },
  { icon: Shield, label: "Vulnerabilities" },
  { icon: FileCheck2, label: "Compliance" },
  { icon: FileBarChart, label: "Reports" },
  { icon: Cog, label: "Automation" },
];

type StatCard = {
  icon: typeof LayoutGrid;
  iconClass: string;
  value: string;
  label: string;
  delta: string;
  deltaClass: string;
};

const STATS: StatCard[] = [
  {
    icon: Shield,
    iconClass: "bg-error/10 text-error",
    value: "12",
    label: "Active Threats",
    delta: "↑ 3",
    deltaClass: "text-error",
  },
  {
    icon: Laptop2,
    iconClass: "bg-info/10 text-info",
    value: "1,284",
    label: "Monitored Assets",
    delta: "↑ 2%",
    deltaClass: "text-success",
  },
  {
    icon: AlertTriangle,
    iconClass: "bg-warning/10 text-warning",
    value: "7",
    label: "Open Incidents",
    delta: "↓ 5",
    deltaClass: "text-success",
  },
  {
    icon: ListChecks,
    iconClass: "bg-success/10 text-success",
    value: "98%",
    label: "Security Posture",
    delta: "↑ 2%",
    deltaClass: "text-success",
  },
];

type ThreatRow = {
  time: string;
  title: string;
  detail: string;
  severity: "Critical" | "High" | "Medium";
  status: "Investigating" | "Contained" | "Resolved";
};

const THREATS: ThreatRow[] = [
  {
    time: "10:24",
    title: "Suspicious login attempt",
    detail: "Multiple failed attempts",
    severity: "High",
    status: "Investigating",
  },
  {
    time: "09:41",
    title: "Malware detected",
    detail: "win64/agent.gen",
    severity: "Critical",
    status: "Contained",
  },
  {
    time: "08:17",
    title: "Data exfiltration pattern",
    detail: "Unusual outbound traffic",
    severity: "High",
    status: "Investigating",
  },
  {
    time: "06:52",
    title: "Privilege escalation",
    detail: "Suspicious process behavior",
    severity: "Medium",
    status: "Resolved",
  },
  {
    time: "04:33",
    title: "Powershell execution",
    detail: "Encoded command detected",
    severity: "Medium",
    status: "Resolved",
  },
];

const SEVERITY_STYLES: Record<ThreatRow["severity"], string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-error/10 text-error",
  Medium: "bg-warning/10 text-warning",
};

const STATUS_STYLES: Record<ThreatRow["status"], string> = {
  Investigating: "bg-info/10 text-info",
  Contained: "bg-warning/10 text-warning",
  Resolved: "bg-success/10 text-success",
};

const RISK_AREAS = [
  { label: "Identity & Access", value: 78, colorClass: "bg-error" },
  { label: "Endpoint Security", value: 64, colorClass: "bg-warning" },
  { label: "Data Protection", value: 52, colorClass: "bg-warning" },
  { label: "Network Security", value: 36, colorClass: "bg-success" },
];

type AutomationRow = {
  icon: typeof LayoutGrid;
  label: string;
  status: "Running" | "Queued" | "Done";
};

const AUTOMATIONS: AutomationRow[] = [
  { icon: Workflow, label: "Isolate compromised endpoint", status: "Running" },
  { icon: FileCheck2, label: "Rotate exposed credentials", status: "Queued" },
  { icon: ShieldCheck, label: "Patch CVE-2024-31021", status: "Done" },
];

const AUTOMATION_STATUS_STYLES: Record<AutomationRow["status"], string> = {
  Running: "bg-info/10 text-info",
  Queued: "bg-warning/10 text-warning",
  Done: "bg-success/10 text-success",
};

export function SecurityDashboardMockup() {
  const riskScore = 72;

  return (
    <div
      role="img"
      aria-label="Security operations dashboard showing 12 active threats, 1,284 monitored assets, 7 open incidents, a 98% security posture, a recent threat activity table, 3 active auto-remediation playbooks, and an overall risk score of 72 out of 100"
      className="flex h-full w-full overflow-hidden rounded-2xl border border-border-default bg-surface-1 shadow-lg"
    >
      <aside className="hidden w-36 shrink-0 flex-col gap-0.5 bg-[#0b1b33] p-3 sm:flex">
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold text-white">CyberSutra</span>
        </div>
        {SIDEBAR.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium ${
              item.active
                ? "bg-brand-primary text-white"
                : "text-white/60"
            }`}
          >
            <item.icon className="h-3 w-3 shrink-0" aria-hidden="true" />
            {item.label}
          </div>
        ))}
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2.5 border-b border-border-default px-3 py-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border-default bg-surface-2 px-2.5 py-1.5">
            <Search className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
            <span className="truncate text-[11px] text-text-secondary">
              Search for threats, assets, users...
            </span>
          </div>
          <span className="relative shrink-0">
            <Bell className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-error" aria-hidden="true" />
          </span>
          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b1b33] text-[9px] font-semibold text-white">
              AS
            </span>
            <span className="hidden flex-col leading-tight md:flex">
              <span className="text-[10px] font-semibold text-text-primary">
                Aarav Sharma
              </span>
              <span className="text-[9px] text-text-secondary">
                Security Operations
              </span>
            </span>
            <ChevronDown className="hidden h-3 w-3 text-text-secondary md:block" aria-hidden="true" />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xs font-semibold text-text-primary">
                Security Overview
              </h3>
              <p className="mt-0.5 text-[10px] text-text-secondary">
                Real-time protection across your digital environment
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-md border border-border-default px-1.5 py-1 text-[9px] text-text-secondary">
              Last 24 hours
              <ChevronDown className="h-2.5 w-2.5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-4 gap-1.5">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border-default bg-surface-1 p-2"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-md ${stat.iconClass}`}
                >
                  <stat.icon className="h-3 w-3" aria-hidden="true" />
                </span>
                <p className="mt-1.5 font-mono text-base font-semibold tabular-nums text-text-primary">
                  {stat.value}
                </p>
                <p className="text-[9px] leading-tight text-text-secondary">{stat.label}</p>
                <p className={`mt-0.5 font-mono text-[9px] tabular-nums ${stat.deltaClass}`}>
                  {stat.delta} vs. prev
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-[1fr_180px] gap-2.5">
            <div className="flex flex-col gap-2.5">
              <div className="rounded-lg border border-border-default bg-surface-1 p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-text-primary">
                    Recent Threat Activity
                  </p>
                  <span className="text-[9px] font-medium text-brand-primary">
                    View all →
                  </span>
                </div>
                <ul className="mt-1 flex flex-col divide-y divide-border-default">
                  {THREATS.slice(0, 3).map((threat) => (
                    <li
                      key={threat.title}
                      className="flex items-center gap-2 py-1.5 text-[10px]"
                    >
                      <span className="w-8 shrink-0 font-mono tabular-nums text-text-secondary">
                        {threat.time}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-text-primary">
                          {threat.title}
                        </p>
                        <p className="truncate text-[9px] text-text-secondary">{threat.detail}</p>
                      </div>
                      <span
                        className={`hidden shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium sm:inline-block ${SEVERITY_STYLES[threat.severity]}`}
                      >
                        {threat.severity}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${STATUS_STYLES[threat.status]}`}
                      >
                        {threat.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border-default bg-surface-1 p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-text-primary">
                    Automation &amp; Response
                  </p>
                  <span className="flex items-center gap-1 text-[9px] font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                    3 playbooks active
                  </span>
                </div>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {AUTOMATIONS.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-2 rounded-md bg-surface-2 px-2 py-1 text-[10px]"
                    >
                      <item.icon className="h-3 w-3 shrink-0 text-brand-primary" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate text-text-primary">
                        {item.label}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${AUTOMATION_STATUS_STYLES[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="rounded-lg border border-border-default bg-surface-1 p-2.5">
                <p className="text-[11px] font-semibold text-text-primary">Risk Posture</p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="var(--border-default)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="var(--color-warning)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(riskScore / 100) * 97.4} 97.4`}
                      />
                    </svg>
                    <span className="absolute font-mono text-xs font-semibold tabular-nums text-text-primary">
                      {riskScore}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5 text-[9px]">
                    <span className="flex items-center justify-between text-text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-error" aria-hidden="true" />
                        Critical
                      </span>
                      <span className="font-mono tabular-nums">12</span>
                    </span>
                    <span className="flex items-center justify-between text-text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
                        High
                      </span>
                      <span className="font-mono tabular-nums">28</span>
                    </span>
                    <span className="flex items-center justify-between text-text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-info" aria-hidden="true" />
                        Medium
                      </span>
                      <span className="font-mono tabular-nums">41</span>
                    </span>
                  </div>
                </div>
                <p className="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-success">
                  <Activity className="h-2.5 w-2.5" aria-hidden="true" />
                  +6 improved vs. last week
                </p>
              </div>

              <div className="rounded-lg border border-border-default bg-surface-1 p-2.5">
                <p className="text-[11px] font-semibold text-text-primary">Top Risk Areas</p>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {RISK_AREAS.map((area) => (
                    <li key={area.label}>
                      <div className="flex items-center justify-between text-[9px] text-text-secondary">
                        <span>{area.label}</span>
                        <span className="font-mono tabular-nums">{area.value}</span>
                      </div>
                      <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className={`h-full rounded-full ${area.colorClass}`}
                          style={{ width: `${area.value}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
