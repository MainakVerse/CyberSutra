"use client";

import { GraduationCap, IdCard, MailWarning, ShieldCheck, Users } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "vCISO Hub", icon: Users },
  { label: "Board Resilience", icon: ShieldCheck },
  { label: "Security Training LMS", icon: GraduationCap },
  { label: "UPI & Phishing Scan", icon: MailWarning },
  { label: "Security Passport", icon: IdCard },
];

export default function AdvisoryAwarenessPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to build awareness"
      emptyDescription="Select a module from above to begin your advisory and awareness workflow."
    />
  );
}
