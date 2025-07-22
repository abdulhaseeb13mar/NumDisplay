"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "./tooltip";

interface NumProviderProps {
  children: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

export function NumProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 300,
  disableHoverableContent = false,
}: NumProviderProps) {
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </TooltipProvider>
  );
}

export default NumProvider;
