"use client";

import { Blocks, Building } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Blockchain / Smart Contract Security", icon: Blocks },
  { label: "Physical Security Convergence", icon: Building },
];

export default function EmergingSpecializedPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to explore emerging risk"
      emptyDescription="Select a module from above to begin your emerging and specialized workflow."
    />
  );
}
