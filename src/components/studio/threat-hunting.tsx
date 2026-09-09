"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Columns3,
  Download,
  MoreHorizontal,
  Play,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------- data --------------------------------- */

type RiskLevel = "High Risk" | "Medium Risk" | "Low Risk";

const RISK_META: Record<RiskLevel, string> = {
  "High Risk": "bg-error/10 text-error",
  "Medium Risk": "bg-warning/10 text-warning",
  "Low Risk": "bg-info/10 text-info",
};

type SavedHunt = { id: string; name: string; updated: string };

const SAVED_HUNTS: SavedHunt[] = [
  { id: "HUNT-001", name: "Suspicious PowerShell Activity", updated: "Updated 2 days ago" },
  { id: "HUNT-002", name: "Lateral Movement - SMB", updated: "Updated 5 days ago" },
  { id: "HUNT-003", name: "Data Exfiltration Indicators", updated: "Updated 1 week ago" },
  { id: "HUNT-004", name: "Credential Access - LSASS", updated: "Updated 1 week ago" },
  { id: "HUNT-005", name: "Unusual Remote Access", updated: "Updated 2 weeks ago" },
  { id: "HUNT-006", name: "Registry Persistence Check", updated: "Updated 3 weeks ago" },
  { id: "HUNT-007", name: "DNS Tunneling Patterns", updated: "Updated 1 month ago" },
];

type MitreCategory = { label: string; count: number; techniques: Array<{ id: string; label: string; count: number }> };

const MITRE_CATEGORIES: MitreCategory[] = [
  {
    label: "Initial Access",
    count: 12,
    techniques: [
      { id: "T1566", label: "Phishing", count: 8 },
      { id: "T1190", label: "Exploit Public-Facing App", count: 4 },
    ],
  },
  {
    label: "Execution",
    count: 28,
    techniques: [
      { id: "T1059", label: "Command and Scripting Interpreter", count: 18 },
      { id: "T1021", label: "Remote Services", count: 6 },
      { id: "T1204", label: "User Execution", count: 4 },
    ],
  },
  { label: "Persistence", count: 20, techniques: [{ id: "T1547", label: "Boot or Logon Autostart", count: 20 }] },
  { label: "Privilege Escalation", count: 14, techniques: [{ id: "T1055", label: "Process Injection", count: 14 }] },
  { label: "Defense Evasion", count: 24, techniques: [{ id: "T1070", label: "Indicator Removal", count: 24 }] },
  { label: "Credential Access", count: 18, techniques: [{ id: "T1003", label: "OS Credential Dumping", count: 18 }] },
  { label: "Discovery", count: 26, techniques: [{ id: "T1082", label: "System Information Discovery", count: 26 }] },
  { label: "Lateral Movement", count: 16, techniques: [{ id: "T1021", label: "Remote Services", count: 16 }] },
  { label: "Collection", count: 14, techniques: [{ id: "T1114", label: "Email Collection", count: 14 }] },
  { label: "Command and Control", count: 18, techniques: [{ id: "T1071", label: "Application Layer Protocol", count: 18 }] },
  { label: "Exfiltration", count: 10, techniques: [{ id: "T1041", label: "Exfiltration Over C2", count: 10 }] },
  { label: "Impact", count: 12, techniques: [{ id: "T1486", label: "Data Encrypted for Impact", count: 12 }] },
];

type ResultRow = {
  time: string;
  eventType: string;
  process: string;
  sourceIp: string;
  destIp: string;
  user: string;
  host: string;
  mitreTactic: string;
  mitreTechnique: string;
  risk: RiskLevel;
};

