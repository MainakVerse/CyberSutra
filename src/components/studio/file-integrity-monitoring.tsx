"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  File,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------- data --------------------------------- */

type EventKind = "Modified" | "Created" | "Deleted" | "Renamed";

const EVENT_META: Record<EventKind, { dot: string; text: string }> = {
  Modified: { dot: "bg-info", text: "text-info" },
  Created: { dot: "bg-success", text: "text-success" },
  Deleted: { dot: "bg-error", text: "text-error" },
  Renamed: { dot: "bg-warning", text: "text-warning" },
};

type TreeNode = {
  label: string;
  path?: string;
  count?: number;
  children?: TreeNode[];
};

const MONITORED_TREE: TreeNode = {
  label: "All Monitored Paths",
  count: 42,
  children: [
    {
      label: "/",
      children: [
        {
          label: "etc",
          count: 12,
          children: [
            { label: "apache2" },
            { label: "nginx" },
            { label: "ssh", count: 5, path: "/etc/ssh" },
            { label: "systemd", count: 3 },
          ],
        },
        {
          label: "var",
          count: 8,
          children: [{ label: "log" }, { label: "www", count: 4 }],
        },
        {
          label: "usr",
          count: 6,
          children: [{ label: "bin" }, { label: "sbin" }],
        },
        {
          label: "opt",
          count: 2,
          children: [{ label: "cybersutra" }, { label: "apps" }],
        },
      ],
    },
    {
      label: "Windows",
      count: 10,
      children: [
        { label: "C:\\Windows", count: 6, children: [{ label: "System32", count: 3 }, { label: "SysWOW64" }] },
        { label: "C:\\Program Files", count: 4 },
      ],
    },
  ],
};

type ChangeEvent = {
  time: string;
  event: EventKind;
  path: string;
  filename: string;
  user: string;
  host: string;
  details: string;
};

const CHANGE_EVENTS: ChangeEvent[] = [
  { time: "8 Sep 2026, 14:32:11", event: "Modified", path: "/etc/ssh", filename: "sshd_config", user: "root", host: "FIN-WS-023", details: "Permissions changed" },
  { time: "8 Sep 2026, 13:18:45", event: "Created", path: "/etc/ssh", filename: "ssh_config.d/99-custom-conf", user: "root", host: "APP-SRV-03", details: "New file created" },
  { time: "8 Sep 2026, 11:05:22", event: "Modified", path: "/etc/ssh", filename: "ssh_config", user: "admin", host: "DEV-LT-441", details: "Content modified" },
  { time: "8 Sep 2026, 09:44:17", event: "Deleted", path: "/etc/ssh", filename: "moduli", user: "root", host: "HR-WS-087", details: "File deleted" },
  { time: "8 Sep 2026, 08:12:03", event: "Modified", path: "/etc/ssh", filename: "sshd_config", user: "root", host: "DB-SRV-02", details: "Content modified" },
];

const EVENT_FILTERS: Array<{ label: string; kind: EventKind | "All"; count: number }> = [
  { label: "All Events", kind: "All", count: 5 },
  { label: "Modified", kind: "Modified", count: 3 },
  { label: "Created", kind: "Created", count: 1 },
  { label: "Deleted", kind: "Deleted", count: 1 },
  { label: "Renamed", kind: "Renamed", count: 0 },
];

const DETAIL_TABS = ["Details", "Diff", "Metadata", "Related Events"];

const DIFF_LINES: Array<{ n: number; type: "context" | "removed" | "added"; text: string }> = [
  { n: 1, type: "context", text: "# SSHD configuration" },
  { n: 2, type: "context", text: "Port 22" },
  { n: 3, type: "context", text: "Protocol 2" },
  { n: 4, type: "removed", text: "PermitRootLogin no" },
  { n: 5, type: "removed", text: "PasswordAuthentication no" },
  { n: 6, type: "context", text: "ChallengeResponseAuthentication no" },
  { n: 7, type: "context", text: "UsePAM yes" },
  { n: 8, type: "context", text: "X11Forwarding no" },
  { n: 9, type: "context", text: "AllowUsers admin ops" },
  { n: 10, type: "context", text: "# End of file" },
];

