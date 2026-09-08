import Image from "next/image";
import {
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";

type Framework = {
  code: string;
  logoSrc?: string;
  name: string;
  detail: string;
};

const FRAMEWORKS: Framework[] = [
  {
    code: "DPDP",
    logoSrc: "/logos/emblem-of-india.svg",
    name: "Digital Personal Data Protection Act, 2023",
    detail: "Built-in data privacy controls, consent management and individual rights support.",
  },
  {
    code: "ISO",
    logoSrc: "/iso.webp",
    name: "ISO 27001",
    detail:
      "Aligned with ISO/IEC 27001:2022 for a robust information security management system.",
  },
  {
    code: "CERT-In",
    logoSrc: "/CERT-In.png",
    name: "Incident Reporting (6-hour mandate)",
    detail:
      "Supports 6-hour incident reporting with automated detection, triage and reporting workflows.",
  },
  {
    code: "RBI",
    logoSrc: "/rbi.png",
    name: "Cyber Security Framework",
    detail: "Aligned with RBI's cybersecurity guidelines for regulated entities.",
  },
  {
    code: "SEBI",
    logoSrc: "/sebi.png",
    name: "Cybersecurity and Cyber Resilience Framework",
    detail:
      "Supports SEBI's guidelines for market infrastructure institutions and regulated entities.",
  },
  {
    code: "CIS",
    logoSrc: "/cis.png",
    name: "CIS Controls",
    detail: "Implements CIS Controls v8 for a stronger security posture across your environment.",
  },
];

type Feature = {
  icon: LucideIcon;
  iconTileClassName: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    iconTileClassName: "bg-brand-primary/10 text-brand-primary",
    title: "Privacy by design",
    description: "Data protection at every layer",
  },
  {
    icon: FileCheck2,
    iconTileClassName: "bg-success/10 text-success",
    title: "Audit-ready",
    description: "Automated evidence and reporting",
  },
  {
    icon: Users,
    iconTileClassName: "bg-violet-500/10 text-violet-500",
    title: "Built for India",
    description: "Aligned with local regulations and sectors",
  },
];

export function Compliance() {
  return (
    <section
      id="compliance"
      aria-labelledby="compliance-heading"
      className="flex flex-col justify-center overflow-hidden border-b border-border-default bg-surface-0 py-10 lg:h-screen lg:py-0"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-10">
        <FadeIn className="flex flex-col lg:col-span-5">
          <span className="inline-flex w-fit items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-primary">
            Compliance & governance
          </span>
          <h2
            id="compliance-heading"
            className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
          >
            Built for India&apos;s regulatory landscape
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            CyberSutra is designed from the ground up to help Indian
            organisations stay compliant, resilient and audit-ready — with
            built-in support for DPDP, CERT-In&apos;s 6-hour incident
            reporting mandate and sector-specific frameworks.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 xs:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title}>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${feature.iconTileClassName}`}
                >
                  <feature.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm font-semibold text-text-primary">
                  {feature.title}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-1 items-center gap-5 rounded-2xl bg-surface-2 p-5">
            <Image
              src="/india.png"
              alt="Map of India"
              width={120}
              height={144}
              className="h-36 w-[120px] shrink-0 object-contain"
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                India-first security
              </p>
              <h3 className="mt-1 text-lg font-semibold leading-snug text-text-primary">
                Stronger organisations.
                <br />A safer digital India.
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                From regulatory compliance to real-world resilience,
                CyberSutra helps you meet today&apos;s requirements and
                tomorrow&apos;s challenges.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-0.5 w-6 rounded-full bg-warning" />
                <span className="h-0.5 w-6 rounded-full bg-success" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                  People&nbsp;|&nbsp;Data&nbsp;|&nbsp;A Safer India
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-7">
          <div className="flex h-full flex-col rounded-2xl border border-border-default bg-surface-1 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Key Frameworks &amp; Regulations
                </h3>
                <p className="mt-0.5 text-xs text-text-secondary">
                  Stay compliant with India&apos;s evolving regulatory
                  requirements and global standards.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Compliance built-in
              </span>
            </div>

            <ul className="mt-3 flex flex-1 flex-col divide-y divide-border-default overflow-hidden">
              {FRAMEWORKS.map((framework) => (
                <li
                  key={framework.code}
                  className="flex flex-1 items-center gap-3 py-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[10px] font-bold text-text-secondary">
                    {framework.logoSrc ? (
                      <Image
                        src={framework.logoSrc}
                        alt={`${framework.code} logo`}
                        width={36}
                        height={36}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      framework.code
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text-primary">
                      {framework.name}
                    </p>
                    <p className="truncate text-xs text-text-secondary">
                      {framework.detail}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Compliant
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
