"use client";

import {
  Bot,
  Fingerprint,
  GaugeCircle,
  KeyRound,
  Lock,
  Route,
  ShieldCheck,
  Users,
  Waypoints,
  Wifi,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "Identity Perimeter (ITDR)", icon: Fingerprint },
  { label: "IAM / IGA", icon: Users },
  { label: "SSO / Federation", icon: KeyRound },
  { label: "PKI / Certificate Mgmt", icon: ShieldCheck },
  { label: "Machine / Non-Human Identity", icon: Bot },
  { label: "VPN / ZTNA Access", icon: Wifi },
  { label: "Zero Trust Maturity", icon: GaugeCircle },
  { label: "Least Privilege Control", icon: Lock },
  { label: "Lateral Movement Prev", icon: Waypoints },
  { label: "Continuous Trust", icon: Route },
];

export default function IdentityZeroTrustPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to enforce zero trust"
      emptyDescription="Select a module from above to begin your identity and zero trust workflow."
    />
  );
}
