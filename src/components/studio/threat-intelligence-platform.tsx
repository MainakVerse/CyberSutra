"use client";

import * as React from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Download,
  Fingerprint,
  Globe2,
  Info,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  Shield,
  TrendingUp,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type IocType = "IP Address" | "Domain" | "URL" | "Hash" | "Email" | "File Name" | "CVE";
type ThreatType = "Malware" | "Phishing" | "C2" | "Ransomware" | "Botnet" | "APT" | "Exploitation" | "Scanning";
type Status = "Active" | "Monitoring" | "Expired";

type Ioc = {
  id: string;
  value: string;
  type: IocType;
  threatType: ThreatType;
  confidence: number;
  source: string;
  firstSeen: string;
  lastSeen: string;
  status: Status;
  tags: string[];
};

/* -------------------------------- dummy data -------------------------------- */

const IOC_TYPE_COUNTS: Array<{ type: IocType; count: number }> = [
  { type: "IP Address", count: 12482 },
  { type: "Domain", count: 8921 },
  { type: "URL", count: 6332 },
  { type: "Hash", count: 5771 },
  { type: "Email", count: 1204 },
  { type: "File Name", count: 932 },
  { type: "CVE", count: 418 },
];

const SOURCE_FEEDS: Array<{ label: string; count: number }> = [
  { label: "AlienVault OTX", count: 4221 },
  { label: "MISP", count: 3892 },
  { label: "VirusTotal", count: 2881 },
  { label: "Cisco Talos", count: 2441 },
  { label: "Recorded Future", count: 1906 },
  { label: "CERT-In", count: 1204 },
  { label: "Proofpoint", count: 1021 },
  { label: "CrowdStrike", count: 1021 },
];

const TAG_OPTIONS = ["ransomware", "apt28", "phishing", "loader", "stealer"];

const DONUT_SEGMENTS: Array<{ label: string; pct: number; hex: string }> = [
  { label: "Malware", pct: 28, hex: "#1e5fd6" },
  { label: "Phishing", pct: 18, hex: "#22b8cf" },
  { label: "C2", pct: 14, hex: "#9b6ff2" },
  { label: "Ransomware", pct: 8, hex: "#f79009" },
  { label: "Botnet", pct: 6, hex: "#12b76a" },
  { label: "Other", pct: 26, hex: "#d6e0ef" },
];

const TARGETED_SECTORS: Array<{ label: string; pct: number }> = [
  { label: "Technology", pct: 24 },
  { label: "Financial Services", pct: 18 },
  { label: "Government", pct: 16 },
  { label: "Healthcare", pct: 12 },
  { label: "Manufacturing", pct: 9 },
];

const ENRICHMENT: Array<{ label: string; value: string }> = [
  { label: "VirusTotal", value: "48 / 72 detections" },
  { label: "GreyNoise", value: "Malicious" },
  { label: "Shodan", value: "12 open ports" },
  { label: "Censys", value: "Seen in 18 certificates" },
  { label: "Passive DNS", value: "37 domains" },
  { label: "Related Hashes", value: "6" },
];

const RECENT_SIGHTINGS: Array<{ time: string; source: string; event: string }> = [
  { time: "8 Sep 2026, 14:37", source: "MISP", event: "C2 communication" },
  { time: "8 Sep 2026, 12:11", source: "CrowdStrike", event: "Beacon detected" },
  { time: "8 Sep 2026, 09:02", source: "Firewall", event: "Outbound connection" },
  { time: "7 Sep 2026, 23:18", source: "EDR", event: "Process execution" },
];

