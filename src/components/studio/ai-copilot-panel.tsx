"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  FileText,
  Globe,
  History,
  Mic,
  MoreHorizontal,
  Paperclip,
  Pin,
  PinOff,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "Summarize alerts", icon: FileText },
  { label: "Investigate an IP", icon: Search },
  { label: "Analyze a file", icon: FileText },
  { label: "Draft incident report", icon: Sparkles },
  { label: "Threat hunting query", icon: Target },
  { label: "More", icon: MoreHorizontal },
] as const;

type ChatHistoryItem = { id: string; title: string; preview: string; time: string; pinned: boolean };

const INITIAL_HISTORY: ChatHistoryItem[] = [
  { id: "c1", title: "Ransomware IOC triage", preview: "Cross-check hashes from invoice_Q3_2026.exe against known families", time: "2 hours ago", pinned: true },
  { id: "c2", title: "Weekly SOC summary", preview: "Draft executive summary of critical alerts from the last 7 days", time: "Yesterday", pinned: true },
  { id: "c3", title: "Investigate 185.199.110.23", preview: "Reputation, geolocation and related C2 activity for this IP", time: "Yesterday", pinned: false },
  { id: "c4", title: "Suspicious PowerShell review", preview: "Explain encoded command from FIN-WS-023 process creation event", time: "2 days ago", pinned: false },
  { id: "c5", title: "Phishing campaign report", preview: "Summarize scope and affected users for CASE-2026-0038", time: "3 days ago", pinned: false },
  { id: "c6", title: "MITRE ATT&CK mapping help", preview: "Map lateral movement behavior to relevant techniques", time: "4 days ago", pinned: false },
  { id: "c7", title: "New hire SOC onboarding", preview: "Generate a checklist for onboarding a Tier 1 analyst", time: "1 week ago", pinned: false },
  { id: "c8", title: "Data exfiltration query", preview: "Draft a CyberQL query for large outbound transfers", time: "1 week ago", pinned: false },
  { id: "c9", title: "Detection rule tuning", preview: "Reduce false positives on 'Multiple Failed Logins' rule", time: "2 weeks ago", pinned: false },
];

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

function ChatRow({ chat, onTogglePin }: { chat: ChatHistoryItem; onTogglePin: (id: string) => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="group flex items-start gap-2 rounded-lg px-2 py-2 text-left transition-colors duration-150 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold text-text-primary">{chat.title}</p>
        <p className="truncate text-[11px] text-text-secondary">{chat.preview}</p>
        <p className="mt-0.5 text-[10px] text-text-secondary/80">{chat.time}</p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin(chat.id);
        }}
        aria-label={chat.pinned ? "Unpin chat" : "Pin chat"}
        aria-pressed={chat.pinned}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors duration-150",
          chat.pinned
            ? "text-brand-primary opacity-100"
            : "text-text-secondary opacity-0 hover:text-text-primary group-hover:opacity-100 group-focus-within:opacity-100"
        )}
      >
        {chat.pinned ? <Pin className="h-3.5 w-3.5 fill-brand-primary/20" aria-hidden="true" /> : <PinOff className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
}

function HistoryPanel({ onClose }: { onClose: () => void }) {
  const [chats, setChats] = React.useState<ChatHistoryItem[]>(INITIAL_HISTORY);
  const [search, setSearch] = React.useState("");

  const togglePin = (id: string) => {
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)));
  };

  const filtered = chats.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) || c.preview.toLowerCase().includes(search.toLowerCase())
  );
  const pinned = filtered.filter((c) => c.pinned);
  const general = filtered.filter((c) => !c.pinned);

  return (
    <div className="flex h-full w-72 shrink-0 flex-col overflow-hidden border-l border-border-default bg-surface-1">
      <div className="flex shrink-0 items-center justify-between border-b border-border-default px-3.5 py-3">
        <h2 className="flex items-center gap-1.5 text-[13px] font-bold text-text-primary">
          <History className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
          History
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close history panel"
          className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-2 hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="shrink-0 px-3.5 pt-3">
        <div className="flex h-8 items-center gap-1.5 rounded-lg border border-border-default bg-surface-2 px-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="h-full w-full bg-transparent text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-2">
        <div className="flex max-h-[45%] min-h-0 flex-col overflow-hidden">
          <p className="shrink-0 px-3.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-text-secondary">
            Pinned ({pinned.length})
          </p>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            {pinned.length ? (
              pinned.map((c) => <ChatRow key={c.id} chat={c} onTogglePin={togglePin} />)
            ) : (
              <p className="px-2 py-3 text-[11px] text-text-secondary">No pinned chats yet.</p>
            )}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-border-default pt-2">
          <p className="shrink-0 px-3.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-text-secondary">
            Chat History ({general.length})
          </p>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
            {general.length ? (
              general.map((c) => <ChatRow key={c.id} chat={c} onTogglePin={togglePin} />)
            ) : (
              <p className="px-2 py-3 text-[11px] text-text-secondary">No matching chats.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiCopilotPanel() {
  const [historyOpen, setHistoryOpen] = React.useState(false);

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <div className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-center px-6">
        <button
          type="button"
          onClick={() => setHistoryOpen((v) => !v)}
          aria-label={historyOpen ? "Hide history" : "Show history"}
          aria-pressed={historyOpen}
          className={cn(
            "absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-150",
            historyOpen
              ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
              : "border-border-default bg-surface-1 text-text-secondary hover:bg-surface-2 hover:text-text-primary"
          )}
        >
          <History className="h-4 w-4" aria-hidden="true" />
        </button>

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

      {historyOpen ? <HistoryPanel onClose={() => setHistoryOpen(false)} /> : null}
    </div>
  );
}
