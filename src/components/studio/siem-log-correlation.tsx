"use client";

import * as React from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Columns3,
  Download,
  Loader2,
  MoreHorizontal,
  Play,
  Plus,
  Save,
  Search,
  Terminal,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------- data --------------------------------- */

type Severity = "Critical" | "High" | "Medium" | "Low" | "Informational";

const SEVERITY_META: Record<Severity, { dot: string; text: string }> = {
  Critical: { dot: "bg-error", text: "text-error" },
  High: { dot: "bg-warning", text: "text-warning" },
  Medium: { dot: "bg-info", text: "text-info" },
  Low: { dot: "bg-text-secondary", text: "text-text-secondary" },
  Informational: { dot: "bg-success", text: "text-success" },
};

type FacetItem = { label: string; count: string };
type FacetGroup = { label: string; items: FacetItem[]; overflow?: number };

const LOG_SOURCE: FacetGroup = {
  label: "Log Source",
  items: [
    { label: "Windows", count: "12,642" },
    { label: "Linux", count: "8,391" },
    { label: "Firewall", count: "4,218" },
    { label: "Endpoint", count: "3,904" },
    { label: "Cloud", count: "3,221" },
  ],
  overflow: 6,
};

const EVENT_TYPE: FacetGroup = {
  label: "Event Type",
  items: [
    { label: "Authentication", count: "6,421" },
    { label: "Process", count: "5,328" },
    { label: "Network", count: "4,893" },
    { label: "File", count: "3,104" },
    { label: "System", count: "2,776" },
  ],
  overflow: 4,
};

const SEVERITY_FACET: Array<{ label: Severity; count: string }> = [
  { label: "Critical", count: "342" },
  { label: "High", count: "1,028" },
  { label: "Medium", count: "2,441" },
  { label: "Low", count: "4,892" },
  { label: "Informational", count: "19,673" },
];

const SEARCH_FACETS = ["User", "Host", "IP Address", "Application", "Location"];

const EXAMPLES = ["Failed logins", "Suspicious PowerShell", "Lateral movement", "Ransomware indicators", "Data exfiltration"];

type EventRow = {
  time: string;
  severity: Severity;
  eventType: string;
  source: string;
  destination: string;
  user: string;
  host: string;
  message: string;
};

const EVENTS: EventRow[] = [
  { time: "8 Sep 2026, 11:42:31", severity: "Critical", eventType: "Authentication", source: "192.168.10.45", destination: "-", user: "j.smith", host: "FIN-WS-023", message: "Multiple failed login attempts (7)" },
  { time: "8 Sep 2026, 11:38:17", severity: "High", eventType: "Process", source: "FIN-WS-023", destination: "-", user: "j.smith", host: "FIN-WS-023", message: "Suspicious PowerShell execution" },
  { time: "8 Sep 2026, 11:35:02", severity: "High", eventType: "Network", source: "10.10.12.14", destination: "185.199.110.23", user: "-", host: "APP-WS-03", message: "Outbound connection to rare ASN" },
  { time: "8 Sep 2026, 11:31:48", severity: "Medium", eventType: "File", source: "DEV-LT-441", destination: "-", user: "r.kulkarni", host: "DEV-LT-441", message: "Sensitive file accessed" },
  { time: "8 Sep 2026, 11:28:11", severity: "High", eventType: "Authentication", source: "203.0.113.56", destination: "-", user: "-", host: "VPN", message: "Successful login from new location" },
  { time: "8 Sep 2026, 11:22:09", severity: "Medium", eventType: "Process", source: "HR-WS-087", destination: "-", user: "n.iyer", host: "HR-WS-087", message: "Execution of unsigned binary" },
  { time: "8 Sep 2026, 11:18:55", severity: "High", eventType: "Network", source: "FIN-WS-023", destination: "104.21.78.33", user: "-", host: "FIN-WS-023", message: "DNS query to suspicious domain" },
  { time: "8 Sep 2026, 11:15:03", severity: "Low", eventType: "System", source: "DB-SRV-02", destination: "-", user: "-", host: "DB-SRV-02", message: "Service restarted" },
  { time: "8 Sep 2026, 11:12:47", severity: "Medium", eventType: "Authentication", source: "10.10.14.28", destination: "-", user: "a.singh", host: "APP-SRV-03", message: "Privilege escalation attempt" },
  { time: "8 Sep 2026, 11:08:21", severity: "High", eventType: "File", source: "DEV-LT-441", destination: "-", user: "r.kulkarni", host: "DEV-LT-441", message: "Large data archive created" },
];

