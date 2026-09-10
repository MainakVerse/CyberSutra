"use client";

import * as React from "react";
import {
  Building2,
  ChevronDown,
  Compass,
  Edit2,
  File,
  FileText,
  Filter,
  Globe2,
  Layers,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Save,
  Search,
  Server,
  Share2,
  Skull,
  User,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type EntityType = "Person" | "Organization" | "Domain" | "IP Address" | "Location" | "Document" | "Social Profile" | "Other";

type GraphNode = {
  id: string;
  type: EntityType;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  icon: React.ElementType;
  iconClass: string;
  flag?: string;
};

type GraphEdge = {
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
  color?: string;
};

type EvidenceItem = {
  id: string;
  category: "People" | "Domains" | "Docs" | "Media";
  label: string;
  sublabel: string;
  date: string;
  icon: React.ElementType;
  iconClass: string;
};

/* -------------------------------- dummy data -------------------------------- */

const ENTITY_TYPE_COUNTS: Array<{ type: EntityType | "All Types"; count: number }> = [
  { type: "All Types", count: 1248 },
  { type: "Person", count: 328 },
  { type: "Organization", count: 216 },
  { type: "Domain", count: 184 },
  { type: "IP Address", count: 142 },
  { type: "Social Profile", count: 198 },
  { type: "Phone Numbers" as EntityType, count: 76 },
  { type: "Location", count: 94 },
  { type: "Files / Documents" as EntityType, count: 62 },
  { type: "Cryptocurrency" as EntityType, count: 48 },
];

const DATA_SOURCES: Array<{ name: string; count: number }> = [
  { name: "All Sources", count: 432 },
  { name: "Social Media", count: 128 },
  { name: "Professional Networks", count: 84 },
  { name: "Domain & DNS", count: 72 },
  { name: "Breach Databases", count: 56 },
  { name: "News & Media", count: 64 },
  { name: "Government Records", count: 38 },
  { name: "Paste Sites", count: 24 },
  { name: "Dark Web", count: 18 },
  { name: "Other", count: 36 },
];

const NODES: GraphNode[] = [
  { id: "rahul-verma", type: "Person", label: "Rahul Verma", sublabel: "Security Researcher", x: 490, y: 300, icon: User, iconClass: "bg-brand-primary text-white" },
  { id: "novatech", type: "Organization", label: "NovaTech Solutions", sublabel: "Organization", x: 490, y: 158, icon: Building2, iconClass: "bg-brand-primary/80 text-white" },
  { id: "linkedin", type: "Social Profile", label: "rahul.verma", sublabel: "LinkedIn Profile · 2.4K followers", x: 358, y: 210, icon: FaLinkedin, iconClass: "bg-[#0a66c2] text-white" },
  { id: "domain", type: "Domain", label: "novaTech.io", sublabel: "Domain", x: 622, y: 210, icon: Globe2, iconClass: "bg-brand-primary text-white" },
  { id: "mail-server", type: "IP Address", label: "mail.novatech.io", sublabel: "185.199.110.23", x: 745, y: 195, icon: Server, iconClass: "bg-error/90 text-white" },
  { id: "email", type: "Other", label: "rahul.verma@novatech.io", sublabel: "Email Address", x: 292, y: 305, icon: Mail, iconClass: "bg-error/80 text-white" },
  { id: "twitter", type: "Social Profile", label: "@rahulv_sec", sublabel: "X (Twitter) Profile · 1.1K followers", x: 718, y: 300, icon: FaXTwitter, iconClass: "bg-info text-white" },
  { id: "github", type: "Social Profile", label: "rverma-sec", sublabel: "GitHub Profile · 148 repositories", x: 317, y: 425, icon: FaGithub, iconClass: "bg-text-primary text-surface-1" },
  { id: "phone", type: "Other", label: "+91 98765 43210", sublabel: "Phone Number", x: 688, y: 350, icon: Phone, iconClass: "bg-success text-white" },
  { id: "paper", type: "Document", label: "Research_Paper.pdf", sublabel: "Document", x: 438, y: 458, icon: FileText, iconClass: "bg-brand-primary/80 text-white" },
  { id: "location", type: "Location", label: "Bengaluru, India", sublabel: "Location", x: 564, y: 448, icon: MapPin, iconClass: "bg-[#8b5cf6] text-white" },
  { id: "shadowfalcon", type: "Other", label: "ShadowFalcon", sublabel: "Threat Actor (Suspected)", x: 700, y: 448, icon: Skull, iconClass: "bg-error text-white" },
];

const EDGES: GraphEdge[] = [
  { from: "novatech", to: "domain", label: "Owns" },
  { from: "novatech", to: "rahul-verma", label: "Employee" },
  { from: "domain", to: "mail-server", label: "Resolves to" },
  { from: "rahul-verma", to: "linkedin", label: "Professional" },
  { from: "rahul-verma", to: "email", label: "Uses" },
  { from: "rahul-verma", to: "twitter", label: "Mentions" },
  { from: "rahul-verma", to: "phone", label: "Associated" },
  { from: "rahul-verma", to: "github", label: "Contributes" },
  { from: "rahul-verma", to: "paper", label: "Author" },
  { from: "rahul-verma", to: "location", label: "Located In" },
  { from: "rahul-verma", to: "shadowfalcon", label: "Possible Affiliation", dashed: true, color: "var(--color-error)" },
];

const EVIDENCE: EvidenceItem[] = [
  { id: "ev1", category: "People", label: "rahul.verma@novatech.io", sublabel: "Email Address", date: "8 Sep 2026, 14:20", icon: Mail, iconClass: "bg-error/10 text-error" },
  { id: "ev2", category: "Domains", label: "NovaTech Solutions", sublabel: "Organization", date: "8 Sep 2026, 14:18", icon: Building2, iconClass: "bg-brand-primary/10 text-brand-primary" },
  { id: "ev3", category: "Domains", label: "novaTech.io", sublabel: "Domain", date: "8 Sep 2026, 14:18", icon: Globe2, iconClass: "bg-brand-primary/10 text-brand-primary" },
  { id: "ev4", category: "People", label: "rverma-sec", sublabel: "GitHub Profile", date: "7 Sep 2026, 11:03", icon: FaGithub, iconClass: "bg-text-secondary/10 text-text-primary" },
  { id: "ev5", category: "Docs", label: "Research_Paper.pdf", sublabel: "Document", date: "6 Sep 2026, 20:14", icon: FileText, iconClass: "bg-info/10 text-info" },
  { id: "ev6", category: "Media", label: "Bengaluru, India", sublabel: "Location", date: "6 Sep 2026, 19:42", icon: MapPin, iconClass: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
  { id: "ev7", category: "People", label: "@rahulv_sec", sublabel: "Social Profile", date: "6 Sep 2026, 18:11", icon: FaXTwitter, iconClass: "bg-info/10 text-info" },
  { id: "ev8", category: "Media", label: "+91 98765 43210", sublabel: "Phone Number", date: "5 Sep 2026, 16:30", icon: Phone, iconClass: "bg-success/10 text-success" },
];

type TimelineEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  nodeId?: string;
};

const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: "t1", date: "8 Sep 2026", time: "14:20", title: "Email address discovered", description: "rahul.verma@novatech.io found via breach database cross-reference.", icon: Mail, iconClass: "bg-error/10 text-error", nodeId: "email" },
  { id: "t2", date: "8 Sep 2026", time: "14:18", title: "Organization linked", description: "NovaTech Solutions identified as employer via LinkedIn profile.", icon: Building2, iconClass: "bg-brand-primary/10 text-brand-primary", nodeId: "novatech" },
  { id: "t3", date: "8 Sep 2026", time: "14:18", title: "Domain resolved", description: "novaTech.io added to investigation and resolved to mail server IP.", icon: Globe2, iconClass: "bg-brand-primary/10 text-brand-primary", nodeId: "domain" },
  { id: "t4", date: "7 Sep 2026", time: "11:03", title: "GitHub profile matched", description: "rverma-sec GitHub account linked via shared email in commit history.", icon: FaGithub, iconClass: "bg-text-secondary/10 text-text-primary", nodeId: "github" },
  { id: "t5", date: "6 Sep 2026", time: "20:14", title: "Document collected", description: "Research_Paper.pdf added as evidence, authored by Rahul Verma.", icon: FileText, iconClass: "bg-info/10 text-info", nodeId: "paper" },
  { id: "t6", date: "6 Sep 2026", time: "19:42", title: "Location identified", description: "Bengaluru, India inferred from IP geolocation and document metadata.", icon: MapPin, iconClass: "bg-[#8b5cf6]/10 text-[#8b5cf6]", nodeId: "location" },
  { id: "t7", date: "6 Sep 2026", time: "18:11", title: "X (Twitter) profile matched", description: "@rahulv_sec linked via cross-posted content and follower overlap.", icon: FaXTwitter, iconClass: "bg-info/10 text-info", nodeId: "twitter" },
  { id: "t8", date: "5 Sep 2026", time: "16:30", title: "Phone number surfaced", description: "+91 98765 43210 found in a leaked contact list referencing novaTech.io.", icon: Phone, iconClass: "bg-success/10 text-success", nodeId: "phone" },
  { id: "t9", date: "4 Sep 2026", time: "09:15", title: "Investigation opened", description: "New investigation started from initial search on rahul.verma@novatech.io.", icon: Search, iconClass: "bg-brand-primary/10 text-brand-primary" },
];

