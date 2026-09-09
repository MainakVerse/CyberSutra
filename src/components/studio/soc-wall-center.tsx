"use client";

import * as React from "react";
import {
  ShieldAlert,
  Flame,
  FileText,
  FileStack,
  Users,
  Clock,
  Timer,
  ChevronDown,
} from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line as GeoLine } from "react-simple-maps";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { cn } from "@/lib/utils";

const WORLD_GEO_URL = "/geo/world-110m.json";
const INDIA_GEO_URL = "/geo/india-states.json";

type Trend = "up" | "down";

const STAT_TILES: Array<{
  icon: React.ElementType;
  iconClass: string;
  value: string;
  label: string;
  delta: string;
  trend: Trend;
}> = [
  { icon: ShieldAlert, iconClass: "bg-error/10 text-error", value: "18", label: "Critical Alerts", delta: "3", trend: "up" },
  { icon: Flame, iconClass: "bg-warning/10 text-warning", value: "47", label: "High Severity", delta: "6", trend: "up" },
  { icon: FileText, iconClass: "bg-info/10 text-info", value: "126", label: "Medium Severity", delta: "12", trend: "down" },
  { icon: FileStack, iconClass: "bg-text-secondary/10 text-text-secondary", value: "342", label: "Low Severity", delta: "18", trend: "down" },
  { icon: Users, iconClass: "bg-success/10 text-success", value: "9", label: "Active Incidents", delta: "3", trend: "up" },
  { icon: Clock, iconClass: "bg-brand-primary/10 text-brand-primary", value: "28 min", label: "Mean Time to Detect", delta: "35%", trend: "down" },
  { icon: Timer, iconClass: "bg-brand-primary/10 text-brand-primary", value: "2 h 14 min", label: "Mean Time to Respond", delta: "42%", trend: "up" },
];

const STAT_SUBLABEL: Record<string, string> = {
  "Critical Alerts": "Require immediate action",
  "High Severity": "Under investigation",
  "Medium Severity": "Active monitoring",
  "Low Severity": "Informational",
  "Active Incidents": "Across all environments",
  "Mean Time to Detect": "vs. previous 24 hours",
  "Mean Time to Respond": "vs. previous 24 hours",
};

const GLOBAL_REGIONS: Array<{ label: string; coords: [number, number]; count: string; delta: string; r: number }> = [
  { label: "North America", coords: [-100, 45], count: "1,842", delta: "↑ 12%", r: 13 },
  { label: "Europe", coords: [15, 50], count: "1,206", delta: "↑ 8%", r: 11 },
  { label: "Asia", coords: [95, 32], count: "2,931", delta: "↑ 24%", r: 15 },
  { label: "South America", coords: [-60, -18], count: "421", delta: "↑ 6%", r: 8 },
  { label: "Africa", coords: [20, 3], count: "398", delta: "↑ 9%", r: 8 },
  { label: "Australia", coords: [134, -25], count: "276", delta: "↑ 4%", r: 7 },
];

const GLOBAL_ARCS: Array<[[number, number], [number, number]]> = [
  [[95, 32], [-100, 45]],
  [[95, 32], [15, 50]],
  [[95, 32], [20, 3]],
  [[15, 50], [-100, 45]],
  [[-60, -18], [-100, 45]],
];

function regionColor(count: string) {
  const n = Number(count.replace(/,/g, ""));
  if (n > 1500) return "var(--color-error)";
  if (n > 500) return "var(--color-warning)";
  return "#2a78d6";
}

const INDIA_CITIES: Array<{ label: string; coords: [number, number]; count: number; delta: string }> = [
  { label: "New Delhi", coords: [77.209, 28.6139], count: 328, delta: "↑ 18%" },
  { label: "Mumbai", coords: [72.8777, 19.076], count: 274, delta: "↑ 12%" },
  { label: "Bengaluru", coords: [77.5946, 12.9716], count: 198, delta: "↑ 9%" },
  { label: "Hyderabad", coords: [78.4867, 17.385], count: 176, delta: "↑ 14%" },
  { label: "Chennai", coords: [80.2707, 13.0827], count: 142, delta: "↑ 11%" },
];

function indiaMarkerColor(count: number) {
  if (count > 500) return "var(--color-error)";
  if (count > 100) return "#eda100";
  if (count > 10) return "#f5c542";
  return "#2a78d6";
}

