"use client";

import * as React from "react";
import {
  AlertTriangle,
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Laptop,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Server,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line as GeoLine } from "react-simple-maps";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { cn } from "@/lib/utils";

const WORLD_GEO_URL = "/geo/world-110m.json";

/* --------------------------------- types --------------------------------- */

type RiskLevel = "High" | "Medium" | "Low";
type EntityType = "User" | "Device" | "IP Address" | "Service Account";
type SubTab = "Overview" | "Users" | "Devices" | "Applications" | "Locations" | "Data Access";
type DetailTab = "Behavior Timeline" | "Risk Indicators" | "Related Entities" | "Profile" | "Raw Events";

type LeaderboardEntity = {
  rank: number;
  entity: string;
  type: EntityType;
  score: number;
};

type TimelineEvent = {
  time: string;
  label: string;
  risky: boolean;
};

type TimelineDay = {
  day: string;
  events: TimelineEvent[];
};

/* -------------------------------- dummy data -------------------------------- */

const LEADERBOARD: LeaderboardEntity[] = [
  { rank: 1, entity: "rahul.verma", type: "User", score: 98 },
  { rank: 2, entity: "FIN-SRV-01", type: "Device", score: 96 },
  { rank: 3, entity: "priya.nair", type: "User", score: 93 },
  { rank: 4, entity: "10.10.45.23", type: "IP Address", score: 91 },
  { rank: 5, entity: "db-admin", type: "User", score: 88 },
  { rank: 6, entity: "HR-LAP-27", type: "Device", score: 86 },
  { rank: 7, entity: "marketing-sa", type: "Service Account", score: 83 },
  { rank: 8, entity: "172.16.8.14", type: "IP Address", score: 81 },
  { rank: 9, entity: "harsh.kapoor", type: "User", score: 79 },
  { rank: 10, entity: "PAYROLL-SRV", type: "Device", score: 77 },
  { rank: 11, entity: "anita.singh", type: "User", score: 74 },
  { rank: 12, entity: "203.122.45.67", type: "IP Address", score: 72 },
  { rank: 13, entity: "devops-bot", type: "Service Account", score: 71 },
  { rank: 14, entity: "sales-laptop-3", type: "Device", score: 69 },
  { rank: 15, entity: "rohit.mehra", type: "User", score: 66 },
];

const ENTITY_ICON: Record<EntityType, React.ElementType> = {
  User: User,
  Device: Laptop,
  "IP Address": MapPin,
  "Service Account": Server,
};

const TIMELINE: TimelineDay[] = [
  {
    day: "Today · 8 Sep 2026",
    events: [
      { time: "14:22", label: "Accessed sensitive repository (prod)", risky: true },
      { time: "13:05", label: "Unusual data download (2.4 GB)", risky: true },
      { time: "11:40", label: "Login from new location (Singapore)", risky: true },
      { time: "09:12", label: "Multiple failed login attempts (5)", risky: true },
    ],
  },
  {
    day: "Yesterday · 7 Sep 2026",
    events: [
      { time: "18:34", label: "Accessed HR records", risky: false },
      { time: "16:21", label: "Added new SSH key", risky: false },
      { time: "10:03", label: "Normal activity", risky: false },
    ],
  },
  {
    day: "6 Sep 2026",
    events: [
      { time: "21:17", label: "Login from unusual device", risky: true },
      { time: "13:45", label: "Accessed internal wiki", risky: false },
    ],
  },
  {
    day: "5 Sep 2026",
    events: [
      { time: "19:02", label: "Large file upload to external site", risky: true },
      { time: "11:28", label: "Normal activity", risky: false },
    ],
  },
];

const DAY_LABELS = ["2 Sep", "3 Sep", "4 Sep", "5 Sep", "6 Sep", "7 Sep", "8 Sep"];