const DIFF_LINES_CURRENT: Array<{ n: number; type: "context" | "removed" | "added"; text: string }> = [
  { n: 1, type: "context", text: "# SSHD configuration" },
  { n: 2, type: "context", text: "Port 22" },
  { n: 3, type: "context", text: "Protocol 2" },
  { n: 4, type: "added", text: "PermitRootLogin prohibit-password" },
  { n: 5, type: "added", text: "PasswordAuthentication yes" },
  { n: 6, type: "context", text: "ChallengeResponseAuthentication no" },
  { n: 7, type: "context", text: "UsePAM yes" },
  { n: 8, type: "context", text: "X11Forwarding no" },
  { n: 9, type: "added", text: "AllowUsers admin ops secops" },
  { n: 10, type: "added", text: "# Added for CyberSutra hardening" },
  { n: 11, type: "context", text: "LoginGraceTime 30" },
  { n: 12, type: "context", text: "MaxAuthTries 3" },
];

const EVENT_METADATA = [
  { label: "User", value: "root" },
  { label: "Host", value: "FIN-WS-023" },
  { label: "Process", value: "/usr/sbin/sshd (PID 1243)" },
  { label: "Hash (SHA256)", value: "b7c4d1e9f2a8c6d4e7f1...", mono: true },
];

