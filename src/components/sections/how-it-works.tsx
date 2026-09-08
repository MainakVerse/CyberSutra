"use client";

import * as React from "react";
import {
  Activity,
  BarChart3,
  Cloud,
  FileText,
  Laptop,
  Link2,
  RefreshCw,
  ScanEye,
  Server,
  Settings,
  Shield,
  Siren,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { FadeIn } from "@/components/motion/fade-in";

const STEP_INTERVAL_MS = 5000;

const ACTIVE_BADGE_CLASSNAMES = [
  "border-blue-700 bg-blue-100 text-blue-800 shadow-[0_0_0_4px_rgba(29,78,216,0.15)]",
  "border-emerald-700 bg-emerald-100 text-emerald-800 shadow-[0_0_0_4px_rgba(4,120,87,0.15)]",
  "border-amber-500 bg-amber-100 text-amber-700 shadow-[0_0_0_4px_rgba(217,119,6,0.15)]",
];

type Tag = { icon: LucideIcon; label: string };

type Step = {
  number: string;
  icon: LucideIcon;
  iconTileClassName: string;
  title: string;
  description: string;
  tags: Tag[];
};

const STEPS: Step[] = [
  {
    number: "1",
    icon: Workflow,
    iconTileClassName: "bg-brand-primary/10 text-brand-primary",
    title: "Connect",
    description:
      "Unify your environment with AI agents. Connect your cloud, on-prem, endpoints and third-party tools. CyberSutra's autonomous agents ingest data, enrich context and build a real-time view of your risk.",
    tags: [
      { icon: Cloud, label: "Cloud" },
      { icon: Server, label: "On-prem" },
      { icon: Laptop, label: "Endpoints" },
      { icon: Link2, label: "3rd Party Tools" },
    ],
  },
  {
    number: "2",
    icon: ScanEye,
    iconTileClassName: "bg-success/10 text-success",
    title: "Detect",
    description:
      "Identify and prioritise threats in real time. AI-driven analytics correlate signals across your environment to detect threats, vulnerabilities and anomalous behaviour — with clear risk prioritisation.",
    tags: [
      { icon: Activity, label: "Threat Detection" },
      { icon: Settings, label: "Vulnerability Management" },
      { icon: Shield, label: "Risk Prioritisation" },
    ],
  },
  {
    number: "3",
    icon: Siren,
    iconTileClassName: "bg-warning/10 text-warning",
    title: "Respond & Report",
    description:
      "Automate response and stay compliant. Trigger SOAR playbooks to contain and remediate threats automatically. Track every action with a tamper-proof audit log and generate compliance reports — closing the loop.",
    tags: [
      { icon: Zap, label: "SOAR & Remediation" },
      { icon: FileText, label: "Audit Log" },
      { icon: BarChart3, label: "Compliance Reporting" },
    ],
  },
];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % STEPS.length);
    }, STEP_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="flex flex-col justify-center overflow-hidden border-b border-border-default bg-surface-0 py-10 lg:h-screen lg:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10">
        <FadeIn>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-primary">
                How it works
              </span>
              <h2
                id="how-it-works-heading"
                className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
              >
                From insight to action, automatically
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
                CyberSutra&apos;s AI agents, automation and real-time
                intelligence work together to detect threats, respond faster
                and keep you always audit-ready.
              </p>
            </div>
            <div className="flex items-start gap-4 border-l border-border-default pl-4 lg:max-w-xs">
              <p className="text-sm leading-relaxed text-text-secondary">
                A continuous cycle of protection, response and compliance —
                built for the modern threat landscape.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="relative mt-10 lg:pr-40">
          <div
            className="pointer-events-none absolute left-[26px] right-[26px] top-[26px] hidden h-0 border-t-[3px] border-solid border-blue-800 lg:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-6">
            {STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              const activeBadgeClassName = ACTIVE_BADGE_CLASSNAMES[index];
              return (
                <FadeIn key={step.number} delay={index * 0.08}>
                  <li className="relative flex flex-col items-start">
                    <span
                      className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 font-mono text-base font-semibold transition-colors duration-500 ${
                        isActive
                          ? activeBadgeClassName
                          : "border-border-default bg-surface-1 text-text-primary"
                      }`}
                    >
                      {step.number}
                    </span>

                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.12, 1] }
                          : { scale: 1 }
                      }
                      transition={
                        isActive
                          ? { duration: 1.1, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }
                          : { duration: 0.3 }
                      }
                      className={`mt-4 flex h-14 w-14 items-center justify-center rounded-2xl ${step.iconTileClassName}`}
                    >
                      <step.icon className="h-6 w-6" aria-hidden="true" />
                    </motion.div>

                    <div className="mt-3 w-full rounded-2xl border border-border-default bg-surface-1 p-4">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {step.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-medium text-text-primary"
                          >
                            <tag.icon
                              className="h-3.5 w-3.5 text-brand-primary"
                              aria-hidden="true"
                            />
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                </FadeIn>
              );
            })}
          </ol>

          <div className="pointer-events-none absolute right-0 top-[26px] hidden h-[calc(100%-26px)] w-36 lg:block">
            <svg
              className="absolute inset-0 h-full w-full text-blue-800"
              viewBox="0 0 140 260"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 1 H120 A12 12 0 0 1 132 13 V60"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M132 210 V230 A12 12 0 0 1 120 242 H20"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M28 234 L18 242 L28 250"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <FadeIn
              delay={0.24}
              className="absolute right-0 top-[51.9%] w-32 -translate-y-1/2"
            >
              <div className="flex items-center gap-2 rounded-xl border border-border-default bg-surface-1 px-3 py-2.5 shadow-sm">
                <RefreshCw className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                <span className="text-xs font-semibold leading-tight text-text-primary">
                  Continuous Improvement
                </span>
              </div>
              <p className="absolute left-0 right-0 top-full mt-2 text-center text-xs leading-tight text-text-secondary">
                Learn. Adapt.
                <br />
                Stay ahead.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
