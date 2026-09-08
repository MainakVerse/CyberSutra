"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "react-countup";

export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const match = value.match(/^(<)?(\d+(?:\.\d+)?)$/);
  const prefix = match?.[1] ?? "";
  const end = match ? parseFloat(match[2]) : 0;

  const { start } = useCountUp({
    ref: ref as React.RefObject<HTMLElement>,
    start: 0,
    end,
    duration: 1.1,
    prefix,
    useEasing: true,
  });

  React.useEffect(() => {
    if (!match) return;
    if (isInView && !shouldReduceMotion) {
      start();
    }
  }, [isInView, match, shouldReduceMotion, start]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {shouldReduceMotion ? `${prefix}${end}` : "0"}
    </span>
  );
}
