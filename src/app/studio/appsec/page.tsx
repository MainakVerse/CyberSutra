"use client";

import {
  Code2,
  Container,
  FileCode2,
  KeySquare,
  Layers,
  ScanSearch,
  Webhook,
  Workflow,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Code Security (SAST)", icon: Code2 },
  { label: "Dynamic App Testing (DAST)", icon: ScanSearch },
  { label: "Software Composition (SCA)", icon: Layers },
  { label: "Secret Scanning", icon: KeySquare },
  { label: "IaC & Config Scanning", icon: FileCode2 },
  { label: "API Security", icon: Webhook },
  { label: "DevSecOps Pipeline", icon: Workflow },
  { label: "Container Image Scanning", icon: Container },
];

export default function AppSecPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to secure your applications"
      emptyDescription="Select a module from above to begin your application security workflow."
    />
  );
}
