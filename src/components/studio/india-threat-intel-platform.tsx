"use client";

import * as React from "react";
import {
  AlertTriangle,
  Bug,
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Fingerprint,
  Flame,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  Target,
  TrendingUp,
} from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { cn } from "@/lib/utils";

const INDIA_GEO_URL = "/geo/india-states.json";

/* --------------------------------- types --------------------------------- */

type Severity = "Critical" | "High" | "Medium" | "Low";

type StateVolume = { name: string; volume: number };

type Region = "North" | "South" | "East" | "West" | "Central" | "North East" | "Islands";

type Campaign = {
  id: string;
  name: string;
  tag: string;
  tagIcon: React.ElementType;
  severity: Severity;
  date: string;
  desc: string;
  sector: string;
  threatType: string;
  region: Region;
};

type Advisory = {
  id: string;
  title: string;
  source: "CERT-In" | "Govt Sources" | "Community";
  severity: Severity;
  date: string;
  sector: string;
  threatType: string;
  region: Region;
};

type ThreatRow = {
  time: string;
  indicator: string;
  type: string;
  threatType: string;
  sector: string;
  location: string;
  region: Region;
  severity: Severity;
};

type IocRow = {
  ioc: string;
  type: string;
  confidence: number;
  reports: number;
  threatType: string;
  sector: string;
  region: Region;
  severity: Severity;
};

/* -------------------------------- dummy data -------------------------------- */

const REGIONS: Array<{ name: string; count: number }> = [
  { name: "All India", count: 1248 },
  { name: "North", count: 312 },
  { name: "South", count: 268 },
  { name: "East", count: 184 },
  { name: "West", count: 226 },
  { name: "Central", count: 142 },
  { name: "North East", count: 68 },
  { name: "Islands", count: 48 },
];

const SECTORS: Array<{ name: string; count: number }> = [
  { name: "Government", count: 342 },
  { name: "BFSI", count: 286 },
  { name: "Energy & Utilities", count: 164 },
  { name: "Healthcare", count: 154 },
  { name: "Manufacturing", count: 196 },
  { name: "Telecom", count: 122 },
  { name: "IT/ITES", count: 248 },
  { name: "Education", count: 96 },
  { name: "Defence & PSUs", count: 88 },
  { name: "Others", count: 132 },
];

const THREAT_TYPES: Array<{ name: string; count: number }> = [
  { name: "Ransomware", count: 312 },
  { name: "Phishing", count: 428 },
  { name: "Malware", count: 276 },
  { name: "APT", count: 112 },
  { name: "Data Leak", count: 84 },
  { name: "DDoS", count: 96 },
  { name: "Web Attacks", count: 164 },
  { name: "Insider Threat", count: 42 },
];

const SEVERITIES: Array<{ name: Severity; count: number; dot: string }> = [
  { name: "Critical", count: 142, dot: "bg-error" },
  { name: "High", count: 318, dot: "bg-warning" },
  { name: "Medium", count: 536, dot: "bg-info" },
  { name: "Low", count: 252, dot: "bg-success" },
];

// keys match the `NAME_1` property in /public/geo/india-states.json exactly
const STATE_VOLUMES: StateVolume[] = [
  { name: "Jammu and Kashmir", volume: 40 },
  { name: "Himachal Pradesh", volume: 20 },
  { name: "Punjab", volume: 55 },
  { name: "Uttaranchal", volume: 35 },
  { name: "Haryana", volume: 70 },
  { name: "Delhi", volume: 210 },
  { name: "Chandigarh", volume: 15 },
  { name: "Rajasthan", volume: 90 },
  { name: "Uttar Pradesh", volume: 150 },
  { name: "Bihar", volume: 65 },
  { name: "Sikkim", volume: 10 },
  { name: "Gujarat", volume: 120 },
  { name: "Madhya Pradesh", volume: 75 },
  { name: "Jharkhand", volume: 45 },
  { name: "West Bengal", volume: 130 },
  { name: "Assam", volume: 38 },
  { name: "Meghalaya", volume: 12 },
  { name: "Nagaland", volume: 8 },
  { name: "Manipur", volume: 9 },
  { name: "Mizoram", volume: 6 },
  { name: "Tripura", volume: 11 },
  { name: "Chhattisgarh", volume: 55 },
  { name: "Orissa", volume: 68 },
  { name: "Maharashtra", volume: 240 },
  { name: "Telangana", volume: 95 },
  { name: "Andhra Pradesh", volume: 88 },
  { name: "Karnataka", volume: 175 },
  { name: "Goa", volume: 14 },
  { name: "Kerala", volume: 62 },
  { name: "Tamil Nadu", volume: 118 },
  { name: "Puducherry", volume: 7 },
  { name: "Dadra and Nagar Haveli", volume: 5 },
  { name: "Daman and Diu", volume: 4 },
  { name: "Andaman and Nicobar", volume: 4 },
];

