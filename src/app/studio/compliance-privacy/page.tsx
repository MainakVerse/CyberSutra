"use client";

import {
  Award,
  Banknote,
  FileCheck2,
  Landmark,
  Newspaper,
  Scroll,
  ShieldCheck,
  Umbrella,
  UserCog,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "CERT-In Brief", icon: FileCheck2 },
  { label: "DPDP Act Compliance", icon: ShieldCheck },
  { label: "Privacy Management (DSAR/RoPA)", icon: UserCog },
  { label: "ISO Certification", icon: Award },
  { label: "Financial Compliance", icon: Banknote },
  { label: "Cyber Insurance", icon: Umbrella },
  { label: "Regulatory Intel", icon: Newspaper },
  { label: "Data Governance", icon: Landmark },
  { label: "Technical Security", icon: Scroll },
];

export default function CompliancePrivacyPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to stay compliant"
      emptyDescription="Select a module from above to begin your compliance and privacy workflow."
    />
  );
}
