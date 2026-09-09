"use client";

import * as React from "react";
import {
  AlertTriangle,
  Bug,
  ChevronDown,
  Database,
  Download,
  FileWarning,
  KeyRound,
  LayoutGrid,
  Mail,
  Maximize2,
  MoreHorizontal,
  Minimize2,
  Plus,
  Search,
  ShieldAlert,
  Table as TableIcon,
  Unplug,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------- data --------------------------------- */

type Priority = "Critical" | "High" | "Medium" | "Low";
type Status = "New" | "In Triage" | "Investigating" | "Containment" | "Recovery" | "Closed";
type CaseType = "Malware" | "Phishing" | "Unauthorized Access" | "Data Exfiltration" | "Policy Violation" | "Other";

const PRIORITY_META: Record<Priority, { dot: string; text: string; bg: string }> = {
  Critical: { dot: "bg-error", text: "text-error", bg: "bg-error/10" },
  High: { dot: "bg-warning", text: "text-warning", bg: "bg-warning/10" },
  Medium: { dot: "bg-info", text: "text-info", bg: "bg-info/10" },
  Low: { dot: "bg-text-secondary", text: "text-text-secondary", bg: "bg-surface-3" },
};

const CASE_TYPE_ICON: Record<CaseType, React.ElementType> = {
  Malware: Bug,
  Phishing: Mail,
  "Unauthorized Access": KeyRound,
  "Data Exfiltration": Database,
  "Policy Violation": FileWarning,
  Other: ShieldAlert,
};

type CaseRow = {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  type: CaseType;
  assignee: string;
  created: string;
  updated: string;
};

const CASES: CaseRow[] = [
  { id: "CASE-2026-0042", title: "Suspicious PowerShell activity", priority: "Critical", status: "New", type: "Malware", assignee: "Rohan Kulkarni", created: "8 Sep 2026, 10:24", updated: "8 Sep 2026, 12:17" },
  { id: "CASE-2026-0041", title: "Multiple failed logins", priority: "High", status: "New", type: "Unauthorized Access", assignee: "Priya Mehta", created: "8 Sep 2026, 09:11", updated: "8 Sep 2026, 11:03" },
  { id: "CASE-2026-0040", title: "Unusual data transfer", priority: "Medium", status: "New", type: "Data Exfiltration", assignee: "Neha Iyer", created: "8 Sep 2026, 08:45", updated: "8 Sep 2026, 10:12" },
  { id: "CASE-2026-0038", title: "Phishing email campaign", priority: "High", status: "In Triage", type: "Phishing", assignee: "Alex Shah", created: "8 Sep 2026, 07:22", updated: "8 Sep 2026, 09:18" },
  { id: "CASE-2026-0037", title: "Suspicious lateral movement", priority: "Medium", status: "In Triage", type: "Lateral Movement" as CaseType, assignee: "Ananya Singh", created: "8 Sep 2026, 06:11", updated: "8 Sep 2026, 08:03" },
  { id: "CASE-2026-0036", title: "Policy violation: USB device", priority: "Low", status: "In Triage", type: "Policy Violation", assignee: "Rohan Kulkarni", created: "8 Sep 2026, 05:40", updated: "8 Sep 2026, 07:29" },
  { id: "CASE-2026-0035", title: "Unapproved SaaS application", priority: "Low", status: "In Triage", type: "Policy Violation", assignee: "Priya Mehta", created: "8 Sep 2026, 04:55", updated: "8 Sep 2026, 06:47" },
  { id: "CASE-2026-0034", title: "Ransomware behavior detected", priority: "Critical", status: "Investigating", type: "Malware", assignee: "Neha Iyer", created: "8 Sep 2026, 03:28", updated: "8 Sep 2026, 07:41" },
  { id: "CASE-2026-0033", title: "Suspicious process execution", priority: "High", status: "Investigating", type: "Malware", assignee: "Vikram Rao", created: "8 Sep 2026, 02:17", updated: "8 Sep 2026, 06:12" },
  { id: "CASE-2026-0032", title: "Data exfiltration indicator", priority: "High", status: "Investigating", type: "Data Exfiltration", assignee: "Alex Shah", created: "8 Sep 2026, 01:30", updated: "8 Sep 2026, 05:24" },
  { id: "CASE-2026-0031", title: "Brute force attack", priority: "Medium", status: "Investigating", type: "Unauthorized Access", assignee: "Ananya Singh", created: "8 Sep 2026, 00:52", updated: "8 Sep 2026, 04:16" },
  { id: "CASE-2026-0030", title: "Infected host containment", priority: "High", status: "Containment", type: "Malware", assignee: "Priya Mehta", created: "7 Sep 2026, 23:41", updated: "8 Sep 2026, 01:05" },
  { id: "CASE-2026-0029", title: "Malicious domain blocking", priority: "Medium", status: "Containment", type: "Malware", assignee: "Rohan Kulkarni", created: "7 Sep 2026, 22:15", updated: "7 Sep 2026, 23:58" },
  { id: "CASE-2026-0028", title: "User account isolation", priority: "Low", status: "Containment", type: "Unauthorized Access", assignee: "Neha Iyer", created: "7 Sep 2026, 21:03", updated: "7 Sep 2026, 22:40" },
  { id: "CASE-2026-0027", title: "System recovery and validation", priority: "Medium", status: "Recovery", type: "Malware", assignee: "Rohan Kulkarni", created: "7 Sep 2026, 20:12", updated: "8 Sep 2026, 05:18" },
  { id: "CASE-2026-0026", title: "Credential reset and monitoring", priority: "Low", status: "Recovery", type: "Unauthorized Access", assignee: "Ananya Singh", created: "7 Sep 2026, 19:04", updated: "8 Sep 2026, 07:41" },
];

const STATUS_COLUMNS: Array<{ status: Status; icon: React.ElementType; color: string }> = [
  { status: "New", icon: Plus, color: "text-brand-primary" },
  { status: "In Triage", icon: AlertTriangle, color: "text-warning" },
  { status: "Investigating", icon: Search, color: "text-error" },
  { status: "Containment", icon: Unplug, color: "text-info" },
  { status: "Recovery", icon: ShieldAlert, color: "text-success" },
];

const STATUS_FACET: Array<{ label: Status; count: number }> = [
  { label: "New", count: 12 },
  { label: "In Triage", count: 8 },
  { label: "Investigating", count: 14 },
  { label: "Containment", count: 6 },
  { label: "Recovery", count: 5 },
  { label: "Closed", count: 28 },
];

const PRIORITY_FACET: Array<{ label: Priority; count: number }> = [
  { label: "Critical", count: 8 },
  { label: "High", count: 16 },
  { label: "Medium", count: 24 },
  { label: "Low", count: 19 },
];

const TYPE_FACET: Array<{ label: CaseType; count: number }> = [
  { label: "Malware", count: 14 },
  { label: "Phishing", count: 12 },
  { label: "Unauthorized Access", count: 10 },
  { label: "Data Exfiltration", count: 8 },
  { label: "Policy Violation", count: 6 },
  { label: "Other", count: 16 },
];

const ASSIGNEES: Array<{ label: string; count: number }> = [
  { label: "Alex Shah", count: 12 },
  { label: "Priya Mehta", count: 10 },
  { label: "Rohan Kulkarni", count: 8 },
  { label: "Neha Iyer", count: 6 },
];

const TAGS = ["ransomware", "phishing", "insider", "malware", "usb"];

const RECENT_ACTIVITY: Array<{ text: string; time: string; icon: "dot" | "note" | "alert" }> = [
  { text: "Neha Iyer updated status to Investigating", time: "8 Sep 2026, 07:41", icon: "dot" },
  { text: "Rohan Kulkarni added a note", time: "8 Sep 2026, 06:12", icon: "note" },
  { text: "System linked 3 new alerts", time: "8 Sep 2026, 05:18", icon: "alert" },
];

const CASE_DETAIL = {
  id: "CASE-2026-0034",
  title: "Ransomware behavior detected",
  priority: "Critical" as Priority,
  status: "Investigating" as Status,
  type: "Malware" as CaseType,
  created: "8 Sep 2026, 03:28 (IST)",
  updated: "8 Sep 2026, 07:41 (IST)",
  assignee: "Neha Iyer",
  watchers: 3,
  relatedAlerts: ["ALT-77821", "ALT-77819", "ALT-77803"],
  tags: ["ransomware", "encryption", "lateral_movement", "t1566"],
  description:
    "Multiple endpoints showing encryption activity, suspicious file extensions and lateral movement indicators. Possible ransomware campaign.",
};

const DETAIL_TABS = [
  { label: "Overview" },
  { label: "Evidence", count: 6 },
  { label: "Tasks", count: 5 },
  { label: "Activity" },
];

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

function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority];
  return (
    <span className={cn("inline-flex w-fit items-center gap-1 rounded px-1.5 py-[1px] text-[10px] font-semibold", meta.bg, meta.text)}>
      {priority}
    </span>
  );
}