const STATE_DISPLAY_NAME: Record<string, string> = {
  Uttaranchal: "Uttarakhand",
  Orissa: "Odisha",
  "Jammu and Kashmir": "Jammu & Kashmir",
  "Andaman and Nicobar": "Andaman & Nicobar",
};

function displayStateName(name: string) {
  return STATE_DISPLAY_NAME[name] ?? name;
}

const STATE_REGION: Record<string, Region> = {
  "Jammu and Kashmir": "North",
  "Himachal Pradesh": "North",
  Punjab: "North",
  Uttaranchal: "North",
  Haryana: "North",
  Delhi: "North",
  Chandigarh: "North",
  Rajasthan: "North",
  "Uttar Pradesh": "North",
  Bihar: "East",
  Sikkim: "North East",
  Gujarat: "West",
  "Madhya Pradesh": "Central",
  Jharkhand: "East",
  "West Bengal": "East",
  Assam: "North East",
  Meghalaya: "North East",
  Nagaland: "North East",
  Manipur: "North East",
  Mizoram: "North East",
  Tripura: "North East",
  Chhattisgarh: "Central",
  Orissa: "East",
  Maharashtra: "West",
  Telangana: "South",
  "Andhra Pradesh": "South",
  Karnataka: "South",
  Goa: "West",
  Kerala: "South",
  "Tamil Nadu": "South",
  Puducherry: "South",
  "Dadra and Nagar Haveli": "West",
  "Daman and Diu": "West",
  "Andaman and Nicobar": "Islands",
};

const CITY_REGION: Record<string, Region> = {
  Delhi: "North",
  Mumbai: "West",
  Pune: "West",
  Bengaluru: "South",
  Chennai: "South",
};

function severityForVolume(v: number): Severity {
  if (v > 200) return "Critical";
  if (v > 100) return "High";
  if (v > 50) return "Medium";
  return "Low";
}

const SEVERITY_HEX: Record<Severity, string> = {
  Critical: "#e11d48",
  High: "#f79009",
  Medium: "#f2c94c",
  Low: "#fce8c9",
};

const SEVERITY_STYLE: Record<Severity, string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-warning/10 text-warning",
  Medium: "bg-info/10 text-info",
  Low: "bg-success/10 text-success",
};

const CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "Operation Crimson Peacock",
    tag: "APT · Espionage",
    tagIcon: Target,
    severity: "Critical",
    date: "12 Sep 2026",
    desc: "Targeting government and defence organizations across North India",
    sector: "Government",
    threatType: "APT",
    region: "North",
  },
  {
    id: "c2",
    name: "BharatRansom",
    tag: "Ransomware · Financial",
    tagIcon: Flame,
    severity: "High",
    date: "10 Sep 2026",
    desc: "Active ransomware campaign targeting Indian manufacturing and BFSI sector",
    sector: "Manufacturing",
    threatType: "Ransomware",
    region: "West",
  },
  {
    id: "c3",
    name: "Monsoon Phish",
    tag: "Phishing · Credential Theft",
    tagIcon: Fingerprint,
    severity: "High",
    date: "8 Sep 2026",
    desc: "Widespread phishing campaign targeting IT/ITES and education sector",
    sector: "IT/ITES",
    threatType: "Phishing",
    region: "South",
  },
  {
    id: "c4",
    name: "DarkRail",
    tag: "Malware · Data Exfiltration",
    tagIcon: Bug,
    severity: "Medium",
    date: "6 Sep 2026",
    desc: "Targeting Indian railway and logistics organizations",
    sector: "Others",
    threatType: "Malware",
    region: "East",
  },
  {
    id: "c5",
    name: "Kaveri DDoS",
    tag: "DDoS · Disruption",
    tagIcon: ShieldAlert,
    severity: "Medium",
    date: "4 Sep 2026",
    desc: "DDoS attacks targeting Indian government infrastructure",
    sector: "Government",
    threatType: "DDoS",
    region: "South",
  },
];

