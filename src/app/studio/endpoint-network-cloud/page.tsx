"use client";

import {
  Cloud,
  Container,
  Dna,
  Flame,
  Globe,
  Mail,
  Monitor,
  Network,
  Radar,
  ShieldHalf,
  Waypoints,
  Wifi,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "EDR / XDR Console", icon: Monitor },
  { label: "Network Detection (NDR)", icon: Radar },
  { label: "Firewall / NGFW Mgmt", icon: Flame },
  { label: "WAF", icon: ShieldHalf },
  { label: "DDoS / CDN Protection", icon: Globe },
  { label: "DNS Security", icon: Network },
  { label: "Micro-segmentation", icon: Waypoints },
  { label: "SASE / SSE", icon: Wifi },
  { label: "Cloud Posture (CSPM)", icon: Cloud },
  { label: "Container & K8s Runtime (CWPP)", icon: Container },
  { label: "IoT Security", icon: Dna },
  { label: "Email Security Gateway", icon: Mail },
];

export default function EndpointNetworkCloudPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to defend your perimeter"
      emptyDescription="Select a module from above to begin your endpoint, network and cloud workflow."
    />
  );
}