const RELATED_EVENTS = [
  { label: "Permissions changed on sshd_config", time: "8 Sep 2026, 14:31:58", hex: "#eda100" },
  { label: "SSH service restarted", time: "8 Sep 2026, 14:32:20", hex: "#2a78d6" },
  { label: "New admin session from FIN-WS-023", time: "8 Sep 2026, 14:33:04", hex: "#1baf7a" },
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

/* --------------------------------- header --------------------------------- */

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
        className="flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={cn("h-3 w-3 shrink-0 text-text-secondary transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-1.5 w-40 rounded-lg border border-border-default bg-surface-1 p-1 shadow-lg">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "w-full whitespace-nowrap rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium transition-colors",
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

export function FileIntegrityHeaderRight() {
  const [range, setRange] = React.useState("Last 24 hours");
  const [changeType, setChangeType] = React.useState("All Changes");

  return (
    <div className="flex items-center gap-2">
      <InlineSelect className="w-32" value={range} options={["Last 1 hour", "Last 24 hours", "Last 7 days", "Last 30 days"]} onChange={setRange} />
      <InlineSelect className="w-32" value={changeType} options={["All Changes", "Modified", "Created", "Deleted", "Renamed"]} onChange={setChangeType} />
      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Add Path
      </button>
    </div>
  );
}

/* --------------------------------- tree ------------------------------------ */

function TreeItem({
  node,
  depth,
  selectedPath,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  selectedPath: string | null;
  onSelect: (path: string) => void;
}) {
  const [open, setOpen] = React.useState(depth < 2);
  const hasChildren = !!node.children?.length;
  const isSelected = !!node.path && node.path === selectedPath;
  const isFolder = hasChildren || depth === 0;
  const Icon = isFolder ? Folder : File;

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (hasChildren) setOpen((v) => !v);
          if (node.path) onSelect(node.path);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (hasChildren) setOpen((v) => !v);
            if (node.path) onSelect(node.path);
          }
        }}
        style={{ paddingLeft: 8 + depth * 14 }}
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 pr-2 text-[12px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
          isSelected ? "bg-brand-primary/10 text-brand-primary font-semibold" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
        )}
      >
        {hasChildren ? (
          <ChevronRight className={cn("h-3 w-3 shrink-0 transition-transform duration-150", open && "rotate-90")} aria-hidden="true" />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <Icon className={cn("h-3.5 w-3.5 shrink-0", isSelected && "text-brand-primary")} aria-hidden="true" />
        <span className="flex-1 truncate">{node.label}</span>
        {node.count !== undefined ? <span className="shrink-0 text-[10.5px] text-text-secondary">({node.count})</span> : null}
      </div>
      {hasChildren && open ? (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.label + (child.path ?? "")} node={child} depth={depth + 1} selectedPath={selectedPath} onSelect={onSelect} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MonitoredPathsPanel({ selectedPath, onSelect }: { selectedPath: string; onSelect: (path: string) => void }) {
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="shrink-0 px-3.5 pt-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-bold text-text-primary">Monitored Paths</h2>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Path settings" className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2 hover:text-text-primary">
              <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button type="button" className="flex items-center gap-1 text-[11.5px] font-medium text-brand-primary hover:underline">
              <Plus className="h-3 w-3" aria-hidden="true" />
              Add Path
            </button>
          </div>
        </div>
        <div className="mt-2.5 flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-2 px-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search monitored paths..."
            className="h-full w-full bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-2.5 min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        <TreeItem node={MONITORED_TREE} depth={0} selectedPath={selectedPath} onSelect={onSelect} />
      </div>
    </div>
  );
}

/* ----------------------------- change events ------------------------------- */

function ChangeEventsPanel({
  selectedPath,
  onOpenEvent,
}: {
  selectedPath: string;
  onOpenEvent: (i: number) => void;
}) {
  const [activeFilter, setActiveFilter] = React.useState<EventKind | "All">("All");
  const [search, setSearch] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const [page, setPage] = React.useState(1);

  const filtered = CHANGE_EVENTS.filter((e) => {
    const matchesFilter = activeFilter === "All" || e.event === activeFilter;
    const matchesSearch =
      search === "" ||
      e.filename.toLowerCase().includes(search.toLowerCase()) ||
      e.user.toLowerCase().includes(search.toLowerCase()) ||
      e.host.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleRow = (i: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const allChecked = filtered.length > 0 && selectedRows.size === filtered.length;
  const toggleAll = () => setSelectedRows((prev) => (prev.size === filtered.length ? new Set() : new Set(filtered.map((_, i) => i))));

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-border-default px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-bold text-text-primary">Change Events</h2>
            <p className="text-[11px] text-text-secondary">Showing file integrity events for {selectedPath}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" className="flex h-7 items-center gap-1.5 rounded-md border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-secondary hover:bg-surface-2">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Export
            </button>
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2" aria-label="More options">
              <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-2.5 flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-2 px-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events (filename, user, hash, etc.)"
            className="h-full w-full bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {EVENT_FILTERS.map((f) => {
            const isActive = f.kind === activeFilter;
            const meta = f.kind !== "All" ? EVENT_META[f.kind] : null;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setActiveFilter(f.kind)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-150",
                  isActive
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-border-default bg-surface-1 text-text-secondary hover:border-brand-primary/50 hover:text-text-primary"
                )}
              >
                {meta ? <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dot)} /> : null}
                {f.label} ({f.count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-surface-1">
            <tr className="border-b border-border-default text-[10.5px] text-text-secondary">
              <th className="w-8 py-2 pl-4">
                <Checkbox checked={allChecked} onChange={toggleAll} />
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">
                <span className="flex items-center gap-1">
                  Time
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </span>
              </th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">Event</th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">Path</th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">Filename</th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">User</th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">Host</th>
              <th className="whitespace-nowrap px-2 py-2 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => {
              const meta = EVENT_META[e.event];
              return (
                <tr key={i} className="cursor-pointer border-b border-border-default text-[11.5px] hover:bg-surface-2" onClick={() => onOpenEvent(i)}>
                  <td className="py-2.5 pl-4" onClick={(ev) => ev.stopPropagation()}>
                    <Checkbox checked={selectedRows.has(i)} onChange={() => toggleRow(i)} />
                  </td>
                  <td className="whitespace-nowrap px-2 py-2.5 tabular-nums text-text-secondary">{e.time}</td>
                  <td className="whitespace-nowrap px-2 py-2.5">
                    <span className={cn("inline-flex items-center gap-1.5 font-semibold", meta.text)}>
                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dot)} />
                      {e.event}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{e.path}</td>
                  <td className="whitespace-nowrap px-2 py-2.5 font-medium text-text-primary">{e.filename}</td>
                  <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{e.user}</td>
                  <td className="whitespace-nowrap px-2 py-2.5 text-text-primary">{e.host}</td>
                  <td className="whitespace-nowrap px-2 py-2.5 text-text-secondary">{e.details}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
            className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
          </button>
          <button type="button" className="flex h-6 w-6 items-center justify-center rounded bg-brand-primary text-[11px] font-medium text-white">
            {page}
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
            className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2"
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <span className="text-[11px] text-text-secondary">
          Showing {filtered.length} of {CHANGE_EVENTS.length} events
        </span>
      </div>
    </div>
  );
}

/* ------------------------------- detail drawer ------------------------------ */

function DiffPane({ lines, label }: { lines: typeof DIFF_LINES; label: string }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-border-default">
      <div className="border-b border-border-default bg-surface-2 px-2.5 py-1.5">
        <p className="text-[10.5px] font-semibold text-text-secondary">{label}</p>
      </div>
      <div className="overflow-x-auto font-mono text-[10.5px] leading-5">
        {lines.map((l) => (
          <div
            key={l.n}
            className={cn(
              "flex gap-2 px-2 whitespace-pre",
              l.type === "removed" && "bg-error/10",
              l.type === "added" && "bg-success/10"
            )}
          >
            <span className="w-4 shrink-0 select-none text-right text-text-secondary/60">{l.n}</span>
            <span
              className={cn(
                "min-w-0 flex-1",
                l.type === "removed" ? "text-error" : l.type === "added" ? "text-success" : "text-text-primary"
              )}
            >
              {l.type === "removed" ? "- " : l.type === "added" ? "+ " : "  "}
              {l.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UnifiedDiff() {
  const rows: Array<{ n: number; type: "context" | "removed" | "added"; text: string }> = [
    { n: 1, type: "context", text: "# SSHD configuration" },
    { n: 2, type: "context", text: "Port 22" },
    { n: 3, type: "context", text: "Protocol 2" },
    { n: 4, type: "removed", text: "PermitRootLogin no" },
    { n: 4, type: "added", text: "PermitRootLogin prohibit-password" },
    { n: 5, type: "removed", text: "PasswordAuthentication no" },
    { n: 5, type: "added", text: "PasswordAuthentication yes" },
    { n: 6, type: "context", text: "ChallengeResponseAuthentication no" },
    { n: 7, type: "context", text: "UsePAM yes" },
    { n: 8, type: "context", text: "X11Forwarding no" },
    { n: 9, type: "removed", text: "AllowUsers admin ops" },
    { n: 9, type: "added", text: "AllowUsers admin ops secops" },
    { n: 10, type: "added", text: "# Added for CyberSutra hardening" },
    { n: 11, type: "added", text: "LoginGraceTime 30" },
    { n: 12, type: "added", text: "MaxAuthTries 3" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-border-default">
      <div className="overflow-x-auto font-mono text-[10.5px] leading-5">
        {rows.map((l, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2 px-2 whitespace-pre",
              l.type === "removed" && "bg-error/10",
              l.type === "added" && "bg-success/10"
            )}
          >
            <span className="w-4 shrink-0 select-none text-right text-text-secondary/60">{l.n}</span>
            <span
              className={cn(
                "min-w-0 flex-1",
                l.type === "removed" ? "text-error" : l.type === "added" ? "text-success" : "text-text-primary"
              )}
            >
              {l.type === "removed" ? "- " : l.type === "added" ? "+ " : "  "}
              {l.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventDetailDrawer({ event, onClose }: { event: ChangeEvent; onClose: () => void }) {
  const [tab, setTab] = React.useState(1);
  const [diffMode, setDiffMode] = React.useState<0 | 1>(0);
  const meta = EVENT_META[event.event];

  return (
    <div className="flex h-full w-96 shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border-default px-3.5 py-3">
        <div className="min-w-0">
          <span className={cn("flex items-center gap-1.5 text-[13px] font-bold", meta.text)}>
            <span className={cn("h-2 w-2 shrink-0 rounded-full", meta.dot)} />
            File {event.event}
          </span>
          <p className="mt-0.5 text-[11px] tabular-nums text-text-secondary">{event.time}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-text-secondary hover:bg-surface-2 hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-default px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-secondary">
            <File className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-bold text-text-primary">{event.filename}</p>
            <p className="truncate text-[10.5px] text-text-secondary">
              {event.path}/{event.filename}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[10.5px] font-medium text-text-secondary hover:bg-surface-2">
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            View on Host
          </button>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2" aria-label="More options">
            <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-b border-border-default px-3.5">
        {DETAIL_TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(i)}
            className={cn(
              "flex items-center gap-1 border-b-2 py-2 text-[11.5px] font-medium transition-colors duration-150",
              tab === i ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t}
            {t === "Related Events" ? <span className="tabular-nums">({RELATED_EVENTS.length})</span> : null}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        {tab === 1 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-text-secondary">Showing changes (17 lines)</p>
              <div className="flex items-center gap-0.5 rounded-md bg-surface-2 p-0.5">
                <button
                  type="button"
                  onClick={() => setDiffMode(0)}
                  className={cn(
                    "rounded px-2 py-1 text-[10.5px] font-medium transition-colors duration-150",
                    diffMode === 0 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Side by side
                </button>
                <button
                  type="button"
                  onClick={() => setDiffMode(1)}
                  className={cn(
                    "rounded px-2 py-1 text-[10.5px] font-medium transition-colors duration-150",
                    diffMode === 1 ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Unified
                </button>
              </div>
            </div>

            <div className="mt-2.5">
              {diffMode === 0 ? (
                <div className="flex gap-2">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="mb-1 text-[10px] text-text-secondary">
                      Previous Version <span className="tabular-nums">8 Sep 2026, 12:11:03</span>
                    </p>
                    <DiffPane lines={DIFF_LINES} label="a3f5e2d9c7b1..." />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="mb-1 text-[10px] text-text-secondary">
                      Current Version <span className="tabular-nums">8 Sep 2026, 14:32:11</span>
                    </p>
                    <DiffPane lines={DIFF_LINES_CURRENT} label="b7c4d1e9f2a8..." />
                  </div>
                </div>
              ) : (
                <UnifiedDiff />
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-3 text-[10.5px] text-text-secondary">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-error/40" /> Removed
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-success/40" /> Added
              </span>
            </div>

            <p className="mt-4 text-[11.5px] font-bold text-text-primary">Change Summary</p>
            <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
              Authentication settings updated and additional hardening parameters added.
            </p>

            <div className="mt-3 flex flex-col gap-2">
              {EVENT_METADATA.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-2 text-[11.5px]">
                  <span className="shrink-0 text-text-secondary">{m.label}</span>
                  <span className={cn("flex items-center gap-1 truncate text-right font-medium text-text-primary", m.mono && "font-mono text-[10.5px]")}>
                    {m.value}
                    {m.mono ? <Copy className="h-2.5 w-2.5 shrink-0 text-text-secondary" aria-hidden="true" /> : null}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : tab === 0 ? (
          <div className="flex flex-col gap-2">
            {EVENT_METADATA.map((m) => (
              <div key={m.label} className="flex items-center justify-between gap-2 text-[11.5px]">
                <span className="shrink-0 text-text-secondary">{m.label}</span>
                <span className="truncate text-right font-medium text-text-primary">{m.value}</span>
              </div>
            ))}
          </div>
        ) : tab === 2 ? (
          <div className="flex items-center justify-center py-8 text-[12px] text-text-secondary">No extended metadata available.</div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {RELATED_EVENTS.map((e, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: e.hex }} />
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary">{e.label}</p>
                  <p className="text-[10px] tabular-nums text-text-secondary">{e.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- main ---------------------------------- */

export function FileIntegrityMonitoring() {
  const [selectedPath, setSelectedPath] = React.useState("/etc/ssh");
  const [openEventIndex, setOpenEventIndex] = React.useState<number | null>(0);

  return (
    <div className="flex h-full min-h-0 overflow-hidden text-[13px]">
      <MonitoredPathsPanel selectedPath={selectedPath} onSelect={setSelectedPath} />
      <ChangeEventsPanel selectedPath={selectedPath} onOpenEvent={setOpenEventIndex} />
      {openEventIndex !== null ? (
        <EventDetailDrawer event={CHANGE_EVENTS[openEventIndex]} onClose={() => setOpenEventIndex(null)} />
      ) : null}
    </div>
  );
}