const THREAT_CATEGORIES: Array<{ label: string; count: number; barClass: string }> = [
  { label: "Malware", count: 2931, barClass: "bg-error" },
  { label: "Suspicious Activity", count: 1842, barClass: "bg-warning" },
  { label: "Policy Violation", count: 1206, barClass: "bg-[#eda100]" },
  { label: "Brute Force", count: 421, barClass: "bg-brand-primary" },
  { label: "Data Exfiltration", count: 398, barClass: "bg-[#8b5cf6]" },
  { label: "C2 Communication", count: 276, barClass: "bg-[#8b5cf6]" },
  { label: "Others", count: 192, barClass: "bg-text-secondary" },
];

const ATTACK_SOURCES: Array<{ label: string; count: string; delta: string; flag: string }> = [
  { label: "Russia", count: "1,842", delta: "↑ 22%", flag: "🇷🇺" },
  { label: "China", count: "1,206", delta: "↑ 18%", flag: "🇨🇳" },
  { label: "United States", count: "934", delta: "↑ 11%", flag: "🇺🇸" },
  { label: "North Korea", count: "421", delta: "↑ 9%", flag: "🇰🇵" },
  { label: "Iran", count: "398", delta: "↑ 7%", flag: "🇮🇷" },
];

const ENV_DATA: Array<{ label: string; value: number; hex: string }> = [
  { label: "Endpoints", value: 42, hex: "#2a78d6" },
  { label: "Servers", value: 28, hex: "#1baf7a" },
  { label: "Network", value: 16, hex: "#eda100" },
  { label: "Cloud", value: 9, hex: "#8b5cf6" },
  { label: "Applications", value: 5, hex: "#c4b5fd" },
];
const ENV_TOTAL = ENV_DATA.reduce((s, d) => s + d.value, 0);

const TREND_HOURS = ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"];
const TREND_DATA = [
  { t: "12 AM", Critical: 60, High: 160, Medium: 90, Low: 40 },
  { t: "2 AM", Critical: 80, High: 190, Medium: 110, Low: 55 },
  { t: "4 AM", Critical: 70, High: 170, Medium: 95, Low: 45 },
  { t: "6 AM", Critical: 95, High: 210, Medium: 130, Low: 60 },
  { t: "8 AM", Critical: 150, High: 260, Medium: 170, Low: 80 },
  { t: "10 AM", Critical: 120, High: 230, Medium: 150, Low: 70 },
  { t: "12 PM", Critical: 170, High: 280, Medium: 190, Low: 90 },
  { t: "2 PM", Critical: 210, High: 320, Medium: 220, Low: 100 },
  { t: "4 PM", Critical: 160, High: 270, Medium: 180, Low: 85 },
  { t: "6 PM", Critical: 110, High: 220, Medium: 140, Low: 65 },
  { t: "8 PM", Critical: 90, High: 190, Medium: 115, Low: 55 },
  { t: "10 PM", Critical: 65, High: 165, Medium: 95, Low: 42 },
];

function RangeSelect({ label = "Last 24 hours" }: { label?: string }) {
  return (
    <button
      type="button"
      className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11px] font-medium text-text-secondary hover:bg-surface-2"
    >
      {label}
      <ChevronDown className="h-3 w-3 shrink-0" aria-hidden="true" />
    </button>
  );
}

function PanelHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-start justify-between gap-2 px-4 pt-3.5 pb-2.5">
      <div className="min-w-0">
        <h2 className="truncate text-[13px] font-bold text-text-primary">{title}</h2>
        {subtitle ? <p className="mt-0.5 truncate text-[10.5px] text-text-secondary">{subtitle}</p> : null}
      </div>
      {right}
    </div>
  );
}

