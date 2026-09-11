"use client";

import * as React from "react";
import {
  Bug,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Cpu,
  Download,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Network,
  Plus,
  Search,
  Server,
  Smartphone,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type RiskLevel = "Critical" | "High" | "Medium" | "Low";
type ModelType = "Application" | "Network" | "Cloud" | "Infrastructure" | "Mobile" | "API";
type DetailTab = "Overview" | "Attack Vectors" | "Mitigations" | "Assets" | "Notes";

type ThreatModel = {
  id: string;
  name: string;
  subtitle: string;
  type: ModelType;
  associatedAssets: number;
  riskLevel: RiskLevel;
  lastUpdated: string;
  status: string;
  activeSince: string;
  description: string;
  owner: string;
  reviewedBy: string;
  firstSeen: string;
  scope: string;
  confidence: "High" | "Medium" | "Low";
  tags: string[];
  topVectors: Array<{ id: string; name: string; count: number }>;
  exposure: Array<{ name: string; pct: number }>;
  relatedModels: Array<{ name: string; note: string }>;
  references: Array<{ label: string; date: string }>;
  activity: Array<{ month: string; findings: number; mitigated: number }>;
};

/* -------------------------------- dummy data -------------------------------- */

const TYPE_ICON: Record<ModelType, { icon: React.ElementType; className: string }> = {
  Application: { icon: FileText, className: "bg-brand-primary/10 text-brand-primary" },
  Network: { icon: Network, className: "bg-info/10 text-info" },
  Cloud: { icon: Cloud, className: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
  Infrastructure: { icon: Server, className: "bg-warning/10 text-warning" },
  Mobile: { icon: Smartphone, className: "bg-success/10 text-success" },
  API: { icon: Cpu, className: "bg-error/10 text-error" },
};

const RISK_STYLE: Record<RiskLevel, string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-warning/10 text-warning",
  Medium: "bg-info/10 text-info",
  Low: "bg-success/10 text-success",
};

const RISK_ORDER: Record<RiskLevel, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

const ACTIVITY_MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

function buildActivity(seed: number) {
  return ACTIVITY_MONTHS.map((month, i) => ({
    month,
    findings: 6 + ((seed + i * 3) % 22),
    mitigated: 4 + ((seed + i * 5) % 14),
  }));
}

const MODELS: ThreatModel[] = [
  {
    id: "tm-1",
    name: "Customer Payment Gateway",
    subtitle: "PCI-DSS Scoped Service",
    type: "Application",
    associatedAssets: 6,
    riskLevel: "Critical",
    lastUpdated: "5 Sep 2026",
    status: "Active",
    activeSince: "Mar 2024",
    description:
      "STRIDE-based threat model covering the customer-facing payment gateway. Captures spoofing, tampering and information disclosure risks across the checkout, tokenization, and settlement flows.",
    owner: "Aditi Sharma",
    reviewedBy: "Security Architecture Board",
    firstSeen: "Mar 2024",
    scope: "Checkout, Tokenization, Settlement",
    confidence: "High",
    tags: ["stride", "pci-dss", "payments", "external-facing"],
    topVectors: [
      { id: "TV-01", name: "Card data interception (MITM)", count: 24 },
      { id: "TV-02", name: "Token replay attack", count: 18 },
      { id: "TV-03", name: "API rate-limit bypass", count: 16 },
      { id: "TV-04", name: "Webhook signature spoofing", count: 14 },
      { id: "TV-05", name: "Settlement race condition", count: 12 },
    ],
    exposure: [
      { name: "External Attackers", pct: 42 },
      { name: "Third-party Vendors", pct: 28 },
      { name: "Insider (Privileged)", pct: 14 },
      { name: "Supply Chain", pct: 10 },
      { name: "Other", pct: 6 },
    ],
    relatedModels: [
      { name: "Vendor API Gateway", note: "Shares auth boundary" },
      { name: "Fraud Scoring Service", note: "Consumes same events" },
      { name: "Merchant Onboarding", note: "Overlapping actors" },
    ],
    references: [
      { label: "PCI-DSS v4.0 Scope Doc", date: "1 Sep 2026" },
      { label: "STRIDE Model - Payment Flow v3", date: "28 Aug 2026" },
      { label: "Pen Test Findings - Q3 2026", date: "24 Aug 2026" },
    ],
    activity: buildActivity(3),
  },
  {
    id: "tm-2",
    name: "Employee VPN Gateway",
    subtitle: "Remote Access Infrastructure",
    type: "Network",
    associatedAssets: 4,
    riskLevel: "High",
    lastUpdated: "4 Sep 2026",
    status: "Active",
    activeSince: "Jan 2023",
    description:
      "Threat model for remote-access VPN concentrators covering credential stuffing, split-tunnel misconfiguration, and lateral movement from compromised endpoints.",
    owner: "Rohan Kapoor",
    reviewedBy: "Network Security Team",
    firstSeen: "Jan 2023",
    scope: "VPN Concentrators, RADIUS, MFA Gateway",
    confidence: "High",
    tags: ["network", "remote-access", "mfa", "vpn"],
    topVectors: [
      { id: "TV-01", name: "Credential stuffing", count: 31 },
      { id: "TV-02", name: "Split-tunnel data exfiltration", count: 19 },
      { id: "TV-03", name: "MFA fatigue attack", count: 17 },
      { id: "TV-04", name: "Session hijacking", count: 11 },
      { id: "TV-05", name: "RADIUS server spoofing", count: 9 },
    ],
    exposure: [
      { name: "External Attackers", pct: 55 },
      { name: "Compromised Endpoints", pct: 24 },
      { name: "Insider (Privileged)", pct: 12 },
      { name: "Third-party Vendors", pct: 6 },
      { name: "Other", pct: 3 },
    ],
    relatedModels: [
      { name: "Corporate Identity Provider", note: "Shares MFA policy" },
      { name: "Endpoint Fleet Management", note: "Device posture check" },
    ],
    references: [
      { label: "VPN Hardening Guideline", date: "2 Sep 2026" },
      { label: "MFA Fatigue Advisory - CERT-In", date: "30 Aug 2026" },
    ],
    activity: buildActivity(7),
  },
  {
    id: "tm-3",
    name: "Multi-Tenant Data Lake",
    subtitle: "Cloud Analytics Platform",
    type: "Cloud",
    associatedAssets: 9,
    riskLevel: "Critical",
    lastUpdated: "3 Sep 2026",
    status: "Active",
    activeSince: "Jun 2023",
    description:
      "Threat model for the multi-tenant cloud data lake, focused on tenant isolation failures, misconfigured storage buckets, and privilege escalation via IAM role chaining.",
    owner: "Priya Nair",
    reviewedBy: "Cloud Security Guild",
    firstSeen: "Jun 2023",
    scope: "Storage Buckets, IAM Roles, Query Engine",
    confidence: "Medium",
    tags: ["cloud", "multi-tenant", "iam", "data-lake"],
    topVectors: [
      { id: "TV-01", name: "Tenant isolation bypass", count: 22 },
      { id: "TV-02", name: "Public storage bucket exposure", count: 20 },
      { id: "TV-03", name: "IAM role chaining escalation", count: 15 },
      { id: "TV-04", name: "Query engine injection", count: 13 },
      { id: "TV-05", name: "Snapshot data leakage", count: 8 },
    ],
    exposure: [
      { name: "External Attackers", pct: 30 },
      { name: "Other Tenants", pct: 34 },
      { name: "Insider (Privileged)", pct: 18 },
      { name: "Third-party Vendors", pct: 12 },
      { name: "Other", pct: 6 },
    ],
    relatedModels: [
      { name: "Customer Payment Gateway", note: "Shares data pipeline" },
      { name: "ML Feature Store", note: "Downstream consumer" },
      { name: "Analytics API", note: "Query engine access" },
    ],
    references: [
      { label: "Cloud IAM Review - Aug 2026", date: "27 Aug 2026" },
      { label: "Tenant Isolation Test Report", date: "20 Aug 2026" },
    ],
    activity: buildActivity(11),
  },
  {
    id: "tm-4",
    name: "Core Banking Mainframe",
    subtitle: "Legacy Transaction Processing",
    type: "Infrastructure",
    associatedAssets: 3,
    riskLevel: "High",
    lastUpdated: "1 Sep 2026",
    status: "Active",
    activeSince: "Legacy",
    description:
      "Threat model covering the legacy mainframe transaction processing core, including RACF misconfiguration, batch job tampering, and unpatched middleware exposure.",
    owner: "Harsh Kapoor",
    reviewedBy: "Legacy Systems Team",
    firstSeen: "Legacy",
    scope: "RACF, Batch Jobs, Middleware Gateway",
    confidence: "Medium",
    tags: ["mainframe", "legacy", "banking", "batch"],
    topVectors: [
      { id: "TV-01", name: "RACF privilege misconfiguration", count: 17 },
      { id: "TV-02", name: "Batch job tampering", count: 14 },
      { id: "TV-03", name: "Unpatched middleware CVEs", count: 12 },
      { id: "TV-04", name: "Terminal emulation spoofing", count: 7 },
    ],
    exposure: [
      { name: "Insider (Privileged)", pct: 38 },
      { name: "Third-party Vendors", pct: 26 },
      { name: "External Attackers", pct: 20 },
      { name: "Other", pct: 16 },
    ],
    relatedModels: [{ name: "Batch Settlement Pipeline", note: "Shares job scheduler" }],
    references: [{ label: "RACF Access Review - Q3", date: "18 Aug 2026" }],
    activity: buildActivity(1),
  },
  {
    id: "tm-5",
    name: "Field Agent Mobile App",
    subtitle: "Android / iOS Client",
    type: "Mobile",
    associatedAssets: 2,
    riskLevel: "Medium",
    lastUpdated: "29 Aug 2026",
    status: "Active",
    activeSince: "Sep 2024",
    description:
      "Threat model for the field agent mobile application, covering insecure local storage, certificate pinning bypass, and jailbreak/root detection evasion.",
    owner: "Anita Singh",
    reviewedBy: "Mobile Security Team",
    firstSeen: "Sep 2024",
    scope: "Local Storage, TLS Pinning, Biometric Unlock",
    confidence: "Medium",
    tags: ["mobile", "android", "ios", "client-side"],
    topVectors: [
      { id: "TV-01", name: "Insecure local storage", count: 15 },
      { id: "TV-02", name: "Certificate pinning bypass", count: 11 },
      { id: "TV-03", name: "Root/jailbreak detection evasion", count: 9 },
      { id: "TV-04", name: "Deep link hijacking", count: 6 },
    ],
    exposure: [
      { name: "Physical Device Theft", pct: 40 },
      { name: "External Attackers", pct: 32 },
      { name: "Malicious Apps", pct: 18 },
      { name: "Other", pct: 10 },
    ],
    relatedModels: [{ name: "Corporate Identity Provider", note: "SSO integration" }],
    references: [{ label: "Mobile AppSec Baseline v2", date: "14 Aug 2026" }],
    activity: buildActivity(5),
  },
  {
    id: "tm-6",
    name: "Partner Integration API",
    subtitle: "B2B REST/GraphQL Gateway",
    type: "API",
    associatedAssets: 5,
    riskLevel: "High",
    lastUpdated: "26 Aug 2026",
    status: "Active",
    activeSince: "Nov 2023",
    description:
      "Threat model for the partner-facing API gateway, focused on broken object-level authorization, GraphQL introspection abuse, and rate-limit evasion by partners.",
    owner: "Devops Bot",
    reviewedBy: "API Security Guild",
    firstSeen: "Nov 2023",
    scope: "REST Endpoints, GraphQL Schema, API Keys",
    confidence: "High",
    tags: ["api", "graphql", "b2b", "authorization"],
    topVectors: [
      { id: "TV-01", name: "Broken object-level authorization", count: 26 },
      { id: "TV-02", name: "GraphQL introspection abuse", count: 16 },
      { id: "TV-03", name: "API key leakage", count: 13 },
      { id: "TV-04", name: "Rate-limit evasion", count: 10 },
      { id: "TV-05", name: "Mass assignment", count: 8 },
    ],
    exposure: [
      { name: "Partner Organizations", pct: 36 },
      { name: "External Attackers", pct: 34 },
      { name: "Compromised Partner Keys", pct: 20 },
      { name: "Other", pct: 10 },
    ],
    relatedModels: [
      { name: "Customer Payment Gateway", note: "Shared rate limiter" },
      { name: "Merchant Onboarding", note: "Partner key issuance" },
    ],
    references: [{ label: "GraphQL Security Checklist", date: "10 Aug 2026" }],
    activity: buildActivity(9),
  },
  {
    id: "tm-7",
    name: "Merchant Onboarding Service",
    subtitle: "KYC & Provisioning Workflow",
    type: "Application",
    associatedAssets: 4,
    riskLevel: "Medium",
    lastUpdated: "22 Aug 2026",
    status: "Active",
    activeSince: "Feb 2024",
    description:
      "Threat model for merchant onboarding, covering document forgery, identity verification bypass, and premature credential provisioning before KYC completion.",
    owner: "Aditi Sharma",
    reviewedBy: "Security Architecture Board",
    firstSeen: "Feb 2024",
    scope: "KYC Workflow, Document Verification, Provisioning",
    confidence: "Medium",
    tags: ["kyc", "onboarding", "identity", "workflow"],
    topVectors: [
      { id: "TV-01", name: "Document forgery", count: 13 },
      { id: "TV-02", name: "Identity verification bypass", count: 10 },
      { id: "TV-03", name: "Premature credential issuance", count: 7 },
    ],
    exposure: [
      { name: "External Attackers", pct: 44 },
      { name: "Fraudulent Merchants", pct: 38 },
      { name: "Other", pct: 18 },
    ],
    relatedModels: [{ name: "Customer Payment Gateway", note: "Downstream provisioning" }],
    references: [{ label: "KYC Fraud Patterns 2026", date: "5 Aug 2026" }],
    activity: buildActivity(6),
  },
  {
    id: "tm-8",
    name: "ML Fraud Scoring Service",
    subtitle: "Real-time Inference Pipeline",
    type: "Cloud",
    associatedAssets: 3,
    riskLevel: "Low",
    lastUpdated: "20 Aug 2026",
    status: "Active",
    activeSince: "Aug 2024",
    description:
      "Threat model for the real-time fraud scoring pipeline, covering model poisoning, feature store tampering, and adversarial input evasion.",
    owner: "Rohan Kapoor",
    reviewedBy: "ML Platform Team",
    firstSeen: "Aug 2024",
    scope: "Feature Store, Inference API, Model Registry",
    confidence: "Low",
    tags: ["ml", "fraud", "inference", "model-security"],
    topVectors: [
      { id: "TV-01", name: "Adversarial input evasion", count: 9 },
      { id: "TV-02", name: "Feature store tampering", count: 6 },
      { id: "TV-03", name: "Model registry poisoning", count: 4 },
    ],
    exposure: [
      { name: "External Attackers", pct: 48 },
      { name: "Insider (Privileged)", pct: 30 },
      { name: "Other", pct: 22 },
    ],
    relatedModels: [{ name: "Multi-Tenant Data Lake", note: "Feature ingestion" }],
    references: [{ label: "Adversarial ML Threat Matrix", date: "1 Aug 2026" }],
    activity: buildActivity(2),
  },
];

/* -------------------------------- small ui -------------------------------- */

function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={cn(
        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors duration-150",
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

function Dropdown({ label, width = "w-40" }: { label: string; width?: string }) {
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
        <Filter className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        {label}
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

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border-default bg-surface-1 px-2.5 py-1.5 text-[10.5px] shadow-lg">
      <p className="mb-1 font-semibold text-text-primary">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-text-secondary">{p.name}:</span>
          <span className="font-semibold text-text-primary">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- header meta -------------------------------- */

export function ThreatModelingHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2">
        <Download className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Export
      </button>
      <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        New Threat Model
      </button>
    </div>
  );
}

/* -------------------------------- left: model list -------------------------------- */

function ModelList({
  rows,
  selectedId,
  onSelect,
  checked,
  toggleChecked,
  search,
  setSearch,
}: {
  rows: ThreatModel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  checked: Set<string>;
  toggleChecked: (id: string) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3.5 pb-2.5">
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-bold text-text-primary">Threat Models</h1>
          <p className="truncate text-[11px] text-text-secondary">{MODELS.length} models tracked</p>
        </div>
        <Dropdown label="Filters" width="w-40" />
      </div>

      <div className="shrink-0 px-4 pb-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models, assets, tags..."
            className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
        <span className="w-3.5" />
        <span className="flex-1">Model</span>
        <span className="w-14 text-right">Risk</span>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto pb-2">
        {rows.map((m) => {
          const { icon: Icon, className } = TYPE_ICON[m.type];
          const isActive = m.id === selectedId;
          return (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(m.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(m.id);
                }
              }}
              className={cn(
                "flex w-full cursor-pointer items-start gap-2 border-l-2 px-4 py-2.5 text-left transition-colors duration-100 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                isActive ? "border-brand-primary bg-brand-primary/5" : "border-transparent"
              )}
            >
              <span className="mt-0.5 shrink-0">
                <Checkbox checked={checked.has(m.id)} onChange={() => toggleChecked(m.id)} />
              </span>
              <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full", className)}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-[12px] font-semibold leading-tight", isActive ? "text-brand-primary" : "text-text-primary")}>{m.name}</p>
                <p className="mt-0.5 truncate text-[10.5px] leading-tight text-text-secondary">
                  {m.type} · {m.associatedAssets} assets · {m.lastUpdated}
                </p>
              </div>
              <span className={cn("mt-0.5 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", RISK_STYLE[m.riskLevel])}>{m.riskLevel}</span>
            </div>
          );
        })}
        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-1.5 px-4 py-10 text-center">
            <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <p className="text-[12px] font-medium text-text-secondary">No threat models match</p>
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2">
        <span className="text-[10.5px] text-text-secondary">Showing {rows.length} of {MODELS.length}</span>
        <div className="flex items-center gap-0.5">
          <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2 disabled:opacity-40" disabled>
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-primary text-[10.5px] font-medium text-white">
            1
          </button>
          <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2 disabled:opacity-40" disabled>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- center: detail -------------------------------- */