const RESULTS: ResultRow[] = [
  { time: "8 Sep 2026, 14:27:11", eventType: "Process Creation", process: "powershell.exe", sourceIp: "10.10.14.23", destIp: "185.199.110.23", user: "j.smith", host: "FIN-WS-023", mitreTactic: "Execution", mitreTechnique: "T1059", risk: "High Risk" },
  { time: "8 Sep 2026, 14:22:03", eventType: "Network Connection", process: "rundll32.exe", sourceIp: "203.0.113.56", destIp: "45.33.12.11", user: "-", host: "APP-SRV-03", mitreTactic: "Command and Control", mitreTechnique: "T1071", risk: "High Risk" },
  { time: "8 Sep 2026, 14:18:45", eventType: "File Access", process: "powershell.exe", sourceIp: "10.10.12.14", destIp: "-", user: "r.kulkarni", host: "DEV-LT-441", mitreTactic: "Collection", mitreTechnique: "T1005", risk: "Medium Risk" },
  { time: "8 Sep 2026, 14:11:02", eventType: "Process Creation", process: "cmd.exe", sourceIp: "10.10.14.28", destIp: "-", user: "a.singh", host: "HR-WS-087", mitreTactic: "Execution", mitreTechnique: "T1059", risk: "Low Risk" },
  { time: "8 Sep 2026, 13:55:19", eventType: "Network Connection", process: "powershell.exe", sourceIp: "192.168.1.45", destIp: "104.21.78.33", user: "-", host: "DB-SRV-02", mitreTactic: "Exfiltration", mitreTechnique: "T1041", risk: "High Risk" },
  { time: "8 Sep 2026, 13:43:27", eventType: "Registry Modification", process: "reg.exe", sourceIp: "10.10.11.77", destIp: "-", user: "n.iyer", host: "FIN-WS-023", mitreTactic: "Persistence", mitreTechnique: "T1112", risk: "Medium Risk" },
  { time: "8 Sep 2026, 13:21:06", eventType: "Process Creation", process: "wscript.exe", sourceIp: "10.10.12.14", destIp: "-", user: "-", host: "APP-SRV-03", mitreTactic: "Execution", mitreTechnique: "T1059", risk: "Low Risk" },
  { time: "8 Sep 2026, 13:18:40", eventType: "Network Connection", process: "svchost.exe", sourceIp: "172.16.5.30", destIp: "45.76.23.11", user: "-", host: "HR-WS-087", mitreTactic: "Command and Control", mitreTechnique: "T1071", risk: "High Risk" },
  { time: "8 Sep 2026, 13:05:12", eventType: "Process Creation", process: "powershell.exe", sourceIp: "10.10.14.23", destIp: "-", user: "j.smith", host: "FIN-WS-023", mitreTactic: "Execution", mitreTechnique: "T1059", risk: "Medium Risk" },
  { time: "8 Sep 2026, 12:49:37", eventType: "File Creation", process: "7z.exe", sourceIp: "10.10.11.77", destIp: "-", user: "r.kulkarni", host: "DEV-LT-441", mitreTactic: "Exfiltration", mitreTechnique: "T1020", risk: "High Risk" },
];

const RESULT_COLUMNS = ["Time", "Event Type", "Process", "Source IP", "Destination IP", "User", "Host", "MITRE Tactic", "MITRE Technique"] as const;

const EVENT_DETAIL = {
  time: "8 Sep 2026, 14:27:11",
  risk: "High Risk" as RiskLevel,
  eventType: "Process Creation",
  process: "powershell.exe",
  commandLine: "powershell.exe -nop -w hidden -enc ...",
  sourceIp: "10.10.14.23",
  destIp: "185.199.110.23",
  user: "j.smith",
  host: "FIN-WS-023",
  mitreTechnique: "T1059 (Command and Scripting Interpreter)",
  dataSource: "Windows Security Logs",
};