function GlobalThreatMap() {
  const [tooltip, setTooltip] = React.useState<string | null>(null);
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-surface-2">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 148, center: [10, 10] }}
        className="h-full w-full"
      >
        <Geographies geography={WORLD_GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--surface-3)"
                stroke="var(--border-default)"
                strokeWidth={0.5}
                style={{ outline: "none" }}
              />
            ))
          }
        </Geographies>

        {GLOBAL_ARCS.map(([from, to], i) => (
          <GeoLine
            key={i}
            from={from}
            to={to}
            stroke="var(--color-error)"
            strokeWidth={0.75}
            strokeOpacity={0.35}
            strokeLinecap="round"
          />
        ))}

        {GLOBAL_REGIONS.map((region) => (
          <Marker
            key={region.label}
            coordinates={region.coords}
            onMouseEnter={() => setTooltip(region.label)}
            onMouseLeave={() => setTooltip(null)}
          >
            <circle r={region.r} fill={regionColor(region.count)} fillOpacity={0.22} />
            <circle r={region.r * 0.55} fill={regionColor(region.count)} fillOpacity={0.4} />
            <circle r={4} fill={regionColor(region.count)} stroke="var(--surface-1)" strokeWidth={1.5} />
          </Marker>
        ))}

        {GLOBAL_REGIONS.map((region) => (
          <Marker key={`${region.label}-label`} coordinates={region.coords}>
            <text
              textAnchor="middle"
              y={-region.r - 6}
              fontSize={9}
              fontWeight={700}
              fill="var(--text-primary)"
              style={{ pointerEvents: "none" }}
            >
              {region.count}
            </text>
            <text
              textAnchor="middle"
              y={-region.r - 16}
              fontSize={8}
              fill="var(--text-secondary)"
              style={{ pointerEvents: "none" }}
            >
              {region.label}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {tooltip ? (
        <div className="pointer-events-none absolute left-2 top-2 rounded-md bg-text-primary px-2 py-1 text-[10px] font-medium text-surface-1 shadow-md">
          {tooltip}
        </div>
      ) : null}

      <Legend />
    </div>
  );
}

function Legend() {
  return (
    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-2.5 rounded-md bg-surface-1/80 px-2 py-1 text-[9px] text-text-secondary backdrop-blur-sm">
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-error" /> Critical
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-warning" /> High
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#2a78d6" }} /> Medium
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/50" /> Low
      </span>
    </div>
  );
}

function IndiaThreatMap() {
  const [active, setActive] = React.useState<(typeof INDIA_CITIES)[number] | null>(INDIA_CITIES[0]);
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-surface-2">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 950, center: [82, 22] }}
        className="h-full w-full"
      >
        <Geographies geography={INDIA_GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--surface-3)"
                stroke="var(--border-default)"
                strokeWidth={0.6}
                style={{ outline: "none" }}
              />
            ))
          }
        </Geographies>

        {INDIA_CITIES.map((city) => (
          <Marker
            key={city.label}
            coordinates={city.coords}
            onMouseEnter={() => setActive(city)}
          >
            <circle r={9} fill={indiaMarkerColor(city.count)} fillOpacity={0.2} />
            <circle r={4.5} fill={indiaMarkerColor(city.count)} fillOpacity={0.45} />
            <circle r={2} fill={indiaMarkerColor(city.count)} stroke="var(--surface-1)" strokeWidth={1} />
          </Marker>
        ))}
      </ComposableMap>

      {active ? (
        <div
          className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-full items-center gap-1 rounded-md bg-text-primary px-1.5 py-0.5 text-[9px] font-medium text-surface-1 shadow-md"
          style={{ left: "44%", top: "30%" }}
        >
          {active.label} · {active.count} threats
        </div>
      ) : null}

      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-2 text-[9px] text-text-secondary">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-error" /> &gt; 500
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#eda100" }} /> 101–500
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#f5c542" }} /> 11–100
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-info" /> 1–10
        </span>
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border-default bg-surface-1 px-2.5 py-1.5 text-[10.5px] shadow-lg">
      <p className="mb-1 font-semibold text-text-primary">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-text-secondary">{p.dataKey}:</span>
          <span className="font-semibold text-text-primary">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

const TREND_COLORS: Record<string, string> = {
  Critical: "#e34948",
  High: "#eda100",
  Medium: "#2a78d6",
  Low: "#9ec5f4",
};

export function SocWallHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 items-center gap-1.5 rounded-lg bg-success/10 px-3 text-[12px] font-medium text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
        Live
      </span>
    </div>
  );
}