const COLUMNS = ["Time", "Severity", "Event Type", "Source", "Destination", "User", "Host", "Message"] as const;

type CorrelationRule = { label: string; desc: string; enabled: boolean };

const ACTIVE_RULES: CorrelationRule[] = [
  { label: "Multiple Failed Logins", desc: "Detect brute force attempts", enabled: true },
  { label: "Suspicious PowerShell", desc: "Unusual PowerShell execution", enabled: true },
  { label: "Lateral Movement", desc: "Multiple hosts access pattern", enabled: true },
  { label: "Data Exfiltration", desc: "Large outbound data transfer", enabled: true },
  { label: "Ransomware Indicators", desc: "Known ransomware TTPs", enabled: true },
  { label: "New Geolocation Login", desc: "Login from new or rare location", enabled: true },
];

const SUGGESTED_RULES: CorrelationRule[] = [
  { label: "Impossible Travel", desc: "Logins from distant regions in short time", enabled: false },
  { label: "Privilege Escalation Chain", desc: "Sequential privilege escalation events", enabled: false },
  { label: "Beaconing Activity", desc: "Periodic outbound C2-like traffic", enabled: false },
  { label: "Mass File Deletion", desc: "Bulk deletion in short window", enabled: false },
];

type RecentCorrelation = { title: string; severity: Severity; meta: string; time: string };

const RECENT_CORRELATIONS: RecentCorrelation[] = [
  { title: "Ransomware behavior pattern", severity: "Critical", meta: "5 related events", time: "11:42 AM" },
  { title: "Suspicious lateral movement", severity: "High", meta: "3 related events", time: "11:18 AM" },
  { title: "Data exfiltration attempt", severity: "High", meta: "4 related events", time: "10:57 AM" },
  { title: "New geolocation login", severity: "Medium", meta: "2 related events", time: "10:24 AM" },
  { title: "Privilege escalation chain", severity: "Medium", meta: "6 related events", time: "09:41 AM" },
];

/* --------------------------------- header --------------------------------- */

export function SiemLogCorrelationHeaderMeta() {
  const [range, setRange] = React.useState("Last 24 hours");
  const [rangeOpen, setRangeOpen] = React.useState(false);
  const ranges = ["Last 1 hour", "Last 24 hours", "Last 7 days", "Last 30 days"];
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!rangeOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setRangeOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [rangeOpen]);

  return (
    <div className="flex items-center gap-2">
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setRangeOpen((v) => !v)}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
        >
          <Clock className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
          {range}
          <ChevronDown className={cn("h-3 w-3 text-text-secondary transition-transform", rangeOpen && "rotate-180")} aria-hidden="true" />
        </button>
        {rangeOpen ? (
          <div className="absolute left-0 top-full z-20 mt-1.5 w-40 rounded-lg border border-border-default bg-surface-1 p-1 shadow-lg">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRange(r);
                  setRangeOpen(false);
                }}
                className={cn(
                  "w-full rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium transition-colors",
                  r === range ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <span className="flex h-8 items-center gap-1.5 rounded-lg bg-success/10 px-3 text-[12px] font-medium text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Live
      </span>

      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Save className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Save Search
      </button>

      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Play className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
        Run Search
      </button>
    </div>
  );
}

