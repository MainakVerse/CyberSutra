"use client";

import {
  BarChart3,
  Building2,
  Handshake,
  Receipt,
  TrendingUp,
  Users2,
  Wallet,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "MSP Console", icon: Building2 },
  { label: "Partner & MSP Portal", icon: Handshake },
  { label: "Organization Profiles", icon: Users2 },
  { label: "Billing & Invoices", icon: Receipt },
  { label: "Revenue Ledger", icon: TrendingUp },
  { label: "SaaS Pricing Tiers", icon: Wallet },
  { label: "Reports & Analytics", icon: BarChart3 },
];

export default function MspBusinessPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to manage your business"
      emptyDescription="Select a module from above to begin your MSP and business workflow."
    />
  );
}
