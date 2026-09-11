"use client";

import * as React from "react";
import {
  Apple,
  ChevronDown,
  Cloud,
  Download,
  RotateCcw,
  Search,
  Settings,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* --------------------------------- types --------------------------------- */

type CoverageStatus = "detected" | "partial" | "not-detected" | "not-applicable";
type Platform = "windows" | "apple" | "cloud";
type Severity = "High" | "Medium" | "Low";

type SubTechnique = {
  id: string;
  name: string;
  status: CoverageStatus;
};

type Technique = {
  id: string;
  name: string;
  status: CoverageStatus;
};

type Tactic = {
  name: string;
  covered: number;
  total: number;
  techniques: Technique[];
};

type TechniqueDetail = {
  tactic: string;
  status: CoverageStatus;
  detections: number;
  analytics: number;
  references: number;
  description: string;
  platforms: Platform[];
  severity: Severity;
  dataSources: string;
  mitigations: string;
  coveragePct: number;
  coveredSub: number;
  totalSub: number;
  subTechniques: SubTechnique[];
};

/* -------------------------------- dummy data -------------------------------- */

const STATUS_META: Record<CoverageStatus, { label: string; dot: string; cell: string }> = {
  detected: { label: "Detected", dot: "bg-success", cell: "bg-success/10 hover:bg-success/20" },
  partial: { label: "Partial", dot: "bg-warning", cell: "bg-warning/10 hover:bg-warning/20" },
  "not-detected": { label: "Not Detected", dot: "bg-error", cell: "bg-error/10 hover:bg-error/20" },
  "not-applicable": { label: "Not Applicable", dot: "bg-text-secondary", cell: "bg-surface-2 hover:bg-surface-2/80" },
};

const ENTERPRISE_TACTICS: Tactic[] = [
  {
    name: "Reconnaissance",
    covered: 10,
    total: 14,
    techniques: [
      { id: "T1595", name: "Active Scanning", status: "detected" },
      { id: "T1592", name: "Gather Victim Host Information", status: "detected" },
      { id: "T1589", name: "Gather Victim Identity Information", status: "partial" },
      { id: "T1590", name: "Gather Victim Network Information", status: "detected" },
      { id: "T1591", name: "Gather Victim Org Information", status: "not-detected" },
      { id: "T1598", name: "Phishing for Information", status: "partial" },
      { id: "T1597", name: "Search Closed Sources", status: "not-applicable" },
      { id: "T1596", name: "Search Open Technical Databases", status: "detected" },
      { id: "T1593", name: "Search Open Websites/Domains", status: "not-detected" },
      { id: "T1594", name: "Search Victim-Owned Websites", status: "partial" },
    ],
  },
  {
    name: "Resource Development",
    covered: 7,
    total: 8,
    techniques: [
      { id: "T1583", name: "Acquire Infrastructure", status: "detected" },
      { id: "T1586", name: "Compromise Accounts", status: "detected" },
      { id: "T1584", name: "Compromise Infrastructure", status: "partial" },
      { id: "T1587", name: "Develop Capabilities", status: "detected" },
      { id: "T1585", name: "Establish Accounts", status: "not-detected" },
      { id: "T1588", name: "Obtain Capabilities", status: "detected" },
      { id: "T1608", name: "Stage Capabilities", status: "detected" },
    ],
  },
  {
    name: "Initial Access",
    covered: 18,
    total: 25,
    techniques: [
      { id: "T1190", name: "Exploit Public-Facing Application", status: "detected" },
      { id: "T1133", name: "External Remote Services", status: "detected" },
      { id: "T1200", name: "Hardware Additions", status: "not-applicable" },
      { id: "T1566", name: "Phishing", status: "detected" },
      { id: "T1195", name: "Supply Chain Compromise", status: "partial" },
      { id: "T1199", name: "Trusted Relationship", status: "not-detected" },
      { id: "T1078", name: "Valid Accounts", status: "detected" },
    ],
  },
  {
    name: "Execution",
    covered: 28,
    total: 42,
    techniques: [
      { id: "T1059", name: "Command and Scripting Interpreter", status: "detected" },
      { id: "T1610", name: "Deploy Container", status: "not-detected" },
      { id: "T1203", name: "Exploitation for Client Execution", status: "partial" },
      { id: "T1204", name: "User Execution", status: "detected" },
      { id: "T1047", name: "Windows Management Instrumentation", status: "detected" },
      { id: "T1053", name: "Scheduled Task/Job", status: "detected" },
      { id: "T1129", name: "Shared Modules", status: "not-applicable" },
      { id: "T1072", name: "Software Deployment Tools", status: "partial" },
      { id: "T1569", name: "System Services", status: "detected" },
      { id: "T1648", name: "Serverless Execution", status: "not-detected" },
    ],
  },
  {
    name: "Persistence",
    covered: 32,
    total: 57,
    techniques: [
      { id: "T1098", name: "Account Manipulation", status: "detected" },
      { id: "T1197", name: "BITS Jobs", status: "partial" },
      { id: "T1547", name: "Boot or Logon Autostart Execution", status: "detected" },
      { id: "T1037", name: "Boot or Logon Initialization Scripts", status: "detected" },
      { id: "T1176", name: "Browser Extensions", status: "not-detected" },
      { id: "T1554", name: "Compromise Client Software Binary", status: "not-detected" },
      { id: "T1136", name: "Create Account", status: "detected" },
      { id: "T1543", name: "Create or Modify System Process", status: "detected" },
      { id: "T1546", name: "Event Triggered Execution", status: "partial" },
      { id: "T1133b", name: "External Remote Services", status: "detected" },
    ],
  },
  {
    name: "Privilege Escalation",
    covered: 20,
    total: 39,
    techniques: [
      { id: "T1548", name: "Abuse Elevation Control Mechanism", status: "detected" },
      { id: "T1134", name: "Access Token Manipulation", status: "partial" },
      { id: "T1547b", name: "Boot or Logon Autostart Execution", status: "detected" },
      { id: "T1037b", name: "Boot or Logon Initialization Scripts", status: "not-detected" },
      { id: "T1543b", name: "Create or Modify System Process", status: "detected" },
      { id: "T1484", name: "Domain or Tenant Policy Modification", status: "not-detected" },
      { id: "T1611", name: "Escape to Host", status: "not-applicable" },
      { id: "T1546b", name: "Event Triggered Execution", status: "partial" },
      { id: "T1068", name: "Exploitation for Privilege Escalation", status: "detected" },
      { id: "T1055", name: "Process Injection", status: "detected" },
    ],
  },
  {
    name: "Defense Evasion",
    covered: 34,
    total: 68,
    techniques: [
      { id: "T1548b", name: "Abuse Elevation Control Mechanism", status: "detected" },
      { id: "T1134b", name: "Access Token Manipulation", status: "partial" },
      { id: "T1197b", name: "BITS Jobs", status: "not-detected" },
      { id: "T1140", name: "Deobfuscate/Decode Files or Information", status: "detected" },
      { id: "T1006", name: "Direct Volume Access", status: "not-applicable" },
      { id: "T1480", name: "Execution Guardrails", status: "not-detected" },
      { id: "T1211", name: "Exploitation for Defense Evasion", status: "partial" },
      { id: "T1222", name: "File and Directory Permissions Modification", status: "detected" },
      { id: "T1564", name: "Hide Artifacts", status: "detected" },
      { id: "T1574", name: "Hijack Execution Flow", status: "partial" },
    ],
  },
  {
    name: "Credential Access",
    covered: 22,
    total: 31,
    techniques: [
      { id: "T1557", name: "Adversary-in-the-Middle", status: "detected" },
      { id: "T1110", name: "Brute Force", status: "detected" },
      { id: "T1555", name: "Credentials from Password Stores", status: "partial" },
      { id: "T1212", name: "Exploitation for Credential Access", status: "not-detected" },
      { id: "T1187", name: "Forced Authentication", status: "not-detected" },
      { id: "T1606", name: "Forge Web Credentials", status: "detected" },
      { id: "T1056", name: "Input Capture", status: "detected" },
      { id: "T1556", name: "Modify Authentication Process", status: "partial" },
      { id: "T1003", name: "OS Credential Dumping", status: "detected" },
      { id: "T1528", name: "Steal Application Access Token", status: "detected" },
    ],
  },
  {
    name: "Discovery",
    covered: 31,
    total: 50,
    techniques: [
      { id: "T1087", name: "Account Discovery", status: "detected" },
      { id: "T1010", name: "Application Window Discovery", status: "not-detected" },
      { id: "T1217", name: "Browser Information Discovery", status: "partial" },
      { id: "T1580", name: "Cloud Infrastructure Discovery", status: "detected" },
      { id: "T1538", name: "Cloud Service Dashboard", status: "not-applicable" },
      { id: "T1526", name: "Cloud Service Discovery", status: "detected" },
      { id: "T1613", name: "Container and Resource Discovery", status: "partial" },
      { id: "T1482", name: "Domain Trust Discovery", status: "detected" },
      { id: "T1083", name: "File and Directory Discovery", status: "detected" },
      { id: "T1046", name: "Network Service Discovery", status: "detected" },
    ],
  },
  {
    name: "Lateral Movement",
    covered: 14,
    total: 29,
    techniques: [
      { id: "T1210", name: "Exploitation of Remote Services", status: "detected" },
      { id: "T1534", name: "Internal Spearphishing", status: "not-detected" },
      { id: "T1570", name: "Lateral Tool Transfer", status: "detected" },
      { id: "T1563", name: "Remote Service Session Hijacking", status: "not-detected" },
      { id: "T1021", name: "Remote Services", status: "detected" },
      { id: "T1091", name: "Replication Through Removable Media", status: "not-applicable" },
      { id: "T1072b", name: "Software Deployment Tools", status: "partial" },
      { id: "T1080", name: "Taint Shared Content", status: "not-detected" },
      { id: "T1550", name: "Use Alternate Authentication Material", status: "detected" },
    ],
  },
  {
    name: "Collection",
    covered: 16,
    total: 34,
    techniques: [
      { id: "T1560", name: "Archive Collected Data", status: "detected" },
      { id: "T1123", name: "Audio Capture", status: "not-applicable" },
      { id: "T1119", name: "Automated Collection", status: "detected" },
      { id: "T1185", name: "Browser Session Hijacking", status: "not-detected" },
      { id: "T1115", name: "Clipboard Data", status: "partial" },
      { id: "T1530", name: "Data from Cloud Storage", status: "detected" },
      { id: "T1602", name: "Data from Configuration Repository", status: "not-detected" },
      { id: "T1213", name: "Data from Information Repositories", status: "detected" },
      { id: "T1005", name: "Data from Local System", status: "detected" },
      { id: "T1039", name: "Data from Network Shared Drive", status: "partial" },
    ],
  },
  {
    name: "Command and Control",
    covered: 18,
    total: 37,
    techniques: [
      { id: "T1071", name: "Application Layer Protocol", status: "detected" },
      { id: "T1092", name: "Communication Through Removable Media", status: "not-applicable" },
      { id: "T1132", name: "Data Encoding", status: "detected" },
      { id: "T1001", name: "Data Obfuscation", status: "partial" },
      { id: "T1568", name: "Dynamic Resolution", status: "not-detected" },
      { id: "T1573", name: "Encrypted Channel", status: "detected" },
      { id: "T1008", name: "Fallback Channels", status: "not-detected" },
      { id: "T1105", name: "Ingress Tool Transfer", status: "detected" },
      { id: "T1104", name: "Multi-Stage Channels", status: "partial" },
      { id: "T1095", name: "Non-Application Layer Protocol", status: "detected" },
    ],
  },
  {
    name: "Exfiltration",
    covered: 9,
    total: 23,
    techniques: [
      { id: "T1020", name: "Automated Exfiltration", status: "detected" },
      { id: "T1030", name: "Data Transfer Size Limits", status: "not-detected" },
      { id: "T1048", name: "Exfiltration Over Alternative Protocol", status: "partial" },
      { id: "T1041", name: "Exfiltration Over C2 Channel", status: "detected" },
      { id: "T1011", name: "Exfiltration Over Other Network Medium", status: "not-applicable" },
      { id: "T1052", name: "Exfiltration Over Physical Medium", status: "not-applicable" },
      { id: "T1567", name: "Exfiltration Over Web Service", status: "partial" },
      { id: "T1029", name: "Scheduled Transfer", status: "not-detected" },
      { id: "T1537", name: "Transfer Data to Cloud Account", status: "detected" },
    ],
  },
  {
    name: "Impact",
    covered: 12,
    total: 18,
    techniques: [
      { id: "T1531", name: "Account Access Removal", status: "not-detected" },
      { id: "T1485", name: "Data Destruction", status: "detected" },
      { id: "T1486", name: "Data Encrypted for Impact", status: "detected" },
      { id: "T1565", name: "Data Manipulation", status: "partial" },
      { id: "T1491", name: "Defacement", status: "detected" },
      { id: "T1561", name: "Disk Wipe", status: "not-applicable" },
      { id: "T1499", name: "Endpoint Denial of Service", status: "detected" },
      { id: "T1495", name: "Firmware Corruption", status: "not-applicable" },
      { id: "T1490", name: "Inhibit System Recovery", status: "partial" },
      { id: "T1498", name: "Network Denial of Service", status: "detected" },
    ],
  },
];

const MOBILE_TACTICS: Tactic[] = [
  {
    name: "Initial Access",
    covered: 4,
    total: 8,
    techniques: [
      { id: "T1660", name: "Phishing", status: "detected" },
      { id: "T1456", name: "Drive-By Compromise", status: "not-detected" },
      { id: "T1577", name: "Compromise Application Executable", status: "partial" },
      { id: "T1444", name: "Masquerade as Legitimate Application", status: "detected" },
      { id: "T1476", name: "Deliver Malicious App via Other Means", status: "not-detected" },
    ],
  },
  {
    name: "Execution",
    covered: 3,
    total: 6,
    techniques: [
      { id: "T1575", name: "Native Code", status: "detected" },
      { id: "T1633", name: "Native API", status: "partial" },
      { id: "T1603", name: "Scheduled Task/Job", status: "not-detected" },
      { id: "T1623", name: "Command and Scripting Interpreter", status: "detected" },
    ],
  },
  {
    name: "Persistence",
    covered: 5,
    total: 9,
    techniques: [
      { id: "T1398", name: "Boot or Logon Initialization Scripts", status: "detected" },
      { id: "T1541", name: "Foreground Persistence", status: "partial" },
      { id: "T1624", name: "Event Triggered Execution", status: "detected" },
      { id: "T1402", name: "Broadcast Receivers", status: "not-detected" },
    ],
  },
  {
    name: "Privilege Escalation",
    covered: 2,
    total: 5,
    techniques: [
      { id: "T1404", name: "Exploitation for Privilege Escalation", status: "not-detected" },
      { id: "T1625", name: "Hijack Execution Flow", status: "partial" },
      { id: "T1626", name: "Abuse Elevation Control Mechanism", status: "detected" },
    ],
  },
  {
    name: "Defense Evasion",
    covered: 8,
    total: 14,
    techniques: [
      { id: "T1406", name: "Obfuscated Files or Information", status: "detected" },
      { id: "T1628", name: "Hide Artifacts", status: "detected" },
      { id: "T1629", name: "Impair Defenses", status: "partial" },
      { id: "T1630", name: "Indicator Removal on Host", status: "not-detected" },
      { id: "T1655", name: "Masquerading", status: "detected" },
    ],
  },
  {
    name: "Credential Access",
    covered: 3,
    total: 7,
    techniques: [
      { id: "T1417", name: "Input Capture", status: "detected" },
      { id: "T1634", name: "Credentials from Password Store", status: "not-detected" },
      { id: "T1414", name: "Clipboard Data", status: "partial" },
    ],
  },
  {
    name: "Discovery",
    covered: 4,
    total: 8,
    techniques: [
      { id: "T1420", name: "File and Directory Discovery", status: "detected" },
      { id: "T1421", name: "System Network Connections Discovery", status: "not-detected" },
      { id: "T1418", name: "Software Discovery", status: "partial" },
      { id: "T1422", name: "System Network Configuration Discovery", status: "detected" },
    ],
  },
  {
    name: "Collection",
    covered: 3,
    total: 6,
    techniques: [
      { id: "T1429", name: "Audio Capture", status: "not-applicable" },
      { id: "T1533", name: "Data from Local System", status: "detected" },
      { id: "T1430", name: "Location Tracking", status: "partial" },
    ],
  },
  {
    name: "Command and Control",
    covered: 5,
    total: 10,
    techniques: [
      { id: "T1437", name: "Application Layer Protocol", status: "detected" },
      { id: "T1521", name: "Encrypted Channel", status: "detected" },
      { id: "T1636", name: "Protocol Impersonation", status: "not-detected" },
      { id: "T1509", name: "Non-Standard Port", status: "partial" },
    ],
  },
  {
    name: "Exfiltration",
    covered: 2,
    total: 4,
    techniques: [
      { id: "T1639", name: "Exfiltration Over Alternative Protocol", status: "detected" },
      { id: "T1646", name: "Exfiltration Over C2 Channel", status: "not-detected" },
    ],
  },
  {
    name: "Impact",
    covered: 3,
    total: 7,
    techniques: [
      { id: "T1471", name: "Data Encrypted for Impact", status: "detected" },
      { id: "T1512", name: "Data Manipulation", status: "not-detected" },
      { id: "T1582", name: "SMS Control", status: "partial" },
    ],
  },
];

const ICS_TACTICS: Tactic[] = [
  {
    name: "Initial Access",
    covered: 3,
    total: 9,
    techniques: [
      { id: "T0883", name: "Internet Accessible Device", status: "detected" },
      { id: "T0886", name: "Remote Services", status: "partial" },
      { id: "T0819", name: "Exploit Public-Facing Application", status: "detected" },
      { id: "T0822", name: "External Remote Services", status: "not-detected" },
    ],
  },
  {
    name: "Execution",
    covered: 2,
    total: 8,
    techniques: [
      { id: "T0807", name: "Command-Line Interface", status: "detected" },
      { id: "T0823", name: "Graphical User Interface", status: "not-detected" },
      { id: "T0853", name: "Scripting", status: "partial" },
    ],
  },
  {
    name: "Persistence",
    covered: 2,
    total: 6,
    techniques: [
      { id: "T0891", name: "Hardcoded Credentials", status: "detected" },
      { id: "T0839", name: "Module Firmware", status: "not-detected" },
      { id: "T0857", name: "System Firmware", status: "partial" },
    ],
  },
  {
    name: "Evasion",
    covered: 3,
    total: 7,
    techniques: [
      { id: "T0820", name: "Exploitation for Evasion", status: "detected" },
      { id: "T0851", name: "Rootkit", status: "not-detected" },
      { id: "T0858", name: "Change Operating Mode", status: "partial" },
    ],
  },
  {
    name: "Discovery",
    covered: 4,
    total: 8,
    techniques: [
      { id: "T0842", name: "Network Sniffing", status: "detected" },
      { id: "T0888", name: "Remote System Information Discovery", status: "detected" },
      { id: "T0846", name: "Remote System Discovery", status: "partial" },
    ],
  },
  {
    name: "Lateral Movement",
    covered: 2,
    total: 7,
    techniques: [
      { id: "T0812", name: "Default Credentials", status: "not-detected" },
      { id: "T0866", name: "Exploitation of Remote Services", status: "partial" },
      { id: "T0843", name: "Program Download", status: "detected" },
    ],
  },
  {
    name: "Collection",
    covered: 2,
    total: 6,
    techniques: [
      { id: "T0802", name: "Automated Collection", status: "detected" },
      { id: "T0801", name: "Monitor Process State", status: "not-detected" },
    ],
  },
  {
    name: "Command and Control",
    covered: 2,
    total: 5,
    techniques: [
      { id: "T0869", name: "Standard Application Layer Protocol", status: "detected" },
      { id: "T0885", name: "Commonly Used Port", status: "partial" },
    ],
  },
  {
    name: "Inhibit Response Function",
    covered: 1,
    total: 9,
    techniques: [
      { id: "T0800", name: "Activate Firmware Update Mode", status: "not-detected" },
      { id: "T0803", name: "Block Command Message", status: "partial" },
      { id: "T0804", name: "Block Reporting Message", status: "not-detected" },
    ],
  },
  {
    name: "Impair Process Control",
    covered: 1,
    total: 6,
    techniques: [
      { id: "T0806", name: "Brute Force I/O", status: "not-detected" },
      { id: "T0836", name: "Modify Parameter", status: "partial" },
    ],
  },
  {
    name: "Impact",
    covered: 2,
    total: 12,
    techniques: [
      { id: "T0826", name: "Loss of Availability", status: "detected" },
      { id: "T0827", name: "Loss of Control", status: "not-detected" },
      { id: "T0828", name: "Loss of Productivity and Revenue", status: "partial" },
    ],
  },
];

const CLOUD_TACTICS: Tactic[] = [
  {
    name: "Initial Access",
    covered: 5,
    total: 7,
    techniques: [
      { id: "T1078.004", name: "Cloud Accounts", status: "detected" },
      { id: "T1190c", name: "Exploit Public-Facing Application", status: "detected" },
      { id: "T1199c", name: "Trusted Relationship", status: "partial" },
    ],
  },
  {
    name: "Execution",
    covered: 3,
    total: 5,
    techniques: [
      { id: "T1651", name: "Cloud Administration Command", status: "detected" },
      { id: "T1648c", name: "Serverless Execution", status: "partial" },
      { id: "T1059.009c", name: "Cloud API", status: "detected" },
    ],
  },
  {
    name: "Persistence",
    covered: 6,
    total: 9,
    techniques: [
      { id: "T1098.001", name: "Additional Cloud Credentials", status: "detected" },
      { id: "T1098.003", name: "Additional Cloud Roles", status: "detected" },
      { id: "T1136.003", name: "Cloud Account", status: "partial" },
      { id: "T1556.006", name: "Multi-Factor Authentication", status: "not-detected" },
    ],
  },
  {
    name: "Privilege Escalation",
    covered: 4,
    total: 6,
    techniques: [
      { id: "T1098.001b", name: "Additional Cloud Credentials", status: "detected" },
      { id: "T1548.005", name: "Temporary Elevated Cloud Access", status: "partial" },
    ],
  },
  {
    name: "Defense Evasion",
    covered: 6,
    total: 10,
    techniques: [
      { id: "T1578", name: "Modify Cloud Compute Infrastructure", status: "detected" },
      { id: "T1535", name: "Unused/Unsupported Cloud Regions", status: "not-detected" },
      { id: "T1550.001", name: "Application Access Token", status: "partial" },
    ],
  },
  {
    name: "Credential Access",
    covered: 5,
    total: 8,
    techniques: [
      { id: "T1552.005", name: "Cloud Instance Metadata API", status: "detected" },
      { id: "T1528c", name: "Steal Application Access Token", status: "detected" },
      { id: "T1606.001", name: "Web Cookies", status: "partial" },
    ],
  },
  {
    name: "Discovery",
    covered: 7,
    total: 11,
    techniques: [
      { id: "T1580c", name: "Cloud Infrastructure Discovery", status: "detected" },
      { id: "T1526c", name: "Cloud Service Discovery", status: "detected" },
      { id: "T1538c", name: "Cloud Service Dashboard", status: "not-applicable" },
      { id: "T1069.003", name: "Cloud Groups", status: "partial" },
    ],
  },
  {
    name: "Lateral Movement",
    covered: 2,
    total: 4,
    techniques: [
      { id: "T1021.007", name: "Cloud Services", status: "detected" },
      { id: "T1550.001b", name: "Application Access Token", status: "partial" },
    ],
  },
  {
    name: "Collection",
    covered: 4,
    total: 6,
    techniques: [
      { id: "T1530c", name: "Data from Cloud Storage", status: "detected" },
      { id: "T1114.002", name: "Remote Email Collection", status: "partial" },
    ],
  },
  {
    name: "Exfiltration",
    covered: 3,
    total: 5,
    techniques: [
      { id: "T1537c", name: "Transfer Data to Cloud Account", status: "detected" },
      { id: "T1567c", name: "Exfiltration Over Web Service", status: "partial" },
    ],
  },
  {
    name: "Impact",
    covered: 3,
    total: 6,
    techniques: [
      { id: "T1485c", name: "Data Destruction", status: "detected" },
      { id: "T1496", name: "Resource Hijacking", status: "not-detected" },
      { id: "T1531c", name: "Account Access Removal", status: "partial" },
    ],
  },
];

const T1059_DETAIL: TechniqueDetail = {
  tactic: "Execution",
  status: "detected",
  detections: 12,
  analytics: 4,
  references: 6,
  description:
    "Adversaries may abuse command and scripting interpreters to execute commands, scripts, or binaries on a local or remote system.",
  platforms: ["windows", "apple", "cloud"],
  severity: "High",
  dataSources: "Process Monitoring, Command-Line, Script Execution",
  mitigations: "M1049, M1054, M1038",
  coveragePct: 78,
  coveredSub: 28,
  totalSub: 35,
  subTechniques: [
    { id: "T1059.001", name: "PowerShell", status: "detected" },
    { id: "T1059.002", name: "AppleScript", status: "not-detected" },
    { id: "T1059.003", name: "Windows Command Shell", status: "detected" },
    { id: "T1059.004", name: "Unix Shell", status: "detected" },
    { id: "T1059.005", name: "Visual Basic", status: "partial" },
    { id: "T1059.006", name: "Python", status: "detected" },
    { id: "T1059.007", name: "JavaScript", status: "partial" },
    { id: "T1059.008", name: "Network Device CLI", status: "not-detected" },
    { id: "T1059.009", name: "Cloud API", status: "detected" },
  ],
};

const PLATFORM_ICON: Record<Platform, React.ElementType> = {
  windows: Settings,
  apple: Apple,
  cloud: Cloud,
};

const TABS = ["Enterprise", "Mobile", "ICS", "Cloud"] as const;

const TACTICS_BY_TAB: Record<(typeof TABS)[number], Tactic[]> = {
  Enterprise: ENTERPRISE_TACTICS,
  Mobile: MOBILE_TACTICS,
  ICS: ICS_TACTICS,
  Cloud: CLOUD_TACTICS,
};

/* -------------------------------- small ui -------------------------------- */

function Dropdown({
  label,
  width = "w-44",
}: {
  label: string;
  width?: string;
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
        <span className="truncate">{label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div className={cn("absolute left-0 top-full z-30 mt-1.5 overflow-hidden rounded-lg border border-border-default bg-surface-1 py-1 shadow-lg", width)}>
          <button type="button" onClick={() => setOpen(false)} className="block w-full px-3 py-1.5 text-left text-[12px] font-medium text-text-primary hover:bg-surface-2">
            {label}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function RingProgress({ pct, size = 40 }: { pct: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} className="stroke-surface-2" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className="stroke-success"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------- stat cards -------------------------------- */

function StatCard({
  ringPct,
  ringClass,
  value,
  label,
}: {
  ringPct: number;
  ringClass: string;
  value: string;
  label: string;
}) {
  const stroke = 4;
  const size = 36;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (ringPct / 100) * c;
  return (
    <div className="flex items-center gap-2.5 border-l border-border-default pl-4 first:border-l-0 first:pl-0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} className="stroke-surface-2" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={ringClass}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="min-w-0 leading-tight">
        <p className="text-[15px] font-bold text-text-primary">{value}</p>
        <p className="whitespace-nowrap text-[10.5px] text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

/* -------------------------------- detail panel -------------------------------- */

function DetailPanel({
  techniqueId,
  techniqueName,
  detail,
  onClose,
}: {
  techniqueId: string;
  techniqueName: string;
  detail: TechniqueDetail;
  onClose: () => void;
}) {
  const [tab, setTab] = React.useState<"Overview" | "Detections" | "Analytics" | "References">("Overview");
  const meta = STATUS_META[detail.status];

  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border-default px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-bold text-text-primary">{techniqueId}</p>
          <p className="truncate text-[11.5px] text-text-secondary">{techniqueName}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", meta.cell.split(" ")[0], "text-text-primary")}>
            <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
            {meta.label}
          </span>
          <button type="button" onClick={onClose} aria-label="Close panel" className="flex h-6 w-6 items-center justify-center rounded-md text-text-secondary hover:bg-surface-2">
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center border-b border-border-default px-2">
        {(["Overview", "Detections", "Analytics", "References"] as const).map((t) => {
          const badge = t === "Detections" ? detail.detections : t === "Analytics" ? detail.analytics : t === "References" ? detail.references : null;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 whitespace-nowrap border-b-2 px-1 py-2.5 text-center text-[10.5px] font-medium transition-colors duration-150",
                tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {t}
              {badge !== null ? <span className="ml-1 text-text-secondary">({badge})</span> : null}
            </button>
          );
        })}
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        {tab === "Overview" ? (
          <div className="flex flex-col gap-4">
            <p className="text-[12px] leading-relaxed text-text-secondary">{detail.description}</p>

            <dl className="flex flex-col divide-y divide-border-default text-[12px]">
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Tactic</dt>
                <dd className="font-medium text-text-primary">{detail.tactic}</dd>
              </div>
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Technique ID</dt>
                <dd className="font-medium text-text-primary">{techniqueId}</dd>
              </div>
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Platforms</dt>
                <dd className="flex items-center gap-1.5">
                  {detail.platforms.map((p) => {
                    const Icon = PLATFORM_ICON[p];
                    return <Icon key={p} className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />;
                  })}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Severity</dt>
                <dd className="font-medium text-warning">{detail.severity}</dd>
              </div>
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Data Sources</dt>
                <dd className="max-w-[160px] text-right font-medium leading-snug text-text-primary">{detail.dataSources}</dd>
              </div>
              <div className="flex items-center justify-between gap-2 py-2">
                <dt className="text-text-secondary">Mitigations</dt>
                <dd className="font-medium text-text-primary">{detail.mitigations}</dd>
              </div>
            </dl>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11.5px] font-bold text-text-primary">Coverage Status</p>
                <button type="button" className="flex h-7 items-center rounded-lg border border-border-default bg-surface-1 px-2.5 text-[11px] font-medium text-text-primary hover:bg-surface-2">
                  View Detections
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border-default p-3">
                <RingProgress pct={detail.coveragePct} size={44} />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-success">{detail.coveragePct}% Detected</p>
                  <p className="text-[11px] text-text-secondary">
                    {detail.coveredSub} of {detail.totalSub} sub-techniques
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11.5px] font-bold text-text-primary">Sub-techniques ({detail.subTechniques.length})</p>
              <div className="flex flex-col divide-y divide-border-default overflow-hidden rounded-lg border border-border-default">
                {detail.subTechniques.map((s) => {
                  const sMeta = STATUS_META[s.status];
                  return (
                    <div key={s.id} className="flex items-center justify-between gap-2 px-2.5 py-2 text-[11.5px]">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-text-primary">{s.id}</p>
                        <p className="truncate text-[10.5px] text-text-secondary">{s.name}</p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-[10.5px] font-medium text-text-secondary">
                        <span className={cn("h-1.5 w-1.5 rounded-full", sMeta.dot)} />
                        {sMeta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "Detections" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-[12.5px] font-semibold text-text-primary">{detail.detections} detection rules</p>
            <p className="text-[11.5px] text-text-secondary">Mapped to this technique.</p>
          </div>
        ) : null}

        {tab === "Analytics" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-[12.5px] font-semibold text-text-primary">{detail.analytics} analytics</p>
            <p className="text-[11.5px] text-text-secondary">Behavioral analytics covering this technique.</p>
          </div>
        ) : null}

        {tab === "References" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-[12.5px] font-semibold text-text-primary">{detail.references} references</p>
            <p className="text-[11.5px] text-text-secondary">External sources for this technique.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- header meta -------------------------------- */

export function AttackCoverageMapHeaderMeta() {
  return (
    <div className="flex items-center gap-2">
      <Dropdown label="Last 90 days" width="w-36" />
      <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-3 text-[12px] font-medium text-text-primary hover:bg-surface-2">
        <Download className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
        Export
      </button>
      <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-3 text-[12px] font-semibold text-white hover:bg-brand-primary-hover">
        <Settings className="h-3.5 w-3.5" aria-hidden="true" />
        Coverage Settings
      </button>
    </div>
  );
}

/* -------------------------------- main -------------------------------- */

export function AttackCoverageMap() {
  const [platformTab, setPlatformTab] = React.useState<(typeof TABS)[number]>("Enterprise");
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<{ tacticName: string; techniqueId: string; techniqueName: string } | null>({
    tacticName: "Execution",
    techniqueId: "T1059",
    techniqueName: "Command and Scripting Interpreter",
  });

  const tactics = TACTICS_BY_TAB[platformTab];

  const totalTechniques = tactics.reduce((sum, t) => sum + t.total, 0);
  const totalCovered = tactics.reduce((sum, t) => sum + t.covered, 0);
  const overallPct = Math.round((totalCovered / totalTechniques) * 100);

  const q = search.trim().toLowerCase();

  const handlePlatformTab = (t: (typeof TABS)[number]) => {
    setPlatformTab(t);
    setSelected(null);
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* platform tabs */}
        <div className="flex shrink-0 items-center gap-1 border-b border-border-default px-4 pt-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handlePlatformTab(t)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-t-lg border-b-2 px-3 pb-2.5 text-[12.5px] font-medium transition-colors duration-150",
                platformTab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* stat strip */}
        <div className="flex shrink-0 items-center gap-5 border-b border-border-default px-5 py-3">
          <StatCard ringPct={overallPct} ringClass="stroke-success" value={`${overallPct}%`} label={`Techniques Covered · ${totalCovered}/${totalTechniques}`} />
          <StatCard ringPct={12} ringClass="stroke-error" value="12%" label="High-Risk Gaps · 42 techniques" />
          <StatCard ringPct={20} ringClass="stroke-warning" value="20%" label="Partial Coverage" />

          <div className="ml-auto flex shrink-0 items-center gap-4 text-[11px] text-text-secondary">
            {(["detected", "partial", "not-detected", "not-applicable"] as CoverageStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full", STATUS_META[s].dot)} />
                {STATUS_META[s].label}
              </span>
            ))}
          </div>
        </div>

        {/* filter bar */}
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border-default px-4 py-2.5">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search techniques (e.g., PowerShell, Credential Dumping)..."
              className="h-8 w-full rounded-lg border border-border-default bg-surface-1 pl-8 pr-2.5 text-[12px] text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
          <Dropdown label="All Tactics" width="w-40" />
          <Dropdown label="All Coverage Status" width="w-44" />
          <Dropdown label="All Data Sources" width="w-40" />
          <Dropdown label="All Platforms" width="w-40" />
          <button type="button" className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border-default bg-surface-1 px-2.5 text-[11.5px] font-medium text-text-primary hover:bg-surface-2">
            <RotateCcw className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            Reset
          </button>
        </div>

        {/* matrix */}
        <div className="scrollbar-thin min-h-0 flex-1 overflow-auto">
          <div className="flex gap-px bg-border-default px-px pb-px" style={{ minWidth: `${tactics.length * 148}px` }}>
            {tactics.map((tactic) => (
              <div key={tactic.name} className="flex w-[148px] shrink-0 flex-col gap-px bg-border-default">
                <div className="sticky top-0 z-10 bg-surface-1 px-2 py-2">
                  <p className="truncate text-[11px] font-bold leading-tight text-text-primary">{tactic.name}</p>
                  <p className="text-[10px] text-text-secondary">
                    {tactic.covered} / {tactic.total}
                  </p>
                </div>
                {tactic.techniques
                  .filter((tech) => !q || tech.name.toLowerCase().includes(q) || tech.id.toLowerCase().includes(q))
                  .map((tech) => {
                    const meta = STATUS_META[tech.status];
                    const isSelected = selected?.techniqueId === tech.id;
                    return (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => setSelected({ tacticName: tactic.name, techniqueId: tech.id, techniqueName: tech.name })}
                        className={cn(
                          "flex min-h-[58px] flex-col justify-center gap-0.5 px-2 py-1.5 text-left transition-colors duration-100",
                          meta.cell,
                          isSelected && "ring-2 ring-inset ring-brand-primary"
                        )}
                      >
                        <span className="truncate text-[10px] font-bold text-text-primary">{tech.id}</span>
                        <span className="line-clamp-2 text-[10px] leading-[13px] text-text-secondary">{tech.name}</span>
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected ? (
        <DetailPanel
          techniqueId={selected.techniqueId}
          techniqueName={selected.techniqueName}
          detail={T1059_DETAIL}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}
