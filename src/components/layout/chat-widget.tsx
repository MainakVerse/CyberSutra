"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, ShieldCheck, X } from "lucide-react";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "greeting",
    from: "bot",
    text: "Hi, I'm the CyberSutra assistant. Ask me about our platform, compliance coverage or how to book a demo.",
  },
];

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = React.useState("");
  const shouldReduceMotion = useReducedMotion();
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, from: "user", text },
      {
        id: `${Date.now()}-bot`,
        from: "bot",
        text: "Thanks for reaching out — this is a preview assistant. For a full walkthrough, book a live demo with our security team.",
      },
    ]);
    setDraft("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#0b1b33] shadow-[0_8px_30px_rgba(11,27,51,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
      >
        <Image
          src="/bot.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="CyberSutra chat assistant"
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[400px] flex-col overflow-hidden border-l border-border-default bg-surface-1 shadow-2xl sm:bottom-6 sm:right-6 sm:top-auto sm:h-[min(720px,calc(100vh-3rem))] sm:max-h-[85vh] sm:rounded-3xl sm:border"
              initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 bg-[#0b1b33] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                    <Image
                      src="/bot.png"
                      alt=""
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      CyberSutra Assistant
                    </p>
                    <p className="flex items-center gap-1 text-xs text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div
                ref={listRef}
                className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-surface-0 px-4 py-4"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.from === "bot"
                        ? "flex items-start gap-2"
                        : "flex items-start justify-end gap-2"
                    }
                  >
                    {message.from === "bot" ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    ) : null}
                    <p
                      className={
                        message.from === "bot"
                          ? "max-w-[80%] rounded-2xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-text-primary"
                          : "max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-primary px-3.5 py-2.5 text-sm leading-relaxed text-white"
                      }
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSend}
                className="flex shrink-0 items-center gap-2 border-t border-border-default bg-surface-1 p-3"
              >
                <input
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type your message..."
                  className="h-11 flex-1 rounded-full border border-border-default bg-surface-2 px-4 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!draft.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white transition-colors duration-150 hover:bg-brand-primary-hover disabled:opacity-40"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
