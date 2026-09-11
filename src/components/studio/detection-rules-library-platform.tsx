"use client";

import * as React from "react";
import {
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Copy,
  Download,
  Filter,
  FlaskConical,
  Globe,
  KeyRound,
  Laptop,
  MoreHorizontal,
  Network,
  Play,
  Plus,
  Search,
  Server,
  Trash2,
  Upload,
  Wand2,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Production" | "Experimental" | "Deprecated" | "Disabled";
type LeftTab = "Rules" | "Collections" | "MITRE ATT&CK" | "Shared";
type RuleDetailTab = "Rule" | "Details" | "References" | "ATT&CK" | "Comments";
type SidePanelTab = "Overview" | "Version History" | "Test Results";

type Rule = {
  id: string;
  name: string;
  ruleId: string;
  mitreId: string;
  platform: string;
  platformIcon: React.ElementType;
  severity: Severity;
  status: Status;
  enabled: boolean;
  description: string;
  author: string;
  created: string;
  modified: string;
  deployments: number;
  ruleType: string;
  license: string;
  tags: string[];
  yaml: string;
  references: string[];
  attack: Array<{ id: string; name: string }>;
  comments: Array<{ author: string; date: string; text: string }>;
  environments: Array<{ name: string; enabled: boolean; deployed: string | null }>;
  history: Array<{ version: string; date: string; note: string; who: string }>;
};

/* -------------------------------- dummy data -------------------------------- */

function buildYaml(name: string, id: string) {
  return `title: ${name}
id: ${id}
status: experimental
description: |
  Detects potentially malicious PowerShell execution including
  encoded commands, obfuscated scripts, or common attack patterns.
author: CyberSutra Threat Research
date: 2024-09-01
modified: 2024-09-08
tags:
  - attack.execution
  - attack.t1059
  - powershell
  - windows
  - suspicious
logsource:
  product: windows
  service: sysmon
detection:
  selection_encoded:
    EventID: 1
    Image|endswith: '\\\\powershell.exe'
    CommandLine|contains:
      - '-enc'
      - '-encodedcommand'
  selection_obfuscation:
    EventID: 1
    Image|endswith: '\\\\powershell.exe'
    CommandLine|contains|all:
      - '-nop'
      - '-w hidden'
  condition: 1 of selection_*
falsepositives:
  - Legitimate administrative scripts
level: high`;
}

const RULES: Rule[] = [
  {
    id: "r1",
    name: "Suspicious PowerShell Execution",
    ruleId: "CSR-DET-001",
    mitreId: "T1059",
    platform: "Windows",
    platformIcon: Laptop,
    severity: "High",
    status: "Production",
    enabled: true,
    description: "Detects potentially malicious PowerShell execution with encoded commands or obfuscation",
    author: "CyberSutra Threat Research",
    created: "1 Sep 2024, 10:24 IST",
    modified: "8 Sep 2024, 16:12 IST",
    deployments: 3,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.execution", "attack.t1059", "powershell", "windows", "suspicious"],
    yaml: buildYaml("Suspicious PowerShell Execution", "CSR-DET-001"),
    references: [
      "https://attack.mitre.org/techniques/T1059/001/",
      "https://github.com/SigmaHQ/sigma/blob/master/rules/windows/process_creation/proc_creation_win_powershell_encoded.yml",
      "https://www.microsoft.com/security/blog/powershell-detections",
    ],
    attack: [
      { id: "T1059", name: "Command and Scripting Interpreter" },
      { id: "T1059.001", name: "PowerShell" },
      { id: "T1027", name: "Obfuscated Files or Information" },
    ],
    comments: [
      { author: "Aditi Sharma", date: "8 Sep 2024", text: "Tuned selection_obfuscation to cut down on false positives from RMM tooling." },
      { author: "Rohan Kapoor", date: "5 Sep 2024", text: "Confirmed detection fires correctly against Atomic Red Team T1059.001 tests." },
    ],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.2.0" },
      { name: "Staging", enabled: true, deployed: "v1.2.0" },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [
      { version: "v1.2.0", date: "8 Sep 2024, 16:12", note: "Improved detection logic, reduced false positives", who: "AS" },
      { version: "v1.1.0", date: "5 Sep 2024, 11:03", note: "Added additional obfuscation patterns", who: "RK" },
      { version: "v1.0.0", date: "1 Sep 2024, 10:24", note: "Initial version", who: "AS" },
    ],
  },
  {
    id: "r2",
    name: "Credential Dumping via LSASS",
    ruleId: "CSR-DET-002",
    mitreId: "T1003",
    platform: "Windows",
    platformIcon: Laptop,
    severity: "Critical",
    status: "Production",
    enabled: true,
    description: "Detects processes accessing LSASS memory for credential extraction",
    author: "CyberSutra Threat Research",
    created: "3 Aug 2024, 09:10 IST",
    modified: "6 Sep 2024, 12:40 IST",
    deployments: 3,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.credential-access", "attack.t1003", "lsass", "windows"],
    yaml: buildYaml("Credential Dumping via LSASS", "CSR-DET-002"),
    references: ["https://attack.mitre.org/techniques/T1003/001/"],
    attack: [{ id: "T1003", name: "OS Credential Dumping" }, { id: "T1003.001", name: "LSASS Memory" }],
    comments: [{ author: "Rohan Kapoor", date: "6 Sep 2024", text: "Validated against Mimikatz and procdump." }],
    environments: [
      { name: "Production", enabled: true, deployed: "v2.0.0" },
      { name: "Staging", enabled: true, deployed: "v2.0.0" },
      { name: "Development", enabled: true, deployed: "v2.0.0" },
    ],
    history: [{ version: "v2.0.0", date: "6 Sep 2024, 12:40", note: "Added procdump detection", who: "RK" }],
  },
  {
    id: "r3",
    name: "Ransomware File Extensions",
    ruleId: "CSR-DET-003",
    mitreId: "T1486",
    platform: "Multiple",
    platformIcon: Globe,
    severity: "High",
    status: "Production",
    enabled: true,
    description: "Detects mass file renames to known ransomware extensions",
    author: "CyberSutra Threat Research",
    created: "12 Jul 2024, 14:02 IST",
    modified: "2 Sep 2024, 08:55 IST",
    deployments: 3,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.impact", "attack.t1486", "ransomware"],
    yaml: buildYaml("Ransomware File Extensions", "CSR-DET-003"),
    references: ["https://attack.mitre.org/techniques/T1486/"],
    attack: [{ id: "T1486", name: "Data Encrypted for Impact" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.4.0" },
      { name: "Staging", enabled: true, deployed: "v1.4.0" },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [{ version: "v1.4.0", date: "2 Sep 2024, 08:55", note: "Extended extension list", who: "AS" }],
  },
  {
    id: "r4",
    name: "Suspicious WMI Activity",
    ruleId: "CSR-DET-004",
    mitreId: "T1047",
    platform: "Windows",
    platformIcon: Laptop,
    severity: "Medium",
    status: "Production",
    enabled: true,
    description: "Detects WMI usage for lateral movement or persistence",
    author: "CyberSutra Threat Research",
    created: "20 Jun 2024, 11:30 IST",
    modified: "30 Aug 2024, 09:18 IST",
    deployments: 2,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.execution", "attack.t1047", "wmi"],
    yaml: buildYaml("Suspicious WMI Activity", "CSR-DET-004"),
    references: ["https://attack.mitre.org/techniques/T1047/"],
    attack: [{ id: "T1047", name: "Windows Management Instrumentation" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.1.0" },
      { name: "Staging", enabled: true, deployed: "v1.1.0" },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [{ version: "v1.1.0", date: "30 Aug 2024, 09:18", note: "Reduced noise from admin scripts", who: "AS" }],
  },
  {
    id: "r5",
    name: "Brute Force SSH Attempts",
    ruleId: "CSR-DET-005",
    mitreId: "T1110",
    platform: "Linux",
    platformIcon: Server,
    severity: "Medium",
    status: "Production",
    enabled: true,
    description: "Detects repeated failed SSH authentication attempts from a single source",
    author: "CyberSutra Threat Research",
    created: "15 Jun 2024, 10:00 IST",
    modified: "25 Aug 2024, 17:22 IST",
    deployments: 3,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.credential-access", "attack.t1110", "ssh", "linux"],
    yaml: buildYaml("Brute Force SSH Attempts", "CSR-DET-005"),
    references: ["https://attack.mitre.org/techniques/T1110/"],
    attack: [{ id: "T1110", name: "Brute Force" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.3.0" },
      { name: "Staging", enabled: true, deployed: "v1.3.0" },
      { name: "Development", enabled: true, deployed: "v1.3.0" },
    ],
    history: [{ version: "v1.3.0", date: "25 Aug 2024, 17:22", note: "Tuned threshold to 10 attempts/5min", who: "RK" }],
  },
  {
    id: "r6",
    name: "Unusual Outbound DNS",
    ruleId: "CSR-DET-006",
    mitreId: "T1071",
    platform: "Network",
    platformIcon: Network,
    severity: "High",
    status: "Experimental",
    enabled: false,
    description: "Detects DNS tunneling and abnormal query patterns indicative of C2",
    author: "CyberSutra Threat Research",
    created: "10 Aug 2024, 13:15 IST",
    modified: "1 Sep 2024, 10:05 IST",
    deployments: 1,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.command-and-control", "attack.t1071", "dns"],
    yaml: buildYaml("Unusual Outbound DNS", "CSR-DET-006"),
    references: ["https://attack.mitre.org/techniques/T1071/004/"],
    attack: [{ id: "T1071.004", name: "DNS" }],
    comments: [],
    environments: [
      { name: "Production", enabled: false, deployed: null },
      { name: "Staging", enabled: true, deployed: "v0.3.0" },
      { name: "Development", enabled: true, deployed: "v0.3.0" },
    ],
    history: [{ version: "v0.3.0", date: "1 Sep 2024, 10:05", note: "Initial experimental version", who: "AS" }],
  },
  {
    id: "r7",
    name: "Potential Data Exfiltration (HTTPS)",
    ruleId: "CSR-DET-007",
    mitreId: "T1041",
    platform: "Network",
    platformIcon: Network,
    severity: "High",
    status: "Production",
    enabled: true,
    description: "Detects large outbound HTTPS transfers to rarely-seen destinations",
    author: "CyberSutra Threat Research",
    created: "5 Aug 2024, 15:40 IST",
    modified: "28 Aug 2024, 12:00 IST",
    deployments: 2,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.exfiltration", "attack.t1041"],
    yaml: buildYaml("Potential Data Exfiltration (HTTPS)", "CSR-DET-007"),
    references: ["https://attack.mitre.org/techniques/T1041/"],
    attack: [{ id: "T1041", name: "Exfiltration Over C2 Channel" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.0.1" },
      { name: "Staging", enabled: true, deployed: "v1.0.1" },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [{ version: "v1.0.1", date: "28 Aug 2024, 12:00", note: "Threshold adjustment", who: "RK" }],
  },
  {
    id: "r8",
    name: "New Local Administrator Creation",
    ruleId: "CSR-DET-008",
    mitreId: "T1136",
    platform: "Windows",
    platformIcon: Laptop,
    severity: "Medium",
    status: "Production",
    enabled: true,
    description: "Detects creation of new local administrator accounts",
    author: "CyberSutra Threat Research",
    created: "1 Aug 2024, 09:00 IST",
    modified: "20 Aug 2024, 14:30 IST",
    deployments: 3,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.persistence", "attack.t1136"],
    yaml: buildYaml("New Local Administrator Creation", "CSR-DET-008"),
    references: ["https://attack.mitre.org/techniques/T1136/001/"],
    attack: [{ id: "T1136.001", name: "Local Account" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.0.0" },
      { name: "Staging", enabled: true, deployed: "v1.0.0" },
      { name: "Development", enabled: true, deployed: "v1.0.0" },
    ],
    history: [{ version: "v1.0.0", date: "20 Aug 2024, 14:30", note: "Initial version", who: "AS" }],
  },
  {
    id: "r9",
    name: "Suspicious Scheduled Task",
    ruleId: "CSR-DET-009",
    mitreId: "T1053",
    platform: "Windows",
    platformIcon: Laptop,
    severity: "Medium",
    status: "Production",
    enabled: true,
    description: "Detects scheduled task creation used for persistence",
    author: "CyberSutra Threat Research",
    created: "22 Jul 2024, 10:12 IST",
    modified: "15 Aug 2024, 09:47 IST",
    deployments: 2,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.persistence", "attack.t1053"],
    yaml: buildYaml("Suspicious Scheduled Task", "CSR-DET-009"),
    references: ["https://attack.mitre.org/techniques/T1053/005/"],
    attack: [{ id: "T1053.005", name: "Scheduled Task" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.1.0" },
      { name: "Staging", enabled: true, deployed: "v1.1.0" },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [{ version: "v1.1.0", date: "15 Aug 2024, 09:47", note: "Added exclusions for known software", who: "RK" }],
  },
  {
    id: "r10",
    name: "Mass Email Sending",
    ruleId: "CSR-DET-010",
    mitreId: "T1114",
    platform: "Office 365",
    platformIcon: Cloud,
    severity: "High",
    status: "Production",
    enabled: true,
    description: "Detects a compromised mailbox sending unusually high volumes of email",
    author: "CyberSutra Threat Research",
    created: "18 Jul 2024, 11:20 IST",
    modified: "10 Aug 2024, 16:03 IST",
    deployments: 2,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.collection", "attack.t1114", "o365"],
    yaml: buildYaml("Mass Email Sending", "CSR-DET-010"),
    references: ["https://attack.mitre.org/techniques/T1114/"],
    attack: [{ id: "T1114", name: "Email Collection" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.0.2" },
      { name: "Staging", enabled: true, deployed: "v1.0.2" },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [{ version: "v1.0.2", date: "10 Aug 2024, 16:03", note: "Adjusted volume threshold", who: "AS" }],
  },
  {
    id: "r11",
    name: "Suspicious RDP from New Location",
    ruleId: "CSR-DET-011",
    mitreId: "T1021",
    platform: "Multiple",
    platformIcon: Globe,
    severity: "Medium",
    status: "Production",
    enabled: true,
    description: "Detects RDP logons originating from geographically anomalous locations",
    author: "CyberSutra Threat Research",
    created: "8 Jul 2024, 09:55 IST",
    modified: "2 Aug 2024, 13:10 IST",
    deployments: 3,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.lateral-movement", "attack.t1021"],
    yaml: buildYaml("Suspicious RDP from New Location", "CSR-DET-011"),
    references: ["https://attack.mitre.org/techniques/T1021/001/"],
    attack: [{ id: "T1021.001", name: "Remote Desktop Protocol" }],
    comments: [],
    environments: [
      { name: "Production", enabled: true, deployed: "v1.2.1" },
      { name: "Staging", enabled: true, deployed: "v1.2.1" },
      { name: "Development", enabled: true, deployed: "v1.2.1" },
    ],
    history: [{ version: "v1.2.1", date: "2 Aug 2024, 13:10", note: "Added ASN allow-list", who: "RK" }],
  },
  {
    id: "r12",
    name: "Living-off-the-Land Binaries",
    ruleId: "CSR-DET-012",
    mitreId: "T1218",
    platform: "Windows",
    platformIcon: Laptop,
    severity: "Medium",
    status: "Disabled",
    enabled: false,
    description: "Detects abuse of signed system binaries (LOLBins) for execution or defense evasion",
    author: "CyberSutra Threat Research",
    created: "1 Jul 2024, 08:30 IST",
    modified: "20 Jul 2024, 10:45 IST",
    deployments: 0,
    ruleType: "Sigma",
    license: "Custom (Internal)",
    tags: ["attack.defense-evasion", "attack.t1218"],
    yaml: buildYaml("Living-off-the-Land Binaries", "CSR-DET-012"),
    references: ["https://attack.mitre.org/techniques/T1218/"],
    attack: [{ id: "T1218", name: "System Binary Proxy Execution" }],
    comments: [],
    environments: [
      { name: "Production", enabled: false, deployed: null },
      { name: "Staging", enabled: false, deployed: null },
      { name: "Development", enabled: false, deployed: null },
    ],
    history: [{ version: "v1.0.0", date: "20 Jul 2024, 10:45", note: "Disabled pending tuning — high FP rate", who: "AS" }],
  },
];

const TOTAL_RULES = 428;

const SEVERITY_STYLE: Record<Severity, string> = {
  Critical: "bg-error/10 text-error",
  High: "bg-warning/10 text-warning",
  Medium: "bg-info/10 text-info",
  Low: "bg-success/10 text-success",
};

const STATUS_DOT: Record<Status, string> = {
  Production: "bg-success",
  Experimental: "bg-warning",
  Deprecated: "bg-text-secondary",
  Disabled: "bg-text-secondary",
};

/* -------------------------------- small ui -------------------------------- */

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        checked ? "bg-brand-primary" : "bg-surface-2"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-150",
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function Dropdown({
  trigger,
  children,
  align = "right",
  width = "w-44",
}: {
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  align?: "left" | "right";
  width?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open ? (
        <div
          className={cn(
            "absolute top-full z-30 mt-1.5 overflow-hidden rounded-lg border border-border-default bg-surface-1 py-1 shadow-lg",
            align === "right" ? "right-0" : "left-0",
            width
          )}
        >
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------- left panel -------------------------------- */

function LeftPanel({
  activeLeftTab,
  setActiveLeftTab,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  filteredRules,
  selectedId,
  onSelect,
  selectedIds,
  toggleSelected,
}: {
  activeLeftTab: LeftTab;
  setActiveLeftTab: (t: LeftTab) => void;
  search: string;
  setSearch: (v: string) => void;
  statusFilter: "All Status" | Status;
  setStatusFilter: (v: "All Status" | Status) => void;
  filteredRules: Rule[];
  selectedId: string;
  onSelect: (id: string) => void;
  selectedIds: Set<string>;
  toggleSelected: (id: string) => void;
}) {
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);
  const [severityFilters, setSeverityFilters] = React.useState<Set<Severity>>(new Set());

  return (
    <div className="flex h-full w-[340px] shrink-0 flex-col overflow-hidden border-r border-border-default bg-surface-1">
      <div className="scrollbar-thin flex shrink-0 items-center gap-2.5 overflow-x-auto border-b border-border-default px-3 pt-3">
        {(["Rules", "Collections", "MITRE ATT&CK", "Shared"] as LeftTab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveLeftTab(t)}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 px-1 pb-2.5 text-[11.5px] font-medium transition-colors duration-150",
              activeLeftTab === t
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {activeLeftTab === "Rules" ? (
        <>
          <div className="flex shrink-0 items-center gap-1.5 px-3 py-2.5">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rules, tags, techniques..."
                className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 px-3 pb-2.5">
            <Dropdown
              width="w-40"
              trigger={
                <button
                  type="button"
                  className="flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
                >
                  <span className="truncate">{statusFilter}</span>
                </button>
              }
            >
              {(close) => (
                <>
                  {(["All Status", "Production", "Experimental", "Deprecated", "Disabled"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setStatusFilter(s);
                        close();
                      }}
                      className={cn(
                        "block w-full px-3 py-1.5 text-left text-[12px] font-medium",
                        statusFilter === s ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </>
              )}
            </Dropdown>

            <button
              type="button"
              onClick={() => setShowFilterPanel((v) => !v)}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150",
                showFilterPanel || severityFilters.size
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2"
              )}
              aria-label="More filters"
              aria-expanded={showFilterPanel}
            >
              <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {showFilterPanel ? (
            <div className="shrink-0 border-b border-border-default px-3 pb-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">Severity</p>
              <div className="flex flex-wrap gap-1.5">
                {(["Critical", "High", "Medium", "Low"] as Severity[]).map((s) => {
                  const active = severityFilters.has(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setSeverityFilters((prev) => {
                          const next = new Set(prev);
                          if (next.has(s)) next.delete(s);
                          else next.add(s);
                          return next;
                        })
                      }
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors duration-150",
                        active ? SEVERITY_STYLE[s] : "bg-surface-2 text-text-secondary"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="flex shrink-0 items-center justify-between px-3 pb-2 text-[11px] text-text-secondary">
            <span>
              {filteredRules.length.toLocaleString()} of {TOTAL_RULES.toLocaleString()} rules
            </span>
            {selectedIds.size ? <span className="font-medium text-brand-primary">{selectedIds.size} selected</span> : null}
          </div>

          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-2">
            {(severityFilters.size
              ? filteredRules.filter((r) => severityFilters.has(r.severity))
              : filteredRules
            ).map((r) => {
              const isActive = r.id === selectedId;
              const PlatformIcon = r.platformIcon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelect(r.id)}
                  className={cn(
                    "flex w-full items-start gap-2 border-l-2 px-3 py-2.5 text-left transition-colors duration-100 hover:bg-surface-2",
                    isActive ? "border-brand-primary bg-brand-primary/5" : "border-transparent"
                  )}
                >
                  <span onClick={(e) => e.stopPropagation()} className="mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={() => toggleSelected(r.id)}
                      className="h-3.5 w-3.5 cursor-pointer rounded border-border-default accent-[var(--brand-primary)]"
                      aria-label={`Select ${r.name}`}
                    />
                  </span>
                  <PlatformIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-[12px] font-semibold leading-tight", isActive ? "text-brand-primary" : "text-text-primary")}>
                      {r.name}
                    </p>
                    <p className="mt-1 truncate text-[10.5px] leading-tight text-text-secondary">
                      {r.ruleId} · {r.mitreId} · {r.platform}
                    </p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", SEVERITY_STYLE[r.severity])}>
                    {r.severity}
                  </span>
                </button>
              );
            })}

            {filteredRules.length === 0 ? (
              <div className="flex flex-col items-center gap-1.5 px-4 py-10 text-center">
                <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
                <p className="text-[12px] font-medium text-text-secondary">No rules match your search</p>
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center justify-between border-t border-border-default px-3 py-2">
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2 disabled:opacity-40" disabled>
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-medium",
                    p === 1 ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-2"
                  )}
                >
                  {p}
                </button>
              ))}
              <span className="px-0.5 text-[11px] text-text-secondary">…</span>
              <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-medium text-text-secondary hover:bg-surface-2">
                36
              </button>
            </div>
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
          <BookmarkCheck className="h-6 w-6 text-text-secondary" aria-hidden="true" />
          <p className="text-[12.5px] font-semibold text-text-primary">{activeLeftTab}</p>
          <p className="text-[11.5px] text-text-secondary">Nothing here yet.</p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- rule yaml editor -------------------------------- */

function RuleEditor({ rule }: { rule: Rule }) {
  const [detailTab, setDetailTab] = React.useState<RuleDetailTab>("Rule");
  const [format, setFormat] = React.useState<"YAML" | "JSON">("YAML");
  const [testRange, setTestRange] = React.useState("Last 24 hours");
  const [running, setRunning] = React.useState(false);
  const [testOutput, setTestOutput] = React.useState<string | null>(null);
  const lines = rule.yaml.split("\n");

  const runTest = () => {
    setRunning(true);
    setTestOutput(null);
    window.setTimeout(() => {
      setRunning(false);
      setTestOutput(`Matched 12 events in ${testRange.toLowerCase()}. 0 syntax errors.`);
    }, 900);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-1 border-b border-border-default px-3">
        {(["Rule", "Details", "References", "ATT&CK", "Comments"] as RuleDetailTab[]).map((t) => {
          const badge =
            t === "References" ? rule.references.length : t === "Comments" ? rule.comments.length : null;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setDetailTab(t)}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors duration-150",
                detailTab === t
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {t}
              {badge !== null ? <span className="ml-1 text-text-secondary">({badge})</span> : null}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {detailTab === "Rule" ? (
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-2">
              <span className="text-[12px] font-semibold text-text-primary">Rule ({format})</span>
              <div className="flex items-center gap-2">
                <Dropdown
                  width="w-24"
                  trigger={
                    <button
                      type="button"
                      className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
                    >
                      {format}
                    </button>
                  }
                >
                  {(close) => (
                    <>
                      {(["YAML", "JSON"] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => {
                            setFormat(f);
                            close();
                          }}
                          className={cn(
                            "block w-full px-3 py-1.5 text-left text-[12px] font-medium",
                            format === f ? "bg-brand-primary/10 text-brand-primary" : "text-text-primary hover:bg-surface-2"
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </>
                  )}
                </Dropdown>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(rule.yaml)}
                  className="flex h-7 items-center gap-1 rounded-md border border-border-default bg-surface-1 px-2 text-[11.5px] font-medium text-text-primary hover:bg-surface-2"
                >
                  <Copy className="h-3 w-3" aria-hidden="true" />
                  Format
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-[#0d1117] px-2 py-2">
              <pre className="font-mono text-[12px] leading-[20px]">
                {lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 shrink-0 select-none pr-3 text-right text-[#4b5563]">{i + 1}</span>
                    <code className="whitespace-pre text-[#c9d1d9]">{line || " "}</code>
                  </div>
                ))}
              </pre>
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-border-default px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Rule is valid
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={testRange}
                  onChange={(e) => setTestRange(e.target.value)}
                  className="h-8 rounded-lg border border-border-default bg-surface-1 px-2 text-[11.5px] font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <button
                  type="button"
                  onClick={runTest}
                  disabled={running}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2 disabled:opacity-60"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  {running ? "Testing…" : "Test Rule"}
                </button>
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
                >
                  Publish Rule
                </button>
              </div>
            </div>
            {testOutput ? (
              <div className="shrink-0 border-t border-border-default bg-success/5 px-4 py-2 text-[11.5px] font-medium text-success">
                {testOutput}
              </div>
            ) : null}
          </div>
        ) : null}

        {detailTab === "Details" ? (
          <div className="h-full overflow-y-auto px-5 py-4">
            <dl className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-[12.5px]">
              {[
                ["Rule ID", rule.ruleId],
                ["Status", rule.status],
                ["Severity", rule.severity],
                ["Author", rule.author],
                ["Created", rule.created],
                ["Last Modified", rule.modified],
                ["Rule Type", rule.ruleType],
                ["License", rule.license],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-[11px] text-text-secondary">{k}</dt>
                  <dd className="font-medium text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <p className="mb-1.5 text-[11px] text-text-secondary">Description</p>
              <p className="max-w-xl text-[12.5px] leading-relaxed text-text-primary">{rule.description}</p>
            </div>
            <div className="mt-4">
              <p className="mb-1.5 text-[11px] text-text-secondary">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {rule.tags.map((t) => (
                  <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {detailTab === "References" ? (
          <div className="h-full overflow-y-auto px-5 py-4">
            <div className="flex max-w-2xl flex-col gap-2">
              {rule.references.map((ref) => (
                <a
                  key={ref}
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate rounded-lg border border-border-default px-3 py-2 text-[12px] text-brand-primary hover:bg-surface-2 hover:underline"
                >
                  {ref}
                </a>
              ))}
              {rule.references.length === 0 ? <p className="text-[12px] text-text-secondary">No references added.</p> : null}
            </div>
          </div>
        ) : null}

        {detailTab === "ATT&CK" ? (
          <div className="h-full overflow-y-auto px-5 py-4">
            <div className="flex max-w-2xl flex-col gap-2">
              {rule.attack.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg border border-border-default px-3 py-2 text-[12px]">
                  <span className="font-medium text-brand-primary">{a.id}</span>
                  <span className="flex-1 truncate text-text-primary">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {detailTab === "Comments" ? (
          <div className="flex h-full flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="flex max-w-2xl flex-col gap-3">
                {rule.comments.map((c, i) => (
                  <div key={i} className="rounded-lg border border-border-default px-3 py-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-text-primary">{c.author}</span>
                      <span className="text-[11px] text-text-secondary">{c.date}</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">{c.text}</p>
                  </div>
                ))}
                {rule.comments.length === 0 ? <p className="text-[12px] text-text-secondary">No comments yet.</p> : null}
              </div>
            </div>
            <div className="shrink-0 border-t border-border-default px-5 py-3">
              <div className="flex max-w-2xl items-center gap-2">
                <input
                  placeholder="Add a comment..."
                  className="h-9 flex-1 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                <button type="button" className="flex h-9 items-center rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
                  Post
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- right info panel -------------------------------- */

function RightPanel({ rule, onToggleEnabled }: { rule: Rule; onToggleEnabled: (id: string) => void }) {
  const [tab, setTab] = React.useState<SidePanelTab>("Overview");
  const [testRange, setTestRange] = React.useState("Last 24 hours");
  const [running, setRunning] = React.useState(false);

  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center gap-1 border-b border-border-default px-3 pt-2">
        {(["Overview", "Version History", "Test Results"] as SidePanelTab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 border-b-2 px-2.5 pb-2 text-[11.5px] font-medium transition-colors duration-150",
              tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        {tab === "Overview" ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-text-primary">Rule Information</p>
              <button type="button" className="flex items-center gap-1 text-[11px] font-medium text-brand-primary hover:underline">
                <Wand2 className="h-3 w-3" aria-hidden="true" />
                Edit
              </button>
            </div>

            <dl className="flex flex-col divide-y divide-border-default text-[12px]">
              {[
                ["Rule ID", rule.ruleId],
                ["Status", rule.status],
                ["Severity", rule.severity],
                ["Author", rule.author],
                ["Created", rule.created],
                ["Last Modified", rule.modified],
                ["Deployments", `${rule.deployments} environments`],
                ["Rule Type", rule.ruleType],
                ["License", rule.license],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 py-2">
                  <dt className="text-text-secondary">{k}</dt>
                  <dd className="max-w-[150px] truncate text-right font-medium text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11.5px] font-bold text-text-primary">Environments</p>
                <button type="button" className="text-[11px] font-medium text-brand-primary hover:underline">
                  Manage
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {rule.environments.map((env) => (
                  <label key={env.name} className="flex items-center gap-2 text-[12px]">
                    <input
                      type="checkbox"
                      checked={env.enabled}
                      readOnly
                      className="h-3.5 w-3.5 shrink-0 rounded border-border-default accent-[var(--brand-primary)]"
                    />
                    <span className="flex-1 truncate text-text-primary">{env.name}</span>
                    {env.deployed ? (
                      <span className="flex shrink-0 items-center gap-1 text-[11px] text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        Deployed {env.deployed}
                      </span>
                    ) : (
                      <span className="shrink-0 text-[11px] text-text-secondary">Not deployed</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11.5px] font-bold text-text-primary">Recent History</p>
                <button type="button" onClick={() => setTab("Version History")} className="text-[11px] font-medium text-brand-primary hover:underline">
                  View all
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                {rule.history.slice(0, 3).map((h) => (
                  <div key={h.version} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] font-semibold text-text-primary">{h.version}</span>
                        <span className="shrink-0 text-[10.5px] text-text-secondary">{h.date}</span>
                      </div>
                      <p className="truncate text-[11.5px] text-text-secondary">{h.note}</p>
                    </div>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[9.5px] font-semibold text-text-secondary">
                      {h.who}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border-default p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11.5px] font-bold text-text-primary">Test Rule</p>
              </div>
              <select
                value={testRange}
                onChange={(e) => setTestRange(e.target.value)}
                className="mb-2 h-8 w-full rounded-lg border border-border-default bg-surface-1 px-2 text-[11.5px] font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setRunning(true);
                  window.setTimeout(() => setRunning(false), 900);
                }}
                disabled={running}
                className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-brand-primary text-[12px] font-semibold text-white hover:bg-brand-primary-hover disabled:opacity-60"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                {running ? "Running…" : "Run Test"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => onToggleEnabled(rule.id)}
              className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface-1 text-[12px] font-medium text-text-primary hover:bg-surface-2"
            >
              {rule.enabled ? "Disable Rule" : "Enable Rule"}
            </button>
          </div>
        ) : null}

        {tab === "Version History" ? (
          <div className="flex flex-col gap-3">
            {rule.history.map((h) => (
              <div key={h.version} className="rounded-lg border border-border-default px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-text-primary">{h.version}</span>
                  <span className="text-[10.5px] text-text-secondary">{h.date}</span>
                </div>
                <p className="mt-1 text-[11.5px] text-text-secondary">{h.note}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-2 text-[9px] font-semibold text-text-secondary">
                    {h.who}
                  </span>
                  <span className="text-[10.5px] text-text-secondary">Modified by {h.who}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Test Results" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <FlaskConical className="h-6 w-6 text-text-secondary" aria-hidden="true" />
            <p className="text-[12.5px] font-semibold text-text-primary">No test results yet</p>
            <p className="text-[11.5px] text-text-secondary">Run this rule against sample data to see results.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- header meta (top bar) -------------------------------- */

export function DetectionRulesLibraryHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Upload className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Import
      </button>
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2"
      >
        <Download className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Export
      </button>
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Create Rule
      </button>
    </div>
  );
}

export function DetectionRulesLibraryTitle() {
  return (
    <div className="min-w-0">
      <h1 className="truncate text-[18px] font-bold text-text-primary">Detection Rules Library</h1>
      <p className="truncate text-[11.5px] text-text-secondary">Curated and custom detection rules to identify threats across your environment.</p>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

export function DetectionRulesLibraryPlatform() {
  const [activeLeftTab, setActiveLeftTab] = React.useState<LeftTab>("Rules");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"All Status" | Status>("All Status");
  const [selectedId, setSelectedId] = React.useState(RULES[0].id);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [rules, setRules] = React.useState(RULES);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleEnabled = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  const q = search.trim().toLowerCase();
  const filteredRules = React.useMemo(() => {
    return rules.filter((r) => {
      if (statusFilter !== "All Status" && r.status !== statusFilter) return false;
      if (
        q &&
        !(
          r.name.toLowerCase().includes(q) ||
          r.ruleId.toLowerCase().includes(q) ||
          r.mitreId.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
        )
      )
        return false;
      return true;
    });
  }, [rules, q, statusFilter]);

  const selectedRule = rules.find((r) => r.id === selectedId) ?? rules[0];

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <LeftPanel
        activeLeftTab={activeLeftTab}
        setActiveLeftTab={setActiveLeftTab}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredRules={filteredRules}
        selectedId={selectedRule.id}
        onSelect={setSelectedId}
        selectedIds={selectedIds}
        toggleSelected={toggleSelected}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border-default px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[14.5px] font-bold text-text-primary">{selectedRule.name}</h2>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", SEVERITY_STYLE[selectedRule.severity])}>
                {selectedRule.severity}
              </span>
              <span className="shrink-0 text-[11px] font-medium text-text-secondary">{selectedRule.mitreId}</span>
              <span className="shrink-0 text-[11px] font-medium text-text-secondary">{selectedRule.platform}</span>
            </div>
            <p className="mt-0.5 truncate text-[11.5px] text-text-secondary">{selectedRule.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Toggle checked={selectedRule.enabled} onChange={() => toggleEnabled(selectedRule.id)} />
            <span className="text-[12px] font-medium text-text-primary">{selectedRule.enabled ? "Enabled" : "Disabled"}</span>
            <Dropdown
              width="w-40"
              trigger={
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-2" aria-label="More actions">
                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            >
              {(close) => (
                <>
                  <button
                    type="button"
                    onClick={close}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] font-medium text-text-primary hover:bg-surface-2"
                  >
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] font-medium text-text-primary hover:bg-surface-2"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Export
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] font-medium text-error hover:bg-error/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Delete
                  </button>
                </>
              )}
            </Dropdown>
          </div>
        </div>

        <RuleEditor key={selectedRule.id} rule={selectedRule} />
      </div>

      <RightPanel key={selectedRule.id} rule={selectedRule} onToggleEnabled={toggleEnabled} />
    </div>
  );
}
