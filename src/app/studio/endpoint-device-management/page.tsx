"use client";

import { Eye, PackageCheck, Smartphone, Wrench } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "MDM / UEM", icon: Smartphone },
  { label: "Patch Management", icon: Wrench },
  { label: "Application Allowlisting", icon: PackageCheck },
  { label: "Browser Isolation", icon: Eye },
];

export default function EndpointDeviceManagementPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to manage your devices"
      emptyDescription="Select a module from above to begin your endpoint and device management workflow."
    />
  );
}
