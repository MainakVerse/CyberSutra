"use client";

import * as React from "react";
import {
  AlertTriangle,
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Database,
  Download,
  FileText,
  Fingerprint,
  Globe2,
  KeyRound,
  Link2,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Shield,
  User,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type Severity = "Critical" | "High" | "Medium" | "Low";
type ExposureType = "Email" | "Credential" | "Card" | "Document" | "API Key" | "Identity" | "Database";

type Exposure = {
  id: string;
  type: ExposureType;
  exposedData: string;
  exposedSub: string;
  source: string;
  firstSeen: string;
  lastSeen: string;
  severity: Severity;
  affectedAsset: string;
  keyword: string;
  confidence: number;
  category: string;
  location: string;
  description: string;
};

type Keyword = { name: string; count: number; active: boolean; hasAlert: boolean };

/* -------------------------------- dummy data -------------------------------- */

const STATS: Array<{
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string;
  delta?: string;
  deltaClass?: string;
  sub: string;
}> = [
  { icon: Database, iconClass: "bg-brand-primary/10 text-brand-primary", label: "Total Exposures", value: "2,847", delta: "↑ 18%", deltaClass: "text-error", sub: "vs previous 30 days" },
  { icon: Link2, iconClass: "bg-error/10 text-error", label: "Leaked Credentials", value: "1,932", delta: "↑ 24%", deltaClass: "text-error", sub: "68% of total exposures" },
  { icon: AlertTriangle, iconClass: "bg-warning/10 text-warning", label: "High Risk Findings", value: "421", delta: "↑ 12%", deltaClass: "text-error", sub: "Require immediate attention" },
  { icon: Search, iconClass: "bg-info/10 text-info", label: "Monitored Keywords", value: "24", delta: "↑ 3", deltaClass: "text-success", sub: "Active keyword alerts" },
  { icon: Fingerprint, iconClass: "bg-[#8b5cf6]/10 text-[#8b5cf6]", label: "Affected Assets", value: "318", delta: "↑ 16%", deltaClass: "text-error", sub: "Domains, emails, and brands" },
];

const KEYWORDS: Keyword[] = [
  { name: "cybersutra.com", count: 214, active: true, hasAlert: true },
  { name: "cybersutra", count: 186, active: true, hasAlert: true },
  { name: "@cybersutra.com", count: 92, active: true, hasAlert: true },
  { name: "alex.shah", count: 48, active: false, hasAlert: false },
  { name: "admin", count: 37, active: false, hasAlert: false },
  { name: "vpn", count: 24, active: false, hasAlert: false },
  { name: "remote access", count: 19, active: false, hasAlert: false },
  { name: "prod-api", count: 16, active: false, hasAlert: false },
  { name: "customer", count: 14, active: false, hasAlert: false },
  { name: "internal", count: 11, active: false, hasAlert: false },
  { name: "mumbai", count: 9, active: false, hasAlert: false },
  { name: "bangalore", count: 8, active: false, hasAlert: false },
  { name: "aws", count: 8, active: false, hasAlert: false },
  { name: "office365", count: 6, active: false, hasAlert: false },
  { name: "anydesk", count: 6, active: false, hasAlert: false },
  { name: "password", count: 5, active: false, hasAlert: false },
  { name: "confidential", count: 4, active: false, hasAlert: false },
  { name: "finance", count: 4, active: false, hasAlert: false },
  { name: "hr", count: 3, active: false, hasAlert: false },
  { name: "source code", count: 3, active: false, hasAlert: false },
];

const TYPE_ICON: Record<ExposureType, { icon: React.ElementType; className: string }> = {
  Email: { icon: Mail, className: "bg-brand-primary/10 text-brand-primary" },
  Credential: { icon: User, className: "bg-warning/10 text-warning" },
  Card: { icon: CreditCard, className: "bg-error/10 text-error" },
  Document: { icon: FileText, className: "bg-info/10 text-info" },
  "API Key": { icon: KeyRound, className: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
  Identity: { icon: Globe2, className: "bg-success/10 text-success" },
  Database: { icon: Database, className: "bg-error/10 text-error" },
};

const SEVERITY_STYLE: Record<Severity, string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-warning/10 text-warning",
  Medium: "bg-info/10 text-info",
  Low: "bg-success/10 text-success",
};

const SEVERITY_DOT: Record<Severity, string> = {
  Critical: "bg-error",
  High: "bg-warning",
  Medium: "bg-info",
  Low: "bg-success",
};

function buildExposures(): Exposure[] {
  const rows: Array<[ExposureType, string, string, string, string, string, Severity, string, string]> = [
    ["Email", "user@cybersutra.com", "Password · Email", "BreachForums", "7 Sep 2026", "8 Sep 2026", "Critical", "cybersutra.com", "cybersutra.com"],
    ["Identity", "alex.shah", "Email · Password", "Stealer Log", "6 Sep 2026", "8 Sep 2026", "High", "cybersutra.com", "cybersutra.com"],
    ["API Key", "vpn.cybersutra.com", "IP Address · Credentials", "RAMP", "5 Sep 2026", "7 Sep 2026", "High", "vpn.cybersutra.com", "cybersutra.com"],
    ["Card", "Credit Card (•••• 4582)", "Name · Card Details", "XSS.to", "3 Sep 2026", "3 Sep 2026", "Medium", "cybersutra.com", "cybersutra"],
    ["Database", "cybersutra_db.sql", "Database · 1.2M rows", "DarkVault", "1 Sep 2026", "2 Sep 2026", "Critical", "cybersutra.com", "cybersutra"],
    ["Document", "employee_list.csv", "Email · Name · Department", "Telegram", "28 Aug 2026", "1 Sep 2026", "High", "cybersutra.com", "cybersutra.com"],
    ["Credential", "admin", "Password", "Stealer Log", "25 Aug 2026", "26 Aug 2026", "Medium", "cybersutra.com", "admin"],
    ["Email", "hr@cybersutra.com", "Password · Email", "BreachForums", "22 Aug 2026", "25 Aug 2026", "High", "cybersutra.com", "cybersutra.com"],
    ["API Key", "api.cybersutra.com", "API Key · Token", "GitHub Paste", "20 Aug 2026", "22 Aug 2026", "Medium", "api.cybersutra.com", "cybersutra.com"],
    ["Identity", "sneha.k", "Email · Password", "NullBulge", "18 Aug 2026", "20 Aug 2026", "Low", "cybersutra.com", "cybersutra.com"],
  ];

  return rows.map((row, i) => {
    const [type, exposedData, exposedSub, source, firstSeen, lastSeen, severity, affectedAsset, keyword] = row;
    return {
      id: `exp-${i}`,
      type,
      exposedData,
      exposedSub,
      source,
      firstSeen,
      lastSeen,
      severity,
      affectedAsset,
      keyword,
      confidence: 60 + ((i * 7) % 40),
      category: source === "BreachForums" || source === "DarkVault" ? "Compromised Databases" : source === "Stealer Log" ? "Infostealer Logs" : source === "Telegram" ? "Telegram Channel" : "Paste Site",
      location: "Unknown",
      description: `Dump of corporate credentials from Indian technology companies referencing ${keyword}.`,
    };
  });
}

const EXPOSURES = buildExposures();

/* -------------------------------- controls -------------------------------- */

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

/* -------------------------------- stat strip -------------------------------- */

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const Icon = stat.icon;
  return (
    <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-border-default bg-surface-1 px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11.5px] text-text-secondary">{stat.label}</p>
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-[19px] font-bold tabular-nums text-text-primary">{stat.value}</span>
          {stat.delta ? <span className={cn("text-[11px] font-semibold", stat.deltaClass)}>{stat.delta}</span> : null}
        </div>
        <p className="truncate text-[10.5px] text-text-secondary">{stat.sub}</p>
      </div>
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", stat.iconClass)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
  );
}

