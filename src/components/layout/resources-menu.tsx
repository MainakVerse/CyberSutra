"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  PlayCircle,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Column = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  links: string[];
};

const COLUMNS: Column[] = [
  {
    icon: FileText,
    eyebrow: "Learn",
    title: "Insights & Blogs",
    description:
      "Expert perspectives on cybersecurity, regulation and emerging threats.",
    links: [
      "Latest Articles",
      "Threat Intelligence",
      "Regulatory Updates",
      "Industry Perspectives",
      "CyberSutra News",
    ],
  },
  {
    icon: PlayCircle,
    eyebrow: "Watch",
    title: "Videos & Webinars",
    description:
      "On-demand sessions, product walkthroughs and expert discussions.",
    links: [
      "Product Demos",
      "Webinar Library",
      "Expert Talks",
      "Customer Stories",
      "Video Shorts",
    ],
  },
  {
    icon: BookOpen,
    eyebrow: "Explore",
    title: "Guides & eBooks",
    description:
      "In-depth resources to help you build a stronger security posture.",
    links: [
      "Best Practice Guides",
      "Regulatory Playbooks",
      "eBooks & Whitepapers",
      "Checklists",
      "Toolkits",
    ],
  },
  {
    icon: TrendingUp,
    eyebrow: "Research",
    title: "Reports & Research",
    description:
      "Original research, threat reports and market insights from our security experts.",
    links: ["Threat Reports", "India Cyber Outlook", "Compliance Research", "Annual Reports", "Data & Trends"],
  },
  {
    icon: Users,
    eyebrow: "Engage",
    title: "Events & Community",
    description:
      "Join upcoming events, workshops and connect with the CyberSutra team.",
    links: [
      "Upcoming Events",
      "Past Events",
      "Community Forum",
      "Virtual Workshops",
      "Meet Our Experts",
    ],
  },
  {
    icon: HelpCircle,
    eyebrow: "Get Help",
    title: "Support & Help Center",
    description: "Find answers, documentation and support when you need it.",
    links: ["Help Center", "Product Documentation", "FAQs", "API Docs", "Contact Support"],
  },
];

export function ResourcesMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border-default bg-surface-1 shadow-xl">
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 p-6 sm:grid-cols-3 lg:grid-cols-6">
        {COLUMNS.map((column, index) => (
          <div
            key={column.title}
            className={cn(
              "min-w-0",
              index > 0 && "lg:-ml-4 lg:border-l lg:border-border-default lg:pl-4"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <column.icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
              {column.eyebrow}
            </p>
            <p className="mt-0.5 text-sm font-bold tracking-tight text-text-primary">
              {column.title}
            </p>
            <p className="mt-1 text-xs leading-snug text-text-secondary">
              {column.description}
            </p>

            <ul className="mt-3 flex flex-col">
              {column.links.map((link) => (
                <li key={link} className="min-w-0">
                  <Link
                    href="#faq"
                    onClick={onNavigate}
                    className="flex min-w-0 items-center justify-between gap-1.5 rounded-md py-1.5 text-xs text-text-secondary transition-colors duration-150 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    <span className="min-w-0 truncate">{link}</span>
                    <ArrowRight
                      className="h-3 w-3 shrink-0 text-brand-primary/70"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border-default bg-surface-2 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-1 text-brand-primary">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              New to CyberSutra?
            </p>
            <p className="text-xs text-text-secondary">
              Start with our curated resources for a safer, more resilient
              business.
            </p>
          </div>
        </div>
        <Link
          href="#faq"
          onClick={onNavigate}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
        >
          View All Resources
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
