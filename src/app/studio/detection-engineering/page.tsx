"use client";

import { Library, Map, Radar, ShieldAlert, Target, UserSearch } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Detection Rules Library", icon: Library },
  { label: "ATT&CK Coverage Map", icon: Map },
  { label: "UEBA Analytics", icon: Radar },
  { label: "Threat Modeling", icon: Target },
  { label: "Insider Threat Program", icon: UserSearch },
  { label: "Fraud Detection", icon: ShieldAlert },
];

export default function DetectionEngineeringPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to engineer detections"
      emptyDescription="Select a module from above to begin your detection engineering workflow."
    />
  );
}
