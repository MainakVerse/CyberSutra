import Link from "next/link";
import { Globe2, Mail, Rss, Shield } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Platform",
    links: [
      "SecOps Copilot",
      "Threat & Vulnerability Management",
      "AI Defense & Zero Trust",
      "SOAR & Auto-Remediation",
    ],
  },
  {
    title: "Solutions",
    links: ["SMEs", "MSSP Partners", "Enterprise", "Board & CISO Reporting"],
  },
  {
    title: "Compliance",
    links: ["DPDP Act", "ISO 27001", "CERT-In", "RBI & SEBI"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Security", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-1">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-text-primary">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border-default pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white">
              <Shield className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-text-primary">
              CyberSutra
            </span>
            <span className="text-sm text-text-secondary">
              © {new Date().getFullYear()} CyberSutra Technologies Pvt. Ltd.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="#"
              className="text-sm text-text-secondary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-sm"
            >
              DPDP & Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-text-secondary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-sm"
            >
              Status page
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="#"
                aria-label="CyberSutra company blog"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-2 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <Rss className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                aria-label="CyberSutra social channels"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-2 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <Globe2 className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                aria-label="Email CyberSutra"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-2 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