const ADVISORIES: Advisory[] = [
  { id: "a1", title: "CERT-In Advisory CIAD-2026-0451", source: "CERT-In", severity: "Critical", date: "8 Sep 2026", sector: "Government", threatType: "APT", region: "North" },
  { id: "a2", title: "High-risk phishing campaign targeting Indian organizations", source: "CERT-In", severity: "High", date: "7 Sep 2026", sector: "BFSI", threatType: "Phishing", region: "West" },
  { id: "a3", title: "Ransomware group targeting Indian manufacturing sector", source: "Govt Sources", severity: "High", date: "6 Sep 2026", sector: "Manufacturing", threatType: "Ransomware", region: "West" },
  { id: "a4", title: "Vulnerabilities in network devices exploited in the wild", source: "CERT-In", severity: "Medium", date: "6 Sep 2026", sector: "IT/ITES", threatType: "Web Attacks", region: "South" },
  { id: "a5", title: "Advisory on UPSC-themed phishing emails", source: "Community", severity: "Medium", date: "5 Sep 2026", sector: "Education", threatType: "Phishing", region: "South" },
];

const RECENT_THREATS: ThreatRow[] = [
  { time: "8 Sep 2026, 14:27", indicator: "185.199.110.23", type: "C2 IP", threatType: "APT", sector: "Government", location: "Delhi", region: "North", severity: "Critical" },
  { time: "8 Sep 2026, 11:03", indicator: "bharat-update[.]com", type: "Phishing", threatType: "Phishing", sector: "BFSI", location: "Mumbai", region: "West", severity: "High" },
  { time: "7 Sep 2026, 20:14", indicator: "a3f5e2d9c7be1a4d...", type: "Malware Hash", threatType: "Malware", sector: "Manufacturing", location: "Pune", region: "West", severity: "High" },
  { time: "7 Sep 2026, 16:45", indicator: "45.33.12.11", type: "Scanning", threatType: "Web Attacks", sector: "IT/ITES", location: "Bengaluru", region: "South", severity: "Medium" },
  { time: "6 Sep 2026, 09:12", indicator: "monsoon-sec[.]in", type: "Phishing", threatType: "Phishing", sector: "Education", location: "Chennai", region: "South", severity: "Medium" },
];

const TOP_IOCS: IocRow[] = [
  { ioc: "185.199.110.23", type: "IP Address", confidence: 95, reports: 248, threatType: "APT", sector: "Government", region: "North", severity: "Critical" },
  { ioc: "bharat-update[.]com", type: "Domain", confidence: 92, reports: 192, threatType: "Phishing", sector: "BFSI", region: "West", severity: "High" },
  { ioc: "a3f5e2d9c7be1a4d...", type: "Hash", confidence: 84, reports: 176, threatType: "Malware", sector: "Manufacturing", region: "West", severity: "High" },
  { ioc: "45.33.12.11", type: "IP Address", confidence: 84, reports: 164, threatType: "Web Attacks", sector: "IT/ITES", region: "South", severity: "Medium" },
  { ioc: "monsoon-sec[.]in", type: "Domain", confidence: 81, reports: 142, threatType: "Phishing", sector: "Education", region: "South", severity: "Medium" },
];