function Avatar({ name, size = 18 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-primary/15 font-semibold text-brand-primary"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      title={name}
    >
      {initials}
    </span>
  );
}

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        {value}
        <ChevronDown className={cn("h-3 w-3 text-text-secondary transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-1.5 w-44 rounded-lg border border-border-default bg-surface-1 p-1 shadow-lg">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "w-full rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium transition-colors",
                o === value ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      ) : null}
      <span className="sr-only">{label}</span>
    </div>
  );
}

/* --------------------------------- header --------------------------------- */

export function CaseManagementHeaderMeta() {
  const [rangeVal, setRangeVal] = React.useState("Last 30 days");
  const [priorityVal, setPriorityVal] = React.useState("All Priorities");
  const [assigneeVal, setAssigneeVal] = React.useState("All Assignees");
  const [searchVal, setSearchVal] = React.useState("");

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5">
        <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search cases..."
          className="h-full w-36 bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
      </div>
      <Dropdown label="Date range" options={["Last 7 days", "Last 30 days", "Last 90 days", "All time"]} value={rangeVal} onChange={setRangeVal} />
      <Dropdown label="Priority filter" options={["All Priorities", "Critical", "High", "Medium", "Low"]} value={priorityVal} onChange={setPriorityVal} />
      <Dropdown label="Assignee filter" options={["All Assignees", "Alex Shah", "Priya Mehta", "Rohan Kulkarni", "Neha Iyer"]} value={assigneeVal} onChange={setAssigneeVal} />
    </div>
  );
}