const ACTIVITY_DATA = DAY_LABELS.map((day, i) => ({
  day,
  actual: [40, 55, 48, 62, 58, 70, 175][i],
  baselineLow: [20, 25, 22, 28, 24, 30, 26][i],
  baselineHigh: [70, 78, 72, 82, 76, 88, 80][i],
}));

const TRANSFER_DATA = DAY_LABELS.map((day, i) => ({
  day,
  actual: [0.4, 0.55, 0.35, 0.6, 0.5, 0.45, 2.4][i],
  isAnomaly: i === 6,
}));

const LOGIN_ARC: [[number, number], [number, number]] = [
  [77.5946, 12.9716],
  [103.8198, 1.3521],
];
const LOGIN_MARKERS = [
  { label: "Bengaluru", coords: [77.5946, 12.9716] as [number, number], colorVar: "var(--brand-primary)" },
  { label: "Singapore", coords: [103.8198, 1.3521] as [number, number], colorVar: "var(--color-error)" },
];

const RISK_INDICATORS = [
  "Large data download (2.4 GB)",
  "Access to sensitive repositories",
  "Login from Singapore (unusual location)",
  "Multiple failed login attempts",
  "Accessed HR records (unusual for role)",
];

const RECENT_ALERTS = [
  { label: "Data exfiltration pattern detected", time: "8 Sep 2026, 13:05" },
  { label: "New location login - Singapore", time: "8 Sep 2026, 11:40" },
  { label: "Sensitive repo access", time: "8 Sep 2026, 14:22" },
  { label: "Multiple failed logins", time: "8 Sep 2026, 09:12" },
  { label: "Unusual access to HR system", time: "7 Sep 2026, 18:34" },
];

const SUB_TABS: SubTab[] = ["Overview", "Users", "Devices", "Applications", "Locations", "Data Access"];

const SUB_TAB_ENTITY_TYPE: Record<SubTab, EntityType | null> = {
  Overview: null,
  Users: "User",
  Devices: "Device",
  Applications: "Service Account",
  Locations: "IP Address",
  "Data Access": null,
};

const SUB_TAB_SEARCH_PLACEHOLDER: Record<SubTab, string> = {
  Overview: "Search users, devices, or groups...",
  Users: "Search users...",
  Devices: "Search devices...",
  Applications: "Search service accounts...",
  Locations: "Search IP addresses...",
  "Data Access": "Search users, devices, or groups...",
};

const SUB_TAB_LEADERBOARD_LABEL: Record<SubTab, string> = {
  Overview: "Anomaly Score Leaderboard",
  Users: "User Risk Leaderboard",
  Devices: "Device Risk Leaderboard",
  Applications: "Service Account Risk Leaderboard",
  Locations: "IP Address Risk Leaderboard",
  "Data Access": "Data Access Leaderboard",
};
const DETAIL_TABS: { label: DetailTab; count: number | null }[] = [
  { label: "Behavior Timeline", count: null },
  { label: "Risk Indicators", count: 8 },
  { label: "Related Entities", count: 12 },
  { label: "Profile", count: null },
  { label: "Raw Events", count: null },
];