const SECTOR_RISK: Array<{ name: string; score: number }> = [
  { name: "Government", score: 78 },
  { name: "BFSI", score: 64 },
  { name: "IT/ITES", score: 58 },
  { name: "Manufacturing", score: 52 },
  { name: "Healthcare", score: 48 },
  { name: "Telecom", score: 42 },
  { name: "Education", score: 36 },
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
  regionFilters,
  toggleRegion,
  sectorFilters,
  toggleSector,
  threatTypeFilters,
  toggleThreatType,
  severityFilters,
  toggleSeverity,
  onReset,
}: {
  search: string;
  setSearch: (v: string) => void;
  regionFilters: Set<string>;
  toggleRegion: (r: string) => void;
  sectorFilters: Set<string>;
  toggleSector: (s: string) => void;
  threatTypeFilters: Set<string>;
  toggleThreatType: (t: string) => void;
  severityFilters: Set<Severity>;
  toggleSeverity: (s: Severity) => void;
  onReset: () => void;
}) {
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
              placeholder="Search states, sectors, IOCs..."
              className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
        </div>

        <FilterSection title="Region">
          <div className="flex flex-col gap-2">
            {REGIONS.map((r) => (
              <label key={r.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={regionFilters.has(r.name)} onChange={() => toggleRegion(r.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{r.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({r.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Sector">
          <div className="flex flex-col gap-2">
            {SECTORS.map((s) => (
              <label key={s.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={sectorFilters.has(s.name)} onChange={() => toggleSector(s.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{s.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({s.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Threat Type">
          <div className="flex flex-col gap-2">
            {THREAT_TYPES.map((t) => (
              <label key={t.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={threatTypeFilters.has(t.name)} onChange={() => toggleThreatType(t.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{t.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({t.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Severity">
          <div className="flex flex-col gap-2">
            {SEVERITIES.map((s) => (
              <label key={s.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={severityFilters.has(s.name)} onChange={() => toggleSeverity(s.name)} />
                <span className={cn("h-2 w-2 shrink-0 rounded-full", s.dot)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{s.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({s.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

/* -------------------------------- stat strip -------------------------------- */

const STATS: Array<{
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string;
  delta?: string;
  deltaClass?: string;
}> = [
  { icon: TrendingUp, iconClass: "bg-error/10 text-error", label: "Active Threats (India)", value: "1,248", delta: "↑ 18%", deltaClass: "text-error" },
  { icon: Fingerprint, iconClass: "bg-warning/10 text-warning", label: "Ongoing Campaigns", value: "42", delta: "↑ 5%", deltaClass: "text-warning" },
  { icon: Building2, iconClass: "bg-info/10 text-info", label: "Targeted Organizations", value: "312", delta: "↑ 12%", deltaClass: "text-success" },
  { icon: AlertTriangle, iconClass: "bg-error/10 text-error", label: "High-Risk Sectors", value: "7" },
];

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const Icon = stat.icon;
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-border-default bg-surface-1 px-3.5 py-3">
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", stat.iconClass)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-[18px] font-bold tabular-nums text-text-primary">{stat.value}</span>
          {stat.delta ? <span className={cn("text-[11px] font-semibold", stat.deltaClass)}>{stat.delta}</span> : null}
        </div>
        <p className="truncate text-[11px] font-medium text-text-secondary">{stat.label}</p>
      </div>
    </div>
  );
}

function CertInBadge() {
  return (
    <div className="flex min-w-0 flex-[1.6] items-center gap-2.5 rounded-xl border border-border-default bg-surface-1 px-3.5 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
        <Shield className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11.5px] font-bold text-text-primary">Aligned with CERT-In Advisories</p>
        <p className="truncate text-[10.5px] text-text-secondary">Real-time updates and contextual intelligence</p>
      </div>
    </div>
  );
}

/* -------------------------------- india map -------------------------------- */

const STATE_VOLUME_MAP = new Map(STATE_VOLUMES.map((s) => [s.name, s.volume]));
const BASE_SCALE = 950;

function IndiaMapPanel({
  mode,
  setMode,
  selectedState,
  setSelectedState,
  activeRegions,
}: {
  mode: "Threats" | "Campaigns";
  setMode: (m: "Threats" | "Campaigns") => void;
  selectedState: string | null;
  setSelectedState: (s: string | null) => void;
  activeRegions: Set<string> | null;
}) {
  const [zoom, setZoom] = React.useState(1);
  const [hovered, setHovered] = React.useState<string | null>(null);

  const activeName = hovered ?? selectedState;
  const activeVolume = activeName ? STATE_VOLUME_MAP.get(activeName) : undefined;

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-4 py-3">
        <div>
          <h3 className="text-[13px] font-bold text-text-primary">Threat Activity Across India</h3>
          <p className="text-[10.5px] text-text-secondary">Geographic view of reported and observed threat activity</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-border-default bg-surface-2 p-0.5">
          {(["Threats", "Campaigns"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors duration-150",
                mode === m ? "bg-surface-1 text-brand-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2"
            aria-label="Zoom in"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.25).toFixed(2)))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2"
            aria-label="Zoom out"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2"
            aria-label="Reset zoom"
          >
            <span className="block h-2 w-2 rounded-full border border-current" />
          </button>
        </div>

        <div className="absolute right-3 top-3 z-10 rounded-lg border border-border-default bg-surface-1/95 px-3 py-2 text-[10.5px] shadow-sm backdrop-blur-sm">
          <p className="mb-1.5 font-semibold text-text-primary">Threat Volume</p>
          {(
            [
              ["Critical (> 200)", SEVERITY_HEX.Critical],
              ["High (101 - 200)", SEVERITY_HEX.High],
              ["Medium (51 - 100)", SEVERITY_HEX.Medium],
              ["Low (1 - 50)", SEVERITY_HEX.Low],
            ] as const
          ).map(([label, hex]) => (
            <div key={label} className="flex items-center gap-1.5 py-0.5 text-text-secondary">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: hex }} />
              {label}
            </div>
          ))}
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: BASE_SCALE * zoom, center: [82, 22] }}
          className="h-full w-full"
        >
          <Geographies geography={INDIA_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name: string = (geo.properties as { NAME_1: string }).NAME_1;
                const volume = STATE_VOLUME_MAP.get(name) ?? 0;
                const sev = severityForVolume(volume);
                const isActive = name === activeName;
                const region = STATE_REGION[name];
                const isDimmed = activeRegions ? !region || !activeRegions.has(region) : false;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelectedState(selectedState === name ? null : name)}
                    fill={SEVERITY_HEX[sev]}
                    fillOpacity={isDimmed ? 0.2 : 1}
                    stroke="var(--surface-1)"
                    strokeWidth={0.75}
                    style={{ outline: "none", cursor: "pointer" }}
                    className={cn("transition-[filter,fill-opacity] duration-150 hover:brightness-90", isActive && "drop-shadow-[0_0_0_1px_var(--brand-primary)]")}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {activeName ? (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-border-default bg-surface-1 px-3 py-2 text-[11.5px] shadow-lg">
            <span className="font-semibold text-text-primary">{displayStateName(activeName)}</span>
            <span className="ml-2 text-text-secondary">
              {activeVolume ?? 0} reported {mode.toLowerCase()}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- campaigns panel -------------------------------- */

function CampaignsPanel({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <h3 className="text-[13px] font-bold text-text-primary">Active Campaigns in India</h3>
        <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
          View all
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {campaigns.map((c) => {
          const Icon = c.tagIcon;
          return (
            <button
              key={c.id}
              type="button"
              className="flex w-full items-start gap-2.5 border-b border-border-default px-4 py-3 text-left transition-colors duration-100 last:border-0 hover:bg-surface-2"
            >
              <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full", SEVERITY_STYLE[c.severity])}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[12.5px] font-semibold text-text-primary">{c.name}</p>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", SEVERITY_STYLE[c.severity])}>
                    {c.tag.split(" · ")[0]}
                  </span>
                  <span className="text-[10px] text-text-secondary">{c.tag.split(" · ")[1]}</span>
                  <span className="ml-auto text-[10px] text-text-secondary">{c.date}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-text-secondary">{c.desc}</p>
              </div>
            </button>
          );
        })}
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
            <Target className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <p className="text-[11.5px] text-text-secondary">No campaigns match your filters</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- advisory feed -------------------------------- */

function AdvisoryFeed({ advisories }: { advisories: Advisory[] }) {
  const [tab, setTab] = React.useState<"All" | "CERT-In" | "Govt Sources" | "Community">("All");
  const filtered = tab === "All" ? advisories : advisories.filter((a) => a.source === tab);

  return (
    <div className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <h3 className="text-[13px] font-bold text-text-primary">India Advisory Feed</h3>
        <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
          View all
        </button>
      </div>
      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-3 py-1.5">
        {(["All", "CERT-In", "Govt Sources", "Community"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-150",
              tab === t ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.map((a) => (
          <button
            key={a.id}
            type="button"
            className="flex w-full items-start gap-2.5 border-b border-border-default px-4 py-3 text-left transition-colors duration-100 last:border-0 hover:bg-surface-2"
          >
            <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full", SEVERITY_STYLE[a.severity])}>
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-text-primary">{a.title}</p>
                <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", SEVERITY_STYLE[a.severity])}>{a.severity}</span>
                <span className="text-[10px] text-text-secondary">{a.date}</span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
            <Shield className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <p className="text-[11.5px] text-text-secondary">No advisories from this source</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- recent threats table -------------------------------- */

function RecentThreatsTable({ rows }: { rows: ThreatRow[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <h3 className="text-[13px] font-bold text-text-primary">Recent India-Related Threats</h3>
        <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
          View all
        </button>
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[17%]" />
            <col className="w-[21%]" />
            <col className="w-[14%]" />
            <col className="w-[19%]" />
            <col className="w-[14%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface-1">
            <tr className="border-b border-border-default text-[10px] uppercase tracking-wide text-text-secondary">
              <th className="truncate py-2 pl-4 pr-2 font-medium">Time (IST)</th>
              <th className="truncate py-2 pr-2 font-medium">Indicator</th>
              <th className="truncate py-2 pr-2 font-medium">Type</th>
              <th className="truncate py-2 pr-2 font-medium">Sector</th>
              <th className="truncate py-2 pr-2 font-medium">Location</th>
              <th className="truncate py-2 pr-4 font-medium">Sev.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="cursor-pointer border-b border-border-default text-[11.5px] transition-colors duration-100 last:border-0 hover:bg-surface-2">
                <td className="truncate py-2 pl-4 pr-2 tabular-nums text-text-secondary">{r.time}</td>
                <td className="truncate py-2 pr-2 font-medium text-brand-primary">{r.indicator}</td>
                <td className="truncate py-2 pr-2 text-text-secondary">{r.type}</td>
                <td className="truncate py-2 pr-2 text-text-secondary">{r.sector}</td>
                <td className="truncate py-2 pr-2 text-text-secondary">{r.location}</td>
                <td className="truncate py-2 pr-4">
                  <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", SEVERITY_STYLE[r.severity])}>{r.severity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-8 text-center">
            <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <p className="text-[11.5px] text-text-secondary">No threats match your filters</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- top iocs table -------------------------------- */

function TopIocsTable({ rows }: { rows: IocRow[] }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <h3 className="text-[13px] font-bold text-text-primary">Top IOCs (India)</h3>
        <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
          View all
        </button>
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[36%]" />
            <col className="w-[24%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface-1">
            <tr className="border-b border-border-default text-[10px] uppercase tracking-wide text-text-secondary">
              <th className="truncate py-2 pl-4 pr-2 font-medium">IOC</th>
              <th className="truncate py-2 pr-2 font-medium">Type</th>
              <th className="truncate py-2 pr-2 font-medium">Conf.</th>
              <th className="truncate py-2 pr-4 font-medium">Rpts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ioc} className="cursor-pointer border-b border-border-default text-[11.5px] transition-colors duration-100 last:border-0 hover:bg-surface-2">
                <td className="truncate py-2 pl-4 pr-2 font-medium text-brand-primary">{r.ioc}</td>
                <td className="truncate py-2 pr-2 text-text-secondary">{r.type}</td>
                <td className="truncate py-2 pr-2 tabular-nums text-text-secondary">{r.confidence}</td>
                <td className="truncate py-2 pr-4 tabular-nums text-text-secondary">{r.reports}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-8 text-center">
            <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <p className="text-[11.5px] text-text-secondary">No IOCs match your filters</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- sector risk -------------------------------- */

function SectorRiskPanel({ rows }: { rows: typeof SECTOR_RISK }) {
  const max = Math.max(...rows.map((r) => r.score));
  return (
    <div className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <h3 className="text-[13px] font-bold text-text-primary">Sector Risk (India)</h3>
        <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
          View all
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-2.5">
          {rows.map((r) => {
            const barColor = r.score >= 70 ? "bg-error" : r.score >= 50 ? "bg-warning" : "bg-info";
            return (
              <div key={r.name} className="flex items-center gap-2">
                <span className="w-[90px] shrink-0 truncate text-[11px] text-text-secondary">{r.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div className={cn("h-full rounded-full", barColor)} style={{ width: `${(r.score / max) * 100}%` }} />
                </div>
                <span className="w-7 shrink-0 text-right text-[11px] font-semibold tabular-nums text-text-primary">{r.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- header meta -------------------------------- */

export function IndiaThreatIntelHeaderMeta() {
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
  );
}

/* -------------------------------- main -------------------------------- */

export function IndiaThreatIntelPlatform() {
  const [search, setSearch] = React.useState("");
  const [regionFilters, setRegionFilters] = React.useState<Set<string>>(new Set(["All India"]));
  const [sectorFilters, setSectorFilters] = React.useState<Set<string>>(new Set());
  const [threatTypeFilters, setThreatTypeFilters] = React.useState<Set<string>>(new Set());
  const [severityFilters, setSeverityFilters] = React.useState<Set<Severity>>(new Set());
  const [mapMode, setMapMode] = React.useState<"Threats" | "Campaigns">("Threats");
  const [selectedState, setSelectedState] = React.useState<string | null>(null);

  const toggleSet = <T,>(setFn: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) => {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleRegion = (name: string) => {
    setRegionFilters((prev) => {
      if (name === "All India") return new Set(["All India"]);
      const next = new Set(prev);
      next.delete("All India");
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next.size ? next : new Set(["All India"]);
    });
  };

  const resetFilters = () => {
    setSearch("");
    setRegionFilters(new Set(["All India"]));
    setSectorFilters(new Set());
    setThreatTypeFilters(new Set());
    setSeverityFilters(new Set());
    setSelectedState(null);
  };

  const q = search.trim().toLowerCase();
  const activeRegions = regionFilters.has("All India") ? null : regionFilters;

  const matchesCommon = (row: { severity: Severity; sector: string; threatType: string; region: Region }) => {
    if (activeRegions && !activeRegions.has(row.region)) return false;
    if (severityFilters.size && !severityFilters.has(row.severity)) return false;
    if (sectorFilters.size && !sectorFilters.has(row.sector)) return false;
    if (threatTypeFilters.size && !threatTypeFilters.has(row.threatType)) return false;
    return true;
  };

  const filteredThreats = React.useMemo(
    () =>
      RECENT_THREATS.filter((r) => {
        if (!matchesCommon(r)) return false;
        if (q && !(r.indicator.toLowerCase().includes(q) || r.sector.toLowerCase().includes(q) || r.location.toLowerCase().includes(q))) return false;
        return true;
      }),
    [q, severityFilters, sectorFilters, threatTypeFilters, activeRegions]
  );

  const filteredCampaigns = React.useMemo(
    () =>
      CAMPAIGNS.filter((c) => {
        if (!matchesCommon(c)) return false;
        if (q && !(c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q))) return false;
        return true;
      }),
    [q, severityFilters, sectorFilters, threatTypeFilters, activeRegions]
  );

  const filteredAdvisories = React.useMemo(
    () =>
      ADVISORIES.filter((a) => {
        if (!matchesCommon(a)) return false;
        if (q && !a.title.toLowerCase().includes(q)) return false;
        return true;
      }),
    [q, severityFilters, sectorFilters, threatTypeFilters, activeRegions]
  );

  const filteredIocs = React.useMemo(
    () =>
      TOP_IOCS.filter((r) => {
        if (!matchesCommon(r)) return false;
        if (q && !(r.ioc.toLowerCase().includes(q) || r.type.toLowerCase().includes(q))) return false;
        return true;
      }),
    [q, severityFilters, sectorFilters, threatTypeFilters, activeRegions]
  );

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <FiltersSidebar
        search={search}
        setSearch={setSearch}
        regionFilters={regionFilters}
        toggleRegion={toggleRegion}
        sectorFilters={sectorFilters}
        toggleSector={(s) => toggleSet(setSectorFilters, s)}
        threatTypeFilters={threatTypeFilters}
        toggleThreatType={(t) => toggleSet(setThreatTypeFilters, t)}
        severityFilters={severityFilters}
        toggleSeverity={(s) => toggleSet(setSeverityFilters, s)}
        onReset={resetFilters}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden p-4">
        <div className="flex shrink-0 gap-3">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
          <CertInBadge />
        </div>

        <div className="flex min-h-0 flex-[1.3] gap-3">
          <IndiaMapPanel
            mode={mapMode}
            setMode={setMapMode}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            activeRegions={activeRegions}
          />
          <CampaignsPanel campaigns={filteredCampaigns} />
          <AdvisoryFeed advisories={filteredAdvisories} />
        </div>

        <div className="flex min-h-0 flex-1 gap-3">
          <RecentThreatsTable rows={filteredThreats} />
          <TopIocsTable rows={filteredIocs} />
          <SectorRiskPanel rows={SECTOR_RISK} />
        </div>
      </div>
    </div>
  );
}