const RELATED_EVENTS: Array<{ label: string; time: string; hex: string }> = [
  { label: "Process created (powershell.exe)", time: "14:27:11", hex: "#e34948" },
  { label: "Network connection to 185.199.110.23", time: "14:27:13", hex: "#2a78d6" },
  { label: "File downloaded (payload.ps1)", time: "14:27:15", hex: "#1baf7a" },
  { label: "Registry modified", time: "14:27:18", hex: "#eda100" },
  { label: "Suspicious child process (rundll32.exe)", time: "14:27:21", hex: "#e34948" },
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

function InlineSelect({
  value,
  options,
  onChange,
  className,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
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
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-full items-center justify-between gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={cn("h-3 w-3 shrink-0 text-text-secondary transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-30 mt-1 w-full min-w-[140px] rounded-lg border border-border-default bg-surface-1 p-1 shadow-lg">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "w-full whitespace-nowrap rounded-md px-2.5 py-1.5 text-left text-[11.5px] font-medium transition-colors",
                o === value ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
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

/* --------------------------------- header --------------------------------- */

export function ThreatHuntingHeaderMeta() {
  const [range, setRange] = React.useState("Last 7 days");
  const [source, setSource] = React.useState("All Data Sources");

  return (
    <div className="flex items-center gap-2">
      <InlineSelect
        className="w-32"
        value={range}
        options={["Last 24 hours", "Last 7 days", "Last 30 days", "All time"]}
        onChange={setRange}
      />
      <InlineSelect
        className="w-40"
        value={source}
        options={["All Data Sources", "Windows Logs", "Network Logs", "Endpoint Telemetry"]}
        onChange={setSource}
      />
      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Play className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
        Run Hunt
      </button>
    </div>
  );
}

/* ------------------------------ saved hunts -------------------------------- */

function SavedHuntsPanel({
  selected,
  onSelect,
  mitreChecked,
  toggleMitre,
}: {
  selected: string;
  onSelect: (id: string) => void;
  mitreChecked: Set<string>;
  toggleMitre: (id: string) => void;
}) {
  const [huntSearch, setHuntSearch] = React.useState("");
  const [mitreSearch, setMitreSearch] = React.useState("");
  const [showAll, setShowAll] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState<Set<string>>(new Set(["Initial Access", "Execution"]));

  const filteredHunts = SAVED_HUNTS.filter((h) => h.name.toLowerCase().includes(huntSearch.toLowerCase())).slice(
    0,
    showAll ? SAVED_HUNTS.length : 5
  );

  const filteredCategories = MITRE_CATEGORIES.map((cat) => ({
    ...cat,
    techniques: cat.techniques.filter(
      (t) => t.label.toLowerCase().includes(mitreSearch.toLowerCase()) || t.id.toLowerCase().includes(mitreSearch.toLowerCase())
    ),
  })).filter((cat) => mitreSearch === "" || cat.techniques.length > 0 || cat.label.toLowerCase().includes(mitreSearch.toLowerCase()));

  const toggleCategory = (label: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const anyMitreChecked = mitreChecked.size > 0;

  return (
    <div className="flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="px-3.5 pt-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-text-primary">Saved Hunts</h2>
            <button type="button" className="flex items-center gap-1 text-[11.5px] font-medium text-brand-primary hover:underline">
              <Plus className="h-3 w-3" aria-hidden="true" />
              New Hunt
            </button>
          </div>
          <div className="mt-2.5 flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-2 px-2.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
            <input
              type="text"
              value={huntSearch}
              onChange={(e) => setHuntSearch(e.target.value)}
              placeholder="Search hunts..."
              className="h-full w-full bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
          </div>

          <div className="mt-2.5 flex flex-col gap-0.5 pb-3">
            {filteredHunts.map((h) => {
              const isActive = h.id === selected;
              return (
                <div
                  key={h.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(h.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(h.id);
                    }
                  }}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                    isActive ? "bg-brand-primary/10" : "hover:bg-surface-2"
                  )}
                >
                  <Checkbox checked={isActive} onChange={() => onSelect(h.id)} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-[12px] font-medium", isActive ? "text-brand-primary" : "text-text-primary")}>
                      {h.name}
                    </p>
                    <p className="text-[10.5px] text-text-secondary">
                      {h.id} · {h.updated}
                    </p>
                  </div>
                </div>
              );
            })}
            {SAVED_HUNTS.length > 5 ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-0.5 self-start text-[11px] font-medium text-brand-primary hover:underline"
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            ) : null}
          </div>
        </div>

        <div className="border-t border-border-default px-3.5 pt-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-text-primary">MITRE ATT&amp;CK</h2>
            {anyMitreChecked ? (
              <button
                type="button"
                onClick={() => {
                  mitreChecked.forEach((id) => toggleMitre(id));
                }}
                className="text-[11.5px] font-medium text-brand-primary hover:underline"
              >
                Clear
              </button>
            ) : null}
          </div>
          <div className="mt-2.5 flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-2 px-2.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
            <input
              type="text"
              value={mitreSearch}
              onChange={(e) => setMitreSearch(e.target.value)}
              placeholder="Search techniques..."
              className="h-full w-full bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
          </div>

          <div className="mt-2 flex flex-col pb-3.5">
            {filteredCategories.map((cat) => {
              const isOpen = openCategories.has(cat.label);
              return (
                <div key={cat.label} className="border-b border-border-default py-2 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.label)}
                    className="flex w-full items-center justify-between text-[11.5px] font-semibold text-text-primary"
                  >
                    <span className="flex items-center gap-1">
                      <ChevronRight className={cn("h-3 w-3 shrink-0 text-text-secondary transition-transform duration-150", isOpen && "rotate-90")} aria-hidden="true" />
                      {cat.label}
                    </span>
                    <span className="text-[10.5px] font-medium text-text-secondary">({cat.count})</span>
                  </button>
                  {isOpen ? (
                    <div className="mt-1.5 flex flex-col gap-1.5 pl-4">
                      {cat.techniques.map((t) => (
                        <label key={t.id} className="flex cursor-pointer items-center gap-2 text-[11.5px]">
                          <Checkbox checked={mitreChecked.has(t.id)} onChange={() => toggleMitre(t.id)} />
                          <span className="flex-1 truncate text-text-secondary" title={t.label}>
                            {t.id} — {t.label}
                          </span>
                          <span className="text-[10.5px] text-text-secondary">{t.count}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- query builder ------------------------------ */

type Condition = { id: number; connector: "AND" | "OR"; field: string; operator: string; values: string[] };

const FIELD_OPTIONS = ["Event Type", "Process Name", "Destination IP", "Source IP", "User", "Host", "Command Line"];
const OPERATOR_OPTIONS = ["is", "is not", "contains", "does not contain", "matches regex"];

let conditionSeq = 100;

function ConditionRow({
  condition,
  onChange,
  onRemove,
  onAdd,
  isFirst,
}: {
  condition: Condition;
  onChange: (next: Condition) => void;
  onRemove: () => void;
  onAdd: () => void;
  isFirst: boolean;
}) {
  const [valueDraft, setValueDraft] = React.useState("");

  const addValue = () => {
    const v = valueDraft.trim();
    if (!v) return;
    onChange({ ...condition, values: [...condition.values, v] });
    setValueDraft("");
  };

  const removeValue = (v: string) => {
    onChange({ ...condition, values: condition.values.filter((x) => x !== v) });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-14 shrink-0">
        {isFirst ? (
          <span className="flex h-8 items-center justify-center text-[11px] font-semibold text-text-secondary">Where</span>
        ) : (
          <InlineSelect
            value={condition.connector}
            options={["AND", "OR"]}
            onChange={(v) => onChange({ ...condition, connector: v as "AND" | "OR" })}
          />
        )}
      </div>
      <InlineSelect
        className="w-40 shrink-0"
        value={condition.field}
        options={FIELD_OPTIONS}
        onChange={(v) => onChange({ ...condition, field: v })}
      />
      <InlineSelect
        className="w-28 shrink-0"
        value={condition.operator}
        options={OPERATOR_OPTIONS}
        onChange={(v) => onChange({ ...condition, operator: v })}
      />
      <div className="flex h-8 min-w-0 flex-1 flex-wrap items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 py-1">
        {condition.values.map((v) => (
          <span key={v} className="flex items-center gap-1 rounded bg-surface-3 px-1.5 py-0.5 text-[11px] font-medium text-text-primary">
            {v}
            <button type="button" onClick={() => removeValue(v)} aria-label={`Remove ${v}`}>
              <X className="h-2.5 w-2.5 text-text-secondary hover:text-text-primary" aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={valueDraft}
          onChange={(e) => setValueDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue();
            }
          }}
          onBlur={addValue}
          placeholder={condition.values.length ? "" : "value..."}
          className="min-w-[60px] flex-1 bg-transparent text-[11.5px] text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
      </div>
      <button
        type="button"
        onClick={onAdd}
        aria-label="Add condition below"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2 hover:text-text-primary"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove condition"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-error/10 hover:text-error"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

function QueryBuilder({ conditions, setConditions }: { conditions: Condition[]; setConditions: React.Dispatch<React.SetStateAction<Condition[]>> }) {
  const updateCondition = (id: number, next: Condition) => {
    setConditions((prev) => prev.map((c) => (c.id === id ? next : c)));
  };
  const removeCondition = (id: number) => {
    setConditions((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  };
  const addCondition = () => {
    conditionSeq += 1;
    setConditions((prev) => [...prev, { id: conditionSeq, connector: "AND", field: "Event Type", operator: "is", values: [] }]);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {conditions.map((c, i) => (
        <ConditionRow
          key={c.id}
          condition={c}
          isFirst={i === 0}
          onChange={(next) => updateCondition(c.id, next)}
          onRemove={() => removeCondition(c.id)}
          onAdd={addCondition}
        />
      ))}
      <button
        type="button"
        onClick={addCondition}
        className="flex w-fit items-center gap-1.5 rounded-md px-1 py-1 text-[11.5px] font-medium text-brand-primary hover:underline"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Add condition
      </button>
    </div>
  );
}

/* ------------------------------- results table ----------------------------- */

function ResultsTable({
  rows,
  selected,
  toggleRow,
  toggleAll,
  onOpen,
}: {
  rows: ResultRow[];
  selected: Set<number>;
  toggleRow: (i: number) => void;
  toggleAll: () => void;
  onOpen: (i: number) => void;
}) {
  const allChecked = rows.length > 0 && selected.size === rows.length;
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-surface-1">
          <tr className="border-b border-border-default text-[10.5px] text-text-secondary">
            <th className="w-8 py-2 pl-4">
              <Checkbox checked={allChecked} onChange={toggleAll} />
            </th>
            {RESULT_COLUMNS.map((c) => (
              <th key={c} className="whitespace-nowrap px-2 py-2 font-medium">
                {c === "Time" ? (
                  <span className="flex items-center gap-1">
                    {c}
                    <ChevronDown className="h-3 w-3" aria-hidden="true" />
                  </span>
                ) : (
                  c
                )}
              </th>
            ))}
            <th className="w-16 px-2 py-2 font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="cursor-pointer border-b border-border-default text-[11.5px] hover:bg-surface-2" onClick={() => onOpen(i)}>
              <td className="py-2.5 pl-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={selected.has(i)} onChange={() => toggleRow(i)} />
              </td>
              <td className="whitespace-nowrap px-2 py-2.5">
                <span className="flex items-center gap-1.5 tabular-nums text-text-secondary">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      row.risk === "High Risk" ? "bg-error" : row.risk === "Medium Risk" ? "bg-warning" : "bg-info"
                    )}
                  />
                  {row.time}
                </span>
              </td>
              <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.eventType}</td>
              <td className="whitespace-nowrap px-2 py-2.5 font-medium text-text-primary">{row.process}</td>
              <td className="whitespace-nowrap px-2 py-2.5 tabular-nums text-text-secondary">{row.sourceIp}</td>
              <td className="whitespace-nowrap px-2 py-2.5 tabular-nums text-text-secondary">{row.destIp}</td>
              <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.user}</td>
              <td className="whitespace-nowrap px-2 py-2.5 text-text-primary">{row.host}</td>
              <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{row.mitreTactic}</td>
              <td className="whitespace-nowrap px-2 py-2.5">
                <span className="rounded bg-surface-3 px-1.5 py-[1px] text-[10.5px] font-semibold text-text-secondary">
                  {row.mitreTechnique}
                </span>
              </td>
              <td className="px-2 py-2.5" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-3 hover:text-text-primary">
                  <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------- detail drawer ------------------------------ */

function EventDetailDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full w-72 shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-3.5 py-3">
        <h2 className="text-[13px] font-bold text-text-primary">Event Details</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2 hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold tabular-nums text-text-primary">{EVENT_DETAIL.time}</p>
          <span className={cn("rounded px-1.5 py-[1px] text-[10px] font-bold", RISK_META[EVENT_DETAIL.risk])}>{EVENT_DETAIL.risk}</span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {[
            ["Event Type", EVENT_DETAIL.eventType],
            ["Process", EVENT_DETAIL.process],
            ["Command Line", EVENT_DETAIL.commandLine],
            ["Source IP", EVENT_DETAIL.sourceIp],
            ["Destination IP", EVENT_DETAIL.destIp],
            ["User", EVENT_DETAIL.user],
            ["Host", EVENT_DETAIL.host],
            ["MITRE Technique", EVENT_DETAIL.mitreTechnique],
            ["Data Source", EVENT_DETAIL.dataSource],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-2 text-[11.5px]">
              <span className="shrink-0 text-text-secondary">{k}</span>
              <span className="truncate text-right font-medium text-text-primary" title={v}>
                {v}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 flex items-center justify-between text-[11.5px] font-bold text-text-primary">
          Related Events ({RELATED_EVENTS.length})
          <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
            View in Timeline →
          </button>
        </p>
        <div className="mt-1.5 flex flex-col gap-2.5">
          {RELATED_EVENTS.map((e, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: e.hex }} />
              <div className="min-w-0 flex-1">
                <p className="text-text-primary">{e.label}</p>
              </div>
              <span className="shrink-0 tabular-nums text-text-secondary">{e.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 border-t border-border-default p-3">
        <button
          type="button"
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
        >
          Add to Hunt
        </button>
        <button
          type="button"
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary text-[11.5px] font-semibold text-white hover:bg-brand-primary-hover"
        >
          Create Detection Rule
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- main ---------------------------------- */

export function ThreatHunting() {
  const [queryTab, setQueryTab] = React.useState<0 | 1>(0);
  const [selectedHunt, setSelectedHunt] = React.useState("HUNT-001");
  const [mitreChecked, setMitreChecked] = React.useState<Set<string>>(() => new Set(["T1059"]));
  const [conditions, setConditions] = React.useState<Condition[]>([
    { id: 1, connector: "AND", field: "Event Type", operator: "is", values: ["Process Creation", "Network Connection"] },
    { id: 2, connector: "AND", field: "Process Name", operator: "contains", values: ["powershell"] },
    { id: 3, connector: "AND", field: "Destination IP", operator: "is not", values: ["Internal IP Range"] },
    { id: 4, connector: "AND", field: "User", operator: "is not", values: ["Service Account"] },
  ]);
  const [rangeVal, setRangeVal] = React.useState("Last 7 days");
  const [kql, setKql] = React.useState(
    'EventType in ("Process Creation", "Network Connection")\n  and ProcessName contains "powershell"\n  and DestinationIp not in InternalIpRange\n  and User not in ServiceAccount'
  );
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const [openEventIndex, setOpenEventIndex] = React.useState<number | null>(0);
  const [page, setPage] = React.useState(1);
  const [rowsShown, setRowsShown] = React.useState("10");

  const toggleMitre = (id: string) => {
    setMitreChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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
    setSelectedRows((prev) => (prev.size === RESULTS.length ? new Set() : new Set(RESULTS.map((_, i) => i))));
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden text-[13px]">
      <SavedHuntsPanel selected={selectedHunt} onSelect={setSelectedHunt} mitreChecked={mitreChecked} toggleMitre={toggleMitre} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border-default px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-text-primary">Hunt Query Builder</h2>
            <div className="flex items-center gap-1.5">
              <button type="button" className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                Load Hunt
              </button>
              <button type="button" className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
                Save Hunt
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2" aria-label="More options">
                <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-0.5 rounded-md bg-surface-2 p-0.5" style={{ width: "fit-content" }}>
            <button
              type="button"
              onClick={() => setQueryTab(0)}
              className={cn(
                "rounded px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-150",
                queryTab === 0 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Visual Builder
            </button>
            <button
              type="button"
              onClick={() => setQueryTab(1)}
              className={cn(
                "rounded px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-150",
                queryTab === 1 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Query Language (KQL)
            </button>
          </div>

          <div className="mt-3">
            {queryTab === 0 ? (
              <QueryBuilder conditions={conditions} setConditions={setConditions} />
            ) : (
              <textarea
                value={kql}
                onChange={(e) => setKql(e.target.value)}
                rows={4}
                spellCheck={false}
                className="w-full resize-none rounded-lg border border-border-default bg-surface-2 px-3.5 py-2.5 font-mono text-[12px] leading-5 text-text-primary focus:border-brand-primary focus:outline-none"
              />
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <InlineSelect className="w-32" value={rangeVal} options={["Last 24 hours", "Last 7 days", "Last 30 days", "All time"]} onChange={setRangeVal} />
            <button
              type="button"
              className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-4 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
            >
              <Play className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
              Run Query
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between px-4 pt-2.5">
          <div>
            <h2 className="text-[13px] font-bold text-text-primary">Hunt Results</h2>
            <p className="text-[11px] text-text-secondary">
              {RESULTS.length.toLocaleString()} events found (7 Sep 2026, 00:00 – 8 Sep 2026, 23:59 IST)
            </p>
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
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2" aria-label="More options">
              <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-2 min-h-0 flex-1 overflow-hidden border-t border-border-default">
          <ResultsTable rows={RESULTS} selected={selectedRows} toggleRow={toggleRow} toggleAll={toggleAllRows} onOpen={setOpenEventIndex} />
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded text-[11px] font-medium",
                  p === page ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2"
                )}
              >
                {p}
              </button>
            ))}
            <span className="px-1 text-[11px] text-text-secondary">…</span>
            <button
              type="button"
              onClick={() => setPage(235)}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded text-[11px] font-medium",
                page === 235 ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2"
              )}
            >
              235
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, 235))}
              className="ml-1 flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2"
              aria-label="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <InlineSelect
            className="w-28"
            value={`Show ${rowsShown} rows`}
            options={["Show 10 rows", "Show 25 rows", "Show 50 rows", "Show 100 rows"]}
            onChange={(v) => setRowsShown(v.replace("Show ", "").replace(" rows", ""))}
          />
        </div>
      </div>

      {openEventIndex !== null ? <EventDetailDrawer onClose={() => setOpenEventIndex(null)} /> : null}
    </div>
  );
}
