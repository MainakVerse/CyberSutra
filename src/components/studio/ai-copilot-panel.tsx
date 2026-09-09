"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  FileText,
  Globe,
  Mic,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
} from "lucide-react";

const QUICK_ACTIONS = [
  { label: "Summarize alerts", icon: FileText },
  { label: "Investigate an IP", icon: Search },
  { label: "Analyze a file", icon: FileText },
  { label: "Draft incident report", icon: Sparkles },
  { label: "Threat hunting query", icon: Target },
  { label: "More", icon: MoreHorizontal },
] as const;

const ROTATING_WORDS = ["investigate?", "scrutinize?", "secure?"];
const LONGEST_ROTATING_WORD = "scrutinize?";
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
          className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-brand-primary to-cyan-400 bg-clip-text text-transparent"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function AiCopilotPanel() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-[820px]">
        <div className="text-center">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text-primary">
            What would you like to <RotatingWord />
          </h1>
          <p className="mt-2 text-[13px] text-text-secondary">
            Get answers, analyze threats, investigate incidents, draft reports, and more — all in one place.
          </p>
        </div>

        <div className="relative mt-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[3px] rounded-[18px] opacity-70 blur-md"
            style={{
              background:
                "linear-gradient(90deg, #ff9a9e, #fecfa2, #fef9a7, #a8f0c6, #a7d8f0, #c7b3f2, #f3a7d8)",
            }}
          />
          <div className="relative rounded-2xl border border-border-default bg-surface-1 shadow-sm">
            <input
              type="text"
              placeholder="Ask anything about your security environment..."
              className="w-full rounded-t-2xl bg-transparent px-5 pb-3 pt-4 text-[13.5px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Add"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-text-secondary transition-colors duration-150 hover:bg-surface-3 hover:text-text-primary"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Attach file"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-text-primary"
                >
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Browse web"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-text-primary"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Options"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-text-primary"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Voice input"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-text-primary"
                >
                  <Mic className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Send"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-3 text-text-secondary transition-colors duration-150 hover:bg-brand-primary hover:text-white"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-nowrap items-center justify-center gap-1.5">
          {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border-default bg-surface-1 px-2.5 text-[11.5px] font-medium text-text-primary transition-colors duration-150 hover:bg-surface-2"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-3 text-text-secondary">
            <span className="h-px w-10 bg-border-default" />
            <span className="flex items-center gap-1.5 text-[11.5px] font-medium">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Powered by CyberSutra
            </span>
            <span className="h-px w-10 bg-border-default" />
          </div>
          <p className="text-[11px] text-text-secondary/80">
            Your data stays private and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
