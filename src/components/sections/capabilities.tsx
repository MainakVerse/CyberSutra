import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";

type Capability = {
  icon: LucideIcon;
  iconTileClassName: string;
  title: string;
  description: string;
  span: string;
  cardClassName: string;
  titleClassName?: string;
  descriptionClassName?: string;
  chips?: string[];
  flow?: { icon: LucideIcon; label: string; iconClassName: string }[];
  mockup?: {
    icon: LucideIcon;
    iconClassName: string;
    label: string;
    sublabel?: string;
  }[];
};

const CAPABILITIES: Capability[] = [
  {
    icon: Bot,
    iconTileClassName: "bg-white/10 text-white",
    title: "SecOps Copilot",
    description:
      "Your AI-powered security assistant for faster investigation, richer context and smarter decisions.",
    span: "lg:col-span-5",
    cardClassName: "bg-[#0b1b33] border-transparent",
    titleClassName: "text-white",
    descriptionClassName: "text-white/70",
    chips: ["Natural language search", "Incident summaries", "Action recommendations"],
    mockup: [
      { icon: Sparkles, iconClassName: "bg-white/15 text-white", label: "Summarize this alert" },
      {
        icon: UserRound,
        iconClassName: "bg-white/15 text-white",
        label: "Analyzing 12 related events...",
      },
      {
        icon: CheckCircle2,
        iconClassName: "bg-success/20 text-success",
        label: "Likely malicious",
        sublabel: "(High confidence)",
      },
    ],
  },
  {
    icon: ShieldAlert,
    iconTileClassName: "bg-error/10 text-error",
    title: "Threat & Vulnerability Management",
    description:
      "Identify, prioritise and remediate risks before they become breaches.",
    span: "lg:col-span-3",
    cardClassName: "bg-surface-1 border-border-default",
  },
  {
    icon: ShieldCheck,
    iconTileClassName: "bg-success/10 text-success",
    title: "AI Defense & Zero Trust",
    description: "Stop modern threats with AI-driven detection and zero trust controls.",
    span: "lg:col-span-4",
    cardClassName: "bg-success/5 border-success/15",
  },
  {
    icon: FileCheck2,
    iconTileClassName: "bg-info/10 text-info",
    title: "Compliance Automation",
    description:
      "Stay audit-ready with automated controls, continuous monitoring and regulatory mapping.",
    span: "lg:col-span-4",
    cardClassName: "bg-surface-1 border-border-default",
    chips: ["RBI", "SEBI", "DPDP", "ISO 27001", "CERT-In"],
  },
  {
    icon: Wrench,
    iconTileClassName: "bg-warning/10 text-warning",
    title: "SOAR & Auto-Remediation",
    description:
      "Automate response across your environment to contain threats and reduce mean time to resolution.",
    span: "lg:col-span-4",
    cardClassName: "bg-warning/5 border-warning/15",
    flow: [
      { icon: ShieldAlert, label: "Detect", iconClassName: "bg-error/10 text-error" },
      { icon: Search, label: "Investigate", iconClassName: "bg-info/10 text-info" },
      { icon: Zap, label: "Respond", iconClassName: "bg-warning/15 text-warning" },
      { icon: CheckCircle2, label: "Resolve", iconClassName: "bg-success/10 text-success" },
    ],
  },
  {
    icon: Globe2,
    iconTileClassName: "bg-violet-500/10 text-violet-500",
    title: "Dark Web & Threat Intel",
    description:
      "Monitor underground forums, leaked data and emerging threats to stay ahead of attackers.",
    span: "lg:col-span-4",
    cardClassName: "bg-surface-1 border-border-default",
    chips: ["Brand monitoring", "Data leak alerts", "IOC enrichment"],
  },
];

function CardArrow() {
  return (
    <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-text-secondary transition-colors duration-200 group-hover:border-brand-primary group-hover:text-brand-primary">
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="flex flex-col justify-center overflow-hidden border-b border-border-default bg-surface-0 py-10 lg:h-screen lg:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10">
        <FadeIn>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-primary">
                Core capabilities
              </span>
              <h2
                id="capabilities-heading"
                className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
              >
                A complete cybersecurity platform
                <br />
                for <span className="text-gradient-brand">what&apos;s next.</span>
              </h2>
            </div>
            <div className="flex items-start gap-4 border-l border-border-default pl-4 lg:max-w-xs">
              <p className="text-sm leading-relaxed text-text-secondary">
                From prevention to response, CyberSutra unifies people, process
                and AI to help you stay ahead of evolving threats.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {CAPABILITIES.map((capability, index) => (
            <FadeIn
              key={capability.title}
              delay={index * 0.05}
              className={capability.span}
            >
              <article
                className={`group relative flex h-full flex-col rounded-2xl border p-5 pr-14 transition-colors duration-200 ${capability.cardClassName}`}
              >
                <div className={capability.mockup ? "flex flex-col items-start gap-3 sm:flex-row" : ""}>
                  <div className="min-w-0">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${capability.iconTileClassName}`}
                    >
                      <capability.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3
                      className={`mt-3 text-sm font-semibold ${capability.titleClassName ?? "text-text-primary"}`}
                    >
                      {capability.title}
                    </h3>
                    <p
                      className={`mt-1.5 max-w-sm text-xs leading-relaxed ${capability.descriptionClassName ?? "text-text-secondary"}`}
                    >
                      {capability.description}
                    </p>
                  </div>

                  {capability.mockup ? (
                    <div className="flex w-full max-w-[200px] shrink-0 flex-col gap-2 sm:ml-auto">
                      {capability.mockup.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-2"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${item.iconClassName}`}
                          >
                            <item.icon className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="text-[11px] leading-tight text-white">
                            {item.label}
                            {item.sublabel ? (
                              <span className="block text-[10px] text-white/60">
                                {item.sublabel}
                              </span>
                            ) : null}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                {capability.chips ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {capability.chips.map((chip) => (
                      <span
                        key={chip}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          capability.titleClassName
                            ? "bg-white/10 text-white/80"
                            : "bg-surface-2 text-text-secondary"
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}

                {capability.flow ? (
                  <div className="mt-3 flex flex-nowrap items-center gap-1 overflow-x-auto scrollbar-hide">
                    {capability.flow.map((step, stepIndex) => (
                      <div key={step.label} className="flex min-w-0 items-center gap-1">
                        <span
                          className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-medium ${step.iconClassName}`}
                        >
                          <step.icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                          {step.label}
                        </span>
                        {stepIndex < capability.flow!.length - 1 ? (
                          <ArrowRight
                            className="h-3 w-3 shrink-0 text-text-secondary/50"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                <CardArrow />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