/* --------------------------------- toggle --------------------------------- */

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 focus-visible:ring-offset-surface-1",
        checked ? "bg-brand-primary" : "bg-surface-3"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-150",
          checked ? "translate-x-[16px]" : "translate-x-[2px]"
        )}
      />
    </button>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        checked ? "border-brand-primary bg-brand-primary" : "border-border-default bg-surface-1"
      )}
    >
      {checked ? (
        <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none">
          <path d="M1.5 5L4 7.5L8.5 2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  );
}

/* -------------------------------- filters --------------------------------- */

function FacetGroupBlock({
  group,
  checkedSet,
  toggle,
}: {
  group: FacetGroup;
  checkedSet: Set<string>;
  toggle: (label: string) => void;
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="border-b border-border-default py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-[11.5px] font-semibold text-text-primary"
      >
        {group.label}
        <ChevronRight className={cn("h-3.5 w-3.5 text-text-secondary transition-transform duration-150", open && "rotate-90")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="mt-2 flex flex-col gap-1.5">
          {group.items.map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center gap-2 text-[12px]">
              <Checkbox checked={checkedSet.has(item.label)} onChange={() => toggle(item.label)} />
              <span className="flex-1 truncate text-text-secondary">{item.label}</span>
              <span className="text-[11px] tabular-nums text-text-secondary">{item.count}</span>
            </label>
          ))}
          {group.overflow ? (
            <button type="button" className="mt-0.5 text-left text-[11px] font-medium text-brand-primary hover:underline">
              Show {group.overflow} more
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function SeverityFacetBlock({ checkedSet, toggle }: { checkedSet: Set<string>; toggle: (label: string) => void }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="border-b border-border-default py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-[11.5px] font-semibold text-text-primary"
      >
        Severity
        <ChevronRight className={cn("h-3.5 w-3.5 text-text-secondary transition-transform duration-150", open && "rotate-90")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="mt-2 flex flex-col gap-1.5">
          {SEVERITY_FACET.map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center gap-2 text-[12px]">
              <Checkbox checked={checkedSet.has(item.label)} onChange={() => toggle(item.label)} />
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", SEVERITY_META[item.label].dot)} />
              <span className="flex-1 truncate text-text-secondary">{item.label}</span>
              <span className="text-[11px] tabular-nums text-text-secondary">{item.count}</span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FiltersPanel({
  checked,
  toggle,
  reset,
}: {
  checked: Set<string>;
  toggle: (label: string) => void;
  reset: () => void;
}) {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between px-3.5 pt-3.5">
        <h2 className="text-[13px] font-bold text-text-primary">Filters</h2>
        <button type="button" onClick={reset} className="text-[11.5px] font-medium text-brand-primary hover:underline">
          Reset
        </button>
      </div>

      <div className="shrink-0 px-3.5 pt-2.5">
        <div className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-2 px-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search fields..."
            className="h-full w-full bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5">
        <FacetGroupBlock group={LOG_SOURCE} checkedSet={checked} toggle={toggle} />
        <FacetGroupBlock group={EVENT_TYPE} checkedSet={checked} toggle={toggle} />
        <SeverityFacetBlock checkedSet={checked} toggle={toggle} />

        <div className="flex flex-col gap-3 py-3">
          {SEARCH_FACETS.map((label) => (
            <div key={label}>
              <p className="mb-1.5 text-[11.5px] font-semibold text-text-primary">{label}</p>
              <div className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-2 px-2">
                <Search className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
                <input
                  type="text"
                  placeholder={`Search ${label.toLowerCase()}s`}
                  className="h-full w-full bg-transparent text-[11.5px] text-text-primary placeholder:text-text-secondary focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- chart ---------------------------------- */

const HIST_HOURS = ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"];

const HIST_BUCKETS: Array<Record<Severity, number>> = Array.from({ length: 48 }, (_, i) => {
  const base = 20 + 18 * Math.sin((i / 48) * Math.PI * 2 - 1) + 14 * Math.sin((i / 48) * Math.PI * 5);
  const infoLevel = Math.max(base, 4);
  return {
    Critical: Math.max(0, Math.round(1 + Math.abs(Math.sin(i * 1.7)) * 2.5)),
    High: Math.max(0, Math.round(2 + Math.abs(Math.sin(i * 0.9 + 1)) * 5)),
    Medium: Math.max(0, Math.round(4 + Math.abs(Math.cos(i * 0.6)) * 9)),
    Low: Math.max(0, Math.round(3 + Math.abs(Math.sin(i * 0.4 + 2)) * 6)),
    Informational: Math.round(infoLevel),
  };
});

const HIST_SEVERITIES: Severity[] = ["Critical", "High", "Medium", "Low", "Informational"];
const HIST_COLORS: Record<Severity, string> = {
  Critical: "#e34948",
  High: "#eda100",
  Medium: "#2a78d6",
  Low: "#9ec5f4",
  Informational: "#94a3b8",
};

function EventHistogram() {
  const width = 900;
  const height = 96;
  const padBottom = 16;
  const barW = width / HIST_BUCKETS.length;
  const maxTotal = Math.max(
    ...HIST_BUCKETS.map((b) => HIST_SEVERITIES.reduce((sum, s) => sum + b[s], 0))
  );
  const plotH = height - padBottom;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      {HIST_BUCKETS.map((bucket, i) => {
        let yOffset = height - padBottom;
        return (
          <g key={i}>
            {HIST_SEVERITIES.map((sev) => {
              const h = (bucket[sev] / maxTotal) * plotH;
              yOffset -= h;
              return (
                <rect
                  key={sev}
                  x={i * barW + 0.6}
                  y={yOffset}
                  width={Math.max(barW - 1.2, 0.5)}
                  height={h}
                  fill={HIST_COLORS[sev]}
                />
              );
            })}
          </g>
        );
      })}
      {HIST_HOURS.map((label, i) => (
        <text
          key={label}
          x={(i / (HIST_HOURS.length - 1)) * width}
          y={height - 2}
          fontSize={9}
          textAnchor={i === 0 ? "start" : i === HIST_HOURS.length - 1 ? "end" : "middle"}
          fill="var(--text-secondary)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ---------------------------------- table ---------------------------------- */

const RESULT_TABS = [
  { label: "Events", count: "25,394" },
  { label: "Patterns", count: "134" },
  { label: "Anomalies", count: "27" },
  { label: "Assets", count: "1,208" },
];

function ResultsTable({ selected, toggleRow, toggleAll }: { selected: Set<number>; toggleRow: (i: number) => void; toggleAll: () => void }) {
  const allChecked = selected.size === EVENTS.length;
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-surface-1">
          <tr className="border-b border-border-default text-[10.5px] text-text-secondary">
            <th className="w-8 py-2 pl-4">
              <Checkbox checked={allChecked} onChange={toggleAll} />
            </th>
            {COLUMNS.map((c) => (
              <th key={c} className="whitespace-nowrap px-2 py-2 font-medium">
                {c}
              </th>
            ))}
            <th className="w-8 px-2 py-2" />
          </tr>
        </thead>
        <tbody>
          {EVENTS.map((row, i) => {
            const meta = SEVERITY_META[row.severity];
            return (
              <tr key={i} className="border-b border-border-default text-[11.5px] hover:bg-surface-2">
                <td className="py-2.5 pl-4">
                  <Checkbox checked={selected.has(i)} onChange={() => toggleRow(i)} />
                </td>
                <td className="whitespace-nowrap px-2 py-2.5 tabular-nums text-text-secondary">{row.time}</td>
                <td className="whitespace-nowrap px-2 py-2.5">
                  <span className={cn("inline-flex items-center gap-1.5 font-semibold", meta.text)}>
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dot)} />
                    {row.severity}
                  </span>
                </td>
                <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.eventType}</td>
                <td className="whitespace-nowrap px-2 py-2.5 text-text-primary">{row.source}</td>
                <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.destination}</td>
                <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.user}</td>
                <td className="whitespace-nowrap px-2 py-2.5 text-text-primary">{row.host}</td>
                <td className="max-w-[220px] truncate px-2 py-2.5 text-text-secondary">{row.message}</td>
                <td className="px-2 py-2.5">
                  <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-3 hover:text-text-primary">
                    <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------- cyberql editor ------------------------------- */

type RunStatus = "idle" | "running" | "valid" | "invalid";

function highlightCyberQl(line: string): React.ReactNode {
  const tokenPattern = /(".*?")|(\b(?:where|stats|count|by|sort|join|rename|eval|top|table|AND|OR|NOT)\b)|(-?_?[A-Za-z][\w.]*(?=\s*[=<>!])|_time)|(>=|<=|!=|==|=|<|>)|(\|)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<span key={key++}>{line.slice(lastIndex, match.index)}</span>);
    }
    const [full, str, keyword, field, op, pipe] = match;
    if (str) {
      nodes.push(
        <span key={key++} className="text-success">
          {str}
        </span>
      );
    } else if (keyword) {
      nodes.push(
        <span key={key++} className="font-semibold text-brand-primary">
          {keyword}
        </span>
      );
    } else if (pipe) {
      nodes.push(
        <span key={key++} className="font-bold text-warning">
          {pipe}
        </span>
      );
    } else if (op) {
      nodes.push(
        <span key={key++} className="text-error">
          {op}
        </span>
      );
    } else if (field) {
      nodes.push(
        <span key={key++} className="text-info">
          {field}
        </span>
      );
    } else {
      nodes.push(<span key={key++}>{full}</span>);
    }
    lastIndex = match.index + full.length;
  }
  if (lastIndex < line.length) {
    nodes.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  }
  return nodes;
}

function CyberQlEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const lines = value.split("\n");
  const [status, setStatus] = React.useState<RunStatus>("idle");
  const [result, setResult] = React.useState<{ defects: number; matched: number } | null>(null);
  const [collapsed, setCollapsed] = React.useState(true);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const runQuery = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setResult(null);
    const trimmed = value.trim();
    if (!trimmed) {
      setStatus("invalid");
      return;
    }
    setStatus("running");
    timerRef.current = setTimeout(() => {
      const ok = /^index=/.test(trimmed) || /^[a-zA-Z]/.test(trimmed);
      if (!ok) {
        setStatus("invalid");
        return;
      }
      const seed = trimmed.length;
      const matched = 8 + (seed % 37);
      const defects = 1 + (seed % 6);
      setStatus("valid");
      setResult({ defects, matched });
    }, 650);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const statusMeta: Record<RunStatus, { label: string; className: string; icon: React.ElementType }> = {
    idle: { label: "Idle", className: "text-text-secondary", icon: Terminal },
    running: { label: "Running…", className: "text-info", icon: Loader2 },
    valid: { label: "Query valid", className: "text-success", icon: CheckCircle2 },
    invalid: { label: "Syntax error", className: "text-error", icon: AlertCircle },
  };
  const StatusIcon = statusMeta[status].icon;

  return (
    <div className="overflow-hidden rounded-lg border border-border-default bg-surface-2">
      <div className="flex items-center justify-between border-b border-border-default bg-surface-1 px-3 py-1.5">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-expanded={!collapsed}
          className="flex min-w-0 items-center gap-2"
        >
          <ChevronRight
            className={cn("h-3 w-3 shrink-0 text-text-secondary transition-transform duration-150", !collapsed && "rotate-90")}
            aria-hidden="true"
          />
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-brand-primary/15 text-brand-primary">
            <Terminal className="h-2.5 w-2.5" aria-hidden="true" />
          </span>
          <span className="text-[11px] font-bold tracking-wide text-text-primary">CyberQL</span>
          <span className="hidden shrink-0 rounded bg-surface-3 px-1.5 py-[1px] text-[9.5px] font-medium text-text-secondary sm:inline">
            query.cql
          </span>
          {collapsed ? (
            <span className="ml-1 truncate text-[10.5px] font-normal text-text-secondary">{lines[0] || "empty query"}</span>
          ) : null}
        </button>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className={cn("flex items-center gap-1 text-[10.5px] font-medium", statusMeta[status].className)}>
            <StatusIcon className={cn("h-3 w-3", status === "running" && "animate-spin")} aria-hidden="true" />
            {statusMeta[status].label}
            {result ? (
              <span className="text-text-secondary">
                · {result.matched.toLocaleString()} events · {result.defects} defect{result.defects === 1 ? "" : "s"} flagged
              </span>
            ) : null}
          </span>
          <button
            type="button"
            onClick={runQuery}
            className="flex h-6 items-center gap-1 rounded-md bg-brand-primary px-2.5 text-[10.5px] font-semibold text-white hover:bg-brand-primary-hover"
          >
            <Play className="h-2.5 w-2.5 fill-white" aria-hidden="true" />
            Run
          </button>
        </div>
      </div>

      {collapsed ? null : (
      <div className="relative flex">
        <div
          aria-hidden="true"
          className="select-none border-r border-border-default px-2.5 py-2.5 text-right font-mono text-[12px] leading-5 text-text-secondary/60"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          <pre
            aria-hidden="true"
            className="pointer-events-none whitespace-pre-wrap break-words px-3.5 py-2.5 font-mono text-[12px] leading-5 text-text-primary"
          >
            {lines.map((line, i) => (
              <div key={i}>{line.length ? highlightCyberQl(line) : " "}</div>
            ))}
          </pre>
          <textarea
            value={value}
            onChange={(e) => {
              if (timerRef.current) clearTimeout(timerRef.current);
              setStatus("idle");
              setResult(null);
              onChange(e.target.value);
            }}
            rows={Math.max(lines.length, 4)}
            spellCheck={false}
            className="absolute inset-0 h-full w-full resize-none whitespace-pre-wrap break-words bg-transparent px-3.5 py-2.5 font-mono text-[12px] leading-5 text-transparent caret-text-primary selection:bg-brand-primary/25 focus:outline-none"
          />
          {value ? (
            <button
              type="button"
              onClick={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                setStatus("idle");
                setResult(null);
                onChange("");
              }}
              className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded text-text-secondary hover:bg-surface-3 hover:text-text-primary"
              aria-label="Clear query"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
      )}
    </div>
  );
}

/* ------------------------------- rules panel ------------------------------- */

function RulesPanel() {
  const [rulesTab, setRulesTab] = React.useState<0 | 1>(0);
  const [active, setActive] = React.useState(() => ACTIVE_RULES.map((r) => r.enabled));
  const [suggested, setSuggested] = React.useState(() => SUGGESTED_RULES.map((r) => r.enabled));

  const list = rulesTab === 0 ? ACTIVE_RULES : SUGGESTED_RULES;
  const states = rulesTab === 0 ? active : suggested;
  const setStates = rulesTab === 0 ? setActive : setSuggested;

  return (
    <div className="flex h-full w-72 shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between px-3.5 pt-3.5">
        <h2 className="text-[13px] font-bold text-text-primary">Correlation Rules</h2>
        <button type="button" className="text-[11.5px] font-medium text-brand-primary hover:underline">
          Manage
        </button>
      </div>

      <div className="mx-3.5 mt-2.5 flex shrink-0 items-center gap-0.5 rounded-md bg-surface-2 p-0.5">
        <button
          type="button"
          onClick={() => setRulesTab(0)}
          className={cn(
            "flex-1 rounded px-2 py-1.5 text-[11.5px] font-medium transition-colors duration-150",
            rulesTab === 0 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
          )}
        >
          Active ({ACTIVE_RULES.length})
        </button>
        <button
          type="button"
          onClick={() => setRulesTab(1)}
          className={cn(
            "flex-1 rounded px-2 py-1.5 text-[11.5px] font-medium transition-colors duration-150",
            rulesTab === 1 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
          )}
        >
          Suggested ({SUGGESTED_RULES.length})
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        <div className="flex flex-col gap-1">
          {list.map((rule, i) => (
            <div key={rule.label} className="flex items-start gap-2.5 rounded-lg px-1.5 py-2 hover:bg-surface-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-text-primary">{rule.label}</p>
                <p className="truncate text-[11px] text-text-secondary">{rule.desc}</p>
              </div>
              <ToggleSwitch
                checked={states[i]}
                onChange={(v) =>
                  setStates((prev) => prev.map((s, idx) => (idx === i ? v : s)))
                }
              />
            </div>
          ))}
        </div>

        {rulesTab === 1 ? (
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-default py-2 text-[11.5px] font-medium text-text-secondary hover:border-brand-primary hover:text-brand-primary"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Create Custom Rule
          </button>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-[11.5px] font-bold text-text-primary">Recent Correlations</h3>
          <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
            View all →
          </button>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          {RECENT_CORRELATIONS.map((c) => {
            const meta = SEVERITY_META[c.severity];
            return (
              <button
                key={c.title}
                type="button"
                className="flex items-start gap-2 rounded-lg px-1.5 py-2 text-left hover:bg-surface-2"
              >
                <Activity className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", meta.text)} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-[11.5px] font-semibold text-text-primary">{c.title}</p>
                    <span className={cn("shrink-0 rounded px-1 py-[1px] text-[9.5px] font-bold", meta.text)}>{c.severity}</span>
                  </div>
                  <p className="text-[10.5px] text-text-secondary">
                    {c.meta} · {c.time}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- main ---------------------------------- */

export function SiemLogCorrelation() {
  const [query, setQuery] = React.useState(
    'index=security (event.type="authentication" OR event.type="process")\n| where _time >= -24h\n| stats count by host, user, event.type, src_ip, dest_ip\n| sort -count'
  );
  const [checkedFacets, setCheckedFacets] = React.useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const [resultTab, setResultTab] = React.useState(0);

  const toggleFacet = (label: string) => {
    setCheckedFacets((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const toggleRow = (i: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleAllRows = () => {
    setSelectedRows((prev) => (prev.size === EVENTS.length ? new Set() : new Set(EVENTS.map((_, i) => i))));
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden text-[13px]">
      <FiltersPanel checked={checkedFacets} toggle={toggleFacet} reset={() => setCheckedFacets(new Set())} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border-default px-4 py-3">
          <CyberQlEditor value={query} onChange={setQuery} />

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] text-text-secondary">Examples:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setQuery(ex)}
                className="rounded-full border border-border-default bg-surface-1 px-2.5 py-1 text-[11px] font-medium text-text-secondary hover:border-brand-primary hover:text-brand-primary"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-b border-border-default px-4 py-3">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[12px] font-semibold text-text-primary">
              {EVENTS.length.toLocaleString()} events
              <span className="ml-2 font-normal text-text-secondary">8 Sep 2026, 00:00 – 8 Sep 2026, 23:59 (IST)</span>
            </p>
            <div className="flex items-center gap-1.5">
              {(["Critical", "High", "Medium", "Low", "Info"] as const).map((label) => (
                <span key={label} className="flex items-center gap-1 text-[10.5px] text-text-secondary">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: HIST_COLORS[label === "Info" ? "Informational" : label] }}
                  />
                  {label}
                </span>
              ))}
              <button type="button" className="ml-2 flex h-6 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[10.5px] font-medium text-text-secondary hover:bg-surface-2">
                <Clock className="h-3 w-3" aria-hidden="true" />
                1 hour
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
          <EventHistogram />
        </div>

        <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-2">
          <div className="flex items-center gap-4">
            {RESULT_TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setResultTab(i)}
                className={cn(
                  "flex items-center gap-1.5 border-b-2 py-1.5 text-[12px] font-medium transition-colors duration-150",
                  resultTab === i
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                )}
              >
                {t.label}
                <span className="tabular-nums">({t.count})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
              <Columns3 className="h-3.5 w-3.5" aria-hidden="true" />
              Columns
            </button>
            <button type="button" className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Export
            </button>
            <button type="button" className="flex h-7 items-center gap-1.5 rounded-md bg-brand-primary px-2.5 text-[11px] font-semibold text-white hover:bg-brand-primary-hover">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add to Investigation
            </button>
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2" aria-label="More options">
              <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {resultTab === 0 ? (
          <ResultsTable selected={selectedRows} toggleRow={toggleRow} toggleAll={toggleAllRows} />
        ) : (
          <div className="flex flex-1 items-center justify-center gap-2 text-[12px] text-text-secondary">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {RESULT_TABS[resultTab].label} view — no data selected yet.
          </div>
        )}

        <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                type="button"
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded text-[11px] font-medium",
                  p === 1 ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2"
                )}
              >
                {p}
              </button>
            ))}
            <span className="px-1 text-[11px] text-text-secondary">…</span>
            <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-[11px] font-medium text-text-secondary hover:bg-surface-2">
              2,540
            </button>
            <button type="button" className="ml-1 flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2" aria-label="Next page">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="flex h-6 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[10.5px] font-medium text-text-secondary hover:bg-surface-2">
            Show 10 rows
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>

      <RulesPanel />
    </div>
  );
}