export function SocWallCenter() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-surface-0">
      <div className="grid shrink-0 grid-cols-7 gap-2.5 border-b border-border-default px-4 py-3">
        {STAT_TILES.map(({ icon: Icon, iconClass, value, label, delta, trend }) => (
          <div
            key={label}
            className="flex flex-col gap-2 rounded-xl border border-border-default bg-surface-1 p-3"
          >
            <div className="flex items-center justify-between">
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", iconClass)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "text-[10.5px] font-semibold",
                  trend === "up" ? "text-error" : "text-success"
                )}
              >
                {trend === "up" ? "↑" : "↓"} {delta}
              </span>
            </div>
            <div>
              <p className="text-[19px] font-bold leading-none tabular-nums text-text-primary">{value}</p>
              <p className="mt-1.5 truncate text-[11px] font-medium text-text-secondary">{label}</p>
              <p className="truncate text-[10px] text-text-secondary/70">{STAT_SUBLABEL[label]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-[1.15] grid-cols-[1.7fr_1fr] gap-3 p-3">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <PanelHeader
            title="Global Threat Activity"
            subtitle="Live attack traffic and threat intelligence"
            right={<RangeSelect />}
          />
          <div className="flex min-h-0 flex-1 flex-col px-4 pb-3">
            <GlobalThreatMap />
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <PanelHeader
            title="Threat Activity – India"
            subtitle="Live threat density across regions"
            right={<RangeSelect />}
          />
          <div className="flex min-h-0 flex-1 gap-3 px-4 pb-3">
            <div className="flex min-h-0 flex-[1.3] flex-col">
              <IndiaThreatMap />
            </div>
            <div className="flex w-[128px] shrink-0 flex-col gap-2 overflow-y-auto">
              <p className="text-[10.5px] font-semibold text-text-secondary">Top Cities by Threats</p>
              {INDIA_CITIES.map((c) => (
                <div key={c.label} className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="truncate font-medium text-text-primary">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-semibold tabular-nums text-text-primary">{c.count}</span>
                    <span className="font-medium text-error">{c.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-4 gap-3 px-3 pb-3">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <PanelHeader title="Top Threat Categories" />
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3">
            <div className="flex flex-col gap-2.5">
              {THREAT_CATEGORIES.map((item) => {
                const max = THREAT_CATEGORIES[0].count;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-[108px] shrink-0 truncate text-[10.5px] text-text-secondary">{item.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className={cn("h-full rounded-full", item.barClass)}
                        style={{ width: `${Math.max((item.count / max) * 100, 4)}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-[10.5px] font-semibold tabular-nums text-text-primary">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <PanelHeader title="Attack Source Countries" />
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3">
            <div className="flex flex-col gap-2.5">
              {ATTACK_SOURCES.map((c) => (
                <div key={c.label} className="flex items-center gap-2 text-[11px]">
                  <span className="text-[14px] leading-none">{c.flag}</span>
                  <span className="flex-1 truncate text-text-secondary">{c.label}</span>
                  <span className="font-semibold tabular-nums text-text-primary">{c.count}</span>
                  <span className="w-9 shrink-0 text-right text-[10px] font-medium text-error">{c.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <PanelHeader title="Threats by Environment" />
          <div className="flex min-h-0 flex-1 items-center gap-3 px-4 pb-3">
            <div className="relative h-[112px] w-[112px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ENV_DATA}
                    dataKey="value"
                    nameKey="label"
                    innerRadius="68%"
                    outerRadius="100%"
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {ENV_DATA.map((d) => (
                      <Cell key={d.label} fill={d.hex} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[16px] font-bold tabular-nums text-text-primary">
                  {ENV_TOTAL.toLocaleString()}
                </span>
                <span className="text-[8.5px] leading-tight text-text-secondary">Total Threats</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              {ENV_DATA.map((d) => (
                <div key={d.label} className="flex items-center gap-1.5 text-[10.5px]">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.hex }} />
                  <span className="flex-1 truncate text-text-secondary">{d.label}</span>
                  <span className="font-semibold tabular-nums text-text-primary">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
          <PanelHeader title="Threat Trends" right={<RangeSelect />} />
          <div className="flex min-h-0 flex-1 flex-col px-2 pb-2">
            <div className="mb-1 flex items-center gap-2.5 px-2">
              {Object.entries(TREND_COLORS).map(([k, hex]) => (
                <span key={k} className="flex items-center gap-1 text-[9.5px] text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: hex }} />
                  {k}
                </span>
              ))}
            </div>
            <div className="min-h-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid stroke="var(--border-default)" vertical={false} />
                  <XAxis
                    dataKey="t"
                    ticks={TREND_HOURS}
                    tick={{ fontSize: 9, fill: "var(--text-secondary)" }}
                    axisLine={{ stroke: "var(--border-default)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "var(--text-secondary)" }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  {Object.entries(TREND_COLORS).map(([k, hex]) => (
                    <Line
                      key={k}
                      type="monotone"
                      dataKey={k}
                      stroke={hex}
                      strokeWidth={1.75}
                      dot={false}
                      activeDot={{ r: 3 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
