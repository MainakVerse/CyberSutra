"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Users,
  Virus,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RADAR_RINGS = [0, 1, 2];
const RADAR_DURATION = 3.6;

const VIRUS_ATTACKS = [
  { angle: 20, delay: 0 },
  { angle: 100, delay: 0.6 },
  { angle: 160, delay: 1.2 },
  { angle: 220, delay: 1.8 },
  { angle: 290, delay: 2.4 },
  { angle: 340, delay: 3 },
];

type Highlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Zap,
    title: "Detect threats faster",
    description: "AI-driven visibility",
  },
  {
    icon: ShieldCheck,
    title: "Respond with confidence",
    description: "Automated and guided actions",
  },
  {
    icon: Users,
    title: "Stay compliant",
    description: "Built for India's regulatory landscape",
  },
];

const FAQS = [
  {
    question: "How is CyberSutra deployed?",
    answer:
      "CyberSutra can be deployed on your cloud, on-premises, or in a hybrid model. We support major cloud providers and offer full deployment assistance.",
  },
  {
    question: "Does CyberSutra support India data residency?",
    answer:
      "Yes. CyberSutra is designed with India-first architecture and supports full data residency within Indian data centres, aligned with DPDP and other regulatory requirements.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Our pricing is flexible and based on your organisation's size, use cases, and deployment model. Contact our team for a tailored quote.",
  },
  {
    question: "Can MSSPs and partners white-label CyberSutra?",
    answer:
      "Yes. We offer a full white-label program with multi-tenant architecture, partner enablement, and go-to-market support for MSSPs and channel partners.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most customers are up and running within 2–4 weeks, depending on your environment and use cases. Our team provides end-to-end onboarding and training.",
  },
];

export function FinalCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section
        id="cta"
        aria-labelledby="final-cta-heading"
        className="bg-surface-0 px-4 pt-12 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1440px]">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2559] via-[#123a8f] to-[#1e5fd6] px-6 py-10 sm:px-10 lg:px-12">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_auto_1fr] lg:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-white/60">
                    Secure today. Stronger tomorrow.
                  </p>
                  <h2
                    id="final-cta-heading"
                    className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
                  >
                    See CyberSutra
                    <br />
                    defend your business.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                    Get a personalised walkthrough of how CyberSutra can
                    reduce risk, improve resilience, and keep your business
                    ahead of threats.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="bg-white text-brand-primary hover:bg-white/90"
                    >
                      Book a Live Demo
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="border-white/30 bg-white/5 text-white hover:bg-white/10"
                    >
                      Talk to Our Team
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      30-minute session
                    </span>
                    <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      Tailored to your use case
                    </span>
                    <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      No obligation
                    </span>
                  </div>
                </div>

                <div className="relative hidden h-[28rem] w-96 shrink-0 items-center justify-center lg:flex">
                  <motion.div
                    className="absolute inset-0"
                    animate={shouldReduceMotion ? undefined : { opacity: [0.32, 0.48, 0.32] }}
                    transition={{ duration: RADAR_DURATION, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src="/india.png"
                      alt=""
                      fill
                      className="object-contain opacity-40 brightness-0 invert"
                      aria-hidden="true"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-[calc(50%+20px)] -translate-y-1/2">
                    {!shouldReduceMotion &&
                      RADAR_RINGS.map((ring) => (
                        <motion.span
                          key={ring}
                          className="absolute inset-0 rounded-2xl border border-white/70"
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 6 }}
                          transition={{
                            duration: RADAR_DURATION,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: (ring * RADAR_DURATION) / RADAR_RINGS.length,
                          }}
                        />
                      ))}
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-[calc(50%+20px)] -translate-y-1/2">
                    {!shouldReduceMotion &&
                      VIRUS_ATTACKS.map(({ angle, delay }) => {
                        const rad = (angle * Math.PI) / 180;
                        const nearR = 130;
                        const farR = 190;
                        const nearX = Math.cos(rad) * nearR;
                        const nearY = Math.sin(rad) * nearR;
                        const farX = Math.cos(rad) * farR;
                        const farY = Math.sin(rad) * farR;
                        return (
                          <motion.div
                            key={angle}
                            className="absolute left-1/2 top-1/2 text-error"
                            initial={{ x: farX, y: farY, opacity: 0, scale: 0.7 }}
                            animate={{
                              x: [farX, nearX, farX],
                              y: [farY, nearY, farY],
                              opacity: [0.9, 1, 0],
                              scale: [0.7, 1, 0.7],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay,
                              times: [0, 0.55, 1],
                            }}
                          >
                            <Virus className="h-5 w-5 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                          </motion.div>
                        );
                      })}
                  </div>

                  <div className="relative flex h-16 w-16 -translate-x-5 items-center justify-center rounded-2xl bg-white shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    <ShieldCheck
                      className="h-8 w-8 text-brand-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <ul className="flex flex-col divide-y divide-white/10">
                    {HIGHLIGHTS.map((item) => (
                      <li key={item.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white">
                          <item.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-white">
                            {item.title}
                          </span>
                          <span className="block text-xs text-white/65">
                            {item.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-end gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                      A safer, more resilient India
                    </span>
                    <span className="h-px w-8 bg-brand-primary" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-b border-border-default bg-surface-0"
      >
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <FadeIn className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-wider text-brand-primary">
                FAQs
              </p>
              <h2
                id="faq-heading"
                className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text-primary"
              >
                Common questions.
                <br />
                Clear answers.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Everything you need to know about CyberSutra — from
                deployment to pricing — in one place.
              </p>

              <div className="mt-6 border-t border-border-default pt-6">
                <div className="flex items-start gap-3 rounded-2xl bg-surface-2 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      Still have questions?
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      Our team is here to help.
                    </p>
                    <a
                      href="#cta"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline"
                    >
                      Talk to a security expert
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-8">
              <Accordion type="single" collapsible className="flex flex-col gap-3">
                {FAQS.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={faq.question}
                    className="rounded-2xl border border-border-default bg-surface-1 px-5 last:border-b"
                  >
                    <AccordionTrigger className="py-4 hover:text-brand-primary [&>svg]:mt-0.5">
                      <span className="flex items-start gap-3 text-left">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 font-mono text-xs font-semibold text-brand-primary">
                          {index + 1}
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-text-primary">
                            {faq.question}
                          </span>
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 pr-2 pt-0">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mt-12 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-border-default" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              Build a more secure tomorrow
            </span>
            <span className="h-px w-16 bg-border-default" aria-hidden="true" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