function buildIocFeed(): Ioc[] {
  const rows: Array<[string, IocType, ThreatType, number, string, string, string, Status, string[]]> = [
    ["185.199.110.23", "IP Address", "C2", 95, "MISP", "5 Sep 2026", "8 Sep 2026", "Active", ["apt28", "c2"]],
    ["malware-update[.]com", "Domain", "Malware", 88, "VirusTotal", "4 Sep 2026", "8 Sep 2026", "Active", ["loader", "malware"]],
    ["3f2a8c4d9e7b16fc...", "Hash", "Ransomware", 91, "AlienVault OTX", "6 Sep 2026", "8 Sep 2026", "Active", ["ransomware", "win"]],
    ["hxxp://secure-login[.]net", "URL", "Phishing", 78, "Proofpoint", "6 Sep 2026", "8 Sep 2026", "Active", ["phishing", "brand"]],
    ["CVE-2026-4127", "CVE", "Exploitation", 85, "CISA KEV", "1 Sep 2026", "7 Sep 2026", "Active", ["rce", "fortinet"]],
    ["invoice.exe", "File Name", "Malware", 76, "CrowdStrike", "5 Sep 2026", "8 Sep 2026", "Active", ["malware", "dropper"]],
    ["user-support@fastmail[.]com", "Email", "Phishing", 69, "Abuse.ch", "4 Sep 2026", "7 Sep 2026", "Active", ["phishing", "bec"]],
    ["193.56.241.10", "IP Address", "Botnet", 82, "Talos", "3 Sep 2026", "8 Sep 2026", "Active", ["botnet", "mirai"]],
    ["setup_v2.msi", "File Name", "Malware", 71, "VirusTotal", "6 Sep 2026", "8 Sep 2026", "Active", ["msi", "loader"]],
    ["cdn-content[.]org", "Domain", "Scanning", 60, "GreyNoise", "2 Sep 2026", "6 Sep 2026", "Monitoring", ["scanner", "recon"]],
    ["45.142.212.8", "IP Address", "Malware", 88, "AlienVault OTX", "1 Sep 2026", "8 Sep 2026", "Active", ["apt28", "russia"]],
    ["e3b0c44298fc1c14...", "Hash", "Ransomware", 94, "CERT-In", "31 Aug 2026", "8 Sep 2026", "Active", ["ransomware", "lockbit"]],
    ["billing-portal[.]info", "Domain", "Phishing", 73, "MISP", "30 Aug 2026", "7 Sep 2026", "Active", ["phishing", "stealer"]],
    ["reset-password[.]site", "URL", "Phishing", 66, "Proofpoint", "29 Aug 2026", "5 Sep 2026", "Monitoring", ["phishing", "brand"]],
    ["CVE-2026-3390", "CVE", "Exploitation", 79, "CISA KEV", "28 Aug 2026", "4 Sep 2026", "Active", ["exploit", "vmware"]],
    ["109.202.202.202", "IP Address", "C2", 90, "Cisco Talos", "27 Aug 2026", "8 Sep 2026", "Active", ["c2", "apt28"]],
    ["softpatch-installer.dll", "File Name", "Malware", 68, "CrowdStrike", "26 Aug 2026", "3 Sep 2026", "Monitoring", ["dll", "loader"]],
    ["8f14e45fceea167a...", "Hash", "Malware", 84, "VirusTotal", "25 Aug 2026", "6 Sep 2026", "Active", ["stealer", "win"]],
    ["update-flashplayer[.]ru", "Domain", "Malware", 72, "AlienVault OTX", "24 Aug 2026", "2 Sep 2026", "Expired", ["russia", "malware"]],
    ["203.0.113.55", "IP Address", "Botnet", 58, "GreyNoise", "23 Aug 2026", "1 Sep 2026", "Monitoring", ["botnet", "scan"]],
    ["accounts-verify[.]com", "URL", "Phishing", 81, "Abuse.ch", "22 Aug 2026", "31 Aug 2026", "Active", ["phishing", "bec"]],
    ["77.83.36.14", "IP Address", "C2", 87, "MISP", "21 Aug 2026", "30 Aug 2026", "Active", ["c2", "apt29"]],
    ["CVE-2026-2185", "CVE", "Exploitation", 74, "CISA KEV", "20 Aug 2026", "29 Aug 2026", "Active", ["rce", "citrix"]],
    ["report_q3.xlsm", "File Name", "Malware", 63, "Proofpoint", "19 Aug 2026", "28 Aug 2026", "Monitoring", ["macro", "dropper"]],
  ];

  return rows.map(([value, type, threatType, confidence, source, firstSeen, lastSeen, status, tags], i) => ({
    id: `ioc-${i}`,
    value,
    type,
    threatType,
    confidence,
    source,
    firstSeen,
    lastSeen,
    status: status as Status,
    tags,
  }));
}

