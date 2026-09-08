import { Clock, LayoutGrid, ShieldCheck, Zap } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { FadeIn } from "@/components/motion/fade-in";

const METRICS = [
  {
    icon: LayoutGrid,
    iconClassName: "bg-brand-primary/10 text-brand-primary",
    value: "94",
    unit: "",
    label: "Security Modules",
    description: "Integrated across the security lifecycle",
  },
  {
    icon: Zap,
    iconClassName: "bg-emerald-500/10 text-emerald-500",
    value: "6",
    unit: "hrs",
    label: "CERT-In Response",
    description: "Average escalation time",
  },
  {
    icon: Clock,
    iconClassName: "bg-violet-500/10 text-violet-500",
    value: "<5",
    unit: "min",
    label: "Threat Triage",
    description: "From detection to investigation",
  },
  {
    icon: ShieldCheck,
    iconClassName: "bg-amber-500/10 text-amber-500",
    value: "24",
    unit: "/7",
    label: "SOC Monitoring",
    description: "Continuous coverage, every day",
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Trusted by security teams across India"
      className="border-b border-border-default bg-surface-2"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Proven impact
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            Real outcomes. Measurable resilience.
          </h3>

          <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((metric) => (
              <div key={metric.label}>
                <dd className="flex items-baseline font-mono text-4xl font-bold tabular-nums text-text-primary sm:text-5xl">
                  <Counter value={metric.value} />
                  {metric.unit ? (
                    <span className="ml-1 text-2xl font-semibold text-text-primary sm:text-3xl">
                      {metric.unit}
                    </span>
                  ) : null}
                </dd>
                <div className="mt-3 flex items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${metric.iconClassName}`}
                  >
                    <metric.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <dt className="text-sm font-semibold text-text-primary">
                    {metric.label}
                  </dt>
                </div>
                <p className="mt-1 pl-[42px] text-sm text-text-secondary">
                  {metric.description}
                </p>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
