"use client";

import * as React from "react";
import Image from "next/image";
import { Building2, ChevronRight, Landmark, ShieldHalf } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";

type Outcome = {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
};

type RolePanel = {
  value: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
  imageSrc: string;
  eyebrow: string;
  heading: string;
  description: string;
  outcomes: Outcome[];
};

const ROLES: RolePanel[] = [
  {
    value: "sme",
    label: "SME / In-house",
    sublabel: "Secure and grow with confidence",
    icon: Building2,
    imageSrc: "/s1.png",
    eyebrow: "For SME / In-house teams",
    heading: "Enterprise-grade security, made simple for growing businesses.",
    description:
      "Get end-to-end protection without the complexity. CyberSutra helps in-house teams detect, respond and stay compliant — so you can focus on what you do best: growing your business.",
    outcomes: [
      {
        icon: ShieldHalf,
        iconClassName: "bg-brand-primary/10 text-brand-primary",
        title: "Reduce risk and downtime",
        description:
          "Proactively detect and mitigate threats before they impact your operations.",
      },
      {
        icon: Landmark,
        iconClassName: "bg-success/10 text-success",
        title: "Stay compliant with ease",
        description: "Built-in support for DPDP, CERT-In and sector-specific requirements.",
      },
      {
        icon: Building2,
        iconClassName: "bg-violet-500/10 text-violet-500",
        title: "Do more with your team",
        description:
          "AI-powered automation lets you achieve stronger security outcomes with fewer resources.",
      },
    ],
  },
  {
    value: "mssp",
    label: "MSSP / Partner",
    sublabel: "White-label and multi-tenant",
    icon: ShieldHalf,
    imageSrc: "/s2.png",
    eyebrow: "For MSSP / Partners",
    heading: "White-label SecOps for every client, from one console.",
    description:
      "Manage dozens of tenants from a single multi-tenant workspace, fully rebrandable under your own MSP identity — so you can scale delivery without scaling headcount.",
    outcomes: [
      {
        icon: ShieldHalf,
        iconClassName: "bg-brand-primary/10 text-brand-primary",
        title: "White-label everything",
        description: "Dashboards, reports and client-facing portals carry your own brand.",
      },
      {
        icon: Landmark,
        iconClassName: "bg-success/10 text-success",
        title: "Multi-tenant by design",
        description: "Centralized policy management with strict tenant isolation.",
      },
      {
        icon: Building2,
        iconClassName: "bg-violet-500/10 text-violet-500",
        title: "Margin-friendly licensing",
        description: "Pricing built for MSP delivery models, not enterprise seat counts.",
      },
    ],
  },
  {
    value: "board",
    label: "Board & CISO",
    sublabel: "Drive resilience and trust",
    icon: Landmark,
    imageSrc: "/s3.png",
    eyebrow: "For Board & CISO",
    heading: "Cyber resilience your board can actually read.",
    description:
      "Translate technical posture into board-level risk language and cyber-insurance-ready documentation — on demand, without a scramble before every review.",
    outcomes: [
      {
        icon: ShieldHalf,
        iconClassName: "bg-brand-primary/10 text-brand-primary",
        title: "Board-ready reporting",
        description: "Quarterly resilience reports generated automatically, no manual assembly.",
      },
      {
        icon: Landmark,
        iconClassName: "bg-success/10 text-success",
        title: "Insurance-ready posture",
        description: "Cyber-insurance readiness scoring with clear gap remediation plans.",
      },
      {
        icon: Building2,
        iconClassName: "bg-violet-500/10 text-violet-500",
        title: "Real-time oversight",
        description: "A live risk posture dashboard built for CISO-level visibility.",
      },
    ],
  },
];

export function RoleTabs() {
  const [activeValue, setActiveValue] = React.useState(ROLES[0].value);
  const activeRole = ROLES.find((role) => role.value === activeValue) ?? ROLES[0];

  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className="flex h-screen flex-col justify-center overflow-hidden border-b border-border-default bg-surface-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-primary">
            Built for your role
          </span>
          <h2
            id="roles-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
          >
            Different teams. A stronger tomorrow.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Whether you&apos;re securing your business, delivering security as
            a service, or setting strategic direction, CyberSutra adapts to
            your goals.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {ROLES.map((role) => {
              const isActive = role.value === activeValue;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setActiveValue(role.value)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                    isActive
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-border-default bg-surface-1 text-text-primary hover:border-brand-primary/40"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-white/15 text-white" : "bg-brand-primary/10 text-brand-primary"
                    }`}
                  >
                    <role.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{role.label}</span>
                    <span
                      className={`block truncate text-xs ${
                        isActive ? "text-white/80" : "text-text-secondary"
                      }`}
                    >
                      {role.sublabel}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.14} className="mt-4">
          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-border-default bg-surface-1 lg:grid-cols-2">
            <div className="relative order-1 h-56 w-full overflow-hidden bg-surface-2 sm:h-72 lg:order-2 lg:hidden">
              <Image
                key={activeRole.value}
                src={activeRole.imageSrc}
                alt={`${activeRole.label} preview`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={activeRole.value === ROLES[0].value}
              />
            </div>

            <div className="order-2 p-6 sm:p-8 lg:order-1">
              <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                {activeRole.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-text-primary">
                {activeRole.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {activeRole.description}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {activeRole.outcomes.map((outcome) => (
                  <li
                    key={outcome.title}
                    className="flex items-center gap-3 rounded-xl border border-border-default bg-surface-2 p-3"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${outcome.iconClassName}`}
                    >
                      <outcome.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text-primary">
                        {outcome.title}
                      </span>
                      <span className="block text-xs leading-snug text-text-secondary">
                        {outcome.description}
                      </span>
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-text-secondary"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden min-h-[280px] overflow-hidden bg-surface-2 lg:order-2 lg:block">
              <Image
                key={activeRole.value}
                src={activeRole.imageSrc}
                alt={`${activeRole.label} preview`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={activeRole.value === ROLES[0].value}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