const IOC_FEED = buildIocFeed();

const THREAT_TYPE_HEX: Record<ThreatType, string> = {
  Malware: "#1e5fd6",
  Phishing: "#22b8cf",
  C2: "#9b6ff2",
  Ransomware: "#f04438",
  Botnet: "#12b76a",
  APT: "#f79009",
  Exploitation: "#eb2f96",
  Scanning: "#6b7280",
};

const STATUS_STYLE: Record<Status, string> = {
  Active: "bg-error/10 text-error",
  Monitoring: "bg-warning/10 text-warning",
  Expired: "bg-surface-3 text-text-secondary",
};

const TYPE_ICON: Record<IocType, React.ElementType> = {
  "IP Address": Globe2,
  Domain: Globe2,
  URL: ArrowUpRight,
  Hash: Fingerprint,
  Email: MoreHorizontal,
  "File Name": MoreHorizontal,
  CVE: AlertTriangle,
};

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

function ToggleChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-150",
        active
          ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
          : "border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2"
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------- filters sidebar -------------------------------- */

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border-b border-border-default py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 text-[11.5px] font-semibold uppercase tracking-wide text-text-secondary"
      >
        {title}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-150", !open && "-rotate-90")} />
      </button>
      {open ? <div className="mt-2.5 px-4">{children}</div> : null}
    </div>
  );
}