export function CaseManagementHeaderRight() {
  return (
    <button
      type="button"
      className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
    >
      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      New Case
    </button>
  );
}

/* -------------------------------- filters ---------------------------------- */

function FacetBlock<T extends string>({
  title,
  items,
  checked,
  toggle,
  dotClass,
}: {
  title: string;
  items: Array<{ label: T; count: number }>;
  checked: Set<string>;
  toggle: (label: string) => void;
  dotClass?: (label: T) => string | undefined;
}) {
  return (
    <div className="border-b border-border-default py-3">
      <p className="mb-2 text-[11.5px] font-semibold text-text-primary">{title}</p>
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <label key={item.label} className="flex cursor-pointer items-center gap-2 text-[12px]">
            <Checkbox checked={checked.has(item.label)} onChange={() => toggle(item.label)} />
            {dotClass ? <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClass(item.label))} /> : null}
            <span className="flex-1 truncate text-text-secondary">{item.label}</span>
            <span className="text-[11px] tabular-nums text-text-secondary">({item.count})</span>
          </label>
        ))}
      </div>
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
  const [tagSearch, setTagSearch] = React.useState("");
  const [assigneeSearch, setAssigneeSearch] = React.useState("");
  const [showMoreAssignees, setShowMoreAssignees] = React.useState(false);

  const filteredTags = TAGS.filter((t) => t.toLowerCase().includes(tagSearch.toLowerCase()));
  const filteredAssignees = ASSIGNEES.filter((a) => a.label.toLowerCase().includes(assigneeSearch.toLowerCase())).slice(
    0,
    showMoreAssignees ? ASSIGNEES.length : 3
  );

  return (
    <div className="flex h-full w-60 shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
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
        <FacetBlock title="Status" items={STATUS_FACET} checked={checked} toggle={toggle} />
        <FacetBlock
          title="Priority"
          items={PRIORITY_FACET}
          checked={checked}
          toggle={toggle}
          dotClass={(label) => PRIORITY_META[label].dot}
        />
        <FacetBlock title="Case Type" items={TYPE_FACET} checked={checked} toggle={toggle} />

        <div className="border-b border-border-default py-3">
          <p className="mb-2 text-[11.5px] font-semibold text-text-primary">Assignee</p>
          <div className="mb-2 flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-2 px-2">
            <Search className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
            <input
              type="text"
              value={assigneeSearch}
              onChange={(e) => setAssigneeSearch(e.target.value)}
              placeholder="Search users..."
              className="h-full w-full bg-transparent text-[11.5px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            {filteredAssignees.map((a) => (
              <label key={a.label} className="flex cursor-pointer items-center gap-2 text-[12px]">
                <Checkbox checked={checked.has(a.label)} onChange={() => toggle(a.label)} />
                <Avatar name={a.label} size={16} />
                <span className="flex-1 truncate text-text-secondary">{a.label}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({a.count})</span>
              </label>
            ))}
          </div>
          {ASSIGNEES.length > 3 ? (
            <button
              type="button"
              onClick={() => setShowMoreAssignees((v) => !v)}
              className="mt-1.5 text-left text-[11px] font-medium text-brand-primary hover:underline"
            >
              {showMoreAssignees ? "Show less" : "Show more"}
            </button>
          ) : null}
        </div>

        <div className="py-3">
          <p className="mb-2 text-[11.5px] font-semibold text-text-primary">Tags</p>
          <div className="mb-2 flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-2 px-2">
            <Search className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
            <input
              type="text"
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              placeholder="Search tags..."
              className="h-full w-full bg-transparent text-[11.5px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredTags.map((tag) => {
              const isChecked = checked.has(`tag:${tag}`);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggle(`tag:${tag}`)}
                  className={cn(
                    "rounded-full border px-2 py-1 text-[10.5px] font-medium transition-colors",
                    isChecked
                      ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                      : "border-border-default bg-surface-1 text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- board ----------------------------------- */

function CaseCard({ row, onSelect, isSelected }: { row: CaseRow; onSelect: () => void; isSelected: boolean }) {
  const Icon = CASE_TYPE_ICON[row.type] ?? ShieldAlert;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border bg-surface-1 p-2.5 text-left transition-colors duration-150 hover:border-brand-primary/50",
        isSelected ? "border-brand-primary ring-1 ring-brand-primary" : "border-border-default"
      )}
    >
      <div className="flex items-start justify-between gap-1.5">
        <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-text-secondary">
          <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
          {row.id}
        </span>
        <span
          role="button"
          tabIndex={-1}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-text-secondary hover:bg-surface-3 hover:text-text-primary"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-text-primary">{row.title}</p>
      <div className="flex items-center justify-between">
        <PriorityBadge priority={row.priority} />
        <span className="text-[10px] text-text-secondary">{row.updated.split(",")[1]?.trim() ?? row.updated}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Avatar name={row.assignee} size={16} />
        <span className="truncate text-[10.5px] text-text-secondary">{row.assignee}</span>
      </div>
    </button>
  );
}

