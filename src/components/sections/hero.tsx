"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Landmark,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SecurityDashboardMockup } from "@/components/sections/security-dashboard-mockup";

const FEATURE_ROW = [
  {
    icon: Zap,
    title: "Detect faster",
    detail: "AI-powered threat detection",
  },
  {
    icon: Sparkles,
    title: "Respond smarter",
    detail: "Automated, orchestrated action",
  },
  {
    icon: BarChart3,
    title: "Stay resilient",
    detail: "Continuous risk reduction",
  },
];

const ROTATING_WORDS = ["Outpaces", "Predicts", "Mitigates"];
const LONGEST_ROTATING_WORD = ROTATING_WORDS.reduce((longest, word) =>
  word.length > longest.length ? word : longest
);
const ROTATE_INTERVAL_MS = 2200;

function RotatingWord() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROTATING_WORDS.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <span className="relative inline-block align-top">
      <span className="invisible">{LONGEST_ROTATING_WORD}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gradient-brand absolute left-0 top-0 whitespace-nowrap"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const TRUST_MARKS = [
  {
    icon: ShieldCheck,
    name: "DPDP",
    status: "Compliant",
    detail: "Digital Personal Data Protection Act",
  },
  {
    icon: ShieldCheck,
    name: "CERT-In",
    status: "Aligned",
    detail: "Indian Computer Emergency Response Team",
  },
  {
    icon: CheckCircle2,
    name: "ISO 27001",
    status: "Certified",
    detail: "Information Security Management",
  },
  {
    icon: Landmark,
    name: "RBI / SEBI",
    status: "Trusted",
    detail: "Aligned with regulatory guidelines",
  },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="flex flex-col overflow-hidden border-b border-border-default bg-surface-0 lg:h-[calc(100dvh-5rem)]"
    >
      <div className="mx-auto grid w-full max-w-[1440px] min-h-0 flex-1 grid-cols-1 items-stretch gap-8 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:overflow-hidden lg:px-10 lg:py-8">
        <motion.div
          className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-6"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-primary">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
            AI-native cybersecurity operations
          </span>

          <h1
            id="hero-heading"
            className="text-4xl font-extrabold leading-[1.2] tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem]"
          >
            Security that
            <br />
            <RotatingWord />
            <br />
            what&apos;s next
          </h1>

          <p className="mt-4 max-w-[52ch] text-base text-text-secondary">
            Detect, investigate and respond to cyber threats faster with
            AI-driven intelligence, unified visibility and automated
            response — built for modern enterprises.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              className="bg-[#0b1b33] hover:bg-[#132a52]"
            >
              Request a demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/studio">
                <Play className="h-4 w-4" aria-hidden="true" />
                See how it works
              </Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
            {FEATURE_ROW.map((feature) => (
              <li key={feature.title} className="flex items-start gap-2.5">
                <feature.icon
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {feature.title}
                  </p>
                  <p className="text-xs text-text-secondary">{feature.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="order-1 flex h-[320px] items-stretch self-stretch sm:h-[420px] lg:order-2 lg:h-full lg:col-span-6"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <div className="h-full max-h-[560px] w-full">
            <SecurityDashboardMockup />
          </div>
        </motion.div>
      </div>

      <div className="shrink-0 border-t border-border-default bg-surface-1">
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-wider text-text-secondary">
              Trusted by India&apos;s most
              <br className="hidden sm:block" />
              security-conscious organisations
            </p>
            <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
              {TRUST_MARKS.map((mark) => (
                <li key={mark.name} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-secondary">
                    <mark.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-text-primary">
                      {mark.name}
                    </p>
                    <p className="flex items-center gap-1 text-xs font-medium leading-tight text-success">
                      {mark.status}
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