const RISK_STYLE: Record<RiskLevel, string> = {
  High: "bg-error/10 text-error",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

const SCORE_BAR: Record<"high" | "medium" | "low", string> = {
  high: "bg-error/70",
  medium: "bg-warning/70",
  low: "bg-success/70",
};

function scoreTier(score: number): "high" | "medium" | "low" {
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
}

/* -------------------------------- small ui -------------------------------- */

function Dropdown({
  label,
  width = "w-40",
  icon: Icon,
}: {
  label: string;
  width?: string;
  icon?: React.ElementType;
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
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
      >
        {Icon ? <Icon className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" /> : null}
        <span className="truncate">{label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className={cn("absolute right-0 top-full z-30 mt-1.5 overflow-hidden rounded-lg border border-border-default bg-surface-1 py-1 shadow-lg", width)}>
          <button type="button" onClick={() => setOpen(false)} className="block w-full px-3 py-1.5 text-left text-[12px] font-medium text-text-primary hover:bg-surface-2">
            {label}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function RingMeter({ pct, size = 34, ringClass = "stroke-success" }: { pct: number; size?: number; ringClass?: string }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} className="stroke-surface-2" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} className={ringClass} strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

function StatCard({
  icon: Icon,
  iconClass,
  value,
  label,
  trend,
}: {
  icon: React.ElementType;
  iconClass: string;
  value: string;
  label: string;
  trend?: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-border-default bg-surface-1 px-3 py-2">
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", iconClass)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-1.5">
          <p className="text-[15px] font-bold text-text-primary">{value}</p>
          {trend ? <span className="text-[10.5px] font-semibold text-error">{trend}</span> : null}
        </div>
        <p className="whitespace-nowrap text-[10.5px] text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

/* -------------------------------- charts -------------------------------- */

function ChartTooltip({ active, payload, label, unit }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border-default bg-surface-1 px-2.5 py-1.5 text-[10.5px] shadow-lg">
      <p className="mb-1 font-semibold text-text-primary">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-text-secondary">{p.name}:</span>
          <span className="font-semibold text-text-primary">
            {p.value}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

function ActivityChart() {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[11px] font-bold text-text-primary">User Activity Pattern</p>
        <div className="flex items-center gap-3 text-[10px] text-text-secondary">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            Actual Activity
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary/25" />
            Baseline Range
          </span>
          <span className="flex items-center gap-1 text-text-secondary">
            Events per hour
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="h-[130px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ACTIVITY_DATA} margin={{ top: 6, right: 4, bottom: 0, left: -24 }}>
            <CartesianGrid stroke="var(--border-default)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: "var(--text-secondary)" }} axisLine={{ stroke: "var(--border-default)" }} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={34} />
            <Tooltip content={<ChartTooltip unit=" events/hr" />} />
            <Area type="monotone" dataKey="baselineHigh" stroke="none" fill="var(--brand-primary)" fillOpacity={0.07} name="Baseline High" />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--brand-primary)"
              strokeWidth={1.75}
              fill="none"
              name="Actual Activity"
              dot={{ r: 1.5, fill: "var(--brand-primary)", strokeWidth: 0 }}
              activeDot={{ r: 3.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TransferChart() {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[11px] font-bold text-text-primary">Data Transfer Volume</p>
        <div className="flex items-center gap-3 text-[10px] text-text-secondary">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            Actual
          </span>
          <span className="flex items-center gap-1 text-text-secondary">
            Data out (GB)
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="h-[130px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TRANSFER_DATA} margin={{ top: 6, right: 4, bottom: 0, left: -24 }}>
            <CartesianGrid stroke="var(--border-default)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: "var(--text-secondary)" }} axisLine={{ stroke: "var(--border-default)" }} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={34} />
            <Tooltip content={<ChartTooltip unit=" GB" />} cursor={{ fill: "var(--surface-2)" }} />
            <Bar dataKey="actual" name="Data Out" radius={[3, 3, 0, 0]} maxBarSize={28}>
              {TRANSFER_DATA.map((d) => (
                <Cell key={d.day} fill={d.isAnomaly ? "var(--color-error)" : "var(--brand-primary)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function LoginMap() {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-bold text-text-primary">Login Locations</p>
      <div className="flex items-center gap-3 rounded-lg border border-border-default bg-surface-2/40 p-2">
        <div className="flex shrink-0 flex-col items-center justify-center gap-0.5 pr-3">
          <span className="text-[18px] font-bold text-text-primary">3</span>
          <span className="text-center text-[9.5px] leading-tight text-text-secondary">New Locations in last 7 days</span>
        </div>
        <div className="h-[90px] flex-1 overflow-hidden rounded-md">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 340, center: [90, 7] }}
            width={400}
            height={90}
            className="h-full w-full"
          >
            <Geographies geography={WORLD_GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} fill="var(--surface-3)" stroke="var(--border-default)" strokeWidth={0.5} style={{ outline: "none" }} />
                ))
              }
            </Geographies>
            <GeoLine from={LOGIN_ARC[0]} to={LOGIN_ARC[1]} stroke="var(--brand-primary)" strokeWidth={1} strokeDasharray="2 2" strokeLinecap="round" />
            {LOGIN_MARKERS.map((m) => (
              <Marker key={m.label} coordinates={m.coords}>
                <circle r={5} fill={m.colorVar} fillOpacity={0.25} />
                <circle r={2.5} fill={m.colorVar} stroke="var(--surface-1)" strokeWidth={1} />
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-4 text-[10px] text-text-secondary">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-brand-primary" /> Bengaluru
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-error" /> Singapore
        </span>
      </div>
    </div>
  );
}

/* -------------------------------- header meta -------------------------------- */

export function UebaAnalyticsHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <Dropdown label="Last 7 days" icon={Calendar} width="w-36" />
      <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2" aria-label="Bookmark">
        <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Investigate Entity
      </button>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

export function UebaAnalyticsPlatform() {
  const [subTab, setSubTab] = React.useState<SubTab>("Users");
  const [search, setSearch] = React.useState("");
  const [selectedEntity, setSelectedEntity] = React.useState(LEADERBOARD[0].entity);
  const [detailTab, setDetailTab] = React.useState<DetailTab>("Behavior Timeline");

  const entityType = SUB_TAB_ENTITY_TYPE[subTab];
  const byTab = entityType ? LEADERBOARD.filter((e) => e.type === entityType) : LEADERBOARD;
  const filtered = byTab.filter((e) => !search.trim() || e.entity.toLowerCase().includes(search.trim().toLowerCase()));
  const active = filtered.find((e) => e.entity === selectedEntity) ?? filtered[0] ?? LEADERBOARD[0];
  const ActiveIcon = ENTITY_ICON[active.type];

  const handleSubTab = (t: SubTab) => {
    setSubTab(t);
    setSearch("");
    const nextType = SUB_TAB_ENTITY_TYPE[t];
    const nextList = nextType ? LEADERBOARD.filter((e) => e.type === nextType) : LEADERBOARD;
    if (nextList.length) setSelectedEntity(nextList[0].entity);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* stat strip */}
      <div className="flex shrink-0 items-center gap-2.5 border-b border-border-default px-4 py-2.5">
        <StatCard icon={AlertTriangle} iconClass="bg-error/10 text-error" value="23" label="High Risk Entities" trend="↑ 44%" />
        <StatCard icon={ShieldAlert} iconClass="bg-warning/10 text-warning" value="67" label="Medium Risk Entities" trend="↑ 12%" />
        <StatCard icon={Users} iconClass="bg-brand-primary/10 text-brand-primary" value="1,284" label="Monitored Entities" trend="↑ 6%" />
        <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-border-default bg-surface-1 px-3 py-2">
          <RingMeter pct={92} size={30} ringClass="stroke-success" />
          <div className="min-w-0 leading-tight">
            <p className="text-[15px] font-bold text-text-primary">92%</p>
            <p className="whitespace-nowrap text-[10.5px] text-text-secondary">Behavioral Baseline · Stable</p>
          </div>
        </div>
      </div>

      {/* sub tabs */}
      <div className="flex shrink-0 items-center gap-1 border-b border-border-default px-4">
        {SUB_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleSubTab(t)}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[12px] font-medium transition-colors duration-150",
              subTab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* body */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* left: leaderboard */}
        <div className="flex h-full w-[260px] shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
          <div className="flex shrink-0 items-center justify-between px-3 pt-3">
            <p className="text-[12px] font-bold text-text-primary">{SUB_TAB_LEADERBOARD_LABEL[subTab]}</p>
            <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2" aria-label="Filter">
              <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className="shrink-0 px-3 py-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={SUB_TAB_SEARCH_PLACEHOLDER[subTab]}
                className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[11.5px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
            <span className="w-6">#</span>
            <span className="flex-1">Entity</span>
            <span className="w-9 text-right">Type</span>
            <span className="w-9 text-right">Score</span>
          </div>

          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto pb-2">
            {filtered.map((e) => {
              const Icon = ENTITY_ICON[e.type];
              const isActive = e.entity === selectedEntity;
              const tier = scoreTier(e.score);
              return (
                <button
                  key={e.entity}
                  type="button"
                  onClick={() => setSelectedEntity(e.entity)}
                  className={cn(
                    "flex w-full items-center gap-2 border-l-2 px-3 py-1.5 text-left transition-colors duration-100 hover:bg-surface-2",
                    isActive ? "border-brand-primary bg-brand-primary/5" : "border-transparent"
                  )}
                >
                  <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold", isActive ? "bg-brand-primary text-white" : "bg-surface-2 text-text-secondary")}>
                    {e.rank}
                  </span>
                  <Icon className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
                  <span className={cn("min-w-0 flex-1 truncate text-[11.5px] font-medium", isActive ? "text-brand-primary" : "text-text-primary")}>{e.entity}</span>
                  <span className="flex w-6 shrink-0 items-center justify-end">
                    <span className={cn("h-1.5 w-4 rounded-full", SCORE_BAR[tier])} />
                  </span>
                  <span className="w-7 shrink-0 text-right text-[11.5px] font-semibold text-text-primary">{e.score}</span>
                </button>
              );
            })}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-1.5 px-4 py-10 text-center">
                <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
                <p className="text-[11.5px] font-medium text-text-secondary">No entities match your search</p>
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center justify-between border-t border-border-default px-3 py-2">
            <span className="text-[10.5px] text-text-secondary">
              Showing {filtered.length} of {byTab.length.toLocaleString()}
            </span>
            <div className="flex items-center gap-0.5">
              <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2 disabled:opacity-40" disabled>
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {[1, 2, 3, 4].map((p) => (
                <button key={p} type="button" className={cn("flex h-6 w-6 items-center justify-center rounded-md text-[10.5px] font-medium", p === 1 ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2")}>
                  {p}
                </button>
              ))}
              <span className="px-0.5 text-[10.5px] text-text-secondary">…</span>
              <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-[10.5px] font-medium text-text-secondary hover:bg-surface-2">
                86
              </button>
              <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* center: entity detail */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border-default px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-text-secondary">
                <ActiveIcon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-[14.5px] font-bold text-text-primary">{active.entity}</h2>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", RISK_STYLE[scoreTier(active.score) === "high" ? "High" : scoreTier(active.score) === "medium" ? "Medium" : "Low"])}>
                    {scoreTier(active.score) === "high" ? "High Risk" : scoreTier(active.score) === "medium" ? "Medium Risk" : "Low Risk"}
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold text-text-primary">{active.score} / 100</span>
                  <span className="shrink-0 text-[10px] text-text-secondary">Anomaly Score</span>
                </div>
                <p className="mt-0.5 truncate text-[11.5px] text-text-secondary">Senior Software Engineer · Engineering · Bengaluru, India</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden text-right text-[10.5px] leading-tight text-text-secondary lg:block">
                <p>
                  Last Active <span className="font-medium text-text-primary">8 Sep 2026, 14:32</span>
                </p>
                <p>
                  Manager <span className="font-medium text-text-primary">Neha Kulkarni</span>
                </p>
              </div>
              <div className="hidden text-right text-[10.5px] leading-tight text-text-secondary lg:block">
                <p className="invisible">spacer</p>
                <p>
                  Device <span className="font-medium text-text-primary">HR-LAP-27</span>
                </p>
              </div>
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-2" aria-label="More actions">
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-4">
            <div className="flex items-center gap-1 overflow-x-auto">
              {DETAIL_TABS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setDetailTab(t.label)}
                  className={cn(
                    "shrink-0 whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[11.5px] font-medium transition-colors duration-150",
                    detailTab === t.label ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
                  )}
                >
                  {t.label}
                  {t.count !== null ? <span className="ml-1 text-text-secondary">({t.count})</span> : null}
                </button>
              ))}
            </div>
            <button type="button" className="my-2 flex h-7 shrink-0 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-primary hover:bg-surface-2">
              <Calendar className="h-3 w-3 text-text-secondary" aria-hidden="true" />
              Last 7 days
            </button>
          </div>

          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {detailTab === "Behavior Timeline" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <ActivityChart />
                  <TransferChart />
                </div>
                <LoginMap />

                <div className="flex flex-col gap-3">
                  {TIMELINE.map((day) => (
                    <div key={day.day}>
                      <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-text-secondary">{day.day}</p>
                      <div className="flex flex-col gap-1.5 border-l border-border-default pl-3">
                        {day.events.map((ev, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12px]">
                            <span className="w-10 shrink-0 text-[10.5px] text-text-secondary">{ev.time}</span>
                            <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 -ml-[19px] rounded-full ring-2 ring-surface-1", ev.risky ? "bg-error" : "bg-success")} />
                            <span className="flex-1 text-text-primary">{ev.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" className="flex items-center gap-1 self-start text-[12px] font-medium text-brand-primary hover:underline">
                  View Full Timeline
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ) : null}

            {detailTab !== "Behavior Timeline" ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 py-16 text-center">
                <p className="text-[12.5px] font-semibold text-text-primary">{detailTab}</p>
                <p className="text-[11.5px] text-text-secondary">No additional data configured for this view.</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* right: risk summary */}
        <div className="scrollbar-thin flex h-full w-[280px] shrink-0 flex-col overflow-y-auto border-l border-border-default bg-surface-1 px-4 py-3.5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12px] font-bold text-text-primary">Risk Summary</p>
            <span className="rounded-full bg-error/10 px-2 py-0.5 text-[10.5px] font-semibold text-error">High Risk</span>
          </div>
          <p className="mb-3 text-[11.5px] leading-relaxed text-text-secondary">
            User is exhibiting multiple anomalous behaviors including unusual data transfer, access to sensitive systems, and logins from new geographic locations.
          </p>

          <dl className="mb-4 flex flex-col divide-y divide-border-default text-[11.5px]">
            {[
              ["Anomaly Score", "98 / 100"],
              ["Risk Level", "High"],
              ["Unusual Activities", "8 (last 7 days)"],
              ["First Seen", "12 Aug 2026"],
              ["Last Seen", "8 Sep 2026, 14:32"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-2 py-1.5">
                <dt className="text-text-secondary">{k}</dt>
                <dd className={cn("font-medium", k === "Risk Level" ? "text-error" : "text-text-primary")}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-text-primary">Key Risk Indicators</p>
              <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
                View all
              </button>
            </div>
            <ul className="flex flex-col gap-1.5">
              {RISK_INDICATORS.map((r) => (
                <li key={r} className="flex items-start gap-1.5 text-[11.5px] text-text-primary">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-error" />
                  <span className="leading-snug">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-text-primary">Recent Alerts (5)</p>
              <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
                View all
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {RECENT_ALERTS.map((a) => (
                <li key={a.label} className="flex items-start gap-1.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-error" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11.5px] text-text-primary">{a.label}</p>
                    <p className="text-[10px] text-text-secondary">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            <button type="button" className="flex h-8 items-center justify-center gap-1.5 rounded-lg bg-brand-primary text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Investigate
            </button>
            <button type="button" className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[12px] font-medium text-text-primary hover:bg-surface-2">
              <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
