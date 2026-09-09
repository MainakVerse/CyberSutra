import {
  Sparkles,
  Radar,
  Fingerprint,
  Crosshair,
  Swords,
  Code2,
  Network,
  Laptop,
  Gauge,
  KeyRound,
  DatabaseBackup,
  Workflow,
  BrainCircuit,
  Microscope,
  ClipboardList,
  ScrollText,
  GraduationCap,
  FlaskConical,
  Building2,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  slug: string;
  icon: LucideIcon;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "AI Copilot", slug: "", icon: Sparkles },
  { label: "Threat Operations (SOC)", slug: "threat-operations", icon: Radar },
  { label: "Threat Intelligence", slug: "threat-intelligence", icon: Fingerprint },
  { label: "Detection Engineering", slug: "detection-engineering", icon: Crosshair },
  { label: "Offensive & Validation", slug: "offensive-validation", icon: Swords },
  { label: "Application Security (AppSec)", slug: "appsec", icon: Code2 },
  { label: "Endpoint, Network & Cloud", slug: "endpoint-network-cloud", icon: Network },
  { label: "Endpoint & Device Management", slug: "endpoint-device-management", icon: Laptop },
  { label: "Exposure & Posture Management", slug: "exposure-posture-management", icon: Gauge },
  { label: "Identity & Zero Trust", slug: "identity-zero-trust", icon: KeyRound },
  { label: "Data Protection & Resilience", slug: "data-protection-resilience", icon: DatabaseBackup },
  { label: "Automation & Response", slug: "automation-response", icon: Workflow },
  { label: "AI Security & Governance", slug: "ai-security-governance", icon: BrainCircuit },
  { label: "Forensics & Engineering", slug: "forensics-engineering", icon: Microscope },
  { label: "GRC & Risk", slug: "grc-risk", icon: ClipboardList },
  { label: "Compliance & Privacy", slug: "compliance-privacy", icon: ScrollText },
  { label: "Advisory & Awareness", slug: "advisory-awareness", icon: GraduationCap },
  { label: "Emerging & Specialized", slug: "emerging-specialized", icon: FlaskConical },
  { label: "MSP & Business", slug: "msp-business", icon: Building2 },
  { label: "Platform & DevOps", slug: "platform-devops", icon: Cloud },
];
