"use client";

import { ClipboardList, Fingerprint, Flag, Search, Skull } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";
import {
  ThreatIntelHeaderMeta,
  ThreatIntelligencePlatform,
} from "@/components/studio/threat-intelligence-platform";
import {
  IndiaThreatIntelHeaderMeta,
  IndiaThreatIntelPlatform,
} from "@/components/studio/india-threat-intel-platform";
import {
  ThreatRegistryHeaderMeta,
  ThreatRegistryPlatform,
  ThreatRegistryTitle,
} from "@/components/studio/threat-registry-platform";
import {
  DarkWebSweepHeaderMeta,
  DarkWebSweepPlatform,
} from "@/components/studio/dark-web-sweep-platform";
import {
  OsintHeaderMeta,
  OsintInvestigationPlatform,
} from "@/components/studio/osint-investigation-platform";

const TABS = [
  { label: "Threat Intelligence Platform", icon: Fingerprint },
  { label: "India Threat Intel", icon: Flag },
  { label: "Threat Registry", icon: ClipboardList },
  { label: "Dark Web Sweep", icon: Skull },
  { label: "OSINT Investigation", icon: Search },
];

export default function ThreatIntelligencePage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to gather intelligence"
      emptyDescription="Select a module from above to begin your threat intelligence workflow."
      renderContent={(activeTab) => {
        if (activeTab === 0) return <ThreatIntelligencePlatform />;
        if (activeTab === 1) return <IndiaThreatIntelPlatform />;
        if (activeTab === 2) return <ThreatRegistryPlatform />;
        if (activeTab === 3) return <DarkWebSweepPlatform />;
        if (activeTab === 4) return <OsintInvestigationPlatform />;
        return null;
      }}
      renderHeaderLeft={(activeTab) => {
        if (activeTab === 2) return <ThreatRegistryTitle />;
        return null;
      }}
      renderHeaderRight={(activeTab) => {
        if (activeTab === 0) return <ThreatIntelHeaderMeta />;
        if (activeTab === 1) return <IndiaThreatIntelHeaderMeta />;
        if (activeTab === 2) return <ThreatRegistryHeaderMeta />;
        if (activeTab === 3) return <DarkWebSweepHeaderMeta />;
        if (activeTab === 4) return <OsintHeaderMeta />;
        return null;
      }}
    />
  );
}