function BoardView({
  cases,
  selectedId,
  onSelect,
}: {
  cases: CaseRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid h-full grid-cols-5 gap-3 overflow-x-auto p-4">
      {STATUS_COLUMNS.map(({ status, icon: Icon, color }) => {
        const columnCases = cases.filter((c) => c.status === status);
        return (
          <div key={status} className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg bg-surface-2">
            <div className="flex shrink-0 items-center justify-between px-2.5 py-2">
              <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] font-bold text-text-primary">
                <Icon className={cn("h-3.5 w-3.5 shrink-0", color)} aria-hidden="true" />
                <span className="truncate">{status}</span>
                <span className="shrink-0 rounded-full bg-surface-3 px-1.5 py-[1px] text-[10px] font-semibold text-text-secondary">
                  {columnCases.length}
                </span>
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
              <div className="flex flex-col gap-2">
                {columnCases.map((row) => (
                  <CaseCard key={row.id} row={row} isSelected={row.id === selectedId} onSelect={() => onSelect(row.id)} />
                ))}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-default py-2 text-[11px] font-medium text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                >
                  <Plus className="h-3 w-3" aria-hidden="true" />
                  Add case
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- table ------------------------------------ */

const TABLE_COLUMNS = ["Case ID", "Title", "Priority", "Type", "Status", "Assignee", "Created", "Updated"] as const;

function TableView({
  cases,
  selectedRows,
  toggleRow,
  toggleAll,
  onOpen,
}: {
  cases: CaseRow[];
  selectedRows: Set<string>;
  toggleRow: (id: string) => void;
  toggleAll: () => void;
  onOpen: (id: string) => void;
}) {
  const allChecked = cases.length > 0 && selectedRows.size === cases.length;
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-surface-1">
          <tr className="border-b border-border-default text-[10.5px] text-text-secondary">
            <th className="w-8 py-2 pl-4">
              <Checkbox checked={allChecked} onChange={toggleAll} />
            </th>
            {TABLE_COLUMNS.map((c) => (
              <th key={c} className="whitespace-nowrap px-2 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((row) => (
            <tr key={row.id} className="border-b border-border-default text-[11.5px] hover:bg-surface-2">
              <td className="py-2.5 pl-4">
                <Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
              </td>
              <td className="whitespace-nowrap px-2 py-2.5">
                <button type="button" onClick={() => onOpen(row.id)} className="font-medium text-brand-primary hover:underline">
                  {row.id}
                </button>
              </td>
              <td className="max-w-[220px] truncate px-2 py-2.5 text-text-primary">{row.title}</td>
              <td className="whitespace-nowrap px-2 py-2.5">
                <PriorityBadge priority={row.priority} />
              </td>
              <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.type}</td>
              <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.status}</td>
              <td className="whitespace-nowrap px-2 py-2.5">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <Avatar name={row.assignee} size={16} />
                  {row.assignee}
                </span>
              </td>
              <td className="whitespace-nowrap px-2 py-2.5 tabular-nums text-text-secondary">{row.created}</td>
              <td className="whitespace-nowrap px-2 py-2.5 tabular-nums text-text-secondary">{row.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------- detail drawer -------------------------------- */

function DetailDrawer({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = React.useState(0);
  const [note, setNote] = React.useState("");

  return (
    <div className="flex h-full w-72 shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border-default px-3.5 py-3">
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold text-text-secondary">{CASE_DETAIL.id}</p>
          <p className="truncate text-[13px] font-bold text-text-primary">{CASE_DETAIL.title}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className={cn("inline-flex items-center gap-1 rounded px-1.5 py-[1px] text-[10px] font-semibold", PRIORITY_META[CASE_DETAIL.priority].bg, PRIORITY_META[CASE_DETAIL.priority].text)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", PRIORITY_META[CASE_DETAIL.priority].dot)} />
              {CASE_DETAIL.priority}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-info/10 px-1.5 py-[1px] text-[10px] font-semibold text-info">
              {CASE_DETAIL.status}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case details"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-text-secondary hover:bg-surface-2 hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-b border-border-default px-3.5">
        {DETAIL_TABS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setTab(i)}
            className={cn(
              "flex items-center gap-1 border-b-2 py-2 text-[11.5px] font-medium transition-colors duration-150",
              tab === i ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t.label}
            {t.count ? <span className="tabular-nums">({t.count})</span> : null}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        {tab === 0 ? (
          <>
            <p className="text-[11.5px] font-bold text-text-primary">Description</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">{CASE_DETAIL.description}</p>

            <p className="mt-4 text-[11.5px] font-bold text-text-primary">Case Details</p>
            <div className="mt-1.5 flex flex-col gap-2">
              {[
                ["Case ID", CASE_DETAIL.id],
                ["Type", CASE_DETAIL.type],
                ["Priority", CASE_DETAIL.priority],
                ["Status", CASE_DETAIL.status],
                ["Created", CASE_DETAIL.created],
                ["Last Updated", CASE_DETAIL.updated],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-[11.5px]">
                  <span className="text-text-secondary">{k}</span>
                  <span className="font-medium text-text-primary">{v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-text-secondary">Assignee</span>
                <span className="flex items-center gap-1.5 font-medium text-text-primary">
                  <Avatar name={CASE_DETAIL.assignee} size={16} />
                  {CASE_DETAIL.assignee}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="text-text-secondary">Watchers</span>
                <span className="flex items-center -space-x-1.5">
                  {["Priya Mehta", "Alex Shah", "Rohan Kulkarni"].map((w) => (
                    <span key={w} className="rounded-full ring-2 ring-surface-1">
                      <Avatar name={w} size={18} />
                    </span>
                  ))}
                  <span className="ml-2 text-text-secondary">+{CASE_DETAIL.watchers}</span>
                </span>
              </div>
            </div>

            <p className="mt-4 text-[11.5px] font-bold text-text-primary">Related Alerts</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {CASE_DETAIL.relatedAlerts.map((a) => (
                <span key={a} className="rounded-full border border-border-default bg-surface-2 px-2 py-0.5 text-[10.5px] font-medium text-text-secondary">
                  {a}
                </span>
              ))}
            </div>

            <p className="mt-4 text-[11.5px] font-bold text-text-primary">Tags</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {CASE_DETAIL.tags.map((t) => (
                <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-medium text-text-secondary">
                  {t}
                </span>
              ))}
              <button type="button" className="flex items-center gap-1 rounded-full border border-dashed border-border-default px-2 py-0.5 text-[10.5px] font-medium text-text-secondary hover:border-brand-primary hover:text-brand-primary">
                <Plus className="h-2.5 w-2.5" aria-hidden="true" />
                Add tag
              </button>
            </div>

            <p className="mt-4 flex items-center justify-between text-[11.5px] font-bold text-text-primary">
              Recent Activity
              <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
                View all →
              </button>
            </p>
            <div className="mt-1.5 flex flex-col gap-2.5">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <span
                    className={cn(
                      "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                      a.icon === "alert" ? "bg-warning" : a.icon === "note" ? "bg-info" : "bg-success"
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-text-primary">{a.text}</p>
                    <p className="text-[10px] text-text-secondary">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-[12px] text-text-secondary">
            {DETAIL_TABS[tab].label} — no data yet.
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border-default p-3">
        <div className="mb-2 flex items-center gap-1.5">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="h-8 w-full rounded-lg border border-border-default bg-surface-2 px-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setNote("")}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
          >
            Add Note
          </button>
          <button
            type="button"
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
          >
            Assign
          </button>
          <button
            type="button"
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary text-[11.5px] font-semibold text-white hover:bg-brand-primary-hover"
          >
            Escalate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- main ---------------------------------- */

export function CaseManagement() {
  const [view, setView] = React.useState<0 | 1>(0);
  const [checkedFacets, setCheckedFacets] = React.useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());
  const [selectedCaseId, setSelectedCaseId] = React.useState<string | null>(CASE_DETAIL.id);
  const [rowsShown, setRowsShown] = React.useState(25);
  const [boardExpanded, setBoardExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!boardExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBoardExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [boardExpanded]);

  const toggleFacet = (label: string) => {
    setCheckedFacets((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllRows = () => {
    setSelectedRows((prev) => (prev.size === CASES.length ? new Set() : new Set(CASES.map((c) => c.id))));
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden text-[13px]">
      <FiltersPanel checked={checkedFacets} toggle={toggleFacet} reset={() => setCheckedFacets(new Set())} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-2.5">
          <div className="flex items-center gap-0.5 rounded-md bg-surface-2 p-0.5">
            <button
              type="button"
              onClick={() => setView(0)}
              className={cn(
                "flex items-center gap-1.5 rounded px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-150",
                view === 0 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              Board
            </button>
            <button
              type="button"
              onClick={() => setView(1)}
              className={cn(
                "flex items-center gap-1.5 rounded px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-150",
                view === 1 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <TableIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Table
            </button>
          </div>
          {view === 0 ? (
            <button
              type="button"
              onClick={() => setBoardExpanded(true)}
              aria-label="Expand kanban board"
              title="Expand kanban board"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {view === 0 ? (
          <div className="min-h-0 flex-1 overflow-hidden">
            <BoardView cases={CASES} selectedId={selectedCaseId} onSelect={setSelectedCaseId} />
          </div>
        ) : null}

        <div
          className={cn(
            "flex min-h-0 flex-col overflow-hidden border-t border-border-default",
            view === 0 ? "h-[42%] shrink-0" : "flex-1"
          )}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-2">
            <p className="text-[12px] font-semibold text-text-primary">
              All Cases <span className="font-normal text-text-secondary">({CASES.length})</span>
            </p>
            <div className="flex items-center gap-1.5">
              <button type="button" className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Export
              </button>
              <Dropdown label="Rows shown" options={["10", "25", "50", "100"]} value={`Show ${rowsShown}`} onChange={(v) => setRowsShown(Number(v.replace("Show ", "")))} />
            </div>
          </div>

          <TableView
            cases={CASES.slice(0, rowsShown)}
            selectedRows={selectedRows}
            toggleRow={toggleRow}
            toggleAll={toggleAllRows}
            onOpen={setSelectedCaseId}
          />
        </div>
      </div>

      {selectedCaseId ? <DetailDrawer onClose={() => setSelectedCaseId(null)} /> : null}

      {boardExpanded ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-surface-0 text-[13px]">
          <div className="flex shrink-0 items-center justify-between border-b border-border-default bg-surface-1 px-5 py-3">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              <h2 className="text-[15px] font-bold text-text-primary">Case Board</h2>
              <span className="rounded-full bg-surface-3 px-2 py-[1px] text-[11px] font-semibold text-text-secondary">
                {CASES.length} cases
              </span>
            </div>
            <button
              type="button"
              onClick={() => setBoardExpanded(false)}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
            >
              <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              Collapse
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <BoardView cases={CASES} selectedId={selectedCaseId} onSelect={setSelectedCaseId} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
