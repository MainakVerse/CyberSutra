"use client";

import { Bot, Workflow } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "SOAR Automation", icon: Workflow },
  { label: "Agentic Automation", icon: Bot },
];

export default function AutomationResponsePage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to automate your response"
      emptyDescription="Select a module from above to begin your automation and response workflow."
    />
  );
}
