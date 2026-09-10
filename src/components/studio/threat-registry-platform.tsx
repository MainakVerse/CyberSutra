"use client";

import * as React from "react";
import {
  Bug,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Skull,
  Target,
  Wrench,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type EntityType = "Threat Actor" | "Malware" | "Campaign" | "Tool" | "Vulnerability";
type Risk = "Critical" | "High" | "Medium" | "Low";
type Region = "India" | "South Asia" | "APAC" | "Global";

type Entity = {
  id: string;
  name: string;
  type: EntityType;
  aliases: string;
  targetSectors: string;
  region: Region;
  risk: Risk;
  lastActivity: string;
  tags: string[];
  aliasesList: string[];
  attributedTo: string;
  regionOfOrigin: string;
  activeSince: string;
  primaryMotivation: string;
  description: string;
  recentActivity: Array<{ date: string; event: string }>;
  ttpsCount: number;
  campaignsCount: number;
  relatedCount: number;
};

/* -------------------------------- dummy data -------------------------------- */

const ENTITY_TYPE_COUNTS: Array<{ type: EntityType; count: number }> = [
  { type: "Threat Actor", count: 1248 },
  { type: "Malware", count: 3421 },
  { type: "Campaign", count: 864 },
  { type: "Tool", count: 612 },
  { type: "Vulnerability", count: 421 },
];

const REGION_COUNTS: Array<{ name: Region; count: number }> = [
  { name: "India", count: 684 },
  { name: "South Asia", count: 1021 },
  { name: "APAC", count: 1432 },
  { name: "Global", count: 3118 },
];

const SECTOR_COUNTS: Array<{ name: string; count: number }> = [
  { name: "Government", count: 842 },
  { name: "BFSI", count: 1021 },
  { name: "Energy & Utilities", count: 612 },
  { name: "IT/ITES", count: 932 },
  { name: "Healthcare", count: 518 },
];

const CATEGORY_COUNTS: Array<{ name: string; count: number }> = [
  { name: "Ransomware", count: 612 },
  { name: "Phishing", count: 1084 },
  { name: "Data Theft", count: 732 },
  { name: "Espionage", count: 512 },
  { name: "DDoS", count: 421 },
];

const RISK_COUNTS: Array<{ name: Risk; count: number; dot: string }> = [
  { name: "Critical", count: 412, dot: "bg-error" },
  { name: "High", count: 1024, dot: "bg-warning" },
  { name: "Medium", count: 1842, dot: "bg-info" },
  { name: "Low", count: 632, dot: "bg-success" },
];

const RISK_STYLE: Record<Risk, string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-warning/10 text-warning",
  Medium: "bg-info/10 text-info",
  Low: "bg-success/10 text-success",
};

const ENTITY_TYPE_PLURAL: Record<EntityType, string> = {
  "Threat Actor": "Threat Actors",
  Malware: "Malware",
  Campaign: "Campaigns",
  Tool: "Tools",
  Vulnerability: "Vulnerabilities",
};

const RISK_DOT: Record<Risk, string> = {
  Critical: "bg-error",
  High: "bg-warning",
  Medium: "bg-info",
  Low: "bg-success",
};

