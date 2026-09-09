"use client";

import * as React from "react";
import {
  AlertTriangle,
  Bell,
  Clock,
  FileText,
  Info,
  Timer,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Severity = "Critical" | "High" | "Medium" | "Low";

const STATS: Array<{
  icon: React.ElementType;
  iconClass: string;
  value: string;
  label: string;
  delta: string;
  deltaClass: string;
}> = [
  {
    icon: AlertTriangle,
    iconClass: "bg-error/10 text-error",
    value: "18",
    label: "Critical Alerts",
    delta: "↑ 3",
    deltaClass: "text-error",
  },
  {
    icon: Bell,
    iconClass: "bg-warning/10 text-warning",
    value: "47",
    label: "Open Alerts",
    delta: "↑ 12",
    deltaClass: "text-warning",
  },
  {
    icon: FileText,
    iconClass: "bg-info/10 text-info",
    value: "6",
    label: "Active Incidents",
    delta: "↑ 2",
    deltaClass: "text-info",
  },
  {
    icon: Clock,
    iconClass: "bg-success/10 text-success",
    value: "28 min",
    label: "Mean Time to Detect (MTTD)",
    delta: "↓ 35%",
    deltaClass: "text-success",
  },
  {
    icon: Timer,
    iconClass: "bg-success/10 text-success",
    value: "2 h 14 min",
    label: "Mean Time to Respond (MTTR)",
    delta: "↓ 42%",
    deltaClass: "text-success",
  },
];

const SEVERITY_HEX: Record<Severity, string> = {
  Critical: "#e34948",
  High: "#eda100",
  Medium: "#2a78d6",
  Low: "#9ec5f4",
};

const TREND_HOURS = ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"];

const TREND_SERIES: Array<{ severity: Severity; points: number[] }> = [
  { severity: "Critical", points: [3, 5, 4, 8, 10, 7, 9, 12, 9, 6, 5, 4] },
  { severity: "High", points: [10, 14, 12, 18, 22, 19, 24, 28, 24, 18, 14, 11] },
  { severity: "Medium", points: [22, 28, 26, 34, 40, 36, 42, 46, 40, 32, 26, 20] },
  { severity: "Low", points: [8, 10, 9, 12, 14, 13, 15, 16, 14, 11, 9, 7] },
];

const SEVERITY_BREAKDOWN: Array<{ severity: Severity; count: number; pct: number }> = [
  { severity: "Critical", count: 18, pct: 7 },
  { severity: "High", count: 47, pct: 19 },
  { severity: "Medium", count: 118, pct: 48 },
  { severity: "Low", count: 64, pct: 26 },
];

const TOTAL_ALERTS = SEVERITY_BREAKDOWN.reduce((sum, s) => sum + s.count, 0);

const THREAT_TYPES: Array<{ label: string; count: number }> = [
  { label: "Malware", count: 72 },
  { label: "Suspicious Activity", count: 54 },
  { label: "Policy Violation", count: 38 },
  { label: "Brute Force", count: 26 },
  { label: "Data Exfiltration", count: 18 },
  { label: "Lateral Movement", count: 16 },
  { label: "Privilege Escalation", count: 14 },
  { label: "Others", count: 9 },
];

const TOP_ASSETS: Array<{ asset: string; alerts: number; change: string }> = [
  { asset: "FIN-WS-023", alerts: 54, change: "↑ 120%" },
  { asset: "HR-WS-087", alerts: 36, change: "↑ 80%" },
  { asset: "DEV-LT-441", alerts: 28, change: "↑ 75%" },
  { asset: "10.10.12.14", alerts: 22, change: "↑ 47%" },
  { asset: "APPSRV-03", alerts: 18, change: "↑ 38%" },
];

const SOURCE_TABS = ["Geographic", "Network", "Actor Type"];

const SOURCE_COUNTRIES: Array<{ label: string; count: number; flag: string }> = [
  { label: "United States", count: 89, flag: "🇺🇸" },
  { label: "Russia", count: 24, flag: "🇷🇺" },
  { label: "China", count: 18, flag: "🇨🇳" },
  { label: "Germany", count: 11, flag: "🇩🇪" },
  { label: "Singapore", count: 9, flag: "🇸🇬" },
];

const WORLD_DOTS: Array<{ x: number; y: number }> = (() => {
  const rows: Array<[number, number, number]> = [
    [10, 22, 16],
    [12, 20, 20],
    [14, 18, 26],
    [16, 15, 34],
    [18, 13, 40],
    [20, 12, 46],
    [22, 11, 50],
    [24, 10, 54],
    [26, 12, 56],
    [28, 15, 58],
    [30, 18, 60],
    [32, 20, 62],
    [34, 22, 64],
    [36, 24, 66],
    [38, 26, 68],
    [40, 28, 70],
    [42, 30, 72],
    [44, 32, 74],
    [46, 34, 76],
    [48, 36, 78],
    [50, 38, 80],
  ];
  const pts: Array<{ x: number; y: number }> = [];
  let seed = 0;
  for (const [y, xMin, xMax] of rows) {
    for (let x = xMin; x <= xMax; x += 2.4) {
      seed += 1;
      const pseudoRandom = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
      if (Math.abs(pseudoRandom) > 0.32) pts.push({ x, y });
    }
  }
  return pts;
})();

const MAP_POINTS: Array<{ x: number; y: number; size: "lg" | "md" | "sm"; label?: string }> = [
  { x: 20, y: 34, size: "md" },
  { x: 24, y: 40, size: "sm" },
  { x: 50, y: 30, size: "lg", label: "Russia" },
  { x: 58, y: 33, size: "sm" },
  { x: 64, y: 40, size: "md" },
  { x: 68, y: 38, size: "sm" },
  { x: 46, y: 38, size: "sm" },
  { x: 40, y: 33, size: "sm" },
];

const ALERT_STATUS: Array<{ label: string; count: number; hex: string }> = [
  { label: "New", count: 12, hex: "#e34948" },
  { label: "Investigating", count: 18, hex: "#2a78d6" },
  { label: "Containing", count: 9, hex: "#eda100" },
  { label: "Resolved", count: 8, hex: "#1baf7a" },
];

const OPEN_ALERTS_TOTAL = ALERT_STATUS.reduce((sum, s) => sum + s.count, 0);

function donutSegments(items: Array<{ count: number; hex: string }>, total: number, r: number, gapDeg = 3) {
  let angle = -90;
  return items.map((item) => {
    const sweep = (item.count / total) * 360 - gapDeg;
    const start = angle;
    const end = angle + Math.max(sweep, 0);
    angle += (item.count / total) * 360;
    return { ...item, start, end, r };
  });
}

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

function Donut({
  segments,
  size = 128,
  strokeWidth = 16,
  centerValue,
  centerLabel,
}: {
  segments: ReturnType<typeof donutSegments>;
  size?: number;
  strokeWidth?: number;
  centerValue: string;
  centerLabel: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth / 2 - 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {segments.map((seg, i) => (
          <path
            key={i}
            d={arcPath(cx, cy, r, seg.start, seg.end)}
            fill="none"
            stroke={seg.hex}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[20px] font-bold tabular-nums text-text-primary">{centerValue}</span>
        <span className="text-[10.5px] text-text-secondary">{centerLabel}</span>
      </div>
    </div>
  );
}

function AlertTrendsChart() {
  const width = 420;
  const height = 150;
  const padTop = 8;
  const padBottom = 20;
  const padLeft = 24;
  const padRight = 4;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const maxY = 60;
  const n = TREND_SERIES[0].points.length;

  const stacked = TREND_SERIES.map((s, si) => {
    return s.points.map((v, i) => {
      const base = TREND_SERIES.slice(0, si).reduce((sum, prior) => sum + prior.points[i], 0);
      return { base, top: base + v };
    });
  });

  const xAt = (i: number) => padLeft + (i / (n - 1)) * plotW;
  const yAt = (v: number) => padTop + plotH - (v / maxY) * plotH;

  const areaPath = (series: Array<{ base: number; top: number }>) => {
    const topPts = series.map((s, i) => `${xAt(i)},${yAt(s.top)}`).join(" L ");
    const botPts = series
      .slice()
      .reverse()
      .map((s, i) => `${xAt(n - 1 - i)},${yAt(s.base)}`)
      .join(" L ");
    return `M ${topPts} L ${botPts} Z`;
  };

  const linePath = (series: Array<{ base: number; top: number }>) =>
    `M ${series.map((s, i) => `${xAt(i)},${yAt(s.top)}`).join(" L ")}`;

  const yTicks = [0, 20, 40, 60];

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        {TREND_SERIES.map((s) => (
          <span key={s.severity} className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: SEVERITY_HEX[s.severity] }} />
            {s.severity}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={padLeft}
              x2={width - padRight}
              y1={yAt(t)}
              y2={yAt(t)}
              stroke="var(--border-default)"
              strokeWidth={1}
            />
            <text x={0} y={yAt(t) + 3} fontSize={9} fill="var(--text-secondary)">
              {t}
            </text>
          </g>
        ))}
        {stacked.map((series, si) => (
          <path key={si} d={areaPath(series)} fill={SEVERITY_HEX[TREND_SERIES[si].severity]} opacity={0.16} />
        ))}
        {stacked.map((series, si) => (
          <path
            key={si}
            d={linePath(series)}
            fill="none"
            stroke={SEVERITY_HEX[TREND_SERIES[si].severity]}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {TREND_HOURS.map((label, i) => (
          <text
            key={label}
            x={xAt(i * (n - 1) / (TREND_HOURS.length - 1))}
            y={height - 4}
            fontSize={9}
            textAnchor="middle"
            fill="var(--text-secondary)"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function HBarList({ items, max }: { items: Array<{ label: string; count: number }>; max: number }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="w-[120px] shrink-0 truncate text-[11.5px] text-text-secondary">{item.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-brand-primary"
              style={{ width: `${Math.max((item.count / max) * 100, 4)}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-[11.5px] font-semibold tabular-nums text-text-primary">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ThreatMonitorHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Clock className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Last 24 hours
      </button>
      <span className="flex h-8 items-center gap-1.5 rounded-lg bg-success/10 px-3 text-[12px] font-medium text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Live
      </span>
    </div>
  );
}

function PanelHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3.5 pb-3">
      <h2 className="flex items-center gap-1.5 text-[12.5px] font-bold text-text-primary">
        {title}
        <Info className="h-3 w-3 text-text-secondary" aria-hidden="true" />
      </h2>
      {right}
    </div>
  );
}

function RangeSelect() {
  return (
    <button
      type="button"
      className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11px] font-medium text-text-secondary hover:bg-surface-2"
    >
      Last 24 hours
      <ChevronDown className="h-3 w-3 shrink-0" aria-hidden="true" />
    </button>
  );
}

export function ThreatMonitorDashboard() {
  const [sourceTab, setSourceTab] = React.useState(0);
  const severitySegments = donutSegments(
    SEVERITY_BREAKDOWN.map((s) => ({ count: s.count, hex: SEVERITY_HEX[s.severity] })),
    TOTAL_ALERTS,
    48
  );
  const statusSegments = donutSegments(ALERT_STATUS, OPEN_ALERTS_TOTAL, 48);
  const maxThreatType = Math.max(...THREAT_TYPES.map((t) => t.count));

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="grid shrink-0 grid-cols-5 gap-3 border-b border-border-default px-6 py-4">
        {STATS.map(({ icon: Icon, iconClass, value, label, delta, deltaClass }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-xl border border-border-default bg-surface-1 p-3.5"
          >
            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", iconClass)}>
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[19px] font-bold tabular-nums text-text-primary">{value}</span>
                <span className={cn("text-[11px] font-semibold", deltaClass)}>{delta}</span>
              </div>
              <p className="mt-0.5 truncate text-[11.5px] text-text-secondary">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-2 gap-3 overflow-y-auto p-4">
        <div className="grid min-h-[220px] grid-cols-3 gap-3">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
            <PanelHeader title="Alert Trends" right={<RangeSelect />} />
            <div className="flex min-h-0 flex-1 items-center px-4 pb-3">
              <AlertTrendsChart />
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
            <PanelHeader title="Alerts by Severity" />
            <div className="flex min-h-0 flex-1 items-center gap-4 px-4 pb-4">
              <Donut segments={severitySegments} centerValue={String(TOTAL_ALERTS)} centerLabel="Total Alerts" />
              <div className="flex flex-1 flex-col gap-2">
                {SEVERITY_BREAKDOWN.map((s) => (
                  <div key={s.severity} className="flex items-center gap-2 text-[11.5px]">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: SEVERITY_HEX[s.severity] }}
                    />
                    <span className="flex-1 truncate text-text-secondary">{s.severity}</span>
                    <span className="font-semibold tabular-nums text-text-primary">{s.count}</span>
                    <span className="w-8 shrink-0 text-right text-text-secondary">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
            <PanelHeader title="Top Threat Types" right={<RangeSelect />} />
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <HBarList items={THREAT_TYPES} max={maxThreatType} />
            </div>
          </div>
        </div>

        <div className="grid min-h-[220px] grid-cols-3 gap-3">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
            <PanelHeader title="Top Attacked Assets" right={<RangeSelect />} />
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-[10.5px] text-text-secondary">
                    <th className="pb-1.5 font-medium">Asset</th>
                    <th className="pb-1.5 text-right font-medium">Alerts</th>
                    <th className="pb-1.5 text-right font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_ASSETS.map((a) => (
                    <tr key={a.asset} className="border-t border-border-default text-[11.5px]">
                      <td className="truncate py-2 font-medium text-text-primary">{a.asset}</td>
                      <td className="py-2 text-right tabular-nums text-text-secondary">{a.alerts}</td>
                      <td className="py-2 text-right font-semibold tabular-nums text-error">{a.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
            <PanelHeader
              title="Threats by Source"
              right={
                <div className="flex items-center gap-0.5 rounded-md bg-surface-2 p-0.5">
                  {SOURCE_TABS.map((tab, i) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setSourceTab(i)}
                      className={cn(
                        "rounded px-2 py-1 text-[10.5px] font-medium transition-colors duration-150",
                        sourceTab === i
                          ? "bg-surface-1 text-text-primary shadow-sm"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="flex min-h-0 flex-1 gap-3 px-4 pb-3">
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-surface-2">
                <svg viewBox="0 0 100 60" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                  <rect x="0" y="0" width="100" height="60" fill="var(--surface-2)" />
                  {WORLD_DOTS.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={0.55} fill="var(--border-default)" />
                  ))}
                  {MAP_POINTS.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={p.size === "lg" ? 3 : p.size === "md" ? 2 : 1.3}
                      fill={p.size === "lg" ? "#e34948" : p.size === "md" ? "#eda100" : "#2a78d6"}
                      opacity={0.85}
                    />
                  ))}
                </svg>
                <div className="absolute left-[46%] top-[42%] flex -translate-x-1/2 -translate-y-full items-center gap-1 rounded-md bg-text-primary px-1.5 py-0.5 text-[9px] font-medium text-surface-1 shadow-md">
                  Russia · 24 alerts
                </div>
                <div className="absolute bottom-1.5 left-1.5 flex items-center gap-2 text-[9px] text-text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-error" /> &gt; 50
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-warning" /> 11–50
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-info" /> 1–10
                  </span>
                </div>
              </div>
              <div className="flex w-[132px] shrink-0 flex-col gap-1.5 overflow-y-auto">
                <p className="text-[10.5px] font-semibold text-text-secondary">Top Source Countries</p>
                {SOURCE_COUNTRIES.map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5 text-[11px]">
                    <span className="shrink-0">{c.flag}</span>
                    <span className="flex-1 truncate text-text-secondary">{c.label}</span>
                    <span className="font-semibold tabular-nums text-text-primary">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
            <PanelHeader title="Alert Status" />
            <div className="flex min-h-0 flex-1 items-center gap-4 px-4 pb-4">
              <Donut
                segments={statusSegments}
                centerValue={String(OPEN_ALERTS_TOTAL)}
                centerLabel="Open Alerts"
              />
              <div className="flex flex-1 flex-col gap-2">
                {ALERT_STATUS.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-[11.5px]">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.hex }} />
                    <span className="flex-1 truncate text-text-secondary">{s.label}</span>
                    <span className="font-semibold tabular-nums text-text-primary">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
