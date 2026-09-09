"use client";

import {
  Award,
  Crosshair,
  FlaskConical,
  Radiation,
  ShieldOff,
  Swords,
  TestTube,
  UserRoundCog,
  Zap,
} from "lucide-react";

import { ModulePage } from "@/components/studio/module-page";

const TABS = [
  { label: "AI Threat Sandbox", icon: FlaskConical },
  { label: "AI Threat Simulator", icon: Zap },
  { label: "BAS & OT Security", icon: Radiation },
  { label: "VAPT Center", icon: Crosshair },
  { label: "Assume Breach Console", icon: ShieldOff },
  { label: "PAM & Deception", icon: UserRoundCog },
  { label: "Red / Purple Team Ops", icon: Swords },
  { label: "Bug Bounty / VDP", icon: Award },
  { label: "Testing Suite", icon: TestTube },
];

export default function OffensiveValidationPage() {
  return (
    <ModulePage
      tabs={TABS}
      emptyTitle="Ready to validate defenses"
      emptyDescription="Select a module from above to begin your offensive validation workflow."
    />
  );
}