function FiltersSidebar({
  search,
  setSearch,
  typeFilters,
  toggleType,
  sourceFilters,
  toggleSource,
  showAllSources,
  setShowAllSources,
  confidenceMin,
  setConfidenceMin,
  threatTypeFilters,
  toggleThreatType,
  tagFilters,
  toggleTag,
  onReset,
}: {
  search: string;
  setSearch: (v: string) => void;
  typeFilters: Set<IocType>;
  toggleType: (t: IocType) => void;
  sourceFilters: Set<string>;
  toggleSource: (s: string) => void;
  showAllSources: boolean;
  setShowAllSources: (v: boolean) => void;
  confidenceMin: number;
  setConfidenceMin: (v: number) => void;
  threatTypeFilters: Set<ThreatType>;
  toggleThreatType: (t: ThreatType) => void;
  tagFilters: Set<string>;
  toggleTag: (t: string) => void;
  onReset: () => void;
}) {
  const visibleSources = showAllSources ? SOURCE_FEEDS : SOURCE_FEEDS.slice(0, 5);

  return (
    <div className="flex h-full w-[248px] shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between px-4 py-3.5">
        <h2 className="text-[13px] font-bold text-text-primary">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11.5px] font-medium text-brand-primary hover:underline"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-4">
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sources, tags, etc."
              className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
        </div>

        <FilterSection title="IOC Type">
          <div className="flex flex-col gap-2">
            {IOC_TYPE_COUNTS.map((t) => (
              <label key={t.type} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={typeFilters.has(t.type)} onChange={() => toggleType(t.type)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{t.type}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">
                  ({t.count.toLocaleString()})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Source Feed">
          <div className="flex flex-col gap-2">
            {visibleSources.map((s) => (
              <label key={s.label} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={sourceFilters.has(s.label)} onChange={() => toggleSource(s.label)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{s.label}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">
                  ({s.count.toLocaleString()})
                </span>
              </label>
            ))}
            <button
              type="button"
              onClick={() => setShowAllSources(!showAllSources)}
              className="pt-0.5 text-left text-[11.5px] font-medium text-brand-primary hover:underline"
            >
              {showAllSources ? "Show less" : "Show more"}
            </button>
          </div>
        </FilterSection>

        <FilterSection title="Confidence Score">
          <div className="px-0.5">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={confidenceMin}
              onChange={(e) => setConfidenceMin(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, var(--brand-primary) ${confidenceMin}%, var(--surface-3) ${confidenceMin}%)`,
              }}
              className={cn(
                "h-1.5 w-full cursor-pointer appearance-none rounded-full",
                "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-primary [&::-webkit-slider-thumb]:bg-surface-1 [&::-webkit-slider-thumb]:shadow-sm",
                "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand-primary [&::-moz-range-thumb]:bg-surface-1 [&::-moz-range-thumb]:shadow-sm"
              )}
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-text-secondary">
              <span>{confidenceMin}</span>
              <span>100</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Threat Type">
          <div className="flex flex-col gap-2">
            {(["Malware", "Phishing", "C2", "Ransomware", "Botnet", "APT", "Scanning"] as ThreatType[]).map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={threatTypeFilters.has(t)} onChange={() => toggleThreatType(t)} />
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: THREAT_TYPE_HEX[t] }}
                />
                <span className="flex-1 truncate text-[12px] text-text-primary">{t}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Tags" defaultOpen>
          <div className="flex flex-wrap gap-1.5">
            {TAG_OPTIONS.map((t) => (
              <ToggleChip key={t} active={tagFilters.has(t)} onClick={() => toggleTag(t)}>
                {t}
              </ToggleChip>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

/* -------------------------------- stat cards -------------------------------- */

const STATS: Array<{
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string;
  delta?: string;
  deltaClass?: string;
  sub?: string;
}> = [
  { icon: TrendingUp, iconClass: "bg-info/10 text-info", label: "Total IOCs", value: "35,428", delta: "↑ 12%", deltaClass: "text-success", sub: "+3,812 new this week" },
  { icon: Shield, iconClass: "bg-error/10 text-error", label: "High Confidence", value: "8,421", delta: "↑ 18%", deltaClass: "text-success", sub: "24% of total" },
  { icon: AlertTriangle, iconClass: "bg-warning/10 text-warning", label: "Active Threats", value: "1,206", delta: "↑ 7%", deltaClass: "text-success", sub: "Seen in your environment" },
  { icon: Activity, iconClass: "bg-success/10 text-success", label: "New This Week", value: "3,812", delta: "↑ 32%", deltaClass: "text-success", sub: "Across 18 source feeds" },
];

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const Icon = stat.icon;
  return (
    <div className="flex min-w-0 flex-1 items-start gap-2.5 rounded-xl border border-border-default bg-surface-1 px-3.5 py-3">
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", stat.iconClass)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-[17px] font-bold tabular-nums text-text-primary">{stat.value}</span>
          {stat.delta ? <span className={cn("text-[10.5px] font-semibold", stat.deltaClass)}>{stat.delta}</span> : null}
        </div>
        <p className="truncate text-[11px] font-medium text-text-primary">{stat.label}</p>
        {stat.sub ? <p className="truncate text-[10px] leading-tight text-text-secondary">{stat.sub}</p> : null}
      </div>
    </div>
  );
}

/* -------------------------------- donut + panels -------------------------------- */

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

function ThreatTypesDonut() {
  const size = 96;
  const strokeWidth = 15;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth / 2 - 1;
  let angle = -90;
  const segs = DONUT_SEGMENTS.map((s) => {
    const sweep = (s.pct / 100) * 360 - 2.5;
    const start = angle;
    const end = angle + Math.max(sweep, 0);
    angle += (s.pct / 100) * 360;
    return { ...s, start, end };
  });

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          {segs.map((seg) => (
            <path key={seg.label} d={arcPath(cx, cy, r, seg.start, seg.end)} fill="none" stroke={seg.hex} strokeWidth={strokeWidth} strokeLinecap="round" />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[16px] font-bold tabular-nums text-text-primary">35,428</span>
          <span className="text-[9px] text-text-secondary">IOCs</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {DONUT_SEGMENTS.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-[11px]">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.hex }} />
            <span className="flex-1 truncate text-text-secondary">{s.label}</span>
            <span className="font-semibold tabular-nums text-text-primary">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HBarList({ items, max, unit = "" }: { items: Array<{ label: string; count: number }>; max: number; unit?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="w-[104px] shrink-0 truncate text-[11px] text-text-secondary">{item.label}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-brand-primary" style={{ width: `${Math.max((item.count / max) * 100, 4)}%` }} />
          </div>
          <span className="w-10 shrink-0 text-right text-[11px] font-semibold tabular-nums text-text-primary">
            {item.count.toLocaleString()}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

function PanelHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3 pb-2">
      <h3 className="text-[12px] font-bold text-text-primary">{title}</h3>
      {right}
    </div>
  );
}

function ViewAllLink() {
  return (
    <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
      View all
    </button>
  );
}

/* -------------------------------- IOC table -------------------------------- */

const COLUMN_DEFS = ["IOC Value", "Type", "Threat Type", "Confidence", "Source", "First Seen", "Last Seen", "Status"] as const;

function ConfidenceBadge({ score }: { score: number }) {
  const cls = score >= 85 ? "bg-error/10 text-error" : score >= 70 ? "bg-warning/10 text-warning" : "bg-info/10 text-info";
  return <span className={cn("rounded px-1.5 py-0.5 text-[11px] font-semibold tabular-nums", cls)}>{score}</span>;
}

function IocTable({
  rows,
  columns,
  selectedId,
  onSelect,
  watchlist,
  toggleWatch,
}: {
  rows: Ioc[];
  columns: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  watchlist: Set<string>;
  toggleWatch: (id: string) => void;
}) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const toggleAll = () => {
    if (allChecked) setSelected(new Set());
    else setSelected(new Set(rows.map((r) => r.id)));
  };
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <table className="w-full min-w-[900px] border-collapse text-left">
      <thead className="sticky top-0 z-10 bg-surface-1">
        <tr className="border-b border-border-default text-[10.5px] uppercase tracking-wide text-text-secondary">
          <th className="w-8 py-2 pl-4">
            <Checkbox checked={allChecked} onChange={toggleAll} />
          </th>
          {columns.has("IOC Value") && <th className="py-2 pr-3 font-medium">IOC Value</th>}
          {columns.has("Type") && <th className="py-2 pr-3 font-medium">Type</th>}
          {columns.has("Threat Type") && <th className="py-2 pr-3 font-medium">Threat Type</th>}
          {columns.has("Confidence") && <th className="py-2 pr-3 font-medium">Confidence</th>}
          {columns.has("Source") && <th className="py-2 pr-3 font-medium">Source</th>}
          {columns.has("First Seen") && <th className="py-2 pr-3 font-medium">First Seen</th>}
          {columns.has("Last Seen") && <th className="py-2 pr-3 font-medium">Last Seen</th>}
          {columns.has("Status") && <th className="py-2 pr-4 font-medium">Status</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const Icon = TYPE_ICON[r.type];
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
                <Checkbox checked={selected.has(r.id)} onChange={() => toggleOne(r.id)} />
              </td>
              {columns.has("IOC Value") && (
                <td className="max-w-[220px] truncate py-2 pr-3 font-medium text-brand-primary">
                  <span className="flex items-center gap-1.5">
                    <Icon className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
                    <span className="truncate">{r.value}</span>
                  </span>
                </td>
              )}
              {columns.has("Type") && <td className="py-2 pr-3 text-text-secondary">{r.type}</td>}
              {columns.has("Threat Type") && (
                <td className="py-2 pr-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: `${THREAT_TYPE_HEX[r.threatType]}1a`, color: THREAT_TYPE_HEX[r.threatType] }}
                  >
                    {r.threatType}
                  </span>
                </td>
              )}
              {columns.has("Confidence") && (
                <td className="py-2 pr-3">
                  <ConfidenceBadge score={r.confidence} />
                </td>
              )}
              {columns.has("Source") && <td className="py-2 pr-3 text-text-secondary">{r.source}</td>}
              {columns.has("First Seen") && <td className="py-2 pr-3 tabular-nums text-text-secondary">{r.firstSeen}</td>}
              {columns.has("Last Seen") && <td className="py-2 pr-3 tabular-nums text-text-secondary">{r.lastSeen}</td>}
              {columns.has("Status") && (
                <td className="py-2 pr-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", STATUS_STYLE[r.status])}>
                      {r.status}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatch(r.id);
                      }}
                      className="shrink-0 text-text-secondary hover:text-brand-primary"
                      aria-label="Toggle watchlist"
                    >
                      <Bookmark className={cn("h-3.5 w-3.5", watchlist.has(r.id) && "fill-brand-primary text-brand-primary")} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ColumnsMenu({ columns, toggleColumn }: { columns: Set<string>; toggleColumn: (c: string) => void }) {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Columns3 className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Columns
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-20 mt-1.5 w-[180px] rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg">
          {COLUMN_DEFS.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface-2">
              <Checkbox checked={columns.has(c)} onChange={() => toggleColumn(c)} />
              <span className="text-[12px] text-text-primary">{c}</span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
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

function DetailPanel({ ioc, onClose, watchlist, toggleWatch }: { ioc: Ioc; onClose: () => void; watchlist: Set<string>; toggleWatch: (id: string) => void }) {
  const [tab, setTab] = React.useState(0);
  const isWatched = watchlist.has(ioc.id);

  return (
    <div className="flex h-full w-[340px] shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border-default px-4 py-3.5">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Globe2 className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
            <span className="truncate text-[13px] font-bold text-text-primary">{ioc.value}</span>
          </div>
          <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-semibold", STATUS_STYLE[ioc.status])}>
            {ioc.status}
          </span>
        </div>
        <button type="button" onClick={onClose} className="shrink-0 rounded-md p-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-2">
        <DetailTab label="Overview" active={tab === 0} onClick={() => setTab(0)} />
        <DetailTab label="Enrichment" active={tab === 1} onClick={() => setTab(1)} />
        <DetailTab label="Sightings" active={tab === 2} onClick={() => setTab(2)} badge="(24)" />
        <DetailTab label="Related" active={tab === 3} onClick={() => setTab(3)} badge="(18)" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        {tab === 0 ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-border-default p-3">
              <div>
                <p className="text-[11px] text-text-secondary">Confidence Score</p>
                <p className="text-[20px] font-bold tabular-nums text-text-primary">{ioc.confidence} / 100</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-error/10 text-error">
                <Shield className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
            </div>

            <dl className="flex flex-col divide-y divide-border-default text-[12px]">
              {[
                ["Threat Type", ioc.threatType],
                ["Threat Actor", "APT28 (Fancy Bear)"],
                ["Source", ioc.source],
                ["First Seen", ioc.firstSeen],
                ["Last Seen", ioc.lastSeen],
                ["Reputation", "Malicious"],
                ["Location", "Moscow, Russia"],
                ["Autonomous System", "AS12389 (Rostelecom)"],
                ["Reverse DNS", "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">{k}</dt>
                  <dd className="max-w-[170px] truncate text-right font-medium text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="mb-1.5 text-[11px] text-text-secondary">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {ioc.tags.map((t) => (
                  <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === 1 ? (
          <div className="flex flex-col divide-y divide-border-default">
            {ENRICHMENT.map((e) => (
              <div key={e.label} className="flex items-center justify-between gap-2 py-2.5 text-[12px]">
                <span className="text-text-secondary">{e.label}</span>
                <span className="font-medium text-text-primary">{e.value}</span>
              </div>
            ))}
          </div>
        ) : null}

        {tab === 2 ? (
          <div className="flex flex-col gap-1">
            {RECENT_SIGHTINGS.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-2 border-b border-border-default py-2.5 text-[11.5px] last:border-0">
                <div className="min-w-0">
                  <p className="truncate font-medium text-text-primary">{s.event}</p>
                  <p className="truncate text-text-secondary">{s.source}</p>
                </div>
                <span className="shrink-0 tabular-nums text-text-secondary">{s.time}</span>
              </div>
            ))}
          </div>
        ) : null}

        {tab === 3 ? (
          <div className="flex flex-col gap-2">
            {IOC_FEED.filter((r) => r.id !== ioc.id && r.threatType === ioc.threatType)
              .slice(0, 6)
              .map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
                  <span className="truncate font-medium text-brand-primary">{r.value}</span>
                  <ConfidenceBadge score={r.confidence} />
                </div>
              ))}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-border-default px-4 py-3">
        <button
          type="button"
          onClick={() => toggleWatch(ioc.id)}
          className={cn(
            "flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border text-[12px] font-medium transition-colors duration-150",
            isWatched ? "border-brand-primary bg-brand-primary/10 text-brand-primary" : "border-border-default bg-surface-1 text-text-primary hover:bg-surface-2"
          )}
        >
          <Bookmark className={cn("h-3.5 w-3.5", isWatched && "fill-brand-primary")} aria-hidden="true" />
          {isWatched ? "Watching" : "Add to Watchlist"}
        </button>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2"
          aria-label="More actions"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- header meta -------------------------------- */

export function ThreatIntelHeaderMeta() {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState("Last 7 days");
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
    <div className="flex items-center gap-2">
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
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
      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Add IOC
      </button>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

const PAGE_SIZE = 10;

export function ThreatIntelligencePlatform() {
  const [search, setSearch] = React.useState("");
  const [typeFilters, setTypeFilters] = React.useState<Set<IocType>>(new Set());
  const [sourceFilters, setSourceFilters] = React.useState<Set<string>>(new Set());
  const [showAllSources, setShowAllSources] = React.useState(false);
  const [confidenceMin, setConfidenceMin] = React.useState(0);
  const [threatTypeFilters, setThreatTypeFilters] = React.useState<Set<ThreatType>>(new Set());
  const [tagFilters, setTagFilters] = React.useState<Set<string>>(new Set());
  const [tableSearch, setTableSearch] = React.useState("");
  const [columns, setColumns] = React.useState<Set<string>>(new Set(COLUMN_DEFS));
  const [selectedId, setSelectedId] = React.useState<string | null>(IOC_FEED[0].id);
  const [watchlist, setWatchlist] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);

  const toggleSet = <T,>(setFn: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) => {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleWatch = (id: string) => toggleSet(setWatchlist, id);

  const resetFilters = () => {
    setSearch("");
    setTypeFilters(new Set());
    setSourceFilters(new Set());
    setConfidenceMin(0);
    setThreatTypeFilters(new Set());
    setTagFilters(new Set());
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const tq = tableSearch.trim().toLowerCase();
    return IOC_FEED.filter((r) => {
      if (typeFilters.size && !typeFilters.has(r.type)) return false;
      if (sourceFilters.size && !sourceFilters.has(r.source)) return false;
      if (r.confidence < confidenceMin) return false;
      if (threatTypeFilters.size && !threatTypeFilters.has(r.threatType)) return false;
      if (tagFilters.size && ![...tagFilters].some((t) => r.tags.includes(t))) return false;
      if (q && !(r.value.toLowerCase().includes(q) || r.tags.some((t) => t.includes(q)) || r.source.toLowerCase().includes(q))) return false;
      if (tq && !(r.value.toLowerCase().includes(tq) || r.threatType.toLowerCase().includes(tq) || r.source.toLowerCase().includes(tq))) return false;
      return true;
    });
  }, [search, tableSearch, typeFilters, sourceFilters, confidenceMin, threatTypeFilters, tagFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedIoc = IOC_FEED.find((r) => r.id === selectedId) ?? null;

  React.useEffect(() => {
    setPage(1);
  }, [search, tableSearch, typeFilters, sourceFilters, confidenceMin, threatTypeFilters, tagFilters]);

  const maxSourceFeed = Math.max(...SOURCE_FEEDS.map((s) => s.count));
  const maxSector = Math.max(...TARGETED_SECTORS.map((s) => s.pct));

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <FiltersSidebar
        search={search}
        setSearch={setSearch}
        typeFilters={typeFilters}
        toggleType={(t) => toggleSet(setTypeFilters, t)}
        sourceFilters={sourceFilters}
        toggleSource={(s) => toggleSet(setSourceFilters, s)}
        showAllSources={showAllSources}
        setShowAllSources={setShowAllSources}
        confidenceMin={confidenceMin}
        setConfidenceMin={setConfidenceMin}
        threatTypeFilters={threatTypeFilters}
        toggleThreatType={(t) => toggleSet(setThreatTypeFilters, t)}
        tagFilters={tagFilters}
        toggleTag={(t) => toggleSet(setTagFilters, t)}
        onReset={resetFilters}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 p-4">
            <div className="grid grid-cols-4 gap-3">
              {STATS.map((s) => (
                <StatCard key={s.label} stat={s} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
                <PanelHeader title="Threat Types" />
                <div className="px-4 pb-3.5">
                  <ThreatTypesDonut />
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
                <PanelHeader title="Top Source Feeds" right={<ViewAllLink />} />
                <div className="px-4 pb-3.5">
                  <HBarList items={SOURCE_FEEDS.slice(0, 5)} max={maxSourceFeed} />
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
                <PanelHeader title="Top Targeted Sectors" right={<ViewAllLink />} />
                <div className="px-4 pb-3.5">
                  <HBarList items={TARGETED_SECTORS.map((s) => ({ label: s.label, count: s.pct }))} max={maxSector} unit="%" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border-default px-4 py-3">
                <h3 className="text-[13px] font-bold text-text-primary">
                  IOC Feed <span className="font-normal text-text-secondary">({filtered.length.toLocaleString()})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
                    <input
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      placeholder="Search IOCs, threat names, or description..."
                      className="h-8 w-[260px] rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    />
                  </div>
                  <ColumnsMenu columns={columns} toggleColumn={(c) => toggleSet(setColumns, c)} />
                  <button
                    type="button"
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
                  >
                    <Download className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
                    Export
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-auto">
                {pageRows.length ? (
                  <IocTable
                    rows={pageRows}
                    columns={columns}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    watchlist={watchlist}
                    toggleWatch={toggleWatch}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 py-12 text-center">
                    <Search className="h-6 w-6 text-text-secondary" aria-hidden="true" />
                    <p className="text-[12.5px] font-semibold text-text-primary">No IOCs match your filters</p>
                    <button type="button" onClick={resetFilters} className="text-[12px] font-medium text-brand-primary hover:underline">
                      Reset filters
                    </button>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2.5">
                <span className="text-[11.5px] text-text-secondary">
                  Showing {pageRows.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{(page - 1) * PAGE_SIZE + pageRows.length} of {filtered.length.toLocaleString()}
                </span>
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
                  <select
                    value={PAGE_SIZE}
                    disabled
                    className="ml-1.5 h-7 rounded-md border border-border-default bg-surface-1 px-1.5 text-[11.5px] text-text-secondary"
                  >
                    <option>Show 10 rows</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedIoc ? (
        <DetailPanel ioc={selectedIoc} onClose={() => setSelectedId(null)} watchlist={watchlist} toggleWatch={toggleWatch} />
      ) : (
        <div className="flex h-full w-[340px] shrink-0 flex-col items-center justify-center gap-2 border-l border-border-default bg-surface-1 px-6 text-center">
          <Info className="h-6 w-6 text-text-secondary" aria-hidden="true" />
          <p className="text-[12.5px] font-medium text-text-secondary">Select an IOC to view details</p>
        </div>
      )}
    </div>
  );
}
