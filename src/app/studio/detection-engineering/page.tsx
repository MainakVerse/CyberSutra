"use client";

import { Library, Map, Radar, ShieldAlert, Target, UserSearch } from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";
import {
  DetectionRulesLibraryHeaderMeta,
  DetectionRulesLibraryPlatform,
  DetectionRulesLibraryTitle,
} from "@/components/studio/detection-rules-library-platform";
import {
  AttackCoverageMap,
  AttackCoverageMapHeaderMeta,
} from "@/components/studio/attack-coverage-map";
import {
  UebaAnalyticsHeaderMeta,
  UebaAnalyticsPlatform,
} from "@/components/studio/ueba-analytics-platform";
import {
  ThreatModelingHeaderMeta,
  ThreatModelingPlatform,
} from "@/components/studio/threat-modeling-platform";

const TABS = [
  { label: "Detection Rules Library", icon: Library },
  { label: "Attack Coverage Map", icon: Map },
  { label: "UEBA Analytics", icon: Radar },
  { label: "Threat Modeling", icon: Target },
  { label: "Insider Threat Program", icon: UserSearch },
  { label: "Fraud Detection", icon: ShieldAlert },
];

export default function DetectionEngineeringPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to engineer detections"
      emptyDescription="Select a module from above to begin your detection engineering workflow."
      renderContent={(activeTab) => {
        if (activeTab === 0) return <DetectionRulesLibraryPlatform />;
        if (activeTab === 1) return <AttackCoverageMap />;
        if (activeTab === 2) return <UebaAnalyticsPlatform />;
        if (activeTab === 3) return <ThreatModelingPlatform />;
        return null;
      }}
      renderHeaderLeft={(activeTab) => {
        if (activeTab === 0) return <DetectionRulesLibraryTitle />;
        return null;
      }}
      renderHeaderRight={(activeTab) => {
        if (activeTab === 0) return <DetectionRulesLibraryHeaderMeta />;
        if (activeTab === 1) return <AttackCoverageMapHeaderMeta />;
        if (activeTab === 2) return <UebaAnalyticsHeaderMeta />;
        if (activeTab === 3) return <ThreatModelingHeaderMeta />;
        return null;
      }}
    />
  );
}
