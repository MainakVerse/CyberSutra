"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SwitchPrimitive.Root
      checked={isDark}
      onCheckedChange={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border-default bg-surface-2 transition-colors duration-200",
        "hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        className
      )}
    >
      <Sun
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] text-warning transition-all duration-200 scale-100 rotate-0 group-data-[state=checked]:scale-0 group-data-[state=checked]:-rotate-90 group-data-[state=checked]:opacity-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] text-brand-primary transition-all duration-200 scale-0 rotate-90 opacity-0 group-data-[state=checked]:scale-100 group-data-[state=checked]:rotate-0 group-data-[state=checked]:opacity-100"
      />
    </SwitchPrimitive.Root>
  );
}
