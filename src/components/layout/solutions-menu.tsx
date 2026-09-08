"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bell,
  Brain,
  Building2,
  CloudCog,
  FileText,
  Landmark,
  Lock,
  Mail,
  Shield,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const BY_ROLE: Item[] = [
  {
    icon: Building2,
    title: "SME & In-house Teams",
    description: "Practical, affordable security for growing businesses.",
  },
  {
    icon: Users,
    title: "MSSPs & Partners",
    description: "White-label, multi-tenant platform to scale your business.",
  },
  {
    icon: Shield,
    title: "Boards & CISOs",
    description: "Visibility, governance and resilience for what's next.",
  },
  {
    icon: Landmark,
    title: "Enterprise & Regulated Sectors",
    description: "Advanced controls for complex, multi-entity organisations.",
  },
];

const USE_CASE_COLUMN_1: Item[] = [
  {
    icon: Bell,
    title: "CERT-In 6-Hour",
    description: "Be ready to detect, report and respond within 6 hours.",
  },
  {
    icon: FileText,
    title: "DPDP Readiness",
    description: "Achieve compliance with India's data protection requirements.",
  },
  {
    icon: BadgeCheck,
    title: "ISO 27001",
    description: "Build an information security management system (ISMS).",
  },
  {
    icon: Banknote,
    title: "RBI / SEBI",
    description: "Meet regulatory expectations for financial services.",
  },
];

const USE_CASE_COLUMN_2: Item[] = [
  {
    icon: Lock,
    title: "Ransomware Readiness",
    description: "Prevent, detect and recover faster from ransomware.",
  },
  {
    icon: Mail,
    title: "Phishing & Awareness",
    description: "Reduce human risk with continuous training and simulation.",
  },
  {
    icon: Brain,
    title: "AI & Deepfake Defense",
    description: "Detect and counter AI-driven threats and identity manipulation.",
  },
  {
    icon: CloudCog,
    title: "Cloud Security Posture",
    description: "Continuously monitor and harden multi-cloud configurations.",
  },
];

function MenuItem({ item, onNavigate }: { item: Item; onNavigate?: () => void }) {
  return (
    <li>
      <Link
        href="#roles"
        onClick={onNavigate}
        className="flex items-center gap-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
          <item.icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-text-primary">
            {item.title}
          </span>
          <span className="block text-xs leading-snug text-text-secondary">
            {item.description}
          </span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
      </Link>
    </li>
  );
}

export function SolutionsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border-default bg-surface-1 shadow-xl">
      <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
            Solutions
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-text-primary">
            By Role
          </h3>
          <p className="mt-1 text-xs text-text-secondary">
            Tailored for your mandate. Built for real-world outcomes.
          </p>

          <ul className="mt-4 flex flex-col divide-y divide-border-default">
            {BY_ROLE.map((item) => (
              <MenuItem key={item.title} item={item} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>

        <div className="border-t border-border-default pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
            Solutions
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-text-primary">
            By Use Case
          </h3>
          <p className="mt-1 text-xs text-text-secondary">
            Address today&apos;s biggest cyber challenges with focused
            solutions.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            <ul className="flex flex-col divide-y divide-border-default">
              {USE_CASE_COLUMN_1.map((item) => (
                <MenuItem key={item.title} item={item} onNavigate={onNavigate} />
              ))}
            </ul>
            <ul className="flex flex-col divide-y divide-border-default">
              {USE_CASE_COLUMN_2.map((item) => (
                <MenuItem key={item.title} item={item} onNavigate={onNavigate} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border-default bg-surface-2 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-1 text-brand-primary">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Not sure which solution fits your needs?
            </p>
            <p className="text-xs text-text-secondary">
              Talk to our team for a personalised recommendation.
            </p>
          </div>
        </div>
        <Link
          href="#cta"
          onClick={onNavigate}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white",
            "transition-colors duration-150 hover:bg-brand-primary-hover"
          )}
        >
          Talk to an Expert
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