function DetailCenter({ model }: { model: ThreatModel }) {
  const [tab, setTab] = React.useState<DetailTab>("Overview");
  const { icon: Icon, className } = TYPE_ICON[model.type];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border-default px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", className)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[15px] font-bold text-text-primary">{model.name}</h2>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", RISK_STYLE[model.riskLevel])}>{model.riskLevel}</span>
            </div>
            <p className="truncate text-[11.5px] text-text-secondary">{model.subtitle}</p>
            <p className="mt-0.5 truncate text-[10.5px] text-text-secondary">
              {model.type} · Active since {model.activeSince} · Last updated {model.lastUpdated}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2">
            <Eye className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            Watch
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-2" aria-label="More actions">
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-4">
        {(["Overview", "Attack Vectors", "Mitigations", "Assets", "Notes"] as DetailTab[]).map((t) => {
          const badge =
            t === "Attack Vectors" ? model.topVectors.length : t === "Assets" ? model.associatedAssets : null;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors duration-150",
                tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {t}
              {badge !== null ? <span className="ml-1 text-text-secondary">({badge})</span> : null}
            </button>
          );
        })}
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {tab === "Overview" ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-[12px] font-bold text-text-primary">Description</p>
              <p className="max-w-2xl text-[12.5px] leading-relaxed text-text-secondary">{model.description}</p>
            </div>

            <dl className="grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 text-[12px] sm:grid-cols-3">
              {[
                ["Owner", model.owner],
                ["Reviewed By", model.reviewedBy],
                ["First Seen", model.firstSeen],
                ["Scope", model.scope],
                ["Confidence", model.confidence],
                ["Status", model.status],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-[10.5px] text-text-secondary">{k}</dt>
                  <dd className="truncate font-medium text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="mb-1.5 text-[11px] text-text-secondary">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {model.tags.map((t) => (
                  <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                    {t}
                  </span>
                ))}
                <button type="button" className="flex items-center gap-1 rounded-full border border-dashed border-border-default px-2 py-0.5 text-[11px] font-medium text-brand-primary hover:bg-brand-primary/5">
                  <Plus className="h-3 w-3" aria-hidden="true" />
                  Add Tag
                </button>
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[12px] font-bold text-text-primary">Findings Activity (Last 12 Months)</p>
                <div className="flex items-center gap-3 text-[10px] text-text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                    Findings
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Mitigated
                  </span>
                </div>
              </div>
              <div className="h-[180px] w-full max-w-3xl">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={model.activity} margin={{ top: 6, right: 4, bottom: 0, left: -20 }} barGap={2}>
                    <CartesianGrid stroke="var(--border-default)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={{ stroke: "var(--border-default)" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
                    <Bar dataKey="findings" name="Findings" fill="var(--brand-primary)" radius={[3, 3, 0, 0]} maxBarSize={16} />
                    <Bar dataKey="mitigated" name="Mitigated" fill="var(--color-success)" radius={[3, 3, 0, 0]} maxBarSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "Attack Vectors" ? (
          <div className="flex max-w-2xl flex-col gap-2">
            {model.topVectors.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-3 py-2.5 text-[12px]">
                <div className="min-w-0">
                  <p className="truncate font-medium text-text-primary">{v.name}</p>
                  <p className="text-[10.5px] text-text-secondary">{v.id}</p>
                </div>
                <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-text-secondary">{v.count} findings</span>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Mitigations" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Bug className="h-6 w-6 text-text-secondary" aria-hidden="true" />
            <p className="text-[12.5px] font-semibold text-text-primary">No mitigations tracked yet</p>
            <p className="text-[11.5px] text-text-secondary">Link controls to attack vectors to populate this view.</p>
          </div>
        ) : null}

        {tab === "Assets" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Server className="h-6 w-6 text-text-secondary" aria-hidden="true" />
            <p className="text-[12.5px] font-semibold text-text-primary">{model.associatedAssets} associated assets</p>
            <p className="text-[11.5px] text-text-secondary">Scope: {model.scope}</p>
          </div>
        ) : null}

        {tab === "Notes" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <FileText className="h-6 w-6 text-text-secondary" aria-hidden="true" />
            <p className="text-[12.5px] font-semibold text-text-primary">No notes yet</p>
            <p className="text-[11.5px] text-text-secondary">Add review notes for this threat model.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- right: summary -------------------------------- */

function SummaryPanel({ model }: { model: ThreatModel }) {
  return (
    <div className="scrollbar-thin flex h-full w-[280px] shrink-0 flex-col overflow-y-auto border-l border-border-default bg-surface-1 px-4 py-3.5">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-text-primary">Top Attack Vectors</p>
          <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
            View all
          </button>
        </div>
        <div className="flex flex-col divide-y divide-border-default">
          {model.topVectors.slice(0, 5).map((v) => (
            <div key={v.id} className="flex items-center justify-between gap-2 py-1.5 text-[11.5px]">
              <span className="min-w-0 truncate font-medium text-text-primary">{v.id}</span>
              <span className="min-w-0 flex-1 truncate text-text-secondary">{v.name}</span>
              <span className="shrink-0 font-semibold tabular-nums text-text-primary">{v.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-[12px] font-bold text-text-primary">Threat Actor Exposure</p>
        <div className="flex flex-col gap-2">
          {model.exposure.map((e) => (
            <div key={e.name} className="flex items-center gap-2 text-[11px]">
              <span className="w-[108px] shrink-0 truncate text-text-secondary">{e.name}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-brand-primary" style={{ width: `${e.pct}%` }} />
              </div>
              <span className="w-7 shrink-0 text-right font-semibold tabular-nums text-text-primary">{e.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-text-primary">Related Threat Models ({model.relatedModels.length})</p>
          <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
            View all
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {model.relatedModels.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
              <span className="min-w-0 truncate font-medium text-text-primary">{r.name}</span>
              <span className="shrink-0 text-[10.5px] text-text-secondary">{r.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-text-primary">References ({model.references.length})</p>
          <button type="button" className="text-[10.5px] font-medium text-brand-primary hover:underline">
            View all
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {model.references.map((r) => (
            <div key={r.label} className="flex items-start gap-2 text-[11.5px]">
              <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-brand-primary">{r.label}</p>
              </div>
              <span className="shrink-0 text-[10.5px] text-text-secondary">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

export function ThreatModelingPlatform() {
  const [search, setSearch] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(MODELS[0].id);
  const [checked, setChecked] = React.useState<Set<string>>(new Set());

  const toggleChecked = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const q = search.trim().toLowerCase();
  const filtered = React.useMemo(() => {
    return MODELS.filter((m) => {
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.type.toLowerCase().includes(q)
      );
    }).sort((a, b) => RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel]);
  }, [q]);

  const selected = MODELS.find((m) => m.id === selectedId) ?? MODELS[0];

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <ModelList
        rows={filtered}
        selectedId={selectedId}
        onSelect={setSelectedId}
        checked={checked}
        toggleChecked={toggleChecked}
        search={search}
        setSearch={setSearch}
      />
      <DetailCenter model={selected} />
      <SummaryPanel model={selected} />
    </div>
  );
}
