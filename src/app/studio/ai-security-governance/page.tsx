"use client";

import { Atom, BrainCircuit, Scale, ShieldCheck, UserCheck, VenetianMask } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "AI Governance", icon: Scale },
  { label: "AI Oversight", icon: UserCheck },
  { label: "AI Fine-Tuning", icon: BrainCircuit },
  { label: "AI Defence Lab", icon: ShieldCheck },
  { label: "Deepfake Shield", icon: VenetianMask },
  { label: "Quantum Readiness", icon: Atom },
];

export default function AiSecurityGovernancePage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to govern your AI"
      emptyDescription="Select a module from above to begin your AI security and governance workflow."
    />
  );
}
