"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Box,
  Fingerprint,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type Column = {
  icon: LucideIcon;
  title: string;
  description: string;
  links: string[];
};

const COLUMNS: Column[] = [
  {
    icon: ShieldCheck,
    title: "Security Operations",
    description: "Detect, investigate and respond at speed.",
    links: [
      "SIEM & Log Management",
      "SOAR & Automation",
      "Threat Monitoring",
      "Incident Response",
      "Digital Forensics",
      "Threat Intelligence",
      "Security Dashboards",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Threat & Vulnerability",
    description: "Find and fix risks before they're exploited.",
    links: [
      "Vulnerability Management",
      "Attack Surface Visibility",
      "Penetration Testing",
      "Red Team Services",
      "Malware Analysis",
      "Threat Hunting",
      "Exposure Management",
    ],
  },
  {
    icon: Fingerprint,
    title: "AI Defense & Zero Trust",
    description: "AI-powered protection for a zero trust world.",
    links: [
      "AI Threat Detection",
      "Behavioral Analytics",
      "Zero Trust Architecture",
      "Policy Enforcement",
      "Lateral Movement Prevention",
      "Data Loss Prevention",
      "Generative AI Security",
    ],
  },
  {
    icon: UserRound,
    title: "Identity & Access",
    description: "Secure every identity. Every access. Everywhere.",
    links: [
      "Identity Governance (IGA)",
      "Privileged Access (PAM)",
      "Multi-Factor Authentication",
      "Single Sign-On (SSO)",
      "Access Reviews",
      "Directory Security",
      "Identity Threat Detection",
    ],
  },
  {
    icon: FileCheck2,
    title: "Compliance & Risk",
    description: "Stay compliant. Build lasting trust.",
    links: [
      "Regulatory Compliance",
      "Risk Management",
      "Policy Management",
      "Audit & Reporting",
      "Data Privacy (DPDP)",
      "Third-Party Risk",
      "Business Continuity",
    ],
  },
  {
    icon: Box,
    title: "Platform & Delivery",
    description: "Flexible, scalable and built for your world.",
    links: [
      "Cloud, On-Prem or Hybrid",
      "Multi-Tenant for MSSPs",
      "APIs & Integrations",
      "Customization & Branding",
      "Deployment Services",
      "Monitoring & Support",
      "Professional Services",
    ],
  },
];

export function PlatformMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border-default bg-surface-1 p-5 shadow-xl">
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {COLUMNS.map((column, index) => (
          <div
            key={column.title}
            className={cn(
              "min-w-0",
              index > 0 && "lg:-ml-4 lg:border-l lg:border-border-default lg:pl-4"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
              <column.icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-2 max-w-[10rem] text-xs font-bold uppercase tracking-wide text-text-primary">
              {column.title}
            </p>
            <p className="mt-1 max-w-[10rem] text-xs leading-snug text-text-secondary">
              {column.description}
            </p>

            <ul className="mt-3 flex flex-col">
              {column.links.map((link) => (
                <li key={link} className="min-w-0">
                  <Link
                    href="#capabilities"
                    onClick={onNavigate}
                    className="flex min-w-0 items-center justify-between gap-1.5 rounded-md py-1.5 text-xs text-text-secondary transition-colors duration-150 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    <span className="min-w-0 truncate">{link}</span>
                    <ArrowRight
                      className="h-3 w-3 shrink-0 text-brand-primary/70"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-surface-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-1 text-brand-primary">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Explore the full platform
            </p>
            <p className="text-xs text-text-secondary">
              See how CyberSutra fits together to protect what matters.
            </p>
          </div>
        </div>
        <Link
          href="#capabilities"
          onClick={onNavigate}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
        >
          View Platform Overview
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
