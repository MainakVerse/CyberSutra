"use client";

import {
  Biohazard,
  Crosshair,
  FileSearch,
  FolderKanban,
  LayoutGrid,
  Monitor,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";
import { ThreatMonitorDashboard, ThreatMonitorHeaderMeta } from "@/components/studio/threat-monitor-dashboard";
import { SocWallCenter, SocWallHeaderMeta } from "@/components/studio/soc-wall-center";
import { IncidentCommander, IncidentCommanderHeaderMeta } from "@/components/studio/incident-commander";
import { SiemLogCorrelation, SiemLogCorrelationHeaderMeta } from "@/components/studio/siem-log-correlation";
import { CaseManagement, CaseManagementHeaderMeta, CaseManagementHeaderRight } from "@/components/studio/case-management";
import { ThreatHunting, ThreatHuntingHeaderMeta } from "@/components/studio/threat-hunting";
import { MalwareAnalysis, MalwareAnalysisHeaderRight } from "@/components/studio/malware-analysis";
import { FileIntegrityMonitoring, FileIntegrityHeaderRight } from "@/components/studio/file-integrity-monitoring";

const TABS = [
  { label: "SOC Threat Monitor", icon: Monitor },
  { label: "SOC Wall Center", icon: LayoutGrid },
  { label: "Incident Commander", icon: ShieldCheck },
  { label: "SIEM & Log Correlation", icon: ServerCog },
  { label: "Case Management", icon: FolderKanban },
  { label: "Threat Hunting", icon: Crosshair },
  { label: "Malware Analysis / Detonation", icon: Biohazard },
  { label: "File Integrity Monitoring", icon: FileSearch },
];

export default function ThreatOperationsPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to monitor threats"
      emptyDescription="Select a module from above to begin your threat operations workflow."
      renderContent={(activeTab) =>
        activeTab === 0 ? (
          <ThreatMonitorDashboard />
        ) : activeTab === 1 ? (
          <SocWallCenter />
        ) : activeTab === 2 ? (
          <IncidentCommander />
        ) : activeTab === 3 ? (
          <SiemLogCorrelation />
        ) : activeTab === 4 ? (
          <CaseManagement />
        ) : activeTab === 5 ? (
          <ThreatHunting />
        ) : activeTab === 6 ? (
          <MalwareAnalysis />
        ) : activeTab === 7 ? (
          <FileIntegrityMonitoring />
        ) : null
      }
      renderHeaderLeft={(activeTab) =>
        activeTab === 0 ? (
          <ThreatMonitorHeaderMeta />
        ) : activeTab === 1 ? (
          <SocWallHeaderMeta />
        ) : activeTab === 2 ? (
          <IncidentCommanderHeaderMeta />
        ) : activeTab === 3 ? (
          <SiemLogCorrelationHeaderMeta />
        ) : activeTab === 4 ? (
          <CaseManagementHeaderMeta />
        ) : activeTab === 5 ? (
          <ThreatHuntingHeaderMeta />
        ) : null
      }
      renderHeaderRight={(activeTab) =>
        activeTab === 4 ? (
          <CaseManagementHeaderRight />
        ) : activeTab === 6 ? (
          <MalwareAnalysisHeaderRight />
        ) : activeTab === 7 ? (
          <FileIntegrityHeaderRight />
        ) : null
      }
    />
  );
}
