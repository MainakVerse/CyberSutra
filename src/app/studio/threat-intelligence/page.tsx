"use client";

import { ClipboardList, Fingerprint, Flag, Search, Skull } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Threat Intelligence Platform", icon: Fingerprint },
  { label: "India Threat Intel", icon: Flag },
  { label: "Threat Registry", icon: ClipboardList },
  { label: "Dark Web Sweep", icon: Skull },
  { label: "OSINT Investigation", icon: Search },
];

export default function ThreatIntelligencePage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to gather intelligence"
      emptyDescription="Select a module from above to begin your threat intelligence workflow."
    />
  );
}
