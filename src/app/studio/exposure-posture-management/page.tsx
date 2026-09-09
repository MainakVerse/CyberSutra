"use client";

import { Boxes, Gauge, HardDrive, PackageSearch, Radar, ShieldAlert } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "CTEM Engine", icon: Radar },
  { label: "Vulnerability Manager", icon: ShieldAlert },
  { label: "External Security (ASM)", icon: PackageSearch },
  { label: "Supply Chain Visibility", icon: Boxes },
  { label: "Posture Risk Engine", icon: Gauge },
  { label: "Infrastructure Assets", icon: HardDrive },
];

export default function ExposurePostureManagementPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to manage your exposure"
      emptyDescription="Select a module from above to begin your exposure and posture management workflow."
    />
  );
}