/* -------------------------------- header -------------------------------- */

function RangeDropdown() {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState("Last 30 days");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Calendar className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        {range}
        <ChevronDown className={cn("h-3 w-3 text-text-secondary transition-transform duration-150", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-1.5 w-[160px] rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg">
          {["Last 24 hours", "Last 7 days", "Last 30 days", "Custom range"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRange(r);
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium",
                r === range ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DarkWebSweepHeaderMeta() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      <RangeDropdown />
      {open ? (
        <div className="flex items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2 py-1">
          <input
            ref={inputRef}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim()) {
                setValue("");
                setOpen(false);
              }
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Enter keyword..."
            className="h-7 w-[160px] bg-transparent px-1 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setValue("");
              setOpen(false);
            }}
            className="rounded p-0.5 text-text-secondary hover:bg-surface-2"
            aria-label="Cancel"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add Keyword
        </button>
      )}
    </div>
  );
}

/* -------------------------------- keyword monitors -------------------------------- */

function KeywordMonitors({
  keywords,
  checkedKeywords,
  toggleKeyword,
  onAdd,
}: {
  keywords: Keyword[];
  checkedKeywords: Set<string>;
  toggleKeyword: (name: string) => void;
  onAdd: (name: string) => void;
}) {
  const [tab, setTab] = React.useState<"All" | "Active" | "Alerts">("All");
  const [q, setQ] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [newKeyword, setNewKeyword] = React.useState("");

  const activeCount = keywords.filter((k) => k.active).length;
  const alertCount = keywords.filter((k) => k.hasAlert).length;

  const visible = keywords.filter((k) => {
    if (tab === "Active" && !k.active) return false;
    if (tab === "Alerts" && !k.hasAlert) return false;
    if (q && !k.name.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });

  const submitAdd = () => {
    const name = newKeyword.trim();
    if (!name) {
      setAdding(false);
      return;
    }
    onAdd(name);
    setNewKeyword("");
    setAdding(false);
  };

  return (
    <div className="flex h-full w-[248px] shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between px-4 py-3.5">
        <h2 className="text-[13px] font-bold text-text-primary">Keyword Monitors</h2>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex items-center gap-1 text-[11.5px] font-medium text-brand-primary hover:underline"
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
          Add
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 px-3 pb-2.5">
        {(
          [
            ["All", keywords.length],
            ["Active", activeCount],
            ["Alerts", alertCount],
          ] as const
        ).map(([label, count]) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(label)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-150",
              tab === label ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2"
            )}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <div className="shrink-0 px-3 pb-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search keywords..."
            className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
        </div>
      </div>

      {adding ? (
        <div className="shrink-0 px-3 pb-2.5">
          <div className="flex items-center gap-1.5 rounded-lg border border-brand-primary bg-surface-1 px-2 py-1">
            <input
              autoFocus
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAdd();
                if (e.key === "Escape") {
                  setNewKeyword("");
                  setAdding(false);
                }
              }}
              placeholder="New keyword..."
              className="h-7 flex-1 bg-transparent px-1 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none"
            />
            <button type="button" onClick={submitAdd} className="rounded p-0.5 text-brand-primary hover:bg-surface-2" aria-label="Confirm">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {visible.map((k) => (
          <label
            key={k.name}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] hover:bg-surface-2"
          >
            <Checkbox checked={checkedKeywords.has(k.name)} onChange={() => toggleKeyword(k.name)} />
            <span className="min-w-0 flex-1 truncate text-text-primary">{k.name}</span>
            <span className="shrink-0 text-[11px] tabular-nums text-text-secondary">{k.count}</span>
            {k.hasAlert ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-error" /> : null}
          </label>
        ))}
        {visible.length === 0 ? <p className="px-2 py-4 text-center text-[11.5px] text-text-secondary">No keywords found</p> : null}
      </div>

      <div className="shrink-0 border-t border-border-default p-2.5">
        <button
          type="button"
          className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[12px] font-medium text-text-primary hover:bg-surface-2"
        >
          <Settings2 className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
          Manage Keywords
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- filter bar -------------------------------- */

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        {value === "All" ? label : value}
        <ChevronDown className={cn("h-3.5 w-3.5 text-text-secondary transition-transform duration-150", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-20 mt-1.5 max-h-[280px] w-[180px] overflow-y-auto rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "block w-full truncate rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium",
                o === value ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------- exposures table -------------------------------- */

const PAGE_SIZE_OPTIONS = [10, 25, 50];

function ExposuresTable({
  rows,
  selectedId,
  onSelect,
  checked,
  toggleChecked,
  toggleAll,
  allChecked,
}: {
  rows: Exposure[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  checked: Set<string>;
  toggleChecked: (id: string) => void;
  toggleAll: () => void;
  allChecked: boolean;
}) {
  return (
    <table className="w-full table-fixed border-collapse text-left">
      <colgroup>
        <col className="w-8" />
        <col className="w-[9%]" />
        <col className="w-[19%]" />
        <col className="w-[12%]" />
        <col className="w-[10%]" />
        <col className="w-[10%]" />
        <col className="w-[9%]" />
        <col className="w-[14%]" />
        <col className="w-[9%]" />
      </colgroup>
      <thead className="sticky top-0 z-10 bg-surface-1">
        <tr className="border-b border-border-default text-[10.5px] uppercase tracking-wide text-text-secondary">
          <th className="py-2 pl-4">
            <Checkbox checked={allChecked} onChange={toggleAll} />
          </th>
          <th className="truncate py-2 pr-3 font-medium">Type</th>
          <th className="truncate py-2 pr-3 font-medium">Exposed Data</th>
          <th className="truncate py-2 pr-3 font-medium">Source</th>
          <th className="truncate py-2 pr-3 font-medium">First Seen</th>
          <th className="truncate py-2 pr-3 font-medium">Last Seen</th>
          <th className="truncate py-2 pr-3 font-medium">Severity</th>
          <th className="truncate py-2 pr-3 font-medium">Affected Asset</th>
          <th className="truncate py-2 pr-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const { icon: Icon, className } = TYPE_ICON[r.type];
          const isSelected = r.id === selectedId;
          return (
            <tr
              key={r.id}
              onClick={() => onSelect(r.id)}
              className={cn(
                "cursor-pointer border-b border-border-default text-[12px] transition-colors duration-100 hover:bg-surface-2",
                isSelected && "bg-brand-primary/5"
              )}
            >
              <td className="py-2 pl-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={checked.has(r.id)} onChange={() => toggleChecked(r.id)} />
              </td>
              <td className="py-2 pr-3">
                <span className={cn("flex h-6 w-6 items-center justify-center rounded-full", className)}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </td>
              <td className="py-2 pr-3">
                <p className="truncate font-medium text-text-primary">{r.exposedData}</p>
                <p className="truncate text-[10.5px] text-text-secondary">{r.exposedSub}</p>
              </td>
              <td className="truncate py-2 pr-3 text-text-secondary">{r.source}</td>
              <td className="truncate py-2 pr-3 tabular-nums text-text-secondary">{r.firstSeen}</td>
              <td className="truncate py-2 pr-3 tabular-nums text-text-secondary">{r.lastSeen}</td>
              <td className="py-2 pr-3">
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", SEVERITY_STYLE[r.severity])}>
                  {r.severity}
                </span>
              </td>
              <td className="truncate py-2 pr-3 text-brand-primary">{r.affectedAsset}</td>
              <td className="py-2 pr-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSelect(r.id)}
                    className="rounded-md px-2 py-1 text-[11.5px] font-medium text-brand-primary hover:bg-surface-2"
                  >
                    View
                  </button>
                  <button type="button" className="rounded-md p-1 text-text-secondary hover:bg-surface-2" aria-label="More actions">
                    <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* -------------------------------- detail panel -------------------------------- */

function DetailTab({ label, active, onClick, badge }: { label: string; active: boolean; onClick: () => void; badge?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors duration-150",
        active ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
      )}
    >
      {label}
      {badge ? <span className="ml-1 text-text-secondary">{badge}</span> : null}
    </button>
  );
}

function DetailPanel({
  exposure,
  onClose,
  watchlist,
  toggleWatch,
}: {
  exposure: Exposure;
  onClose: () => void;
  watchlist: Set<string>;
  toggleWatch: (id: string) => void;
}) {
  const [tab, setTab] = React.useState(0);
  const { icon: Icon, className } = TYPE_ICON[exposure.type];
  const isWatched = watchlist.has(exposure.id);

  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border-default px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", className)}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-bold text-text-primary">{exposure.exposedData}</p>
            <span className={cn("mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold", SEVERITY_STYLE[exposure.severity])}>
              {exposure.severity}
            </span>
          </div>
        </div>
        <button type="button" onClick={onClose} className="shrink-0 rounded-md p-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-b border-border-default px-4 py-2.5">
        <p className="text-[11.5px] font-bold text-text-primary">Exposure Details</p>
      </div>

      <div className="flex shrink-0 gap-2 border-b border-border-default px-4 py-2.5">
        <button
          type="button"
          onClick={() => toggleWatch(exposure.id)}
          className={cn(
            "flex h-7 flex-1 items-center justify-center gap-1.5 rounded-lg border text-[11.5px] font-medium transition-colors duration-150",
            isWatched ? "border-brand-primary bg-brand-primary/10 text-brand-primary" : "border-border-default bg-surface-1 text-text-primary hover:bg-surface-2"
          )}
        >
          <Bookmark className={cn("h-3 w-3", isWatched && "fill-brand-primary")} aria-hidden="true" />
          {isWatched ? "Watching" : "Add to Watchlist"}
        </button>
        <button
          type="button"
          className="flex h-7 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
        >
          <FileText className="h-3 w-3" aria-hidden="true" />
          Create Case
        </button>
        <button type="button" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2" aria-label="More">
          <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-2">
        <DetailTab label="Overview" active={tab === 0} onClick={() => setTab(0)} />
        <DetailTab label="Related Data" active={tab === 1} onClick={() => setTab(1)} badge="(12)" />
        <DetailTab label="Source" active={tab === 2} onClick={() => setTab(2)} />
        <DetailTab label="Timeline" active={tab === 3} onClick={() => setTab(3)} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        {tab === 0 ? (
          <div className="flex flex-col gap-3">
            <dl className="flex flex-col divide-y divide-border-default text-[12px]">
              {[
                ["Exposed Email", exposure.exposedData],
                ["Password", "••••••••"],
                ["Source", exposure.source],
                ["First Seen", `${exposure.firstSeen}, 14:22 (IST)`],
                ["Last Seen", `${exposure.lastSeen}, 09:11 (IST)`],
                ["Data Type", "Credential"],
                ["Affected Asset", exposure.affectedAsset],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">{k}</dt>
                  <dd className="max-w-[150px] truncate text-right font-medium text-text-primary">{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Risk Level</dt>
                <dd>
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", SEVERITY_STYLE[exposure.severity])}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", SEVERITY_DOT[exposure.severity])} />
                    {exposure.severity}
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Confidence</dt>
                <dd className="font-medium text-text-primary">High ({exposure.confidence}%)</dd>
              </div>
            </dl>

            <div>
              <p className="mb-1.5 text-[11.5px] font-bold text-text-primary">Source Context</p>
              <dl className="flex flex-col divide-y divide-border-default text-[12px]">
                <div className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Category</dt>
                  <dd className="font-medium text-brand-primary">{exposure.category}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Published</dt>
                  <dd className="font-medium text-text-primary">{exposure.firstSeen}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Location</dt>
                  <dd className="font-medium text-text-primary">{exposure.location}</dd>
                </div>
              </dl>
              <p className="mt-2 text-[11.5px] leading-relaxed text-text-secondary">{exposure.description}</p>
            </div>

            <div>
              <p className="mb-1.5 text-[11.5px] font-bold text-text-primary">Recommended Actions</p>
              <div className="flex flex-col gap-1.5">
                {[
                  "Reset password for affected user",
                  "Check for credential reuse",
                  "Review access logs",
                  "Notify user and IT team",
                ].map((a) => (
                  <label key={a} className="flex cursor-pointer items-start gap-2 text-[11.5px] text-text-secondary">
                    <Checkbox checked={false} onChange={() => {}} />
                    <span>{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === 1 ? (
          <div className="flex flex-col gap-2">
            {EXPOSURES.filter((e) => e.id !== exposure.id && e.affectedAsset === exposure.affectedAsset)
              .slice(0, 8)
              .map((e) => {
                const { icon: RIcon, className: rClassName } = TYPE_ICON[e.type];
                return (
                  <div key={e.id} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", rClassName)}>
                        <RIcon className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span className="truncate font-medium text-text-primary">{e.exposedData}</span>
                    </span>
                    <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", SEVERITY_STYLE[e.severity])}>{e.severity}</span>
                  </div>
                );
              })}
          </div>
        ) : null}

        {tab === 2 ? (
          <div className="flex flex-col gap-2 text-[12px]">
            <div className="rounded-lg border border-border-default p-3">
              <p className="font-semibold text-text-primary">{exposure.source}</p>
              <p className="mt-1 text-text-secondary">{exposure.category}</p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-text-secondary">{exposure.description}</p>
            </div>
          </div>
        ) : null}

        {tab === 3 ? (
          <div className="flex flex-col gap-1">
            {[
              { date: exposure.lastSeen, event: "Re-indexed by monitoring crawler" },
              { date: exposure.firstSeen, event: "First discovered in source" },
              { date: "—", event: "Keyword match triggered alert" },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-2 border-b border-border-default py-2.5 text-[11.5px] last:border-0">
                <span className="text-text-primary">{t.event}</span>
                <span className="shrink-0 tabular-nums text-text-secondary">{t.date}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- sub tabs -------------------------------- */

const SUB_TABS = ["Exposures", "Breach Sources", "Trends", "Affected Assets"] as const;
type SubTab = (typeof SUB_TABS)[number];

/* -------------------------------- main -------------------------------- */

export function DarkWebSweepPlatform() {
  const [keywords, setKeywords] = React.useState<Keyword[]>(KEYWORDS);
  const [checkedKeywords, setCheckedKeywords] = React.useState<Set<string>>(
    new Set(KEYWORDS.filter((k) => k.active).map((k) => k.name))
  );
  const [subTab, setSubTab] = React.useState<SubTab>("Exposures");
  const [search, setSearch] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState("All");
  const [typeFilter, setTypeFilter] = React.useState("All");
  const [sourceFilter, setSourceFilter] = React.useState("All");
  const [dateFilter, setDateFilter] = React.useState("All");
  const [selectedId, setSelectedId] = React.useState<string | null>(EXPOSURES[0].id);
  const [checkedRows, setCheckedRows] = React.useState<Set<string>>(new Set());
  const [watchlist, setWatchlist] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageSizeOpen, setPageSizeOpen] = React.useState(false);

  const toggleKeyword = (name: string) => {
    setCheckedKeywords((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const addKeyword = (name: string) => {
    if (keywords.some((k) => k.name === name)) return;
    setKeywords((prev) => [{ name, count: 0, active: true, hasAlert: false }, ...prev]);
    setCheckedKeywords((prev) => new Set(prev).add(name));
  };

  const toggleWatch = (id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleRowChecked = (id: string) => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const q = search.trim().toLowerCase();

  const filtered = React.useMemo(() => {
    return EXPOSURES.filter((e) => {
      if (checkedKeywords.size && !checkedKeywords.has(e.keyword)) return false;
      if (severityFilter !== "All" && e.severity !== severityFilter) return false;
      if (typeFilter !== "All" && e.type !== typeFilter) return false;
      if (sourceFilter !== "All" && e.source !== sourceFilter) return false;
      if (
        q &&
        !(
          e.exposedData.toLowerCase().includes(q) ||
          e.source.toLowerCase().includes(q) ||
          e.affectedAsset.toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
  }, [q, checkedKeywords, severityFilter, typeFilter, sourceFilter]);

  React.useEffect(() => {
    setPage(1);
  }, [q, checkedKeywords, severityFilter, typeFilter, sourceFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const selectedExposure = EXPOSURES.find((e) => e.id === selectedId) ?? null;
  const allChecked = pageRows.length > 0 && pageRows.every((r) => checkedRows.has(r.id));

  const toggleAllRows = () => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (allChecked) pageRows.forEach((r) => next.delete(r.id));
      else pageRows.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setSeverityFilter("All");
    setTypeFilter("All");
    setSourceFilter("All");
    setDateFilter("All");
  };

  const sourceOptions = ["All", ...Array.from(new Set(EXPOSURES.map((e) => e.source)))];
  const typeOptions = ["All", "Email", "Credential", "Card", "Document", "API Key", "Identity", "Database"];
  const severityOptions = ["All", "Critical", "High", "Medium", "Low"];
  const dateOptions = ["All", "Last 24 hours", "Last 7 days", "Last 30 days"];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-4 gap-3">
      <div className="flex shrink-0 gap-3">
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-border-default bg-surface-1">
        <KeywordMonitors
          keywords={keywords}
          checkedKeywords={checkedKeywords}
          toggleKeyword={toggleKeyword}
          onAdd={addKeyword}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-4 py-1">
            <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
              {SUB_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSubTab(t)}
                  className={cn(
                    "shrink-0 border-b-2 px-3 py-2.5 text-[12.5px] font-medium transition-colors duration-150",
                    subTab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-[11.5px] text-text-secondary">{filtered.length.toLocaleString()} results</span>
              <button
                type="button"
                className="flex h-7 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
              >
                <Download className="h-3 w-3 text-text-secondary" aria-hidden="true" />
                Export
              </button>
            </div>
          </div>

          {subTab === "Exposures" ? (
            <>
              <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border-default px-4 py-2.5">
                <div className="relative min-w-[180px] flex-1">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search email, domain, username, or source..."
                    className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  />
                </div>
                <FilterDropdown label="Severity" value={severityFilter} options={severityOptions} onChange={setSeverityFilter} />
                <FilterDropdown label="Type" value={typeFilter} options={typeOptions} onChange={setTypeFilter} />
                <FilterDropdown label="Source" value={sourceFilter} options={sourceOptions} onChange={setSourceFilter} />
                <FilterDropdown label="Date" value={dateFilter} options={dateOptions} onChange={setDateFilter} />
                <button
                  type="button"
                  onClick={resetFilters}
                  className="shrink-0 text-[11.5px] font-medium text-brand-primary hover:underline"
                >
                  Reset
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {pageRows.length ? (
                  <ExposuresTable
                    rows={pageRows}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    checked={checkedRows}
                    toggleChecked={toggleRowChecked}
                    toggleAll={toggleAllRows}
                    allChecked={allChecked}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 py-12 text-center">
                    <Search className="h-6 w-6 text-text-secondary" aria-hidden="true" />
                    <p className="text-[12.5px] font-semibold text-text-primary">No exposures match your filters</p>
                    <button type="button" onClick={resetFilters} className="text-[12px] font-medium text-brand-primary hover:underline">
                      Reset filters
                    </button>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2.5">
                <span className="text-[11.5px] text-text-secondary">
                  Showing {pageRows.length ? (page - 1) * pageSize + 1 : 0}–{(page - 1) * pageSize + pageRows.length} of {filtered.length.toLocaleString()}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default text-text-secondary hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md text-[11.5px] font-medium",
                          p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                    {totalPages > 5 ? <span className="px-1 text-text-secondary">…</span> : null}
                    {totalPages > 5 ? (
                      <button
                        type="button"
                        onClick={() => setPage(totalPages)}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md text-[11.5px] font-medium",
                          page === totalPages ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2"
                        )}
                      >
                        {totalPages}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default text-text-secondary hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="relative">
                    <span className="mr-1.5 text-[11.5px] text-text-secondary">Rows per page</span>
                    <button
                      type="button"
                      onClick={() => setPageSizeOpen((v) => !v)}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
                    >
                      {pageSize}
                      <ChevronDown className="h-3 w-3 text-text-secondary" aria-hidden="true" />
                    </button>
                    {pageSizeOpen ? (
                      <div className="absolute bottom-full right-0 z-20 mb-1.5 w-[70px] rounded-lg border border-border-default bg-surface-1 p-1 shadow-lg">
                        {PAGE_SIZE_OPTIONS.map((ps) => (
                          <button
                            key={ps}
                            type="button"
                            onClick={() => {
                              setPageSize(ps);
                              setPage(1);
                              setPageSizeOpen(false);
                            }}
                            className={cn(
                              "block w-full rounded-md px-2 py-1 text-left text-[11.5px] font-medium",
                              ps === pageSize ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
                            )}
                          >
                            {ps}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
              <Shield className="h-8 w-8 text-text-secondary" aria-hidden="true" />
              <p className="text-[13px] font-semibold text-text-primary">{subTab}</p>
              <p className="max-w-[320px] text-[12px] text-text-secondary">
                {subTab === "Breach Sources"
                  ? "Track the dark web marketplaces, forums, and stealer logs where your data was found."
                  : subTab === "Trends"
                  ? "Visualize exposure volume and severity trends over time."
                  : "See every domain, email, and brand asset being monitored and its exposure count."}
              </p>
            </div>
          )}
        </div>

        {subTab === "Exposures" && selectedExposure ? (
          <DetailPanel exposure={selectedExposure} onClose={() => setSelectedId(null)} watchlist={watchlist} toggleWatch={toggleWatch} />
        ) : subTab === "Exposures" ? (
          <div className="flex h-full w-[300px] shrink-0 flex-col items-center justify-center gap-2 border-l border-border-default bg-surface-1 px-6 text-center">
            <Shield className="h-6 w-6 text-text-secondary" aria-hidden="true" />
            <p className="text-[12.5px] font-medium text-text-secondary">Select an exposure to view details</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
