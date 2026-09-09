"use client";

import { ClipboardCheck, HeartHandshake, LifeBuoy, ScrollText, ShieldAlert } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Third-Party Risk (TPRM)", icon: HeartHandshake },
  { label: "Enterprise Risk Register", icon: ShieldAlert },
  { label: "Policy Management", icon: ScrollText },
  { label: "Audit Management", icon: ClipboardCheck },
  { label: "BCP / DR Planning", icon: LifeBuoy },
];

export default function GrcRiskPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to manage your risk"
      emptyDescription="Select a module from above to begin your GRC and risk workflow."
    />
  );
}