const TYPE_ICON: Record<EntityType, { icon: React.ElementType; className: string }> = {
  "Threat Actor": { icon: Skull, className: "bg-error/10 text-error" },
  Malware: { icon: Bug, className: "bg-warning/10 text-warning" },
  Campaign: { icon: Target, className: "bg-brand-primary/10 text-brand-primary" },
  Tool: { icon: Wrench, className: "bg-info/10 text-info" },
  Vulnerability: { icon: ShieldAlert, className: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
};

function buildEntities(): Entity[] {
  const rows: Array<
    [string, EntityType, string, string, Region, Risk, string, string[], string, string]
  > = [
    ["APT28", "Threat Actor", "Fancy Bear", "Government, Defence", "Global", "Critical", "5 Sep 2026", ["Espionage", "Russia"], "Russian Federation", "Russia"],
    ["APT36", "Threat Actor", "Transparent Tribe", "Government, IT/ITES", "South Asia", "High", "2 Sep 2026", ["Phishing", "India"], "Pakistan", "Pakistan"],
    ["SideCopy", "Malware", "—", "Government", "APAC", "High", "1 Sep 2026", ["Data Theft", "Stealer"], "Unknown", "Unknown"],
    ["Operation Crimson Peacock", "Campaign", "—", "Multiple", "India", "High", "29 Aug 2026", ["Phishing", "C2"], "Unknown", "India"],
    ["Kimsuky", "Threat Actor", "Velvet Chollima", "Government, Think Tanks", "APAC", "High", "28 Aug 2026", ["Espionage", "North Korea"], "North Korea", "North Korea"],
    ["Lazarus Group", "Threat Actor", "Hidden Cobra", "BFSI, Crypto", "Global", "Critical", "25 Aug 2026", ["Financial", "Malware"], "North Korea", "North Korea"],
    ["RansomHub", "Malware", "—", "Multiple", "Global", "High", "22 Aug 2026", ["Ransomware", "RaaS"], "Unknown", "Unknown"],
    ["Scattered Spider", "Threat Actor", "UNC3944", "BFSI, Retail", "Global", "High", "20 Aug 2026", ["Social Engineering", "Ext..."], "Unknown", "Western"],
    ["BharatRansom", "Malware", "—", "Manufacturing, BFSI", "India", "Medium", "18 Aug 2026", ["Ransomware", "India"], "Unknown", "India"],
    ["Operation Sindoor", "Campaign", "—", "IT/ITES", "India", "Medium", "14 Aug 2026", ["Malware", "Credential Theft"], "Unknown", "India"],
    ["Gamut", "Tool", "—", "Multiple", "Global", "Medium", "12 Aug 2026", ["Post-Exploitation", "C2"], "Unknown", "Unknown"],
    ["Andariel", "Threat Actor", "Stonefly", "Defence, Nuclear", "APAC", "High", "10 Aug 2026", ["Espionage", "North Korea"], "North Korea", "North Korea"],
    ["FakeUpdates", "Malware", "—", "Multiple", "Global", "Medium", "8 Aug 2026", ["Downloader", "Initial Access"], "Unknown", "Unknown"],
    ["Cloud Sorcerer", "Campaign", "—", "Cloud, SaaS", "Global", "Medium", "5 Aug 2026", ["Cloud", "Data Exfiltration"], "Unknown", "Russia"],
  ];

  return rows.map(([name, type, aliases, targetSectors, region, risk, lastActivity, tags, attributedTo, regionOfOrigin], i) => ({
    id: `ent-${i}`,
    name,
    type,
    aliases,
    targetSectors,
    region,
    risk,
    lastActivity,
    tags,
    aliasesList: aliases === "—" ? [] : aliases.split(",").map((a) => a.trim()),
    attributedTo,
    regionOfOrigin,
    activeSince: String(2007 + (i % 12)),
    primaryMotivation: tags[0] ?? "Unknown",
    description: `${name} is a ${region === "India" ? "regionally active" : "globally tracked"} ${type.toLowerCase()} known for long-running operations targeting ${targetSectors.toLowerCase()} organizations worldwide. Employs spear-phishing, credential theft, and custom tooling to maintain persistent access.`,
    recentActivity: [
      { date: lastActivity, event: `Spear-phishing campaign targeting ${targetSectors.split(",")[0]} sector` },
      { date: "22 Aug 2026", event: "New malware variant observed (Headlace v4)" },
      { date: "14 Jul 2026", event: "Activity against European government entities" },
      { date: "3 Jun 2026", event: "Credential harvesting via webmail" },
    ],
    ttpsCount: 8 + (i % 6),
    campaignsCount: 12 + (i % 9),
    relatedCount: 248 - i * 6,
  }));
}

const ENTITIES = buildEntities();

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

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
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

/* -------------------------------- filters sidebar -------------------------------- */

function FiltersSidebar({
  search,
  setSearch,
  typeFilters,
  toggleType,
  regionFilters,
  toggleRegion,
  showAllSectors,
  setShowAllSectors,
  sectorFilters,
  toggleSector,
  showAllCategories,
  setShowAllCategories,
  categoryFilters,
  toggleCategory,
  riskFilters,
  toggleRisk,
  onReset,
}: {
  search: string;
  setSearch: (v: string) => void;
  typeFilters: Set<EntityType>;
  toggleType: (t: EntityType) => void;
  regionFilters: Set<Region>;
  toggleRegion: (r: Region) => void;
  showAllSectors: boolean;
  setShowAllSectors: (v: boolean) => void;
  sectorFilters: Set<string>;
  toggleSector: (s: string) => void;
  showAllCategories: boolean;
  setShowAllCategories: (v: boolean) => void;
  categoryFilters: Set<string>;
  toggleCategory: (c: string) => void;
  riskFilters: Set<Risk>;
  toggleRisk: (r: Risk) => void;
  onReset: () => void;
}) {
  const visibleSectors = showAllSectors ? SECTOR_COUNTS : SECTOR_COUNTS.slice(0, 5);
  const visibleCategories = showAllCategories ? CATEGORY_COUNTS : CATEGORY_COUNTS.slice(0, 5);

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
              placeholder="Search threats, actors, tags..."
              className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
        </div>

        <FilterSection title="Entity Type">
          <div className="flex flex-col gap-2">
            {ENTITY_TYPE_COUNTS.map((t) => (
              <label key={t.type} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={typeFilters.has(t.type)} onChange={() => toggleType(t.type)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{t.type}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({t.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Region">
          <div className="flex flex-col gap-2">
            {REGION_COUNTS.map((r) => (
              <label key={r.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={regionFilters.has(r.name)} onChange={() => toggleRegion(r.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{r.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({r.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Target Sector">
          <div className="flex flex-col gap-2">
            {visibleSectors.map((s) => (
              <label key={s.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={sectorFilters.has(s.name)} onChange={() => toggleSector(s.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{s.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({s.count.toLocaleString()})</span>
              </label>
            ))}
            <button
              type="button"
              onClick={() => setShowAllSectors(!showAllSectors)}
              className="pt-0.5 text-left text-[11.5px] font-medium text-brand-primary hover:underline"
            >
              {showAllSectors ? "Show less" : "Show more"}
            </button>
          </div>
        </FilterSection>

        <FilterSection title="Threat Category">
          <div className="flex flex-col gap-2">
            {visibleCategories.map((c) => (
              <label key={c.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={categoryFilters.has(c.name)} onChange={() => toggleCategory(c.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{c.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({c.count.toLocaleString()})</span>
              </label>
            ))}
            <button
              type="button"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="pt-0.5 text-left text-[11.5px] font-medium text-brand-primary hover:underline"
            >
              {showAllCategories ? "Show less" : "Show more"}
            </button>
          </div>
        </FilterSection>

        <FilterSection title="Risk Level">
          <div className="flex flex-col gap-2">
            {RISK_COUNTS.map((r) => (
              <label key={r.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={riskFilters.has(r.name)} onChange={() => toggleRisk(r.name)} />
                <span className={cn("h-2 w-2 shrink-0 rounded-full", r.dot)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{r.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({r.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

/* -------------------------------- header -------------------------------- */

function RangeDropdown() {
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
        className="flex h-9 flex-col items-start justify-center rounded-lg border border-border-default bg-surface-1 px-3 text-left hover:bg-surface-2"
      >
        <span className="text-[10px] text-text-secondary">Last updated</span>
        <span className="text-[11.5px] font-semibold text-text-primary">8 Sep 2026, 14:37 IST</span>
      </button>
    </div>
  );
}

export function ThreatRegistryHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Download className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Export
      </button>
      <RangeDropdown />
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Add to Watchlist
      </button>
    </div>
  );
}

/* -------------------------------- entity table -------------------------------- */

const PAGE_SIZE = 14;

function EntityTable({
  rows,
  selectedId,
  onSelect,
  checked,
  toggleChecked,
}: {
  rows: Entity[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  checked: Set<string>;
  toggleChecked: (id: string) => void;
}) {
  return (
    <table className="w-full table-fixed border-collapse text-left">
      <colgroup>
        <col className="w-8" />
        <col className="w-[15%]" />
        <col className="w-[10%]" />
        <col className="w-[11%]" />
        <col className="w-[15%]" />
        <col className="w-[9%]" />
        <col className="w-[9%]" />
        <col className="w-[11%]" />
        <col className="w-[20%]" />
      </colgroup>
      <thead className="sticky top-0 z-10 bg-surface-1">
        <tr className="border-b border-border-default text-[10.5px] uppercase tracking-wide text-text-secondary">
          <th className="py-2 pl-4"></th>
          <th className="truncate py-2 pr-3 font-medium">Name</th>
          <th className="truncate py-2 pr-3 font-medium">Type</th>
          <th className="truncate py-2 pr-3 font-medium">Aliases</th>
          <th className="truncate py-2 pr-3 font-medium">Target Sectors</th>
          <th className="truncate py-2 pr-3 font-medium">Region</th>
          <th className="truncate py-2 pr-3 font-medium">Risk</th>
          <th className="truncate py-2 pr-3 font-medium">Last Activity</th>
          <th className="truncate py-2 pr-4 font-medium">Tags</th>
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
              <td className="py-2 pr-3 font-medium text-text-primary">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", className)}>
                    <Icon className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="truncate">{r.name}</span>
                </span>
              </td>
              <td className="truncate py-2 pr-3 text-text-secondary">{r.type}</td>
              <td className="truncate py-2 pr-3 text-text-secondary">{r.aliases}</td>
              <td className="truncate py-2 pr-3 text-text-secondary">{r.targetSectors}</td>
              <td className="truncate py-2 pr-3 text-text-secondary">{r.region}</td>
              <td className="truncate py-2 pr-3">
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", RISK_STYLE[r.risk])}>
                  {r.risk}
                </span>
              </td>
              <td className="truncate py-2 pr-3 tabular-nums text-text-secondary">{r.lastActivity}</td>
              <td className="overflow-hidden py-2 pr-4">
                <div className="flex flex-wrap gap-1 overflow-hidden">
                  {r.tags.map((t) => (
                    <span key={t} className="whitespace-nowrap rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-text-secondary">
                      {t}
                    </span>
                  ))}
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

const TAG_ICON: Record<string, React.ElementType> = {
  Espionage: Target,
  Russia: Flame,
  India: Flame,
  "North Korea": Flame,
};

function DetailPanel({ entity, onClose }: { entity: Entity; onClose: () => void }) {
  const [tab, setTab] = React.useState(0);
  const { icon: Icon, className } = TYPE_ICON[entity.type];

  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border-default px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", className)}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[13px] font-bold text-text-primary">{entity.name}</span>
              <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", RISK_STYLE[entity.risk])}>{entity.risk}</span>
            </div>
            <p className="truncate text-[11px] text-text-secondary">
              {entity.type} {entity.aliasesList[0] ? `· ${entity.aliasesList[0]}` : ""}
            </p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="shrink-0 rounded-md p-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-2">
        <DetailTab label="Overview" active={tab === 0} onClick={() => setTab(0)} />
        <DetailTab label="TTPs" active={tab === 1} onClick={() => setTab(1)} />
        <DetailTab label="Campaigns" active={tab === 2} onClick={() => setTab(2)} badge={`(${entity.campaignsCount})`} />
        <DetailTab label="Related" active={tab === 3} onClick={() => setTab(3)} badge={`(${entity.relatedCount})`} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        {tab === 0 ? (
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1.5 text-[11.5px] font-bold text-text-primary">Key Information</p>
              <dl className="flex flex-col divide-y divide-border-default text-[12px]">
                {[
                  ["Aliases", entity.aliasesList.join(", ") || "—"],
                  ["Attributed To", entity.attributedTo],
                  ["Region of Origin", entity.regionOfOrigin],
                  ["Active Since", entity.activeSince],
                  ["Primary Motivation", entity.primaryMotivation],
                  ["Target Sectors", entity.targetSectors],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-2 py-2">
                    <dt className="text-text-secondary">{k}</dt>
                    <dd className="max-w-[170px] truncate text-right font-medium text-text-primary">{v}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Risk Level</dt>
                  <dd>
                    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", RISK_STYLE[entity.risk])}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", RISK_DOT[entity.risk])} />
                      {entity.risk}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="mb-1.5 text-[11.5px] font-bold text-text-primary">Description</p>
              <p className="text-[12px] leading-relaxed text-text-secondary">{entity.description}</p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[11.5px] font-bold text-text-primary">Recent Activity</p>
                <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
                  View all
                </button>
              </div>
              <div className="flex flex-col divide-y divide-border-default">
                {entity.recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 py-2 text-[11.5px]">
                    <span className="text-text-secondary">{a.event}</span>
                    <span className="shrink-0 tabular-nums text-text-secondary">{a.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[11px] text-text-secondary">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {entity.tags.map((t) => {
                  const TIcon = TAG_ICON[t];
                  return (
                    <span key={t} className="flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                      {TIcon ? <TIcon className="h-2.5 w-2.5" aria-hidden="true" /> : null}
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {tab === 1 ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: entity.ttpsCount }, (_, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
                <span className="truncate font-medium text-brand-primary">
                  T1{566 + i} · {["Phishing", "Command and Scripting", "Credential Dumping", "Exfiltration", "Persistence", "Lateral Movement"][i % 6]}
                </span>
                <span className="shrink-0 text-text-secondary">MITRE ATT&CK</span>
              </div>
            ))}
          </div>
        ) : null}

        {tab === 2 ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: entity.campaignsCount }, (_, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
                <span className="truncate font-medium text-text-primary">Operation {["Crimson", "Silent", "Shadow", "Iron", "Velvet"][i % 5]} {i + 1}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
              </div>
            ))}
          </div>
        ) : null}

        {tab === 3 ? (
          <div className="flex flex-col gap-2">
            {ENTITIES.filter((e) => e.id !== entity.id && e.type === entity.type)
              .slice(0, 8)
              .map((e) => {
                const { icon: RIcon, className: rClassName } = TYPE_ICON[e.type];
                return (
                  <div key={e.id} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", rClassName)}>
                        <RIcon className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span className="truncate font-medium text-text-primary">{e.name}</span>
                    </span>
                    <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", RISK_STYLE[e.risk])}>{e.risk}</span>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-border-default px-4 py-3">
        <button
          type="button"
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[12px] font-medium text-text-primary hover:bg-surface-2"
        >
          Add to Watchlist
        </button>
        <button
          type="button"
          className="flex h-8 items-center gap-1 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
        >
          Actions
          <ChevronDown className="h-3 w-3 text-text-secondary" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

type TopFilter = "All" | EntityType;

export function ThreatRegistryPlatform() {
  const [search, setSearch] = React.useState("");
  const [typeFilters, setTypeFilters] = React.useState<Set<EntityType>>(new Set());
  const [regionFilters, setRegionFilters] = React.useState<Set<Region>>(new Set());
  const [showAllSectors, setShowAllSectors] = React.useState(false);
  const [sectorFilters, setSectorFilters] = React.useState<Set<string>>(new Set());
  const [showAllCategories, setShowAllCategories] = React.useState(false);
  const [categoryFilters, setCategoryFilters] = React.useState<Set<string>>(new Set());
  const [riskFilters, setRiskFilters] = React.useState<Set<Risk>>(new Set());
  const [topFilter, setTopFilter] = React.useState<TopFilter>("All");
  const [sortBy, setSortBy] = React.useState<"Relevance" | "Name" | "Risk" | "Last Activity">("Relevance");
  const [selectedId, setSelectedId] = React.useState<string | null>(ENTITIES[0].id);
  const [checked, setChecked] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);

  const toggleSet = <T,>(setFn: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) => {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setTypeFilters(new Set());
    setRegionFilters(new Set());
    setSectorFilters(new Set());
    setCategoryFilters(new Set());
    setRiskFilters(new Set());
    setTopFilter("All");
  };

  const q = search.trim().toLowerCase();

  const filtered = React.useMemo(() => {
    return ENTITIES.filter((e) => {
      if (topFilter !== "All" && e.type !== topFilter) return false;
      if (typeFilters.size && !typeFilters.has(e.type)) return false;
      if (regionFilters.size && !regionFilters.has(e.region)) return false;
      if (sectorFilters.size && ![...sectorFilters].some((s) => e.targetSectors.includes(s))) return false;
      if (categoryFilters.size && ![...categoryFilters].some((c) => e.tags.includes(c))) return false;
      if (riskFilters.size && !riskFilters.has(e.risk)) return false;
      if (
        q &&
        !(
          e.name.toLowerCase().includes(q) ||
          e.aliases.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.targetSectors.toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
  }, [q, topFilter, typeFilters, regionFilters, sectorFilters, categoryFilters, riskFilters]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    const riskOrder: Record<Risk, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    if (sortBy === "Name") arr.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "Risk") arr.sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);
    else if (sortBy === "Last Activity") arr.sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1));
    return arr;
  }, [filtered, sortBy]);

  React.useEffect(() => {
    setPage(1);
  }, [q, topFilter, typeFilters, regionFilters, sectorFilters, categoryFilters, riskFilters]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageRows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedEntity = ENTITIES.find((e) => e.id === selectedId) ?? null;

  const topCounts: Array<{ key: TopFilter; label: string; count: number }> = [
    { key: "All", label: "All", count: ENTITIES.length },
    ...ENTITY_TYPE_COUNTS.map((t) => ({ key: t.type as TopFilter, label: ENTITY_TYPE_PLURAL[t.type], count: t.count })),
  ];

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <FiltersSidebar
        search={search}
        setSearch={setSearch}
        typeFilters={typeFilters}
        toggleType={(t) => toggleSet(setTypeFilters, t)}
        regionFilters={regionFilters}
        toggleRegion={(r) => toggleSet(setRegionFilters, r)}
        showAllSectors={showAllSectors}
        setShowAllSectors={setShowAllSectors}
        sectorFilters={sectorFilters}
        toggleSector={(s) => toggleSet(setSectorFilters, s)}
        showAllCategories={showAllCategories}
        setShowAllCategories={setShowAllCategories}
        categoryFilters={categoryFilters}
        toggleCategory={(c) => toggleSet(setCategoryFilters, c)}
        riskFilters={riskFilters}
        toggleRisk={(r) => toggleSet(setRiskFilters, r)}
        onReset={resetFilters}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border-default px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {topCounts.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTopFilter(t.key)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-150",
                  topFilter === t.key ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2"
                )}
              >
                {t.label}
                <span className="tabular-nums text-[11px] opacity-80">({t.count.toLocaleString()})</span>
              </button>
            ))}
          </div>

          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {pageRows.length ? (
            <EntityTable
              rows={pageRows}
              selectedId={selectedId}
              onSelect={setSelectedId}
              checked={checked}
              toggleChecked={(id) => toggleSet(setChecked, id)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-1 py-12 text-center">
              <Search className="h-6 w-6 text-text-secondary" aria-hidden="true" />
              <p className="text-[12.5px] font-semibold text-text-primary">No entities match your filters</p>
              <button type="button" onClick={resetFilters} className="text-[12px] font-medium text-brand-primary hover:underline">
                Reset filters
              </button>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2.5">
          <span className="text-[11.5px] text-text-secondary">
            Showing {pageRows.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{(page - 1) * PAGE_SIZE + pageRows.length} of {sorted.length.toLocaleString()}
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
          </div>
        </div>
      </div>

      {selectedEntity ? (
        <DetailPanel entity={selectedEntity} onClose={() => setSelectedId(null)} />
      ) : (
        <div className="flex h-full w-[320px] shrink-0 flex-col items-center justify-center gap-2 border-l border-border-default bg-surface-1 px-6 text-center">
          <Skull className="h-6 w-6 text-text-secondary" aria-hidden="true" />
          <p className="text-[12.5px] font-medium text-text-secondary">Select an entity to view details</p>
        </div>
      )}
    </div>
  );
}

function SortDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: "Relevance" | "Name" | "Risk" | "Last Activity";
  setSortBy: (s: "Relevance" | "Name" | "Risk" | "Last Activity") => void;
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
        {sortBy}
        <ChevronDown className={cn("h-3.5 w-3.5 text-text-secondary transition-transform duration-150", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-20 mt-1.5 w-[150px] rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg">
          {(["Relevance", "Name", "Risk", "Last Activity"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSortBy(s);
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium",
                s === sortBy ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------- title header (in-content) -------------------------------- */

export function ThreatRegistryTitle() {
  return (
    <div className="min-w-0">
      <h1 className="truncate text-[18px] font-bold text-text-primary">Threat Registry</h1>
      <p className="truncate text-[11.5px] text-text-secondary">Comprehensive catalogue of threat actors, malware, tools and campaigns.</p>
    </div>
  );
}
