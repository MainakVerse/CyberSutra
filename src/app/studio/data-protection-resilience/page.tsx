"use client";

import {
  Award,
  Database,
  EyeOff,
  KeyRound,
  Layers,
  ShieldOff,
  Tags,
  Vault,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Data Loss Prevention", icon: ShieldOff },
  { label: "Data Classification & Discovery", icon: Tags },
  { label: "Data Masking / Tokenization", icon: EyeOff },
  { label: "Database Activity Monitoring", icon: Database },
  { label: "Rights Management (IRM/DRM)", icon: Award },
  { label: "Encryption & Key Mgmt", icon: KeyRound },
  { label: "Secrets Vault", icon: Vault },
  { label: "Backup & Cyber Recovery", icon: Layers },
];

export default function DataProtectionResiliencePage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to protect your data"
      emptyDescription="Select a module from above to begin your data protection and resilience workflow."
    />
  );
}