type MediaItem = {
  id: string;
  label: string;
  sublabel: string;
  kind: "Screenshot" | "Image" | "Video";
  date: string;
  icon: React.ElementType;
  iconClass: string;
};

const MEDIA_ITEMS: MediaItem[] = [
  { id: "m1", label: "LinkedIn profile screenshot", sublabel: "rahul.verma · captured 8 Sep 2026", kind: "Screenshot", date: "8 Sep 2026, 14:19", icon: FaLinkedin, iconClass: "bg-[#0a66c2]/10 text-[#0a66c2]" },
  { id: "m2", label: "X profile screenshot", sublabel: "@rahulv_sec · captured 6 Sep 2026", kind: "Screenshot", date: "6 Sep 2026, 18:12", icon: FaXTwitter, iconClass: "bg-info/10 text-info" },
  { id: "m3", label: "GitHub contribution graph", sublabel: "rverma-sec · captured 7 Sep 2026", kind: "Image", date: "7 Sep 2026, 11:05", icon: FaGithub, iconClass: "bg-text-secondary/10 text-text-primary" },
  { id: "m4", label: "Office building photo", sublabel: "NovaTech Solutions HQ, Bengaluru", kind: "Image", date: "6 Sep 2026, 19:50", icon: Building2, iconClass: "bg-brand-primary/10 text-brand-primary" },
  { id: "m5", label: "Conference talk recording", sublabel: "Security Researcher panel, 2026", kind: "Video", date: "3 Sep 2026, 10:00", icon: File, iconClass: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
];

type DocumentItem = {
  id: string;
  label: string;
  sublabel: string;
  fileType: "PDF" | "CSV" | "TXT";
  size: string;
  date: string;
};

const DOCUMENT_ITEMS: DocumentItem[] = [
  { id: "d1", label: "Research_Paper.pdf", sublabel: "Authored by Rahul Verma · cloud security", fileType: "PDF", size: "1.2 MB", date: "6 Sep 2026, 20:14" },
  { id: "d2", label: "employee_directory_leak.csv", sublabel: "Breach database export referencing novaTech.io", fileType: "CSV", size: "340 KB", date: "5 Sep 2026, 09:30" },
  { id: "d3", label: "conference_bio.txt", sublabel: "Speaker bio from security conference listing", fileType: "TXT", size: "4 KB", date: "4 Sep 2026, 15:02" },
  { id: "d4", label: "whois_novatech_io.pdf", sublabel: "Domain registration record snapshot", fileType: "PDF", size: "180 KB", date: "8 Sep 2026, 14:18" },
];

const NODE_TYPE_LEGEND: Array<{ label: string; dot: string }> = [
  { label: "Person", dot: "bg-brand-primary" },
  { label: "Organization", dot: "bg-brand-primary/80" },
  { label: "Domain", dot: "bg-brand-primary" },
  { label: "IP Address", dot: "bg-error/90" },
  { label: "Location", dot: "bg-[#8b5cf6]" },
  { label: "Document", dot: "bg-brand-primary/80" },
  { label: "Social Profile", dot: "bg-info" },
  { label: "Other", dot: "bg-text-secondary" },
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

/* -------------------------------- entity search sidebar -------------------------------- */

function EntitySearchSidebar({
  onClose,
  onSearch,
  typeFilters,
  toggleType,
  sourceFilters,
  toggleSource,
  dateRange,
  setDateRange,
}: {
  onClose: () => void;
  onSearch: (q: string) => void;
  typeFilters: Set<string>;
  toggleType: (t: string) => void;
  sourceFilters: Set<string>;
  toggleSource: (s: string) => void;
  dateRange: string;
  setDateRange: (r: string) => void;
}) {
  const [mode, setMode] = React.useState<"Search" | "Advanced" | "Bulk">("Search");
  const [query, setQuery] = React.useState("rahul.verma@novatech.io");
  const [dateOpen, setDateOpen] = React.useState(false);

  return (
    <div className="flex h-full w-[260px] shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between px-4 py-3.5">
        <h2 className="text-[13px] font-bold text-text-primary">Entity Search</h2>
        <button type="button" onClick={onClose} className="rounded-md p-0.5 text-text-secondary hover:bg-surface-2 hover:text-text-primary" aria-label="Close panel">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 px-3 pb-2.5">
        {(["Search", "Advanced", "Bulk"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-150",
              mode === m ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-4">
        <div className="px-4 pb-3">
          {mode === "Search" ? (
            <div className="flex items-center gap-1.5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
                placeholder="Search email, name, domain, IP..."
                className="h-8 flex-1 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
              <button
                type="button"
                onClick={() => onSearch(query)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : mode === "Advanced" ? (
            <div className="flex flex-col gap-2">
              <input placeholder="Name contains..." className="h-8 w-full rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
              <input placeholder="Domain equals..." className="h-8 w-full rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
              <button type="button" onClick={() => onSearch(query)} className="flex h-8 items-center justify-center rounded-lg bg-brand-primary text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
                Run Advanced Search
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <textarea
                placeholder="Paste one identifier per line..."
                rows={4}
                className="w-full resize-none rounded-lg border border-border-default bg-surface-1 p-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
              <button type="button" onClick={() => onSearch(query)} className="flex h-8 items-center justify-center rounded-lg bg-brand-primary text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
                Run Bulk Search
              </button>
            </div>
          )}
        </div>

        <div className="border-b border-border-default py-3">
          <p className="px-4 text-[11.5px] font-semibold uppercase tracking-wide text-text-secondary">Entity Types</p>
          <div className="mt-2.5 flex flex-col gap-2 px-4">
            {ENTITY_TYPE_COUNTS.map((t) => (
              <label key={t.type} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={typeFilters.has(t.type)} onChange={() => toggleType(t.type)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{t.type}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({t.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-b border-border-default py-3">
          <p className="px-4 text-[11.5px] font-semibold uppercase tracking-wide text-text-secondary">Data Sources</p>
          <div className="mt-2.5 flex flex-col gap-2 px-4">
            {DATA_SOURCES.map((s) => (
              <label key={s.name} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={sourceFilters.has(s.name)} onChange={() => toggleSource(s.name)} />
                <span className="flex-1 truncate text-[12px] text-text-primary">{s.name}</span>
                <span className="text-[11px] tabular-nums text-text-secondary">({s.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </div>

        <div className="py-3">
          <p className="px-4 pb-2 text-[11.5px] font-semibold uppercase tracking-wide text-text-secondary">Date Range</p>
          <div className="relative px-4">
            <button
              type="button"
              onClick={() => setDateOpen((v) => !v)}
              className="flex h-8 w-full items-center justify-between rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
            >
              {dateRange}
              <ChevronDown className={cn("h-3.5 w-3.5 text-text-secondary transition-transform duration-150", dateOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {dateOpen ? (
              <div className="absolute left-4 right-4 top-full z-20 mt-1.5 rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg">
                {["Any time", "Last 24 hours", "Last 7 days", "Last 30 days", "Custom range"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setDateRange(r);
                      setDateOpen(false);
                    }}
                    className={cn(
                      "block w-full rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium",
                      r === dateRange ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 border-t border-border-default p-3">
        <button
          type="button"
          onClick={() => onSearch(query)}
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          Search
        </button>
        <button
          type="button"
          className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
        >
          <Save className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
          Save Search
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- graph canvas -------------------------------- */

function nodeCenter(n: GraphNode) {
  return { x: n.x, y: n.y };
}

type Point = { x: number; y: number };

function GraphCanvas({
  nodes: initialNodes,
  edges,
  selectedId,
  onSelect,
  filterText,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filterText: string;
}) {
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState<Point>({ x: 0, y: -12 });
  const [positions, setPositions] = React.useState<Record<string, Point>>(() =>
    Object.fromEntries(initialNodes.map((n) => [n.id, { x: n.x, y: n.y }]))
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  const dragState = React.useRef<
    | { kind: "pan"; startClientX: number; startClientY: number; startPan: Point }
    | { kind: "node"; nodeId: string; startClientX: number; startClientY: number; startPos: Point }
    | null
  >(null);
  const [isPanning, setIsPanning] = React.useState(false);
  const [draggingNodeId, setDraggingNodeId] = React.useState<string | null>(null);

  const nodes = React.useMemo(
    () => initialNodes.map((n) => ({ ...n, ...(positions[n.id] ?? { x: n.x, y: n.y }) })),
    [initialNodes, positions]
  );
  const nodeById = React.useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const q = filterText.trim().toLowerCase();
  const matchedIds = q ? new Set(nodes.filter((n) => n.label.toLowerCase().includes(q) || n.sublabel.toLowerCase().includes(q)).map((n) => n.id)) : null;

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragState.current;
      if (!drag) return;
      if (drag.kind === "pan") {
        const dx = e.clientX - drag.startClientX;
        const dy = e.clientY - drag.startClientY;
        setPan({ x: drag.startPan.x + dx, y: drag.startPan.y + dy });
      } else {
        const dx = (e.clientX - drag.startClientX) / zoom;
        const dy = (e.clientY - drag.startClientY) / zoom;
        setPositions((prev) => ({
          ...prev,
          [drag.nodeId]: { x: drag.startPos.x + dx, y: drag.startPos.y + dy },
        }));
      }
    };
    const onUp = () => {
      dragState.current = null;
      setIsPanning(false);
      setDraggingNodeId(null);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [zoom]);

  const startPanDrag = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragState.current = { kind: "pan", startClientX: e.clientX, startClientY: e.clientY, startPan: pan };
    setIsPanning(true);
  };

  const startNodeDrag = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    const current = positions[nodeId] ?? { x: 0, y: 0 };
    dragState.current = { kind: "node", nodeId, startClientX: e.clientX, startClientY: e.clientY, startPos: current };
    setDraggingNodeId(nodeId);
  };

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-surface-2/40">
      <div
        ref={containerRef}
        onPointerDown={startPanDrag}
        className="flex h-full w-full select-none items-center justify-center overflow-hidden"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
      >
        <div
          className="relative shrink-0"
          style={{
            width: 900,
            height: 520,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <svg width={900} height={520} className="absolute inset-0 overflow-visible">
            {edges.map((e, i) => {
              const from = nodeById.get(e.from);
              const to = nodeById.get(e.to);
              if (!from || !to) return null;
              const a = nodeCenter(from);
              const b = nodeCenter(to);
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              return (
                <g key={i}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={e.color ?? "var(--border-default)"}
                    strokeWidth={1.5}
                    strokeDasharray={e.dashed ? "4 3" : undefined}
                  />
                  <rect x={midX - e.label.length * 3} y={midY - 8} width={e.label.length * 6} height={14} fill="var(--surface-1)" opacity={0.9} />
                  <text
                    x={midX}
                    y={midY + 3}
                    textAnchor="middle"
                    fontSize={9.5}
                    fill={e.color ?? "var(--text-secondary)"}
                    fontWeight={e.dashed ? 700 : 500}
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {nodes.map((n) => {
            const Icon = n.icon;
            const isSelected = n.id === selectedId;
            const isDimmed = matchedIds ? !matchedIds.has(n.id) : false;
            const isFlagged = n.id === "rahul-verma";
            const isDragging = draggingNodeId === n.id;
            return (
              <div
                key={n.id}
                onPointerDown={(e) => startNodeDrag(e, n.id)}
                onClick={() => onSelect(n.id)}
                style={{ left: n.x, top: n.y, cursor: isDragging ? "grabbing" : "grab" }}
                className={cn(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-opacity duration-150",
                  isDimmed && "opacity-30",
                  isDragging && "z-20"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full shadow-sm ring-2 ring-surface-1 transition-transform duration-150",
                    n.iconClass,
                    isSelected && "ring-2 ring-brand-primary",
                    !isDragging && "hover:scale-105"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="whitespace-nowrap rounded bg-surface-1/90 px-1.5 py-0.5 text-[11px] font-semibold text-text-primary shadow-sm">
                  {n.label}
                </span>
                <span className="max-w-[130px] truncate whitespace-nowrap text-[9.5px] text-text-secondary">{n.sublabel}</span>
                {isFlagged ? (
                  <span className="mt-0.5 rounded-full bg-error/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-error">High Interest</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-lg border border-border-default bg-surface-1/95 px-2.5 py-2 text-[10px] shadow-sm backdrop-blur-sm">
        {NODE_TYPE_LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 py-0.5 text-text-secondary">
            <span className={cn("h-2 w-2 shrink-0 rounded-full", l.dot)} />
            {l.label}
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(2)))}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary shadow-sm hover:bg-surface-2"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary shadow-sm hover:bg-surface-2"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: -12 });
            setPositions(Object.fromEntries(initialNodes.map((n) => [n.id, { x: n.x, y: n.y }])));
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary shadow-sm hover:bg-surface-2"
          aria-label="Reset view"
        >
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-14 z-10 rounded-md border border-border-default bg-surface-1/95 px-2.5 py-1 text-[11px] text-text-secondary shadow-sm backdrop-blur-sm">
        {nodes.length} nodes · {edges.length} connections · drag to pan, drag a node to move it
      </div>
    </div>
  );
}

/* -------------------------------- graph toolbar -------------------------------- */

function GraphToolbar({ findQuery, setFindQuery }: { findQuery: string; setFindQuery: (v: string) => void }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-3 py-2">
      <div className="relative w-[220px]">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
        <input
          value={findQuery}
          onChange={(e) => setFindQuery(e.target.value)}
          placeholder="Find in graph..."
          className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
      </div>
      <div className="flex items-center gap-1">
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2" aria-label="Filter">
          <Filter className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2" aria-label="Layout">
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2" aria-label="More">
          <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary hover:bg-surface-2" aria-label="Fullscreen">
          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- evidence panel -------------------------------- */

function EvidencePanel({ items, onSelect }: { items: EvidenceItem[]; onSelect: (id: string) => void }) {
  const [tab, setTab] = React.useState<"All" | "People" | "Domains" | "Docs" | "Media">("All");
  const counts = {
    All: items.length,
    People: items.filter((e) => e.category === "People").length,
    Domains: items.filter((e) => e.category === "Domains").length,
    Docs: items.filter((e) => e.category === "Docs").length,
    Media: items.filter((e) => e.category === "Media").length,
  };
  const visible = tab === "All" ? items : items.filter((e) => e.category === tab);

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <h3 className="text-[13px] font-bold text-text-primary">Collected Evidence ({items.length})</h3>
        <button type="button" className="flex items-center gap-1 rounded-lg border border-border-default bg-surface-1 px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-2">
          <Plus className="h-3 w-3" aria-hidden="true" />
          Add
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-3 py-2">
        {(["All", "People", "Domains", "Docs", "Media"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-150",
              tab === t ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-surface-2"
            )}
          >
            {t} ({counts[t]})
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {visible.map((e) => {
          const Icon = e.icon;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => onSelect(e.id)}
              className="flex w-full items-center gap-2.5 border-b border-border-default px-4 py-2.5 text-left transition-colors duration-100 last:border-0 hover:bg-surface-2"
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", e.iconClass)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-text-primary">{e.label}</p>
                <p className="truncate text-[10.5px] text-text-secondary">{e.sublabel}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[10px] text-text-secondary">{e.date}</span>
                <MoreHorizontal className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
              </div>
            </button>
          );
        })}
        {visible.length === 0 ? <p className="px-4 py-8 text-center text-[11.5px] text-text-secondary">No evidence in this category</p> : null}
      </div>
    </div>
  );
}

/* -------------------------------- node detail popover -------------------------------- */

function NodeDetailCard({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  const [tab, setTab] = React.useState<"Overview" | "Related" | "Mentioned" | "Timeline">("Overview");
  const Icon = node.icon;

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-30 flex items-start justify-end bg-surface-1/30 p-4 backdrop-blur-[1px]" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-[360px] shrink-0 flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1/95 shadow-xl backdrop-blur-md"
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", node.iconClass)}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-bold text-text-primary">{node.label}</p>
              <p className="truncate text-[10.5px] text-text-secondary">{node.type}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" className="rounded-md p-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary" aria-label="Edit">
              <Edit2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button type="button" onClick={onClose} className="rounded-md p-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary" aria-label="Close">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border-default px-2">
          {(["Overview", "Related", "Mentioned", "Timeline"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 border-b-2 px-2.5 py-2 text-[11.5px] font-medium transition-colors duration-150",
                tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {t === "Related" ? "Related (8)" : t === "Mentioned" ? "Mentioned (24)" : t}
            </button>
          ))}
        </div>

        <div className="max-h-[380px] overflow-y-auto px-4 py-3">
          {tab === "Overview" ? (
            <dl className="flex flex-col divide-y divide-border-default text-[12px]">
              {[
                ["Name", node.label],
                ["Domain", node.type === "Domain" ? node.label : "novatech.io"],
                ["Industry", "Information Technology"],
                ["Headquarters", "Bengaluru, India"],
                ["Employees", "201 - 500"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">{k}</dt>
                  <dd className="max-w-[150px] truncate text-right font-medium text-text-primary">{v}</dd>
                </div>
              ))}
              <div className="py-2">
                <dt className="mb-1 text-text-secondary">Linked Entities</dt>
                <dd className="font-medium text-text-primary">3 people, 2 domains, 4 IPs</dd>
              </div>
              <div className="py-2">
                <dt className="mb-1 text-text-secondary">Description</dt>
                <dd className="text-[11.5px] leading-relaxed text-text-secondary">
                  Indian technology company focusing on cloud infrastructure and security solutions.
                </dd>
              </div>
            </dl>
          ) : null}
          {tab === "Related" ? (
            <div className="flex flex-col gap-2">
              {NODES.filter((n) => n.id !== node.id)
                .slice(0, 6)
                .map((n) => {
                  const NIcon = n.icon;
                  return (
                    <div key={n.id} className="flex items-center gap-2 rounded-lg border border-border-default px-2.5 py-2 text-[11.5px]">
                      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", n.iconClass)}>
                        <NIcon className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span className="truncate font-medium text-text-primary">{n.label}</span>
                    </div>
                  );
                })}
            </div>
          ) : null}
          {tab === "Mentioned" ? (
            <div className="flex flex-col gap-2">
              {EVIDENCE.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-2 border-b border-border-default py-2 text-[11.5px] last:border-0">
                  <span className="truncate text-text-primary">{e.label}</span>
                  <span className="shrink-0 tabular-nums text-text-secondary">{e.date.split(",")[0]}</span>
                </div>
              ))}
            </div>
          ) : null}
          {tab === "Timeline" ? (
            <div className="flex flex-col gap-1">
              {[
                { date: "8 Sep 2026", event: "Added to investigation" },
                { date: "6 Sep 2026", event: "Linked via document reference" },
                { date: "5 Sep 2026", event: "First discovered via search" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between gap-2 border-b border-border-default py-2 text-[11.5px] last:border-0">
                  <span className="text-text-primary">{t.event}</span>
                  <span className="shrink-0 tabular-nums text-text-secondary">{t.date}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- list / timeline / other views -------------------------------- */

function ListView({ nodes, onSelect }: { nodes: GraphNode[]; onSelect: (id: string) => void }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-3">
      <div className="flex flex-col gap-1.5">
        {nodes.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onSelect(n.id)}
              className="flex items-center gap-2.5 rounded-lg border border-border-default bg-surface-1 px-3 py-2.5 text-left hover:bg-surface-2"
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", n.iconClass)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-text-primary">{n.label}</p>
                <p className="truncate text-[11px] text-text-secondary">{n.sublabel}</p>
              </div>
              <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-medium text-text-secondary">{n.type}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- timeline view -------------------------------- */

function TimelineView({ events, onSelectNode }: { events: TimelineEvent[]; onSelectNode: (id: string) => void }) {
  const grouped = React.useMemo(() => {
    const map = new Map<string, TimelineEvent[]>();
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date)!.push(e);
    }
    return Array.from(map.entries());
  }, [events]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4">
      <div className="mx-auto flex max-w-[640px] flex-col gap-6">
        {grouped.map(([date, items]) => (
          <div key={date}>
            <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-text-secondary">{date}</p>
            <div className="relative flex flex-col gap-4 border-l border-border-default pl-5">
              {items.map((e) => {
                const Icon = e.icon;
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => e.nodeId && onSelectNode(e.nodeId)}
                    disabled={!e.nodeId}
                    className={cn(
                      "relative flex items-start gap-3 rounded-lg border border-border-default bg-surface-1 p-3 text-left",
                      e.nodeId && "hover:bg-surface-2"
                    )}
                  >
                    <span className={cn("absolute -left-[27px] top-4 h-3 w-3 rounded-full ring-2 ring-surface-1", e.iconClass.replace("/10", ""))} />
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", e.iconClass)}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-[12.5px] font-semibold text-text-primary">{e.title}</p>
                        <span className="shrink-0 text-[10.5px] tabular-nums text-text-secondary">{e.time}</span>
                      </div>
                      <p className="mt-0.5 text-[11.5px] leading-snug text-text-secondary">{e.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- map view -------------------------------- */

function MapView({ nodes, onSelect }: { nodes: GraphNode[]; onSelect: (id: string) => void }) {
  const locationNodes = nodes.filter((n) => n.type === "Location" || n.id === "novatech");

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="relative flex-1 overflow-hidden bg-surface-2/40">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(90deg, var(--border-default) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSelect("location")}
            className="flex flex-col items-center gap-1"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b5cf6] text-white shadow-md ring-4 ring-[#8b5cf6]/20 transition-transform duration-150 hover:scale-105">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="rounded bg-surface-1 px-2 py-1 text-[12px] font-semibold text-text-primary shadow-sm">Bengaluru, India</span>
            <span className="text-[10.5px] text-text-secondary">12.9716° N, 77.5946° E</span>
          </button>
        </div>
        <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-border-default bg-surface-1/95 px-2.5 py-2 text-[10.5px] text-text-secondary shadow-sm backdrop-blur-sm">
          {locationNodes.length} location{locationNodes.length === 1 ? "" : "s"} linked to this investigation
        </div>
      </div>

      <div className="flex w-[240px] shrink-0 flex-col overflow-y-auto border-l border-border-default bg-surface-1">
        <p className="border-b border-border-default px-3 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-text-secondary">Locations</p>
        {locationNodes.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onSelect(n.id)}
              className="flex items-center gap-2.5 border-b border-border-default px-3 py-2.5 text-left hover:bg-surface-2"
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", n.iconClass)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-text-primary">{n.label}</p>
                <p className="truncate text-[10.5px] text-text-secondary">{n.sublabel}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- media view -------------------------------- */

function MediaView({ items }: { items: MediaItem[] }) {
  const KIND_STYLE: Record<MediaItem["kind"], string> = {
    Screenshot: "bg-info/10 text-info",
    Image: "bg-success/10 text-success",
    Video: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-3 gap-3">
        {items.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.id} className="flex flex-col overflow-hidden rounded-xl border border-border-default bg-surface-1">
              <div className={cn("flex h-24 items-center justify-center", m.iconClass)}>
                <Icon className="h-9 w-9" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", KIND_STYLE[m.kind])}>{m.kind}</span>
                  <span className="text-[10px] text-text-secondary">{m.date.split(",")[0]}</span>
                </div>
                <p className="truncate text-[12px] font-semibold text-text-primary">{m.label}</p>
                <p className="truncate text-[10.5px] text-text-secondary">{m.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- documents view -------------------------------- */

function DocumentsView({ items }: { items: DocumentItem[] }) {
  const FILE_STYLE: Record<DocumentItem["fileType"], string> = {
    PDF: "bg-error/10 text-error",
    CSV: "bg-success/10 text-success",
    TXT: "bg-text-secondary/10 text-text-primary",
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4">
      <div className="flex flex-col gap-2">
        {items.map((d) => (
          <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border-default bg-surface-1 px-3 py-2.5">
            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold", FILE_STYLE[d.fileType])}>
              {d.fileType}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold text-text-primary">{d.label}</p>
              <p className="truncate text-[11px] text-text-secondary">{d.sublabel}</p>
            </div>
            <span className="shrink-0 text-[10.5px] text-text-secondary">{d.size}</span>
            <span className="shrink-0 text-[10.5px] tabular-nums text-text-secondary">{d.date}</span>
            <button type="button" className="shrink-0 rounded-md p-1.5 text-text-secondary hover:bg-surface-2 hover:text-text-primary" aria-label="More actions">
              <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- investigation header -------------------------------- */

const VIEW_TABS = ["Graph", "List", "Timeline", "Map", "Media", "Documents"] as const;
type ViewTab = (typeof VIEW_TABS)[number];

function InvestigationHeader({
  title,
  setTitle,
  tags,
  view,
  setView,
}: {
  title: string;
  setTitle: (t: string) => void;
  tags: string[];
  view: ViewTab;
  setView: (v: ViewTab) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(title);

  return (
    <div className="flex shrink-0 flex-col border-b border-border-default">
      <div className="flex items-center gap-2 px-3 py-2.5">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTitle(draft.trim() || title);
                setEditing(false);
              }
              if (e.key === "Escape") setEditing(false);
            }}
            onBlur={() => {
              setTitle(draft.trim() || title);
              setEditing(false);
            }}
            className="h-7 rounded-md border border-brand-primary bg-surface-1 px-2 text-[13.5px] font-bold text-text-primary focus-visible:outline-none"
          />
        ) : (
          <h2 className="truncate text-[13.5px] font-bold text-text-primary">Investigation: {title}</h2>
        )}
        <button
          type="button"
          onClick={() => {
            setDraft(title);
            setEditing(true);
          }}
          className="rounded-md p-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary"
          aria-label="Edit investigation name"
        >
          <Edit2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <div className="ml-1 flex items-center gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                t === "High Interest" ? "bg-error/10 text-error" : "bg-surface-2 text-text-secondary"
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto px-2">
        {VIEW_TABS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2 text-[12px] font-medium transition-colors duration-150",
              view === v ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- header meta -------------------------------- */

export function OsintHeaderMeta() {
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!actionsOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setActionsOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [actionsOpen]);

  return (
    <div className="flex items-center gap-2">
      <div className="hidden flex-col items-end leading-tight sm:flex">
        <span className="text-[10px] text-text-secondary">Last updated</span>
        <span className="text-[11.5px] font-semibold text-text-primary">8 Sep 2026, 14:32 IST</span>
      </div>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setActionsOpen((v) => !v)}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
        >
          Actions
          <ChevronDown className={cn("h-3.5 w-3.5 text-text-secondary transition-transform duration-150", actionsOpen && "rotate-180")} aria-hidden="true" />
        </button>
        {actionsOpen ? (
          <div className="absolute right-0 top-full z-30 mt-1.5 w-[180px] rounded-lg border border-border-default bg-surface-1 p-1.5 shadow-lg">
            {["Export graph", "Duplicate investigation", "Share investigation", "Archive investigation"].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setActionsOpen(false)}
                className="block w-full rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium text-text-primary hover:bg-surface-2"
              >
                {a}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Add to Case
      </button>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

export function OsintInvestigationPlatform() {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [typeFilters, setTypeFilters] = React.useState<Set<string>>(
    new Set(["All Types", "Person", "Organization", "Domain", "IP Address", "Social Profile"])
  );
  const [sourceFilters, setSourceFilters] = React.useState<Set<string>>(new Set(["Social Media", "Professional Networks", "Domain & DNS"]));
  const [dateRange, setDateRange] = React.useState("Any time");
  const [investigationTitle, setInvestigationTitle] = React.useState("Rahul Verma");
  const [view, setView] = React.useState<ViewTab>("Graph");
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [findQuery, setFindQuery] = React.useState("");

  const toggleSet = (setFn: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const selectedNode = NODES.find((n) => n.id === selectedNodeId) ?? null;

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setInvestigationTitle(q.includes("@") ? "Rahul Verma" : q);
    setSelectedNodeId("rahul-verma");
  };

  const handleEvidenceSelect = (evidenceId: string) => {
    const map: Record<string, string> = {
      ev1: "email",
      ev2: "novatech",
      ev3: "domain",
      ev4: "github",
      ev5: "paper",
      ev6: "location",
      ev7: "twitter",
      ev8: "phone",
    };
    const nodeId = map[evidenceId];
    if (nodeId) setSelectedNodeId(nodeId);
    setView("Graph");
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {showSidebar ? (
        <EntitySearchSidebar
          onClose={() => setShowSidebar(false)}
          onSearch={handleSearch}
          typeFilters={typeFilters}
          toggleType={(t) => toggleSet(setTypeFilters, t)}
          sourceFilters={sourceFilters}
          toggleSource={(s) => toggleSet(setSourceFilters, s)}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      ) : (
        <div className="flex h-full w-10 shrink-0 flex-col items-center border-r border-border-default bg-surface-1 pt-3">
          <button
            type="button"
            onClick={() => setShowSidebar(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-2"
            aria-label="Open entity search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <InvestigationHeader title={investigationTitle} setTitle={setInvestigationTitle} tags={["Person", "novaTech.io", "High Interest"]} view={view} setView={setView} />

        {view === "Graph" ? (
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            <GraphToolbar findQuery={findQuery} setFindQuery={setFindQuery} />
            <GraphCanvas nodes={NODES} edges={EDGES} selectedId={selectedNodeId} onSelect={setSelectedNodeId} filterText={findQuery} />
            {selectedNode ? <NodeDetailCard node={selectedNode} onClose={() => setSelectedNodeId(null)} /> : null}
          </div>
        ) : view === "List" ? (
          <ListView nodes={NODES} onSelect={setSelectedNodeId} />
        ) : view === "Timeline" ? (
          <TimelineView events={TIMELINE_EVENTS} onSelectNode={setSelectedNodeId} />
        ) : view === "Map" ? (
          <MapView nodes={NODES} onSelect={setSelectedNodeId} />
        ) : view === "Media" ? (
          <MediaView items={MEDIA_ITEMS} />
        ) : (
          <DocumentsView items={DOCUMENT_ITEMS} />
        )}
      </div>

      <EvidencePanel items={EVIDENCE} onSelect={handleEvidenceSelect} />
    </div>
  );
}
