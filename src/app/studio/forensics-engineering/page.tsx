"use client";

import { Braces, Database, MemoryStick, Wrench } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Forensics & Memory", icon: MemoryStick },
  { label: "Security Engineering", icon: Wrench },
  { label: "Data Fabric Explorer", icon: Database },
  { label: "GraphQL & Event Sourcing", icon: Braces },
];

export default function ForensicsEngineeringPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to investigate"
      emptyDescription="Select a module from above to begin your forensics and engineering workflow."
    />
  );
}
